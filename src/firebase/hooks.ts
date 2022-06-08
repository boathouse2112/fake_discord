import { useQuery } from "react-query";
import {
  parseChannel,
  parseConversation,
  parseMessage,
  parseServer,
  parseUser,
} from "./parseFirestore";
import {
  collection,
  doc,
  documentId,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "./firebase";
import {
  useFirestoreCollectionMutation,
  useFirestoreDocument,
  useFirestoreDocumentData,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import { ServerData } from "../types";
import { downloadImage } from "./util";

const DUMMY = "_DUMMY_";

// Download the avatar from firebase
export const useAvatar = (avatarPath: string | undefined) => {
  return useQuery(
    ["avatar", avatarPath],
    () => (avatarPath === undefined ? undefined : downloadImage(avatarPath)),
    { enabled: !!avatarPath }
  );
};

export const useUser = (userId: string | undefined) => {
  const ref = doc(firestore, "Users", userId ?? DUMMY);
  const res = useFirestoreDocumentData(
    ["user", userId],
    ref,
    {},
    { enabled: !!userId }
  );
  const user =
    userId !== undefined && res.data ? parseUser(res.data, userId) : undefined;
  return { ...res, data: user };
};

export const useConversations = (conversationIds: string[] | undefined) => {
  // ref must be a non-null query, but where() doesn't work with empty arrays.
  const ref = conversationIds
    ? query(
        collection(firestore, "Conversations"),
        where(documentId(), "in", conversationIds)
      )
    : collection(firestore, DUMMY);
  const res = useFirestoreQuery(["conversations", conversationIds], ref);
  const conversations = res.data
    ? res.data?.docs.map(parseConversation)
    : undefined;
  return { ...res, data: conversations };
};

export const useServerDescriptions = () => {
  const ref = collection(firestore, "Servers");
  const res = useFirestoreQuery(["servers"], ref);
  const servers = res.data?.docs.map(parseServer);
  return servers?.map((server) => ({
    id: server.id,
    name: server.name,
  }));
};

export const useServer = (serverId: string | undefined) => {
  const ref = doc(firestore, "Servers", serverId ?? DUMMY);
  const res = useFirestoreDocument(
    ["server", serverId],
    ref,
    {},
    { enabled: !!serverId }
  );

  const { data: channels } = useChannels(serverId);
  const server: ServerData | undefined =
    res.data && channels
      ? { ...parseServer(res.data), channels: channels }
      : undefined;
  return { ...res, data: server };
};

export const useChannels = (serverId: string | undefined) => {
  const ref = collection(firestore, "Servers", serverId ?? DUMMY, "Channels");
  const res = useFirestoreQuery(
    ["channels", serverId],
    ref,
    {},
    { enabled: !!serverId }
  );
  const channels = res.data?.docs.map((channel) => parseChannel(channel));
  return { ...res, data: channels };
};

export const useChannel = (
  serverId: string | undefined,
  channelId: string | undefined
) => {
  const ref = doc(
    firestore,
    "Servers",
    serverId ?? DUMMY,
    "Channels",
    channelId ?? DUMMY
  );
  const res = useFirestoreDocument(
    ["channel", serverId, channelId],
    ref,
    {},
    { enabled: !!channelId && !!serverId }
  );
  const channel = res.data ? parseChannel(res.data) : undefined;
  return { ...res, data: channel };
};

export const useMessages = (pathToMessages: string | undefined) => {
  // Create the collection ref in the path-defined and path-undefined cases.
  const collectionRef = collection(firestore, pathToMessages ?? DUMMY);

  // const collectionRef = path ? collection(firestore, ...path) : undefined;
  const ref = query(collectionRef, orderBy("time", "asc"));

  const res = useFirestoreQuery(
    ["messages", pathToMessages],
    ref,
    {
      subscribe: true,
    },
    { enabled: !!pathToMessages }
  );

  // Parse messages into our message format, and use that as our data.
  const messages = res.data?.docs.map(parseMessage);
  return { ...res, data: messages };
};

export const useMessagesMutation = (path: string | undefined) => {
  const ref = collection(firestore, path ?? "_UNDEFINED_");
  return useFirestoreCollectionMutation(ref);
};

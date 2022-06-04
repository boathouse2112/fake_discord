import { useAuthUser } from "@react-query-firebase/auth";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { auth } from "../../firebase";
import { addMessage, fetchConversation } from "../../firestoreQueries";
import { MessageContent, MessageData } from "../../types";
import MessageHistory from "./MessageHistory";
import MessageInput from "./MessageInput";

const useConversation = (conversationId: string | undefined) => {
  const { data: conversation } = useQuery(
    ["conversation", conversationId],
    () =>
      conversationId !== undefined
        ? fetchConversation(conversationId)
        : undefined,
    { enabled: !!conversationId }
  );

  return conversation;
};

const useAddMessage = (
  conversationId: string | undefined,
  queryClient: QueryClient
) => {
  const mutationFn = (message: MessageData) => {
    return new Promise(async (resolve, reject) => {
      if (conversationId === undefined) {
        reject("conversationId is undefined");
      } else {
        const messagesPath = ["Conversations", conversationId, "Messages"];
        await addMessage(messagesPath, message);
      }
    });
  };

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(["conversation", conversationId]);
    },
  });
};

const MessageView = (props: { conversationId: string | undefined }) => {
  const queryClient = useQueryClient();
  const authUser = useAuthUser("auth-user", auth);
  const userId = authUser?.data?.uid;
  const conversation = useConversation(props.conversationId);
  const addMessageMutation = useAddMessage(props.conversationId, queryClient);

  const submitMessage = (content: MessageContent) => {
    if (!userId) {
      throw Error("Submitted message while not signed in.");
    }

    const message: MessageData = {
      id: nanoid(),
      authorId: userId,
      time: dayjs(),
      content,
    };

    addMessageMutation.mutate(message);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <MessageHistory messages={conversation?.messages ?? []} />
      <MessageInput submitMessage={submitMessage} />
    </div>
  );
};

export default MessageView;

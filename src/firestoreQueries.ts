/* eslint-disable @typescript-eslint/no-unused-vars */
// I want to infer types for all schemas, even if the types aren't used.
import dayjs, { Dayjs } from 'dayjs';
import {
  collection,
  doc,
  FieldValue,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { z } from 'zod';
import firestore from './firestore';
import {
  Channel,
  ChannelSchema,
  Conversation,
  MessageContentSchema,
  MessageData,
  ServerData,
  ServerDataSchema,
  User,
  UserSchema,
} from './types';

const FirestoreUserSchema = UserSchema.omit({ id: true });
type FirestoreUser = z.infer<typeof FirestoreUserSchema>;

// Fetch the user with the given ID
const fetchUser = async (userID: string): Promise<User> => {
  const docRef = doc(firestore, 'Users', userID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw Error(`No document found: Users/${userID}`);
  }

  const userData = FirestoreUserSchema.parse(docSnap.data());

  // Add the ID field
  return { ...userData, id: docSnap.id };
};

const FirestoreChannelSchema = ChannelSchema.omit({
  id: true,
});
type FirestoreChannel = z.infer<typeof FirestoreChannelSchema>;

// Fetch all channels in the server with the given ID
const fetchChannels = async (serverID: string): Promise<Channel[]> => {
  const collectionRef = collection(firestore, 'Servers', serverID, 'Channels');
  const querySnap = await getDocs(collectionRef);

  const channels = querySnap.docs.map((doc) => {
    const firestoreChannel = FirestoreChannelSchema.parse(doc.data());
    return { ...firestoreChannel, id: doc.id };
  });
  return channels;
};

const FirestoreServerSchema = ServerDataSchema.omit({
  id: true,
  channels: true,
});
type FirestoreServer = z.infer<typeof FirestoreServerSchema>;

// Fetch the server with the given ID
const fetchServer = async (serverID: string): Promise<ServerData> => {
  // First fetch
  const docRef = doc(firestore, 'Servers', serverID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw Error(`No document found: Servers/${serverID}`);
  }

  const serverData = FirestoreServerSchema.parse(docSnap.data());
  const channels = await fetchChannels(serverID);

  return { ...serverData, channels, id: serverID };
};

const fetchServerNames = async (): Promise<{ id: string; name: string }[]> => {
  const collectionRef = collection(firestore, 'Servers');
  const querySnap = await getDocs(collectionRef);

  const serverNames = querySnap.docs.map((doc) => {
    const firestoreServer = FirestoreServerSchema.parse(doc.data());
    return { id: doc.id, name: firestoreServer.name };
  });
  return serverNames;
};

// Get a list of participants of the given conversation
const fetchSingleConversationParticipants = async (
  conversationID: string
): Promise<{ conversationID: string; participants: string[] }> => {
  const docRef = doc(firestore, 'Conversations', conversationID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw Error(`No document found: Conversations/${conversationID}`);
  }

  const StringArraySchema = z.string().array();
  const participants = StringArraySchema.parse(docSnap.get('participants'));

  return { conversationID, participants };
};

// Get a list of participants for each of the given conversations
const fetchConversationParticipants = async (
  conversationIDs: string[]
): Promise<{ conversationID: string; participants: string[] }[]> => {
  return Promise.all(
    conversationIDs.map((id) => fetchSingleConversationParticipants(id))
  );
};

const FirestoreTimestampSchema = z.object({
  seconds: z.number(),
});
type FirestoreTimestamp = z.infer<typeof FirestoreTimestampSchema>;

const FirestoreMessageSchema = z.object({
  authorID: z.string(),
  time: FirestoreTimestampSchema,
  content: MessageContentSchema,
});
type FirestoreMessage = z.infer<typeof FirestoreMessageSchema>;

// Convert a FirestoreTimestamp to a Dayjs time
const parseDayjs = (firestoreTimestamp: FirestoreTimestamp): Dayjs =>
  dayjs.unix(firestoreTimestamp.seconds);

// Convert a FirestoreMessage to a MessageData object
const parseMessageData = (
  firestoreMessage: FirestoreMessage,
  messageID: string
): MessageData => {
  // Get a Dayjs time, and add the message ID
  const time = parseDayjs(firestoreMessage.time);
  return {
    ...firestoreMessage,
    id: messageID,
    time,
  };
};

/**
 * Fetch all messages from the Messages collection at the given path
 * Add the given message to the Messages collection at the given path
 * @param messagesPath Path to the Messages collection to add to.
 * eg. ['Converstaions', 'conversationID', 'Messages']
 */
const fetchMessages = async (
  messagesPath: string[]
): Promise<MessageData[]> => {
  const messagesCollectionRef = collection(
    firestore,
    messagesPath[0],
    ...messagesPath.slice(1)
  );

  // Get messages sorted oldest-first
  const querySortOldestToNewest = await query(
    messagesCollectionRef,
    orderBy('time', 'asc')
  );
  const messagesCollectionSnap = await getDocs(querySortOldestToNewest);

  // Convert each FirestoreMessage to a MessageData object
  const messages = messagesCollectionSnap.docs.map((docSnap) => {
    const firestoreMessage = FirestoreMessageSchema.parse(docSnap.data());
    return parseMessageData(firestoreMessage, docSnap.id);
  });

  return messages;
};

const FirestoreConversationSchema = z.object({
  participants: z.string().array(),
});
type FirestoreConversation = z.infer<typeof FirestoreConversationSchema>;

// Fetch the conversation with the given ID
const fetchConversation = async (
  conversationID: string
): Promise<Conversation> => {
  const docRef = doc(firestore, 'Conversations', conversationID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw Error(`No document found: Conversations/${conversationID}`);
  }

  const conversationData = FirestoreConversationSchema.parse(docSnap.data());
  const messages = await fetchMessages([
    'Conversations',
    conversationID,
    'Messages',
  ]);

  const conversation: Conversation = {
    ...conversationData,
    messages,
  };

  return conversation;
};

// Submitted firestore messages have the serverTimestamp() placeholder value,
// instead of a Timestamp object.
const zFieldValue: z.ZodType<FieldValue> = z.any();
const SubmittedFirestoreMessageSchema = FirestoreMessageSchema.merge(
  z.object({ time: zFieldValue })
);
type SubmittedFirestoreMessage = z.infer<
  typeof SubmittedFirestoreMessageSchema
>;

/**
 * Add the given message to the Messages collection at the given path
 * @param messagesPath Path to the Messages collection to add to.
 * eg. ['Converstaions', 'conversationID', 'Messages']
 */
const addMessage = (messagesPath: string[], message: MessageData) => {
  const messageID = message.id;

  // Convert message.content to a string, and convert message.time to server timestamp
  if (message.content.type !== 'text') {
    return;
  }

  const firestoreMessage: SubmittedFirestoreMessage = {
    authorID: message.authorID,
    time: serverTimestamp(),
    content: message.content,
  };

  // doc() function needs a string path element, before it'll accept the varargs for the rest of the path elements
  const messageRefPath = [...messagesPath, messageID];
  const messageRef = doc(
    firestore,
    messagesPath[0],
    ...messageRefPath.slice(1)
  );

  setDoc(messageRef, firestoreMessage);
};

export {
  fetchUser,
  fetchConversationParticipants,
  fetchMessages,
  fetchConversation,
  addMessage,
  fetchServer,
  fetchServerNames,
};

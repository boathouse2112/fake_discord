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
  Conversation,
  MessageContentSchema,
  MessageData,
  User,
  UserSchema,
} from './types';

const FirestoreUserSchema = UserSchema.omit({ id: true });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type FirestoreUser = z.infer<typeof FirestoreUserSchema>;

// Fetch the user with the given id
const fetchUser = async (userID: string): Promise<User> => {
  const docRef = doc(firestore, 'Users', userID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw Error(`No document found: Users/${userID}`);
  }

  const userData = FirestoreUserSchema.parse(docSnap.data());

  // Add the id field
  return { ...userData, id: docSnap.id };
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

  const StringArraySchema = z.array(z.string());
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

const FirestoreConversationSchema = z.object({
  participants: z.array(z.string()),
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const messagesCollectionRef = collection(
    firestore,
    'Conversations',
    conversationID,
    'Messages'
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

// Add the given message to the conversation with the given ID
const addMessage = (conversationID: string, message: MessageData) => {
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

  const messageRef = doc(
    firestore,
    'Conversations',
    conversationID,
    'Messages',
    messageID
  );

  setDoc(messageRef, firestoreMessage);
};

export {
  fetchUser,
  fetchConversationParticipants,
  fetchConversation,
  addMessage,
};

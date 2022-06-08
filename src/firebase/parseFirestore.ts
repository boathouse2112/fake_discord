/* eslint-disable @typescript-eslint/no-unused-vars */
// I want to infer types for all schemas, even if the types aren't used.
import dayjs, { Dayjs } from "dayjs";
import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  Channel,
  ConversationDescription,
  MessageData,
  ServerData,
  User,
} from "../types";
import {
  FirestoreChannelSchema,
  FirestoreConversationSchema,
  FirestoreServerSchema,
  FirestoreTimestamp,
  FirestoreUserSchema,
  SubmittedFirestoreMessageSchema,
} from "./types";

export const parseChannel = (channelSnap: DocumentSnapshot): Channel => {
  const channel = FirestoreChannelSchema.parse(channelSnap.data());
  return { ...channel, id: channelSnap.id };
};

export const parseUser = (userData: DocumentData, userId: string): User => {
  const user = FirestoreUserSchema.parse(userData);
  return { ...user, id: userId };
};

export const parseServer = (
  serverSnap: DocumentSnapshot
): Omit<ServerData, "channels"> => {
  const server = FirestoreServerSchema.parse(serverSnap.data());
  return { ...server, id: serverSnap.id };
};

export const parseConversation = (
  conversationSnap: DocumentSnapshot
): ConversationDescription => {
  const conversation = FirestoreConversationSchema.parse(
    conversationSnap.data()
  );
  return { ...conversation, id: conversationSnap.id };
};

/**
 * Convert a FirestoreTimestamp to a Dayjs time.
 * If null, set time to now()
 * @param firestoreTimestamp
 */
const parseDayjs = (firestoreTimestamp: FirestoreTimestamp | null): Dayjs => {
  if (firestoreTimestamp === null) {
    return dayjs();
  } else {
    return dayjs.unix(firestoreTimestamp.seconds);
  }
};

// Convert a firestore message DocSnap to a MessageData object
export const parseMessage = (
  messageSnap: QueryDocumentSnapshot
): MessageData => {
  const firestoreMessage = SubmittedFirestoreMessageSchema.parse(
    messageSnap.data()
  );
  /*
    FirestoreMessageSchema.omit({ time: true })
    .extend({ time: z.nullable(FirestoreTimestampSchema) })
    .parse(messageSnap.data());

   */

  // Get a Dayjs time, and add the message ID
  const time = parseDayjs(firestoreMessage.time);
  return {
    ...firestoreMessage,
    id: messageSnap.id,
    time,
  };
};

import {
  ChannelSchema,
  MessageContentSchema,
  ServerDataSchema,
  UserSchema,
} from "../types";
import { FieldValue } from "firebase/firestore";
import { z } from "zod";

export const FirestoreUserSchema = UserSchema.omit({ id: true });
export type FirestoreUser = z.infer<typeof FirestoreUserSchema>;

export const FirestoreChannelSchema = ChannelSchema.omit({
  id: true,
});
export type FirestoreChannel = z.infer<typeof FirestoreChannelSchema>;

export const FirestoreServerSchema = ServerDataSchema.omit({
  id: true,
  channels: true,
});
export type FirestoreServer = z.infer<typeof FirestoreServerSchema>;

export const FirestoreTimestampSchema = z.object({
  seconds: z.number(),
});
export type FirestoreTimestamp = z.infer<typeof FirestoreTimestampSchema>;

export const FirestoreMessageSchema = z.object({
  authorId: z.string(),
  time: FirestoreTimestampSchema,
  content: MessageContentSchema,
});
export type FirestoreMessage = z.infer<typeof FirestoreMessageSchema>;

// Submitted firestore messages have the serverTimestamp() placeholder value,
// instead of a Timestamp object.
export const SubmittedFirestoreMessageSchema = FirestoreMessageSchema.merge(
  z.object({ time: z.any() })
);
export type SubmittedFirestoreMessage = z.infer<
  typeof SubmittedFirestoreMessageSchema
> & { time: FieldValue };

export const FirestoreConversationSchema = z.object({
  participants: z.string().array(),
});
export type FirestoreConversation = z.infer<typeof FirestoreConversationSchema>;

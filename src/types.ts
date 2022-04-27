import { z } from 'zod';

// Represents a user
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  interlocutorIDs: z.string().array(), // IDs of interlocutors
  directMessageIDs: z.string().array(), // IDs of direct messages
});

// Represents a direct message conversation.
type ConversationData = {
  interlocutor: string;
  messages: MessageData[]; // Sorted oldest to newest.
};

// Abstract message model type. Converted to message view props.
type MessageData = {
  author: string;
  time: string;
  content: MessageContentData;
};

// Message content types
// Tagged union, can switch on `type` field.
type MessageContentData = TextContentData;

type TextContentData = {
  type: 'text';
  text: string;
};

type User = z.infer<typeof UserSchema>;

export type {
  User,
  ConversationData,
  MessageData,
  MessageContentData,
  TextContentData,
};
export { UserSchema };

import { Dayjs } from 'dayjs';
import { z } from 'zod';

// Represents a user
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  interlocutorIDs: z.string().array(), // IDs of interlocutors
  conversationIDs: z.string().array(), // IDs of conversations
});
type User = z.infer<typeof UserSchema>;

// Message content types
// Tagged union, can switch on `type` field.
const TextContentSchema = z.object({
  type: z.literal('text'),
  text: z.string(),
});
type TextContent = z.infer<typeof TextContentSchema>;

const MessageContentSchema = z.discriminatedUnion('type', [
  TextContentSchema,
  z.object({ type: z.literal('none') }),
]);
type MessageContent = z.infer<typeof MessageContentSchema>;

const zDayjs: z.ZodType<Dayjs> = z.any(); // Let Zod accept a Dayjs object without defining it as a schema

// Abstract message model type. Converted to message view props.
const MessageDataSchema = z.object({
  id: z.string(),
  authorID: z.string(),
  time: zDayjs,
  content: MessageContentSchema,
});
type MessageData = z.infer<typeof MessageDataSchema>;

// Represents a direct-message conversation between multiple users
const ConversationSchema = z.object({
  participants: z.string().array(),
  messages: MessageDataSchema.array(),
});
type Conversation = z.infer<typeof ConversationSchema>;

// Represents a channel in a server
// Excludes the Messages subcollection, which should be fetched separately
const ChannelSchema = z.object({
  id: z.string(),
  name: z.string(),
});
type Channel = z.infer<typeof ChannelSchema>;

// Represents a server
// TODO: I really shouldn't load all
const ServerDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  memberIDs: z.string().array(),
  channels: ChannelSchema.array(),
});
type ServerData = z.infer<typeof ServerDataSchema>;

export type {
  User,
  TextContent,
  MessageContent,
  MessageData,
  Conversation,
  Channel,
  ServerData,
};
export { UserSchema, MessageContentSchema, ChannelSchema, ServerDataSchema };

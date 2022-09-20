import { z } from 'zod';

// Represents a user
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatarPath: z.string(),
  interlocutorIds: z.string().array(), // IDs of interlocutors
  conversationIds: z.string().array(), // IDs of conversations
});
export type User = z.infer<typeof UserSchema>;

// Message content types
// Tagged union, can switch on `type` field.
export const TextContentSchema = z.object({
  type: z.literal('text'),
  text: z.string(),
});
export type TextContent = z.infer<typeof TextContentSchema>;

export const MessageContentSchema = z.discriminatedUnion('type', [
  TextContentSchema,
  z.object({ type: z.literal('none') }),
]);
export type MessageContent = z.infer<typeof MessageContentSchema>;

// Abstract message model type. Converted to message view props.
export const MessageDataSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  time: z.date(),
  content: MessageContentSchema,
});
export type MessageData = z.infer<typeof MessageDataSchema>;

export const ConversationDescriptionSchema = z.object({
  id: z.string(),
  participants: z.string().array(),
});
export type ConversationDescription = z.infer<
  typeof ConversationDescriptionSchema
>;

// Represents a direct-message conversation between multiple users
export const ConversationSchema = ConversationDescriptionSchema.extend({
  messages: MessageDataSchema.array(),
});
export type Conversation = z.infer<typeof ConversationSchema>;

// Represents a channel in a server
// Excludes the Messages subcollection, which should be fetched separately
export const ChannelSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export type Channel = z.infer<typeof ChannelSchema>;

export const ServerDescriptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  memberIds: z.string().array(),
});
export type ServerDescription = z.infer<typeof ServerDescriptionSchema>;

export const ServerDataSchema = ServerDescriptionSchema.extend({
  channels: ChannelSchema.array(),
});
export type ServerData = z.infer<typeof ServerDataSchema>;

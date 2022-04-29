import { z } from 'zod';

// Represents a user
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  interlocutorIDs: z.string().array(), // IDs of interlocutors
  directMessageIDs: z.string().array(), // IDs of direct messages
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

// Abstract message model type. Converted to message view props.
const MessageDataSchema = z.object({
  id: z.string(),
  authorID: z.string(),
  time: z.string(),
  content: MessageContentSchema,
});
type MessageData = z.infer<typeof MessageDataSchema>;

const ConversationSchema = z.object({
  participants: z.array(z.string()),
  messages: z.array(MessageDataSchema),
});
type Conversation = z.infer<typeof ConversationSchema>;

export type { User, TextContent, MessageContent, MessageData, Conversation };
export { UserSchema, ConversationSchema };

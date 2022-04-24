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

export type {
  ConversationData,
  MessageData,
  MessageContentData,
  TextContentData,
};

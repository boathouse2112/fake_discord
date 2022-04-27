import { v4 as uuid } from 'uuid';
import { MessageData } from '../types';
import MessageGroup, { MessageGroupProps } from './MessageGroup';

// Group model message data into MessageGroup view props.
const groupMessages = (messages: MessageData[]): MessageGroupProps[] => {
  if (!messages) {
    return [];
  }

  const messageGroups: MessageGroupProps[] = [];

  // Messages are sorted oldest to newest, so messages[0] is the oldest.
  const firstMessage = messages[0];
  const remainingMessages = messages.slice(1);

  // Create an initial message group out of the first message.
  let currentMessageGroup = {
    author: firstMessage.author,
    time: firstMessage.time,
    messages: [firstMessage],
  };

  // Push the current message group to the list, and start a new one.
  const startMessageGroup = (message: MessageData) => {
    messageGroups.push(currentMessageGroup);
    currentMessageGroup = {
      author: message.author,
      time: message.time,
      messages: [message],
    };
  };

  // Add the current message to the current message group.
  const updateMessageGroup = (message: MessageData) => {
    currentMessageGroup.messages.push(message);
  };

  // For each remaining message, if the author is the same as the current message group, update the group.
  // Else, start a new message group.
  remainingMessages.forEach((message) => {
    if (message.author === currentMessageGroup.author) {
      updateMessageGroup(message);
    } else {
      startMessageGroup(message);
    }
  });

  // Add the final message group.
  messageGroups.push(currentMessageGroup);

  return messageGroups;
};

const MessageHistory = (props: { messages: MessageData[] }) => {
  const drawMessageGroups = () => {
    const messageGroupPropsList = groupMessages(props.messages);
    return messageGroupPropsList.map((messageGroupProps) => (
      <MessageGroup key={uuid()} {...messageGroupProps} />
    ));
  };

  return (
    <div className="flex-grow flex flex-col bg-neutral-600">
      {drawMessageGroups()}
    </div>
  );
};

export default MessageHistory;

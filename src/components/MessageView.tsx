import { ConversationData, MessageContentData } from '../MessageTypes';
import MessageHistory from './MessageHistory';
import MessageInput from './MessageInput';

const MessageView = (props: {
  conversation: ConversationData;
  submitMessage: (content: MessageContentData) => void;
}) => {
  return (
    <div className="h-full flex flex-col">
      <MessageHistory messages={props.conversation.messages} />
      <MessageInput submitMessage={props.submitMessage} />
    </div>
  );
};

export default MessageView;

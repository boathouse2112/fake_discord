import { ConversationData } from '../MessageTypes';
import MessageHistory from './MessageHistory';
import MessageInput from './MessageInput';

const MessageView = (props: { conversation: ConversationData }) => {
  return (
    <div className="h-full flex flex-col">
      <MessageHistory messages={props.conversation.messages} />
      <MessageInput />
    </div>
  );
};

export default MessageView;

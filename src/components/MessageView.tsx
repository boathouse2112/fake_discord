import MessageHistory from './MessageHistory';
import MessageInput from './MessageInput';

const MessageView = () => {
  return (
    <div className="h-full flex flex-col">
      <MessageHistory />
      <MessageInput />
    </div>
  );
};

export default MessageView;

import MessageHistory from './MessageHistory';
import MessageInput from './MessageInput';

const ChannelView = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <MessageHistory messages={[]} />
      <MessageInput submitMessage={() => {}} />
    </div>
  );
};

export default ChannelView;

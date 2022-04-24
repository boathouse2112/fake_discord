import { v4 as uuid } from 'uuid';
import { useAvatar } from '../hooks';
import { MessageData } from '../MessageTypes';
import Message from './Message';

type MessageGroupProps = {
  author: string; // Author of the message
  time: string; // Time the first message was sent
  messages: MessageData[]; // Messages in this group
};

const MessageGroup = (props: MessageGroupProps) => {
  const avatar = useAvatar('user_avatar.png');

  const drawMessages = () => {
    return props.messages.map((messageData) => (
      <Message key={uuid()} {...messageData} />
    ));
  };

  return (
    <div className="p-6 flex flex-row gap-2">
      <div className="w-10 py-2">
        <img
          src={avatar}
          alt={`${props.author} avatar`}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col text-white">
        <div className="flex flex-row gap-2">
          <h1>{props.author}</h1>
          <h2>{props.time}</h2>
        </div>
        {drawMessages()}
      </div>
    </div>
  );
};

export type { MessageGroupProps };

export default MessageGroup;

import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Message, { MessageData } from './Message';

type MessageGroupData = {
  user: string; // Author of the message
  avatarFileName: string; // File name of the user's avatar -- eg. `user_avatar.png`
  time: string; // Time the first message was sent
  messages: MessageData[]; // Messages in this group
};

const useAvatar = (avatarFileName: string) => {
  const [avatar, setAvatar] = useState('');

  import(`./../resources/${avatarFileName}`).then((module) => {
    setAvatar(module.default);
  });

  return avatar;
};

const MessageGroup = (props: MessageGroupData) => {
  const avatar = useAvatar(props.avatarFileName);

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
          alt={`${props.user} avatar`}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col text-white">
        <div className="flex flex-row gap-2">
          <h1>{props.user}</h1>
          <h2>{props.time}</h2>
        </div>
        {drawMessages()}
      </div>
    </div>
  );
};

export type { MessageGroupData };

export default MessageGroup;

import dayjs from 'dayjs';
import { useAvatar, useUserName } from '../../hooks';
import { MessageData } from '../../types';
import UserName from '../user/UserName';
import Message from './Message';

type MessageGroupProps = {
  id: string;
  authorID: string; // Author of the message
  time: dayjs.Dayjs; // Time the first message was sent
  messages: MessageData[]; // Messages in this group
};

const MessageGroup = (props: MessageGroupProps) => {
  const avatar = useAvatar('user_avatar.png');
  const authorName = useUserName(props.authorID);

  const drawMessages = () => {
    return props.messages.map((message) => (
      <Message key={message.id} {...message} />
    ));
  };

  return (
    <div className="p-6 flex flex-row gap-2">
      <div className="w-10 py-2">
        <img
          src={avatar}
          alt={`${authorName ?? ''} avatar`}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col text-white">
        <div className="flex flex-row">
          {authorName === undefined ? undefined : (
            <UserName userID={props.authorID} userName={authorName} />
          )}
          <h2>{props.time.fromNow()}</h2>
        </div>
        {drawMessages()}
      </div>
    </div>
  );
};

export type { MessageGroupProps };

export default MessageGroup;

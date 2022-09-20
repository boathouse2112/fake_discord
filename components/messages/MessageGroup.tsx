import { formatRelative } from 'date-fns';
import { MessageGroupTheme } from '../../theme/theme';
import { MessageData, User } from '../../types';
import Message from './Message';

type MessageGroupProps = {
  theme: MessageGroupTheme; // The theme applied
  author: User; // Author of the message
  time: Date;
  messages: MessageData[]; // Messages in this group
};

const capitalize = ([first = '', ...rest]: string) => {
  return [first.toUpperCase(), ...rest].join('');
};

const MessageGroup = ({ theme, author, time, messages }: MessageGroupProps) => {
  const now = new Date();

  const drawMessages = () => {
    return messages.map((message) => <Message key={message.id} {...message} />);
  };

  return (
    <div className="message-group-wrapper">
      <img src="/user_avatar.png" width="40" height="40"></img>
      <div className="messages-container">
        <div className="header">
          <h2>{author.name}</h2>
          <h2>{capitalize(formatRelative(time, now))}</h2>
        </div>
        {drawMessages()}
      </div>
      <style jsx>{`
        .message-group-wrapper {
          padding: 1.5rem;
          display: flex;
          flex-direction: row;
          gap: 1rem;

          line-height: 1.375rem;
          letter-spacing: -0.025rem;
          color: ${theme.textColor};
        }
        .messages-container {
          display: flex;
          flex-direction: column;
        }
        .header {
          display: flex;
          flex-direction: row;
          gap: 0.5rem;
        }
        h2 {
          font-size: 0.75rem;
          font-weight: 500;
          color: ${theme.dateTimeColor};
        }
        p {
          margin-bottom: 0.25rem;
          font-size: 1rem;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
};

export type { MessageGroupProps };
export default MessageGroup;

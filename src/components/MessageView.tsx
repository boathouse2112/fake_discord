import { MessageGroupData } from './MessageGroup';
import MessageHistory from './MessageHistory';
import MessageInput from './MessageInput';

const DUMMY_MESSAGE_GROUPS: MessageGroupData[] = [
  {
    user: 'James',
    avatarFileName: 'user_avatar.png',
    time: 'Yesterday at 2:00 PM',
    messages: [
      {
        time: 'Yesterday at 2:00 PM',
        content: {
          type: 'text',
          text: 'This is a message.',
        },
      },
      {
        time: 'Yesterday at 2:00 PM',
        content: {
          type: 'text',
          text:
            'A VERY LONG ' +
            'MESSAGE------------------------------------------------------------------- ',
        },
      },
    ],
  },
  {
    user: 'James',
    avatarFileName: 'user_avatar.png',
    time: 'Yesterday at 2:00 PM',
    messages: [
      {
        time: 'Yesterday at 2:00 PM',
        content: {
          type: 'text',
          text: 'This is a message.',
        },
      },
      {
        time: 'Yesterday at 2:00 PM',
        content: {
          type: 'text',
          text:
            'A VERY LONG ' +
            'MESSAGE------------------------------------------------------------------- ',
        },
      },
    ],
  },
];

const MessageView = () => {
  return (
    <div className="h-full flex flex-col">
      <MessageHistory data={DUMMY_MESSAGE_GROUPS} />
      <MessageInput />
    </div>
  );
};

export default MessageView;

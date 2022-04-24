import { useState } from 'react';
import {
  ConversationData,
  MessageContentData,
  MessageData,
} from '../MessageTypes';
import InterlocutorList from './InterlocutorList';
import MessageView from './MessageView';

// DirectMessages deals with model MessageData, which is grouped for display within sub-components.

const DUMMY_MESSAGES: MessageData[] = [
  {
    author: 'Mark',
    time: 'Yesterday at 2:00 PM',
    content: {
      type: 'text',
      text: 'This is a message.',
    },
  },
  {
    author: 'Mark',
    time: 'Yesterday at 2:00 PM',
    content: {
      type: 'text',
      text:
        'A VERY LONG ' +
        'MESSAGE------------------------------------------------------------------- ',
    },
  },
  {
    author: 'Jannet',
    time: 'Yesterday at 2:00 PM',
    content: {
      type: 'text',
      text: 'This is a message.',
    },
  },
  {
    author: 'Jannet',
    time: 'Yesterday at 2:00 PM',
    content: {
      type: 'text',
      text:
        'A VERY LONG ' +
        'MESSAGE------------------------------------------------------------------- ',
    },
  },
  {
    author: 'Mark',
    time: 'Yesterday at 2:00 PM',
    content: {
      type: 'text',
      text: 'This is a message.',
    },
  },
  {
    author: 'Mark',
    time: 'Yesterday at 2:00 PM',
    content: {
      type: 'text',
      text:
        'A VERY LONG ' +
        'MESSAGE------------------------------------------------------------------- ',
    },
  },
];

const DUMMY_CONVERSATION: ConversationData = {
  interlocutor: 'Jannet',
  messages: DUMMY_MESSAGES,
};

// Handles DM state
// In the future, will sync with Firestore database.
const DirectMessages = (props: { user: string }) => {
  const [interlocutors, setInterlocutors] = useState<string[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<ConversationData>(DUMMY_CONVERSATION);

  // Submits a message from the current user, to the current conversation
  const submitMessage = (content: MessageContentData) => {
    const message: MessageData = {
      author: props.user,
      time: 'currentTime',
      content,
    };

    // Push a message to currentCoversation
    setCurrentConversation({
      interlocutor: currentConversation.interlocutor,
      messages: [...currentConversation.messages, message],
    });
  };

  return (
    <div className="w-full flex">
      <InterlocutorList />
      <MessageView
        conversation={currentConversation}
        submitMessage={submitMessage}
      />
    </div>
  );
};

export default DirectMessages;

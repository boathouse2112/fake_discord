import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchUser } from '../firebaseQueries';
import {
  ConversationData,
  MessageContentData,
  MessageData,
} from '../MessageTypes';
import InterlocutorList from './InterlocutorList';
import MessageView from './MessageView';

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

// Temporary user ID
const USER_ID = 'HHpwr6hXRpEg5loOSmWP';

const useInterlocutorIDs = (
  userID: string
): [string[] | undefined, boolean] => {
  const { data: user, isLoading } = useQuery(['user', userID], () =>
    fetchUser(userID)
  );
  const interlocutorIDs = user?.interlocutorIDs;

  return [interlocutorIDs, isLoading];
};

// Handles DM state
// In the future, will sync with Firestore database.
const DirectMessages = (props: { user: string }) => {
  const [interlocutorIDs, interlocutorsLoading] = useInterlocutorIDs(USER_ID);

  // DirectMessages deals with model MessageData, which is grouped for display within sub-components.
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
      <InterlocutorList interlocutorIDs={interlocutorIDs ?? []} />
      <MessageView
        conversation={currentConversation}
        submitMessage={submitMessage}
      />
    </div>
  );
};

export default DirectMessages;

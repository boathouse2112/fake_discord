import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchConversationParticipants, fetchUser } from '../firebaseQueries';
import { User } from '../types';
import InterlocutorList from './InterlocutorList';
import MessageView from './MessageView';

/*
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
*/

// Temporary user ID
const USER_ID = 'HHpwr6hXRpEg5loOSmWP';

const useUser = (id: string): User | undefined => {
  const { data: user } = useQuery(['user', id], () => fetchUser(id));
  return user;
};

const useConversationParticipants = (conversationIDs: string[] | undefined) => {
  const { data: participants } = useQuery(
    ['conversation-participants', conversationIDs],
    () =>
      conversationIDs !== undefined
        ? fetchConversationParticipants(conversationIDs)
        : undefined,
    { enabled: !!conversationIDs }
  );

  return participants;
};

// Handles DM state
// In the future, will sync with Firestore database.
const DirectMessages = (props: { user: string }) => {
  const user = useUser(USER_ID);
  const conversationParticipants = useConversationParticipants(
    user?.directMessageIDs
  );

  const [currentInterlocutorID, setCurrentInterlocutorID] = useState<
    string | undefined
  >(undefined);

  const interlocutorIDs = user?.interlocutorIDs;

  // Filter the user's conversations to find the one with both the user and the currentInterlocutor
  const currentConversationID = (() => {
    if (
      conversationParticipants === undefined ||
      user === undefined ||
      currentInterlocutorID === undefined
    ) {
      return undefined;
    }

    for (const { conversationID, participants } of conversationParticipants) {
      if (
        participants.includes(user.id) &&
        participants.includes(currentInterlocutorID)
      ) {
        return conversationID;
      }
    }

    return undefined;
  })();

  return (
    <div className="w-full flex">
      <InterlocutorList
        interlocutorIDs={interlocutorIDs ?? []}
        setCurrentInterlocutorID={setCurrentInterlocutorID}
      />
      <MessageView userID={USER_ID} conversationID={currentConversationID} />
    </div>
  );
};

export default DirectMessages;

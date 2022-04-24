import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ConversationData,
  MessageContentData,
  MessageData,
} from '../MessageTypes';
import firestore from './../firestore';
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

// Load interlocutor list from firestore.
// Returns [interlocutors, loading]
const useInterlocutors = (userID: string): [string[] | undefined, boolean] => {
  const [interlocutors, setInterlocutors] = useState<string[] | undefined>(
    undefined
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInterlocutorNames = async () => {
      const userDocRef = doc(firestore, 'Users', userID);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        const interlocutorIDs = data.interlocutorIDs;

        const interlocutorNames = await Promise.all<Promise<string>>(
          interlocutorIDs.map(async (interlocutorID: string) => {
            const interlocutorDocRef = doc(firestore, 'Users', interlocutorID);
            const interlocutorDocSnap = await getDoc(interlocutorDocRef);
            if (interlocutorDocSnap.exists()) {
              const interlocutorData = interlocutorDocSnap.data();
              return interlocutorData.name;
            } else {
              throw Error(`No document found: Users/${interlocutorID}`);
            }
          })
        );

        setLoading(false);
        setInterlocutors(interlocutorNames);
      } else {
        throw Error(`No document found: Users/${userID}`);
      }
    };

    getInterlocutorNames();
  }, [userID]);

  return [interlocutors, loading];
};

// Handles DM state
// In the future, will sync with Firestore database.
const DirectMessages = (props: { user: string }) => {
  const [interlocutors, interlocutorsLoading] = useInterlocutors(USER_ID);

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
      {interlocutorsLoading && <InterlocutorList interlocutors={[]} />}
      {interlocutors && <InterlocutorList interlocutors={interlocutors} />}
      <MessageView
        conversation={currentConversation}
        submitMessage={submitMessage}
      />
    </div>
  );
};

export default DirectMessages;

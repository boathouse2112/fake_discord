import { useState } from 'react';
import { useQuery } from 'react-query';
import { useFirebaseAuth } from '../../FirebaseAuthContext';
import {
  fetchConversationParticipants,
  fetchUser,
} from '../../firestoreQueries';
import { User } from '../../types';
import MessageView from '../messages/MessageView';
import InterlocutorList from './InterlocutorList';

// Gets the user with the given ID
const useUser = (userID: string | undefined): User | undefined => {
  const { data: user } = useQuery(
    ['user', userID],
    () => (userID !== undefined ? fetchUser(userID) : undefined),
    { enabled: !!userID }
  );
  console.log(userID);
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
const DirectMessages = (props: { user: string }) => {
  const authUser = useFirebaseAuth();
  const userID = authUser?.uid;

  const user = useUser(userID);
  const conversationParticipants = useConversationParticipants(
    user?.conversationIDs
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
      <MessageView conversationID={currentConversationID} />
    </div>
  );
};

export default DirectMessages;

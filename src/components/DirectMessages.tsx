import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchConversationParticipants, fetchUser } from '../firestoreQueries';
import { User } from '../types';
import InterlocutorList from './InterlocutorList';
import MessageView from './MessageView';

// Temporary user ID
const USER_ID = 'HHpwr6hXRpEg5loOSmWP';

// Gets the user with the given ID
const useUser = (userID: string): User | undefined => {
  const { data: user } = useQuery(['user', userID], () => fetchUser(userID));
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
  const user = useUser(USER_ID);
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
      <MessageView userID={USER_ID} conversationID={currentConversationID} />
    </div>
  );
};

export default DirectMessages;

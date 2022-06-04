import { useAuthUser } from "@react-query-firebase/auth";
import { useState } from "react";
import { useQuery } from "react-query";
import { auth } from "../../firebase";
import { fetchConversationParticipants } from "../../firestoreQueries";
import { useUser } from "../../hooks";
import MessageView from "../messages/MessageView";
import InterlocutorList from "./InterlocutorList";

const useConversationParticipants = (conversationIds: string[] | undefined) => {
  const { data: participants } = useQuery(
    ["conversation-participants", conversationIds],
    () =>
      conversationIds !== undefined
        ? fetchConversationParticipants(conversationIds)
        : undefined,
    { enabled: !!conversationIds }
  );

  return participants;
};

// Handles DM state
const DirectMessages = () => {
  const authUser = useAuthUser("auth-user", auth);
  const userId = authUser?.data?.uid;

  const { data: user } = useUser(userId);
  const conversationParticipants = useConversationParticipants(
    user?.conversationIds
  );

  const [currentInterlocutorId, setCurrentInterlocutorId] = useState<
    string | undefined
  >(undefined);

  const interlocutorIds = user?.interlocutorIds;

  // Filter the user's conversations to find the one with both the user and the currentInterlocutor
  const currentConversationId = (() => {
    if (
      conversationParticipants === undefined ||
      user === undefined ||
      currentInterlocutorId === undefined
    ) {
      return undefined;
    }

    for (const { conversationId, participants } of conversationParticipants) {
      if (
        participants.includes(user.id) &&
        participants.includes(currentInterlocutorId)
      ) {
        return conversationId;
      }
    }

    return undefined;
  })();

  return (
    <div className="w-full flex">
      <InterlocutorList
        interlocutorIds={interlocutorIds ?? []}
        setCurrentInterlocutorId={setCurrentInterlocutorId}
      />
      <MessageView conversationId={currentConversationId} />
    </div>
  );
};

export default DirectMessages;

import { useAuthUser } from "@react-query-firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useConversations, useUser } from "../../firebase/hooks";
import InterlocutorList from "./InterlocutorList";
import MessageViewWrapper from "../messages/MessageViewWrapper";

// Handles conversation state
const Conversations = () => {
  const authUser = useAuthUser("auth-user", auth);
  const userId = authUser?.data?.uid;

  const { data: user } = useUser(userId);
  const { data: conversations } = useConversations(user?.conversationIds);

  const [currentInterlocutorId, setCurrentInterlocutorId] = useState<
    string | undefined
  >(undefined);

  const interlocutorIds = user?.interlocutorIds;

  // Filter the user's conversations to find the one with both the user and the currentInterlocutor
  const currentConversationId = (() => {
    if (
      conversations === undefined ||
      user === undefined ||
      currentInterlocutorId === undefined
    ) {
      return undefined;
    }

    for (const { id: conversationId, participants } of conversations) {
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
      <MessageViewWrapper conversationId={currentConversationId} />
    </div>
  );
};

export default Conversations;

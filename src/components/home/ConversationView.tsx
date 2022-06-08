import { useAuthUser } from "@react-query-firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useConversations, useUser } from "../../firebase/hooks";
import InterlocutorList from "./InterlocutorList";
import MessageViewWrapper from "../messages/MessageViewWrapper";
import ConversationHeader from "./ConversationHeader";

// Handles conversation state
const ConversationView = () => {
  const authUser = useAuthUser("auth-user", auth);
  const userId = authUser?.data?.uid;

  const { data: user } = useUser(userId);
  const interlocutorIds = user?.interlocutorIds;
  const { data: conversations } = useConversations(user?.conversationIds);

  const [currentInterlocutorId, setCurrentInterlocutorId] = useState<
    string | undefined
  >(undefined);
  const { data: currentInterlocutor } = useUser(currentInterlocutorId);

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
    <div className={"w-full h-full flex flex-col"}>
      <ConversationHeader interlocutorName={currentInterlocutor?.name} />
      <div className={"h-full min-h-0 flex"}>
        <InterlocutorList
          interlocutorIds={interlocutorIds ?? []}
          setCurrentInterlocutorId={setCurrentInterlocutorId}
        />
        <MessageViewWrapper
          conversationId={currentConversationId}
          inputPlaceholder={
            currentInterlocutor
              ? `Message @${currentInterlocutor.name}`
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default ConversationView;

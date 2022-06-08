import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from "../../firebase/firebase";
import { MessageContent } from "../../types";
import MessageHistory from "./MessageHistory";
import MessageInput from "./MessageInput";
import { z } from "zod";
import { useMessages, useMessagesMutation } from "../../firebase/hooks";
import { createMessage } from "../../firebase/util";

export const MessageViewPropsSchema = z.object({
  conversationId: z.string(),
  inputPlaceholder: z.string().optional(),
});
export type MessageViewProps = z.infer<typeof MessageViewPropsSchema>;

const useConversationMessages = (conversationId: string) =>
  useMessages(`Conversations/${conversationId}/Messages`);

const useConversationMessagesMutation = (conversationId: string) =>
  useMessagesMutation(`Conversations/${conversationId}/Messages`);

const MessageView = (props: MessageViewProps) => {
  const authUser = useAuthUser("auth-user", auth);
  const userId = authUser?.data?.uid;
  const { data: messages } = useConversationMessages(props.conversationId);
  const messagesMutation = useConversationMessagesMutation(
    props.conversationId
  );

  const submitMessage = (content: MessageContent) => {
    if (!userId) {
      throw Error("Submitted message while not signed in.");
    }

    const message = createMessage(content, userId);
    messagesMutation.mutate(message);
  };

  return (
    <>
      <MessageHistory messages={messages ?? []} />
      <MessageInput
        submitMessage={submitMessage}
        placeholder={props.inputPlaceholder}
      />
    </>
  );
};

export default MessageView;

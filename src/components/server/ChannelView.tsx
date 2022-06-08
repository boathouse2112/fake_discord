import { useAuthUser } from "@react-query-firebase/auth";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { MessageContent } from "../../types";
import MessageHistory from "../messages/MessageHistory";
import MessageInput from "../messages/MessageInput";
import { useMessages, useMessagesMutation } from "../../firebase/hooks";
import { createMessage } from "../../firebase/util";

const useChannelMessages = (
  serverId: string | undefined,
  channelId: string | undefined
) =>
  useMessages(
    serverId !== undefined && channelId !== undefined
      ? `Servers/${serverId}/Channels/${channelId}/Messages`
      : undefined
  );

const useChannelMessagesMutation = (
  serverId: string | undefined,
  channelId: string | undefined
) =>
  useMessagesMutation(
    serverId !== undefined && channelId !== undefined
      ? `Servers/${serverId}/Channels/${channelId}/Messages`
      : undefined
  );

const ChannelView = () => {
  const { serverId, channelId } = useParams();

  const authUser = useAuthUser("auth-user", auth);
  const userId = authUser?.data?.uid;

  const { data: messages } = useChannelMessages(serverId, channelId);
  const messagesMutation = useChannelMessagesMutation(serverId, channelId);

  const submitMessage = (content: MessageContent) => {
    if (!userId) {
      throw Error("Submitted message while not signed in.");
    }

    const message = createMessage(content, userId);
    messagesMutation.mutate(message);
  };

  return (
    <div className="w-full h-full bg-neutral-600 flex flex-col">
      <MessageHistory messages={messages ?? []} />
      <MessageInput submitMessage={submitMessage} />
    </div>
  );
};

export default ChannelView;

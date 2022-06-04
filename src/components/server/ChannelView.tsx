import { useAuthUser } from "@react-query-firebase/auth";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase";
import { MessageContent, MessageData } from "../../types";
import MessageHistory from "../messages/MessageHistory";
import MessageInput from "../messages/MessageInput";
import { useAddMessage, useChannelMessages } from "./hooks";

const ChannelView = () => {
  const { serverId, channelId } = useParams();

  const authUser = useAuthUser("auth-user", auth);
  const userId = authUser?.data?.uid;

  const queryClient = useQueryClient();
  const messages = useChannelMessages(serverId, channelId);
  const addMessageMutation = useAddMessage(serverId, channelId, queryClient);

  const submitMessage = (content: MessageContent) => {
    if (!userId) {
      throw Error("Submitted message while not signed in.");
    }

    const message: MessageData = {
      id: nanoid(),
      authorId: userId,
      time: dayjs(),
      content,
    };

    addMessageMutation.mutate(message);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <MessageHistory messages={messages ?? []} />
      <MessageInput submitMessage={submitMessage} />
    </div>
  );
};

export default ChannelView;

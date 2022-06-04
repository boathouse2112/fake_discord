import { QueryClient, useMutation, useQuery } from "react-query";
import { addMessage, fetchMessages } from "../../firestoreQueries";
import { MessageData } from "../../types";

const useChannelMessages = (
  serverId: string | undefined,
  channelId: string | undefined
) => {
  const queryFn = () =>
    serverId === undefined || channelId === undefined
      ? undefined
      : fetchMessages(["Servers", serverId, "Channels", channelId, "Messages"]);

  const { data: messages } = useQuery(
    ["channel-messages", serverId, channelId],
    queryFn,
    { enabled: !!serverId && !!channelId }
  );

  return messages;
};

const useAddMessage = (
  serverId: string | undefined,
  channelId: string | undefined,
  queryClient: QueryClient
) => {
  const mutationFn = (message: MessageData) => {
    return new Promise((resolve, reject) => {
      if (serverId === undefined || channelId === undefined) {
        reject("conversationId is undefined");
      } else {
        const messagesPath = [
          "Servers",
          serverId,
          "Channels",
          channelId,
          "Messages",
        ];
        resolve(addMessage(messagesPath, message));
      }
    });
  };

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(["channel-messages", serverId, channelId]);
    },
  });
};

export { useChannelMessages, useAddMessage };

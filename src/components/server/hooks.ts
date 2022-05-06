import { QueryClient, useMutation, useQuery } from 'react-query';
import { addMessage, fetchMessages } from '../../firestoreQueries';
import { MessageData } from '../../types';

const useChannelMessages = (
  serverID: string | undefined,
  channelID: string | undefined
) => {
  const queryFn = () =>
    serverID === undefined || channelID === undefined
      ? undefined
      : fetchMessages(['Servers', serverID, 'Channels', channelID, 'Messages']);

  const { data: messages } = useQuery(
    ['channel-messages', serverID, channelID],
    queryFn,
    { enabled: !!serverID && !!channelID }
  );

  return messages;
};

const useAddMessage = (
  serverID: string | undefined,
  channelID: string | undefined,
  queryClient: QueryClient
) => {
  const mutationFn = (message: MessageData) => {
    return new Promise((resolve, reject) => {
      if (serverID === undefined || channelID === undefined) {
        reject('conversationID is undefined');
      } else {
        const messagesPath = [
          'Servers',
          serverID,
          'Channels',
          channelID,
          'Messages',
        ];
        resolve(addMessage(messagesPath, message));
      }
    });
  };

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['channel-messages', serverID, channelID]);
    },
  });
};

export { useChannelMessages, useAddMessage };

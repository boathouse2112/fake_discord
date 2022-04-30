import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { useParams } from 'react-router-dom';
import { addMessage, fetchMessages } from '../../firestoreQueries';
import { MessageContent, MessageData } from '../../types';
import MessageHistory from '../messages/MessageHistory';
import MessageInput from '../messages/MessageInput';

const useChannelMessages = (
  userID: string,
  serverID: string | undefined,
  channelID: string | undefined
) => {
  const queryFn = () =>
    serverID === undefined || channelID === undefined
      ? undefined
      : fetchMessages(['Servers', serverID, 'Channels', channelID, 'Messages']);

  const { data: messages } = useQuery(
    ['channel-messages', channelID],
    queryFn,
    { enabled: !!channelID }
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
      queryClient.invalidateQueries(['channel-messages', channelID]);
    },
  });
};

const ChannelView = (props: { userID: string }) => {
  const { serverID, channelID } = useParams();

  const queryClient = useQueryClient();
  const messages = useChannelMessages(props.userID, serverID, channelID);
  const addMessageMutation = useAddMessage(serverID, channelID, queryClient);

  const submitMessage = (content: MessageContent) => {
    const message: MessageData = {
      id: nanoid(),
      authorID: props.userID,
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

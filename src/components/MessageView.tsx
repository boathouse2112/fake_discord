import dayjs from 'dayjs';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { v4 as uuid } from 'uuid';
import { addMessage, fetchConversation } from '../firebaseQueries';
import { MessageContent, MessageData } from '../types';
import MessageHistory from './MessageHistory';
import MessageInput from './MessageInput';

const useConversation = (conversationID: string | undefined) => {
  const { data: conversation } = useQuery(
    ['conversation', conversationID],
    () =>
      conversationID !== undefined
        ? fetchConversation(conversationID)
        : undefined,
    { enabled: !!conversationID }
  );

  return conversation;
};

const useAddMessage = (
  conversationID: string | undefined,
  queryClient: QueryClient
) => {
  const mutationFn = (message: MessageData) => {
    return new Promise((resolve, reject) => {
      if (conversationID === undefined) {
        reject('conversationID is undefined');
      } else {
        resolve(addMessage(conversationID, message));
      }
    });
  };

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['conversation', conversationID]);
    },
  });
};

const MessageView = (props: {
  userID: string;
  conversationID: string | undefined;
}) => {
  const queryClient = useQueryClient();
  const conversation = useConversation(props.conversationID);
  const addMessageMutation = useAddMessage(props.conversationID, queryClient);

  const submitMessage = (content: MessageContent) => {
    const message: MessageData = {
      id: uuid(),
      authorID: props.userID,
      time: dayjs(),
      content,
    };

    addMessageMutation.mutate(message);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <MessageHistory messages={conversation?.messages ?? []} />
      <MessageInput submitMessage={submitMessage} />
    </div>
  );
};

export default MessageView;

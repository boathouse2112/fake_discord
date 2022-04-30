import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { useFirebaseAuth } from '../../FirebaseAuthContext';
import { addMessage, fetchConversation } from '../../firestoreQueries';
import { MessageContent, MessageData } from '../../types';
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
        const messagesPath = ['Conversations', conversationID, 'Messages'];
        resolve(addMessage(messagesPath, message));
      }
    });
  };

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['conversation', conversationID]);
    },
  });
};

const MessageView = (props: { conversationID: string | undefined }) => {
  const queryClient = useQueryClient();
  const authUser = useFirebaseAuth();
  const userID = authUser?.uid;
  const conversation = useConversation(props.conversationID);
  const addMessageMutation = useAddMessage(props.conversationID, queryClient);

  const submitMessage = (content: MessageContent) => {
    if (!userID) {
      throw Error('Submitted message while not signed in.');
    }

    const message: MessageData = {
      id: nanoid(),
      authorID: userID,
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

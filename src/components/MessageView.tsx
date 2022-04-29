import { useQuery } from 'react-query';
import { fetchConversation } from '../firebaseQueries';
import { MessageContent } from '../types';
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

const MessageView = (props: {
  conversationID: string | undefined;
  submitMessage(content: MessageContent): void;
}) => {
  const conversation = useConversation(props.conversationID);

  return (
    <div className="h-full flex flex-col">
      <MessageHistory messages={conversation?.messages ?? []} />
      <MessageInput submitMessage={props.submitMessage} />
    </div>
  );
};

export default MessageView;

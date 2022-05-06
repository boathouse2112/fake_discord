import { useAuthUser } from '@react-query-firebase/auth';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { auth } from '../../firebase';
import { MessageContent, MessageData } from '../../types';
import MessageHistory from '../messages/MessageHistory';
import MessageInput from '../messages/MessageInput';
import { useAddMessage, useChannelMessages } from './hooks';

const ChannelView = () => {
  const { serverID, channelID } = useParams();

  const authUser = useAuthUser('auth-user', auth);
  const userID = authUser?.data?.uid;

  const queryClient = useQueryClient();
  const messages = useChannelMessages(serverID, channelID);
  const addMessageMutation = useAddMessage(serverID, channelID, queryClient);

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
      <MessageHistory messages={messages ?? []} />
      <MessageInput submitMessage={submitMessage} />
    </div>
  );
};

export default ChannelView;

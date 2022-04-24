import { v4 as uuid } from 'uuid';
import MessageGroup, { MessageGroupData } from './MessageGroup';

const MessageHistory = (props: { data: MessageGroupData[] }) => {
  const drawMessageGroups = () => {
    return props.data.map((messageGroupData) => (
      <MessageGroup key={uuid()} {...messageGroupData} />
    ));
  };

  return (
    <div className="flex-grow flex flex-col bg-neutral-600">
      {drawMessageGroups()}
    </div>
  );
};

export default MessageHistory;

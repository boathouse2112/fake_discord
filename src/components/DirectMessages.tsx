import InterlocutorList from './InterlocutorList';
import MessageView from './MessageView';

const DirectMessages = () => {
  return (
    <div className="w-full flex">
      <InterlocutorList />
      <MessageView />
    </div>
  );
};

export default DirectMessages;

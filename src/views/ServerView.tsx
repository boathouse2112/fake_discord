import Server from '../components/server/Server';
import ServerList from '../components/server_list/ServerList';

const ServerView = () => {
  return (
    <div className="h-full w-full flex">
      <ServerList />
      <Server />
    </div>
  );
};

export default ServerView;

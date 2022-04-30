import Server from '../components/server/Server';
import ServerList from '../components/server_list/ServerList';

const ServerView = (props: { userID: string }) => {
  return (
    <>
      <ServerList />
      <Server />
    </>
  );
};

export default ServerView;

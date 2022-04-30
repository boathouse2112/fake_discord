import Server from '../components/server/Server';

const ServerView = (props: { userID: string }) => {
  return (
    <>
      <Server userID={props.userID} />
    </>
  );
};

export default ServerView;

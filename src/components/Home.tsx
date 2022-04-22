import DirectMessages from './DirectMessages';
import ServerList from './ServerList';

const Home = () => {
  return (
    <div>
      <ServerList />
      <DirectMessages />
    </div>
  );
};

export default Home;

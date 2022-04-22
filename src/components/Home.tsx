import DirectMessages from './DirectMessages';
import ServerList from './ServerList';

const Home = () => {
  return (
    <div className="h-full">
      <ServerList />
      <DirectMessages />
    </div>
  );
};

export default Home;

import DirectMessages from './DirectMessages';
import ServerList from './ServerList';

const Home = () => {
  return (
    <div className="h-full w-full flex">
      <ServerList />
      <DirectMessages />
    </div>
  );
};

export default Home;

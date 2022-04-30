import DirectMessages from '../components/home/DirectMessages';
import ServerList from '../components/server_list/ServerList';

const Home = () => {
  return (
    <div className="h-full w-full flex">
      <ServerList />
      <DirectMessages user="Mark" />
    </div>
  );
};

export default Home;

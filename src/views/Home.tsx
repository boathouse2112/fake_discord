import DirectMessages from '../components/home/DirectMessages';
import ServerList from '../components/server_list/ServerList';

const Home = () => {
  return (
    <>
      <ServerList />
      <DirectMessages user="Mark" />
    </>
  );
};

export default Home;

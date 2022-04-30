import Server from './Server';
import ServerList from './ServerList';

const Home = () => {
  return (
    <div className="h-full w-full flex">
      <ServerList />
      {/* <DirectMessages user="Mark" /> */}
      <Server />
    </div>
  );
};

export default Home;

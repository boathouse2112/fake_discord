import { useAuthUser } from '@react-query-firebase/auth';
import { Navigate, useLocation } from 'react-router-dom';
import DirectMessages from '../components/home/DirectMessages';
import ServerList from '../components/server_list/ServerList';
import { auth } from '../firebase';

const Home = () => {
  const authUser = useAuthUser('auth-user', auth);
  const location = useLocation();

  // Redirect logged-out users to the login page
  if (authUser.isLoading || authUser.isError) {
    return (
      <Navigate
        replace
        to="/"
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return (
    <>
      <ServerList />
      <DirectMessages user="Mark" />
    </>
  );
};

export default Home;

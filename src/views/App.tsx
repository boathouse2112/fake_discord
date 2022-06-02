import { useAuthUser } from '@react-query-firebase/auth';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ChannelView from '../components/server/ChannelView';
import { auth } from '../firebase';
import Home from './Home';
import Login from './Login';
import ServerView from './ServerView';
dayjs.extend(relativeTime);

const USER_ID = 'HHpwr6hXRpEg5loOSmWP';

function App() {
  const { isSuccess: loggedIn } = useAuthUser(['user'], auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <Login />} />
        <Route path="/@me" element={loggedIn ? <Home /> : <Login />} />
        <Route
          path="/:serverID"
          element={loggedIn ? <ServerView userID={USER_ID} /> : <Login />}
        >
          <Route path=":channelID" element={<ChannelView />} />
        </Route>
        <Route path="*" element={<Navigate to="/@me" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

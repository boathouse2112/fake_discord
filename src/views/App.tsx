import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ChannelView from '../components/server/ChannelView';
import Home from './Home';
import Login from './Login';
import ServerView from './ServerView';

const queryClient = new QueryClient();
dayjs.extend(relativeTime);

const USER_ID = 'HHpwr6hXRpEg5loOSmWP';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="h-screen w-screen flex">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/@me" element={<Home />} />
            <Route path="/:serverID" element={<ServerView userID={USER_ID} />}>
              <Route path=":channelID" element={<ChannelView />} />
            </Route>
            <Route path="*" element={<Navigate to="/@me" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

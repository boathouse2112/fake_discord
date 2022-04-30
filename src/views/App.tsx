import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { QueryClient, QueryClientProvider } from 'react-query';
import ServerView from './ServerView';

const queryClient = new QueryClient();
dayjs.extend(relativeTime);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-screen">
        {/* <Home /> */}
        <ServerView />
      </div>
    </QueryClientProvider>
  );
}

export default App;

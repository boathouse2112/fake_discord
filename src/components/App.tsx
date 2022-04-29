import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './Home';

const queryClient = new QueryClient();
dayjs.extend(relativeTime);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-screen">
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './Home';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    dayjs.extend(relativeTime);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-screen">
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;

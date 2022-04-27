import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './Home';

const queryClient = new QueryClient();

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

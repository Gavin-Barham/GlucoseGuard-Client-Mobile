import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { UserProvider } from './Context/UserContext';
import Stacks from './Stacks';


export default function App() {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
		    <UserProvider >
            <Stacks />
		    </UserProvider>
      </QueryClientProvider>
    );
    
}
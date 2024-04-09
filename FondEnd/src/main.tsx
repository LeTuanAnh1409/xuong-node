import { QueryClientProvider,QueryClient } from '@tanstack/react-query';
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx';
import './index.css';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
 <QueryClientProvider client={queryClient}>
  <BrowserRouter>
  <App/>
  </BrowserRouter>
 </QueryClientProvider>
)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/agate.css';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
 
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.Fragment>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from '@/assets/styles/GlobalStyles';
import { QueryProvider } from '@/lib/react-query/QueryProvider';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* NOTE: react query setting */}
      <QueryProvider>
        {/* NOTE: Globally resetting CSS styles*/}
        <GlobalStyles />

        <App />
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);

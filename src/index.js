import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import {ReactQueryDevtools} from "react-query/devtools";
import {QueryProvider} from "@/lib/react-query/QueryProvider";

import App from './App';
import GlobalStyles from "@/assets/styles/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* NOTE: react query setting */}
      <QueryProvider>
        {/* NOTE: Globally resetting CSS styles*/}
        <GlobalStyles />

        {/* NOTE: react query dev tools */}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>

        <App/>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);


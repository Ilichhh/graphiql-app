import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './store/store';
import GlobalStyles from './globalStyles';

import './i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

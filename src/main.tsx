import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { Toast } from './components';
import { store } from './store/store';

import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from './globalStyles';
import { darkTheme } from './muiTheme';

import './i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <GlobalStyles />
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <App />
        <Toast />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

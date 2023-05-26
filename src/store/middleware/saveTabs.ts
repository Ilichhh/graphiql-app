import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

const saveTabs: Middleware = (store) => (next) => (action: PayloadAction) => {
  const result = next(action);
  const { type } = action;

  if (type.indexOf('tabs/') === 0) {
    localStorage.setItem('tabs', JSON.stringify(store.getState().tabs));
  }

  return result;
};

export default saveTabs;

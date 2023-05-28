import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import saveTabs from './middleware/saveTabs';
import sidebarSlice from './sidebarSlice';
import errorSlice from './errorState';
import tabsSlice from './tabsSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    error: errorSlice,
    tabs: tabsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, saveTabs),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

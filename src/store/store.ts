import { configureStore } from '@reduxjs/toolkit';
import endpointReducer from './endpointSlice';
import editorSlice from './editorSlice';
import { apiSlice } from './apiSlice';
import sidebarSlice from './sidebarSlice';
import errorSlice from './errorState';
import tabsSlice from './tabsSlice';

export const store = configureStore({
  reducer: {
    endpoint: endpointReducer,
    editor: editorSlice,
    sidebar: sidebarSlice,
    error: errorSlice,
    tabs: tabsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

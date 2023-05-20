import { configureStore } from '@reduxjs/toolkit';
import endpointReducer from './endpointSlice';
import editorSlice from './editorSlice';
import { apiSlice } from './apiSlice';
import errorSlice from './errorSlice';
import sidebarSlice from './sidebarSlice';

export const store = configureStore({
  reducer: {
    endpoint: endpointReducer,
    editor: editorSlice,
    sidebar: sidebarSlice,
    error: errorSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

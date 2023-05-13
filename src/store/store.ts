import { configureStore } from '@reduxjs/toolkit';
import endpointReducer from './endpointSlice';
import editorSlice from './editorSlice';
import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    endpoint: endpointReducer,
    editor: editorSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

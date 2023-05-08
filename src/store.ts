import { configureStore } from '@reduxjs/toolkit';
import endpointReducer from './components/playground/header/endpointSlice';
import querySlice from './components/playground/editor/querySlice';

export const store = configureStore({
  reducer: {
    endpoint: endpointReducer,
    query: querySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

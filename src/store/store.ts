import { configureStore } from '@reduxjs/toolkit';
import endpointReducer from './endpointSlice';
import editorSlice from './editorSlice';

export const store = configureStore({
  reducer: {
    endpoint: endpointReducer,
    editor: editorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

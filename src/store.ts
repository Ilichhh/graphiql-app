import { configureStore } from '@reduxjs/toolkit';
import endpointReducer from './components/playground/header/endpointSlice';
import editorSlice from './components/playground/editor/editorSlice';

export const store = configureStore({
  reducer: {
    endpoint: endpointReducer,
    editor: editorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

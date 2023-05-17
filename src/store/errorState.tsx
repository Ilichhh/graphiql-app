import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ErrorState = { [key: string]: string };

const initialState: ErrorState = {};

const errorSlice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    setError: (
      state,
      { payload: { tabId, error } }: PayloadAction<{ tabId: string; error: string }>
    ) => {
      return {
        ...state,
        [tabId]: error,
      };
    },
  },
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;

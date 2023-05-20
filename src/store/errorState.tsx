import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ErrorState = string[];

const initialState: ErrorState = [];

const errorSlice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    setError: (
      state,
      { payload: { tabIdx, error } }: PayloadAction<{ tabIdx: number; error: string }>
    ) => {
      state[tabIdx] = error;
    },
  },
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;

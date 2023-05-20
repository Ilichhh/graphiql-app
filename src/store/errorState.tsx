import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: '',
  reducers: {
    setError: (state, { payload: { error } }: PayloadAction<{ error: string }>) => error,
  },
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: '',
  reducers: {
    setError: (_, action: PayloadAction<string>) => action.payload,
  },
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;

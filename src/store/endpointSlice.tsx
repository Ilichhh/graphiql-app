import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const endpointSlice = createSlice({
  name: 'endpoint',
  initialState: '',
  reducers: {
    set: (_, action: PayloadAction<string>) => action.payload,
  },
});

export const { set } = endpointSlice.actions;
export default endpointSlice.reducer;

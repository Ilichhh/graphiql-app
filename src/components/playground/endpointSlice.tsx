import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_ENDPOINT_URL } from '../../constants';
import type { PayloadAction } from '@reduxjs/toolkit';

const endpointSlice = createSlice({
  name: 'endpoint',
  initialState: INITIAL_ENDPOINT_URL,
  reducers: {
    set: (_, action: PayloadAction<string>) => action.payload,
  },
});

export const { set } = endpointSlice.actions;
export default endpointSlice.reducer;

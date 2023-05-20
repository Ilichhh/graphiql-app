import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type EndpointState = string[];

const initialState: EndpointState = [];

const endpointSlice = createSlice({
  name: 'endpoint',
  initialState: initialState,
  reducers: {
    setEndpoint: (
      state,
      { payload: { tabIdx, endpoint } }: PayloadAction<{ tabIdx: number; endpoint: string }>
    ) => {
      state[tabIdx] = endpoint;
    },
  },
});

export const { setEndpoint } = endpointSlice.actions;
export default endpointSlice.reducer;

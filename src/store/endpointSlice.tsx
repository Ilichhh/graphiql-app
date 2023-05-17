import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type EndpointState = { [key: string]: string };

const initialState: EndpointState = {};

const endpointSlice = createSlice({
  name: 'endpoint',
  initialState: initialState,
  reducers: {
    setEndpoint: (
      state,
      { payload: { tabId, endpoint } }: PayloadAction<{ tabId: string; endpoint: string }>
    ) => {
      return {
        ...state,
        [tabId]: endpoint,
      };
    },
  },
});

export const { setEndpoint } = endpointSlice.actions;
export default endpointSlice.reducer;

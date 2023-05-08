import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_QUERY } from '../../../constants';
import type { PayloadAction } from '@reduxjs/toolkit';

const querySlice = createSlice({
  name: 'query',
  initialState: INITIAL_QUERY,
  reducers: {
    set: (_, action: PayloadAction<string>) => action.payload,
  },
});

export const { set } = querySlice.actions;
export default querySlice.reducer;

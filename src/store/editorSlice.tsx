import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_QUERY } from '../constants';
import type { PayloadAction } from '@reduxjs/toolkit';

const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    query: INITIAL_QUERY,
    variables: '',
    headers: '',
  },
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setVariables: (state, action: PayloadAction<string>) => {
      state.variables = action.payload;
    },
    setHeaders: (state, action: PayloadAction<string>) => {
      state.headers = action.payload;
    },
  },
});

export const { setQuery, setVariables, setHeaders } = editorSlice.actions;
export default editorSlice.reducer;

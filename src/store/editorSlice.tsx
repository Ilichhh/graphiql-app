import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type EditorState = {
  queries: string[];
  variables: string[];
  headers: string[];
};

const initialState: EditorState = {
  queries: [],
  headers: [],
  variables: [],
};

const editorSlice = createSlice({
  name: 'editor',
  initialState: initialState,
  reducers: {
    setQuery: (
      state,
      { payload: { tabIdx, query } }: PayloadAction<{ tabIdx: number; query: string }>
    ) => {
      state.queries[tabIdx] = query;
    },
    setVariables: (
      state,
      { payload: { tabIdx, variables } }: PayloadAction<{ tabIdx: number; variables: string }>
    ) => {
      state.variables[tabIdx] = variables;
    },
    setHeaders: (
      state,
      { payload: { tabIdx, headers } }: PayloadAction<{ tabIdx: number; headers: string }>
    ) => {
      state.headers[tabIdx] = headers;
    },
  },
});

export const { setQuery, setVariables, setHeaders } = editorSlice.actions;
export default editorSlice.reducer;

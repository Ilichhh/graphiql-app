import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type EditorState = {
  queries: { [key: string]: string };
  variables: { [key: string]: string };
  headers: { [key: string]: string };
};

const initialState: EditorState = {
  queries: {},
  headers: {},
  variables: {},
};

const editorSlice = createSlice({
  name: 'editor',
  initialState: initialState,
  reducers: {
    setQuery: (
      state,
      { payload: { tabId, query } }: PayloadAction<{ tabId: string; query: string }>
    ) => {
      return {
        ...state,
        queries: { ...state.queries, [tabId]: query },
      };
    },
    setVariables: (
      state,
      { payload: { tabId, variables } }: PayloadAction<{ tabId: string; variables: string }>
    ) => {
      return {
        ...state,
        variables: { ...state.variables, [tabId]: variables },
      };
    },
    setHeaders: (
      state,
      { payload: { tabId, headers } }: PayloadAction<{ tabId: string; headers: string }>
    ) => {
      return {
        ...state,
        headers: { ...state.headers, [tabId]: headers },
      };
    },
  },
});

export const { setQuery, setVariables, setHeaders } = editorSlice.actions;
export default editorSlice.reducer;

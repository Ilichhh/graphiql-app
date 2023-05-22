import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Tab = {
  name: string;
  instanceOfTemplate?: string;
  endpoint: string;
  query: string;
  variables: string;
  headers: string;
};

type TabsState = {
  selectedIdx: number;
  tabs: Tab[];
};

const initialState: TabsState = {
  selectedIdx: 0,
  tabs: [
    {
      name: 'New Tab',
      endpoint: '',
      query: '',
      variables: '',
      headers: '',
    },
  ],
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: initialState,
  reducers: {
    addTab: (state, { payload: tab }: PayloadAction<Tab>) => {
      state.tabs.push(tab);
      state.selectedIdx = state.tabs.length - 1;
    },
    deleteTab: (state, { payload: index }: PayloadAction<number>) => {
      state.tabs.splice(index, 1);
      if (state.selectedIdx === index) {
        state.selectedIdx = index >= state.tabs.length ? state.tabs.length - 1 : index;
      }
      if (state.selectedIdx >= state.tabs.length) {
        state.selectedIdx = state.tabs.length - 1;
      }
    },
    selectTab: (state, { payload: index }: PayloadAction<number>) => {
      state.selectedIdx = index;
    },
    changeName: (
      state,
      {
        payload: { name, index, templateId },
      }: PayloadAction<{ name: string; index?: number; templateId: string }>
    ) => {
      if (index) {
        state.tabs[index].name = name;
        state.tabs[index].instanceOfTemplate = templateId;
        return;
      }
      state.tabs.map((tab) => {
        if (tab.instanceOfTemplate === templateId) {
          tab.name = name;
        }
      });
    },
    setEndpoint: (
      state,
      { payload: { tabIdx, endpoint } }: PayloadAction<{ tabIdx: number; endpoint: string }>
    ) => {
      state.tabs[tabIdx].endpoint = endpoint;
    },
    setQuery: (
      state,
      { payload: { tabIdx, query } }: PayloadAction<{ tabIdx: number; query: string }>
    ) => {
      state.tabs[tabIdx].query = query;
    },
    setVariables: (
      state,
      { payload: { tabIdx, variables } }: PayloadAction<{ tabIdx: number; variables: string }>
    ) => {
      state.tabs[tabIdx].variables = variables;
    },
    setHeaders: (
      state,
      { payload: { tabIdx, headers } }: PayloadAction<{ tabIdx: number; headers: string }>
    ) => {
      state.tabs[tabIdx].headers = headers;
    },
  },
});

export const {
  addTab,
  deleteTab,
  selectTab,
  changeName,
  setEndpoint,
  setQuery,
  setVariables,
  setHeaders,
} = tabsSlice.actions;
export default tabsSlice.reducer;

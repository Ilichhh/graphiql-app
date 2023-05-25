import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Tab = {
  id: number;
  name: string;
  instanceOfTemplate?: string;
  endpoint: string;
  query: string;
  variables: string;
  headers: string;
  response?: Response;
};

type TabsState = {
  selectedIdx: number;
  tabs: Tab[];
};

export type Response = {
  data: string;
  status?: number;
};

const initialId = new Date().getTime();
const initialState: TabsState = {
  selectedIdx: initialId,
  tabs: [
    {
      id: initialId,
      name: '',
      endpoint: '',
      query: '',
      variables: '',
      headers: '',
    },
  ],
};

type NewTab = Omit<Tab, 'id'>;

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: initialState,
  reducers: {
    addTab: (state, { payload: tab }: PayloadAction<NewTab>) => {
      const id = new Date().getTime();
      state.tabs.push({ id, ...tab });
      state.selectedIdx = id;
    },
    deleteTab: (state, { payload: id }: PayloadAction<number>) => {
      const { tabs } = state;
      const index = tabs.findIndex(({ id: tabId }) => tabId === id);
      tabs.splice(index, 1);
      const { length } = tabs;

      if (state.selectedIdx === id) {
        state.selectedIdx = index >= length ? tabs[length - 1].id : tabs[index].id;
      }
    },
    selectTab: (state, { payload: id }: PayloadAction<number>) => {
      state.selectedIdx = id;
    },
    changeName: (
      state,
      {
        payload: { name, id, templateId },
      }: PayloadAction<{ name: string; id?: number; templateId: string }>
    ) => {
      if (id) {
        const index = state.tabs.findIndex(({ id: tabId }) => tabId === id);
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
      { payload: { tabId, endpoint } }: PayloadAction<{ tabId: number; endpoint: string }>
    ) => {
      const tabIdx = state.tabs.findIndex(({ id }) => tabId === id);
      state.tabs[tabIdx].endpoint = endpoint;
    },
    setQuery: (
      state,
      { payload: { tabId, query } }: PayloadAction<{ tabId: number; query: string }>
    ) => {
      const tabIdx = state.tabs.findIndex(({ id }) => tabId === id);
      state.tabs[tabIdx].query = query;
    },
    setVariables: (
      state,
      { payload: { tabId, variables } }: PayloadAction<{ tabId: number; variables: string }>
    ) => {
      const tabIdx = state.tabs.findIndex(({ id }) => tabId === id);
      state.tabs[tabIdx].variables = variables;
    },
    setHeaders: (
      state,
      { payload: { tabId, headers } }: PayloadAction<{ tabId: number; headers: string }>
    ) => {
      const tabIdx = state.tabs.findIndex(({ id }) => tabId === id);
      state.tabs[tabIdx].headers = headers;
    },
    setResponse: (
      state,
      { payload: { tabId, response } }: PayloadAction<{ tabId: number; response?: Response }>
    ) => {
      const tabIdx = state.tabs.findIndex(({ id }) => tabId === id);
      state.tabs[tabIdx].response = response;
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
  setResponse,
} = tabsSlice.actions;
export default tabsSlice.reducer;

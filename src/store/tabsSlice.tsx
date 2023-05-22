import { createSlice } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './store';
import { setQuery, setVariables, setHeaders } from './editorSlice';
import { setEndpoint } from './endpointSlice';

import { AnyAction } from 'redux';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DocumentData } from '@firebase/firestore';

type Tab = {
  name: string;
  instanceOfTemplate?: string;
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
    },
  ],
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: initialState,
  reducers: {
    addTab: (state, { payload: { name, instanceOfTemplate } }: PayloadAction<Tab>) => {
      state.tabs.push({ name, instanceOfTemplate });
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
  },
});

export const addNewTab = (data: DocumentData, templateId: string) => {
  const { name, endpoint, query, variables, headers } = data;
  return (dispatch: ThunkDispatch<RootState, undefined, AnyAction>, getState: () => RootState) => {
    dispatch(addTab({ name, instanceOfTemplate: templateId }));
    const state = getState();
    const tabIdx = state.tabs.selectedIdx;
    dispatch(setEndpoint({ tabIdx, endpoint }));
    dispatch(setQuery({ tabIdx, query }));
    dispatch(setVariables({ tabIdx, variables }));
    dispatch(setHeaders({ tabIdx, headers }));
  };
};

export const { addTab, deleteTab, selectTab, changeName } = tabsSlice.actions;
export default tabsSlice.reducer;

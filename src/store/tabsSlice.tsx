import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Tab = {
  id: string;
  name: string;
};

type TabsState = {
  selectedId: string;
  tabs: Tab[];
};

const initialState: TabsState = {
  selectedId: '1',
  tabs: [
    {
      name: 'New Tab',
      id: '1',
    },
  ],
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: initialState,
  reducers: {
    addTab: (state) => {
      const id = new Date().getTime().toString();
      return {
        ...state,
        selectedId: id,
        tabs: [
          ...state.tabs,
          {
            id: id,
            name: 'New Tab',
          },
        ],
      };
    },
    deleteTab: (state, { payload: id }: PayloadAction<string>) => {
      const index = state.tabs.findIndex(({ id: tabId }) => tabId === id);
      const nextIndex = index === state.tabs.length - 1 ? state.tabs.length - 2 : index + 1;
      const { id: selectedId } = state.tabs[nextIndex];
      const { selectedId: currentSelectedId } = state;

      return {
        ...state,
        selectedId: currentSelectedId === id ? selectedId : currentSelectedId,
        tabs: [...state.tabs.filter(({ id: tabId }) => tabId !== id)],
      };
    },
    selectTab: (state, { payload: id }: PayloadAction<string>) => {
      return {
        ...state,
        selectedId: id,
      };
    },
    changeName: (state, { payload: { id, name } }: PayloadAction<{ id: string; name: string }>) => {
      const tab = state.tabs.find(({ id: tabId }) => tabId === id);
      if (tab) {
        tab.name = name;
      }
      return {
        ...state,
      };
    },
  },
});

export const { addTab, deleteTab, selectTab, changeName } = tabsSlice.actions;
export default tabsSlice.reducer;

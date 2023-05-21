import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Tab = {
  name: string;
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
    addTab: (state, { payload: name }: PayloadAction<string>) => {
      state.tabs.push({ name });
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
      { payload: { index, name } }: PayloadAction<{ index: number; name: string }>
    ) => {
      state.tabs[index].name = name;
    },
  },
});

export const { addTab, deleteTab, selectTab, changeName } = tabsSlice.actions;
export default tabsSlice.reducer;

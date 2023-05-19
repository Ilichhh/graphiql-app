import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SidebarTabs, QueryTemplateData } from '../types';

interface SidebarState {
  isOpen: boolean;
  activeTab: SidebarTabs;
  queryTemplates: QueryTemplateData[];
}

const initialState: SidebarState = {
  isOpen: false,
  activeTab: SidebarTabs.Templates,
  queryTemplates: [],
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<SidebarTabs>) => {
      state.activeTab = action.payload;
    },
    setQueryTemplates: (state, action: PayloadAction<QueryTemplateData[]>) => {
      state.queryTemplates = action.payload;
    },
  },
});

export const { setIsOpen, setQueryTemplates } = sidebarSlice.actions;
export default sidebarSlice.reducer;
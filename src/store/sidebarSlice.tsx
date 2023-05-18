import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SidebarTabs } from '../types';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: false,
    activeTab: SidebarTabs.Templates,
    queryTemplates: '',
  },
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<SidebarTabs>) => {
      state.activeTab = action.payload;
    },
    setQueryTemplates: (state, action: PayloadAction<string>) => {
      state.queryTemplates = action.payload;
    },
  },
});

export const { setIsOpen, setQueryTemplates } = sidebarSlice.actions;
export default sidebarSlice.reducer;

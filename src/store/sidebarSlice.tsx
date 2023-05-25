import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SidebarTabs, QueryTemplateData, RunHistoryData } from '../types';

interface SidebarState {
  isOpen: boolean;
  activeTab: SidebarTabs;
  queryTemplates: QueryTemplateData[];
  runHistory: RunHistoryData[];
}

const initialState: SidebarState = {
  isOpen: false,
  activeTab: SidebarTabs.Templates,
  queryTemplates: [],
  runHistory: [],
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
    renameTemplate: (state, action: PayloadAction<{ templateId: string; newName: string }>) => {
      const { templateId, newName } = action.payload;
      const template = state.queryTemplates.find((template) => template.id === templateId);
      if (template) {
        template.data.name = newName;
      }
    },
    setRunHistory: (state, action: PayloadAction<RunHistoryData[]>) => {
      state.runHistory = action.payload.sort((a, b) => b.timestamp - a.timestamp);
    },
  },
});

export const { setIsOpen, setActiveTab, setQueryTemplates, renameTemplate, setRunHistory } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;

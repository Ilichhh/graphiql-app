import { useCallback } from 'react';
import { useAppSelector } from './reduxTypedHooks';
import { useAppDispatch } from './reduxTypedHooks';

import { changeName } from '../store/tabsSlice';
import {
  setIsOpen,
  setActiveTab,
  setQueryTemplates,
  renameTemplate as renameTemplateAction,
  setRunHistory,
} from '../store/sidebarSlice';
import {
  getAllQueryTemplates,
  deleteQueryTemplate,
  saveQueryTemplate,
  renameQueryTemplate,
  saveQueryRunToHistory,
  getAllQueriesHistory,
} from '../api/firebaseApi';

import { DocumentData } from '@firebase/firestore';
import { SidebarTabs } from '../types';

export const useSidebar = () => {
  const dispatch = useAppDispatch();
  const { isOpen, activeTab, queryTemplates, runHistory } = useAppSelector(
    (state) => state.sidebar
  );
  const tabIdx = useAppSelector(({ tabs: { selectedIdx } }) => selectedIdx);

  const closeSidebar = useCallback(() => {
    dispatch(setIsOpen(false));
  }, [dispatch]);

  const openSidebar = useCallback(() => {
    dispatch(setIsOpen(true));
  }, [dispatch]);

  const changeTab = useCallback(
    (tab: SidebarTabs) => {
      dispatch(setActiveTab(tab));
    },
    [dispatch]
  );

  const fetchQueryTemplatesData = useCallback(async () => {
    try {
      const data = await getAllQueryTemplates();
      dispatch(setQueryTemplates(data));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const deleteTemplate = useCallback(
    async (templateId: string) => {
      try {
        await deleteQueryTemplate(templateId);
        dispatch(
          setQueryTemplates(queryTemplates.filter((template) => template.id !== templateId))
        );
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, queryTemplates]
  );

  const renameTemplate = useCallback(
    async (templateId: string, newName: string) => {
      try {
        await renameQueryTemplate(templateId, newName);
        dispatch(renameTemplateAction({ templateId, newName }));
        dispatch(changeName({ name: newName, templateId }));
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  const saveTemplate = useCallback(
    async (templateData: DocumentData) => {
      try {
        const id = await saveQueryTemplate(templateData);
        if (!id) return;

        dispatch(setQueryTemplates([...queryTemplates, { id, data: templateData }]));
        dispatch(changeName({ name: templateData.name, index: tabIdx, templateId: id }));
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, queryTemplates, tabIdx]
  );

  const fetchQueriesHistoryData = useCallback(async () => {
    try {
      const data = await getAllQueriesHistory();
      dispatch(setRunHistory(data));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const saveQueryRun = useCallback(
    async (queryRunData: DocumentData) => {
      try {
        const id = await saveQueryRunToHistory(queryRunData);
        if (!id) return;

        dispatch(setRunHistory([...runHistory, { id, data: queryRunData, timestamp: Date.now() }]));
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, runHistory]
  );

  return {
    isOpen,
    closeSidebar,
    openSidebar,
    changeTab,
    queryTemplates,
    fetchQueryTemplatesData,
    activeTab,
    deleteTemplate,
    saveTemplate,
    renameTemplate,
    saveQueryRun,
    fetchQueriesHistoryData,
    runHistory,
  };
};

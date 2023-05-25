import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from './reduxTypedHooks';

import { changeName, addTab } from '../store/tabsSlice';
import {
  setIsOpen,
  setActiveTab,
  setQueryTemplates,
  addQueryTemplate,
  renameTemplate as renameTemplateAction,
  setRunHistory,
  addQueryToRunHistory,
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
  const tabId = useAppSelector(({ tabs: { selectedIdx } }) => selectedIdx);

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

        dispatch(addQueryTemplate({ id, data: templateData }));
        dispatch(changeName({ name: templateData.name, id: tabId, templateId: id }));
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, tabId]
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

        dispatch(addQueryToRunHistory({ id, data: queryRunData, timestamp: Date.now() }));
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  const selectQuery = useCallback(
    (data: DocumentData, templateId: string) => {
      const { name, endpoint, query, variables, headers } = data;
      dispatch(
        addTab({
          name,
          instanceOfTemplate: templateId,
          endpoint,
          query,
          headers,
          variables,
        })
      );
      if (window.innerWidth < 800) {
        closeSidebar();
      }
    },
    [dispatch, closeSidebar]
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
    selectQuery,
  };
};

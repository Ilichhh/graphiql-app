import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from './reduxTypedHooks';

import { changeName } from '../store/tabsSlice';

import {
  setIsOpen,
  setActiveTab,
  setQueryTemplates,
  renameTemplate as renameTemplateAction,
} from '../store/sidebarSlice';
import {
  getAllQueryTemplates,
  deleteQueryTemplate,
  saveQueryTemplate,
  renameQueryTemplate,
} from '../api/firebaseApi';

import { DocumentData } from '@firebase/firestore';
import { SidebarTabs } from '../types';

export const useSidebar = () => {
  const dispatch = useAppDispatch();
  const { isOpen, activeTab, queryTemplates } = useAppSelector((state) => state.sidebar);
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
  };
};

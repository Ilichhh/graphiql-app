import { useCallback } from 'react';
import { useAppSelector } from './reduxTypedHooks';
import { useAppDispatch } from './reduxTypedHooks';

import { setIsOpen, setActiveTab, setQueryTemplates } from '../store/sidebarSlice';
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
        dispatch(
          setQueryTemplates(
            queryTemplates.map((template) => {
              if (template.id === templateId) {
                return {
                  id: template.id,
                  data: {
                    ...template.data,
                    name: newName,
                  },
                };
              }
              return template;
            })
          )
        );
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, queryTemplates]
  );

  const saveTemplate = useCallback(
    async (templateData: DocumentData) => {
      try {
        const id = await saveQueryTemplate(templateData);
        if (!id) return;

        dispatch(setQueryTemplates([...queryTemplates, { id, data: templateData }]));
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, queryTemplates]
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

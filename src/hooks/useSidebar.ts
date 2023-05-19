import { useCallback } from 'react';
import { useAppSelector } from './reduxTypedHooks';
import { useAppDispatch } from './reduxTypedHooks';
import { setIsOpen } from '../store/sidebarSlice';
import { getAllQueryTemplates } from '../api/firebaseApi';
import { setQueryTemplates } from '../store/sidebarSlice';

export const useSidebar = () => {
  const dispatch = useAppDispatch();
  const { isOpen, activeTab, queryTemplates } = useAppSelector((state) => state.sidebar);

  const closeSidebar = useCallback(() => {
    dispatch(setIsOpen(false));
  }, [dispatch]);

  const openSidebar = useCallback(() => {
    dispatch(setIsOpen(true));
  }, [dispatch]);

  const fetchQueryTemplatesData = useCallback(async () => {
    const data = await getAllQueryTemplates();
    dispatch(setQueryTemplates(data));
  }, [dispatch]);

  return {
    isOpen,
    closeSidebar,
    openSidebar,
    queryTemplates,
    fetchQueryTemplatesData,
    activeTab,
  };
};

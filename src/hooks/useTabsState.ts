import { useCallback } from 'react';
import { setError } from '../store/errorState';
import {
  addTab,
  NewTab,
  Response,
  setEndpoint,
  setHeaders,
  setQuery,
  setResponse,
  setVariables,
} from '../store/tabsSlice';
import { useAppDispatch, useAppSelector } from './reduxTypedHooks';

export const useTabsState = () => {
  const tabId = useAppSelector(({ tabs: { selectedIdx } }) => selectedIdx);
  const error = useAppSelector((store) => store.error);
  const tab = useAppSelector(
    ({ tabs: { tabs, selectedIdx } }) => tabs[tabs.findIndex(({ id }) => id === selectedIdx)]
  );
  const dispatch = useAppDispatch();

  const endpoint = tab?.endpoint || '';
  const query = tab?.query || '';
  const headers = tab?.headers || '';
  const variables = tab?.variables || '';
  const name = tab?.name || '';
  const instanceOfTemplate = tab?.instanceOfTemplate || '';
  const response = tab?.response || undefined;

  return {
    endpoint,
    query,
    variables,
    headers,
    response,
    name,
    error,
    tabId,
    instanceOfTemplate,
    setEndpoint: useCallback(
      (endpoint: string) => dispatch(setEndpoint({ tabId, endpoint })),
      [dispatch, tabId]
    ),
    setQuery: useCallback(
      (query: string) => dispatch(setQuery({ tabId, query })),
      [dispatch, tabId]
    ),
    setVariables: useCallback(
      (variables: string) => dispatch(setVariables({ tabId, variables })),
      [dispatch, tabId]
    ),
    setHeaders: useCallback(
      (headers: string) => dispatch(setHeaders({ tabId, headers })),
      [dispatch, tabId]
    ),
    setResponse: useCallback(
      (response?: Response) => dispatch(setResponse({ tabId, response })),
      [dispatch, tabId]
    ),
    setError: useCallback((error: string) => dispatch(setError({ error })), [dispatch]),
    addTab: useCallback((tab: NewTab) => dispatch(addTab(tab)), [dispatch]),
  };
};

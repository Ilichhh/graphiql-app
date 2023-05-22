import { useCallback } from 'react';
import { setError } from '../store/errorState';
import { setEndpoint, setHeaders, setQuery, setVariables } from '../store/tabsSlice';
import { useAppDispatch, useAppSelector } from './reduxTypedHooks';

export const useTabsState = () => {
  const tabIdx = useAppSelector(({ tabs: { selectedIdx } }) => selectedIdx);
  const error = useAppSelector((store) => store.error);
  const { endpoint, query, headers, variables } = useAppSelector(
    ({ tabs: { tabs, selectedIdx } }) => tabs[selectedIdx]
  );
  const dispatch = useAppDispatch();

  return {
    endpoint,
    query,
    variables,
    headers,
    error,
    setEndpoint: useCallback(
      (endpoint: string) => dispatch(setEndpoint({ tabIdx, endpoint })),
      [dispatch, tabIdx]
    ),
    setQuery: useCallback(
      (query: string) => dispatch(setQuery({ tabIdx, query })),
      [dispatch, tabIdx]
    ),
    setVariables: useCallback(
      (variables: string) => dispatch(setVariables({ tabIdx, variables })),
      [dispatch, tabIdx]
    ),
    setHeaders: useCallback(
      (headers: string) => dispatch(setHeaders({ tabIdx, headers })),
      [dispatch, tabIdx]
    ),
    setError: useCallback((error: string) => dispatch(setError({ error })), [dispatch]),
  };
};

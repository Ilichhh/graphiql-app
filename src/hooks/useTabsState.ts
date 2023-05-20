import { useCallback } from 'react';
import { setHeaders, setQuery, setVariables } from '../store/editorSlice';
import { setEndpoint } from '../store/endpointSlice';
import { setError } from '../store/errorState';
import { useAppDispatch, useAppSelector } from './reduxTypedHooks';

export const useTabsState = () => {
  const tabIdx = useAppSelector(({ tabs: { selectedIdx } }) => selectedIdx);
  const {
    queries: stateQueries,
    variables: stateVariables,
    headers: stateHeaders,
  } = useAppSelector((state) => state.editor);
  const endpoints = useAppSelector((store) => store.endpoint);
  const error = useAppSelector((store) => store.error);
  const dispatch = useAppDispatch();

  const endpoint = endpoints[tabIdx] || '';
  const query = stateQueries[tabIdx] || '';
  const variables = stateVariables[tabIdx] || '';
  const headers = stateHeaders[tabIdx] || '';

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

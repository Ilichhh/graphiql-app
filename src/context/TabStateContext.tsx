import React, { createContext, ReactNode, useCallback, useContext } from 'react';
import { GraphQLField, GraphQLInputField, GraphQLNamedType } from 'graphql/type';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { setEndpoint } from '../store/endpointSlice';
import { setHeaders, setQuery, setVariables } from '../store/editorSlice';
import { setError } from '../store/errorState';

export type StackItem = {
  name: string;
  data?: GraphQLNamedType | GraphQLField<unknown, unknown> | GraphQLInputField;
};

interface TabStateContextInterface {
  endpoint: string;
  query: string;
  variables: string;
  headers: string;
  error: string;
  setEndpoint: (endpoint: string) => void;
  setQuery: (query: string) => void;
  setVariables: (variables: string) => void;
  setHeaders: (query: string) => void;
  setError: (error: string) => void;
}

export const TabStateContext = createContext<TabStateContextInterface>({
  endpoint: '',
  query: '',
  variables: '',
  headers: '',
  error: '',
  setEndpoint: () => null,
  setQuery: () => null,
  setVariables: () => null,
  setHeaders: () => null,
  setError: () => null,
});

export const TabStateProvider = ({ children }: { children: ReactNode }) => {
  const tabId = useAppSelector(({ tabs: { selectedId } }) => selectedId);
  const {
    queries: stateQueries,
    variables: stateVariables,
    headers: stateHeaders,
  } = useAppSelector((state) => state.editor);
  const endpoints = useAppSelector((store) => store.endpoint);
  const errors = useAppSelector((store) => store.error);
  const dispatch = useAppDispatch();

  const endpoint = endpoints[tabId];
  const query = stateQueries[tabId];
  const variables = stateVariables[tabId];
  const headers = stateHeaders[tabId];
  const error = errors[tabId];

  return (
    <TabStateContext.Provider
      value={{
        endpoint,
        query,
        variables,
        headers,
        error,
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
        setError: useCallback(
          (error: string) => dispatch(setError({ tabId, error })),
          [dispatch, tabId]
        ),
      }}
    >
      {children}
    </TabStateContext.Provider>
  );
};

export const useTabStateContext = () => useContext(TabStateContext);

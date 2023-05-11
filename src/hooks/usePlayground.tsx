import { useMemo } from 'react';
import { useAppSelector } from './reduxTypedHooks';
import { useLazyGetResponseQuery } from '../store/apiSlice';

export const usePlayground = (endpoint: string) => {
  // const endpoint = useAppSelector((state) => state.endpoint);
  const { query, variables, headers } = useAppSelector((state) => state.editor);
  const [parsedVariables, parsedHeaders] = useMemo(
    () => parseParams(variables, headers),
    [variables, headers]
  );

  const [trigger, { data }] = useLazyGetResponseQuery();

  return {
    response: data,
    sendRequest: () =>
      trigger({
        url: endpoint,
        query,
        parsedVariables,
        parsedHeaders,
      }),
  };
};

function parseParams(variables: string, headers: string) {
  let parsedVariables: Record<string, unknown> = {};
  let parsedHeaders: Record<string, unknown> = {};

  try {
    parsedVariables = variables ? JSON.parse(variables) : {};
    parsedHeaders = headers ? JSON.parse(headers) : {};
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(error);
    }
  } finally {
    return [parsedVariables, parsedHeaders];
  }
}

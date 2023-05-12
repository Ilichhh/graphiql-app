import { useMemo } from 'react';
import { useAppSelector } from './reduxTypedHooks';
import { useLazyGetResponseQuery } from '../store/apiSlice';

type ResponseError = { data: { errors: [{ message: string }] } };

export const usePlayground = (endpoint: string) => {
  const { query, variables, headers } = useAppSelector((state) => state.editor);
  const [parsedVariables, parsedHeaders] = useMemo(
    () => parseParams(variables, headers),
    [variables, headers]
  );

  const [trigger, { data, error, isFetching }] = useLazyGetResponseQuery();
  const response = data ? JSON.stringify(data.data, null, 2) : '';
  const errorMessage = error ? (error as ResponseError).data.errors[0].message : '';

  return {
    response,
    errorMessage,
    isFetching,
    sendRequest: () =>
      trigger(
        {
          url: endpoint,
          query,
          variables: parsedVariables,
          headers: parsedHeaders,
        },
        true
      ),
  };
};

function parseParams(variables: string, headers: string) {
  let parsedVariables: Record<string, unknown> = {};
  let parsedHeaders: Record<string, unknown> = {};

  try {
    parsedVariables = variables ? JSON.parse(variables) : {};
    parsedHeaders = headers ? JSON.parse(headers) : {};
  } catch (error) {}

  return [parsedVariables, parsedHeaders];
}

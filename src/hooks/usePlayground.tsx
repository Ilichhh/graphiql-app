import { useMemo, useState, useEffect } from 'react';
import { useAppSelector } from './reduxTypedHooks';
import { useLazyGetResponseQuery } from '../store/apiSlice';
import { useAppDispatch } from './reduxTypedHooks';
import { setError } from '../store/errorSlice';

export const usePlayground = (endpoint: string) => {
  const dispatch = useAppDispatch();

  const { query, variables, headers } = useAppSelector((state) => state.editor);
  const [parsedVariables, parsedHeaders] = useMemo(
    () => parseParams(variables, headers),
    [variables, headers]
  );

  const [trigger, { data, error, isFetching }] = useLazyGetResponseQuery();

  const [response, setResponse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const processResponse = () => {
      let systemError = '';

      try {
        setResponse(JSON.stringify(dataa, null, 2));
      } catch (e) {
        if (typeof e === 'string') {
          systemError = e;
        } else if (e instanceof Error) {
          systemError = `${e.name}: ${e.message}`;
        }

        dispatch(setError(systemError));
      }

      if (error) {
        if ('status' in error) {
          setErrorMessage('error' in error ? error.error : JSON.stringify(error.data, null, 2));
        } else {
          setErrorMessage(error.message || 'Unknown error');
        }
      }
    };

    processResponse();

    return () => {
      setResponse('');
      setErrorMessage('');
      dispatch(setError(''));
    };
  }, [data, error, dispatch]);

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

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetResponseMutation } from '../store/apiSlice';
import { hashFromObject } from '../utils/hash';
import { useTabsState } from './useTabsState';

type ErrorObject =
  | {
      message: string;
      status: number | undefined;
    }
  | undefined;

export const usePlayground = (endpoint: string) => {
  const { t } = useTranslation();

  const { query, variables, headers, response, setResponse, setError, tabId } = useTabsState();
  const [parsedVariables, parsedHeaders, paramsError] = useMemo(
    () => parseParams(variables, headers),
    [variables, headers]
  );

  const [trigger, { data, error, isLoading: isFetching }] = useGetResponseMutation({
    fixedCacheKey: hashFromObject({ tabId }),
  });
  const [errorMessage, setErrorMessage] = useState<ErrorObject>();

  useEffect(() => {
    try {
      if (tabId) {
        setResponse(data);
      }
    } catch (e) {
      if (typeof e === 'string') {
        setError(e);
      } else if (e instanceof Error) {
        setError(`${e.name}: ${e.message}`);
      }
    }

    if (error) {
      if ('status' in error) {
        if (typeof error.status === 'number') {
          setErrorMessage({
            message: JSON.stringify(error.data, null, 2),
            status: error.status,
          });
        } else {
          setError(error.error);
        }
      } else {
        setError(error.message || 'Unknown error');
      }
    }

    return () => {
      setErrorMessage(undefined);
    };
  }, [data, error, setError, setResponse, tabId]);

  return {
    response,
    errorMessage,
    isFetching,
    sendRequest: () => {
      if (paramsError) {
        setError(t('playground.paramsError'));
      } else {
        trigger({
          url: endpoint,
          query,
          variables: parsedVariables,
          headers: parsedHeaders,
        });
      }
    },
  };
};

function parseParams(variables: string, headers: string) {
  let parsedVariables: Record<string, unknown> = {};
  let parsedHeaders: Record<string, unknown> = {};
  let paramsError = false;

  try {
    parsedVariables = variables ? JSON.parse(variables) : {};
    parsedHeaders = headers ? JSON.parse(headers) : {};
  } catch (error) {
    paramsError = true;
  }

  return [parsedVariables, parsedHeaders, paramsError];
}

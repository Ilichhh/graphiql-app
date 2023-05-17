import { useEffect, useMemo, useState } from 'react';
import { useLazyGetResponseQuery } from '../store/apiSlice';
import { useTranslation } from 'react-i18next';
import { useEditorState } from './useEditorState';
import { useErrorState } from './useErrorState';

type ResponseData =
  | {
      data: string;
      status: number | undefined;
    }
  | undefined;

type ErrorObject =
  | {
      message: string;
      status: number | undefined;
    }
  | undefined;

export const usePlayground = (endpoint: string) => {
  const { t } = useTranslation();

  const { query, variables, headers } = useEditorState();
  const { setError } = useErrorState();
  const [parsedVariables, parsedHeaders, paramsError] = useMemo(
    () => parseParams(variables, headers),
    [variables, headers]
  );

  const [trigger, { currentData: data, error, isFetching }] = useLazyGetResponseQuery();
  const [response, setResponse] = useState<ResponseData>();
  const [errorMessage, setErrorMessage] = useState<ErrorObject>();

  useEffect(() => {
    try {
      setResponse(data);
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
      setResponse(undefined);
      setErrorMessage(undefined);
    };
  }, [data, error, setError]);

  return {
    response,
    errorMessage,
    isFetching,
    sendRequest: () => {
      if (paramsError) {
        setError(t('playground.paramsError'));
      } else {
        trigger(
          {
            url: endpoint,
            query,
            variables: parsedVariables,
            headers: parsedHeaders,
          },
          true
        );
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

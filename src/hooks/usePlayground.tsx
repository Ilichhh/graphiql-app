import { useMemo, useState, useEffect } from 'react';
import { useAppSelector } from './reduxTypedHooks';
import { useLazyGetResponseQuery } from '../store/apiSlice';
import { useAppDispatch } from './reduxTypedHooks';
import { setError } from '../store/errorSlice';
import { useTranslation } from 'react-i18next';

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
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { query, variables, headers } = useAppSelector((state) => state.editor);
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
        dispatch(setError(e));
      } else if (e instanceof Error) {
        dispatch(setError(`${e.name}: ${e.message}`));
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
          dispatch(setError(error.error));
        }
      } else {
        dispatch(setError(error.message || 'Unknown error'));
      }
    }

    return () => {
      setResponse(undefined);
      setErrorMessage(undefined);
    };
  }, [data, error, dispatch]);

  return {
    response,
    errorMessage,
    isFetching,
    sendRequest: () => {
      if (paramsError) {
        dispatch(setError(t('playground.paramsError')));
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

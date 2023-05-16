import { useEffect, useState } from 'react';
import { buildClientSchema } from 'graphql/utilities';
import { useGetSchemaQuery } from '../store/apiSlice';
import { useAppDispatch } from './reduxTypedHooks';
import { setError } from '../store/errorSlice';
import { useTranslation } from 'react-i18next';

type Schema = ReturnType<typeof buildClientSchema> | null;

export const useGraphQLSchema = (endpoint: string) => {
  const dispatch = useAppDispatch();
  const { data, isError, error } = useGetSchemaQuery(endpoint, { skip: !endpoint });
  const [schema, setSchema] = useState<Schema>(null);
  const [schemaErrorMessage, setSchemaErrorMessage] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      try {
        setSchema(buildClientSchema(data.data));
      } catch (e) {
        if (typeof e === 'string') {
          dispatch(setError(e));
        } else if (e instanceof Error) {
          dispatch(setError(`${e.name}: ${e.message}`));
        }
      }
    }

    if (error) {
      if ('status' in error) {
        if (error.status === 'FETCH_ERROR') {
          setSchemaErrorMessage(t(`playground.schemaError`) as string);
        } else {
          setSchemaErrorMessage('error' in error ? error.error : JSON.stringify(error.data));
        }
      } else {
        setSchemaErrorMessage(error.message || 'Unknown error');
      }
    }

    return () => {
      setSchemaErrorMessage('');
      setSchema(null);
    };
  }, [data, error, dispatch, t]);

  return { schema, isSchemaError: isError, schemaErrorMessage };
};

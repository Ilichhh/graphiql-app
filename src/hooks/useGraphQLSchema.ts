import { useEffect, useState } from 'react';
import { buildClientSchema } from 'graphql/utilities';
import { useGetSchemaQuery } from '../store/apiSlice';
import { useTranslation } from 'react-i18next';
import { useErrorState } from './useErrorState';

type Schema = ReturnType<typeof buildClientSchema> | null;
type ErrorObject =
  | {
      message: string;
      status: number | undefined;
    }
  | undefined;

export const useGraphQLSchema = (endpoint: string) => {
  const { setError } = useErrorState();
  const { currentData: data, isError, error } = useGetSchemaQuery(endpoint, { skip: !endpoint });
  const [schema, setSchema] = useState<Schema>(null);
  const [schemaErrorMessage, setSchemaErrorMessage] = useState<ErrorObject>();
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      try {
        setSchema(buildClientSchema(data.data));
      } catch (e) {
        if (typeof e === 'string') {
          setError(e);
        } else if (e instanceof Error) {
          setError(`${e.name}: ${e.message}`);
        }
      }
    }

    if (error) {
      if ('status' in error) {
        if (typeof error.status === 'number') {
          setSchemaErrorMessage({
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
      setSchemaErrorMessage(undefined);
      setSchema(null);
    };
  }, [data, error, t, isError, setError]);

  return { schema, isSchemaError: isError, schemaErrorMessage };
};

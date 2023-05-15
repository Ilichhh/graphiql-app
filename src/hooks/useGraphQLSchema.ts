import { useEffect, useState } from 'react';
import { buildClientSchema } from 'graphql/utilities';
// import { useTranslation } from 'react-i18next';
import { useGetSchemaQuery } from '../store/apiSlice';
import { useAppDispatch } from './reduxTypedHooks';
import { setError } from '../store/errorSlice';

type Schema = ReturnType<typeof buildClientSchema> | null;

export const useGraphQLSchema = (endpoint: string) => {
  // const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data, isError, error } = useGetSchemaQuery(endpoint, { skip: !endpoint });
  const [schema, setSchema] = useState<Schema>(null);
  const [schemaErrorMessage, setSchemaErrorMessage] = useState('');

  useEffect(() => {
    const buildSchema = () => {
      let systemError = '';

      if (data) {
        try {
          setSchema(buildClientSchema(data.data));
        } catch (e) {
          if (typeof e === 'string') {
            systemError = e;
          } else if (e instanceof Error) {
            systemError = e.message;
          }

          dispatch(setError(systemError));
        }
      }

      if (error) {
        if ('status' in error) {
          if (error.status === 'FETCH_ERROR') {
            setSchemaErrorMessage('playground.schemaError');
          } else {
            setSchemaErrorMessage('error' in error ? error.error : JSON.stringify(error.data));
          }
        } else {
          setSchemaErrorMessage(error.message || 'Unknown error');
        }
      }
    };

    buildSchema();

    return () => {
      setSchemaErrorMessage('');
      setSchema(null);
    };
  }, [data, error, dispatch]);

  return { schema, isSchemaError: isError, schemaErrorMessage };
};

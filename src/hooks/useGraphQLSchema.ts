import { buildClientSchema } from 'graphql/utilities';
import { useTranslation } from 'react-i18next';
import { useGetSchemaQuery } from '../store/apiSlice';
import { useAppDispatch } from './reduxTypedHooks';
import { setError } from '../store/errorSlice';

export const useGraphQLSchema = (endpoint: string) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  let systemError = '';
  let schema = null;
  let schemaErrorMessage = '';
  const { data, isError, error } = useGetSchemaQuery(endpoint, { skip: !endpoint });

  if (data) {
    try {
      schema = buildClientSchema(data.data);
    } catch (e) {
      if (typeof e === 'string') {
        systemError = e;
      } else if (e instanceof Error) {
        systemError = e.message;
      }

      schema = null;
      dispatch(setError(systemError));
    }
  }

  if (error) {
    if ('status' in error) {
      if (error.status === 'FETCH_ERROR') {
        schemaErrorMessage = t(`playground.schemaError`);
      } else {
        schemaErrorMessage = 'error' in error ? error.error : JSON.stringify(error.data);
      }
    } else {
      schemaErrorMessage = error.message || 'Unknown error';
    }
  }

  return { schema, isSchemaError: isError, schemaErrorMessage };
};

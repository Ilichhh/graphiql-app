import { buildClientSchema } from 'graphql/utilities';
import { useGetSchemaQuery } from '../store/apiSlice';

export const useGraphQLSchema = (endpoint: string) => {
  let schema = null;
  let errorMessage = '';
  const { data, isError, error } = useGetSchemaQuery(endpoint, { skip: !endpoint });

  if (data) {
    schema = buildClientSchema(data.data);
  }

  if (error) {
    errorMessage = error.toString();
  }

  return { schema, isError, errorMessage };
};

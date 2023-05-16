import { buildClientSchema } from 'graphql/utilities';
import { useGetSchemaQuery } from '../store/apiSlice';
import { useEffect, useState } from 'react';
import { GraphQLSchema } from 'graphql/type/schema';

export const useGraphQLSchema = (endpoint: string) => {
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const { data, isError, error } = useGetSchemaQuery(endpoint, { skip: !endpoint });
  const schemaErrorMessage = error?.toString() || '';

  useEffect(() => {
    if (data && !isError && data.data) {
      setSchema(buildClientSchema(data.data));
    }
  }, [data, isError]);

  return { schema, isSchemaError: isError, schemaErrorMessage };
};

import { useEffect, useState } from 'react';
import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery } from 'graphql/utilities';
import { GraphQLSchema } from 'graphql/type';
import { useAppSelector } from './reduxTypedHooks';

export const useGraphQLSchema = () => {
  const endpoint = useAppSelector((state) => state.endpoint);
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const query = getIntrospectionQuery();

    if (endpoint) {
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ query }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch schema. Please check your connection');
          }
          return res.json() as Promise<{ data: IntrospectionQuery }>;
        })
        .then(({ data }) => buildClientSchema(data))
        .then((schema) => {
          setSchema(schema);
          setIsError(false);
          setErrorMessage('');
        })
        .catch((error) => {
          setIsError(true);
          setErrorMessage(error.message);
        });
    }
  }, [endpoint]);

  return { schema, isError, errorMessage };
};

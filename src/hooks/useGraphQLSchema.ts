import { useEffect, useState } from 'react';
import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery } from 'graphql/utilities';
import { GraphQLSchema } from 'graphql/type';

export const useGraphQLSchema = (url: string) => {
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [isError, setIsError] = useState<boolean>();

  useEffect(() => {
    const query = getIntrospectionQuery();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch schema');
        }
        return res.json() as Promise<{ data: IntrospectionQuery }>;
      })
      .then(({ data }) => buildClientSchema(data))
      .then((schema) => {
        setSchema(schema);
        setIsError(false);
      })
      .catch(() => setIsError(true));
  }, [url]);

  return { schema, isError };
};

import { useEffect, useState } from 'react';
import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery } from 'graphql/utilities';
import { GraphQLSchema } from 'graphql/type';

export const useGraphQLSchema = (url: string) => {
  const [schema, setSchema] = useState<GraphQLSchema>();

  useEffect(() => {
    const query = getIntrospectionQuery();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json() as Promise<{ data: IntrospectionQuery }>)
      .then(({ data }) => buildClientSchema(data))
      .then((schema) => setSchema(schema));
  }, [url]);

  return schema;
};

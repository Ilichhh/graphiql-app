import { useCallback } from 'react';
import prettier from 'prettier';
import graphQl from 'prettier/parser-graphql';
import { useTabStateContext } from '../context/TabStateContext';

export const usePrettier = () => {
  const { query, setQuery } = useTabStateContext();

  const formattedQuery = prettier.format(query, { parser: 'graphql', plugins: [graphQl] });
  const prettify = useCallback(() => {
    setQuery(formattedQuery);
  }, [formattedQuery, setQuery]);

  return { prettify };
};

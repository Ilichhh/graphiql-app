import { useCallback } from 'react';
import prettier from 'prettier';
import graphQl from 'prettier/parser-graphql';
import { useTabsState } from './useTabsState';

export const usePrettier = () => {
  const { query, setQuery } = useTabsState();

  const formattedQuery = prettier.format(query, { parser: 'graphql', plugins: [graphQl] });
  const prettify = useCallback(() => {
    setQuery(formattedQuery);
  }, [formattedQuery, setQuery]);

  return { prettify };
};

import { useCallback } from 'react';
import prettier from 'prettier';
import graphQl from 'prettier/parser-graphql';
import { useTabsState } from './useTabsState';

export const usePrettier = () => {
  const { query, setQuery, setError } = useTabsState();

  const prettify = useCallback(() => {
    try {
      const formattedQuery = prettier.format(query, { parser: 'graphql', plugins: [graphQl] });
      setQuery(formattedQuery);
    } catch (e) {
      if (typeof e === 'string') {
        setError(e);
      } else if (e instanceof Error) {
        setError(`${e.name}: ${e.message}`);
      }
    }
  }, [query, setQuery, setError]);

  return { prettify };
};

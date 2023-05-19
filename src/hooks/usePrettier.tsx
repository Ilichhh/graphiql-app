import { useCallback } from 'react';
import prettier from 'prettier';
import graphQl from 'prettier/parser-graphql';
import { useAppDispatch, useAppSelector } from './reduxTypedHooks';
import { setQuery } from '../store/editorSlice';

export const usePrettier = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((store) => store.editor);

  const formattedQuery = prettier.format(query, { parser: 'graphql', plugins: [graphQl] });
  const prettify = useCallback(() => {
    dispatch(setQuery(formattedQuery));
  }, [formattedQuery, dispatch]);

  return { prettify };
};

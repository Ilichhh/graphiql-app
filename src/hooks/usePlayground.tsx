import { useCallback, useState } from 'react';
import { useAppSelector } from './reduxTypedHooks';

export const usePlayground = () => {
  const endpoint = useAppSelector((state) => state.endpoint);
  const { query, variables, headers } = useAppSelector((state) => state.editor);
  const [response, setResponse] = useState('');

  const sendRequest = useCallback(() => {
    let parsedVariables: Record<string, unknown> = {};
    let parsedHeaders: Record<string, unknown> = {};

    try {
      parsedVariables = variables ? JSON.parse(variables) : {};
      parsedHeaders = headers ? JSON.parse(headers) : {};
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(error);
        return;
      }
      throw error;
    }

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        ...parsedHeaders,
      },
      body: JSON.stringify({ query, variables: parsedVariables }),
    })
      .then((res) => res.json())
      .then((json) => JSON.stringify(json, null, 2))
      .then((str) => setResponse(str))
      .catch((error) => setResponse(error.toString()));
  }, [endpoint, query, variables, headers]);

  return { response, sendRequest };
};

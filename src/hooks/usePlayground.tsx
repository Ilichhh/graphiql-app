import { useCallback, useState } from 'react';

export const usePlayground = (
  initialEndpoint: string,
  initialQuery: string,
  initialVariables: string
) => {
  const [endpoint, setEndpoint] = useState(initialEndpoint);
  const [query, setQuery] = useState(initialQuery);
  const [variables, setVariables] = useState(initialVariables);
  const [response, setResponse] = useState('');

  const sendRequest = useCallback(() => {
    let parsedVariables: Record<string, unknown> = {};
    try {
      parsedVariables = variables ? JSON.parse(variables) : {};
      console.log(parsedVariables);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.log(error);
        return;
      }
      throw error;
    }

    // Send request
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((json) => JSON.stringify(json, null, 2))
      .then((str) => setResponse(str))
      .catch((error) => setResponse(error.toString()));
  }, [endpoint, query, variables]);

  return { endpoint, setEndpoint, query, setQuery, variables, setVariables, response, sendRequest };
};

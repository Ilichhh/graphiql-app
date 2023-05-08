import { useCallback, useState } from 'react';

export const usePlayground = (
  initialEndpoint: string,
  initialQuery: string,
  initialVariables: string
) => {
  const [endpoint, setEndpoint] = useState(initialEndpoint);
  const [query, setQuery] = useState(initialQuery);
  const [variables, setVariables] = useState(initialVariables);
  const [headers, setHeaders] = useState('');
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

  return {
    endpoint,
    setEndpoint,
    query,
    setQuery,
    variables,
    setVariables,
    headers,
    setHeaders,
    response,
    sendRequest,
  };
};

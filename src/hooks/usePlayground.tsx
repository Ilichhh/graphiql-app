import { useCallback, useState } from 'react';
import { JSONParser } from '../utils/JSONParser';

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
    const parsedVariables = JSONParser(variables);
    const parsedHeaders = JSONParser(headers);

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

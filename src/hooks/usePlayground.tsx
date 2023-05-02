import { useState } from 'react';

const ENDPOINT_URL = 'https://swapi-graphql.netlify.app/.netlify/functions/index';
const INITIAL_QUERY = `query {
  allFilms {
    films {
      id
      title
    }
  }
}`;

export const usePlayground = () => {
  const [endpoint, setEndpoint] = useState(ENDPOINT_URL);
  const [query, setQuery] = useState(INITIAL_QUERY);
  const [response, setResponse] = useState('');

  const sendRequest = () => {
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
  };

  return { endpoint, setEndpoint, query, setQuery, response, sendRequest };
};

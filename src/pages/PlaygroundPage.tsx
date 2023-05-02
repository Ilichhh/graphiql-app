import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { Editor, PlayButton, PlaygroundHeader, ResponseBox } from '../components/playground';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: ${theme.colors.bgBlack};
`;

const Playground = styled.div`
  display: flex;
  flex: 1 1 0;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ENDPOINT_URL = 'https://swapi-graphql.netlify.app/.netlify/functions/index';
export const PlaygroundPage = () => {
  const [endpoint, setEndpoint] = useState(ENDPOINT_URL);
  const [response, setResponse] = useState('');
  const [query, setQuery] = useState(`query {
  allFilms {
    films {
      id
      title
    }
  }
}`);

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
      .catch((error) => setResponse(error));
  };

  return (
    <Wrapper>
      <PlaygroundHeader onChange={(url) => setEndpoint(url)} endpoint={endpoint} />
      <Playground>
        <Editor query={query} onChange={(q) => setQuery(q)} />
        <PlayButton onClick={sendRequest} />
        <ResponseBox response={response} />
      </Playground>
    </Wrapper>
  );
};

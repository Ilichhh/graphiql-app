import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { Editor, PlayButton, PlaygroundHeader, ResponseBox } from '../components/playground';
import { usePlayground } from '../hooks/usePlayground';
import { Header } from '../components';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 68px);
  width: 100%;
  background: ${theme.colors.bgBlack};
`;

const Playground = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 0;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const PlaygroundPage = () => {
  const { endpoint, setEndpoint, query, setQuery, response, sendRequest } = usePlayground();

  return (
    <>
      <Header currentPage="playground" />
      <Wrapper>
        <PlaygroundHeader onChange={(url) => setEndpoint(url)} endpoint={endpoint} />
        <Playground>
          <Editor query={query} onChange={(q) => setQuery(q)} />
          <PlayButton onClick={sendRequest} />
          <ResponseBox response={response} />
        </Playground>
      </Wrapper>
    </>
  );
};

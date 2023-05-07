import React from 'react';
import { usePlayground } from '../hooks/usePlayground';

import { Editor, PlayButton, PlaygroundHeader, ResponseBox } from '../components/playground';
import { Header } from '../components';

import styled from 'styled-components';
import theme from '../theme';

import { INITIAL_ENDPOINT_URL, INITIAL_QUERY } from '../constants';

const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${theme.headerHeight});
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

export const PlaygroundPage = () => {
  const { endpoint, setEndpoint, query, setQuery, response, sendRequest, variables, setVariables } =
    usePlayground(INITIAL_ENDPOINT_URL, INITIAL_QUERY, '');

  return (
    <>
      <Header currentPage="playground" />
      <Wrapper>
        <PlaygroundHeader onChange={setEndpoint} endpoint={endpoint} />
        <Playground>
          <Editor
            endpoint={endpoint}
            query={query}
            setQuery={setQuery}
            variables={variables}
            setVariables={setVariables}
          />
          <PlayButton onClick={sendRequest} />
          <ResponseBox response={response} />
        </Playground>
      </Wrapper>
    </>
  );
};

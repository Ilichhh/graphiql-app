import React from 'react';
import { usePlayground } from '../hooks/usePlayground';

import { Editor, PlayButton, PlaygroundHeader, ResponseBox } from '../components/playground';
import { Header } from '../components';

import styled from 'styled-components';
import theme from '../theme';

import { useGraphQLSchema } from '../hooks/useGraphQLSchema';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import { SchemaContext } from '../contexts';

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
  const endpoint = useAppSelector((store) => store.endpoint);
  const { response, sendRequest } = usePlayground();
  const schema = useGraphQLSchema(endpoint);

  return (
    <>
      <Header currentPage="playground" />
      <Wrapper>
        <PlaygroundHeader />
        <SchemaContext.Provider value={schema}>
          <Playground>
            <Editor />
            <PlayButton onClick={sendRequest} />
            <ResponseBox response={response} />
          </Playground>
        </SchemaContext.Provider>
      </Wrapper>
    </>
  );
};

import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { PlaygroundHeader, Editor, ResponseBox, PlayButton } from '../components/playground';

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
export const PlaygroundPage = () => (
  <>
    <Wrapper>
      <PlaygroundHeader />
      <Playground>
        <Editor />
        <PlayButton />
        <ResponseBox />
      </Playground>
    </Wrapper>
  </>
);

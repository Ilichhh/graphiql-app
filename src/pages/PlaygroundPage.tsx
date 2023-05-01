import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { PlaygroundHeader } from '../components/playground/header';
import { Editor } from '../components/playground/editor';
import { ResponseBox } from '../components/playground/responseBox';
import { PlayButton } from '../components/playground/playBtn';

const Wrapper = styled.section`
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

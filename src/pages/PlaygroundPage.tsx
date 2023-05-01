import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { PlaygroundHeader } from '../components/playground/header';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: ${theme.colors.bgBlack};
`;

export const PlaygroundPage = () => (
  <>
    <Wrapper>
      <PlaygroundHeader />
    </Wrapper>
  </>
);

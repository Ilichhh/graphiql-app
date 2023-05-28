import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import theme from '../theme';

const StyledContainer = styled.div`
  min-height: 100vh;
  min-width: 320px;
  background-color: ${theme.colors.bgLight};
`;

export const Container = ({ children }: PropsWithChildren) => {
  return <StyledContainer>{children}</StyledContainer>;
};

import React from 'react';
import styled from 'styled-components';

import theme from '../theme';

const StyledContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.bgLight};
`;

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <StyledContainer>{children}</StyledContainer>;
};

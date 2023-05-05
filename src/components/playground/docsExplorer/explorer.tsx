import React from 'react';
import styled from 'styled-components';
import theme from '../../../theme';

const ExplorerWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 100%;
  background: white;

  &:before {
    content: '';
    display: block;
    background-color: ${theme.colors.borderDocs};
    width: 7px;
    height: 100%;
  }
`;

const ExplorerContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const ExplorerTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

export const Explorer = () => {
  return (
    <ExplorerWrapper>
      <ExplorerContent>
        <ExplorerTitle>Documentation Explorer</ExplorerTitle>
      </ExplorerContent>
    </ExplorerWrapper>
  );
};

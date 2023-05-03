import React, { useState } from 'react';
import { DocsTab } from './docsTab';
import styled from 'styled-components';
import theme from '../../../theme';
import { Divider } from '@mui/material';

interface ExplorerWrapperProps {
  isOpen: boolean;
}

const ExplorerWrapper = styled.div<ExplorerWrapperProps>`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 15;
  width: ${(props) => (props.isOpen ? '420px' : 0)};
  height: 100%;
  @media (max-width: 600px) {
    width: ${(props) => (props.isOpen ? '250px' : 0)};
  }
`;

const Explorer = styled.div`
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

const ExplorerTypes = styled.span`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 1rem;
  font-weight: 500;
  color: ${theme.colors.textInactive};
`;
export const DocsExplorer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ExplorerWrapper isOpen={isOpen}>
      <Explorer>
        <ExplorerContent>
          <ExplorerTitle>Documentation Explorer</ExplorerTitle>
          <Divider />
          <ExplorerTypes>Root types</ExplorerTypes>
          <Divider />
        </ExplorerContent>
      </Explorer>
      <DocsTab
        isOpen={isOpen}
        onChange={() => {
          setIsOpen((prev) => !prev);
        }}
      />
    </ExplorerWrapper>
  );
};

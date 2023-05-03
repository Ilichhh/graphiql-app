import React from 'react';
import styled from 'styled-components';
import theme from '../../../theme';

interface TabProps {
  isOpen: boolean;
}

const Tab = styled.div<TabProps>`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 110px;
  padding: 8px 13px;
  border-radius: 2px 2px 0 0;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: white;
  background: ${({ isOpen }) => (isOpen ? theme.colors.borderDocs : theme.colors.bgDocsTab)};
  transform: rotate(-90deg);
  transform-origin: left bottom;
  cursor: pointer;
`;

interface DocsTabProps {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
}

export const DocsTab = ({ isOpen, onChange }: DocsTabProps) => {
  return (
    <Tab isOpen={isOpen} onClick={() => onChange(!isOpen)}>
      docs
    </Tab>
  );
};

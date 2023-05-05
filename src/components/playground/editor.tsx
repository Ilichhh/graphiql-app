import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Textarea } from './textarea';
import { DocsExplorer } from './docsExplorer/docsExplorer';
import { TextareaAutosize } from '@mui/material';

import styled from 'styled-components';
import theme from '../../theme';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.bgDarkBlue};
  flex: 1 1 0;
`;

const EditorBox = styled.section`
  position: relative;
  display: flex;
  flex: 1 1 0;
  flex-flow: column;
`;

const EditorTools = styled.section`
  display: flex;
  background: ${theme.colors.bgBlack};
  flex-direction: column;
`;

const ToolsBar = styled.div`
  display: flex;
  padding: 12px 20px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
  user-select: none;
  @media (max-width: 600px) {
    padding: 8px;
    font-size: 0.6rem;
  }
`;

const ToolsTab = styled.span<{ isActive: boolean }>`
  display: flex;
  margin-right: 20px;
  flex-shrink: 0;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? theme.colors.textGrey : theme.colors.textInactive)};
`;

interface EditorProps {
  query: string;
  onChange: (query: string) => void;
}
export const Editor = ({ query, onChange }: EditorProps) => {
  const [activeToolsTab, setActiveToolsTab] = useState('variables');
  const { t } = useTranslation();

  return (
    <Container>
      <EditorBox>
        <Textarea query={query} onChange={onChange} />
      </EditorBox>
      <EditorTools>
        <ToolsBar>
          <ToolsTab
            isActive={activeToolsTab === 'variables'}
            onClick={() => setActiveToolsTab('variables')}
          >
            {t('playground.variablesTabHeader')}
          </ToolsTab>
          <ToolsTab
            isActive={activeToolsTab === 'headers'}
            onClick={() => setActiveToolsTab('headers')}
          >
            {t('playground.headersTabHeader')}
          </ToolsTab>
        </ToolsBar>
        <TextareaAutosize
          style={{
            padding: '10px 20px',
            backgroundColor: `${theme.colors.bgDarkBlue}`,
            color: `${theme.colors.textGrey}`,
            outline: 'none',
            border: 'none',
          }}
          placeholder={activeToolsTab}
        />
      </EditorTools>
      <DocsExplorer />
    </Container>
  );
};

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CodeEditor, VariablesEditor } from './codemirror';
import { DocsPanel } from './docsExplorer/docsPanel';

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

const EditorTools = styled.section<{ isOpen: boolean }>`
  display: flex;
  background: ${theme.colors.bgBlack};
  flex-direction: column;
  ${({ isOpen }) => isOpen && 'height: 300px'};
`;

const ToolsBar = styled.div`
  display: flex;
  padding: 12px 20px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
  user-select: none;
  cursor: pointer;
  @media (max-width: 600px) {
    padding: 8px;
    font-size: 0.6rem;
  }
`;

const ToolsTab = styled.span<{ isActive: boolean }>`
  display: flex;
  margin-right: 20px;
  flex-shrink: 0;
  color: ${({ isActive }) => (isActive ? theme.colors.textGrey : theme.colors.textInactive)};
`;

interface EditorProps {
  endpoint: string;
  query: string;
  setQuery: (query: string) => void;
  variables: string;
  setVariables: (variables: string) => void;
}

export const Editor = ({ endpoint, query, setQuery, variables, setVariables }: EditorProps) => {
  const [activeToolsTab, setActiveToolsTab] = useState('variables');
  const [isEditorToolsOpen, setIsEditorToolsOpen] = useState(false);
  const { t } = useTranslation();

  const handleToolsTabClick = (e: React.MouseEvent, tab: string) => {
    setActiveToolsTab(tab);
    setIsEditorToolsOpen(true);
    e.stopPropagation();
  };

  return (
    <Container>
      <EditorBox>
        <CodeEditor value={query} onChange={setQuery} />
      </EditorBox>
      <EditorTools isOpen={isEditorToolsOpen}>
        <ToolsBar onClick={() => setIsEditorToolsOpen(!isEditorToolsOpen)}>
          <ToolsTab
            isActive={activeToolsTab === 'variables'}
            onClick={(e) => handleToolsTabClick(e, 'variables')}
          >
            {t('playground.variablesTabHeader')}
          </ToolsTab>
          <ToolsTab
            isActive={activeToolsTab === 'headers'}
            onClick={(e) => handleToolsTabClick(e, 'headers')}
          >
            {t('playground.headersTabHeader')}
          </ToolsTab>
        </ToolsBar>
        {isEditorToolsOpen && <VariablesEditor value={variables} onChange={setVariables} />}
      </EditorTools>
      <DocsPanel endpoint={endpoint} />
    </Container>
  );
};

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RequestEditor, MetadataEditor } from './codemirror';
import { DocsPanel } from './docsExplorer/docsPanel';
import styled from 'styled-components';
import theme from '../../theme';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.bgDarkBlue};
  flex: 1 1 0;
`;

const EditorBox = styled.section<{ isDark: boolean }>`
  position: relative;
  display: flex;
  flex: 1 1 0;
  flex-flow: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ isDark }) => (isDark ? theme.colors.bgDarkBlue : theme.colors.bgBlack)};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-corner {
    background-color: ${theme.colors.bgBlue};
  }
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
  query: string;
  setQuery: (query: string) => void;
  variables: string;
  setVariables: (variables: string) => void;
}

export const Editor = ({ query, setQuery, variables, setVariables }: EditorProps) => {
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
      <EditorBox isDark={false}>
        <RequestEditor value={query} onChange={setQuery} />
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
        <EditorBox isDark>
          {isEditorToolsOpen && <MetadataEditor value={variables} onChange={setVariables} />}
        </EditorBox>
      </EditorTools>
      <DocsPanel />
    </Container>
  );
};

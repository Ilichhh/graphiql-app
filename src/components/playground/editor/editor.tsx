import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useVerticalResize } from '../../../hooks/useVerticalResize';

import { RequestEditor, MetadataEditor } from '../codemirror';
import { DocsPanel } from '../docsExplorer/docsPanel';
import styled from 'styled-components';
import { Tab } from '../../../types';
import theme from '../../../theme';
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxTypedHooks';
import { set } from './querySlice';

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

const EditorTools = styled.section<{ isOpen: boolean; height: number }>`
  display: flex;
  background: ${theme.colors.bgBlack};
  flex-direction: column;
  min-height: 48px;
  max-height: calc(100vh - ${theme.headerHeight} - 56px);
  ${({ isOpen, height }) => isOpen && `height: ${height}px`};
`;

const ToolsBar = styled.div`
  display: flex;
  padding: 12px 20px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
  user-select: none;
  cursor: row-resize;
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
  variables: string;
  setVariables: (variables: string) => void;
  headers: string;
  setHeaders: (headers: string) => void;
}

export const Editor = ({ variables, setVariables, headers, setHeaders }: EditorProps) => {
  const query = useAppSelector((state) => state.query);
  const [activeToolsTab, setActiveToolsTab] = useState<Tab>(Tab.Variables);
  const [isEditorToolsOpen, setIsEditorToolsOpen] = useState(false);
  const { panelHeight, handleResize, isDragging } = useVerticalResize(300);
  const [headersLength, setHeadersLength] = useState(0);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleToolsTabClick = useCallback(
    (e: React.MouseEvent, tab: Tab) => {
      setActiveToolsTab(tab);
      setIsEditorToolsOpen(true);
      e.stopPropagation();
    },
    [setActiveToolsTab, setIsEditorToolsOpen]
  );

  const handleToolsTabToggle = useCallback(() => {
    if (!isDragging) {
      setIsEditorToolsOpen(!isEditorToolsOpen);
    }
  }, [isDragging, isEditorToolsOpen]);

  const handleToolsTabResize = useCallback(() => {
    if (isEditorToolsOpen) {
      handleResize();
    }
  }, [handleResize, isEditorToolsOpen]);

  useEffect(() => {
    try {
      const parsedHeaders = JSON.parse(headers);
      setHeadersLength(Object.keys(parsedHeaders).length);
    } catch (error) {
      setHeadersLength(0);
    }
  }, [headers, headersLength]);

  return (
    <Container>
      <EditorBox isDark={false}>
        <RequestEditor value={query} onChange={(value) => dispatch(set(value))} />
      </EditorBox>
      <EditorTools height={panelHeight} isOpen={isEditorToolsOpen}>
        <ToolsBar onMouseDown={handleToolsTabResize} onMouseUp={handleToolsTabToggle}>
          <ToolsTab
            isActive={activeToolsTab === 'variables'}
            onClick={(e) => handleToolsTabClick(e, Tab.Variables)}
          >
            {t('playground.variablesTabHeader')}
          </ToolsTab>
          <ToolsTab
            isActive={activeToolsTab === 'headers'}
            onClick={(e) => handleToolsTabClick(e, Tab.Headers)}
          >
            {t('playground.headersTabHeader')} {headersLength ? `(${headersLength})` : null}
          </ToolsTab>
        </ToolsBar>
        <EditorBox isDark>
          <MetadataEditor
            value={activeToolsTab === 'variables' ? variables : headers}
            onChange={activeToolsTab === 'variables' ? setVariables : setHeaders}
          />
        </EditorBox>
      </EditorTools>
      <DocsPanel />
    </Container>
  );
};

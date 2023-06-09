import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTabsState, useResize } from '../../../hooks';
import { MetadataEditor } from '../codemirror';
import { EditorToolsTab } from '../../../types';
import theme from '../../../theme';
import styled from 'styled-components';
import { ErrorBoundary } from '../../';

const EditorBox = styled.section`
  position: relative;
  display: flex;
  flex: 1 1 0;
  flex-flow: column;
  overflow-y: auto;
  background-color: ${theme.colors.bgBlack};
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.bgDarkBlue};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-corner {
    background-color: ${theme.colors.bgBlue};
  }
`;

const Container = styled.section<{ isOpen: boolean; height: number }>`
  display: flex;
  background: ${theme.colors.bgBlack};
  flex-direction: column;
  min-height: 40px;
  max-height: calc(100vh - ${theme.headerHeight} - ${theme.footerHeight} - 106px);
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
  border-bottom: 1px solid ${theme.colors.bgDarkBlue};
  cursor: row-resize;
`;

const ToolsTab = styled.span<{ isActive: boolean }>`
  display: flex;
  margin-right: 20px;
  flex-shrink: 0;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? theme.colors.textGrey : theme.colors.textInactive)};
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

export const EditorTools = () => {
  const { headers, variables, setVariables, setHeaders } = useTabsState();
  const [activeToolsTab, setActiveToolsTab] = useState<EditorToolsTab>(EditorToolsTab.Variables);
  const [isEditorToolsOpen, setIsEditorToolsOpen] = useState(false);
  const { size: panelHeight, handleResize, isDragging } = useResize(200, 'vertical');
  const [headersLength, setHeadersLength] = useState(0);
  const { t } = useTranslation();

  const handleToolsTabClick = useCallback(
    (e: React.MouseEvent, tab: EditorToolsTab) => {
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
    <Container height={panelHeight} isOpen={isEditorToolsOpen}>
      <ToolsBar onMouseDown={handleToolsTabResize} onMouseUp={handleToolsTabToggle}>
        <ToolsTab
          isActive={activeToolsTab === 'variables'}
          onClick={(e) => handleToolsTabClick(e, EditorToolsTab.Variables)}
        >
          {t('playground.variablesTabHeader')}
        </ToolsTab>
        <ToolsTab
          isActive={activeToolsTab === 'headers'}
          onClick={(e) => handleToolsTabClick(e, EditorToolsTab.Headers)}
        >
          {t('playground.headersTabHeader')} {headersLength ? `(${headersLength})` : null}
        </ToolsTab>
      </ToolsBar>
      <EditorBox>
        <ErrorBoundary>
          <MetadataEditor
            value={activeToolsTab === 'variables' ? variables : headers}
            onChange={(value) =>
              activeToolsTab === 'variables' ? setVariables(value) : setHeaders(value)
            }
          />
        </ErrorBoundary>
      </EditorBox>
    </Container>
  );
};

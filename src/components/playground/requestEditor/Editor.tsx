import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePrettier, useTabsState } from '../../../hooks';

import { EditorTools, PlayButton } from './';
import { SidebarModal } from '../sidebar';
import { RequestEditor } from '../codemirror';
import { PrettifyRequestButton, SaveRequestButton } from '../../common/IconButtons';
import { ErrorBoundary } from '../../';

import { SidebarModalMode } from '../../../types';

import theme from '../../../theme';
import styled, { css } from 'styled-components';

type ContainerProps = {
  width: number;
  isSidebarOpen: boolean;
};

const Container = styled.section.attrs<ContainerProps>(({ width }) => ({
  style: {
    width: `${width}px`,
  },
}))<ContainerProps>`
  display: flex;
  flex-direction: column;

  min-width: 355px;
  min-height: 300px;

  ${({ isSidebarOpen }) =>
    isSidebarOpen &&
    css`
      @media (min-width: 800px) and (max-width: 1100px) {
        min-width: 100%;
        max-width: 100%;
      }
    `};

  @media (max-width: 600px) {
    min-width: 100%;
    max-width: 100%;
  }
`;

const EditorBox = styled.section`
  position: relative;
  display: flex;
  flex: 1 1 0;
  flex-flow: column;
  background-color: ${theme.colors.bgDarkBlue};
`;

const EditorWrapper = styled.section`
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
    background-color: ${theme.colors.bgBlack};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-corner {
    background-color: ${theme.colors.bgDarkBlue};
  }
`;

const RequestEditorHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  min-height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px 6px;
  color: ${theme.colors.textGrey};
  background: ${theme.colors.bgDarkBlue};
  border-radius: 5px 5px 0 0;
`;

const RequestEditorControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

interface EditorProps {
  width: number;
  isFetching: boolean;
  isSidebarOpen: boolean;
  sendRequest: () => void;
}

export const Editor = ({ isFetching, isSidebarOpen, sendRequest, width }: EditorProps) => {
  const { query, setQuery } = useTabsState();
  const [sidebarModalMode, setSidebarModalMode] = useState<SidebarModalMode | null>(null);
  const { t } = useTranslation();
  const { prettify } = usePrettier();

  return (
    <Container width={width} isSidebarOpen={isSidebarOpen}>
      <EditorBox>
        <ErrorBoundary>
          <RequestEditorHeader>
            {t('playground.operation')}
            <RequestEditorControls>
              <SaveRequestButton
                title={t('playground.saveOperation') as string}
                onClick={() => setSidebarModalMode(SidebarModalMode.Save)}
              />
              <PrettifyRequestButton
                title={t('playground.prettify') as string}
                onClick={prettify}
              />
              <PlayButton isFetching={isFetching} sendRequest={sendRequest} />
            </RequestEditorControls>
          </RequestEditorHeader>
          <EditorWrapper>
            <RequestEditor value={query} onChange={(value) => setQuery(value)} />
          </EditorWrapper>
        </ErrorBoundary>
      </EditorBox>
      <EditorTools />
      {sidebarModalMode && (
        <SidebarModal mode={SidebarModalMode.Save} prevName="" setMode={setSidebarModalMode} />
      )}
    </Container>
  );
};

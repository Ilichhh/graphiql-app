import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxTypedHooks';
import { setQuery } from '../../../store/editorSlice';
import { usePrettier } from '../../../hooks/usePrettier';

import { EditorTools, PlayButton, SaveQueryModal } from './';
import { RequestEditor } from '../codemirror';
import { PrettifyRequestButton, SaveRequestButton } from '../../../components/common/IconButtons';

import theme from '../../../theme';
import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
`;

const EditorBox = styled.section`
  position: relative;
  display: flex;
  flex: 1 1 0;
  flex-flow: column;
  overflow-y: auto;
  background-color: ${theme.colors.bgDarkBlue};
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.bgBlack};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-corner {
    background-color: ${theme.colors.bgBlue};
  }
`;

const RequestEditorHeader = styled.div`
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
  isFetching: boolean;
  sendRequest: () => void;
}

export const Editor = ({ isFetching, sendRequest }: EditorProps) => {
  const { query } = useAppSelector((state) => state.editor);
  const [saveQueryModalOpen, setSaveQueryModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { prettify } = usePrettier();

  return (
    <Container>
      <EditorBox>
        <RequestEditorHeader>
          {t('playground.operation')}
          <RequestEditorControls>
            <SaveRequestButton
              title={t('playground.saveOperation') as string}
              onClick={() => setSaveQueryModalOpen(true)}
            />
            <PrettifyRequestButton title={t('playground.prettify') as string} onClick={prettify} />
            <PlayButton isFetching={isFetching} sendRequest={sendRequest} />
          </RequestEditorControls>
        </RequestEditorHeader>
        <RequestEditor value={query} onChange={(value) => dispatch(setQuery(value))} />
      </EditorBox>
      <EditorTools />
      <SaveQueryModal open={saveQueryModalOpen} setOpen={setSaveQueryModalOpen} />
    </Container>
  );
};

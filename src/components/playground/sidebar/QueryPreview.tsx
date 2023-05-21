import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ShowOptionsButton } from '../../../components/common/IconButtons';
import { QueryTemplateModal } from './';
import Popover from '@mui/material/Popover';

import { DocumentData } from '@firebase/firestore';
import { TemplateModalMode } from '../../../types';

import theme from '../../../theme';
import styled from 'styled-components';

const Container = styled.aside`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  color: ${theme.colors.textGrey};
  background-color: ${theme.colors.bgBlue};
`;

const Endpoint = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  color: ${theme.colors.textInactive};
  transition: 0.2s all;
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
  height: 58px;
  padding: 5px 10px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    background-color: ${theme.colors.hoverLight};
    ${Endpoint} {
      color: ${theme.colors.textGrey};
    }
  }
`;

const Name = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
`;

const Option = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.hoverLight};
  }
`;

const DeleteOption = styled(Option)`
  color: ${theme.colors.error};
`;

interface QueryPreviewProps {
  templateId: string;
  data: DocumentData;
}

export const QueryPreview = ({ templateId, data }: QueryPreviewProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [queryTemplateModalMode, setQueryTemplateModalMode] = useState<TemplateModalMode | null>(
    null
  );
  const { t } = useTranslation();

  const openPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleOpenModal = useCallback(
    (mode: TemplateModalMode) => {
      handleClosePopover();
      setQueryTemplateModalMode(mode);
    },
    [handleClosePopover]
  );

  return (
    <Container>
      <DataWrapper>
        <Name>{data.name}</Name>
        <Endpoint>{data.endpoint}</Endpoint>
      </DataWrapper>
      <div>
        <ShowOptionsButton size="small" onClick={openPopover} />
        <Popover
          id={templateId}
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Option onClick={() => handleOpenModal(TemplateModalMode.Rename)}>
            {t('playground.renameQuery')}
          </Option>
          <DeleteOption onClick={() => handleOpenModal(TemplateModalMode.Delete)}>
            {t('playground.deleteQuery')}
          </DeleteOption>
        </Popover>
      </div>
      {queryTemplateModalMode && (
        <QueryTemplateModal
          mode={queryTemplateModalMode}
          setMode={setQueryTemplateModalMode}
          templateId={templateId}
          prevName={data.name}
        />
      )}
    </Container>
  );
};

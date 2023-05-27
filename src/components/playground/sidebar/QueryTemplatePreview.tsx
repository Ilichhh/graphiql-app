import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '../../../hooks/useSidebar';

import { ShowOptionsButton } from '../../common/IconButtons';
import { SidebarModal } from '.';
import Popover from '@mui/material/Popover';

import { DocumentData } from '@firebase/firestore';
import { SidebarModalMode } from '../../../types';

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

interface QueryTemplatePreviewProps {
  templateId: string;
  data: DocumentData;
}

export const QueryTemplatePreview = ({ templateId, data }: QueryTemplatePreviewProps) => {
  const { name, endpoint } = data;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [sidebarModalMode, setSidebarModalMode] = useState<SidebarModalMode | null>(null);
  const { selectQuery } = useSidebar();
  const { t } = useTranslation();

  const openPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleOpenModal = useCallback(
    (mode: SidebarModalMode) => {
      handleClosePopover();
      setSidebarModalMode(mode);
    },
    [handleClosePopover]
  );

  const handleOpenTab = useCallback(() => {
    selectQuery(data, templateId);
  }, [data, selectQuery, templateId]);

  return (
    <Container>
      <DataWrapper onClick={handleOpenTab}>
        <Name>{name}</Name>
        <Endpoint>{endpoint}</Endpoint>
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
          <Option onClick={() => handleOpenModal(SidebarModalMode.Rename)}>
            {t('playground.renameQuery')}
          </Option>
          <DeleteOption onClick={() => handleOpenModal(SidebarModalMode.Delete)}>
            {t('playground.deleteQuery')}
          </DeleteOption>
        </Popover>
      </div>
      {sidebarModalMode && (
        <SidebarModal
          mode={sidebarModalMode}
          setMode={setSidebarModalMode}
          templateId={templateId}
          prevName={name}
        />
      )}
    </Container>
  );
};

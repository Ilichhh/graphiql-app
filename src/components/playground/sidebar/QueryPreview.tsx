import React, { useState, useCallback } from 'react';
import { useSidebar } from '../../../hooks/useSidebar';

import { ShowOptionsButton } from '../../../components/common/IconButtons';
import { QueryTemplateModal } from './';
import Popover from '@mui/material/Popover';

import theme from '../../../theme';
import styled from 'styled-components';

import { DocumentData } from '@firebase/firestore';

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
  const { deleteTemplate } = useSidebar();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [queryTemplateModalOpen, setQueryTemplateModalOpen] = useState(false);

  const openPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleOpenModal = useCallback(() => {
    handleClosePopover();
    setQueryTemplateModalOpen(true);
  }, [handleClosePopover]);

  const isPopoverOpen = Boolean(anchorEl);

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
          open={isPopoverOpen}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Option onClick={handleOpenModal}>Rename request</Option>
          <DeleteOption onClick={() => deleteTemplate(templateId)}>Delete</DeleteOption>
        </Popover>
      </div>
      <QueryTemplateModal
        mode="rename"
        open={queryTemplateModalOpen}
        setOpen={setQueryTemplateModalOpen}
        templateId={templateId}
        prevName={data.name}
      />
    </Container>
  );
};

import React from 'react';
import { deleteQueryTemplate } from '../../../api/firebaseApi';

import { IconButton } from '@mui/material';
import { ShowOptionsButton } from '../../../components/common/IconButtons';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import theme from '../../../theme';
import styled from 'styled-components';

import { DocumentData } from '@firebase/firestore';

const Container = styled.aside`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${theme.colors.textGrey};
  background-color: ${theme.colors.bgBlue};
`;

const Name = styled.div`
  width: 100%;
  height: 28px;
  padding: 5px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.hoverLight};
  }
`;

interface QueryPreviewProps {
  templateId: string;
  data: DocumentData;
}

export const QueryPreview = ({ templateId, data }: QueryPreviewProps) => {
  return (
    <Container>
      <Name>{data.name}</Name>
      <IconButton onClick={() => deleteQueryTemplate(templateId)}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
      <ShowOptionsButton size="small" />
    </Container>
  );
};

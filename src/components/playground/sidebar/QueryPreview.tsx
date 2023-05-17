import React from 'react';

import { IconButton } from '@mui/material';
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

const Name = styled.aside`
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.bgDarkBlue};
  }
`;

interface QueryPreviewProps {
  data: DocumentData;
}

export const QueryPreview = ({ data }: QueryPreviewProps) => {
  return (
    <Container>
      <Name>{data.name}</Name>
      <IconButton>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Container>
  );
};

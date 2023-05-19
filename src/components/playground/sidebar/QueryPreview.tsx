import React from 'react';
import { useSidebar } from '../../../hooks/useSidebar';

import { ShowOptionsButton } from '../../../components/common/IconButtons';

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

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 240px;
  height: 58px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.bgDarkBlue};
  }
`;

const Name = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Endpoint = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${theme.colors.textInactive};
`;

interface QueryPreviewProps {
  templateId: string;
  data: DocumentData;
}

export const QueryPreview = ({ templateId, data }: QueryPreviewProps) => {
  const { deleteTemplate } = useSidebar();
  return (
    <Container>
      <DataWrapper>
        <Name>{data.name}</Name>
        <Endpoint>{data.endpoint}</Endpoint>
      </DataWrapper>
      <ShowOptionsButton size="small" onClick={() => deleteTemplate(templateId)} />
    </Container>
  );
};

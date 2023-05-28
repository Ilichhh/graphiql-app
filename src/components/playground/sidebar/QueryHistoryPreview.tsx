import React, { useCallback } from 'react';
import { useSidebar } from '../../../hooks/useSidebar';
import { useTimestamp } from '../../../hooks/useTimestamp';
import { useTranslation } from 'react-i18next';

import { DocumentData } from '@firebase/firestore';

import theme from '../../../theme';
import styled from 'styled-components';

const Endpoint = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  color: ${theme.colors.textInactive};
  transition: 0.2s all;
`;

const Name = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
`;

const Container = styled.aside`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  color: ${theme.colors.textGrey};
  background-color: ${theme.colors.bgBlue};
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    background-color: ${theme.colors.hoverLight};
    ${Endpoint} {
      color: ${theme.colors.textGrey};
    }
  }
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
  height: 58px;
  padding: 5px 10px;
  overflow: hidden;
`;

const Date = styled.div`
  padding: 11px;
  font-size: 12px;
`;

interface QueryHistoryPreviewProps {
  templateId: string;
  data: DocumentData;
  timestamp: number;
}

export const QueryHistoryPreview = ({ templateId, data, timestamp }: QueryHistoryPreviewProps) => {
  const { name, endpoint } = data;
  const { selectQuery } = useSidebar();
  const date = useTimestamp(timestamp);
  const { t } = useTranslation();

  const handleOpenTab = useCallback(() => {
    selectQuery(data, templateId);
  }, [data, selectQuery, templateId]);

  return (
    <Container>
      <DataWrapper onClick={handleOpenTab}>
        <Name>{name || t('playground.unnamedQuery')}</Name>
        <Endpoint>{endpoint}</Endpoint>
      </DataWrapper>
      <Date>{date}</Date>
    </Container>
  );
};

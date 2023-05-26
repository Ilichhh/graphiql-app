import React from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useTheme } from '@mui/material/styles';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  height: 100%;
  margin: 10px;
`;

export const FallbackComponent = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Container>
      <SentimentVeryDissatisfiedIcon fontSize="large" />
      <div style={{ color: theme.palette.text.primary }}>{t('global.errorBoundaryMessage')}</div>
    </Container>
  );
};

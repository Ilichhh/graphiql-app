import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import theme from '../../theme';

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #172a3a;
`;

const Title = styled.h2`
  ${theme.headings}
  max-width: 430px;

  grid-column: 1 / 2;
  justify-self: center;
  align-self: end;
  margin-bottom: 24px;

  font-weight: 500;
  font-size: 40px;
  line-height: 47px;
  color: #ffffff;
`;

const Subtitle = styled.h3`
  ${theme.headings}
  grid-column: 1 / 2;

  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
`;

const Video = styled.video`
  grid-column: 2 / 3;
  grid-row: 1 / 3;

  padding: 50px 0 30px;
`;

export const Explore = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t('landing.explore.title')}</Title>
      <Subtitle>{t('landing.explore.subtitle')}</Subtitle>
      <Video src="" poster="/video.jpg"></Video>
    </Container>
  );
};

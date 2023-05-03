import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import theme from '../../theme';

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;

  max-width: ${theme.contentWidth};

  margin: 120px auto;
`;

const Title = styled.h1`
  ${theme.headings}
  grid-column: 1 / 2;
  align-self: end;
  margin-bottom: 24px;

  font-size: 50px;
  font-weight: 500;
  line-height: 59px;
`;

const Subtitle = styled.h3`
  ${theme.headings}
  grid-column: 1 / 2;
  justify-self: center;
  max-width: 292px;

  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
`;

const Img = styled.img`
  grid-column: 2 / 3;
  grid-row: 1 / 3;
`;

export const Hero = React.memo(() => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t('landing.hero.title')}</Title>
      <Subtitle>{t('landing.hero.subtitle')}</Subtitle>
      <Img src="/hero.jpg" alt="App screenshot" width="491" height="230" />
    </Container>
  );
});

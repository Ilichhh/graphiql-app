import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import theme from '../../theme';

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;

  max-width: ${theme.contentWidth};

  margin: 120px auto;
  padding: 0 40px;

  @media (max-width: ${theme.tablet}) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

const Title = styled.h1`
  ${theme.headings}
  grid-column: 1 / 2;
  align-self: end;
  margin-bottom: 24px;
  padding: 0 10px;

  font-size: 50px;
  font-weight: 500;
  line-height: 59px;

  @media (max-width: ${theme.laptop}) {
    font-size: 42px;
  }

  @media (max-width: ${theme.tablet}) {
    margin-bottom: 0;
  }
`;

const Subtitle = styled.h3`
  ${theme.headings}
  grid-column: 1 / 2;
  justify-self: center;
  max-width: 292px;
  padding: 0 10px;

  font-size: 24px;
  font-weight: 400;
  line-height: 28px;

  @media (max-width: ${theme.laptop}) {
    font-size: 16px;
  }

  @media (max-width: ${theme.tablet}) {
    max-width: 100%;
    width: 100%;

    margin-bottom: 10px;
  }
`;

const Img = styled.img`
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  margin: 0 auto;

  @media (max-width: ${theme.tablet}) {
    grid-column: 1 / 3;

    grid-row: 3 / 4;
  }
`;

export const Hero = React.memo(() => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t('landing.hero.title')}</Title>
      <Subtitle>{t('landing.hero.subtitle')}</Subtitle>
      <Img src="/hero.png" alt="App screenshot" width="560" height="315" />
    </Container>
  );
});

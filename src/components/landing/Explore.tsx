import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import theme from '../../theme';

const Container = styled.section`
  background-color: ${theme.colors.bgBlue};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  max-width: ${theme.contentWidth};

  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: ${theme.tablet}) {
    grid-template-columns: 1fr;
    padding: 20px 20px;
  }
`;

const Title = styled.h2`
  ${theme.headings}
  max-width: 430px;

  grid-column: 1 / 2;
  justify-self: center;
  align-self: end;
  margin-bottom: 24px;
  padding: 0 10px;

  font-weight: 500;
  font-size: 40px;
  line-height: 47px;
  color: ${theme.colors.textWhite};

  @media (max-width: ${theme.laptop}) {
    font-size: 32px;
  }

  @media (max-width: ${theme.tablet}) {
    margin-bottom: 0;
  }
`;

const Subtitle = styled.h3`
  ${theme.headings}
  grid-column: 1 / 2;
  padding: 0 10px;

  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${theme.colors.textWhite};

  @media (max-width: ${theme.laptop}) {
    font-size: 14px;
  }

  @media (max-width: ${theme.tablet}) {
    max-width: 100%;
    width: 100%;

    margin-bottom: 10px;
  }
`;

const Video = styled.video`
  grid-column: 2 / 3;
  grid-row: 1 / 3;

  padding: 50px 0 50px;
  margin: 0 auto;

  @media (max-width: ${theme.tablet}) {
    grid-column: 1 / 3;
    grid-row: 3 / 4;

    padding: 10px;
  }
`;

export const Explore = React.memo(() => {
  const { t } = useTranslation();

  return (
    <Container>
      <Grid>
        <Title>{t('landing.explore.title')}</Title>
        <Subtitle>{t('landing.explore.subtitle')}</Subtitle>
        <Video src="" poster="/video.jpg"></Video>
      </Grid>
    </Container>
  );
});

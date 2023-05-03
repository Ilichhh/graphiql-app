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
  color: ${theme.colors.textWhite};
`;

const Subtitle = styled.h3`
  ${theme.headings}
  grid-column: 1 / 2;

  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${theme.colors.textWhite};
`;

const Video = styled.video`
  grid-column: 2 / 3;
  grid-row: 1 / 3;

  padding: 50px 0 50px;
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

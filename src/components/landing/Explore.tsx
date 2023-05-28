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

  @media (max-width: ${theme.mobile}) {
    grid-template-columns: 1fr;
    padding: 10px 10px;
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
    font-size: 28px;
  }

  @media (max-width: ${theme.tablet}) {
    max-width: 100%;

    margin-bottom: 0;
  }

  @media (max-width: ${theme.mobileSmall}) {
    font-size: 18px;
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

    margin-bottom: 10px;
  }

  @media (max-width: ${theme.mobileSmall}) {
    font-size: 10px;
  }
`;

const Video = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 3;

  padding: 120px 0 120px;
  margin: 0 auto;

  @media (max-width: ${theme.tablet}) {
    grid-column: 1 / 3;
    grid-row: 3 / 4;

    padding: 10px 0;
  }
`;

const IFrame = styled.iframe<{ width: string; height: string }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  @media (max-width: ${theme.mobile}) {
    width: ${theme.mediaContentMediumWidth};
    height: ${theme.mediaContentMediumHeight};
  }

  @media (max-width: 390px) {
    width: ${theme.mediaContentSmallWidth};
    height: ${theme.mediaContentSmallHeight};
  }
`;

export const Explore = React.memo(() => {
  const { t } = useTranslation();

  return (
    <Container>
      <Grid>
        <Title>{t('landing.explore.title')}</Title>
        <Subtitle>{t('landing.explore.subtitle')}</Subtitle>
        <Video>
          <IFrame
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ch1c4fIOB_c"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
          ></IFrame>
        </Video>
      </Grid>
    </Container>
  );
});

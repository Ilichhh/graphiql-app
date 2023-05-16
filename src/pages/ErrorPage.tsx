import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 40px 0;
  text-align: center;
`;

const Header = styled.h1`
  margin: 0;
  font-size: 80px;
`;

const BackgroundImage = styled.div`
  height: 400px;
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  background-position: center;
`;

const Subheader = styled.h3`
  margin-top: 0;
  margin-bottom: 50px;
  font-size: 80px;
  @media (max-width: 600px) {
    font-size: 40px;
  }
`;

export const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Header>404</Header>
      <BackgroundImage />
      <div>
        <Subheader>{t('404.header')}</Subheader>
        <Button variant="contained" size="large" color="secondary" component={Link} to="/">
          {t('404.toHome')}
        </Button>
      </div>
    </Container>
  );
};

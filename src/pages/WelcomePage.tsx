import React from 'react';

import { Header, Footer, Container } from '../components';
import { Hero, Explore, Team } from '../components/landing';

import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../muiTheme';

export const WelcomePage = () => {
  return (
    <Container>
      <ThemeProvider theme={lightTheme}>
        <Header currentPage="welcome" />
        <main>
          <Hero />
          <Explore />
          <Team />
        </main>
        <Footer />
      </ThemeProvider>
    </Container>
  );
};

import React from 'react';

import { Header, Footer, Container } from '../components';
import { Hero, Explore, Team } from '../components/landing';

export const WelcomePage = () => {
  return (
    <Container>
      <Header currentPage="welcome" />
      <main>
        <Hero />
        <Explore />
        <Team />
      </main>
      <Footer />
    </Container>
  );
};

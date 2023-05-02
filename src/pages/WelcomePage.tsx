import React from 'react';

import { Header, Footer } from '../components';
import { Hero, Explore, Team } from '../components/landing';

export const WelcomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Explore />
        <Team />
      </main>
      <Footer />
    </>
  );
};

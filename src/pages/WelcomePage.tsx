import React from 'react';
import styled from 'styled-components';

import { Header, Footer } from '../components';
import { Hero, Explore, Team } from '../components/landing';

const Container = styled.div`
  background-color: #f5f5f5;
`;

export const WelcomePage = () => {
  return (
    <Container>
      <Header />
      <main>
        <Hero />
        <Explore />
        <Team />
      </main>
      <Footer />
    </Container>
  );
};

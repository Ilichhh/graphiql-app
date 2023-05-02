import React from 'react';
import { useTranslation } from 'react-i18next';
// import styled from 'styled-components';

import { Header, Footer } from '../components';
import { Hero, DeveloperCard } from '../components/landing';
import { useDevs } from '../hooks';

export const WelcomePage = () => {
  const { t } = useTranslation();
  const devs = useDevs();
  const cards = devs.map((dev) => <DeveloperCard key={dev.id} {...dev} />);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <section>
          <h2>{t('landing.explore.title')}</h2>
          <h3>{t('landing.explore.subtitle')}</h3>
          <video src="" poster="/video.jpg"></video>
        </section>
        <section>
          <h2>{t('landing.team.title')}</h2>
          {cards}
        </section>
      </main>
      <Footer />
    </>
  );
};

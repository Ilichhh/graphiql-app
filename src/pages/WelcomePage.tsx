import React from 'react';
import { useTranslation } from 'react-i18next';

import { Header, Footer } from '../components';
import { Hero, DeveloperCard, Explore } from '../components/landing';
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
        <Explore />
        <section>
          <h2>{t('landing.team.title')}</h2>
          {cards}
        </section>
      </main>
      <Footer />
    </>
  );
};

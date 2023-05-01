import React from 'react';
import { useTranslation } from 'react-i18next';

import { Header } from '../components/Header';
import { DeveloperCard } from '../components/DeveloperCard';
import { default as devs } from '../data/devs';

export const WelcomePage = () => {
  const { t } = useTranslation();
  const cards = devs.map((dev) => <DeveloperCard key={dev.id} {...dev} />);

  return (
    <>
      <Header />
      <section>
        <h1>{t('landing.hero.title')}</h1>
        <h3>{t('landing.hero.subtitle')}</h3>
        <img src="/hero.jpg" alt="App screenshot" />
      </section>
      <section>
        <h2>{t('landing.explore.title')}</h2>
        <h3>{t('landing.explore.subtitle')}</h3>
        <video src="" poster="/video.jpg"></video>
      </section>
      <section>
        <h2>{t('landing.team.title')}</h2>
        {cards}
      </section>
    </>
  );
};

import React from 'react';
import { useTranslation } from 'react-i18next';

import { Header } from '../components/Header';

export const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <h1>{t('greeting')}</h1>
    </>
  );
};

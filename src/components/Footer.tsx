import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const devs = ['ilya', 'artyom', 'alena'];

  const items = devs.map((dev, index) => (
    <li key={index}>
      <GitHubIcon />
      <span>{t(`${dev}`)}</span>
    </li>
  ));

  return (
    <footer>
      <ul>{items}</ul>
      <div>
        <img src="rss.svg" alt="RS School logo" width="122" height="45" />
        <span>2023</span>
      </div>
    </footer>
  );
};

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

import GitHubIcon from '@mui/icons-material/GitHub';
import { RSLogoIcon } from './Icons';

import devs from '../data/devs.json';

import styled from 'styled-components';
import theme from '../theme';

const Container = styled.footer<{ color: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${theme.footerHeight};
  margin: 0 auto;
  padding: 0 40px;
  background-color: ${({ color }) => color};
`;

const List = styled.ul`
  display: flex;
  gap: 50px;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li``;

const Link = styled.a<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: ${({ color }) => color};
`;

const Year = styled.span<{ color: string }>`
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
  color: ${({ color }) => color};
`;

export const Footer = React.memo(() => {
  const muiTheme = useTheme();
  const { t } = useTranslation();

  const items = devs.map((dev) => (
    <ListItem key={dev.id}>
      <Link href={dev.github} target="_blank" color={muiTheme.palette.text.secondary}>
        <GitHubIcon fontSize="large" />
        <span>{t(`developers.${dev.name}.firstName`)}</span>
      </Link>
    </ListItem>
  ));

  return (
    <Container color={muiTheme.palette.background.default}>
      <List>{items}</List>
      <Year color={muiTheme.palette.text.secondary}>2023</Year>
      <RSLogoIcon />
    </Container>
  );
});

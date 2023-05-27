import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

import GitHubIcon from '@mui/icons-material/GitHub';
import { RSLogoIcon } from './common/Icons';

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
  user-select: none;
  @media (max-width: 600px) {
    padding: 0 12px;
  }
  @media (max-width: 400px) {
    padding: 0 6px;
  }
`;

const List = styled.ul`
  display: flex;
  gap: 50px;
  padding: 0;
  list-style: none;
  @media (max-width: 650px) {
    gap: 20px;
  }
`;

const ListItem = styled.li`
  width: 90px;
  @media (max-width: 650px) {
    width: auto;
  }
`;

const Link = styled.a<{ color?: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: ${({ color }) => color};
`;

const Name = styled.span`
  @media (max-width: 650px) {
    display: none;
  }
`;

const Year = styled.span<{ color: string }>`
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 33px;
  color: ${({ color }) => color};
  @media (max-width: 650px) {
    font-size: 1rem;
  }
`;

export const Footer = React.memo(() => {
  const muiTheme = useTheme();
  const { t } = useTranslation();

  const items = devs.map((dev) => (
    <ListItem key={dev.id}>
      <Link href={dev.github} target="_blank" color={muiTheme.palette.text.secondary}>
        <GitHubIcon fontSize="large" sx={{ fill: muiTheme.palette.text.secondary }} />
        <Name>{t(`developers.${dev.name}.firstName`)}</Name>
      </Link>
    </ListItem>
  ));

  return (
    <Container color={muiTheme.palette.background.default}>
      <List>{items}</List>
      <Year color={muiTheme.palette.text.secondary}>2023</Year>
      <Link href="https://rs.school" target="_blank" color={muiTheme.palette.text.primary}>
        <RSLogoIcon sx={{ width: '94px', height: '32px', fill: muiTheme.palette.text.secondary }} />
      </Link>
    </Container>
  );
});

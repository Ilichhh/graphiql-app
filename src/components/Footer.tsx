import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import devs from '../data/devs.json';

const Container = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 10px;
`;
const List = styled.ul`
  display: flex;
  gap: 50px;

  list-style: none;
`;

const ListItem = styled.li``;

const Link = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;

  text-decoration: none;
  color: #000000;
`;

const Copyright = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Year = styled.span`
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
`;

export const Footer = () => {
  const { t } = useTranslation();

  const items = devs.map((dev) => (
    <ListItem key={dev.id}>
      <Link href={dev.github}>
        <GitHubIcon fontSize="large" />
        <span>{t(`developers.${dev.name}.firstName`)}</span>
      </Link>
    </ListItem>
  ));

  return (
    <Container>
      <List>{items}</List>
      <Copyright>
        <Year>2023</Year>
        <Link href="https://rs.school">
          <img src="rss.svg" alt="RS School logo" width="122" height="45" />
        </Link>
      </Copyright>
    </Container>
  );
};

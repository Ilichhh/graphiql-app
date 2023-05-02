import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

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

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
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
  const devs = ['ilya', 'artyom', 'alena'];

  const items = devs.map((dev, index) => (
    <ListItem key={index}>
      <GitHubIcon fontSize="large" />
      <span>{t(`developers.${dev}.firstName`)}</span>
    </ListItem>
  ));

  return (
    <Container>
      <List>{items}</List>
      <Copyright>
        <Year>2023</Year>
        <img src="rss.svg" alt="RS School logo" width="122" height="45" />
      </Copyright>
    </Container>
  );
};

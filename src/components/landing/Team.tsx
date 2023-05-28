import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { DeveloperCard } from './';
import theme from '../../theme';
import devs from '../../data/devs.json';

const Container = styled.section`
  max-width: ${theme.contentWidth};

  margin: 100px auto 50px;
  padding: 0 40px;

  @media (max-width: ${theme.tablet}) {
    padding: 0 20px;
  }

  @media (max-width: ${theme.mobile}) {
    padding: 0 10px;
  }
`;

const Title = styled.h2`
  ${theme.headings};

  margin-bottom: 60px;

  font-weight: 500;
  font-size: 40px;
  line-height: 47px;

  @media (max-width: ${theme.laptop}) {
    font-size: 32px;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  list-style: none;

  @media (max-width: ${theme.tablet}) {
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }
`;

const ListItem = styled.li`
  margin: 17px 0;
`;

export const Team = React.memo(() => {
  const { t } = useTranslation();
  const cardContent = devs.map((dev) => ({
    id: dev.id,
    name: `${t(`developers.${dev.name}.firstName`)} ${t(`developers.${dev.name}.secondName`)}`,
    role: `${t(`developers.${dev.name}.role`)}`,
    text: `${t(`developers.${dev.name}.info`)}`,
    image: `${dev.id}.jpg`,
  }));

  const cards = cardContent.map((dev) => (
    <ListItem key={dev.id}>
      <DeveloperCard {...dev} />
    </ListItem>
  ));

  return (
    <Container>
      <Title>{t('landing.team.title')}</Title>
      <List>{cards}</List>
    </Container>
  );
});

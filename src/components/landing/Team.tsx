import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { DeveloperCard } from './';
import theme from '../../theme';
import devs from '../../data/devs.json';

const Container = styled.section`
  max-width: ${theme.contentWidth};

  margin: 100px auto 50px;
`;

const Title = styled.h2`
  ${theme.headings};

  margin-bottom: 60px;

  font-weight: 500;
  font-size: 40px;
  line-height: 47px;
`;

const List = styled.ul`
  list-style: none;
`;

const ListItem = styled.li`
  margin: 17px 0;
`;

export const Team = () => {
  const { t } = useTranslation();
  const cardContent = devs.map((dev) => ({
    id: dev.id,
    name: `${t(`developers.${dev.name}.firstName`)} ${t(`developers.${dev.name}.secondName`)}`,
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
};

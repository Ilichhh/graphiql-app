import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { DeveloperCard } from './';
import theme from '../../theme';

const Container = styled.section`
  margin-top: 100px;
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
  const devs = ['ilya', 'artyom', 'alena'].map((dev, index) => ({
    id: index + 1,
    name: `${t(`developers.${dev}.firstName`)} ${t(`developers.${dev}.secondName`)}`,
    text: `${t(`developers.${dev}.info`)}`,
    image: `${index + 1}.jpg`,
  }));

  const cards = devs.map((dev) => (
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

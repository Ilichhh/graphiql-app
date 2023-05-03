import React from 'react';
import styled from 'styled-components';

type DeveloperCardProps = {
  name: string;
  text: string;
  image: string;
};

const Card = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 9px 52px;

  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 36px;

  border: 1px solid #000000;
  box-shadow: 0px 4px 4px #172a3a;
  border-radius: 10px;
`;

const Image = styled.img`
  grid-column: 1 / 2;
  grid-row: 1 / 3;

  border-radius: 50%;
`;

const Title = styled.h4`
  margin: 0;

  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
`;

const Info = styled.p`
  margin: 0;

  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
`;

export const DeveloperCard = ({ name, text, image }: DeveloperCardProps) => {
  return (
    <Card>
      <Image src={image} alt="Profile picture" width="114" height="114" />
      <Title>{name}</Title>
      <Info>{text}</Info>
    </Card>
  );
};

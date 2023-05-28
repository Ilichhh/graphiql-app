import React from 'react';
import styled from 'styled-components';

type DeveloperCardProps = {
  name: string;
  role: string;
  text: string;
  image: string;
};

const Card = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: repeat(3, min-content);
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
  grid-row: 1 / 4;

  border-radius: 50%;
`;

const Title = styled.h4`
  display: flex;
  align-items: center;
  gap: 5px;

  margin: 0;

  font: inherit;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
`;

const Role = styled.p`
  margin: 0;
  padding-left: 5px;

  font: inherit;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;

  color: #707070;
`;

const Info = styled.pre`
  grid-column: 2 / 3;

  margin: 0;

  font: inherit;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;

  white-space: pre-wrap;
`;

export const DeveloperCard = React.memo(({ name, role, text, image }: DeveloperCardProps) => {
  return (
    <Card>
      <Image src={image} alt="Profile picture" width="114" height="114" />
      <Title>
        {name}
        <Role>{role}</Role>
      </Title>
      <Info>{text}</Info>
    </Card>
  );
});

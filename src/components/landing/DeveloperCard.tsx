import React from 'react';
import styled from 'styled-components';

type DeveloperCardProps = {
  name: string;
  role: string;
  text: string;
  image: string;
};

const Card = styled.div`
  display: flex;
  gap: 20px;

  max-width: 1200px;
  margin: 0 auto;

  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0px 4px 4px #172a3a;
  border-radius: 10px;
`;
const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 18px 0;

  text-align: center;

  background-color: #ebebeb;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Image = styled.img`
  grid-column: 1 / 2;
  grid-row: 1 / 4;

  margin: 18px 36px;

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
  padding: 0 5px;

  font: inherit;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;

  color: #545454;
`;

const Info = styled.pre`
  margin: 0;
  padding: 10px;
  align-self: center;

  font: inherit;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;

  white-space: pre-wrap;
`;

export const DeveloperCard = React.memo(({ name, role, text, image }: DeveloperCardProps) => {
  return (
    <Card>
      <ImageBox>
        <Title>{name}</Title>
        <Image src={image} alt="Profile picture" width="114" height="114" />
        <Role>{role}</Role>
      </ImageBox>
      <Info>{text}</Info>
    </Card>
  );
});

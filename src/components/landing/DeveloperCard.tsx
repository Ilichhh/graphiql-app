import React from 'react';

type DeveloperCardProps = {
  name: string;
  text: string;
  image: string;
};

export const DeveloperCard = ({ name, text, image }: DeveloperCardProps) => {
  return (
    <>
      <img src={image} alt="Profile picture" />
      <h4>{name}</h4>
      <p>{text}</p>
    </>
  );
};

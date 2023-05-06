import styled from 'styled-components';
import theme from '../../../../theme';
import { Divider } from '@mui/material';
import React from 'react';

const Title = styled.span`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 1rem;
  font-weight: 500;
  color: ${theme.colors.textInactive};
`;

interface TitleBarProps {
  title: string;
}

export const TitleBar = ({ title }: TitleBarProps) => {
  return (
    <>
      <Title>{title}</Title>
      <Divider />
    </>
  );
};

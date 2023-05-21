import styled from 'styled-components';
import theme from '../../../../theme';
import { Divider } from '@mui/material';
import React from 'react';

const Title = styled.span`
  display: flex;
  align-items: center;
  padding: 20px 0 10px 0;
  font-size: 1rem;
  font-weight: 500;
  color: ${theme.colors.textInactive};
`;

const Content = styled.div`
  margin-bottom: 10px;
`;

interface TitleBarProps {
  title: string;
}

export const TitleBar = ({ title }: TitleBarProps) => {
  return (
    <Content>
      <Title>{title}</Title>
      <Divider />
    </Content>
  );
};

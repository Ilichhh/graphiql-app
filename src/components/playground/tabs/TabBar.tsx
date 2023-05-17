import React from 'react';
import { Tab, TabPlus } from './Tab';
import styled from 'styled-components';
import theme from '../../../theme';

const TabBarWrapper = styled.div`
  height: 57px;
  background-color: ${theme.colors.bgBlack};
  overflow: hidden;
`;

const TabBarContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    appearance: none;
    width: 7px;
    height: 7px;
  }
`;
export const TabBar = () => {
  return (
    <TabBarWrapper>
      <TabBarContent>
        <Tab />
        <TabPlus />
      </TabBarContent>
    </TabBarWrapper>
  );
};

import React from 'react';
import { Tab, TabPlus } from './Tab';
import styled from 'styled-components';
import theme from '../../../theme';
import { useAppSelector } from '../../../hooks/reduxTypedHooks';

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
  const { tabs, selectedId } = useAppSelector(({ tabs }) => tabs);
  return (
    <TabBarWrapper>
      <TabBarContent>
        {tabs.map(({ id, name }) => (
          <Tab key={id} id={id} isActive={id === selectedId} name={name} />
        ))}
        <TabPlus />
      </TabBarContent>
    </TabBarWrapper>
  );
};

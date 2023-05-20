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
  const { tabs, selectedIdx } = useAppSelector(({ tabs }) => tabs);
  const showCloseBtn = tabs.length > 1;

  return (
    <TabBarWrapper>
      <TabBarContent>
        {tabs.map(({ name }, i) => (
          <Tab
            key={i}
            index={i}
            isActive={i === selectedIdx}
            name={name}
            showCloseBtn={showCloseBtn}
          />
        ))}
        <TabPlus />
      </TabBarContent>
    </TabBarWrapper>
  );
};

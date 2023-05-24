import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useSidebar } from '../../../hooks';
import { OpenSidebarButton } from '../../../components/common/IconButtons';

import { Tab, TabPlus } from './Tab';

import styled from 'styled-components';
import theme from '../../../theme';

const TabBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding-left: 6px;
  background-color: ${theme.colors.bgBlack};
  overflow: hidden;
`;

const TabBarContent = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;

  &::-webkit-scrollbar {
    appearance: none;
    width: 7px;
    height: 0;
  }
`;

export const TabBar = () => {
  const { tabs, selectedIdx } = useAppSelector(({ tabs }) => tabs);
  const { isOpen: isSidebarOpen, openSidebar } = useSidebar();
  const showCloseBtn = tabs.length > 1;
  const { t } = useTranslation();

  return (
    <TabBarWrapper>
      {!isSidebarOpen && (
        <OpenSidebarButton
          size="small"
          title={t('playground.expand') as string}
          onClick={openSidebar}
        />
      )}
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

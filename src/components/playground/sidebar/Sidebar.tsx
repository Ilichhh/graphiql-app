import React, { useEffect, useState } from 'react';
import { useSidebar } from '../../../hooks/useSidebar';
import { useTranslation } from 'react-i18next';

import { QueryPreview } from './QueryPreview';
import { CloseSidebarButton } from '../../../components/common/IconButtons';
import { BookmarkBorderOutlined, HistoryOutlined } from '@mui/icons-material';

import { SidebarTabs } from '../../../types';

import theme from '../../../theme';
import styled from 'styled-components';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.textGrey};
  background-color: ${theme.colors.bgBlue};
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 43px;
  padding: 0 10px;
  background-color: ${theme.colors.bgDarkBlue};
  border-bottom: 1px solid ${theme.colors.bgDarkBlue};
`;

const Tabs = styled.div`
  display: flex;
  gap: 5px;
`;

const SidebarTab = styled.div<{ isActive?: boolean }>`
  display: flex;
  height: 43px;
  align-items: center;
  padding: 10px;
  background-color: ${({ isActive }) =>
    isActive ? `${theme.colors.bgBlue}` : `${theme.colors.bgDarkBlue}`};
  user-select: none;

  &:hover {
    background-color: ${theme.colors.bgBlue};
    cursor: pointer;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  height: 52px;
  font-size: 18px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  width: 320px;
  border-top: 1px solid ${theme.colors.bgDarkBlue};
`;

export const Sidebar = React.memo(() => {
  const { closeSidebar, queryTemplates, activeTab, changeTab } = useSidebar();
  const [queriesArray, setQueriesArray] = useState<React.ReactNode[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const arr = queryTemplates.map((template) => (
      <QueryPreview key={template.id} templateId={template.id} data={template.data} />
    ));
    setQueriesArray(arr);
  }, [queryTemplates]);

  return (
    <Container>
      <Nav>
        <Tabs>
          <SidebarTab
            isActive={activeTab === 'templates'}
            onClick={() => changeTab(SidebarTabs.Templates)}
          >
            <BookmarkBorderOutlined />
          </SidebarTab>
          <SidebarTab
            isActive={activeTab === 'history'}
            onClick={() => changeTab(SidebarTabs.History)}
          >
            <HistoryOutlined disabled />
          </SidebarTab>
        </Tabs>
        <CloseSidebarButton
          size="small"
          title={t('playground.collapse') as string}
          onClick={closeSidebar}
        />
      </Nav>
      <Header>{t('playground.queriesCollection')}</Header>
      <ContentBox>{activeTab === 'templates' && queriesArray}</ContentBox>
    </Container>
  );
});

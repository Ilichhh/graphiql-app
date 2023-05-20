import React, { useEffect, useState } from 'react';
import { useSidebar } from '../../../hooks/useSidebar';

import { QueryPreview } from './QueryPreview';
import {
  CloseSidebarButton,
  RequestsHistoryTabButton,
  SettingsTabButton,
  TemplatesTabButton,
} from '../../../components/common/IconButtons';

import { SidebarTabs } from '../../../types';

import theme from '../../../theme';
import styled from 'styled-components';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  width: 360px;
  color: ${theme.colors.textGrey};
  background-color: ${theme.colors.bgBlue};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-right: 0;
  border-top: 1px solid ${theme.colors.bgDarkBlue};
`;

export const Sidebar = React.memo(() => {
  const { closeSidebar, queryTemplates, activeTab, changeTab } = useSidebar();
  const [queriesArray, setQueriesArray] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const arr = queryTemplates.map((template) => (
      <QueryPreview key={template.id} templateId={template.id} data={template.data} />
    ));
    setQueriesArray(arr);
  }, [queryTemplates]);

  return (
    <Container>
      <Header>
        <Tabs>
          <TemplatesTabButton size="small" onClick={() => changeTab(SidebarTabs.Templates)} />
          <RequestsHistoryTabButton size="small" onClick={() => changeTab(SidebarTabs.History)} />
          <SettingsTabButton size="small" onClick={() => changeTab(SidebarTabs.Settings)} />
        </Tabs>
        <CloseSidebarButton size="small" onClick={closeSidebar} />
      </Header>
      <ContentBox>{activeTab === 'templates' && queriesArray}</ContentBox>
    </Container>
  );
});

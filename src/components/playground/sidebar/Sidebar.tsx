import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '../../../hooks';
import { ErrorBoundary } from '../../';

import { QueryTemplatePreview, QueryHistoryPreview } from './';
import { CloseSidebarButton, ClearHistoryButton } from '../../../components/common/IconButtons';
import { BookmarkBorderOutlined, HistoryOutlined } from '@mui/icons-material';

import { SidebarTabs } from '../../../types';

import theme from '../../../theme';
import styled from 'styled-components';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.textGrey};
  background-color: ${theme.colors.bgBlue};
  user-select: none;
  @media (max-width: 800px) {
    position: absolute;
    z-index: 100;
    height: 100%;
    box-shadow: 3px 0px 2px rgba(0, 0, 0, 0.25);
  }
  @media (max-width: 600px) {
    width: 100%;
  }
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
  gap: 10px;
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
  justify-content: space-between;
  padding: 10px 8px 10px 20px;
  height: 52px;
  font-size: 18px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  padding: 5px 10px;
  width: 320px;
  border-top: 1px solid ${theme.colors.bgDarkBlue};
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.bgDarkBlue};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-corner {
    background-color: ${theme.colors.bgBlue};
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const EmptyCollectionMessage = styled.div`
  padding: 10px;
  color: ${theme.colors.textInactive};
`;

export const Sidebar = React.memo(() => {
  const { closeSidebar, queryTemplates, activeTab, changeTab, runHistory, clearRunHistory } =
    useSidebar();
  const [templatesArray, setTemplatesArray] = useState<React.ReactNode[]>([]);
  const [runHistoryArray, setRunHistoryArray] = useState<React.ReactNode[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const arr = queryTemplates.map((template) => (
      <QueryTemplatePreview key={template.id} templateId={template.id} data={template.data} />
    ));
    setTemplatesArray(arr);
  }, [queryTemplates]);

  useEffect(() => {
    const arr = runHistory.map((historyItem) => (
      <QueryHistoryPreview
        key={historyItem.id}
        templateId={historyItem.id}
        data={historyItem.data}
        timestamp={historyItem.timestamp}
      />
    ));
    setRunHistoryArray(arr);
  }, [runHistory]);

  let tabContent;
  if (activeTab === 'templates') {
    tabContent = (
      <>
        <Header>{t('playground.queriesCollection')}</Header>
        <ContentBox>
          {templatesArray.length ? (
            templatesArray
          ) : (
            <EmptyCollectionMessage>
              {t('playground.emptyCollectionMessage')}
            </EmptyCollectionMessage>
          )}
        </ContentBox>
      </>
    );
  }
  if (activeTab === 'history') {
    tabContent = (
      <>
        <Header>
          {t('playground.runHistory')}
          <ClearHistoryButton onClick={clearRunHistory} />
        </Header>
        <ContentBox>
          {runHistoryArray.length ? (
            runHistoryArray
          ) : (
            <EmptyCollectionMessage>{t('playground.emptyHistoryMessage')}</EmptyCollectionMessage>
          )}
        </ContentBox>
      </>
    );
  }

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
            <HistoryOutlined />
          </SidebarTab>
        </Tabs>
        <CloseSidebarButton
          size="small"
          title={t('playground.collapse') as string}
          onClick={closeSidebar}
        />
      </Nav>
      <ErrorBoundary>{tabContent}</ErrorBoundary>
    </Container>
  );
});

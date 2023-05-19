import React, { useEffect, useState } from 'react';
import { useSidebar } from '../../../hooks/useSidebar';

import { QueryPreview } from './QueryPreview';
import {
  CloseSidebarButton,
  RequestsHistoryTabButton,
  TemplatesTabButton,
} from '../../../components/common/IconButtons';

import theme from '../../../theme';
import styled from 'styled-components';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  width: 300px;
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
  padding: 10px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-right: 0;
  border-top: 1px solid ${theme.colors.bgDarkBlue};
`;

export const Sidebar = () => {
  const { closeSidebar, queryTemplates } = useSidebar();
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
          <TemplatesTabButton size="small" />
          <RequestsHistoryTabButton size="small" disabled />
        </Tabs>
        <CloseSidebarButton size="small" onClick={closeSidebar} />
      </Header>
      <ContentBox>{queriesArray}</ContentBox>
    </Container>
  );
};

import React, { Suspense, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { DocsPanel } from '../components/playground/docsExplorer';
import { usePlayground } from '../hooks/usePlayground';
import { useGraphQLSchema } from '../hooks/useGraphQLSchema';
import { useTabsState } from '../hooks/useTabsState';
import { getDefaultQuery } from '../utils/defaultQuery';
import { useSidebar } from '../hooks/useSidebar';

import { Modal, PlaygroundHeader, ResponseBox } from '../components/playground';
import { Editor } from '../components/playground/requestEditor';
import { Header, Footer } from '../components';
import { Sidebar } from '../components/playground/sidebar';

import styled from 'styled-components';
import theme from '../theme';
import { TabBar } from '../components/playground/tabs/TabBar';
import { ResizeHandle } from '../components/common/ResizeHandle';
import { useResize } from '../hooks/useResize';

const Wrapper = styled.main`
  position: relative;
  display: flex;
  width: 100%;
  min-height: calc(100vh - ${theme.headerHeight} - ${theme.footerHeight});
  background: ${theme.colors.bgBlack};
`;

const PlaygroundWrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Playground = styled.div`
  display: flex;
  flex: 1 1 0;
  background: ${theme.colors.bgBlue};
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const PlaygroundPage = React.memo(() => {
  const { endpoint, setEndpoint, setQuery } = useTabsState();
  const { isOpen: isSidebarOpen, fetchQueryTemplatesData } = useSidebar();
  const { isSchemaError, schemaErrorMessage } = useGraphQLSchema(endpoint);
  const { response, errorMessage, isFetching, sendRequest } = usePlayground(endpoint);
  const lastEndpoint = localStorage.getItem('last-endpoint');
  const [isModal, setIsModal] = useState(!lastEndpoint);
  const responseText = errorMessage?.message || schemaErrorMessage?.message || response?.data;

  const { value: width, handleResize } = useResize(800, 'width');

  const resize = useCallback(() => {
    handleResize();
  }, [handleResize]);

  useEffect(() => {
    if (lastEndpoint && !endpoint) {
      setEndpoint(lastEndpoint);
      setQuery(getDefaultQuery(lastEndpoint));
    }
  }, [endpoint, lastEndpoint, isModal, setEndpoint, setQuery]);

  useEffect(() => {
    fetchQueryTemplatesData();
  }, [fetchQueryTemplatesData]);

  if (isModal) {
    return ReactDOM.createPortal(<Modal setIsModal={setIsModal} />, document.body);
  }

  return (
    <>
      <Header currentPage="playground" />
      <Wrapper>
        {isSidebarOpen && <Sidebar />}
        <PlaygroundWrapper>
          <TabBar />
          <PlaygroundHeader isError={isSchemaError} />
          <Playground>
            <Editor isFetching={isFetching} sendRequest={sendRequest} width={width} />
            <ResizeHandle onMouseDown={resize} />
            <ResponseBox
              isFetching={isFetching}
              response={responseText}
              status={response?.status || errorMessage?.status}
            />
            <Suspense>
              <DocsPanel />
            </Suspense>
          </Playground>
        </PlaygroundWrapper>
      </Wrapper>
      <Footer />
    </>
  );
});

import React, { useContext } from 'react';
import { Divider } from '@mui/material';
import styled from 'styled-components';
import { useTabsState, useGraphQLSchema } from '../../../hooks';
import { SchemaDoc } from './SchemaDoc';
import { TypeDoc } from './TypeDoc';
import { FieldDoc } from './FieldDoc';
import theme from '../../../theme';
import { isInputType, isNamedType } from 'graphql/type';
import { DocsNavContext } from './docsContext';
import { ExplorerTitleBar } from './components/ExplorerTitleBar';
import { SearchBar } from './components/SearchBar';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../../muiTheme';
import { ErrorBoundary } from '../../';

const ExplorerWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 100%;
  background: white;

  &:before {
    content: '';
    display: block;
    background-color: ${theme.docs.border};
    width: 7px;
    height: 100%;
  }
`;

const ExplorerContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
  margin-left: 15px;

  &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.docs.border};
    border-radius: 5px;
  }
`;

const useDocsContent = () => {
  const { getCurrent, isSchemaDoc, searchQuery } = useContext(DocsNavContext);
  const { data } = getCurrent();
  const { endpoint } = useTabsState();
  const { schema } = useGraphQLSchema(endpoint);

  if (!schema || searchQuery) {
    return <></>;
  }

  if (isSchemaDoc) {
    return <SchemaDoc schema={schema} />;
  }

  if (isNamedType(data) || isInputType(data)) {
    return <TypeDoc schema={schema} type={data} />;
  }

  if (data) {
    return <FieldDoc field={data} />;
  }
};

export const Explorer = () => {
  const content = useDocsContent();

  return (
    <ThemeProvider theme={lightTheme}>
      <ExplorerWrapper>
        <ErrorBoundary>
          <ExplorerContent>
            <ExplorerTitleBar />
            <Divider />
            <SearchBar />
            {content}
          </ExplorerContent>
        </ErrorBoundary>
      </ExplorerWrapper>
    </ThemeProvider>
  );
};

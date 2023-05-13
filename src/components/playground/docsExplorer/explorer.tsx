import React, { useContext } from 'react';
import { Divider } from '@mui/material';
import styled from 'styled-components';
import { SchemaDoc } from './schemaDoc';
import { TypeDoc } from './typeDoc';
import { FieldDoc } from './fieldDoc';
import theme from '../../../theme';
import { SchemaContext } from '../../../contexts';
import { isInputType, isNamedType } from 'graphql/type';
import { DocsNavContext } from './docsContext';
import { ExplorerTitleBar } from './components/explorerTitleBar';
import { SearchBar } from './components/searchBar';

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
  margin: 0 10px 10px 15px;
`;

const useDocsContent = () => {
  const { schema } = useContext(SchemaContext);
  const { getCurrent, isSchemaDoc, searchQuery } = useContext(DocsNavContext);
  const { data } = getCurrent();

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
    <ExplorerWrapper>
      <ExplorerContent>
        <ExplorerTitleBar />
        <Divider />
        <SearchBar />
        {content}
      </ExplorerContent>
    </ExplorerWrapper>
  );
};

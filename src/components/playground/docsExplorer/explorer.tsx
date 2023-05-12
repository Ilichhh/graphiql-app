import React, { ReactNode, useContext } from 'react';
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

export const Explorer = () => {
  const { schema } = useContext(SchemaContext);
  const { getCurrent, isSchemaDoc } = useContext(DocsNavContext);

  if (!schema) {
    return <></>;
  }

  let content: ReactNode = null;
  const { data } = getCurrent();

  if (isSchemaDoc) {
    content = <SchemaDoc schema={schema} />;
  } else if (isNamedType(data) || isInputType(data)) {
    content = <TypeDoc schema={schema} type={data} />;
  } else if (data) {
    content = <FieldDoc field={data} />;
  }

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

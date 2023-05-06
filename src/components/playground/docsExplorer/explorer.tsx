import { Divider } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import theme from '../../../theme';
import { useGraphQLSchema } from '../../../hooks/useGraphQLSchema';
import { SchemaDoc } from './schemaDoc';
import { TypeDoc } from './typeDoc';
import { FieldDoc } from './fieldDoc';
import { GraphQLObjectType } from 'graphql/type';

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
  height: 100%;
  overflow: auto;
  padding: 0 10px 10px 15px;
`;

const ExplorerTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

interface ExplorerProps {
  endpoint: string;
}

export const Explorer = ({ endpoint }: ExplorerProps) => {
  const schema = useGraphQLSchema(endpoint);

  // examples
  const objectType = schema?.getType('Film') as GraphQLObjectType | null;
  const fieldMap = objectType
    ? Object.entries(objectType.getFields()).find(([, field]) => field.name === 'speciesConnection')
    : null;
  const field = fieldMap ? fieldMap[1] : null;

  return (
    <ExplorerWrapper>
      <ExplorerContent>
        <ExplorerTitle>Documentation Explorer</ExplorerTitle>
        <Divider />
        {schema && <SchemaDoc schema={schema} />}
        <br />
        {schema && objectType && <TypeDoc schema={schema} type={objectType} />}
        <br />
        {field && <FieldDoc field={field} />}
      </ExplorerContent>
    </ExplorerWrapper>
  );
};

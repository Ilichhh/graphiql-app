import React from 'react';
import { GraphQLField } from 'graphql/type';
import { ReturnType } from './components/returnType';
import { TitleBar } from './components/titleBar';
import { Args } from './components/args';
import styled from 'styled-components';
import { Markdown } from './components/markdown';

interface FieldProps<T, V> {
  field: GraphQLField<T, V>;
}

const Type = <T, V>({ field: { type } }: FieldProps<T, V>) => (
  <div>
    <TitleBar title="Type" />
    <ReturnType type={type} />
  </div>
);

const FieldArgs = <T, V>({ field: { args } }: FieldProps<T, V>) => {
  if (!args || !args.length) {
    return null;
  }

  return (
    <>
      <TitleBar title="Arguments" />
      <Args args={args} />
    </>
  );
};

const Description = <T, V>({ type }: { type: GraphQLField<T, V> }) => {
  if (!type.description) {
    return null;
  }

  return (
    <div>
      <TitleBar title="Description" />
      <Markdown content={type.description} />
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const FieldDoc = <T, V>({ field }: FieldProps<T, V>) => {
  return (
    <Wrapper>
      <Description type={field} />
      <Type field={field} />
      <FieldArgs field={field} />
    </Wrapper>
  );
};

import React from 'react';
import { GraphQLField } from 'graphql/type';
import { ReturnType } from './components/returnType';
import { TitleBar } from './components/titleBar';
import { Args } from './components/args';
import styled from 'styled-components';

interface FieldProps<T, V> {
  field: GraphQLField<T, V>;
}

const Type = <T, V>({ field: { type } }: FieldProps<T, V>) => (
  <>
    <TitleBar title="Type" />
    <ReturnType type={type} />
  </>
);

const FieldArgs = <T, V>({ field: { args } }: FieldProps<T, V>) => {
  if (!args.length) {
    return null;
  }

  return (
    <>
      <TitleBar title="Arguments" />
      <Args args={args} />
    </>
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
      <Type field={field} />
      <FieldArgs field={field} />
    </Wrapper>
  );
};

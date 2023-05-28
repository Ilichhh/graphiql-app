import React from 'react';
import { GraphQLField, GraphQLInputField } from 'graphql/type';
import { ReturnType } from './components/ReturnType';
import { TitleBar } from './components/TitleBar';
import { Args } from './components/Args';
import styled from 'styled-components';
import { Markdown } from './components/Markdown';

interface FieldProps<T, V> {
  field: GraphQLField<T, V> | GraphQLInputField;
}

const Type = <T, V>({ field: { type } }: FieldProps<T, V>) => (
  <div>
    <TitleBar title="Type" />
    <ReturnType type={type} />
  </div>
);

const FieldArgs = <T, V>({ field }: FieldProps<T, V>) => {
  if (!('args' in field) || !field.args.length) {
    return null;
  }

  return (
    <>
      <TitleBar title="Arguments" />
      <Args args={field.args} />
    </>
  );
};

const Description = <T, V>({ type }: { type: GraphQLField<T, V> | GraphQLInputField }) => {
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

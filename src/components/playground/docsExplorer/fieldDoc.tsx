/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { GraphQLField } from 'graphql/type';
import { ReturnType } from './components/returnType';
import { TitleBar } from './components/titleBar';
import { Args } from './components/args';

interface FieldProps {
  field: GraphQLField<any, any>;
}

const Type = ({ field: { type } }: FieldProps) => (
  <>
    <TitleBar title="Type" />
    <ReturnType type={type} />
  </>
);

const FieldArgs = ({ field: { args } }: FieldProps) => {
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

export const FieldDoc = ({ field }: FieldProps) => {
  return (
    <>
      <Type field={field} />
      <FieldArgs field={field} />
    </>
  );
};

import React from 'react';
import { Args } from './args';
import { ReturnType } from './returnType';
import { GraphQLField } from 'graphql/type';

interface FieldProps {
  field: GraphQLField<unknown, unknown>;
}

export const Field = ({ field: { name, type, args } }: FieldProps) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      {name}
      {!!args.length && <Args args={args} isFieldContext={true} />}: <ReturnType type={type} />
    </div>
  );
};

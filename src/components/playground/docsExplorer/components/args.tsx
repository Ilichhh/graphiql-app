import React from 'react';
import { GraphQLArgument } from 'graphql/type';
import { ReturnType } from './returnType';

interface FieldArgsProps {
  args: readonly GraphQLArgument[];
  isFieldContext: boolean;
}

export const Args = ({ args, isFieldContext }: FieldArgsProps) => {
  if (!args.length) {
    return <></>;
  }

  return (
    <>
      {isFieldContext && <>(</>}
      <div style={{ padding: '0 10px' }}>
        {args.map(({ name, type }) => (
          <div key={name}>
            {name}: <ReturnType type={type} />
          </div>
        ))}
      </div>
      {isFieldContext && <>)</>}
    </>
  );
};

Args.defaultProps = {
  isFieldContext: false,
};

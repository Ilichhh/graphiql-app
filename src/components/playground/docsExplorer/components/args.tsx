import React from 'react';
import { GraphQLArgument } from 'graphql/type';
import { Arg } from './arg';

interface FieldArgsProps {
  args: readonly GraphQLArgument[];
  short?: boolean;
}

export const Args = ({ args, short }: FieldArgsProps) => {
  if (!args.length) {
    return <></>;
  }

  if (short) {
    return (
      <>
        {args
          .map<React.ReactNode>((arg) => <Arg key={arg.name} arg={arg} short />)
          .reduce((prev, curr) => [prev, ', ', curr])}
      </>
    );
  }

  return (
    <div>
      {args.map((arg) => (
        <Arg key={arg.name} arg={arg} />
      ))}
    </div>
  );
};

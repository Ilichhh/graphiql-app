import React from 'react';
import { GraphQLArgument } from 'graphql/type';
import { ReturnType } from './returnType';
import theme from '../../../../theme';
import styled from 'styled-components';

interface FieldArgsProps {
  args: readonly GraphQLArgument[];
}

const Name = styled.span`
  color: ${theme.docs.args};
`;
export const Args = ({ args }: FieldArgsProps) => {
  if (!args.length) {
    return <></>;
  }

  return (
    <>
      {args.map(({ name, type }) => (
        <div key={name}>
          <Name>{name}</Name>: <ReturnType type={type} />
        </div>
      ))}
    </>
  );
};

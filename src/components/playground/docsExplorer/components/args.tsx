import React from 'react';
import { GraphQLArgument } from 'graphql/type';
import { ReturnType } from './returnType';
import theme from '../../../../theme';
import styled from 'styled-components';
import { DefaultValue } from './defaultValue';
import { Deprecated } from './depricated';
import { InlineDescription } from './inlineDescription';

interface FieldArgsProps {
  args: readonly GraphQLArgument[];
}

const Name = styled.span`
  color: ${theme.docs.args};
  padding-bottom: 10px;
`;
export const Args = ({ args }: FieldArgsProps) => {
  if (!args.length) {
    return <></>;
  }

  return (
    <div>
      {args.map((arg) => (
        <div key={arg.name}>
          <Deprecated reason={arg.deprecationReason} />
          <Name>{arg.name}</Name>
          <DefaultValue arg={arg} />: <ReturnType type={arg.type} />
          <InlineDescription description={arg.description} />
        </div>
      ))}
    </div>
  );
};

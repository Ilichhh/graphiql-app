import React from 'react';
import { GraphQLArgument } from 'graphql/type';
import { ReturnType } from './ReturnType';
import theme from '../../../../theme';
import styled from 'styled-components';
import { DefaultValue } from './DefaultValue';
import { Deprecated } from './Depricated';
import { InlineDescription } from './InlineDescription';

interface FieldArgsProps {
  arg: GraphQLArgument;
  short?: boolean;
}

const Name = styled.span`
  color: ${theme.docs.args};
  padding-bottom: 10px;
`;
export const Arg = ({ arg, short = false }: FieldArgsProps) => {
  if (short) {
    return (
      <>
        <Name>{arg.name}</Name>: <ReturnType type={arg.type} />
      </>
    );
  }

  return (
    <div>
      <Deprecated reason={arg.deprecationReason} />
      <Name>{arg.name}</Name>
      <DefaultValue arg={arg} />: <ReturnType type={arg.type} />
      <InlineDescription description={arg.description} />
    </div>
  );
};

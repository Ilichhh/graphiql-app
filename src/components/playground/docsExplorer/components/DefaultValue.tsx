import { GraphQLArgument } from 'graphql/type';
import React from 'react';
import styled from 'styled-components';
import theme from '../../../../theme';
import { print } from 'graphql/language';
import { astFromValue } from 'graphql/utilities';

interface DefaultValueProps {
  arg: GraphQLArgument;
}

const DefValue = styled.span`
  color: ${theme.docs.default};
  padding-right: 2px;
`;
export const DefaultValue = ({ arg }: DefaultValueProps) => {
  if (!arg.defaultValue) {
    return <></>;
  }
  const ast = astFromValue(arg.defaultValue, arg.type);
  if (!ast) {
    return <></>;
  }

  return <DefValue> = {print(ast)}</DefValue>;
};

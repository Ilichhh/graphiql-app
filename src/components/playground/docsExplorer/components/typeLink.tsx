import { GraphQLType, isNamedType } from 'graphql/type';
import React from 'react';
import styled from 'styled-components';
import theme from '../../../../theme';

interface TypeLinkProps {
  type: GraphQLType;
}

const Link = styled.span`
  color: ${theme.docs.type};
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
export const TypeLink = ({ type }: TypeLinkProps) => {
  if (!isNamedType(type)) {
    return null;
  }

  return <Link>{type.name}</Link>;
};

import { GraphQLType, isNamedType } from 'graphql/type';
import React, { useContext } from 'react';
import styled from 'styled-components';
import theme from '../../../../theme';
import { DocsNavContext } from '../docsContext';

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
  const { push } = useContext(DocsNavContext);

  if (!isNamedType(type)) {
    return null;
  }
  const pushItem = () => {
    push({
      name: type.name,
      data: type,
    });
  };

  return <Link onClick={pushItem}>{type.name}</Link>;
};

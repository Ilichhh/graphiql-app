import React from 'react';
import { GraphQLType, isListType, isNonNullType } from 'graphql/type';
import { TypeLink } from './TypeLink';

interface ReturnTypeProps {
  type: GraphQLType;
}

export const ReturnType = ({ type }: ReturnTypeProps) => {
  if (isListType(type)) {
    return (
      <>
        [<ReturnType type={type.ofType} />]
      </>
    );
  }

  if (isNonNullType(type)) {
    return (
      <>
        <ReturnType type={type.ofType} />!
      </>
    );
  }

  return <TypeLink type={type} />;
};

import React from 'react';
import { GraphQLType, isListType, isNonNullType } from 'graphql/type';

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

  return <a href="#">{type.name}</a>;
};

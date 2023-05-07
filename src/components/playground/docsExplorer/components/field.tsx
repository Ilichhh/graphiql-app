import React from 'react';
import { Args } from './args';
import { ReturnType } from './returnType';
import { GraphQLField } from 'graphql/type';
import styled from 'styled-components';
import theme from '../../../../theme';

const Content = styled.div`
  margin-bottom: 10px;
`;

const FieldLink = styled.span`
  color: ${theme.docs.field};
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ArgsWrapper = styled.div`
  margin-left: 10px;
  padding: 2px 0;
`;
interface FieldProps {
  field: GraphQLField<unknown, unknown>;
}

export const Field = ({ field: { name, type, args } }: FieldProps) => {
  return (
    <Content>
      <FieldLink>{name}</FieldLink>
      {!!args.length && (
        <>
          <>(</>
          <ArgsWrapper>
            <Args args={args} />
          </ArgsWrapper>
          <>)</>
        </>
      )}
      : <ReturnType type={type} />
    </Content>
  );
};

import React, { useContext } from 'react';
import { Args } from './args';
import { ReturnType } from './returnType';
import { GraphQLField } from 'graphql/type';
import styled from 'styled-components';
import theme from '../../../../theme';
import { DocsNavContext } from '../docsContext';

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

export const Field = ({ field, field: { name, type, args } }: FieldProps) => {
  const { push } = useContext(DocsNavContext);

  const pushItem = () => {
    push({
      name,
      data: field,
    });
  };

  return (
    <Content>
      <FieldLink onClick={pushItem}>{name}</FieldLink>
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

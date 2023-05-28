import React, { useContext } from 'react';
import { Args } from './Args';
import { ReturnType } from './ReturnType';
import { GraphQLField, GraphQLInputField } from 'graphql/type';
import styled from 'styled-components';
import theme from '../../../../theme';
import { DocsNavContext } from '../docsContext';
import { Deprecated } from './Depricated';

const Content = styled.div<{ short: boolean; hasArgs: boolean }>`
  display: ${({ short }) => (short ? 'inline-block' : 'block')};
  margin-bottom: ${({ hasArgs }) => (hasArgs ? '20px' : '3px')};
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
  field: GraphQLField<unknown, unknown> | GraphQLInputField;
  short?: boolean;
}

export const Field = ({ field, field: { name, type }, short = false }: FieldProps) => {
  const { push } = useContext(DocsNavContext);

  const pushItem = () => {
    push({
      name,
      data: field,
    });
  };

  if (short) {
    return (
      <Content short={short} hasArgs={false}>
        <FieldLink onClick={pushItem}>{name}</FieldLink>
      </Content>
    );
  }

  const args = 'args' in field ? field.args : [];
  const hasArgs = !!args.length;

  return (
    <Content short={false} hasArgs={hasArgs}>
      <Deprecated reason={field.deprecationReason} />
      <FieldLink onClick={pushItem}>{name}</FieldLink>
      {hasArgs && (
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

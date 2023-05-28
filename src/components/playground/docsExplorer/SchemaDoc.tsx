import React from 'react';
import { GraphQLSchema } from 'graphql/type';
import { TitleBar } from './components/TitleBar';
import { ReturnType } from './components/ReturnType';
import styled from 'styled-components';
import theme from '../../../theme';

const Field = styled.span`
  color: ${theme.docs.field};
`;

interface SchemaTypeProps {
  schema: GraphQLSchema;
}

export const SchemaDoc = ({ schema }: SchemaTypeProps) => {
  const query = schema.getQueryType();
  const mutation = schema.getMutationType();
  const subscription = schema.getSubscriptionType();

  return (
    <>
      <TitleBar title="Root types" />
      {query && (
        <div>
          <Field>query</Field>: <ReturnType type={query} />
        </div>
      )}
      {mutation && (
        <div>
          <Field>mutation</Field>: <ReturnType type={mutation} />
        </div>
      )}
      {subscription && (
        <div>
          <Field>subscription</Field>: <ReturnType type={subscription} />
        </div>
      )}
    </>
  );
};

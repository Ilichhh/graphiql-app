import React from 'react';
import { GraphQLSchema } from 'graphql/type';
import { TitleBar } from './components/titleBar';

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
          query: <a href="#">{query.name}</a>
        </div>
      )}
      {mutation && (
        <div>
          mutation: <a href="#">{mutation.name}</a>
        </div>
      )}
      {subscription && (
        <div>
          subscription: <a href="#">{subscription.name}</a>
        </div>
      )}
    </>
  );
};

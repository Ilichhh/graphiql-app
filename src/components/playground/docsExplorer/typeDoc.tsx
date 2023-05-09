import React from 'react';
import {
  GraphQLNamedType,
  GraphQLSchema,
  GraphQLType,
  isAbstractType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isNamedType,
  isObjectType,
} from 'graphql/type';
import { ReturnType } from './components/returnType';
import { Field } from './components/field';
import { TitleBar } from './components/titleBar';
import styled from 'styled-components';
import { Deprecated } from './components/depricated';
import { InlineDescription } from './components/inlineDescription';
import { Markdown } from './components/markdown';

interface TypeProps {
  type: GraphQLType;
}

interface TypeWithSchemaProps extends TypeProps {
  schema: GraphQLSchema;
}

const Description = ({ type }: { type: GraphQLNamedType }) => {
  if (!type.description) {
    return null;
  }

  return (
    <div>
      <TitleBar title="Description" />
      <Markdown content={type.description} />
    </div>
  );
};

const Implements = ({ type }: TypeProps) => {
  if (!isObjectType(type) || !type.getInterfaces().length) {
    return null;
  }

  return (
    <div>
      <TitleBar title="Implements" />
      {type.getInterfaces().map((type) => (
        <div key={type.name} style={{ marginBottom: '10px' }}>
          <ReturnType type={type} />
        </div>
      ))}
    </div>
  );
};

const Fields = ({ type }: TypeProps) => {
  if (!isObjectType(type) && !isInterfaceType(type) && !isInputObjectType(type)) {
    return null;
  }

  return (
    <div>
      <TitleBar title="Fields" />
      {Object.entries(type.getFields()).map(([, field]) => {
        return <Field key={field.name} field={field} />;
      })}
    </div>
  );
};

const EnumValues = ({ type }: TypeProps) => {
  if (!isEnumType(type)) {
    return null;
  }

  return (
    <div>
      <TitleBar title="Values" />
      {type.getValues().map(({ name, description, deprecationReason }) => (
        <div key={name} style={{ marginBottom: '10px' }}>
          <Deprecated reason={deprecationReason} />
          {name}
          <InlineDescription description={description} />
        </div>
      ))}
    </div>
  );
};

const ImplementedBy = ({ schema, type }: TypeWithSchemaProps) => {
  if (!isAbstractType(type)) {
    return null;
  }

  return (
    <div>
      <TitleBar title="Implemented by" />
      {schema.getPossibleTypes(type).map((type) => (
        <div key={type.name} style={{ marginBottom: '10px' }}>
          <ReturnType type={type} />
        </div>
      ))}
    </div>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const TypeDoc = ({ schema, type }: TypeWithSchemaProps) => {
  if (!isNamedType(type)) {
    return null;
  }

  return (
    <Content>
      <Description type={type} />
      <Implements type={type} />
      <Fields type={type} />
      <EnumValues type={type} />
      <ImplementedBy schema={schema} type={type} />
    </Content>
  );
};

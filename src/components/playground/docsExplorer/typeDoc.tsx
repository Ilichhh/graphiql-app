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
      {type.description}
    </div>
  );
};

const Implements = ({ type }: TypeProps) => {
  if (!isObjectType(type)) {
    return null;
  }

  return (
    <div>
      <TitleBar title="Implements" />
      {type.getInterfaces().map((type) => (
        <div key={type.name}>
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
      {type.getValues().map(({ name, description }) => (
        <div key={name} style={{ marginBottom: '5px' }}>
          {name}
          <br />
          {description}
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
        <div key={type.name}>
          <ReturnType type={type} />
        </div>
      ))}
    </div>
  );
};

export const TypeDoc = ({ schema, type }: TypeWithSchemaProps) => {
  if (!isNamedType(type)) {
    return null;
  }

  return (
    <>
      <Description type={type} />
      <Implements type={type} />
      <Fields type={type} />
      <EnumValues type={type} />
      <ImplementedBy schema={schema} type={type} />
    </>
  );
};
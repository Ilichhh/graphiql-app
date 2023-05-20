import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import { useTabsState } from '../../../../hooks/useTabsState';
import theme from '../../../../theme';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { TitleBar } from './titleBar';
import { DocsNavContext, StackItem } from '../docsContext';
import {
  GraphQLArgument,
  GraphQLField,
  GraphQLInputField,
  GraphQLNamedType,
  GraphQLSchema,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
  isType,
} from 'graphql/type';
import { Spacer } from './spacer';
import { TypeLink } from './typeLink';
import { Field } from './field';
import { Args } from './args';
import { useGraphQLSchema } from '../../../../hooks/useGraphQLSchema';

const SearchBarWrapper = styled.div`
  display: flex;
  padding: 10px 0;
  position: relative;
`;

const ClearIcon = styled(ClearRoundedIcon)`
  position: absolute;
  right: 0;
  color: ${theme.docs.clear};
  cursor: pointer;

  &:hover {
    color: ${theme.docs.inputBorder};
  }
`;

const SearchField = styled(TextField)({
  '& .MuiInput-underline:before': {
    borderBottomColor: `${theme.docs.inputBorder}`,
  },
  '&& .MuiInput-root:hover::before': {
    borderBottom: `1px solid  ${theme.docs.inputBorder}`,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparent',
  },
  '& .MuiInputBase-input': {
    paddingRight: '30px',
  },
});

type FieldSearch = {
  type: GraphQLNamedType;
  field: GraphQLField<unknown, unknown> | GraphQLInputField;
  args?: GraphQLArgument[];
};

type SearchResults = {
  types: GraphQLNamedType[];
  withinType: FieldSearch[];
  fields: FieldSearch[];
};

const getSearchResults = (schema: GraphQLSchema, stackItem: StackItem, searchValue: string) => {
  const results: SearchResults = {
    types: [],
    fields: [],
    withinType: [],
  };

  const isNameMatch = (name: string, searchVal: string) =>
    name.toLowerCase().includes(searchVal.toLowerCase());

  if (!searchValue) {
    return results;
  }

  const types = schema.getTypeMap();
  const typeNames = Object.keys(types);
  const withinType = isType(stackItem.data) ? stackItem.data : null;

  if (withinType) {
    typeNames.splice(typeNames.indexOf(withinType.name), 1);
    typeNames.unshift(withinType.name);
  }

  for (const typeName of typeNames) {
    const type = types[typeName];

    if (isNameMatch(typeName, searchValue) && withinType !== type) {
      results.types.push(type);
    }

    if (!isObjectType(type) && !isInputObjectType(type) && !isInterfaceType(type)) {
      continue;
    }

    const fields = type.getFields();
    const fieldNames = Object.keys(fields);

    for (const fieldName of fieldNames) {
      const field = fields[fieldName];

      let args: GraphQLArgument[] | undefined;
      if (!isNameMatch(fieldName, searchValue)) {
        if ('args' in field) {
          args = field.args.filter((arg) => isNameMatch(arg.name, searchValue));
          if (args.length === 0) {
            continue;
          }
        } else {
          continue;
        }
      }

      const resultType: keyof SearchResults = withinType === type ? 'withinType' : 'fields';

      results[resultType].push({ type, field, args });
    }
  }

  return results;
};

export const SearchBar = () => {
  const { searchQuery, setSearchQuery, getCurrent } = useContext(DocsNavContext);
  const { endpoint } = useTabsState();
  const { schema } = useGraphQLSchema(endpoint);

  const [searchResults, setSearchResults] = useState<SearchResults>({
    types: [],
    withinType: [],
    fields: [],
  });

  useEffect(() => {
    if (schema) {
      setSearchResults(getSearchResults(schema, getCurrent(), searchQuery));
    }
  }, [schema, getCurrent, searchQuery]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };
  const onSearchClear = (): void => {
    setSearchQuery('');
  };

  const { types, fields, withinType } = searchResults;
  const hasResults = types.length || withinType.length || fields.length;

  return (
    <>
      <SearchBarWrapper>
        <SearchField
          InputProps={{
            startAdornment: (
              <>
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="medium" />
                </InputAdornment>
                {searchQuery && <ClearIcon fontSize="medium" onClick={onSearchClear} />}
              </>
            ),
          }}
          variant="standard"
          placeholder="Search..."
          fullWidth
          value={searchQuery}
          onChange={onSearchChange}
        />
      </SearchBarWrapper>
      {searchQuery && <TitleBar title="Search results" />}
      {!!searchQuery && !hasResults && <>No results</>}

      {withinType.map(({ field, args }, i) => (
        <Spacer key={`w-${i}`}>
          <SearchedField field={field} args={args} />
        </Spacer>
      ))}
      {types.map((type) => (
        <Spacer key={type.name}>
          <TypeLink type={type} />
        </Spacer>
      ))}
      {fields.map(({ type, field, args }, i) => {
        return (
          <Spacer key={`f-${i}`}>
            <TypeLink type={type} />.
            <SearchedField field={field} args={args} />
          </Spacer>
        );
      })}
    </>
  );
};

type FieldProps = {
  field: GraphQLField<unknown, unknown> | GraphQLInputField;
  args?: GraphQLArgument[];
};

function SearchedField({ field, args }: FieldProps) {
  return (
    <>
      <Field field={field} short />
      {args ? (
        <>
          (<Args args={args} short />)
        </>
      ) : null}
    </>
  );
}

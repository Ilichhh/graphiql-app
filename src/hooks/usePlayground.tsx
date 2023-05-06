import { useCallback, useState } from 'react';

import {
  DefinitionNode,
  OperationDefinitionNode,
  GraphQLError,
  VariableDefinitionNode,
} from 'graphql';
import { parse } from 'graphql/language';

export const usePlayground = (
  initialEndpoint: string,
  initialQuery: string,
  initialVariables: string
) => {
  const [endpoint, setEndpoint] = useState(initialEndpoint);
  const [query, setQuery] = useState(initialQuery);
  const [variables, setVariables] = useState(initialVariables);
  const [response, setResponse] = useState('');

  const sendRequest = useCallback(() => {
    // Extract variables definitions from the parsed query
    let variableDefinitions: VariableDefinitionNode[];
    try {
      const parsedQuery = parse(query);
      variableDefinitions = parsedQuery.definitions
        .filter(
          (def: DefinitionNode): def is OperationDefinitionNode =>
            def.kind === 'OperationDefinition'
        )
        .flatMap((def) => def.variableDefinitions || []);
    } catch (error) {
      if (error instanceof GraphQLError) {
        console.log(error);
        return;
      }
      throw error;
    }

    // Parse the variables string into an object
    let parsedVariables: Record<string, unknown> = {};
    try {
      parsedVariables = variables ? JSON.parse(variables) : {};
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.log(error);
        return;
      }
      throw error;
    }

    // Replace the variable reference in the query with its value
    let replacedQuery = query;
    for (const def of variableDefinitions) {
      const variableName = def.variable.name.value;

      replacedQuery = replacedQuery.replace(/(\(|\s)*\$[^\s]+\s*:\s*[^\s]+\s*(\))?/g, '');

      const regex = new RegExp(`\\$${variableName}(?=[^A-Za-z0-9_]|$)`, 'g');
      replacedQuery = replacedQuery.replace(regex, JSON.stringify(parsedVariables[variableName]));
    }
    console.log(replacedQuery);

    // Send request
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ query: replacedQuery }),
    })
      .then((res) => res.json())
      .then((json) => JSON.stringify(json, null, 2))
      .then((str) => setResponse(str))
      .catch((error) => setResponse(error.toString()));
  }, [endpoint, query, variables]);

  return { endpoint, setEndpoint, query, setQuery, variables, setVariables, response, sendRequest };
};

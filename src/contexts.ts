import { createContext } from 'react';
import { useGraphQLSchema } from './hooks/useGraphQLSchema';

const defaultContext = { schema: undefined, isError: false, errorMessage: '' };
const SchemaContext = createContext<ReturnType<typeof useGraphQLSchema>>(defaultContext);

export { SchemaContext };

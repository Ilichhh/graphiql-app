import { createContext } from 'react';
import { useGraphQLSchema } from './hooks/useGraphQLSchema';

const SchemaContext = createContext<ReturnType<typeof useGraphQLSchema>>(undefined);

export { SchemaContext };

import React, { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { GraphQLField, GraphQLInputType, GraphQLNamedType } from 'graphql/type';

type StackItem = {
  name: string;
  data?: GraphQLNamedType | GraphQLInputType | GraphQLField<unknown, unknown>;
};

interface DocsNavContext {
  push: (item: StackItem) => void;
  pop: () => void;
  getCurrent: () => StackItem;
  getPreviousName: () => string;
  isSchemaDoc: boolean;
}

const initStackItems = [
  {
    name: 'Schema',
  },
];
export const DocsNavContext = createContext<DocsNavContext>({
  isSchemaDoc: true,
  push: () => null,
  pop: () => null,
  getCurrent() {
    return initStackItems[0];
  },
  getPreviousName() {
    return initStackItems[0].name;
  },
});

export const DocsNavProvider = ({ children }: { children: ReactNode }) => {
  const [navStack, setNavStack] = useState<StackItem[]>(initStackItems);
  const push = useCallback((item: StackItem) => setNavStack((prev) => [...prev, item]), []);
  const pop = useCallback(
    () => setNavStack((prev) => (prev.length === 1 ? prev : prev.slice(0, -1))),
    []
  );
  const getCurrent = useCallback(() => navStack[navStack.length - 1], [navStack]);
  const getPreviousName = useCallback(() => navStack[navStack.length - 2]?.name, [navStack]);
  const isSchemaDoc = useMemo(() => navStack.length === 1, [navStack]);

  return (
    <DocsNavContext.Provider value={{ push, pop, getCurrent, getPreviousName, isSchemaDoc }}>
      {children}
    </DocsNavContext.Provider>
  );
};

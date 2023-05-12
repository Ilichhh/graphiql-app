import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { GraphQLField, GraphQLInputField, GraphQLNamedType } from 'graphql/type';
import { useAppSelector } from '../../../hooks/reduxTypedHooks';

export type StackItem = {
  name: string;
  data?: GraphQLNamedType | GraphQLField<unknown, unknown> | GraphQLInputField;
};

interface DocsNavContext {
  push: (item: StackItem) => void;
  pop: () => void;
  getCurrent: () => StackItem;
  getPreviousName: () => string;
  isSchemaDoc: boolean;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
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
  searchQuery: '',
  setSearchQuery: () => null,
});

export const DocsNavProvider = ({ children }: { children: ReactNode }) => {
  const [navStack, setNavStack] = useState<StackItem[]>(initStackItems);
  const [searchQuery, setSearchQuery] = useState('');
  const endpoint = useAppSelector((state) => state.endpoint);

  useEffect(() => {
    setNavStack(initStackItems);
  }, [endpoint]);

  useEffect(() => {
    setSearchQuery('');
  }, [navStack]);

  const push = useCallback((item: StackItem) => setNavStack((prev) => [...prev, item]), []);
  const pop = useCallback(
    () => setNavStack((prev) => (prev.length === 1 ? prev : prev.slice(0, -1))),
    []
  );
  const getCurrent = useCallback(() => navStack[navStack.length - 1], [navStack]);
  const getPreviousName = useCallback(() => navStack[navStack.length - 2]?.name, [navStack]);
  const isSchemaDoc = useMemo(() => navStack.length === 1, [navStack]);

  return (
    <DocsNavContext.Provider
      value={{
        push,
        pop,
        getCurrent,
        getPreviousName,
        isSchemaDoc,
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
      }}
    >
      {children}
    </DocsNavContext.Provider>
  );
};

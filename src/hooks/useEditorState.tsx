import { useAppDispatch, useAppSelector } from './reduxTypedHooks';
import { setHeaders, setQuery, setVariables } from '../store/editorSlice';

export const useEditorState = () => {
  const tabId = useAppSelector(({ tabs: { selectedId } }) => selectedId);
  const { queries, variables, headers } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  return {
    query: queries[tabId],
    variables: variables[tabId],
    headers: headers[tabId],
    setQuery: (query: string) => dispatch(setQuery({ tabId, query })),
    setVariables: (variables: string) => dispatch(setVariables({ tabId, variables })),
    setHeaders: (headers: string) => dispatch(setHeaders({ tabId, headers })),
  };
};

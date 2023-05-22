/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './store';
import { addTab } from './tabsSlice';
import { setQuery, setVariables, setHeaders } from './editorSlice';
import { setEndpoint } from './endpointSlice';

import { DocumentData } from '@firebase/firestore';

export const addNewTab = (data: DocumentData, templateId: string) => {
  const { name, endpoint, query, variables, headers } = data;
  return (dispatch: ThunkDispatch<RootState, undefined, any>, getState: () => RootState) => {
    dispatch(addTab({ name, instanceOfTemplate: templateId }));
    const state = getState();
    const tabIdx = state.tabs.selectedIdx;
    dispatch(setEndpoint({ tabIdx, endpoint }));
    dispatch(setQuery({ tabIdx, query }));
    dispatch(setVariables({ tabIdx, variables }));
    dispatch(setHeaders({ tabIdx, headers }));
  };
};

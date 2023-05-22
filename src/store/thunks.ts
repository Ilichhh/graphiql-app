/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './store';
import { addTab } from './tabsSlice';
import { setQuery, setVariables, setHeaders } from './editorSlice';

import { DocumentData } from '@firebase/firestore';

export const addNewTab = ({ name, query, variables, headers }: DocumentData) => {
  return (dispatch: ThunkDispatch<RootState, undefined, any>, getState: () => RootState) => {
    dispatch(addTab(name));
    const state = getState();
    const tabIdx = state.tabs.selectedIdx;
    dispatch(setQuery({ tabIdx, query }));
    dispatch(setVariables({ tabIdx, variables }));
    dispatch(setHeaders({ tabIdx, headers }));
  };
};

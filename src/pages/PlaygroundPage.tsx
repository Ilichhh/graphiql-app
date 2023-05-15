import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePlayground } from '../hooks/usePlayground';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { useGraphQLSchema } from '../hooks/useGraphQLSchema';
import { set } from '../store/endpointSlice';

import { Editor, PlayButton, PlaygroundHeader, ResponseBox } from '../components/playground';
import { Header } from '../components';
import { Modal } from '../components/playground/Modal';

import styled from 'styled-components';
import theme from '../theme';
import { setQuery } from '../store/editorSlice';
import { getDefaultQuery } from '../utils/defaultQuery';

const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${theme.headerHeight});
  width: 100%;
  background: ${theme.colors.bgBlack};
`;

const Playground = styled.div`
  display: flex;
  flex: 1 1 0;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const PlaygroundPage = React.memo(() => {
  const endpoint = useAppSelector((store) => store.endpoint);
  const { isSchemaError } = useGraphQLSchema(endpoint);
  const { response, errorMessage, isFetching, sendRequest } = usePlayground(endpoint);
  const lastEndpoint = localStorage.getItem('last-endpoint');
  const [isModal, setIsModal] = useState(!lastEndpoint);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (lastEndpoint && !endpoint) {
      dispatch(set(lastEndpoint));
      dispatch(setQuery(getDefaultQuery(lastEndpoint)));
    }
  }, [dispatch, endpoint, lastEndpoint, isModal]);

  if (isModal) {
    return ReactDOM.createPortal(<Modal setIsModal={setIsModal} />, document.body);
  }

  return (
    <>
      <Header currentPage="playground" />
      <Wrapper>
        <PlaygroundHeader isError={isSchemaError} />
        <Playground>
          <Editor />
          <PlayButton onClick={sendRequest} />
          <ResponseBox response={isFetching ? 'Loading...' : errorMessage || response} />
        </Playground>
      </Wrapper>
    </>
  );
});

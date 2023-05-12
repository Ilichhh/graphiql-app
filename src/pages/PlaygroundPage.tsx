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
  const { schema, isError, errorMessage } = useGraphQLSchema(endpoint);
  const { response, sendRequest } = usePlayground(endpoint);
  const lastEndpoint = localStorage.getItem('last-endpoint');
  const [isModal, setIsModal] = useState(!lastEndpoint);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lastEndpoint && !endpoint) {
      dispatch(set(lastEndpoint));
    }
  }, [dispatch, endpoint, lastEndpoint, isModal]);

  if (isModal) {
    return ReactDOM.createPortal(<Modal setIsModal={setIsModal} />, document.body);
  }

  return (
    <>
      <Header currentPage="playground" />
      <Wrapper>
        <PlaygroundHeader isError={isError} />
        <Playground>
          <Editor />
          <PlayButton onClick={sendRequest} />
          <ResponseBox response={isError ? errorMessage : response} />
        </Playground>
      </Wrapper>
    </>
  );
});

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { usePlayground } from '../hooks/usePlayground';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { useGraphQLSchema } from '../hooks/useGraphQLSchema';
import { SchemaContext } from '../contexts';
import { set } from '../store/endpointSlice';

import { Editor, PlayButton, PlaygroundHeader, ResponseBox } from '../components/playground';
import { Header } from '../components';
import { Modal } from '../components/Modal';

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

export const PlaygroundPage = () => {
  const endpoint = useAppSelector((store) => store.endpoint);
  const { response, sendRequest } = usePlayground();
  const schema = useGraphQLSchema(endpoint);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const lastEndpoint = localStorage.getItem('last-endpoint');
    if (lastEndpoint) {
      dispatch(set(lastEndpoint));
    }
  }, [dispatch]);

  if (!endpoint) {
    return ReactDOM.createPortal(<Modal />, document.body);
  }

  return (
    <>
      <Header currentPage="playground" />
      <Wrapper>
        <PlaygroundHeader />
        <SchemaContext.Provider value={schema}>
          <Playground>
            <Editor />
            <PlayButton onClick={sendRequest} />
            <ResponseBox response={response} />
          </Playground>
        </SchemaContext.Provider>
      </Wrapper>
    </>
  );
};

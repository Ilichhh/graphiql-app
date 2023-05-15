import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

import { usePlayground } from '../hooks/usePlayground';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { useGraphQLSchema } from '../hooks/useGraphQLSchema';
import { set } from '../store/endpointSlice';

import { Editor, PlaygroundHeader, ResponseBox, Modal } from '../components/playground';
import { Header, Footer, Toast } from '../components';

import styled from 'styled-components';
import theme from '../theme';
import { setQuery } from '../store/editorSlice';
import { getDefaultQuery } from '../utils/defaultQuery';

const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${theme.headerHeight} - ${theme.footerHeight});
  width: 100%;
  background: ${theme.colors.bgBlack};
`;

const Playground = styled.div`
  display: flex;
  flex: 1 1 0;
  padding-left: 10px;
  background: ${theme.colors.bgBlue};
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const PlaygroundPage = React.memo(() => {
  const { t } = useTranslation();

  const endpoint = useAppSelector((store) => store.endpoint);
  const { isSchemaError, schemaErrorMessage } = useGraphQLSchema(endpoint);
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

  const responseText = errorMessage || t(schemaErrorMessage) || response;

  return (
    <>
      <Header currentPage="playground" />
      <Wrapper>
        <PlaygroundHeader isError={isSchemaError} />
        <Playground>
          <Editor isFetching={isFetching} sendRequest={sendRequest} />
          <ResponseBox isFetching={isFetching} response={responseText} />
        </Playground>
        <Toast />
      </Wrapper>
      <Footer />
    </>
  );
});

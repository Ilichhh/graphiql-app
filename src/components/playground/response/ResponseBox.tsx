import React from 'react';
import { useTranslation } from 'react-i18next';

import { ResponseWindow } from '../codemirror';
import { ResponseHeader } from './ResponseHeader';
import CircularProgress from '@mui/material/CircularProgress';
import { ErrorBoundary } from '../../';

import styled from 'styled-components';
import theme from '../../../theme';

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 230px;

  overflow: hidden;
  background: ${theme.colors.bgDarkBlue};
`;

const ResponseSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  padding: 0 50px 20px;
  white-space: pre;
  overflow-y: auto;
  background: ${theme.colors.bgBlue};
  color: ${theme.colors.textGrey};
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.bgDarkBlue};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-corner {
    background-color: ${theme.colors.bgBlue};
  }
  @media (max-width: 1100px) {
    padding: 0 15px 20px;
  }
`;

const ProgressWrapper = styled.div`
  display: flex;
  flex: 1 1 0;
  justify-content: center;
  align-items: center;
`;

const StartMessage = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  display: flex;
  text-align: center;
  font-size: 0.9rem;
  letter-spacing: 0.8px;
  line-height: 24px;
  font-weight: 400;
  color: ${theme.colors.textInactive};
  transform: translate(-50%, -50%);
`;

interface ResponseBoxProps {
  isFetching: boolean;
  response?: string;
  status?: number;
}

export const ResponseBox = ({ isFetching, response, status }: ResponseBoxProps) => {
  const { t } = useTranslation();

  return (
    <Container>
      <ErrorBoundary>
        <ResponseHeader statusCode={status} />
        <ResponseSection>
          {isFetching ? (
            <ProgressWrapper>
              <CircularProgress />
            </ProgressWrapper>
          ) : (
            <>
              <ResponseWindow value={response}></ResponseWindow>
            </>
          )}
        </ResponseSection>
        {!response && !isFetching && (
          <StartMessage>{t('playground.responsePlaceholder')}</StartMessage>
        )}
      </ErrorBoundary>
    </Container>
  );
};

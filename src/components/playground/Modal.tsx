import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { useEndpointInput } from '../../hooks/useEndpointInput';
import { useGraphQLSchema } from '../../hooks/useGraphQLSchema';
import { set } from '../../store/endpointSlice';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';
import { GraphQLIcon } from '../Icons';

import defaultEndpoints from '../../data/defaultEndpoints.json';

import styled from 'styled-components';
import theme from '../../theme';

const Container = styled.div`
  background-color: ${theme.colors.bgBlue};
`;

const ModalWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 48px;
  padding: 48px 16px;
  margin: 0 auto;
  width: 90%;
  max-width: 500px;
  height: 100vh;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ModalHeader = styled.h1`
  margin: 0;
  color: ${theme.colors.textGrey};
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Endpoints = styled.div`
  margin: 0 auto 16px;
  color: ${theme.colors.textInactive};
`;

const EndpointsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const SubmitButton = styled(Button)`
  width: 250px;
  border-radius: 0 !important;
  white-space: nowrap;
`;

export const Modal = () => {
  const { endpoint, inputValue, setInputValue, handleInputChange } = useEndpointInput();
  const { isError } = useGraphQLSchema();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleSubmit = useCallback(() => {
    localStorage.setItem('last-endpoint', endpoint);
  }, [endpoint]);

  const handleSelectEndpoint = useCallback(
    (value: string) => {
      dispatch(set(value));
      setInputValue(value);
    },
    [dispatch, setInputValue]
  );

  return (
    <Container>
      <ModalWrapper onSubmit={handleSubmit}>
        <HeaderWrapper>
          <GraphQLIcon color={theme.colors.textWhite} />
          <ModalHeader>GraphQL Playground</ModalHeader>
        </HeaderWrapper>
        <InputWrapper>
          <TextField
            hiddenLabel
            fullWidth
            value={inputValue}
            inputProps={{
              style: {
                color: isError ? theme.colors.error : theme.colors.textGrey,
              },
            }}
            sx={{
              '& input::placeholder': {
                color: theme.colors.textGrey,
              },
            }}
            id="endpoint"
            type="text"
            placeholder={t(`playground.endpointPlaceholder`) ?? ''}
            variant="filled"
            onChange={handleInputChange}
          />
          {endpoint && !isError && (
            <SubmitButton type="submit" variant="contained" size="large">
              {t(`playground.endpointSubmit`)}
              <EastIcon />
            </SubmitButton>
          )}
        </InputWrapper>
        <EndpointsList>
          <Endpoints>{t(`playground.chooseEndpoint`)}</Endpoints>
          {defaultEndpoints.map((endpoint) => (
            <Button
              key={endpoint}
              disableElevation
              onClick={() => handleSelectEndpoint(endpoint)}
              size="small"
            >
              {endpoint}
            </Button>
          ))}
        </EndpointsList>
      </ModalWrapper>
    </Container>
  );
};

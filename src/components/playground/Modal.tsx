import React, { FormEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useGraphQLSchema, useTabsState, useModalEndpointInput } from '../../hooks';

import EastIcon from '@mui/icons-material/East';
import { Button, Divider, TextField } from '@mui/material';

import styled from 'styled-components';
import theme from '../../theme';
import { getDefaultQuery } from '../../utils/defaultQuery';
import { ENDPOINTS } from '../../constants';

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
  max-width: 600px;
  height: 100vh;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const ModalHeader = styled.h1`
  margin: 0 0 0 30px;
  text-align: center;
  color: ${theme.colors.textGrey};
  @media (max-width: 500px) {
    margin: 0;
    font-size: 26px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Endpoints = styled(Divider)`
  padding-bottom: 22px;
`;

const EndpointsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const DefaultEndpoint = styled(Button)`
  @media (max-width: 500px) {
    && {
      font-size: 12px;
    }
  }
`;

const SubmitButton = styled(Button)`
  width: 250px;
  border-radius: 0 !important;
  white-space: nowrap;
`;

export const Modal = () => {
  const { inputValue, setInputValue, debouncedInput, handleInputChange } = useModalEndpointInput();
  const { addTab } = useTabsState();
  const { isSchemaError } = useGraphQLSchema(debouncedInput);
  const { t } = useTranslation();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSchemaError) return;

      addTab({
        name: '',
        endpoint: debouncedInput,
        query: getDefaultQuery(debouncedInput),
        variables: '',
        headers: '',
      });
    },
    [isSchemaError, addTab, debouncedInput]
  );

  const handleSelectEndpoint = useCallback(
    (value: string) => {
      setInputValue(value);
    },
    [setInputValue]
  );

  return (
    <Container>
      <ModalWrapper onSubmit={handleSubmit}>
        <HeaderWrapper>
          <img src="/logo.png" alt="Profile picture" width="78" height="78" />
          <ModalHeader>GraphQL Playground</ModalHeader>
        </HeaderWrapper>
        <InputWrapper>
          <TextField
            hiddenLabel
            fullWidth
            value={inputValue}
            sx={{
              '& input': {
                color: isSchemaError ? theme.colors.error : theme.colors.textGrey,
              },
            }}
            id="endpoint"
            type="text"
            placeholder={t(`playground.endpointPlaceholder`) ?? ''}
            variant="filled"
            onChange={handleInputChange}
          />
          {debouncedInput && !isSchemaError && (
            <SubmitButton type="submit" variant="contained" size="large" endIcon={<EastIcon />}>
              {t(`playground.endpointSubmit`)}
            </SubmitButton>
          )}
        </InputWrapper>
        <EndpointsList>
          <Endpoints>{t(`playground.chooseEndpoint`)}</Endpoints>
          {ENDPOINTS.map((endpoint) => (
            <DefaultEndpoint
              key={endpoint}
              disableElevation
              onClick={() => handleSelectEndpoint(endpoint)}
              size="small"
            >
              {endpoint}
            </DefaultEndpoint>
          ))}
        </EndpointsList>
      </ModalWrapper>
    </Container>
  );
};

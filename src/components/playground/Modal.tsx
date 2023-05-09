import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { useDebouncedInput } from '../../hooks/useDebouncedInput';
import { set } from '../../store/endpointSlice';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';

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

const ModalHeader = styled.h1`
  margin: 0 auto;
  color: ${theme.colors.textGrey};
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
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
  const endpoint = useAppSelector((state) => state.endpoint);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChangeEndpoint = useCallback(
    (value: string) => {
      dispatch(set(value));
    },
    [dispatch]
  );

  const { handleInputChange } = useDebouncedInput(handleChangeEndpoint, 500);

  const handleSubmit = useCallback(() => {
    localStorage.setItem('last-endpoint', endpoint);
  }, [endpoint]);

  const handleSelectEndpoint = useCallback(
    (value: string) => {
      handleChangeEndpoint(value);
      localStorage.setItem('last-endpoint', value);
    },
    [handleChangeEndpoint]
  );

  return (
    <Container>
      <ModalWrapper onSubmit={handleSubmit}>
        <ModalHeader>GraphQL Playground</ModalHeader>
        <InputWrapper>
          <TextField
            hiddenLabel
            fullWidth
            inputProps={{
              style: {
                color: theme.colors.textGrey,
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
          {endpoint && (
            <SubmitButton type="submit" variant="contained" size="large">
              {t(`playground.endpointSubmit`)}
              <EastIcon />
            </SubmitButton>
          )}
        </InputWrapper>
        <EndpointsList>
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

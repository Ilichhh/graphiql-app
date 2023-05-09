import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { useDebouncedInput } from '../../hooks/useDebouncedInput';
import { set } from '../../store/endpointSlice';

import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import defaultEndpoints from '../../data/defaultEndpoints.json';

const ModalWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  padding: 48px 16px;
  margin: 0 auto;
  width: 90%;
  max-width: 500px;
  height: 100vh;
`;

const ModalHeader = styled.h1`
  margin: 0 auto;
`;

const EndpointsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
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
    <ModalWrapper onSubmit={handleSubmit}>
      <ModalHeader>GraphQL Playground</ModalHeader>
      <TextField
        hiddenLabel
        id="endpoint"
        type="text"
        placeholder={t(`playground.endpointPlaceholder`) ?? ''}
        variant="filled"
        onChange={handleInputChange}
      />
      {endpoint && (
        <Button type="submit" variant="contained" size="large">
          {t(`playground.endpointSubmit`)}
        </Button>
      )}
      <EndpointsList>
        {defaultEndpoints.map((endpoint) => (
          <Button key={endpoint} onClick={() => handleSelectEndpoint(endpoint)} size="small">
            {endpoint}
          </Button>
        ))}
      </EndpointsList>
    </ModalWrapper>
  );
};

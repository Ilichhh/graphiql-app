import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { usePlayground } from '../hooks/usePlayground';
import { useDebouncedInput } from '../hooks/useDebouncedInput';

import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { INITIAL_ENDPOINT_URL, INITIAL_QUERY } from '../constants';

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

export const Modal = () => {
  const { endpoint, setEndpoint } = usePlayground(INITIAL_ENDPOINT_URL, INITIAL_QUERY, '');
  const { t } = useTranslation();

  const handleChangeEndpoint = useCallback(
    (value: string) => {
      setEndpoint(value);
      console.log(value);
    },
    [setEndpoint]
  );

  const { handleInputChange } = useDebouncedInput(handleChangeEndpoint, 500);

  const handleSubmit = useCallback(() => {
    localStorage.setItem('last-endpoint', endpoint);
  }, [endpoint]);

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
    </ModalWrapper>
  );
};

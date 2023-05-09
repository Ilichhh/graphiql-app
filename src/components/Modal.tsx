import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { usePlayground } from '../hooks/usePlayground';

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
  const { setEndpoint } = usePlayground(INITIAL_ENDPOINT_URL, INITIAL_QUERY, '');
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    localStorage.setItem('last-endpoint', data.endpoint);
    setEndpoint(data.endpoint);
  };

  return (
    <ModalWrapper onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader>GraphQL Playground</ModalHeader>
      <TextField
        id="endpoint"
        type="text"
        label={t('playground.endpointPlaceholder')}
        variant="outlined"
        {...register('endpoint', { required: true })}
      />
      <Button type="submit" variant="contained" size="large">
        {t(`playground.endpointSubmit`)}
      </Button>
    </ModalWrapper>
  );
};

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { auth, signUp, signIn } from '../firebase';
import { FormMode } from '../types';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 48px 16px;
  margin: 0 auto;
  width: 90%;
  max-width: 500px;
`;

const FormHeader = styled.h1`
  margin: 0 auto;
`;

interface FormProps {
  mode: FormMode;
}

export const Form = ({ mode }: FormProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (mode === 'register') {
      await signUp(data.email, data.password);
    } else {
      await signIn(data.email, data.password);
    }
    reset();
  };

  useEffect(() => {
    if (user) navigate('/playground');
  }, [user, navigate]);

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>{t(`form.${mode}.header`)}</FormHeader>
      <TextField
        id="email"
        type="email"
        label={t('form.emailInput')}
        variant="outlined"
        {...register('email', { required: true })}
      />
      <TextField
        id={mode === 'login' ? 'current-password' : 'new-password'}
        type="password"
        label={t('form.passwordInput')}
        variant="outlined"
        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        {...register('password', { required: true })}
      />
      {mode === 'register' && (
        <TextField
          id="password-confirm"
          type="password"
          label={t('form.passwordInputConfirm')}
          variant="outlined"
          autoComplete="new-password"
          {...register('password-confirm', { required: true })}
        />
      )}
      <Button type="submit" variant="contained" size="large">
        {t(`form.${mode}.submit`)}
      </Button>
      <Button
        component={Link}
        to={mode === 'login' ? '/register' : '/login'}
        variant="outlined"
        size="large"
      >
        {t(`form.${mode}.redirect`)}
      </Button>
    </FormWrapper>
  );
};

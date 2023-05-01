import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { auth, singUp, singIn } from '../firebase';

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
  mode: 'login' | 'register';
}

export const Form = ({ mode }: FormProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    reset();
    if (mode === 'register') {
      singUp(data.email, data.password);
    } else {
      singIn(data.email, data.password);
    }
  };

  useEffect(() => {
    if (user) navigate('/playground');
  }, [user, navigate]);

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>{t(`form.${mode}.header`)}</FormHeader>
      <TextField
        type="email"
        label={t('form.emailInput')}
        variant="outlined"
        {...register('email', { required: true })}
      />
      <TextField
        type="password"
        label={t('form.passwordInput')}
        variant="outlined"
        {...register('password', { required: true })}
      />
      {mode === 'register' && (
        <TextField
          type="password"
          label={t('form.passwordInputConfirm')}
          variant="outlined"
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

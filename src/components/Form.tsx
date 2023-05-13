import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { auth, signUp, signIn } from '../firebase';
import { FormMode } from '../types';

import styled from 'styled-components';
import theme from '../theme';

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
  color: ${theme.colors.textGrey};
`;

interface FormProps {
  mode: FormMode;
}

export const Form = ({ mode }: FormProps) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const newPassword = watch('newPassword');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (mode === 'register') {
      await signUp(data.email, data.newPassword, setError);
    } else {
      await signIn(data.email, data.currentPassword, setError);
    }
  };

  useEffect(() => {
    if (user) navigate('/playground');
  }, [user, navigate]);

  let passwordInputs;

  if (mode === 'register') {
    passwordInputs = (
      <>
        <TextField
          id="new-password"
          type="password"
          label={t('form.passwordInput')}
          variant="filled"
          autoComplete="new-password"
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message?.toString()}
          {...register('newPassword', {
            required: t('form.emptyPassword') as string,
            pattern: {
              value:
                /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)(?=.*[@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~!])(?!.*\s).{8,}$/,
              message: t('form.simplePassword'),
            },
          })}
        />
        <TextField
          id="password-confirm"
          type="password"
          label={t('form.passwordInputConfirm')}
          variant="filled"
          autoComplete="new-password"
          error={!!errors.passwordConfirm}
          helperText={errors.passwordConfirm?.message?.toString()}
          {...register('passwordConfirm', {
            required: t('form.emptyPasswordConfirm') as string,
            validate: (value) =>
              value === newPassword || (t('form.wrongPasswordConfirm') as string),
          })}
        />
      </>
    );
  } else {
    passwordInputs = (
      <TextField
        id="current-password"
        type="password"
        label={t('form.passwordInput')}
        variant="filled"
        autoComplete="current-password"
        error={!!errors.currentPassword}
        helperText={errors.currentPassword?.message?.toString()}
        {...register('currentPassword', {
          required: t('form.emptyPassword') as string,
        })}
      />
    );
  }

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormHeader>{t(`form.${mode}.header`)}</FormHeader>
      <TextField
        id="email"
        type="email"
        label={t('form.emailInput')}
        variant="filled"
        error={!!errors.email}
        helperText={errors.email?.message?.toString()}
        {...register('email', {
          required: t('form.emptyEmail') as string,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t('form.invalidEmail'),
          },
        })}
      />
      {passwordInputs}
      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {t(`form.${mode}.submit`)}
      </LoadingButton>
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

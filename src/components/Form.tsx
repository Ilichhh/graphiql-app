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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const newPassword = watch('newPassword');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (mode === 'register') {
      await signUp(data.email, data.newPassword);
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
          variant="outlined"
          autoComplete="new-password"
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message?.toString()}
          {...register('newPassword', {
            required: 'Please enter password',
            pattern: {
              value:
                /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)(?=.*[@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~!])(?!.*\s).{8,}$/,
              message:
                'Password must be a minimum of 8 characters and include at least one letter, one digit, and one special character.',
            },
          })}
        />
        <TextField
          id="password-confirm"
          type="password"
          label={t('form.passwordInputConfirm')}
          variant="outlined"
          autoComplete="new-password"
          error={!!errors.passwordConfirm}
          helperText={errors.passwordConfirm?.message?.toString()}
          {...register('passwordConfirm', {
            required: 'Please confirm password',
            validate: (value) => value === newPassword || 'Passwords do not match.',
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
        variant="outlined"
        autoComplete="current-password"
        error={!!errors.currentPassword}
        helperText={errors.currentPassword?.message?.toString()}
        {...register('currentPassword', {
          required: 'Please enter password',
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
        variant="outlined"
        error={!!errors.email}
        helperText={errors.email?.message?.toString()}
        {...register('email', {
          required: 'Please enter email',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address.',
          },
        })}
      />
      {passwordInputs}
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

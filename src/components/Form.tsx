import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import LoadingButton from '@mui/lab/LoadingButton';
import { Divider, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { auth } from '../firebase';
import { signUp, signIn } from '../api/firebaseApi';
import { FormMode } from '../types';

import styled from 'styled-components';
import theme from '../theme';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  padding: 48px 16px;
  margin: 0 auto;
  width: 90%;
  max-width: 500px;
  min-height: calc(100vh - ${theme.headerHeight} - ${theme.footerHeight});
  user-select: none;
`;

const FormHeader = styled.h1`
  margin: 0 auto 10px;
  text-align: center;
  color: ${theme.colors.textGrey};
`;

const CustomLoadingButton = styled(LoadingButton)`
  & .MuiLoadingButton-loading {
    background-color: ${theme.colors.accent};
  }
  & .MuiLoadingButton-loadingIndicator {
    color: ${theme.colors.textGrey};
  }
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
    reset,
  } = useForm();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const newPassword = watch('newPassword');
  const [showPassword, setShowPassword] = useState(false);

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

  useEffect(() => {
    reset();
  }, [mode, reset]);

  let passwordInputs;

  if (mode === 'register') {
    passwordInputs = (
      <>
        <TextField
          id="new-password"
          type={showPassword ? 'text' : 'password'}
          label={t('form.passwordInput')}
          variant="filled"
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          type={showPassword ? 'text' : 'password'}
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
        type={showPassword ? 'text' : 'password'}
        label={t('form.passwordInput')}
        variant="filled"
        autoComplete="current-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
      <CustomLoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {t(`form.${mode}.submit`)}
      </CustomLoadingButton>
      <Divider>{t('form.divider')}</Divider>
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

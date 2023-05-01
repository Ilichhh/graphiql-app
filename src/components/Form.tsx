import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

  return (
    <FormWrapper>
      <FormHeader>{t(mode === 'register' ? 'formHeaderRegister' : 'formHeaderLogin')}</FormHeader>
      <TextField id="email" type="email" label="Enter email" variant="outlined" />
      <TextField id="password" type="password" label="Enter password" variant="outlined" />
      {mode === 'register' && (
        <TextField
          id="password-confirm"
          type="password"
          label="Confirm password"
          variant="outlined"
        />
      )}
      <Button type="submit" variant="contained" size="large">
        Sign Up
      </Button>
      <Button variant="outlined" size="large">
        Sign In
      </Button>
    </FormWrapper>
  );
};

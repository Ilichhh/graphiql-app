import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppSelector } from '../hooks/reduxTypedHooks';

export const Toast = (props: React.ComponentProps<typeof Snackbar>) => {
  const message = useAppSelector((store) => store.error);

  return (
    <Snackbar open={!!message} {...props}>
      <Alert severity="error">{message}</Alert>
    </Snackbar>
  );
};

import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import Slide, { SlideProps } from '@mui/material/Slide';
import { setError } from '../store/errorSlice';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export const Toast = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector((store) => store.error);
  const error = useAppSelector((state) => state.error);

  const handleClose = () => {
    dispatch(setError(''));
  };

  return (
    <Snackbar
      open={!!error}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      TransitionComponent={SlideTransition}
      autoHideDuration={6000}
    >
      <Alert severity="error" variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

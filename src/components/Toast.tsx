import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';
import { useTabStateContext } from '../context/TabStateContext';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export const Toast = () => {
  const { error, setError } = useTabStateContext();

  const handleClose = () => {
    setError('');
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
        {error}
      </Alert>
    </Snackbar>
  );
};

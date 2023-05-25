import React, { useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';
import { useTabsState } from '../../hooks';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export const Toast = () => {
  const { error, setError } = useTabsState();

  const handleClose = useCallback(() => {
    setError('');
  }, [setError]);

  return (
    <Snackbar
      open={!!error}
      onClose={handleClose}
      onClick={handleClose}
      ClickAwayListenerProps={{ mouseEvent: false, touchEvent: false }}
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

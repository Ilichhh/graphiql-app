import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import Slide, { SlideProps } from '@mui/material/Slide';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export const Toast = () => {
  const message = useAppSelector((store) => store.error);
  const error = useAppSelector((state) => state.error);
  const [isOpen, setIsOpen] = useState(!!error);

  console.log(message);

  return (
    <Snackbar
      open={isOpen}
      onClose={() => setIsOpen(false)}
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

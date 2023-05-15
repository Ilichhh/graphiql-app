import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import Slide, { SlideProps } from '@mui/material/Slide';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export const Toast = (props: React.ComponentProps<typeof Snackbar>) => {
  const message = useAppSelector((store) => store.error);
  const [isOpen, setIsOpen] = useState(!!message);

  useEffect(() => {
    setIsOpen(!!message);

    return () => {
      setIsOpen(false);
    };
  }, [message]);

  return (
    <Snackbar
      open={isOpen}
      onClose={() => setIsOpen(false)}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      TransitionComponent={SlideTransition}
      autoHideDuration={6000}
      {...props}
    >
      <Alert severity="error" variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

import React, { useCallback } from 'react';
import { useAppSelector } from '../../../hooks/reduxTypedHooks';
import { saveQeryTemplate } from '../../../api/firebaseApi';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface SaveQueryModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SaveQueryModal = ({ isOpen, setIsOpen }: SaveQueryModalProps) => {
  const { query } = useAppSelector((state) => state.editor);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSaveQueryTemplate = useCallback(() => {
    handleClose();
    saveQeryTemplate({ name: 'test name', query });
  }, [query, handleClose]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        <Button onClick={handleSaveQueryTemplate}>Save</Button>
      </Box>
    </Modal>
  );
};

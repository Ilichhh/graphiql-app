import React, { useState, useCallback, ChangeEvent } from 'react';
import { useAppSelector } from '../../../hooks/reduxTypedHooks';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '../../../hooks/useSidebar';

import { Box, Button, Modal, TextField } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../../muiTheme';
import theme from '../../../theme';
import styled from 'styled-components';

const Container = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  background-color: ${theme.colors.bgLight};
  border-radius: 10px;
  transform: translate(-50%, -50%);
`;

const Header = styled.h2`
  margin: 0;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
`;

interface SaveQueryModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SaveQueryModal = ({ open, setOpen }: SaveQueryModalProps) => {
  const { query, variables, headers } = useAppSelector((state) => state.editor);
  const endpoint = useAppSelector((state) => state.endpoint);
  const { saveTemplate } = useSidebar();
  const [name, setName] = useState('');
  const { t } = useTranslation();

  const handleClose = useCallback(() => {
    setOpen(false);
    setName('');
  }, [setOpen]);

  const handleChenge = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleSaveQueryTemplate = useCallback(() => {
    handleClose();
    saveTemplate({ name, endpoint, query, variables, headers });
  }, [name, endpoint, query, variables, headers, handleClose, saveTemplate]);

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal open={open} onClose={handleClose}>
        <Container>
          <Header>{t('playground.saveQuery')}</Header>
          <TextField
            fullWidth
            label={t('playground.queryName')}
            variant="outlined"
            value={name}
            onChange={handleChenge}
          />
          <Buttons>
            <Button variant="outlined" onClick={handleClose}>
              {t('playground.cancel')}
            </Button>
            <Button variant="contained" disabled={!name} onClick={handleSaveQueryTemplate}>
              {t('playground.save')}
            </Button>
          </Buttons>
        </Container>
      </Modal>
    </ThemeProvider>
  );
};

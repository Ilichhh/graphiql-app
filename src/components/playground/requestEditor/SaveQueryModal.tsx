import React, { ChangeEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { saveQeryTemplate } from '../../../api/firebaseApi';

import { Box, Button, Modal, TextField } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../../muiTheme';
import theme from '../../../theme';
import styled from 'styled-components';
import { useEditorState } from '../../../hooks/useEditorState';

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
  const { query, variables, headers } = useEditorState();
  const [name, setName] = useState('');
  const { t } = useTranslation();

  const handleClose = useCallback(() => {
    setOpen(false);
    setName('');
  }, [setOpen]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleSaveQueryTemplate = useCallback(() => {
    handleClose();
    saveQeryTemplate({ name, query, variables, headers });
  }, [name, query, variables, headers, handleClose]);

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
            onChange={handleChange}
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

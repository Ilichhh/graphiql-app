import React, { ChangeEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '../../../hooks/useSidebar';

import { Box, Button, Modal, TextField } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';
import { useTabsState } from '../../../hooks/useTabsState';
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
  mode: 'save' | 'rename';
  templateId?: string;
}

export const QueryTemplateModal = ({ open, setOpen, mode, templateId }: SaveQueryModalProps) => {
  const { endpoint, query, variables, headers } = useTabsState();
  const { saveTemplate, renameTemplate } = useSidebar();
  const [name, setName] = useState('');
  const { t } = useTranslation();

  const handleClose = useCallback(() => {
    setOpen(false);
    setName('');
  }, [setOpen]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    handleClose();
    if (mode === 'save') {
      saveTemplate({ name, endpoint, query, variables, headers });
    }
    if (mode === 'rename' && templateId) {
      renameTemplate(templateId, name);
    }
  }, [
    handleClose,
    mode,
    saveTemplate,
    name,
    endpoint,
    query,
    variables,
    headers,
    renameTemplate,
    templateId,
  ]);

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
            <Button variant="contained" disabled={!name} onClick={handleSubmit}>
              {t('playground.save')}
            </Button>
          </Buttons>
        </Container>
      </Modal>
    </ThemeProvider>
  );
};

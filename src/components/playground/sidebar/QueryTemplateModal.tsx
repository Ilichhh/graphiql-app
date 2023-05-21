import React, { ChangeEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '../../../hooks/useSidebar';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import { Button, Modal, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { ThemeProvider } from '@mui/material/styles';
import { useTabsState } from '../../../hooks/useTabsState';
import { lightTheme } from '../../../muiTheme';
import theme from '../../../theme';
import styled from 'styled-components';

const Container = styled.form`
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
  prevName: string;
}

export const QueryTemplateModal = React.memo(
  ({ open, setOpen, mode, templateId, prevName }: SaveQueryModalProps) => {
    const { endpoint, query, variables, headers } = useTabsState();
    const { saveTemplate, renameTemplate } = useSidebar();
    const [newName, setNewName] = useState(prevName || '');
    const { t } = useTranslation();
    const {
      register,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm();

    const handleClose = useCallback(() => {
      setOpen(false);
    }, [setOpen]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setNewName(e.target.value);
    }, []);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      if (mode === 'save') {
        await saveTemplate({ name: data.newName, endpoint, query, variables, headers });
      }
      if (mode === 'rename' && templateId) {
        await renameTemplate(templateId, data.newName);
      }
      handleClose();
    };

    return (
      <ThemeProvider theme={lightTheme}>
        <Modal open={open} onClose={handleClose}>
          <Container onSubmit={handleSubmit(onSubmit)}>
            <Header>
              {t(mode === 'save' ? 'playground.saveQuery' : 'playground.renameQuery')}
            </Header>
            <TextField
              fullWidth
              label={t('playground.queryName')}
              variant="outlined"
              {...register('newName', { required: true })}
              value={newName}
              onChange={handleChange}
            />
            <Buttons>
              <Button variant="outlined" onClick={handleClose}>
                {t('playground.cancel')}
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                disabled={!newName}
                loading={isSubmitting}
              >
                {t('playground.save')}
              </LoadingButton>
            </Buttons>
          </Container>
        </Modal>
      </ThemeProvider>
    );
  }
);

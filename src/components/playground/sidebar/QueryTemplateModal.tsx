import React, { ChangeEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '../../../hooks/useSidebar';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useTabsState } from '../../../hooks/useTabsState';

import { Button, Modal, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { TemplateModalMode } from '../../../types';

import { ThemeProvider } from '@mui/material/styles';
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

const Subheader = styled.p`
  margin: 0;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
`;

interface QueryTemplateModalProps {
  setOpen: React.Dispatch<React.SetStateAction<TemplateModalMode | null>>;
  mode: TemplateModalMode;
  templateId?: string;
  prevName: string;
}

export const QueryTemplateModal = React.memo(
  ({ setOpen, mode, templateId, prevName }: QueryTemplateModalProps) => {
    const { endpoint, query, variables, headers } = useTabsState();
    const { saveTemplate, renameTemplate, deleteTemplate } = useSidebar();
    const [newName, setNewName] = useState(prevName || '');
    const { t } = useTranslation();
    const {
      register,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm();

    const handleClose = useCallback(() => {
      setOpen(null);
    }, [setOpen]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setNewName(e.target.value);
    }, []);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      if (mode === 'save') {
        console.log('saving');
        await saveTemplate({ name: data.newName, endpoint, query, variables, headers });
      }
      if (mode === 'rename' && templateId) {
        await renameTemplate(templateId, data.newName);
      }
      if (mode === 'delete' && templateId) {
        await deleteTemplate(templateId);
      }
      handleClose();
    };

    return (
      <ThemeProvider theme={lightTheme}>
        <Modal open={!!mode} onClose={handleClose}>
          <Container onSubmit={handleSubmit(onSubmit)}>
            <Header>{t(`playground.modal.${mode}.header`)}</Header>
            {mode === 'delete' ? (
              <Subheader>{t(`playground.modal.${mode}.title`, { name: prevName })}</Subheader>
            ) : (
              <TextField
                fullWidth
                label={t(`playground.modal.${mode}.title`)}
                variant="outlined"
                {...register('newName', { required: true })}
                value={newName}
                onChange={handleChange}
              />
            )}
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
                {t(`playground.modal.${mode}.submit`)}
              </LoadingButton>
            </Buttons>
          </Container>
        </Modal>
      </ThemeProvider>
    );
  }
);

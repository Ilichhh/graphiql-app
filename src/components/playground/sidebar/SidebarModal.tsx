import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useSidebar, useTabsState } from '../../../hooks';

import { Button, Modal, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { SidebarModalMode } from '../../../types';

import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../../muiTheme';
import theme from '../../../theme';
import styled from 'styled-components';

const Container = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 400px;
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

interface SidebarModalProps {
  setMode: React.Dispatch<React.SetStateAction<SidebarModalMode | null>>;
  mode: SidebarModalMode;
  templateId?: string;
  prevName?: string;
}

export const SidebarModal = React.memo(
  ({ setMode, mode, templateId, prevName }: SidebarModalProps) => {
    const { endpoint, query, variables, headers } = useTabsState();
    const { saveTemplate, renameTemplate, deleteTemplate, clearRunHistory } = useSidebar();
    const { t } = useTranslation();
    const {
      register,
      handleSubmit,
      formState: { isSubmitting },
      watch,
    } = useForm();

    const newName = watch('newName');

    const handleClose = useCallback(() => {
      setMode(null);
    }, [setMode]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      if (mode === 'save') {
        await saveTemplate({ name: data.newName, endpoint, query, variables, headers });
      }
      if (mode === 'rename' && templateId) {
        await renameTemplate(templateId, data.newName);
      }
      if (mode === 'delete' && templateId) {
        await deleteTemplate(templateId);
      }
      if (mode === 'clearHistory') {
        await clearRunHistory();
      }
      handleClose();
    };

    let content;
    if (mode === 'delete') {
      content = <Subheader>{t(`playground.modal.${mode}.title`, { name: prevName })}</Subheader>;
    } else if (mode === 'clearHistory') {
      content = <Subheader>{t(`playground.modal.${mode}.title`)}</Subheader>;
    } else {
      content = (
        <TextField
          fullWidth
          autoFocus
          label={t(`playground.modal.${mode}.title`)}
          variant="outlined"
          defaultValue={prevName}
          {...register('newName', { required: true })}
        />
      );
    }

    return (
      <ThemeProvider theme={lightTheme}>
        <Modal open={!!mode} onClose={handleClose}>
          <Container onSubmit={handleSubmit(onSubmit)}>
            <Header>{t(`playground.modal.${mode}.header`)}</Header>
            {content}
            <Buttons>
              <Button variant="outlined" onClick={handleClose}>
                {t('playground.cancel')}
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                disabled={!newName && !prevName && mode !== 'clearHistory'}
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

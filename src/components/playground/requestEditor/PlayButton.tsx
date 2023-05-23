import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '../../../hooks/useSidebar';
import { useTabsState } from '../../../hooks/useTabsState';

import { Button, CircularProgress } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

import theme from '../../../theme';

interface PlayButtonProps {
  isFetching: boolean;
  sendRequest: () => void;
}

export const PlayButton = ({ isFetching, sendRequest }: PlayButtonProps) => {
  const { query, variables, headers, endpoint, name, instanceOfTemplate } = useTabsState();
  const { saveQueryRun } = useSidebar();
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    sendRequest();
    const data = { query, variables, headers, endpoint, name };
    if (instanceOfTemplate) {
      saveQueryRun({ ...data, instanceOfTemplate });
    } else {
      saveQueryRun(data);
    }
  }, [sendRequest, saveQueryRun, query, variables, headers, endpoint, name, instanceOfTemplate]);

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      size="medium"
      startIcon={
        isFetching ? (
          <CircularProgress sx={{ color: theme.colors.textGrey }} size={20} />
        ) : (
          <PlayArrowRoundedIcon />
        )
      }
    >
      {t('playground.playBtn')}
    </Button>
  );
};

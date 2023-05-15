import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, CircularProgress } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

import theme from '../../theme';

interface PlayButtonProps {
  isFetching: boolean;
  sendRequest: () => void;
}

export const PlayButton = ({ isFetching, sendRequest }: PlayButtonProps) => {
  const { t } = useTranslation();

  return (
    <Button
      onClick={sendRequest}
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

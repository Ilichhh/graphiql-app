import React from 'react';
import { IconButtonProps } from '@mui/material';

import { IconButton } from '@mui/material';
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRightOutlined,
  BookmarkBorderOutlined,
  HistoryOutlined,
  SaveOutlined,
  MoreHoriz,
} from '@mui/icons-material';

import theme from '../../theme';

const IconButtonStyle = {
  borderRadius: 1,
  '&:hover': {
    backgroundColor: theme.colors.hoverLight,
  },
};

export const CloseSidebarButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props} sx={IconButtonStyle}>
      <KeyboardDoubleArrowLeft />
    </IconButton>
  );
};

export const OpenSidebarButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props} sx={IconButtonStyle}>
      <KeyboardDoubleArrowRightOutlined />
    </IconButton>
  );
};

export const TemplatesTabButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props} sx={IconButtonStyle}>
      <BookmarkBorderOutlined />
    </IconButton>
  );
};

export const RequestsHistoryTabButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props} sx={IconButtonStyle}>
      <HistoryOutlined />
    </IconButton>
  );
};

export const SaveRequestButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props} sx={{ ...IconButtonStyle, height: 37, width: 37 }}>
      <SaveOutlined />
    </IconButton>
  );
};

export const ShowOptionsButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props} sx={IconButtonStyle}>
      <MoreHoriz />
    </IconButton>
  );
};

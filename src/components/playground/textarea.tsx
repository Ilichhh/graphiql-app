import { TextareaAutosize } from '@mui/material';
import theme from '../../theme';
import React from 'react';

export const Textarea = () => {
  return (
    <TextareaAutosize
      style={{
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: `${theme.colors.bgDarkBlue}`,
        color: `${theme.colors.textGrey}`,
        outline: 'none',
        border: 'none',
      }}
      placeholder="Enter your query here..."
      autoFocus
    />
  );
};

import { TextareaAutosize } from '@mui/material';
import theme from '../../theme';
import React from 'react';

interface TextareaProps {
  query: string;
  onChange: (query: string) => void;
}
export const Textarea = ({ query, onChange }: TextareaProps) => {
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
      value={query}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

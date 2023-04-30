import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

export const Header = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'end',
      padding: 2,
      '& > :not(style) + :not(style)': {
        ml: 2,
      },
    }}
  >
    <Link to="/">Home</Link>
    <Link to="/form">Form</Link>
    <Link to="/playground">Playground</Link>
  </Box>
);

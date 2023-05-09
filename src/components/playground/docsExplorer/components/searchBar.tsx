import React from 'react';
import styled from 'styled-components';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import theme from '../../../../theme';

const SearchBarWrapper = styled.div`
  display: flex;
  padding: 10px 0;
`;

const SearchField = styled(TextField)({
  '& .MuiInput-underline:before': {
    borderBottomColor: `${theme.docs.inputBorder}`,
  },
  '&& .MuiInput-root:hover::before': {
    borderBottom: `1px solid  ${theme.docs.inputBorder}`,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparent',
  },
});
export const SearchBar = () => {
  return (
    <SearchBarWrapper>
      <SearchField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon fontSize="medium" />
            </InputAdornment>
          ),
        }}
        variant="standard"
        placeholder="Search..."
        fullWidth
      />
    </SearchBarWrapper>
  );
};

import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import styled from 'styled-components';

const ProgressWrapper = styled.div`
  display: flex;
  flex: 1 1 0;
  justify-content: center;
  align-items: center;
`;

export const Loader = () => {
  return (
    <ProgressWrapper>
      <CircularProgress />
    </ProgressWrapper>
  );
};

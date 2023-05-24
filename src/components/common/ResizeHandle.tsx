import React from 'react';

import styled from 'styled-components';
import theme from '../../theme';

const Container = styled.div`
  display: flex;
  align-items: center;

  cursor: col-resize;

  @media (max-width: 600px) {
    justify-content: center;
    cursor: row-resize;
  }
`;

const Handle = styled.div`
  width: 5px;
  height: 40%;
  margin-left: 2px;

  border-radius: 12px;

  ${Container}:hover & {
    background-color: ${theme.colors.bgDarkBlue};
  }

  @media (max-width: 600px) {
    height: 5px;
    width: 40%;
  }
`;

export const ResizeHandle = ({ ...props }) => {
  return (
    <Container {...props}>
      <Handle></Handle>
    </Container>
  );
};

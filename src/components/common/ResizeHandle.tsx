import React from 'react';

import styled from 'styled-components';
import theme from '../../theme';

const Container = styled.div`
  display: flex;
  align-items: center;

  cursor: col-resize;
`;

const Handle = styled.div`
  width: 5px;
  height: 40%;
  margin-left: 2px;

  border-radius: 12px;

  ${Container}:hover & {
    background-color: ${theme.colors.bgDarkBlue};
  }
`;

export const ResizeHandle = ({ ...props }) => {
  return (
    <Container {...props}>
      <Handle></Handle>
    </Container>
  );
};

import React from 'react';
import styled from 'styled-components';
import theme from '../../../../theme';

interface DeprecatedProps {
  reason?: string | null;
}

const DeprecatedReason = styled.div`
  color: ${theme.docs.deprecated};
  font-size: 0.8rem;
`;
export const Deprecated = ({ reason }: DeprecatedProps) => {
  if (!reason) {
    return null;
  }

  return <DeprecatedReason>Deprecated: {reason}</DeprecatedReason>;
};

import React from 'react';
import styled from 'styled-components';
import theme from '../../../../theme';

const Description = styled.div`
  color: ${theme.docs.comment};
  font-size: 0.8rem;
  margin-bottom: 5px;
`;

interface InlineDescriptionProps {
  description?: string | null;
}
export const InlineDescription = ({ description }: InlineDescriptionProps) => {
  if (!description) {
    return null;
  }

  return <Description># {description}</Description>;
};

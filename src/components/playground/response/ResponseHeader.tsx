import React from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import theme from '../../../theme';

const Container = styled.div`
  min-height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px 6px;
  color: ${theme.colors.textGrey};
  background: ${theme.colors.bgBlue};
  border-radius: 5px 5px 0 0;
`;

const Status = styled.span<{ code: number }>`
  font-size: 12px;
  span {
    margin-left: 5px;
    color: ${({ code }) => (code > 199 && code < 300 ? 'green' : 'red')};
  }
`;

type ResponseHeaderProps = {
  statusCode?: number;
};

export const ResponseHeader = ({ statusCode }: ResponseHeaderProps) => {
  const { t } = useTranslation();
  return (
    <Container>
      <span>{t('playground.response')}</span>
      {statusCode && (
        <Status code={statusCode}>
          STATUS <span>{statusCode}</span>
        </Status>
      )}
    </Container>
  );
};

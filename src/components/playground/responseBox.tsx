import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.bgDarkBlue};
  flex: 1 1 0;
`;

const ResponseSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  background: ${theme.colors.bgBlue};
  position: relative;
`;

const StartMessage = styled.div`
  display: flex;
  width: 190px;
  font-size: 0.9rem;
  letter-spacing: 0.8px;
  line-height: 24px;
  font-weight: 400;
  color: ${theme.colors.textInactive};
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const ResponseBox = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <ResponseSection>
        <StartMessage>{t('playgroundMsg')}</StartMessage>
      </ResponseSection>
    </Container>
  );
};

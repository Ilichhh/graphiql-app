import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useEndpointInput } from '../../hooks/useEndpointInput';
import { getAllQueryTemplates } from '../../api/firebaseApi';

import { IconButton } from '@mui/material';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';

import styled from 'styled-components';
import theme from '../../theme';

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${theme.colors.bgBlue};
`;

const HeaderEndpoint = styled.span`
  flex: 0 0 auto;
  padding: 7px 10px;
  border-radius: 2px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  color: ${theme.colors.textGrey};
  background: ${theme.colors.bgDarkBlue};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1 1 0;
  margin-left: 6px;
`;

const Input = styled.input.attrs(() => ({
  type: 'text',
}))`
  flex: 1 1 0;
  padding: 6px 12px;
  font-size: 0.9rem;
  background: ${theme.colors.bgDarkBlue};
  color: ${theme.colors.textGrey};
  border-radius: 0.4rem;
  border: 1px solid ${theme.colors.bgBlack};
  outline: none;
`;

const ErrorBadge = styled.span`
  position: absolute;
  right: 15px;
  color: ${theme.colors.error};
`;

interface PlaygroundHeaderProps {
  isError: boolean;
}

export const PlaygroundHeader = React.memo(({ isError }: PlaygroundHeaderProps) => {
  const { endpoint, handleInputChange } = useEndpointInput();
  const { t } = useTranslation();

  const handleGetAllQueryTemplates = useCallback(async () => {
    const templates = await getAllQueryTemplates();
    console.log(templates);
  }, []);

  useEffect(() => {
    localStorage.setItem('last-endpoint', endpoint);
  }, [endpoint]);

  return (
    <Header>
      <IconButton onClick={handleGetAllQueryTemplates}>
        <KeyboardDoubleArrowRightOutlinedIcon />
      </IconButton>
      <HeaderEndpoint>ENDPOINT</HeaderEndpoint>
      <InputContainer>
        <Input autoFocus defaultValue={endpoint} onChange={handleInputChange} />
        {isError && <ErrorBadge>{t(`playground.serverError`)}</ErrorBadge>}
      </InputContainer>
    </Header>
  );
});

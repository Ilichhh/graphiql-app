import React from 'react';
import { useHeaderEndpointInput } from '../../hooks';

import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

import styled from 'styled-components';
import theme from '../../theme';

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 52px;
  padding: 10px;
  background: ${theme.colors.bgBlue};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1 1 0;
  padding-left: 8px;
  background: ${theme.colors.bgDarkBlue};
  border-radius: 0.4rem;
  border: 1px solid ${theme.colors.bgBlack};
`;

const Input = styled.input.attrs(() => ({
  type: 'text',
}))`
  flex: 1 1 0;
  padding: 6px 12px;
  height: 32px;
  font-size: 0.9rem;
  background: ${theme.colors.bgDarkBlue};
  color: ${theme.colors.textGrey};
  border: none;
  outline: none;
`;

const ErrorBadge = styled.span`
  position: absolute;
  right: 10px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${theme.colors.error};
`;

interface PlaygroundHeaderProps {
  isError: boolean;
}

export const PlaygroundHeader = React.memo(({ isError }: PlaygroundHeaderProps) => {
  const { inputValue, handleInputChange } = useHeaderEndpointInput();

  return (
    <Header>
      <InputContainer>
        <LanguageOutlinedIcon />
        <Input autoFocus value={inputValue} onChange={handleInputChange} />
        {isError && <ErrorBadge />}
      </InputContainer>
    </Header>
  );
});

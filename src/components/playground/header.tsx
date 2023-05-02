import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const Header = styled.header`
  display: flex;
  background: ${theme.colors.bgBlue};
  padding: 15px 10px 10px 10px;
  align-items: center;
`;

const HeaderEndpoint = styled.span`
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: ${theme.colors.textGrey};
  background: ${theme.colors.bgDarkBlue};
  border-radius: 2px;
  flex: 0 0 auto;
  font-size: 0.9rem;
  padding: 6px 9px 7px 10px;
`;

const InputContainer = styled.div`
  flex: 1 1 0;
  margin-left: 6px;
  display: flex;
  align-items: center;
`;

const Input = styled.input.attrs(() => ({
  type: 'text',
}))`
  flex: 1 1 0;
  background: ${theme.colors.bgDarkBlue};
  border-radius: 0.4rem;
  color: ${theme.colors.textGrey};
  border: 1px solid ${theme.colors.bgBlack};
  padding: 6px 12px;
  font-size: 0.9rem;
  outline: none;
`;

interface PlaygroundHeaderProps {
  endpoint: string;
  onChange: (url: string) => void;
}
export const PlaygroundHeader = ({ endpoint, onChange }: PlaygroundHeaderProps) => {
  return (
    <Header>
      <HeaderEndpoint>ENDPOINT</HeaderEndpoint>
      <InputContainer>
        <Input autoFocus value={endpoint} onChange={(e) => onChange(e.target.value)} />
      </InputContainer>
    </Header>
  );
};

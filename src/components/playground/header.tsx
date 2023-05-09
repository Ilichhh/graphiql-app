import React from 'react';

import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import theme from '../../theme';
import { set } from '../../store/endpointSlice';

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 15px 10px 10px 10px;
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

export const PlaygroundHeader = () => {
  const endpoint = useAppSelector((state) => state.endpoint);
  const dispatch = useAppDispatch();

  return (
    <Header>
      <HeaderEndpoint>ENDPOINT</HeaderEndpoint>
      <InputContainer>
        <Input autoFocus value={endpoint} onChange={(e) => dispatch(set(e.target.value))} />
      </InputContainer>
    </Header>
  );
};

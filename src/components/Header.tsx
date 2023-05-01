import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Button from '@mui/material/Button';

import theme from '../theme';
import { logOut } from '../firebase';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 32px;
  padding: 16px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.text};

  &:hover {
    color: #000;
  }
`;

export const Header = () => (
  <HeaderContainer>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/login">Sign In</NavLink>
    <NavLink to="/register">Sign Up</NavLink>
    <NavLink to="/playground">Playground</NavLink>
    <Button variant="contained" size="small" onClick={() => logOut()}>
      Log Out
    </Button>
  </HeaderContainer>
);

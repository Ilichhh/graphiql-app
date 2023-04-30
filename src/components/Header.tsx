import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../theme';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
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
    <NavLink to="/form">Form</NavLink>
    <NavLink to="/playground">Playground</NavLink>
  </HeaderContainer>
);

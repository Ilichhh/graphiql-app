import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useIsAtTop } from '../hooks/useIsAtTop';

import styled, { css } from 'styled-components';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GraphQLIcon } from './Icons';

import theme from '../theme';
import { logOut, auth } from '../firebase';

const HeaderContainer = styled.header<{ sticky: boolean }>`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${theme.headerHeight};
  padding: 0 48px;
  background-color: ${({ color }) => color};
  transition: all 0.3s ease-in-out;
  ${({ sticky }) =>
    sticky &&
    css`
      z-index: 999;
      height: calc(${theme.headerHeight} - 12px);
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
    `}
`;

const Nav = styled.nav`
  display: flex;
  gap: 32px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 20px;
  color: ${({ color }) => color};
`;

interface HeaderProps {
  currentPage: string;
}

export const Header = ({ currentPage }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [user] = useAuthState(auth);
  const isAtTop = useIsAtTop();

  const bgColor = currentPage === 'playground' ? theme.colors.bgDarkBlue : theme.colors.bgLight;
  const textColor = currentPage === 'playground' ? theme.colors.textGrey : theme.colors.bgBlue;
  const btnTextColor = currentPage === 'playground' ? theme.colors.textGrey : theme.colors.bgLight;
  const btnStyles = { backgroundColor: theme.colors.bgBlue, color: btnTextColor };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <HeaderContainer color={bgColor} sticky={!isAtTop}>
      <Logo to="/" color={textColor}>
        <GraphQLIcon color={textColor} />
        GraphiQL
      </Logo>
      <Nav>
        {user ? (
          <>
            {currentPage !== 'playground' && (
              <Button style={btnStyles} variant="contained" component={Link} to="/playground">
                {t('header.toMain')}
              </Button>
            )}
            <Button style={btnStyles} variant="contained" onClick={() => logOut()}>
              {t('header.signOut')}
            </Button>
          </>
        ) : (
          <>
            <Button style={btnStyles} variant="contained" component={Link} to="/login">
              {t('header.signIn')}
            </Button>
            <Button style={btnStyles} variant="contained" component={Link} to="/register">
              {t('header.signUp')}
            </Button>
          </>
        )}
        <Select
          sx={{
            '& .MuiSelect-icon': {
              color: textColor,
            },
            '& .MuiInputBase-input': {
              color: textColor,
            },
          }}
          value={i18n.resolvedLanguage}
          onChange={handleLanguageChange}
          inputProps={{ 'aria-label': 'Without label' }}
          size="small"
        >
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="ru">RU</MenuItem>
        </Select>
      </Nav>
    </HeaderContainer>
  );
};

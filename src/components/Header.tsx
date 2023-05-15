import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useIsAtTop } from '../hooks/useIsAtTop';
import { useTheme } from '@mui/material/styles';

import { logOut, auth } from '../firebase';

import { MenuItem, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LogoutIcon from '@mui/icons-material/Logout';
import { GraphQLIcon } from './Icons';

import styled, { css } from 'styled-components';
import theme from '../theme';

const HeaderContainer = styled.header<{ sticky: boolean; color: string }>`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${theme.headerHeight};
  padding: 0 40px;
  background-color: ${({ color }) => color};
  transition: all 0.3s ease-in-out;
  ${({ sticky }) =>
    sticky &&
    css`
      z-index: 999;
      height: calc(${theme.headerHeight} - 12px);
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
    `}
  @media (max-width: 600px) {
    padding: 0 24px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 24px;
  @media (max-width: 600px) {
    gap: 16px;
  }
`;

const Logo = styled(Link)<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 20px;
  color: ${({ color }) => color};
  transition: 0.2s all;
  &:hover {
    color: ${theme.colors.accent};
  }
`;

const LogoLabel = styled.span`
  @media (max-width: 600px) {
    display: none;
  }
`;

interface HeaderProps {
  currentPage: string;
}

export const Header = ({ currentPage }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [user] = useAuthState(auth);
  const isAtTop = useIsAtTop();
  const muiTheme = useTheme();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <HeaderContainer color={muiTheme.palette.background.default} sticky={!isAtTop}>
      <Logo to="/" color={muiTheme.palette.text.primary}>
        <GraphQLIcon sx={{ fontSize: 44, fill: muiTheme.palette.primary.main }} />
        <LogoLabel>GraphiQL</LogoLabel>
      </Logo>
      <Nav>
        {user ? (
          <>
            {currentPage !== 'playground' && (
              <Button variant="contained" component={Link} to="/playground">
                {t('header.toMain')}
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              title={t('header.signOut') as string}
              onClick={() => logOut()}
            >
              <LogoutIcon />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color={currentPage === 'welcome' ? 'primary' : 'secondary'}
              component={Link}
              to="/login"
            >
              {t('header.signIn')}
            </Button>
            <Button
              variant="contained"
              color={currentPage === 'welcome' ? 'primary' : 'secondary'}
              component={Link}
              to="/register"
            >
              {t('header.signUp')}
            </Button>
          </>
        )}
        <Select value={i18n.resolvedLanguage} onChange={handleLanguageChange} size="small">
          <MenuItem sx={{ color: muiTheme.palette.text.primary }} value="en">
            EN
          </MenuItem>
          <MenuItem sx={{ color: muiTheme.palette.text.primary }} value="ru">
            RU
          </MenuItem>
        </Select>
      </Nav>
    </HeaderContainer>
  );
};

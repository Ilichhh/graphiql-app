import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';

import styled from 'styled-components';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import theme from '../theme';
import { logOut, auth } from '../firebase';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 48px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 32px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.text};

  &:hover {
    color: #000;
  }
`;

interface HeaderProps {
  currentPage: string;
}

export const Header = ({ currentPage }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [user] = useAuthState(auth);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <HeaderContainer>
      <NavLink to="/">GraphiQL</NavLink>
      <Nav>
        {user ? (
          <>
            {currentPage !== 'playground' && (
              <Button variant="contained" component={Link} to="/playground">
                {t('header.toMain')}
              </Button>
            )}
            <Button variant="contained" onClick={() => logOut()}>
              {t('header.signOut')}
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" component={Link} to="/login">
              {t('header.signIn')}
            </Button>
            <Button variant="contained" component={Link} to="/register">
              {t('header.signUp')}
            </Button>
          </>
        )}
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          displayEmpty
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

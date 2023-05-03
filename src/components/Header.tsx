import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';

import styled from 'styled-components';
import Button from '@mui/material/Button';

import theme from '../theme';
import { logOut, auth } from '../firebase';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 48px;
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
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  return (
    <HeaderContainer>
      <NavLink to="/">GraphiQL</NavLink>
      <Nav>
        {user ? (
          <>
            {currentPage !== 'playground' && (
              <Button variant="contained" size="small" component={Link} to="/playground">
                {t('header.toMain')}
              </Button>
            )}
            <Button variant="contained" size="small" onClick={() => logOut()}>
              {t('header.signOut')}
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" size="small" component={Link} to="/login">
              {t('header.signIn')}
            </Button>
            <Button variant="contained" size="small" component={Link} to="/register">
              {t('header.signUp')}
            </Button>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

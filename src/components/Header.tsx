import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';

import styled from 'styled-components';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GraphQLIcon } from './Icons';

import theme from '../theme';
import { logOut, auth } from '../firebase';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 48px;
  background-color: ${(props) => props.color};
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
  color: ${(props) => props.color};
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

  const bgColor = currentPage === 'playground' ? theme.colors.bgDarkBlue : '#f5f5f5';
  const textColor = currentPage === 'playground' ? theme.colors.textGrey : theme.colors.bgBlue;

  return (
    <HeaderContainer color={bgColor}>
      <Logo to="/" color={textColor}>
        <GraphQLIcon color={textColor} />
        GraphiQL
      </Logo>
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

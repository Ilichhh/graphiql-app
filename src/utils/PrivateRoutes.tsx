import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Loader } from '../components/common';

import { auth } from '../firebase';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

interface PrivateRoutesProps {
  forLoggedInUser: boolean;
}

export const PrivateRoutes = ({ forLoggedInUser }: PrivateRoutesProps) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (forLoggedInUser) {
    return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
  } else {
    return <>{!user ? <Outlet /> : <Navigate to="/playground" />}</>;
  }
};

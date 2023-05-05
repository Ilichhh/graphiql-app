import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase';

interface PrivateRoutesProps {
  forLoggedInUser: boolean;
}

export const PrivateRoutes = ({ forLoggedInUser }: PrivateRoutesProps) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (forLoggedInUser) {
    return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
  } else {
    return <>{!user ? <Outlet /> : <Navigate to="/playground" />}</>;
  }
};

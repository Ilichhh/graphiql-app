import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase';

export const PrivateRoutes = () => {
  const [user] = useAuthState(auth);

  return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
};

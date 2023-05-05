import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { WelcomePage } from './pages/WelcomePage';
import { FormPage } from './pages/FormPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { ErrorPage } from './pages/ErrorPage';
import { PrivateRoutes } from './utils/PrivateRoutes';

export const App = () => (
  <Routes>
    <Route path="/" element={<WelcomePage />} />
    <Route element={<PrivateRoutes forLoggedInUser={false} />}>
      <Route path="/login" element={<FormPage mode="login" />} />
      <Route path="/register" element={<FormPage mode="register" />} />
    </Route>
    <Route element={<PrivateRoutes forLoggedInUser />}>
      <Route path="/playground" element={<PlaygroundPage />} />
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

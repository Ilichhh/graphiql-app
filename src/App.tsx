import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { WelcomePage } from './pages/WelcomePage';
import { FormPage } from './pages/FormPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { ErrorPage } from './pages/ErrorPage';

export const App = () => (
  <Routes>
    <Route path="/" element={<WelcomePage />} />
    <Route path="/login" element={<FormPage mode="login" />} />
    <Route path="/register" element={<FormPage mode="register" />} />
    <Route path="/playground" element={<PlaygroundPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

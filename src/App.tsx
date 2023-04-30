import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { WelcomePage } from './pages/WelcomePage';
import { FormPage } from './pages/FormPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { ErrorPage } from './pages/ErrorPage';

export const App = () => (
  <Routes>
    <Route path="/" element={<WelcomePage />} />
    <Route path="/form" element={<FormPage />} />
    <Route path="/playground" element={<PlaygroundPage />} />
    <Route path="/404" element={<ErrorPage />} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Routes>
);

import { Header } from '../components/Header';
import React from 'react';

export const ErrorPage = () => (
  <>
    <Header currentPage="error" />
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the requested page could not be found.</p>
  </>
);

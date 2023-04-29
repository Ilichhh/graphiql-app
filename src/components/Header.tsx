import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  <header>
    <Link to="/">Home</Link>
    <Link to="/form">Form</Link>
    <Link to="/playground">Playground</Link>
  </header>
);

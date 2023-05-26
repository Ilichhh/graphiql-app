import React, { ReactNode } from 'react';
import { ErrorBoundary as Boundary } from 'react-error-boundary';
import { FallbackComponent } from './FallbackComponent';

type ErrorBoundaryProps = {
  children: ReactNode;
};

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return <Boundary FallbackComponent={FallbackComponent}>{children}</Boundary>;
};

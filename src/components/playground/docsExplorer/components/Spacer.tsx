import React, { ReactNode } from 'react';

export const Spacer = ({ children }: { children: ReactNode }) => {
  return <div style={{ marginBottom: '10px' }}>{children}</div>;
};

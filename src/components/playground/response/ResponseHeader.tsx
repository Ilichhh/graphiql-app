import React from 'react';

type ResponseHeaderProps = {
  statusCode?: number;
};

export const ResponseHeader = ({ statusCode }: ResponseHeaderProps) => {
  return <div>Status: {statusCode}</div>;
};

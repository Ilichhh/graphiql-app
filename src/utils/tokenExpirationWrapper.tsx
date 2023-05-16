import React, { ComponentType, useEffect } from 'react';
import { checkTokenExpiration } from '../api/firebaseApi';

export const withTokenExpirationWrapper = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => {
    useEffect(() => {
      checkTokenExpiration();

      const interval = setInterval(checkTokenExpiration, 30000);

      return () => {
        interval.unref();
      };
    }, []);

    return <Component {...props} />;
  };
};

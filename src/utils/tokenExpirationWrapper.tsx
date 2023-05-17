import React, { ComponentType, useEffect } from 'react';
import { t } from 'i18next';
import { checkTokenExpiration } from '../api/firebaseApi';
import { useErrorState } from '../hooks/useErrorState';

export const withTokenExpirationWrapper = <P extends object>(Component: ComponentType<P>) => {
  const message = t(`global.sessionError`);

  return (props: P) => {
    const { setError } = useErrorState();

    useEffect(() => {
      const checkToken = async () => {
        const expired = await checkTokenExpiration();

        if (expired) {
          setError(message);
        }
      };

      const interval = setInterval(checkToken, 300000);

      return () => {
        interval.unref();
      };
    }, [setError]);

    return <Component {...props} />;
  };
};

import React, { ComponentType, useEffect } from 'react';
import { t } from 'i18next';
import { checkTokenExpiration } from '../api/firebaseApi';
import { useTabStateContext } from '../context/TabStateContext';

export const withTokenExpirationWrapper = <P extends object>(Component: ComponentType<P>) => {
  const message = t(`global.sessionError`);

  return (props: P) => {
    const { setError } = useTabStateContext();

    useEffect(() => {
      const checkToken = async () => {
        const expired = await checkTokenExpiration();

        if (expired) {
          setError(message);
        }
      };

      const interval = setInterval(checkToken, 300000);

      return () => {
        if (typeof interval.unref === 'function') {
          interval.unref();
        }
      };
    }, [setError]);

    return <Component {...props} />;
  };
};

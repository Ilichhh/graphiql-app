import React, { ComponentType, useEffect } from 'react';
import { t } from 'i18next';
import { checkTokenExpiration } from '../firebase';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { setError } from '../store/errorSlice';

export const withTokenExpirationWrapper = <P extends object>(Component: ComponentType<P>) => {
  const message = t(`global.sessionError`);

  return (props: P) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      const checkToken = async () => {
        const expired = await checkTokenExpiration();

        if (expired) {
          dispatch(setError(message));
        }
      };

      const interval = setInterval(checkToken, 300000);

      return () => {
        interval.unref();
      };
    }, [dispatch]);

    return <Component {...props} />;
  };
};

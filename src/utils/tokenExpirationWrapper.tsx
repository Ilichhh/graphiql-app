import React, { ComponentType, useEffect } from 'react';
import { checkTokenExpiration } from '../firebase';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { setError } from '../store/errorSlice';
import { useTranslation } from 'react-i18next';

export const withTokenExpirationWrapper = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    useEffect(() => {
      const checkToken = async () => {
        const expired = await checkTokenExpiration();

        if (expired) {
          dispatch(setError(t(`global.sessionError`)));
        }
      };

      const interval = setInterval(checkToken, 300000);

      return () => {
        interval.unref();
      };
    }, [dispatch, t]);

    return <Component {...props} />;
  };
};

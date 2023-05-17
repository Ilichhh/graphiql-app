import { useAppDispatch, useAppSelector } from './reduxTypedHooks';
import { setError } from '../store/errorState';

export const useErrorState = () => {
  const tabId = useAppSelector(({ tabs: { selectedId } }) => selectedId);
  const errors = useAppSelector(({ error }) => error);
  const dispatch = useAppDispatch();

  return {
    error: errors[tabId],
    setError: (error: string) => dispatch(setError({ tabId, error })),
  };
};

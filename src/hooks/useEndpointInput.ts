import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './reduxTypedHooks';
import { useDebouncedInput } from './useDebouncedInput';
import { set } from '../store/endpointSlice';

export const useEndpointInput = () => {
  const endpoint = useAppSelector((state) => state.endpoint);
  const dispatch = useAppDispatch();

  const handleChangeEndpoint = useCallback(
    (value: string) => {
      dispatch(set(value));
    },
    [dispatch]
  );

  const { inputValue, setInputValue, handleInputChange } = useDebouncedInput(
    handleChangeEndpoint,
    endpoint,
    500
  );

  return {
    endpoint,
    inputValue,
    setInputValue,
    handleInputChange,
  };
};

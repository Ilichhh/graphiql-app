import { useCallback } from 'react';
import { useDebouncedInput } from './useDebouncedInput';
import { useEndpointState } from './useEndpointState';

export const useEndpointInput = () => {
  const { endpoint, setEndpoint } = useEndpointState();

  const handleChangeEndpoint = useCallback(
    (value: string) => {
      setEndpoint(value);
    },
    [setEndpoint]
  );

  const { inputValue, setInputValue, handleInputChange } = useDebouncedInput(
    handleChangeEndpoint,
    endpoint,
    500
  );

  return {
    endpoint,
    setEndpoint,
    inputValue,
    setInputValue,
    handleInputChange,
  };
};

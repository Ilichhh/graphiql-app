import { useCallback, useEffect } from 'react';
import { useDebouncedInput } from './useDebouncedInput';
import { useTabsState } from './useTabsState';

export const useEndpointInput = () => {
  const { endpoint, setEndpoint } = useTabsState();

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

  useEffect(() => {
    setInputValue(endpoint);
  }, [endpoint, setInputValue]);

  return {
    endpoint,
    setEndpoint,
    inputValue,
    setInputValue,
    handleInputChange,
  };
};

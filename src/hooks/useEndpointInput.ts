import { useCallback, useEffect } from 'react';
import { useDebouncedInput } from './useDebouncedInput';
import { useTabStateContext } from '../context/TabStateContext';

export const useEndpointInput = () => {
  const { endpoint, setEndpoint } = useTabStateContext();

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

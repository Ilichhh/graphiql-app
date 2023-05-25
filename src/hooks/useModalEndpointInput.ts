import { useCallback, useEffect, useState } from 'react';
import { useDebouncedInput } from './useDebouncedInput';

export const useModalEndpointInput = () => {
  const [debouncedInput, setDebouncedInput] = useState<string>('');

  const handleChangeEndpoint = useCallback(
    (value: string) => {
      setDebouncedInput(value);
    },
    [setDebouncedInput]
  );

  const { inputValue, setInputValue, handleInputChange } = useDebouncedInput(
    handleChangeEndpoint,
    debouncedInput,
    500
  );

  useEffect(() => {
    setInputValue(debouncedInput);
  }, [debouncedInput, setInputValue]);

  return {
    inputValue,
    setInputValue,
    debouncedInput,
    handleInputChange,
  };
};

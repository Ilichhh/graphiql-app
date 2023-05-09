import { useState, useEffect, useCallback } from 'react';

export const useDebouncedInput = (callback: (value: string) => void, delay: number) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      callback(inputValue);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [callback, inputValue, delay]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  return {
    inputValue,
    handleInputChange,
  };
};

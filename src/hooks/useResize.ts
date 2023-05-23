import { useState, useCallback } from 'react';

export const useResize = (initialValue: number, attribute: 'width' | 'height') => {
  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (attribute === 'width') {
        setValue((value) => value + e.movementX);
      } else {
        setValue((value) => value - e.movementY);
      }
      setIsDragging(true);
    },
    [attribute]
  );

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    setIsDragging(false);
  }, [handleMouseMove]);

  const handleResize = useCallback(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);

  return { value, setValue, handleResize, isDragging };
};

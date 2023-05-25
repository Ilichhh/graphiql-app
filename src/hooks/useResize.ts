import { useState, useCallback } from 'react';

export const useResize = (initialSize: number, direction: 'vertical' | 'horizontal') => {
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (size && direction === 'horizontal') {
        setSize((size) => size + e.movementX);
      } else if (size && direction === 'vertical') {
        setSize((size) => size - e.movementY);
      }
      setIsDragging(true);
    },
    [direction, size]
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

  return { size, handleResize, isDragging };
};

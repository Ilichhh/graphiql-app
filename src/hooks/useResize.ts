import { useState, useCallback } from 'react';

type Direction = 'vertical' | 'horizontal';

export const useResize = (
  initialWidth: number,
  initialHeight: number,
  initialDirection: Direction
) => {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [direction, setDirection] = useState<Direction>(initialDirection);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (width && direction === 'horizontal') {
        setWidth((width) => width + e.movementX);
      } else if (height && direction === 'vertical') {
        setHeight((height) => height - e.movementY);
      }
      setIsDragging(true);
    },
    [direction, height, width]
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

  return { width, height, handleResize, isDragging, setDirection };
};

import { useState, useCallback, useEffect } from 'react';

export const useVerticalResize = (initialHeight: number) => {
  const [panelHeight, setPanelHeight] = useState<number>(initialHeight);
  const [isDragging, setIsDragging] = useState(false);

  console.log(panelHeight);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPanelHeight((panelHeight) => panelHeight - e.movementY);
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    setIsDragging(false);
  }, [handleMouseMove]);

  const handleResize = useCallback(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    console.log(isDragging);
  }, [isDragging]);

  return { panelHeight, handleResize, isDragging };
};

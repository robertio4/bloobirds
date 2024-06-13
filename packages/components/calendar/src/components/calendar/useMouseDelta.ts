import { useCallback, useEffect, useRef, useState } from 'react';

export const useMouseDelta = () => {
  const [result, setResult] = useState(0);
  const dragging = useRef(false);
  const previousClientY = useRef(0);
  const element = useRef<HTMLDivElement>(null);
  const initialPosition = useRef(0);

  const handleMouseMove = useCallback(e => {
    if (!dragging.current) {
      return;
    }

    setResult(result => {
      const change = e.offsetY - previousClientY.current;
      if (Math.abs(change) < 180) {
        previousClientY.current = e.offsetY;
        return result + change;
      } else if (e.offsetY < 180) {
        return e.offsetY;
      } else {
        return result;
      }
    });
  }, []);

  const handleMouseDown = useCallback(e => {
    previousClientY.current = e.offsetY;
    initialPosition.current = e.offsetY;
    dragging.current = true;
    setResult(0);
  }, []);

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    element?.current?.addEventListener('mousedown', handleMouseDown);
    element?.current?.addEventListener('mouseup', handleMouseUp);
    element?.current?.addEventListener('mousemove', handleMouseMove);

    return () => {
      element?.current?.removeEventListener('mousedown', handleMouseDown);
      element?.current?.removeEventListener('mouseup', handleMouseUp);
      element?.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseDown, handleMouseUp, handleMouseMove, element]);

  return { delta: result, ref: element, initialPosition: initialPosition.current, dragging };
};

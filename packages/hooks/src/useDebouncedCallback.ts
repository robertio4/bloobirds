import { useCallback, useRef } from 'react';

export const useDebouncedCallback = (func, wait, deps) => {
  // Use a ref to store the timeout between renders
  // and prevent changes to it from causing re-renders
  const timeout = useRef();

  return useCallback(
    (...args) => {
      const later = () => {
        clearTimeout(timeout.current);
        func(...args);
      };

      clearTimeout(timeout.current);
      // @ts-ignore
      timeout.current = setTimeout(later, wait);
    },
    [func, wait, ...deps],
  );
};

import { useEffect, useCallback, DependencyList } from 'react';

export const useDebounceEffect = <T extends unknown[]>(
  effect: (...args: T) => void,
  deps: DependencyList | undefined,
  delay: number,
) => {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      callback(...(deps as T));
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
};

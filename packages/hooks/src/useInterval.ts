import { useCallback, useEffect, useRef, useState } from 'react';

export type GenericFunction = (...args: any[]) => any;
export interface UseIntervalOptions {
  cancelOnUnmount?: boolean;
}

type SomeFunction = (...args: any[]) => any;

const isFunction = (functionToCheck: unknown): functionToCheck is SomeFunction =>
  typeof functionToCheck === 'function' &&
  !!functionToCheck.constructor &&
  !!functionToCheck.call &&
  !!functionToCheck.apply;

const defaultOptions: UseIntervalOptions = {
  cancelOnUnmount: true,
};

export const useInterval = <TCallback extends GenericFunction>(
  fn: TCallback,
  milliseconds: number,
  targetId: string,
  options: UseIntervalOptions = defaultOptions,
) => {
  const opts = { ...defaultOptions, ...(options || {}) };
  const timeout = useRef<NodeJS.Timeout>();
  const callback = useRef<TCallback>(fn);
  const targetIdRef = useRef<string>(targetId);
  const [isCleared, setIsCleared] = useState<boolean>(false);
  const [firstCallDone, setFirstCallDone] = useState<boolean>(false);

  useEffect(() => {
    if (isFunction(fn) && (!firstCallDone || targetIdRef.current !== targetId)) {
      clear();
      fn();
      setFirstCallDone(true);
    }
  }, [targetId]);
  // the clear method
  const clear = useCallback(() => {
    if (timeout.current) {
      setIsCleared(true);
      clearInterval(timeout.current);
    }
  }, []);

  // if the provided function changes, change its reference
  useEffect(() => {
    if (isFunction(fn)) {
      callback.current = fn;
    }
  }, [fn]);

  // when the milliseconds change, reset the timeout
  useEffect(() => {
    if (typeof milliseconds === 'number') {
      timeout.current = setInterval(() => {
        callback.current();
      }, milliseconds);
    }

    // cleanup previous interval
    return clear;
  }, [milliseconds]);

  // when component unmount clear the timeout
  useEffect(() => {
    return () => {
      if (opts.cancelOnUnmount) {
        clear();
      }
    };
  }, [targetId]);

  const resume = () => {
    if (isCleared) {
      setIsCleared(false);
      setFirstCallDone(false);
      fn();
      timeout.current = setInterval(() => {
        callback.current();
      }, milliseconds);
    }
  };
  return [isCleared, clear, resume] as [boolean, () => void, () => void];
};

export default useInterval;

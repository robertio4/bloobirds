import React from 'react';

export function useLazyRef<T>(factory: () => T): React.MutableRefObject<T> {
  const ref = React.useRef<T | null>(null);
  if (ref.current === null) {
    ref.current = factory();
  }
  return ref;
}

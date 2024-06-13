import { useEffect, useState } from 'react';

export function useMonitorChanges(value: any) {
  const [previous, setPrevious] = useState(value);

  useEffect(() => {
    if (value !== previous) {
      setTimeout(() => setPrevious(value), 200);
    }
  });

  return value !== previous;
}

/* eslint-disable no-unused-vars */
import { mutate } from 'swr';
import { useRef, useEffect, useCallback } from 'react';

/*
  This is a SWR Utils used also in our extension, any change here please propagate to our extension
 */
function mutateMany(select, cache) {
  if (!(cache instanceof Map)) {
    throw new Error('matchMutate requires the cache provider to be a Map instance');
  }

  const keys = new Set();
  // eslint-disable-next-line no-restricted-syntax
  for (const key of cache.keys()) {
    if (select.test(key)) {
      keys.add(key.replace(/\$.*\$/, ''));
    }
  }

  keys.forEach(key => mutate(key));
}

// This is a SWR middleware for keeping the data even if key changes.
function keepPreviousResponse(useSWRNext) {
  return (key, fetcher, config) => {
    // Use a ref to store previous returned data.
    const laggyDataRef = useRef();

    // Actual SWR hook.
    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      // Update ref if data is not undefined.
      if (swr.data !== undefined) {
        laggyDataRef.current = swr.data;
      }
    }, [swr.data]);

    // Expose a method to clear the laggy data, if any.
    const resetLaggy = useCallback(() => {
      laggyDataRef.current = undefined;
    }, []);

    // Fallback to previous data if the current data is undefined.
    const dataOrLaggyData = swr.data === undefined ? laggyDataRef.current : swr.data;

    // Is it showing previous data?
    const isLagging = swr.data === undefined && laggyDataRef.current !== undefined;

    // Also add a `isLagging` field to SWR.
    return Object.assign({}, swr, {
      data: dataOrLaggyData,
      isLagging,
      resetLaggy,
    });
  };
}

export { mutateMany, keepPreviousResponse };

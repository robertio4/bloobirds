function encodeKeysToArray(keysArray) {
  if (!keysArray || typeof keysArray !== 'object') return keysArray;
  return '@' + keysArray.map(key => `"${key}",`).join('');
}
//add keys that you do not wish to get stale to this array
const nonPerishableKeys = [];
// Dictionary to store last accessed time of cache keys
const lastAccessedTimes = new Map();

// Middleware function to stale cache keys
export function staleCacheKeysMiddleware(useSWRNext: (...any) => any, active: boolean) {
  return (key, fetcher, config) => {
    if (!active) return useSWRNext(key, fetcher, config);
    const encodedKey = encodeKeysToArray(key);
    if (!key || nonPerishableKeys.includes(encodedKey)) return useSWRNext(key, fetcher, config);
    // Parse the key to match SWR formatting
    //If the key is not in the lastAccessedTimes dictionary, add it
    if (!lastAccessedTimes.has(encodedKey)) {
      lastAccessedTimes.set(encodedKey, Date.now());
    }
    // Loop through the cache keys and check if they are stale
    for (const cacheKey of config.cache.keys()) {
      const isActiveKey = cacheKey === key;
      // If the key is active, update the last accessed time
      if (isActiveKey) {
        lastAccessedTimes.set(cacheKey, Date.now());
        break;
      }
      // If the key is not active, check if it is stale
      const isStale =
        !isActiveKey &&
        lastAccessedTimes.get(cacheKey) &&
        Date.now() - lastAccessedTimes.get(cacheKey) > 600000; //key lifespan in milliseconds;
      if (isStale) {
        lastAccessedTimes.delete(cacheKey);
        config.cache.delete(cacheKey);
      }
    }
    return useSWRNext(key, fetcher, config);
  };
}

function encodeKeysToArray(keysArray) {
  if (!keysArray || typeof keysArray !== "object")
    return keysArray;
  return "@" + keysArray.map((key) => `"${key}",`).join("");
}
const nonPerishableKeys = [];
const lastAccessedTimes = /* @__PURE__ */ new Map();
export function staleCacheKeysMiddleware(useSWRNext, active) {
  var _s = $RefreshSig$();
  return _s((key, fetcher, config) => {
    _s();
    if (!active)
      return useSWRNext(key, fetcher, config);
    const encodedKey = encodeKeysToArray(key);
    if (!key || nonPerishableKeys.includes(encodedKey))
      return useSWRNext(key, fetcher, config);
    if (!lastAccessedTimes.has(encodedKey)) {
      lastAccessedTimes.set(encodedKey, Date.now());
    }
    for (const cacheKey of config.cache.keys()) {
      const isActiveKey = cacheKey === key;
      if (isActiveKey) {
        lastAccessedTimes.set(cacheKey, Date.now());
        break;
      }
      const isStale = !isActiveKey && lastAccessedTimes.get(cacheKey) && Date.now() - lastAccessedTimes.get(cacheKey) > 6e5;
      if (isStale) {
        lastAccessedTimes.delete(cacheKey);
        config.cache.delete(cacheKey);
      }
    }
    return useSWRNext(key, fetcher, config);
  }, "7hwLjajtPlNdnGL5C10ZDbMCWCw=", false, function() {
    return [useSWRNext, useSWRNext, useSWRNext];
  });
}

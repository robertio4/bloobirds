import {
  useSWR
} from "/vendor/.vite-deps-chunk-RZ476SWQ.js__v--372537c1.js";
import {
  INFINITE_PREFIX,
  SWRGlobalState,
  UNDEFINED,
  cache,
  createCacheHelper,
  isFunction,
  isUndefined,
  serialize,
  useIsomorphicLayoutEffect,
  withMiddleware
} from "/vendor/.vite-deps-chunk-3ECAJYTF.js__v--372537c1.js";
import {
  require_shim
} from "/vendor/.vite-deps-chunk-4C4BNMBI.js__v--372537c1.js";
import {
  require_react
} from "/vendor/.vite-deps-chunk-C7VZVCY4.js__v--372537c1.js";
import {
  __toESM
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--372537c1.js";

// ../../../node_modules/swr/infinite/dist/index.esm.js
var import_react = __toESM(require_react());
var import_shim = __toESM(require_shim());
var getFirstPageKey = (getKey) => {
  return serialize(getKey ? getKey(0, null) : null)[0];
};
var unstable_serialize = (getKey) => {
  return INFINITE_PREFIX + getFirstPageKey(getKey);
};
var EMPTY_PROMISE = Promise.resolve();
var infinite = (useSWRNext) => (getKey, fn, config) => {
  const didMountRef = (0, import_react.useRef)(false);
  const { cache: cache$1, initialSize = 1, revalidateAll = false, persistSize = false, revalidateFirstPage = true, revalidateOnMount = false, parallel = false } = config;
  const [, , , PRELOAD] = SWRGlobalState.get(cache);
  let infiniteKey;
  try {
    infiniteKey = getFirstPageKey(getKey);
    if (infiniteKey)
      infiniteKey = INFINITE_PREFIX + infiniteKey;
  } catch (err) {
  }
  const [get, set, subscribeCache] = createCacheHelper(cache$1, infiniteKey);
  const getSnapshot = (0, import_react.useCallback)(() => {
    const size = isUndefined(get()._l) ? initialSize : get()._l;
    return size;
  }, [
    cache$1,
    infiniteKey,
    initialSize
  ]);
  (0, import_shim.useSyncExternalStore)((0, import_react.useCallback)(
    (callback) => {
      if (infiniteKey)
        return subscribeCache(infiniteKey, () => {
          callback();
        });
      return () => {
      };
    },
    [
      cache$1,
      infiniteKey
    ]
  ), getSnapshot, getSnapshot);
  const resolvePageSize = (0, import_react.useCallback)(() => {
    const cachedPageSize = get()._l;
    return isUndefined(cachedPageSize) ? initialSize : cachedPageSize;
  }, [
    infiniteKey,
    initialSize
  ]);
  const lastPageSizeRef = (0, import_react.useRef)(resolvePageSize());
  useIsomorphicLayoutEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (infiniteKey) {
      set({
        _l: persistSize ? lastPageSizeRef.current : resolvePageSize()
      });
    }
  }, [
    infiniteKey,
    cache$1
  ]);
  const shouldRevalidateOnMount = revalidateOnMount && !didMountRef.current;
  const swr = useSWRNext(infiniteKey, async (key) => {
    const forceRevalidateAll = get()._i;
    const data = [];
    const pageSize = resolvePageSize();
    const [getCache] = createCacheHelper(cache$1, key);
    const cacheData = getCache().data;
    const revalidators = [];
    let previousPageData = null;
    for (let i = 0; i < pageSize; ++i) {
      const [pageKey, pageArg] = serialize(getKey(i, parallel ? null : previousPageData));
      if (!pageKey) {
        break;
      }
      const [getSWRCache, setSWRCache] = createCacheHelper(cache$1, pageKey);
      let pageData = getSWRCache().data;
      const shouldFetchPage = revalidateAll || forceRevalidateAll || isUndefined(pageData) || revalidateFirstPage && !i && !isUndefined(cacheData) || shouldRevalidateOnMount || cacheData && !isUndefined(cacheData[i]) && !config.compare(cacheData[i], pageData);
      if (fn && shouldFetchPage) {
        const revalidate = async () => {
          const hasPreloadedRequest = pageKey in PRELOAD;
          if (!hasPreloadedRequest) {
            pageData = await fn(pageArg);
          } else {
            const req = PRELOAD[pageKey];
            delete PRELOAD[pageKey];
            pageData = await req;
          }
          setSWRCache({
            data: pageData,
            _k: pageArg
          });
          data[i] = pageData;
        };
        if (parallel) {
          revalidators.push(revalidate);
        } else {
          await revalidate();
        }
      } else {
        data[i] = pageData;
      }
      if (!parallel) {
        previousPageData = pageData;
      }
    }
    if (parallel) {
      await Promise.all(revalidators.map((r) => r()));
    }
    set({
      _i: UNDEFINED
    });
    return data;
  }, config);
  const mutate = (0, import_react.useCallback)(
    function(data, opts) {
      const options = typeof opts === "boolean" ? {
        revalidate: opts
      } : opts || {};
      const shouldRevalidate = options.revalidate !== false;
      if (!infiniteKey)
        return EMPTY_PROMISE;
      if (shouldRevalidate) {
        if (!isUndefined(data)) {
          set({
            _i: false
          });
        } else {
          set({
            _i: true
          });
        }
      }
      return arguments.length ? swr.mutate(data, {
        ...options,
        revalidate: shouldRevalidate
      }) : swr.mutate();
    },
    [
      infiniteKey,
      cache$1
    ]
  );
  const setSize = (0, import_react.useCallback)(
    (arg) => {
      if (!infiniteKey)
        return EMPTY_PROMISE;
      const [, changeSize] = createCacheHelper(cache$1, infiniteKey);
      let size;
      if (isFunction(arg)) {
        size = arg(resolvePageSize());
      } else if (typeof arg == "number") {
        size = arg;
      }
      if (typeof size != "number")
        return EMPTY_PROMISE;
      changeSize({
        _l: size
      });
      lastPageSizeRef.current = size;
      const data = [];
      const [getInfiniteCache] = createCacheHelper(cache$1, infiniteKey);
      let previousPageData = null;
      for (let i = 0; i < size; ++i) {
        const [pageKey] = serialize(getKey(i, previousPageData));
        const [getCache] = createCacheHelper(cache$1, pageKey);
        const pageData = pageKey ? getCache().data : UNDEFINED;
        if (isUndefined(pageData)) {
          return mutate(getInfiniteCache().data);
        }
        data.push(pageData);
        previousPageData = pageData;
      }
      return mutate(data);
    },
    [
      infiniteKey,
      cache$1,
      mutate,
      resolvePageSize
    ]
  );
  return {
    size: resolvePageSize(),
    setSize,
    mutate,
    get data() {
      return swr.data;
    },
    get error() {
      return swr.error;
    },
    get isValidating() {
      return swr.isValidating;
    },
    get isLoading() {
      return swr.isLoading;
    }
  };
};
var useSWRInfinite = withMiddleware(useSWR, infinite);
export {
  useSWRInfinite as default,
  infinite,
  unstable_serialize
};
//# sourceMappingURL=swr_infinite.js.map

import {
  useSWR
} from "/vendor/.vite-deps-chunk-RZ476SWQ.js__v--e5be5ac4.js";
import {
  withMiddleware
} from "/vendor/.vite-deps-chunk-3ECAJYTF.js__v--e5be5ac4.js";
import "/vendor/.vite-deps-chunk-4C4BNMBI.js__v--e5be5ac4.js";
import "/vendor/.vite-deps-chunk-C7VZVCY4.js__v--e5be5ac4.js";
import "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--e5be5ac4.js";

// ../../../node_modules/swr/immutable/dist/index.esm.js
var immutable = (useSWRNext) => (key, fetcher, config) => {
  config.revalidateOnFocus = false;
  config.revalidateIfStale = false;
  config.revalidateOnReconnect = false;
  return useSWRNext(key, fetcher, config);
};
var useSWRImmutable = withMiddleware(useSWR, immutable);
export {
  useSWRImmutable as default,
  immutable
};
//# sourceMappingURL=swr_immutable.js.map

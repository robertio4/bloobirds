import {
  useSWR
} from "/vendor/.vite-deps-chunk-RZ476SWQ.js__v--372537c1.js";
import {
  IS_REACT_LEGACY,
  UNDEFINED,
  getTimestamp,
  mergeObjects,
  serialize,
  useIsomorphicLayoutEffect,
  useSWRConfig,
  withMiddleware
} from "/vendor/.vite-deps-chunk-3ECAJYTF.js__v--372537c1.js";
import "/vendor/.vite-deps-chunk-4C4BNMBI.js__v--372537c1.js";
import {
  require_react
} from "/vendor/.vite-deps-chunk-C7VZVCY4.js__v--372537c1.js";
import {
  __toESM
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--372537c1.js";

// ../../../node_modules/swr/mutation/dist/index.esm.js
var import_react = __toESM(require_react());
var startTransition = IS_REACT_LEGACY ? import_react.default.startTransition : (cb) => {
  cb();
};
var useStateWithDeps = (state) => {
  const [, rerender] = (0, import_react.useState)({});
  const unmountedRef = (0, import_react.useRef)(false);
  const stateRef = (0, import_react.useRef)(state);
  const stateDependenciesRef = (0, import_react.useRef)({
    data: false,
    error: false,
    isValidating: false
  });
  const setState = (0, import_react.useCallback)((payload) => {
    let shouldRerender = false;
    const currentState = stateRef.current;
    for (const _ in payload) {
      const k = _;
      if (currentState[k] !== payload[k]) {
        currentState[k] = payload[k];
        if (stateDependenciesRef.current[k]) {
          shouldRerender = true;
        }
      }
    }
    if (shouldRerender && !unmountedRef.current) {
      rerender({});
    }
  }, []);
  useIsomorphicLayoutEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  });
  return [
    stateRef,
    stateDependenciesRef.current,
    setState
  ];
};
var mutation = () => (key, fetcher, config = {}) => {
  const { mutate } = useSWRConfig();
  const keyRef = (0, import_react.useRef)(key);
  const fetcherRef = (0, import_react.useRef)(fetcher);
  const configRef = (0, import_react.useRef)(config);
  const ditchMutationsUntilRef = (0, import_react.useRef)(0);
  const [stateRef, stateDependencies, setState] = useStateWithDeps({
    data: UNDEFINED,
    error: UNDEFINED,
    isMutating: false
  });
  const currentState = stateRef.current;
  const trigger = (0, import_react.useCallback)(
    async (arg, opts) => {
      const [serializedKey, resolvedKey] = serialize(keyRef.current);
      if (!fetcherRef.current) {
        throw new Error("Can\u2019t trigger the mutation: missing fetcher.");
      }
      if (!serializedKey) {
        throw new Error("Can\u2019t trigger the mutation: missing key.");
      }
      const options = mergeObjects(mergeObjects({
        populateCache: false,
        throwOnError: true
      }, configRef.current), opts);
      const mutationStartedAt = getTimestamp();
      ditchMutationsUntilRef.current = mutationStartedAt;
      setState({
        isMutating: true
      });
      try {
        const data = await mutate(
          serializedKey,
          fetcherRef.current(resolvedKey, {
            arg
          }),
          mergeObjects(options, {
            throwOnError: true
          })
        );
        if (ditchMutationsUntilRef.current <= mutationStartedAt) {
          var _options_onSuccess, _options;
          startTransition(() => setState({
            data,
            isMutating: false,
            error: void 0
          }));
          (_options_onSuccess = (_options = options).onSuccess) == null ? void 0 : _options_onSuccess.call(_options, data, serializedKey, options);
        }
        return data;
      } catch (error) {
        if (ditchMutationsUntilRef.current <= mutationStartedAt) {
          var _options_onError, _options1;
          startTransition(() => setState({
            error,
            isMutating: false
          }));
          (_options_onError = (_options1 = options).onError) == null ? void 0 : _options_onError.call(_options1, error, serializedKey, options);
          if (options.throwOnError) {
            throw error;
          }
        }
      }
    },
    []
  );
  const reset = (0, import_react.useCallback)(() => {
    ditchMutationsUntilRef.current = getTimestamp();
    setState({
      data: UNDEFINED,
      error: UNDEFINED,
      isMutating: false
    });
  }, []);
  useIsomorphicLayoutEffect(() => {
    keyRef.current = key;
    fetcherRef.current = fetcher;
    configRef.current = config;
  });
  return {
    trigger,
    reset,
    get data() {
      stateDependencies.data = true;
      return currentState.data;
    },
    get error() {
      stateDependencies.error = true;
      return currentState.error;
    },
    get isMutating() {
      stateDependencies.isMutating = true;
      return currentState.isMutating;
    }
  };
};
var useSWRMutation = withMiddleware(useSWR, mutation);
export {
  useSWRMutation as default
};
//# sourceMappingURL=swr_mutation.js.map

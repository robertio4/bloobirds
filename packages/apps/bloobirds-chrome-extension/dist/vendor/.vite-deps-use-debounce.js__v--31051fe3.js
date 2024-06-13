import {
  require_react
} from "/vendor/.vite-deps-chunk-C7VZVCY4.js__v--3e3c5e33.js";
import {
  __toESM
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--3e3c5e33.js";

// ../../../node_modules/use-debounce/esm/useDebounce.js
var import_react2 = __toESM(require_react());

// ../../../node_modules/use-debounce/esm/useDebouncedCallback.js
var import_react = __toESM(require_react());
function useDebouncedCallback(func, wait, options) {
  var _this = this;
  var lastCallTime = (0, import_react.useRef)(null);
  var lastInvokeTime = (0, import_react.useRef)(0);
  var timerId = (0, import_react.useRef)(null);
  var lastArgs = (0, import_react.useRef)([]);
  var lastThis = (0, import_react.useRef)();
  var result = (0, import_react.useRef)();
  var funcRef = (0, import_react.useRef)(func);
  var mounted = (0, import_react.useRef)(true);
  funcRef.current = func;
  var useRAF = !wait && wait !== 0 && typeof window !== "undefined";
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  wait = +wait || 0;
  options = options || {};
  var leading = !!options.leading;
  var trailing = "trailing" in options ? !!options.trailing : true;
  var maxing = "maxWait" in options;
  var maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : null;
  var invokeFunc = (0, import_react.useCallback)(function(time) {
    var args = lastArgs.current;
    var thisArg = lastThis.current;
    lastArgs.current = lastThis.current = null;
    lastInvokeTime.current = time;
    return result.current = funcRef.current.apply(thisArg, args);
  }, []);
  var startTimer = (0, import_react.useCallback)(function(pendingFunc, wait2) {
    if (useRAF)
      cancelAnimationFrame(timerId.current);
    timerId.current = useRAF ? requestAnimationFrame(pendingFunc) : setTimeout(pendingFunc, wait2);
  }, [useRAF]);
  var shouldInvoke = (0, import_react.useCallback)(function(time) {
    if (!mounted.current)
      return false;
    var timeSinceLastCall = time - lastCallTime.current;
    var timeSinceLastInvoke = time - lastInvokeTime.current;
    return !lastCallTime.current || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }, [maxWait, maxing, wait]);
  var trailingEdge = (0, import_react.useCallback)(function(time) {
    timerId.current = null;
    if (trailing && lastArgs.current) {
      return invokeFunc(time);
    }
    lastArgs.current = lastThis.current = null;
    return result.current;
  }, [invokeFunc, trailing]);
  var timerExpired = (0, import_react.useCallback)(function() {
    var time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    if (!mounted.current) {
      return;
    }
    var timeSinceLastCall = time - lastCallTime.current;
    var timeSinceLastInvoke = time - lastInvokeTime.current;
    var timeWaiting = wait - timeSinceLastCall;
    var remainingWait = maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    startTimer(timerExpired, remainingWait);
  }, [maxWait, maxing, shouldInvoke, startTimer, trailingEdge, wait]);
  var cancel = (0, import_react.useCallback)(function() {
    if (timerId.current) {
      useRAF ? cancelAnimationFrame(timerId.current) : clearTimeout(timerId.current);
    }
    lastInvokeTime.current = 0;
    lastArgs.current = lastCallTime.current = lastThis.current = timerId.current = null;
  }, [useRAF]);
  var flush = (0, import_react.useCallback)(function() {
    return !timerId.current ? result.current : trailingEdge(Date.now());
  }, [trailingEdge]);
  (0, import_react.useEffect)(function() {
    mounted.current = true;
    return function() {
      mounted.current = false;
    };
  }, []);
  var debounced = (0, import_react.useCallback)(function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var time = Date.now();
    var isInvoking = shouldInvoke(time);
    lastArgs.current = args;
    lastThis.current = _this;
    lastCallTime.current = time;
    if (isInvoking) {
      if (!timerId.current && mounted.current) {
        lastInvokeTime.current = lastCallTime.current;
        startTimer(timerExpired, wait);
        return leading ? invokeFunc(lastCallTime.current) : result.current;
      }
      if (maxing) {
        startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime.current);
      }
    }
    if (!timerId.current) {
      startTimer(timerExpired, wait);
    }
    return result.current;
  }, [invokeFunc, leading, maxing, shouldInvoke, startTimer, timerExpired, wait]);
  var pending = (0, import_react.useCallback)(function() {
    return !!timerId.current;
  }, []);
  var debouncedState = (0, import_react.useMemo)(function() {
    return {
      callback: debounced,
      cancel,
      flush,
      pending
    };
  }, [debounced, cancel, flush, pending]);
  return debouncedState;
}

// ../../../node_modules/use-debounce/esm/useDebounce.js
function valueEquality(left, right) {
  return left === right;
}
function adjustFunctionValueOfSetState(value) {
  return typeof value === "function" ? function() {
    return value;
  } : value;
}
function useStateIgnoreCallback(initialState) {
  var _a = (0, import_react2.useState)(adjustFunctionValueOfSetState(initialState)), state = _a[0], setState = _a[1];
  var setStateIgnoreCallback = (0, import_react2.useCallback)(function(value) {
    return setState(adjustFunctionValueOfSetState(value));
  }, []);
  return [state, setStateIgnoreCallback];
}
function useDebounce(value, delay, options) {
  var eq = options && options.equalityFn || valueEquality;
  var _a = useStateIgnoreCallback(value), state = _a[0], dispatch = _a[1];
  var debounced = useDebouncedCallback((0, import_react2.useCallback)(function(value2) {
    return dispatch(value2);
  }, [dispatch]), delay, options);
  var previousValue = (0, import_react2.useRef)(value);
  (0, import_react2.useEffect)(function() {
    if (!eq(previousValue.current, value)) {
      debounced.callback(value);
      previousValue.current = value;
    }
  }, [value, debounced, eq]);
  return [state, { cancel: debounced.cancel, pending: debounced.pending, flush: debounced.flush }];
}

// ../../../node_modules/use-debounce/esm/useThrottledCallback.js
function useThrottledCallback(func, wait, _a) {
  var _b = _a === void 0 ? {} : _a, _c = _b.leading, leading = _c === void 0 ? true : _c, _d = _b.trailing, trailing = _d === void 0 ? true : _d;
  return useDebouncedCallback(func, wait, {
    maxWait: wait,
    leading,
    trailing
  });
}
export {
  useDebounce,
  useDebouncedCallback,
  useThrottledCallback
};
//# sourceMappingURL=use-debounce.js.map

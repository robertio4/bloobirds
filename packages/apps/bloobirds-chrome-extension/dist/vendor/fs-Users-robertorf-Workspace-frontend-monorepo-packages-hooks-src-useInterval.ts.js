import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useCallback = __vite__cjsImport0_react["useCallback"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"];
const isFunction = (functionToCheck) => typeof functionToCheck === "function" && !!functionToCheck.constructor && !!functionToCheck.call && !!functionToCheck.apply;
const defaultOptions = {
  cancelOnUnmount: true
};
export const useInterval = (fn, milliseconds, targetId, options = defaultOptions) => {
  const opts = { ...defaultOptions, ...options || {} };
  const timeout = useRef();
  const callback = useRef(fn);
  const targetIdRef = useRef(targetId);
  const [isCleared, setIsCleared] = useState(false);
  const [firstCallDone, setFirstCallDone] = useState(false);
  useEffect(() => {
    if (isFunction(fn) && (!firstCallDone || targetIdRef.current !== targetId)) {
      clear();
      fn();
      setFirstCallDone(true);
    }
  }, [targetId]);
  const clear = useCallback(() => {
    if (timeout.current) {
      setIsCleared(true);
      clearInterval(timeout.current);
    }
  }, []);
  useEffect(() => {
    if (isFunction(fn)) {
      callback.current = fn;
    }
  }, [fn]);
  useEffect(() => {
    if (typeof milliseconds === "number") {
      timeout.current = setInterval(() => {
        callback.current();
      }, milliseconds);
    }
    return clear;
  }, [milliseconds]);
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
  return [isCleared, clear, resume];
};
export default useInterval;

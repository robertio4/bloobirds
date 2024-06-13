import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useCallback = __vite__cjsImport0_react["useCallback"];
export const useDebounceEffect = (effect, deps, delay) => {
  const callback = useCallback(effect, deps);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      callback(...deps);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
};

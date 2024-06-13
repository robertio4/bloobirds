import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useCallback = __vite__cjsImport0_react["useCallback"]; const useRef = __vite__cjsImport0_react["useRef"];
export const useDebouncedCallback = (func, wait, deps) => {
  const timeout = useRef();
  return useCallback(
    (...args) => {
      const later = () => {
        clearTimeout(timeout.current);
        func(...args);
      };
      clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait);
    },
    [func, wait, ...deps]
  );
};

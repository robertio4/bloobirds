import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport0_react["useRef"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useCallback = __vite__cjsImport0_react["useCallback"];
function keepPreviousResponse(useSWRNext) {
  return (key, fetcher, config) => {
    const laggyDataRef = useRef();
    const swr = useSWRNext(key, fetcher, config);
    useEffect(() => {
      if (swr.data !== void 0) {
        laggyDataRef.current = swr.data;
      }
    }, [swr.data]);
    const resetLaggy = useCallback(() => {
      laggyDataRef.current = void 0;
    }, []);
    const dataOrLaggyData = swr.data === void 0 ? laggyDataRef.current : swr.data;
    const isLagging = swr.data === void 0 && laggyDataRef.current !== void 0;
    return Object.assign({}, swr, {
      data: dataOrLaggyData,
      isLagging,
      resetLaggy
    });
  };
}
export { keepPreviousResponse };

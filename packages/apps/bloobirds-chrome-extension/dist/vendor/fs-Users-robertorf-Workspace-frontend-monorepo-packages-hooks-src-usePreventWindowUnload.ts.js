import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"];
export const usePreventWindowUnload = (preventUnload) => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      return true;
    };
    if (preventUnload) {
      window.onbeforeunload = handleBeforeUnload;
    } else {
      window.onbeforeunload = null;
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, [preventUnload]);
};

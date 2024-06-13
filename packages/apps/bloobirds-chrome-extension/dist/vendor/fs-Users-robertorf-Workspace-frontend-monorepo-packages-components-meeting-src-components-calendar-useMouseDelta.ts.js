import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useCallback = __vite__cjsImport0_react["useCallback"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"];
export const useMouseDelta = () => {
  const [result, setResult] = useState(0);
  const dragging = useRef(false);
  const previousClientY = useRef(0);
  const element = useRef(null);
  const initialPosition = useRef(0);
  const handleMouseMove = useCallback((e) => {
    if (!dragging.current) {
      return;
    }
    setResult((result2) => {
      const change = e.offsetY - previousClientY.current;
      if (Math.abs(change) < 180) {
        previousClientY.current = e.offsetY;
        return result2 + change;
      }
      return result2;
    });
  }, []);
  const handleMouseDown = useCallback((e) => {
    previousClientY.current = e.offsetY;
    initialPosition.current = e.offsetY;
    dragging.current = true;
    setResult(0);
  }, []);
  const handleMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);
  useEffect(() => {
    element?.current?.addEventListener("mousedown", handleMouseDown);
    element?.current?.addEventListener("mouseup", handleMouseUp);
    element?.current?.addEventListener("mousemove", handleMouseMove);
    return () => {
      element?.current?.removeEventListener("mousedown", handleMouseDown);
      element?.current?.removeEventListener("mouseup", handleMouseUp);
      element?.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseDown, handleMouseUp, handleMouseMove, element]);
  return { delta: result, ref: element, initialPosition: initialPosition.current };
};

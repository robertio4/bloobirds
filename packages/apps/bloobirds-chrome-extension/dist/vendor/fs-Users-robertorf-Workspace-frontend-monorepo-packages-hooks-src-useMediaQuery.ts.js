import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];
export var minSizes = /* @__PURE__ */ ((minSizes2) => {
  minSizes2[minSizes2["DESKTOP_SMALL"] = 1024] = "DESKTOP_SMALL";
  minSizes2[minSizes2["DESKTOP_MEDIUM"] = 1280] = "DESKTOP_MEDIUM";
  minSizes2[minSizes2["DESKTOP_BIG"] = 1480] = "DESKTOP_BIG";
  minSizes2[minSizes2["DESKTOP"] = 1440] = "DESKTOP";
  return minSizes2;
})(minSizes || {});
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
export function useMediaQuery() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [isSmallDesktop, setIsSmallDesktop] = useState(
    getWindowDimensions().width < 1280 /* DESKTOP_MEDIUM */
  );
  const [isMediumDesktop, setIsMediumDesktop] = useState(
    1280 /* DESKTOP_MEDIUM */ <= getWindowDimensions().width && getWindowDimensions().width < 1480 /* DESKTOP_BIG */
  );
  const [isBigDesktop, setIsBigDesktop] = useState(
    1480 /* DESKTOP_BIG */ <= getWindowDimensions().width && getWindowDimensions().width < 1440 /* DESKTOP */
  );
  const [isDesktop, setIsDesktop] = useState(getWindowDimensions().width >= 1440 /* DESKTOP */);
  useEffect(() => {
    function handleResize() {
      const winDim = getWindowDimensions();
      setWindowDimensions(winDim);
      setIsSmallDesktop(winDim.width < 1280 /* DESKTOP_MEDIUM */);
      setIsMediumDesktop(
        1280 /* DESKTOP_MEDIUM */ <= winDim.width && winDim.width < 1480 /* DESKTOP_BIG */
      );
      setIsBigDesktop(1480 /* DESKTOP_BIG */ <= winDim.width && winDim.width < 1440 /* DESKTOP */);
      setIsDesktop(winDim.width >= 1440 /* DESKTOP */);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return { windowDimensions, isSmallDesktop, isMediumDesktop, isBigDesktop, isDesktop };
}

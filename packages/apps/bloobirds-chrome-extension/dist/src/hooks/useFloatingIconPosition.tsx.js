var _s = $RefreshSig$();
import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useCallback = __vite__cjsImport0_react["useCallback"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];
import { useEvent } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import __vite__cjsImport2_lodash_clamp from "/vendor/.vite-deps-lodash_clamp.js__v--641a58bc.js"; const clamp = __vite__cjsImport2_lodash_clamp.__esModule ? __vite__cjsImport2_lodash_clamp.default : __vite__cjsImport2_lodash_clamp;
import __vite__cjsImport3_lodash_debounce from "/vendor/.vite-deps-lodash_debounce.js__v--ce8d7378.js"; const debounce = __vite__cjsImport3_lodash_debounce.__esModule ? __vite__cjsImport3_lodash_debounce.default : __vite__cjsImport3_lodash_debounce;
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { getStyle } from "/src/content/components/extensionLeftBar/extensionLeftBar.utils.tsx.js";
const BUBBLE_ICON_SIZE = {
  width: 56,
  height: 40
};
const LIMIT = 50;
const getBounds = () => ({
  left: document.documentElement.clientWidth - BUBBLE_ICON_SIZE.width,
  right: document.documentElement.clientWidth - BUBBLE_ICON_SIZE.width,
  top: 0,
  bottom: window.innerHeight - BUBBLE_ICON_SIZE.height
});
const defaultValue = {
  x: document.documentElement.clientWidth - BUBBLE_ICON_SIZE.width,
  y: window.innerHeight / 2 - BUBBLE_ICON_SIZE.height / 2
};
const clampPosition = (position) => ({
  x: document.documentElement.clientWidth - BUBBLE_ICON_SIZE.width,
  y: clamp(position.y, LIMIT, window.innerHeight - BUBBLE_ICON_SIZE.height - LIMIT)
});
const storeBubblePosition = debounce((position) => {
  return localStorage.setItem("bubbleIconPosition", JSON.stringify(position));
});
const getStoredBubblePosition = () => {
  return clampPosition(JSON.parse(localStorage.getItem("bubbleIconPosition")) || defaultValue);
};
export const useFloatingIconPosition = () => {
  _s();
  const {
    useGetCurrentPage
  } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const [position, setPosition] = useState(getStoredBubblePosition());
  const [dimensions, setDimensions] = useState(getStyle(currentPage));
  const [bounds, setBounds] = useState(getBounds());
  const updatePosition = useCallback(({
    x,
    y
  }) => {
    const position2 = clampPosition({
      x,
      y
    });
    setPosition(position2);
  }, []);
  useEvent("resize", () => {
    setBounds(getBounds());
    const clampedPosition = clampPosition(position);
    setPosition({
      ...clampedPosition
    });
    storeBubblePosition({
      ...clampedPosition
    });
    setDimensions(getStyle(currentPage));
  });
  useEffect(() => {
    setBounds(getBounds());
    const storedPosition = getStoredBubblePosition();
    updatePosition({
      ...storedPosition
    });
    setTimeout(() => {
      const storedPosition2 = getStoredBubblePosition();
      updatePosition({
        ...storedPosition2
      });
    }, 1e3);
  }, [currentPage]);
  useEffect(() => {
    if (position) {
      storeBubblePosition(position);
    }
  }, [position]);
  return {
    bounds,
    dimensions,
    position,
    setPosition: updatePosition
  };
};
_s(useFloatingIconPosition, "zS+muWmr5dh4Wg/1Eh+foeVupIk=", true, function() {
  return [useExtensionContext, useEvent];
});

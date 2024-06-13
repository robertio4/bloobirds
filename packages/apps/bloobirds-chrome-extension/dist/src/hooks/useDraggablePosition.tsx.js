var _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useCallback = __vite__cjsImport0_react["useCallback"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];
import { useEvent } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import __vite__cjsImport2_lodash_clamp from "/vendor/.vite-deps-lodash_clamp.js__v--641a58bc.js"; const clamp = __vite__cjsImport2_lodash_clamp.__esModule ? __vite__cjsImport2_lodash_clamp.default : __vite__cjsImport2_lodash_clamp;
const clampPosition = (position) => {
  return {
    x: clamp(position.x, position.initialPadding, window.innerWidth - position.initialPadding),
    y: clamp(position.y, position.initialPadding, window.innerHeight - position.initialPadding),
    corrected: position.corrected
  };
};
function useBubbleBounds(id, size, initialPadding) {
  _s();
  const [bounds, setBounds] = useState({
    left: initialPadding,
    right: window.innerWidth - size.width - initialPadding,
    top: initialPadding,
    bottom: window.innerHeight - size.height - initialPadding
  });
  useEffect(() => {
    setBounds({
      left: initialPadding,
      right: window.innerWidth - size.width - initialPadding,
      top: initialPadding,
      bottom: window.innerHeight - size.height - initialPadding
    });
  }, [size.width, size.height]);
  useEvent("resize", () => {
    setBounds({
      left: initialPadding,
      right: window.innerWidth - size.width - initialPadding,
      top: initialPadding,
      bottom: window.innerHeight - size.height - initialPadding
    });
  });
  return bounds;
}
_s(useBubbleBounds, "aJPqKm4AAdbUWmKV+mSO/x/qJak=", false, function() {
  return [useEvent];
});
export function useDraggablePosition(id, size, initialPadding, location, defaultPadding) {
  _s2();
  const isBubble = location === "bubble";
  const selector = isBubble ? "#floating-menu" : "#bb-left-bar";
  const rect = document.querySelector(selector)?.getBoundingClientRect();
  const locationBubblePosition = {
    x: rect?.left > 370 ? rect?.left - 319 - defaultPadding : rect?.right - 1 + defaultPadding,
    y: rect?.top,
    corrected: true
  };
  const locationLeftBarPosition = {
    x: rect?.right,
    y: rect?.top,
    corrected: true
  };
  const defaultPosition = location === "bubble" ? locationBubblePosition : locationLeftBarPosition;
  const [position, setPosition] = useState(defaultPosition || {
    x: window.innerWidth - size.width - initialPadding,
    y: window.innerHeight - size.height - initialPadding,
    corrected: true
  });
  const bounds = useBubbleBounds(id, size, 12);
  useEvent("resize", () => {
    const clampedPosition = clampPosition(position);
    setPosition(clampedPosition);
  });
  useEffect(() => {
    const overflowsRight = position.x + size.width > window.innerWidth + initialPadding;
    const overflowsBottom = position.y + size.height > window.innerHeight + initialPadding;
    const x = overflowsRight ? window.innerWidth - size.width - initialPadding : position.x;
    const y = overflowsBottom ? window.innerHeight - size.height - initialPadding : position.y;
    setPosition({
      x,
      y,
      corrected: overflowsBottom || overflowsRight
    });
  }, []);
  const updatePosition = useCallback(({
    x,
    y
  }) => {
    const position2 = clampPosition({
      x,
      y,
      corrected: false,
      initialPadding
    });
    setPosition(position2);
  }, []);
  return {
    position,
    setPosition: updatePosition,
    bounds
  };
}
_s2(useDraggablePosition, "Bu7wRRFkYC0ZQ/UEXs1UJlqyTuY=", false, function() {
  return [useBubbleBounds, useEvent];
});

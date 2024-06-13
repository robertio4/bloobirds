var _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useCallback = __vite__cjsImport0_react["useCallback"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import { useEvent } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import __vite__cjsImport2_lodash_clamp from "/vendor/.vite-deps-lodash_clamp.js__v--641a58bc.js"; const clamp = __vite__cjsImport2_lodash_clamp.__esModule ? __vite__cjsImport2_lodash_clamp.default : __vite__cjsImport2_lodash_clamp;
import __vite__cjsImport3_lodash_debounce from "/vendor/.vite-deps-lodash_debounce.js__v--ce8d7378.js"; const debounce = __vite__cjsImport3_lodash_debounce.__esModule ? __vite__cjsImport3_lodash_debounce.default : __vite__cjsImport3_lodash_debounce;
const defaultValue = {
  x: document.documentElement.clientWidth - 96,
  y: window.innerHeight - 96,
  corrected: false
};
const padding = 12;
export const OPEN_BUBBLE_SIZE = {
  width: 319,
  height: 635
};
const clampPosition = (position) => {
  return {
    x: clamp(position.x, padding, document.documentElement.clientWidth - padding),
    y: clamp(position.y, padding, window.innerHeight - padding),
    corrected: true
  };
};
const storeBubblePosition = debounce((position) => {
  chrome.storage?.sync?.set({
    bubblePosition: position
  });
}, 1e3);
const getStoredBubblePosition = () => {
  return new Promise((resolve) => {
    resolve(defaultValue);
  });
};
function useBubbleBounds(size) {
  _s();
  const [bounds, setBounds] = useState({
    left: padding,
    right: document.documentElement.clientWidth - size.width - padding,
    top: padding,
    bottom: window.innerHeight - size.height - padding
  });
  useEffect(() => {
    setBounds({
      left: padding,
      right: document.documentElement.clientWidth - size.width - padding,
      top: padding,
      bottom: window.innerHeight - size.height - padding
    });
  }, [size.width, size.height]);
  useEvent("resize", () => {
    setBounds({
      left: padding,
      right: document.documentElement.clientWidth - size.width - padding,
      top: padding,
      bottom: window.innerHeight - size.height - padding
    });
  });
  return bounds;
}
_s(useBubbleBounds, "um8vgKkRL6Au/eQJM7OZ5cLKvRg=", false, function() {
  return [useEvent];
});
export function useBubblePosition() {
  _s2();
  const size = OPEN_BUBBLE_SIZE;
  const [position, setPosition] = useState(null);
  const [lastBubblePosition, setLastBubblePosition] = useState(null);
  const [storedPositionLoaded, setStoredPositionLoaded] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const bounds = useBubbleBounds(size);
  const {
    right: overflowsRight,
    bottom: overflowsBottom,
    left: overflowsLeft,
    top: overflowsTop
  } = useMemo(() => {
    return {
      right: position?.x + size.width + padding > document.documentElement.clientWidth,
      bottom: position?.y + size.height + padding > window.innerHeight,
      top: position?.y < padding,
      left: position?.x < padding
    };
  }, [document.documentElement.clientWidth, window.innerHeight, position]);
  const getCorrectedPosition = () => {
    let {
      x,
      y
    } = position;
    if (overflowsRight) {
      x = document.documentElement.clientWidth - size.width - padding;
    }
    if (overflowsBottom) {
      const windowMenuHeightDiff = window.innerHeight - size.height - padding;
      y = windowMenuHeightDiff > 0 ? windowMenuHeightDiff : padding;
    }
    if (overflowsLeft) {
      x = padding;
    }
    if (overflowsTop) {
      y = padding;
    }
    return {
      x,
      y,
      corrected: true
    };
  };
  useEffect(() => {
    getStoredBubblePosition().then((storedPosition) => {
      setPosition({
        ...storedPosition,
        corrected: false
      });
      setStoredPositionLoaded(true);
    });
  }, []);
  useEffect(() => {
    if (storedPositionLoaded) {
      setStoredPositionLoaded(false);
    }
  }, [storedPositionLoaded]);
  useEvent("resize", () => {
    const clampedPosition = clampPosition(position);
    setPosition({
      ...clampedPosition,
      corrected: false
    });
    setWidth(window.innerWidth);
  });
  useEffect(() => {
    if (position) {
      let newPosition = position;
      if (!position.corrected) {
        const correctedPosition = getCorrectedPosition();
        setPosition(correctedPosition);
        newPosition = correctedPosition;
      }
      setLastBubblePosition(newPosition);
      storeBubblePosition(newPosition);
    }
  }, [position]);
  useEffect(() => {
    if (lastBubblePosition) {
      setPosition({
        ...lastBubblePosition,
        corrected: false
      });
    }
  }, []);
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
  return {
    position,
    setPosition: updatePosition,
    bounds,
    width
  };
}
_s2(useBubblePosition, "ef4cO+rp9zpB12PtThptJ6/Kg0c=", false, function() {
  return [useBubbleBounds, useEvent];
});

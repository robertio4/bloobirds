var _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useCallback = __vite__cjsImport0_react["useCallback"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];
import { useEvent } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import { useActiveUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { appHostnames } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport4_lodash_clamp from "/vendor/.vite-deps-lodash_clamp.js__v--641a58bc.js"; const clamp = __vite__cjsImport4_lodash_clamp.__esModule ? __vite__cjsImport4_lodash_clamp.default : __vite__cjsImport4_lodash_clamp;
import __vite__cjsImport5_lodash_debounce from "/vendor/.vite-deps-lodash_debounce.js__v--ce8d7378.js"; const debounce = __vite__cjsImport5_lodash_debounce.__esModule ? __vite__cjsImport5_lodash_debounce.default : __vite__cjsImport5_lodash_debounce;
const defaultValue = {
  x: 96,
  y: window.innerHeight - 96,
  corrected: false
};
const initialValue = {
  x: -100,
  y: -100,
  corrected: true
};
const padding = 12;
const closedMenuSize = {
  width: 60,
  height: 60
};
const openMenuSize = {
  width: 320,
  height: 640
};
const astrolineSize = {
  width: 320,
  height: 510
};
const clampPosition = (position) => {
  return {
    x: clamp(position.x, padding, window.innerWidth - padding),
    y: clamp(position.y, padding, window.innerHeight - padding),
    corrected: position.corrected
  };
};
const storeBubblePosition = debounce((position) => {
  if (appHostnames.includes(window.location.hostname) || window.location.hostname.includes("bloobirds-platform-frontend.pages.dev")) {
    return localStorage.setItem("dialerPosition", JSON.stringify(position));
  } else if (chrome) {
    chrome.storage?.sync?.set({
      dialerPosition: position
    });
  }
}, 1e3);
const getStoredBubblePosition = () => {
  if (appHostnames.includes(window.location.hostname) || window.location.hostname.includes("bloobirds-platform-frontend.pages.dev")) {
    const position = JSON.parse(localStorage.getItem("dialerPosition")) || defaultValue;
    return Promise.resolve(clampPosition(position));
  }
  if (!chrome.storage) {
    return new Promise((resolve) => {
      resolve(defaultValue);
    });
  }
  return new Promise((resolve) => {
    chrome.storage?.sync?.get("dialerPosition", ({
      bubblePosition
    }) => {
      const position = bubblePosition || defaultValue;
      resolve(clampPosition(position));
    });
  });
};
function useBubbleBounds(size) {
  _s();
  const [bounds, setBounds] = useState({
    left: padding,
    right: window.innerWidth - size.width - padding,
    top: padding,
    bottom: window.innerHeight - size.height - padding
  });
  useEffect(() => {
    setBounds({
      left: padding,
      right: window.innerWidth - size.width - padding,
      top: padding,
      bottom: window.innerHeight - size.height - padding
    });
  }, [size.width, size.height]);
  useEvent("resize", () => {
    setBounds({
      left: padding,
      right: window.innerWidth - size.width - padding,
      top: padding,
      bottom: window.innerHeight - size.height - padding
    });
  });
  return bounds;
}
_s(useBubbleBounds, "roW8+WbM7h72Mnyvb/hDhKK2Ujs=", false, function() {
  return [useEvent];
});
export function useDialerPosition(open) {
  _s2();
  const {
    settings
  } = useActiveUserSettings();
  const {
    user: {
      dialerType
    }
  } = settings;
  const size = open ? dialerType === "ASTROLINE_DIALER" ? astrolineSize : openMenuSize : closedMenuSize;
  const [position, setPosition] = useState(initialValue);
  const [lastBubblePosition, setLastBubblePosition] = useState(initialValue);
  const [storedPositionLoaded, setStoredPositionLoaded] = useState(false);
  const bounds = useBubbleBounds(size);
  useEffect(() => {
    getStoredBubblePosition().then((storedPosition) => {
      setPosition(storedPosition);
      setLastBubblePosition(storedPosition);
      setStoredPositionLoaded(true);
    });
  }, []);
  useEvent("resize", () => {
    const clampedPosition = clampPosition(position);
    setLastBubblePosition(clampedPosition);
    setPosition(clampedPosition);
  });
  useEffect(() => {
    if (!storedPositionLoaded) {
      return;
    }
    if (open) {
      const overflowsRight = position.x + size.width > window.innerWidth + padding;
      const overflowsBottom = position.y + size.height > window.innerHeight + padding;
      const x = overflowsRight ? window.innerWidth - size.width - padding : position.x;
      const y = overflowsBottom ? window.innerHeight - size.height - padding : position.y;
      setPosition({
        x,
        y,
        corrected: overflowsBottom || overflowsRight
      });
    } else {
      setPosition(lastBubblePosition);
    }
  }, [open, storedPositionLoaded]);
  useEffect(() => {
    if (open && !position.corrected) {
      setLastBubblePosition(position);
    }
  }, [open, position]);
  useEffect(() => {
    if (!storedPositionLoaded) {
      return;
    }
    if (!open) {
      setLastBubblePosition(position);
      storeBubblePosition(position);
    }
  }, [position, open, storedPositionLoaded]);
  const updatePosition = useCallback(({
    x,
    y
  }) => {
    const position2 = clampPosition({
      x,
      y,
      corrected: false
    });
    setPosition(position2);
  }, []);
  return {
    position,
    setPosition: updatePosition,
    bounds
  };
}
_s2(useDialerPosition, "9rr/RYEhIHbukbdNDmiOhSLg4QY=", false, function() {
  return [useActiveUserSettings, useBubbleBounds, useEvent];
});

import {
  Button
} from "/vendor/.vite-deps-chunk-SCBHOABJ.js__v--e5be5ac4.js";
import {
  collapseSelection,
  createComponentAs,
  createElementAs,
  createPluginFactory,
  createStore,
  findNode,
  focusEditor,
  getAboveNode,
  getEditorString,
  getEndPoint,
  getNextNodeStartPoint,
  getNode,
  getNodeLeaf,
  getNodeProps,
  getNodeString,
  getPluginOptions,
  getPluginType,
  getPreviousNodeEndPoint,
  getRangeBefore,
  getRangeFromBlockStart,
  getStartPoint,
  insertElements,
  insertNodes,
  isCollapsed,
  isDefined,
  isElement,
  isEndPoint,
  isExpanded,
  isRangeAcrossBlocks,
  isStartPoint,
  isUrl,
  mergeProps,
  mockPlugin,
  removeNodes,
  replaceNodeChildren,
  select,
  setElements,
  setNodes,
  someNode,
  splitNodes,
  toDOMRange,
  unwrapNodes,
  useComposedRef,
  useEditorRef,
  useElementProps,
  useHotkeys,
  useOnClickOutside,
  usePlateSelection,
  usePlateSelectors,
  withoutNormalizing,
  wrapNodes
} from "/vendor/.vite-deps-chunk-VXUBDW42.js__v--e5be5ac4.js";
import {
  useFocused
} from "/vendor/.vite-deps-chunk-L54R4363.js__v--e5be5ac4.js";
import {
  Path
} from "/vendor/.vite-deps-chunk-ZSYTCF3U.js__v--e5be5ac4.js";
import {
  require_react_dom
} from "/vendor/.vite-deps-chunk-3UKJDGBQ.js__v--e5be5ac4.js";
import {
  require_react
} from "/vendor/.vite-deps-chunk-C7VZVCY4.js__v--e5be5ac4.js";
import {
  __toESM
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--e5be5ac4.js";

// ../../../node_modules/@udecode/plate-normalizers/dist/index.es.js
var withNormalizeTypes = (editor, {
  options: {
    rules,
    onError
  }
}) => {
  const {
    normalizeNode
  } = editor;
  editor.normalizeNode = ([currentNode, currentPath]) => {
    if (!currentPath.length) {
      const endCurrentNormalizationPass = rules.some(({
        strictType,
        type,
        path
      }) => {
        const node = getNode(editor, path);
        if (node) {
          if (strictType && isElement(node) && node.type !== strictType) {
            setElements(editor, {
              type: strictType
            }, {
              at: path
            });
            return true;
          }
        } else {
          try {
            insertElements(editor, {
              type: strictType !== null && strictType !== void 0 ? strictType : type,
              children: [{
                text: ""
              }]
            }, {
              at: path
            });
            return true;
          } catch (err) {
            onError === null || onError === void 0 ? void 0 : onError(err);
          }
        }
        return false;
      });
      if (endCurrentNormalizationPass) {
        return;
      }
    }
    return normalizeNode([currentNode, currentPath]);
  };
  return editor;
};
var KEY_NORMALIZE_TYPES = "normalizeTypes";
var createNormalizeTypesPlugin = createPluginFactory({
  key: KEY_NORMALIZE_TYPES,
  withOverrides: withNormalizeTypes,
  options: {
    rules: []
  }
});
var isArray = Array.isArray;
var isArray_1 = isArray;
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray_1(value) ? value : [value];
}
var castArray_1 = castArray;
var withRemoveEmptyNodes = (editor, {
  options: {
    types: _types
  }
}) => {
  const types = castArray_1(_types);
  const {
    normalizeNode
  } = editor;
  editor.normalizeNode = ([node, path]) => {
    if (isElement(node) && node.type && types.includes(node.type) && getNodeString(node) === "") {
      removeNodes(editor, {
        at: path
      });
      return;
    }
    normalizeNode([node, path]);
  };
  return editor;
};
var createRemoveEmptyNodesPlugin = createPluginFactory({
  key: "removeEmptyNodes",
  withOverrides: withRemoveEmptyNodes
});

// ../../../node_modules/@udecode/plate-link/dist/index.es.js
var React = __toESM(require_react());
var import_react = __toESM(require_react());
var ReactDOM = __toESM(require_react_dom());
var createLinkNode = (editor, {
  url,
  text = "",
  target,
  children
}) => {
  const type = getPluginType(editor, ELEMENT_LINK);
  return {
    type,
    url,
    target,
    children: children !== null && children !== void 0 ? children : [{
      text
    }]
  };
};
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var LaunchIcon = (props) => import_react.default.createElement("svg", _extends({
  viewBox: "0 0 24 24",
  focusable: "false",
  role: "img",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg"
}, props), import_react.default.createElement("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}), import_react.default.createElement("path", {
  d: "M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
}));
var useLink = (props) => {
  const _props = useElementProps({
    ...props,
    elementToAttributes: (element) => ({
      href: element.url,
      target: element.target
    })
  });
  return {
    ..._props,
    onMouseOver: (e) => {
      e.stopPropagation();
    }
  };
};
var LinkRoot = createComponentAs((props) => {
  const htmlProps = useLink(props);
  return createElementAs("a", htmlProps);
});
var Link = {
  Root: LinkRoot
};
var LinkIcon = (props) => import_react.default.createElement("svg", _extends({
  viewBox: "0 0 24 24",
  focusable: "false",
  role: "img",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg"
}, props), import_react.default.createElement("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}), import_react.default.createElement("path", {
  d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
}));
var LinkOffIcon = (props) => import_react.default.createElement("svg", _extends({
  viewBox: "0 0 24 24",
  focusable: "false",
  role: "img",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg"
}, props), import_react.default.createElement("path", {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}), import_react.default.createElement("path", {
  d: "M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.43-.98 2.63-2.31 2.98l1.46 1.46C20.88 15.61 22 13.95 22 12c0-2.76-2.24-5-5-5zm-1 4h-2.19l2 2H16zM2 4.27l3.11 3.11A4.991 4.991 0 002 12c0 2.76 2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.59 1.21-2.9 2.76-3.07L8.73 11H8v2h2.73L13 15.27V17h1.73l4.01 4L20 19.74 3.27 3 2 4.27z"
}), import_react.default.createElement("path", {
  fill: "none",
  d: "M0 24V0"
}));
var ShortTextIcon = (props) => import_react.default.createElement("svg", _extends({
  viewBox: "0 0 24 24",
  focusable: "false",
  role: "img",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg"
}, props), import_react.default.createElement("rect", {
  width: 24,
  height: 24,
  fill: "none"
}), import_react.default.createElement("path", {
  d: "M4 9h16v2H4V9zm0 4h10v2H4v-2z"
}));
var floatingLinkStore = createStore("floatingLink")({
  openEditorId: null,
  mouseDown: false,
  updated: false,
  url: "",
  text: "",
  newTab: false,
  mode: "",
  isEditing: false
}).extendActions((set) => ({
  reset: () => {
    set.url("");
    set.text("");
    set.newTab(false);
    set.mode("");
    set.isEditing(false);
  }
})).extendActions((set) => ({
  show: (mode, editorId) => {
    set.mode(mode);
    set.isEditing(false);
    set.openEditorId(editorId);
  },
  hide: () => {
    set.openEditorId(null);
    set.reset();
  }
})).extendSelectors((state) => ({
  isOpen: (editorId) => state.openEditorId === editorId
}));
var floatingLinkActions = floatingLinkStore.set;
var floatingLinkSelectors = floatingLinkStore.get;
var useFloatingLinkSelectors = () => floatingLinkStore.use;
var triggerFloatingLinkEdit = (editor) => {
  const entry = findNode(editor, {
    match: {
      type: getPluginType(editor, ELEMENT_LINK)
    }
  });
  if (!entry)
    return;
  const [link, path] = entry;
  let text = getEditorString(editor, path);
  floatingLinkActions.url(link.url);
  floatingLinkActions.newTab(link.target === void 0);
  if (text === link.url) {
    text = "";
  }
  floatingLinkActions.text(text);
  floatingLinkActions.isEditing(true);
  return true;
};
var useFloatingLinkEditButton = (props) => {
  const editor = useEditorRef();
  return {
    onClick: (0, import_react.useCallback)(() => {
      triggerFloatingLinkEdit(editor);
    }, [editor]),
    ...props
  };
};
var FloatingLinkEditButton = createComponentAs((props) => {
  const htmlProps = useFloatingLinkEditButton(props);
  return createElementAs("button", htmlProps);
});
var useFloatingLinkNewTabInput = (props) => {
  const updated = useFloatingLinkSelectors().updated();
  const ref = (0, import_react.useRef)(null);
  const [checked, setChecked] = (0, import_react.useState)(floatingLinkSelectors.newTab());
  (0, import_react.useEffect)(() => {
    if (ref.current && updated) {
      setTimeout(() => {
        var _ref$current;
        (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.focus();
      }, 0);
    }
  }, [updated]);
  const onChange = (0, import_react.useCallback)((e) => {
    setChecked(e.target.checked);
    floatingLinkActions.newTab(e.target.checked);
  }, []);
  return mergeProps({
    onChange,
    checked,
    type: "checkbox"
  }, {
    ...props,
    ref: useComposedRef(props.ref, ref)
  });
};
var FloatingLinkNewTabInput = createComponentAs((props) => {
  const htmlProps = useFloatingLinkNewTabInput(props);
  return createElementAs("input", htmlProps);
});
var useFloatingLinkTextInput = (props) => {
  const onChange = (0, import_react.useCallback)((e) => {
    floatingLinkActions.text(e.target.value);
  }, []);
  return mergeProps({
    onChange,
    defaultValue: floatingLinkSelectors.text()
  }, props);
};
var FloatingLinkTextInput = createComponentAs((props) => {
  const htmlProps = useFloatingLinkTextInput(props);
  return createElementAs("input", htmlProps);
});
var useFloatingLinkUrlInput = (props) => {
  const updated = useFloatingLinkSelectors().updated();
  const ref = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (ref.current && updated) {
      setTimeout(() => {
        var _ref$current;
        (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.focus();
      }, 0);
    }
  }, [updated]);
  const onChange = (0, import_react.useCallback)((e) => {
    floatingLinkActions.url(e.target.value);
  }, []);
  return mergeProps({
    onChange,
    defaultValue: floatingLinkSelectors.url()
  }, {
    ...props,
    ref: useComposedRef(props.ref, ref)
  });
};
var FloatingLinkUrlInput = createComponentAs((props) => {
  const htmlProps = useFloatingLinkUrlInput(props);
  return createElementAs("input", htmlProps);
});
var useOpenLinkButton = (props) => {
  const editor = useEditorRef();
  const selection = usePlateSelection();
  const entry = (0, import_react.useMemo)(
    () => findNode(editor, {
      match: {
        type: getPluginType(editor, ELEMENT_LINK)
      }
    }),
    [editor, selection]
  );
  if (!entry) {
    return {};
  }
  const [link] = entry;
  return {
    "aria-label": "Open link in a new tab",
    target: "_blank",
    href: link.url,
    onMouseOver: (e) => {
      e.stopPropagation();
    },
    ...props
  };
};
var OpenLinkButton = createComponentAs((props) => {
  const htmlProps = useOpenLinkButton(props);
  return createElementAs("a", htmlProps);
});
var useUnlinkButton = (props) => {
  const editor = useEditorRef();
  return {
    onClick: (0, import_react.useCallback)(() => {
      unwrapLink(editor);
      focusEditor(editor, editor.selection);
    }, [editor]),
    ...props
  };
};
var UnlinkButton = createComponentAs((props) => {
  const htmlProps = useUnlinkButton(props);
  return createElementAs(Button, htmlProps);
});
var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === "function") {
  cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === "function") {
  cachedClearTimeout = clearTimeout;
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e2) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e2) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function() {
  this.fun.apply(null, this.array);
};
var title = "browser";
var platform$1 = "browser";
var browser = true;
var env = {};
var argv = [];
var version = "";
var versions = {};
var release = {};
var config = {};
function noop() {
}
var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;
function binding(name) {
  throw new Error("process.binding is not supported");
}
function cwd() {
  return "/";
}
function chdir(dir) {
  throw new Error("process.chdir is not supported");
}
function umask() {
  return 0;
}
var performance = global$1.performance || {};
var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
  return new Date().getTime();
};
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1e3;
}
var process = {
  nextTick,
  title,
  browser,
  env,
  argv,
  version,
  versions,
  on,
  addListener,
  once,
  off,
  removeListener,
  removeAllListeners,
  emit,
  binding,
  cwd,
  chdir,
  umask,
  hrtime,
  platform: platform$1,
  release,
  config,
  uptime
};
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "x" : "y";
}
function getLengthFromAxis(axis) {
  return axis === "y" ? "height" : "width";
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  const commonAlign = reference[length] / 2 - floating[length] / 2;
  const side = getSide(placement);
  const isVertical = mainAxis === "x";
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition$1 = async (reference, floating, config2) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config2;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  if ("development" !== "production") {
    if (platform2 == null) {
      console.error(["Floating UI: `platform` property was not passed to config. If you", "want to use Floating UI on the web, install @floating-ui/dom", "instead of the /core package. Otherwise, you can create your own", "`platform`: https://floating-ui.com/docs/platform"].join(" "));
    }
    if (middleware.filter((_ref) => {
      let {
        name
      } = _ref;
      return name === "autoPlacement" || name === "flip";
    }).length > 1) {
      throw new Error(["Floating UI: duplicate `flip` and/or `autoPlacement`", "middleware detected. This will lead to an infinite loop. Ensure only", "one of either has been passed to the `middleware` array."].join(" "));
    }
  }
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < middleware.length; i++) {
    const {
      name,
      fn
    } = middleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if ("development" !== "production") {
      if (resetCount > 50) {
        console.warn(["Floating UI: The middleware lifecycle appears to be running in an", "infinite loop. This is usually caused by a `reset` continually", "being returned without a break condition."].join(" "));
      }
    }
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getSideObjectFromPadding(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}
async function detectOverflow(middlewareArguments, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = middlewareArguments;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = options;
  const paddingObject = getSideObjectFromPadding(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: elementContext === "floating" ? {
      ...rects.floating,
      x,
      y
    } : rects.reference,
    offsetParent: await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating)),
    strategy
  }) : rects[elementContext]);
  return {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
}
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (matched) => hash$1[matched]);
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  let mainAlignmentSide = mainAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return {
    main: mainAlignmentSide,
    cross: getOppositePlacement(mainAlignmentSide)
  };
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (matched) => hash[matched]);
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(middlewareArguments) {
      var _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = middlewareArguments;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        flipAlignment = true,
        ...detectOverflowOptions
      } = options;
      const side = getSide(placement);
      const isBasePlacement = side === initialPlacement;
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const {
          main,
          cross
        } = getAlignmentSides(placement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
        overflows.push(overflow[main], overflow[cross]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip$, _middlewareData$flip2;
        const nextIndex = ((_middlewareData$flip$ = (_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) != null ? _middlewareData$flip$ : 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = "bottom";
        switch (fallbackStrategy) {
          case "bestFit": {
            var _overflowsData$map$so;
            const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0].placement;
            if (placement2) {
              resetPlacement = placement2;
            }
            break;
          }
          case "initialPlacement":
            resetPlacement = initialPlacement;
            break;
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(middlewareArguments, value) {
  const {
    placement,
    platform: platform2,
    elements
  } = middlewareArguments;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getMainAxisFromPlacement(placement) === "x";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = typeof value === "function" ? value(middlewareArguments) : value;
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(value) {
  if (value === void 0) {
    value = 0;
  }
  return {
    name: "offset",
    options: value,
    async fn(middlewareArguments) {
      const {
        x,
        y
      } = middlewareArguments;
      const diffCoords = await convertValueToCoords(middlewareArguments, value);
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }
  };
};
function isWindow(value) {
  return value && value.document && value.location && value.alert && value.setInterval;
}
function getWindow$1(node) {
  if (node == null) {
    return window;
  }
  if (!isWindow(node)) {
    const ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function getComputedStyle$1(element) {
  return getWindow$1(element).getComputedStyle(element);
}
function getNodeName(node) {
  return isWindow(node) ? "" : node ? (node.nodeName || "").toLowerCase() : "";
}
function getUAString() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands) {
    return uaData.brands.map((item) => item.brand + "/" + item.version).join(" ");
  }
  return navigator.userAgent;
}
function isHTMLElement(value) {
  return value instanceof getWindow$1(value).HTMLElement;
}
function isElement$1(value) {
  return value instanceof getWindow$1(value).Element;
}
function isNode(value) {
  return value instanceof getWindow$1(value).Node;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  const OwnElement = getWindow$1(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const isFirefox = /firefox/i.test(getUAString());
  const css = getComputedStyle$1(element);
  return css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].includes(css.willChange) || isFirefox && css.willChange === "filter" || isFirefox && (css.filter ? css.filter !== "none" : false);
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
var min = Math.min;
var max = Math.max;
var round = Math.round;
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  var _win$visualViewport$o, _win$visualViewport, _win$visualViewport$o2, _win$visualViewport2;
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  let scaleX = 1;
  let scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  const win = isElement$1(element) ? getWindow$1(element) : window;
  const addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  const x = (clientRect.left + (addVisualOffsets ? (_win$visualViewport$o = (_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) != null ? _win$visualViewport$o : 0 : 0)) / scaleX;
  const y = (clientRect.top + (addVisualOffsets ? (_win$visualViewport$o2 = (_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) != null ? _win$visualViewport$o2 : 0 : 0)) / scaleY;
  const width = clientRect.width / scaleX;
  const height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}
function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}
function getNodeScroll(element) {
  if (isElement$1(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function isScaled(element) {
  const rect = getBoundingClientRect(element);
  return round(rect.width) !== element.offsetWidth || round(rect.height) !== element.offsetHeight;
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const rect = getBoundingClientRect(
    element,
    isOffsetParentAnElement && isScaled(offsetParent),
    strategy === "fixed"
  );
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  return node.assignedSlot || node.parentNode || (isShadowRoot(node) ? node.host : null) || getDocumentElement(node);
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && !["html", "body"].includes(getNodeName(currentNode))) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  const window2 = getWindow$1(element);
  let offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getDimensions(element) {
  if (isHTMLElement(element)) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
  const rect = getBoundingClientRect(element);
  return {
    width: rect.width,
    height: rect.height
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    ...rect,
    x: rect.x - scroll.scrollLeft + offsets.x,
    y: rect.y - scroll.scrollTop + offsets.y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow$1(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  const width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  const height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (["html", "body", "#document"].includes(getNodeName(parentNode))) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list) {
  var _node$ownerDocument;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow$1(scrollableAncestor);
  const target = isBody ? [win].concat(win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []) : scrollableAncestor;
  const updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(getOverflowAncestors(target));
}
function contains(parent, child) {
  const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    do {
      if (next && parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, false, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  return {
    top,
    left,
    x: left,
    y: top,
    right: left + element.clientWidth,
    bottom: top + element.clientHeight,
    width: element.clientWidth,
    height: element.clientHeight
  };
}
function getClientRectFromClippingAncestor(element, clippingParent, strategy) {
  if (clippingParent === "viewport") {
    return rectToClientRect(getViewportRect(element, strategy));
  }
  if (isElement$1(clippingParent)) {
    return getInnerBoundingClientRect(clippingParent, strategy);
  }
  return rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingAncestors(element) {
  const clippingAncestors = getOverflowAncestors(element);
  const canEscapeClipping = ["absolute", "fixed"].includes(getComputedStyle$1(element).position);
  const clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement$1(clipperElement)) {
    return [];
  }
  return clippingAncestors.filter((clippingAncestors2) => isElement$1(clippingAncestors2) && contains(clippingAncestors2, clipperElement) && getNodeName(clippingAncestors2) !== "body");
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const mainClippingAncestors = boundary === "clippingAncestors" ? getClippingAncestors(element) : [].concat(boundary);
  const clippingAncestors = [...mainClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
var platform = {
  getClippingRect,
  convertOffsetParentRelativeRectToViewportRelativeRect,
  isElement: isElement$1,
  getDimensions,
  getOffsetParent,
  getDocumentElement,
  getElementRects: (_ref) => {
    let {
      reference,
      floating,
      strategy
    } = _ref;
    return {
      reference: getRectRelativeToOffsetParent(reference, getOffsetParent(floating), strategy),
      floating: {
        ...getDimensions(floating),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (element) => Array.from(element.getClientRects()),
  isRTL: (element) => getComputedStyle$1(element).direction === "rtl"
};
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll: _ancestorScroll = true,
    ancestorResize: _ancestorResize = true,
    elementResize = true,
    animationFrame = false
  } = options;
  const ancestorScroll = _ancestorScroll && !animationFrame;
  const ancestorResize = _ancestorResize && !animationFrame;
  const ancestors = ancestorScroll || ancestorResize ? [...isElement$1(reference) ? getOverflowAncestors(reference) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  let observer = null;
  if (elementResize) {
    let initialUpdate = true;
    observer = new ResizeObserver(() => {
      if (!initialUpdate) {
        update();
      }
      initialUpdate = false;
    });
    isElement$1(reference) && !animationFrame && observer.observe(reference);
    observer.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _observer;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    (_observer = observer) == null ? void 0 : _observer.disconnect();
    observer = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var computePosition = (reference, floating, options) => computePosition$1(reference, floating, {
  platform,
  ...options
});
var index$1 = typeof document !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length, i, keys;
  if (a && b && typeof a == "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function useLatestRef(value) {
  const ref = React.useRef(value);
  index$1(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating$1(_temp) {
  let {
    middleware,
    placement = "bottom",
    strategy = "absolute",
    whileElementsMounted
  } = _temp === void 0 ? {} : _temp;
  const reference = React.useRef(null);
  const floating = React.useRef(null);
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const cleanupRef = React.useRef(null);
  const [data, setData] = React.useState({
    x: null,
    y: null,
    strategy,
    placement,
    middlewareData: {}
  });
  const [latestMiddleware, setLatestMiddleware] = React.useState(middleware);
  if (!deepEqual(latestMiddleware == null ? void 0 : latestMiddleware.map((_ref) => {
    let {
      options
    } = _ref;
    return options;
  }), middleware == null ? void 0 : middleware.map((_ref2) => {
    let {
      options
    } = _ref2;
    return options;
  }))) {
    setLatestMiddleware(middleware);
  }
  const update = React.useCallback(() => {
    if (!reference.current || !floating.current) {
      return;
    }
    computePosition(reference.current, floating.current, {
      middleware: latestMiddleware,
      placement,
      strategy
    }).then((data2) => {
      if (isMountedRef.current) {
        ReactDOM.flushSync(() => {
          setData(data2);
        });
      }
    });
  }, [latestMiddleware, placement, strategy]);
  index$1(() => {
    if (isMountedRef.current) {
      update();
    }
  }, [update]);
  const isMountedRef = React.useRef(false);
  index$1(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  const runElementMountCallback = React.useCallback(() => {
    if (typeof cleanupRef.current === "function") {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    if (reference.current && floating.current) {
      if (whileElementsMountedRef.current) {
        const cleanupFn = whileElementsMountedRef.current(reference.current, floating.current, update);
        cleanupRef.current = cleanupFn;
      } else {
        update();
      }
    }
  }, [update, whileElementsMountedRef]);
  const setReference = React.useCallback((node) => {
    reference.current = node;
    runElementMountCallback();
  }, [runElementMountCallback]);
  const setFloating = React.useCallback((node) => {
    floating.current = node;
    runElementMountCallback();
  }, [runElementMountCallback]);
  const refs = React.useMemo(() => ({
    reference,
    floating
  }), []);
  return React.useMemo(() => ({
    ...data,
    update,
    refs,
    reference: setReference,
    floating: setFloating
  }), [data, update, refs, setReference, setFloating]);
}
var index = typeof document !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function createPubSub() {
  const map = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map.get(event)) == null ? void 0 : _map$get.forEach((handler) => handler(data));
    },
    on(event, listener) {
      map.set(event, [...map.get(event) || [], listener]);
    },
    off(event, listener) {
      map.set(event, (map.get(event) || []).filter((l) => l !== listener));
    }
  };
}
var FloatingTreeContext = React.createContext(null);
var useFloatingTree = () => React.useContext(FloatingTreeContext);
function getDocument(floating) {
  var _floating$ownerDocume;
  return (_floating$ownerDocume = floating == null ? void 0 : floating.ownerDocument) != null ? _floating$ownerDocume : document;
}
function getWindow(value) {
  var _getDocument$defaultV;
  return (_getDocument$defaultV = getDocument(value).defaultView) != null ? _getDocument$defaultV : window;
}
function isElement2(value) {
  return value ? value instanceof getWindow(value).Element : false;
}
function useFloating(_temp) {
  let {
    open = false,
    onOpenChange = () => {
    },
    whileElementsMounted,
    placement,
    middleware,
    strategy,
    nodeId
  } = _temp === void 0 ? {} : _temp;
  const tree = useFloatingTree();
  const domReferenceRef = React.useRef(null);
  const dataRef = React.useRef({});
  const events = React.useState(() => createPubSub())[0];
  const floating = useFloating$1({
    placement,
    middleware,
    strategy,
    whileElementsMounted
  });
  const refs = React.useMemo(() => ({
    ...floating.refs,
    domReference: domReferenceRef
  }), [floating.refs]);
  const context = React.useMemo(() => ({
    ...floating,
    refs,
    dataRef,
    nodeId,
    events,
    open,
    onOpenChange
  }), [floating, nodeId, events, open, onOpenChange, refs]);
  index(() => {
    const node = tree == null ? void 0 : tree.nodesRef.current.find((node2) => node2.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  const {
    reference
  } = floating;
  const setReference = React.useCallback((node) => {
    if (isElement2(node) || node === null) {
      context.refs.domReference.current = node;
    }
    reference(node);
  }, [reference, context.refs]);
  return React.useMemo(() => ({
    ...floating,
    context,
    refs,
    reference: setReference
  }), [floating, refs, context, setReference]);
}
var getDefaultBoundingClientRect = () => ({
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  top: -9999,
  left: -9999,
  right: 9999,
  bottom: 9999
});
var createVirtualElement = () => ({
  getBoundingClientRect: getDefaultBoundingClientRect
});
var getRangeBoundingClientRect = (editor, at) => {
  if (!at)
    return getDefaultBoundingClientRect();
  const domRange = toDOMRange(editor, at);
  if (!domRange)
    return getDefaultBoundingClientRect();
  return domRange.getBoundingClientRect();
};
var getSelectionBoundingClientRect = () => {
  const domSelection = window.getSelection();
  if (!domSelection || domSelection.rangeCount < 1) {
    return getDefaultBoundingClientRect();
  }
  const domRange = domSelection.getRangeAt(0);
  return domRange.getBoundingClientRect();
};
var useVirtualFloating = ({
  getBoundingClientRect: getBoundingClientRect2 = getSelectionBoundingClientRect,
  ...floatingOptions
}) => {
  const virtualElementRef = (0, import_react.useRef)(createVirtualElement());
  const [visible, setVisible] = (0, import_react.useState)(true);
  const floatingResult = useFloating({
    whileElementsMounted: autoUpdate,
    ...floatingOptions
  });
  const {
    reference,
    middlewareData,
    strategy,
    x,
    y,
    update
  } = floatingResult;
  (0, import_react.useLayoutEffect)(() => {
    virtualElementRef.current.getBoundingClientRect = getBoundingClientRect2;
  }, [getBoundingClientRect2, update]);
  (0, import_react.useLayoutEffect)(() => {
    reference(virtualElementRef.current);
  }, [reference]);
  (0, import_react.useLayoutEffect)(() => {
    if (!(middlewareData !== null && middlewareData !== void 0 && middlewareData.hide))
      return;
    const {
      referenceHidden
    } = middlewareData.hide;
    setVisible(!referenceHidden);
  }, [middlewareData.hide]);
  return {
    ...floatingResult,
    virtualElementRef,
    style: {
      position: strategy,
      top: y !== null && y !== void 0 ? y : 0,
      left: x !== null && x !== void 0 ? x : 0,
      display: floatingOptions.open === false ? "none" : void 0,
      visibility: !visible ? "hidden" : void 0
    }
  };
};
var submitFloatingLink = (editor) => {
  if (!editor.selection)
    return;
  const {
    isUrl: isUrl2,
    forceSubmit
  } = getPluginOptions(editor, ELEMENT_LINK);
  const url = floatingLinkSelectors.url();
  const isValid = (isUrl2 === null || isUrl2 === void 0 ? void 0 : isUrl2(url)) || forceSubmit;
  if (!isValid)
    return;
  const text = floatingLinkSelectors.text();
  const target = floatingLinkSelectors.newTab() ? void 0 : "_self";
  floatingLinkActions.hide();
  upsertLink(editor, {
    url,
    text,
    target,
    isUrl: (_url) => forceSubmit || !isUrl2 ? true : isUrl2(_url)
  });
  setTimeout(() => {
    focusEditor(editor, editor.selection);
  }, 0);
  return true;
};
var useFloatingLinkEnter = () => {
  const editor = useEditorRef();
  const open = useFloatingLinkSelectors().isOpen(editor.id);
  useHotkeys("*", (e) => {
    if (e.key !== "Enter")
      return;
    if (submitFloatingLink(editor)) {
      e.preventDefault();
    }
  }, {
    enabled: open,
    enableOnFormTags: ["INPUT"]
  }, []);
};
var useFloatingLinkEscape = () => {
  const editor = useEditorRef();
  const open = useFloatingLinkSelectors().isOpen(editor.id);
  useHotkeys("escape", (e) => {
    if (!floatingLinkSelectors.mode())
      return;
    e.preventDefault();
    if (floatingLinkSelectors.mode() === "edit" && floatingLinkSelectors.isEditing()) {
      floatingLinkActions.show("edit", editor.id);
      focusEditor(editor, editor.selection);
      return;
    }
    if (floatingLinkSelectors.mode() === "insert") {
      focusEditor(editor, editor.selection);
    }
    floatingLinkActions.hide();
  }, {
    enabled: open,
    enableOnFormTags: ["INPUT"],
    enableOnContentEditable: true
  }, []);
};
var useVirtualFloatingLink = ({
  editorId,
  ...floatingOptions
}) => {
  return useVirtualFloating({
    placement: "bottom-start",
    onOpenChange: (open) => floatingLinkActions.openEditorId(open ? editorId : null),
    middleware: [offset(12), flip({
      padding: 96
    })],
    ...floatingOptions
  });
};
var useFloatingLinkEdit = ({
  floatingOptions,
  ...props
}) => {
  const editor = useEditorRef();
  const keyEditor = usePlateSelectors().keyEditor();
  const mode = useFloatingLinkSelectors().mode();
  const open = useFloatingLinkSelectors().isOpen(editor.id);
  const {
    triggerFloatingLinkHotkeys
  } = getPluginOptions(editor, ELEMENT_LINK);
  const getBoundingClientRect2 = (0, import_react.useCallback)(() => {
    const entry = getAboveNode(editor, {
      match: {
        type: getPluginType(editor, ELEMENT_LINK)
      }
    });
    if (entry) {
      const [, path] = entry;
      return getRangeBoundingClientRect(editor, {
        anchor: getStartPoint(editor, path),
        focus: getEndPoint(editor, path)
      });
    }
    return getDefaultBoundingClientRect();
  }, [editor]);
  const isOpen = open && mode === "edit";
  const {
    update,
    style,
    floating
  } = useVirtualFloatingLink({
    editorId: editor.id,
    open: isOpen,
    getBoundingClientRect: getBoundingClientRect2,
    ...floatingOptions
  });
  (0, import_react.useEffect)(() => {
    if (editor.selection && someNode(editor, {
      match: {
        type: getPluginType(editor, ELEMENT_LINK)
      }
    })) {
      floatingLinkActions.show("edit", editor.id);
      update();
      return;
    }
    if (floatingLinkSelectors.mode() === "edit") {
      floatingLinkActions.hide();
    }
  }, [editor, keyEditor, update]);
  useHotkeys(triggerFloatingLinkHotkeys, (e) => {
    if (floatingLinkSelectors.mode() === "edit" && triggerFloatingLinkEdit(editor)) {
      e.preventDefault();
    }
  }, {
    enableOnContentEditable: true
  }, []);
  useFloatingLinkEnter();
  useFloatingLinkEscape();
  return {
    style: {
      ...style,
      zIndex: 1
    },
    ...props,
    ref: useComposedRef(props.ref, floating)
  };
};
var triggerFloatingLinkInsert = (editor, {
  focused
} = {}) => {
  if (floatingLinkSelectors.mode())
    return;
  if (!focused)
    return;
  if (isRangeAcrossBlocks(editor, {
    at: editor.selection
  }))
    return;
  const hasLink = someNode(editor, {
    match: {
      type: getPluginType(editor, ELEMENT_LINK)
    }
  });
  if (hasLink)
    return;
  floatingLinkActions.text(getEditorString(editor, editor.selection));
  floatingLinkActions.show("insert", editor.id);
  return true;
};
var useFloatingLinkInsert = ({
  floatingOptions,
  ...props
}) => {
  const editor = useEditorRef();
  const focused = useFocused();
  const mode = useFloatingLinkSelectors().mode();
  const open = useFloatingLinkSelectors().isOpen(editor.id);
  const {
    triggerFloatingLinkHotkeys
  } = getPluginOptions(editor, ELEMENT_LINK);
  useHotkeys(triggerFloatingLinkHotkeys, (e) => {
    if (triggerFloatingLinkInsert(editor, {
      focused
    })) {
      e.preventDefault();
    }
  }, {
    enableOnContentEditable: true
  }, [focused]);
  const ref = useOnClickOutside(() => {
    if (floatingLinkSelectors.mode() === "insert") {
      floatingLinkActions.hide();
      focusEditor(editor, editor.selection);
    }
  }, {
    disabled: !open
  });
  const {
    update,
    style,
    floating
  } = useVirtualFloatingLink({
    editorId: editor.id,
    open: open && mode === "insert",
    getBoundingClientRect: getSelectionBoundingClientRect,
    whileElementsMounted: () => {
    },
    ...floatingOptions
  });
  (0, import_react.useEffect)(() => {
    if (open) {
      update();
      floatingLinkActions.updated(true);
    } else {
      floatingLinkActions.updated(false);
    }
  }, [open, update]);
  useFloatingLinkEscape();
  return {
    style: {
      ...style,
      zIndex: 1
    },
    ...props,
    ref: useComposedRef(props.ref, floating, ref)
  };
};
var FloatingLinkEditRoot = createComponentAs((props) => {
  var _htmlProps$style;
  const htmlProps = useFloatingLinkEdit(props);
  if (((_htmlProps$style = htmlProps.style) === null || _htmlProps$style === void 0 ? void 0 : _htmlProps$style.display) === "none") {
    return null;
  }
  return createElementAs("div", htmlProps);
});
var FloatingLinkInsertRoot = createComponentAs((props) => {
  var _htmlProps$style2;
  const htmlProps = useFloatingLinkInsert(props);
  if (((_htmlProps$style2 = htmlProps.style) === null || _htmlProps$style2 === void 0 ? void 0 : _htmlProps$style2.display) === "none") {
    return null;
  }
  return createElementAs("div", htmlProps);
});
var FloatingLink = {
  EditRoot: FloatingLinkEditRoot,
  InsertRoot: FloatingLinkInsertRoot,
  UrlInput: FloatingLinkUrlInput,
  TextInput: FloatingLinkTextInput,
  NewTabInput: FloatingLinkNewTabInput,
  EditButton: FloatingLinkEditButton,
  UnlinkButton,
  OpenLinkButton
};
var triggerFloatingLink = (editor, {
  focused
} = {}) => {
  if (floatingLinkSelectors.mode() === "edit") {
    triggerFloatingLinkEdit(editor);
    return;
  }
  triggerFloatingLinkInsert(editor, {
    focused
  });
};
var insertLink = (editor, createLinkNodeOptions, options) => {
  insertNodes(editor, [createLinkNode(editor, createLinkNodeOptions)], options);
};
var unwrapLink = (editor, options) => {
  return withoutNormalizing(editor, () => {
    if (options !== null && options !== void 0 && options.split) {
      var _editor$selection, _editor$selection4;
      const linkAboveAnchor = getAboveNode(editor, {
        at: (_editor$selection = editor.selection) === null || _editor$selection === void 0 ? void 0 : _editor$selection.anchor,
        match: {
          type: getPluginType(editor, ELEMENT_LINK)
        }
      });
      if (linkAboveAnchor) {
        var _editor$selection2, _editor$selection3;
        splitNodes(editor, {
          at: (_editor$selection2 = editor.selection) === null || _editor$selection2 === void 0 ? void 0 : _editor$selection2.anchor,
          match: (n) => isElement(n) && n.type === getPluginType(editor, ELEMENT_LINK)
        });
        unwrapLink(editor, {
          at: (_editor$selection3 = editor.selection) === null || _editor$selection3 === void 0 ? void 0 : _editor$selection3.anchor
        });
        return true;
      }
      const linkAboveFocus = getAboveNode(editor, {
        at: (_editor$selection4 = editor.selection) === null || _editor$selection4 === void 0 ? void 0 : _editor$selection4.focus,
        match: {
          type: getPluginType(editor, ELEMENT_LINK)
        }
      });
      if (linkAboveFocus) {
        var _editor$selection5, _editor$selection6;
        splitNodes(editor, {
          at: (_editor$selection5 = editor.selection) === null || _editor$selection5 === void 0 ? void 0 : _editor$selection5.focus,
          match: (n) => isElement(n) && n.type === getPluginType(editor, ELEMENT_LINK)
        });
        unwrapLink(editor, {
          at: (_editor$selection6 = editor.selection) === null || _editor$selection6 === void 0 ? void 0 : _editor$selection6.focus
        });
        return true;
      }
    }
    unwrapNodes(editor, {
      match: {
        type: getPluginType(editor, ELEMENT_LINK)
      },
      ...options
    });
  });
};
var upsertLinkText = (editor, {
  text
}) => {
  const newLink = getAboveNode(editor, {
    match: {
      type: getPluginType(editor, ELEMENT_LINK)
    }
  });
  if (newLink) {
    const [newLinkNode, newLinkPath] = newLink;
    if (text !== null && text !== void 0 && text.length && text !== getEditorString(editor, newLinkPath)) {
      const firstText = newLinkNode.children[0];
      replaceNodeChildren(editor, {
        at: newLinkPath,
        nodes: {
          ...firstText,
          text
        },
        insertOptions: {
          select: true
        }
      });
    }
  }
};
var wrapLink = (editor, {
  url,
  target,
  ...options
}) => {
  wrapNodes(editor, {
    type: getPluginType(editor, ELEMENT_LINK),
    url,
    target,
    children: []
  }, {
    split: true,
    ...options
  });
};
var upsertLink = (editor, {
  url,
  text,
  target,
  insertTextInLink,
  insertNodesOptions,
  isUrl: isUrl2 = getPluginOptions(editor, ELEMENT_LINK).isUrl
}) => {
  var _text, _editor$selection, _text2;
  const at = editor.selection;
  if (!at)
    return;
  const linkAbove = getAboveNode(editor, {
    at,
    match: {
      type: getPluginType(editor, ELEMENT_LINK)
    }
  });
  if (insertTextInLink && linkAbove) {
    editor.insertText(url);
    return true;
  }
  if (!(isUrl2 !== null && isUrl2 !== void 0 && isUrl2(url)))
    return;
  if (isDefined(text) && !text.length) {
    text = url;
  }
  if (linkAbove) {
    var _linkAbove$, _linkAbove$2;
    if (url !== ((_linkAbove$ = linkAbove[0]) === null || _linkAbove$ === void 0 ? void 0 : _linkAbove$.url) || target !== ((_linkAbove$2 = linkAbove[0]) === null || _linkAbove$2 === void 0 ? void 0 : _linkAbove$2.target)) {
      setNodes(editor, {
        url,
        target
      }, {
        at: linkAbove[1]
      });
    }
    upsertLinkText(editor, {
      url,
      text,
      target
    });
    return true;
  }
  const linkEntry = findNode(editor, {
    at,
    match: {
      type: getPluginType(editor, ELEMENT_LINK)
    }
  });
  const [linkNode, linkPath] = linkEntry !== null && linkEntry !== void 0 ? linkEntry : [];
  let shouldReplaceText = false;
  if (linkPath && (_text = text) !== null && _text !== void 0 && _text.length) {
    const linkText = getEditorString(editor, linkPath);
    if (text !== linkText) {
      shouldReplaceText = true;
    }
  }
  if (isExpanded(at)) {
    if (linkAbove) {
      unwrapLink(editor, {
        at: linkAbove[1]
      });
    } else {
      unwrapLink(editor, {
        split: true
      });
    }
    wrapLink(editor, {
      url,
      target
    });
    upsertLinkText(editor, {
      url,
      target,
      text
    });
    return true;
  }
  if (shouldReplaceText) {
    removeNodes(editor, {
      at: linkPath
    });
  }
  const props = getNodeProps(linkNode !== null && linkNode !== void 0 ? linkNode : {});
  const path = (_editor$selection = editor.selection) === null || _editor$selection === void 0 ? void 0 : _editor$selection.focus.path;
  if (!path)
    return;
  const leaf = getNodeLeaf(editor, path);
  if (!((_text2 = text) !== null && _text2 !== void 0 && _text2.length)) {
    text = url;
  }
  insertLink(editor, {
    ...props,
    url,
    target,
    children: [{
      ...leaf,
      text
    }]
  }, insertNodesOptions);
  return true;
};
var withLink = (editor, {
  type,
  options: {
    isUrl: isUrl2,
    getUrlHref,
    rangeBeforeOptions
  }
}) => {
  const {
    insertData,
    insertText,
    apply,
    normalizeNode,
    insertBreak
  } = editor;
  const wrapLink2 = () => {
    withoutNormalizing(editor, () => {
      var _getUrlHref;
      const selection = editor.selection;
      let beforeWordRange = getRangeBefore(editor, selection, rangeBeforeOptions);
      if (!beforeWordRange) {
        beforeWordRange = getRangeFromBlockStart(editor);
      }
      if (!beforeWordRange)
        return;
      const hasLink = someNode(editor, {
        at: beforeWordRange,
        match: {
          type: getPluginType(editor, ELEMENT_LINK)
        }
      });
      if (hasLink)
        return;
      let beforeWordText = getEditorString(editor, beforeWordRange);
      beforeWordText = (_getUrlHref = getUrlHref === null || getUrlHref === void 0 ? void 0 : getUrlHref(beforeWordText)) !== null && _getUrlHref !== void 0 ? _getUrlHref : beforeWordText;
      if (!isUrl2(beforeWordText))
        return;
      select(editor, beforeWordRange);
      upsertLink(editor, {
        url: beforeWordText
      });
      collapseSelection(editor, {
        edge: "end"
      });
    });
  };
  editor.insertBreak = () => {
    if (!isCollapsed(editor.selection))
      return insertBreak();
    wrapLink2();
    insertBreak();
  };
  editor.insertText = (text) => {
    if (text === " " && isCollapsed(editor.selection)) {
      wrapLink2();
    }
    insertText(text);
  };
  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const textHref = getUrlHref === null || getUrlHref === void 0 ? void 0 : getUrlHref(text);
    if (text) {
      const inserted = upsertLink(editor, {
        url: textHref || text,
        insertTextInLink: true
      });
      if (inserted)
        return;
    }
    insertData(data);
  };
  editor.apply = (operation) => {
    if (operation.type === "set_selection") {
      const range = operation.newProperties;
      if (range && range.focus && range.anchor && isCollapsed(range)) {
        const entry = getAboveNode(editor, {
          at: range,
          match: {
            type: getPluginType(editor, ELEMENT_LINK)
          }
        });
        if (entry) {
          const [, path] = entry;
          let newPoint;
          if (isStartPoint(editor, range.focus, path)) {
            newPoint = getPreviousNodeEndPoint(editor, path);
          }
          if (isEndPoint(editor, range.focus, path)) {
            newPoint = getNextNodeStartPoint(editor, path);
          }
          if (newPoint) {
            operation.newProperties = {
              anchor: newPoint,
              focus: newPoint
            };
          }
        }
      }
    }
    apply(operation);
  };
  editor.normalizeNode = ([node, path]) => {
    if (node.type === getPluginType(editor, ELEMENT_LINK)) {
      const range = editor.selection;
      if (range && isCollapsed(range)) {
        if (isEndPoint(editor, range.focus, path)) {
          const nextPoint = getNextNodeStartPoint(editor, path);
          if (nextPoint) {
            select(editor, nextPoint);
          } else {
            const nextPath = Path.next(path);
            insertNodes(editor, {
              text: ""
            }, {
              at: nextPath
            });
            select(editor, nextPath);
          }
        }
      }
    }
    normalizeNode([node, path]);
  };
  editor = withRemoveEmptyNodes(editor, mockPlugin({
    options: {
      types: type
    }
  }));
  return editor;
};
var ELEMENT_LINK = "a";
var createLinkPlugin = createPluginFactory({
  key: ELEMENT_LINK,
  isElement: true,
  isInline: true,
  props: ({
    element
  }) => ({
    nodeProps: {
      href: element === null || element === void 0 ? void 0 : element.url,
      target: element === null || element === void 0 ? void 0 : element.target
    }
  }),
  withOverrides: withLink,
  options: {
    isUrl,
    rangeBeforeOptions: {
      matchString: " ",
      skipInvalid: true,
      afterMatch: true
    },
    triggerFloatingLinkHotkeys: "meta+k, ctrl+k"
  },
  then: (editor, {
    type
  }) => ({
    deserializeHtml: {
      rules: [{
        validNodeName: "A"
      }],
      getNode: (el) => ({
        type,
        url: el.getAttribute("href"),
        target: el.getAttribute("target") || "_blank"
      })
    }
  })
});

export {
  withNormalizeTypes,
  KEY_NORMALIZE_TYPES,
  createNormalizeTypesPlugin,
  withRemoveEmptyNodes,
  createRemoveEmptyNodesPlugin,
  createLinkNode,
  LaunchIcon,
  useLink,
  LinkRoot,
  Link,
  LinkIcon,
  LinkOffIcon,
  ShortTextIcon,
  floatingLinkStore,
  floatingLinkActions,
  floatingLinkSelectors,
  useFloatingLinkSelectors,
  triggerFloatingLinkEdit,
  useFloatingLinkEditButton,
  FloatingLinkEditButton,
  useFloatingLinkNewTabInput,
  FloatingLinkNewTabInput,
  useFloatingLinkTextInput,
  FloatingLinkTextInput,
  useFloatingLinkUrlInput,
  FloatingLinkUrlInput,
  useOpenLinkButton,
  OpenLinkButton,
  useUnlinkButton,
  UnlinkButton,
  submitFloatingLink,
  useFloatingLinkEnter,
  useFloatingLinkEscape,
  useVirtualFloatingLink,
  useFloatingLinkEdit,
  triggerFloatingLinkInsert,
  useFloatingLinkInsert,
  FloatingLinkEditRoot,
  FloatingLinkInsertRoot,
  FloatingLink,
  triggerFloatingLink,
  insertLink,
  unwrapLink,
  upsertLinkText,
  wrapLink,
  upsertLink,
  withLink,
  ELEMENT_LINK,
  createLinkPlugin
};
//# sourceMappingURL=chunk-HXMGITFE.js.map

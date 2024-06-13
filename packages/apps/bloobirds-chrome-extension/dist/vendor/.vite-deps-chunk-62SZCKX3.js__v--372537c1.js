import {
  require_prop_types
} from "/vendor/.vite-deps-chunk-NFJMNAKM.js__v--372537c1.js";
import {
  __assign
} from "/vendor/.vite-deps-chunk-BS7TG6QB.js__v--372537c1.js";
import {
  Ce,
  PortalBody,
  createStyles,
  styled_components_browser_esm_default
} from "/vendor/.vite-deps-chunk-22IKQRCZ.js__v--372537c1.js";
import {
  flip,
  getRangeBoundingClientRect,
  offset,
  shift,
  useVirtualFloating
} from "/vendor/.vite-deps-chunk-QW53TVAD.js__v--372537c1.js";
import {
  Hotkeys,
  createPluginFactory,
  createStore,
  escapeRegExp,
  getEditorString,
  getPointBefore,
  getRange,
  isCollapsed,
  useEventEditorSelectors,
  usePlateEditorState
} from "/vendor/.vite-deps-chunk-HGZEDJTY.js__v--372537c1.js";
import {
  Range
} from "/vendor/.vite-deps-chunk-ZSYTCF3U.js__v--372537c1.js";
import {
  require_react
} from "/vendor/.vite-deps-chunk-C7VZVCY4.js__v--372537c1.js";
import {
  __commonJS,
  __toESM
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--372537c1.js";

// ../../../node_modules/downshift/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "../../../node_modules/downshift/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        var REACT_FRAGMENT_TYPE = 60107;
        var REACT_STRICT_MODE_TYPE = 60108;
        var REACT_PROFILER_TYPE = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        var REACT_SUSPENSE_TYPE = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_SCOPE_TYPE = 60119;
        var REACT_OPAQUE_ID_TYPE = 60128;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_OFFSCREEN_TYPE = 60130;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
          REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
          REACT_PROFILER_TYPE = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          REACT_SCOPE_TYPE = symbolFor("react.scope");
          REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        var enableScopeAPI = false;
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef2(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef2;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// ../../../node_modules/downshift/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "../../../node_modules/downshift/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// ../../../node_modules/@udecode/plate-ui-combobox/dist/index.es.js
var import_react3 = __toESM(require_react());

// ../../../node_modules/@udecode/plate-combobox/dist/index.es.js
var import_react2 = __toESM(require_react());

// ../../../node_modules/downshift/dist/downshift.esm.js
var import_prop_types = __toESM(require_prop_types());
var import_react = __toESM(require_react());
var import_react_is = __toESM(require_react_is());

// ../../../node_modules/downshift/node_modules/compute-scroll-into-view/dist/index.mjs
function t(t2) {
  return "object" == typeof t2 && null != t2 && 1 === t2.nodeType;
}
function e(t2, e2) {
  return (!e2 || "hidden" !== t2) && "visible" !== t2 && "clip" !== t2;
}
function n(t2, n2) {
  if (t2.clientHeight < t2.scrollHeight || t2.clientWidth < t2.scrollWidth) {
    var r2 = getComputedStyle(t2, null);
    return e(r2.overflowY, n2) || e(r2.overflowX, n2) || function(t3) {
      var e2 = function(t4) {
        if (!t4.ownerDocument || !t4.ownerDocument.defaultView)
          return null;
        try {
          return t4.ownerDocument.defaultView.frameElement;
        } catch (t5) {
          return null;
        }
      }(t3);
      return !!e2 && (e2.clientHeight < t3.scrollHeight || e2.clientWidth < t3.scrollWidth);
    }(t2);
  }
  return false;
}
function r(t2, e2, n2, r2, i2, o, l, d) {
  return o < t2 && l > e2 || o > t2 && l < e2 ? 0 : o <= t2 && d <= n2 || l >= e2 && d >= n2 ? o - t2 - r2 : l > e2 && d < n2 || o < t2 && d > n2 ? l - e2 + i2 : 0;
}
var i = function(e2, i2) {
  var o = window, l = i2.scrollMode, d = i2.block, f = i2.inline, h = i2.boundary, u = i2.skipOverflowHiddenElements, s = "function" == typeof h ? h : function(t2) {
    return t2 !== h;
  };
  if (!t(e2))
    throw new TypeError("Invalid target");
  for (var a, c, g = document.scrollingElement || document.documentElement, p = [], m = e2; t(m) && s(m); ) {
    if ((m = null == (c = (a = m).parentElement) ? a.getRootNode().host || null : c) === g) {
      p.push(m);
      break;
    }
    null != m && m === document.body && n(m) && !n(document.documentElement) || null != m && n(m, u) && p.push(m);
  }
  for (var w = o.visualViewport ? o.visualViewport.width : innerWidth, v = o.visualViewport ? o.visualViewport.height : innerHeight, W = window.scrollX || pageXOffset, H = window.scrollY || pageYOffset, b = e2.getBoundingClientRect(), y = b.height, E = b.width, M = b.top, V = b.right, x = b.bottom, I = b.left, C = "start" === d || "nearest" === d ? M : "end" === d ? x : M + y / 2, R = "center" === f ? I + E / 2 : "end" === f ? V : I, T = [], k = 0; k < p.length; k++) {
    var B = p[k], D = B.getBoundingClientRect(), O = D.height, X = D.width, Y = D.top, L = D.right, S = D.bottom, j = D.left;
    if ("if-needed" === l && M >= 0 && I >= 0 && x <= v && V <= w && M >= Y && x <= S && I >= j && V <= L)
      return T;
    var N = getComputedStyle(B), q = parseInt(N.borderLeftWidth, 10), z = parseInt(N.borderTopWidth, 10), A = parseInt(N.borderRightWidth, 10), F = parseInt(N.borderBottomWidth, 10), G = 0, J = 0, K = "offsetWidth" in B ? B.offsetWidth - B.clientWidth - q - A : 0, P = "offsetHeight" in B ? B.offsetHeight - B.clientHeight - z - F : 0, Q = "offsetWidth" in B ? 0 === B.offsetWidth ? 0 : X / B.offsetWidth : 0, U = "offsetHeight" in B ? 0 === B.offsetHeight ? 0 : O / B.offsetHeight : 0;
    if (g === B)
      G = "start" === d ? C : "end" === d ? C - v : "nearest" === d ? r(H, H + v, v, z, F, H + C, H + C + y, y) : C - v / 2, J = "start" === f ? R : "center" === f ? R - w / 2 : "end" === f ? R - w : r(W, W + w, w, q, A, W + R, W + R + E, E), G = Math.max(0, G + H), J = Math.max(0, J + W);
    else {
      G = "start" === d ? C - Y - z : "end" === d ? C - S + F + P : "nearest" === d ? r(Y, S, O, z, F + P, C, C + y, y) : C - (Y + O / 2) + P / 2, J = "start" === f ? R - j - q : "center" === f ? R - (j + X / 2) + K / 2 : "end" === f ? R - L + A + K : r(j, L, X, q, A + K, R, R + E, E);
      var Z = B.scrollLeft, $ = B.scrollTop;
      C += $ - (G = Math.max(0, Math.min($ + G / U, B.scrollHeight - O / U + P))), R += Z - (J = Math.max(0, Math.min(Z + J / Q, B.scrollWidth - X / Q + K)));
    }
    T.push({ el: B, top: G, left: J });
  }
  return T;
};

// ../../../node_modules/downshift/dist/downshift.esm.js
var idCounter = 0;
function cbToCb(cb) {
  return typeof cb === "function" ? cb : noop;
}
function noop() {
}
function scrollIntoView(node, menuNode) {
  if (!node) {
    return;
  }
  const actions = i(node, {
    boundary: menuNode,
    block: "nearest",
    scrollMode: "if-needed"
  });
  actions.forEach((_ref) => {
    let {
      el,
      top,
      left
    } = _ref;
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}
function isOrContainsNode(parent, child, environment) {
  const result = parent === child || child instanceof environment.Node && parent.contains && parent.contains(child);
  return result;
}
function debounce(fn, time) {
  let timeoutId;
  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
  function wrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    cancel();
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, time);
  }
  wrapper.cancel = cancel;
  return wrapper;
}
function callAllEventHandlers() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }
  return function(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return fns.some((fn) => {
      if (fn) {
        fn(event, ...args);
      }
      return event.preventDownshiftDefault || event.hasOwnProperty("nativeEvent") && event.nativeEvent.preventDownshiftDefault;
    });
  };
}
function handleRefs() {
  for (var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    refs[_key4] = arguments[_key4];
  }
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}
function generateId() {
  return String(idCounter++);
}
function getA11yStatusMessage$1(_ref2) {
  let {
    isOpen,
    resultCount,
    previousResultCount
  } = _ref2;
  if (!isOpen) {
    return "";
  }
  if (!resultCount) {
    return "No results are available.";
  }
  if (resultCount !== previousResultCount) {
    return `${resultCount} result${resultCount === 1 ? " is" : "s are"} available, use up and down arrow keys to navigate. Press Enter key to select.`;
  }
  return "";
}
function unwrapArray(arg, defaultValue) {
  arg = Array.isArray(arg) ? arg[0] : arg;
  if (!arg && defaultValue) {
    return defaultValue;
  } else {
    return arg;
  }
}
function isDOMElement(element) {
  return typeof element.type === "string";
}
function getElementProps(element) {
  return element.props;
}
function requiredProp(fnName, propName) {
  console.error(`The property "${propName}" is required in "${fnName}"`);
}
var stateKeys = ["highlightedIndex", "inputValue", "isOpen", "selectedItem", "type"];
function pickState(state) {
  if (state === void 0) {
    state = {};
  }
  const result = {};
  stateKeys.forEach((k) => {
    if (state.hasOwnProperty(k)) {
      result[k] = state[k];
    }
  });
  return result;
}
function getState(state, props) {
  return Object.keys(state).reduce((prevState, key) => {
    prevState[key] = isControlledProp(props, key) ? props[key] : state[key];
    return prevState;
  }, {});
}
function isControlledProp(props, key) {
  return props[key] !== void 0;
}
function normalizeArrowKey(event) {
  const {
    key,
    keyCode
  } = event;
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf("Arrow") !== 0) {
    return `Arrow${key}`;
  }
  return key;
}
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function getNextWrappingIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
  if (circular === void 0) {
    circular = true;
  }
  if (itemCount === 0) {
    return -1;
  }
  const itemsLastIndex = itemCount - 1;
  if (typeof baseIndex !== "number" || baseIndex < 0 || baseIndex >= itemCount) {
    baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1;
  }
  let newIndex = baseIndex + moveAmount;
  if (newIndex < 0) {
    newIndex = circular ? itemsLastIndex : 0;
  } else if (newIndex > itemsLastIndex) {
    newIndex = circular ? 0 : itemsLastIndex;
  }
  const nonDisabledNewIndex = getNextNonDisabledIndex(moveAmount, newIndex, itemCount, getItemNodeFromIndex, circular);
  if (nonDisabledNewIndex === -1) {
    return baseIndex >= itemCount ? -1 : baseIndex;
  }
  return nonDisabledNewIndex;
}
function getNextNonDisabledIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
  const currentElementNode = getItemNodeFromIndex(baseIndex);
  if (!currentElementNode || !currentElementNode.hasAttribute("disabled")) {
    return baseIndex;
  }
  if (moveAmount > 0) {
    for (let index = baseIndex + 1; index < itemCount; index++) {
      if (!getItemNodeFromIndex(index).hasAttribute("disabled")) {
        return index;
      }
    }
  } else {
    for (let index = baseIndex - 1; index >= 0; index--) {
      if (!getItemNodeFromIndex(index).hasAttribute("disabled")) {
        return index;
      }
    }
  }
  if (circular) {
    return moveAmount > 0 ? getNextNonDisabledIndex(1, 0, itemCount, getItemNodeFromIndex, false) : getNextNonDisabledIndex(-1, itemCount - 1, itemCount, getItemNodeFromIndex, false);
  }
  return -1;
}
function targetWithinDownshift(target, downshiftElements, environment, checkActiveElement) {
  if (checkActiveElement === void 0) {
    checkActiveElement = true;
  }
  return downshiftElements.some((contextNode) => contextNode && (isOrContainsNode(contextNode, target, environment) || checkActiveElement && isOrContainsNode(contextNode, environment.document.activeElement, environment)));
}
var validateControlledUnchanged = noop;
if (true) {
  validateControlledUnchanged = (state, prevProps, nextProps) => {
    const warningDescription = `This prop should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled Downshift element for the lifetime of the component. More info: https://github.com/downshift-js/downshift#control-props`;
    Object.keys(state).forEach((propKey) => {
      if (prevProps[propKey] !== void 0 && nextProps[propKey] === void 0) {
        console.error(`downshift: A component has changed the controlled prop "${propKey}" to be uncontrolled. ${warningDescription}`);
      } else if (prevProps[propKey] === void 0 && nextProps[propKey] !== void 0) {
        console.error(`downshift: A component has changed the uncontrolled prop "${propKey}" to be controlled. ${warningDescription}`);
      }
    });
  };
}
var cleanupStatus = debounce((documentProp) => {
  getStatusDiv(documentProp).textContent = "";
}, 500);
function setStatus(status, documentProp) {
  const div = getStatusDiv(documentProp);
  if (!status) {
    return;
  }
  div.textContent = status;
  cleanupStatus(documentProp);
}
function getStatusDiv(documentProp) {
  if (documentProp === void 0) {
    documentProp = document;
  }
  let statusDiv = documentProp.getElementById("a11y-status-message");
  if (statusDiv) {
    return statusDiv;
  }
  statusDiv = documentProp.createElement("div");
  statusDiv.setAttribute("id", "a11y-status-message");
  statusDiv.setAttribute("role", "status");
  statusDiv.setAttribute("aria-live", "polite");
  statusDiv.setAttribute("aria-relevant", "additions text");
  Object.assign(statusDiv.style, {
    border: "0",
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px"
  });
  documentProp.body.appendChild(statusDiv);
  return statusDiv;
}
var unknown = true ? "__autocomplete_unknown__" : 0;
var mouseUp = true ? "__autocomplete_mouseup__" : 1;
var itemMouseEnter = true ? "__autocomplete_item_mouseenter__" : 2;
var keyDownArrowUp = true ? "__autocomplete_keydown_arrow_up__" : 3;
var keyDownArrowDown = true ? "__autocomplete_keydown_arrow_down__" : 4;
var keyDownEscape = true ? "__autocomplete_keydown_escape__" : 5;
var keyDownEnter = true ? "__autocomplete_keydown_enter__" : 6;
var keyDownHome = true ? "__autocomplete_keydown_home__" : 7;
var keyDownEnd = true ? "__autocomplete_keydown_end__" : 8;
var clickItem = true ? "__autocomplete_click_item__" : 9;
var blurInput = true ? "__autocomplete_blur_input__" : 10;
var changeInput = true ? "__autocomplete_change_input__" : 11;
var keyDownSpaceButton = true ? "__autocomplete_keydown_space_button__" : 12;
var clickButton = true ? "__autocomplete_click_button__" : 13;
var blurButton = true ? "__autocomplete_blur_button__" : 14;
var controlledPropUpdatedSelectedItem = true ? "__autocomplete_controlled_prop_updated_selected_item__" : 15;
var touchEnd = true ? "__autocomplete_touchend__" : 16;
var stateChangeTypes$3 = Object.freeze({
  __proto__: null,
  unknown,
  mouseUp,
  itemMouseEnter,
  keyDownArrowUp,
  keyDownArrowDown,
  keyDownEscape,
  keyDownEnter,
  keyDownHome,
  keyDownEnd,
  clickItem,
  blurInput,
  changeInput,
  keyDownSpaceButton,
  clickButton,
  blurButton,
  controlledPropUpdatedSelectedItem,
  touchEnd
});
var Downshift = (() => {
  class Downshift2 extends import_react.Component {
    constructor(_props) {
      var _this;
      super(_props);
      _this = this;
      this.id = this.props.id || `downshift-${generateId()}`;
      this.menuId = this.props.menuId || `${this.id}-menu`;
      this.labelId = this.props.labelId || `${this.id}-label`;
      this.inputId = this.props.inputId || `${this.id}-input`;
      this.getItemId = this.props.getItemId || ((index) => `${this.id}-item-${index}`);
      this.input = null;
      this.items = [];
      this.itemCount = null;
      this.previousResultCount = 0;
      this.timeoutIds = [];
      this.internalSetTimeout = (fn, time) => {
        const id = setTimeout(() => {
          this.timeoutIds = this.timeoutIds.filter((i2) => i2 !== id);
          fn();
        }, time);
        this.timeoutIds.push(id);
      };
      this.setItemCount = (count) => {
        this.itemCount = count;
      };
      this.unsetItemCount = () => {
        this.itemCount = null;
      };
      this.setHighlightedIndex = function(highlightedIndex, otherStateToSet) {
        if (highlightedIndex === void 0) {
          highlightedIndex = _this.props.defaultHighlightedIndex;
        }
        if (otherStateToSet === void 0) {
          otherStateToSet = {};
        }
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState({
          highlightedIndex,
          ...otherStateToSet
        });
      };
      this.clearSelection = (cb) => {
        this.internalSetState({
          selectedItem: null,
          inputValue: "",
          highlightedIndex: this.props.defaultHighlightedIndex,
          isOpen: this.props.defaultIsOpen
        }, cb);
      };
      this.selectItem = (item, otherStateToSet, cb) => {
        otherStateToSet = pickState(otherStateToSet);
        this.internalSetState({
          isOpen: this.props.defaultIsOpen,
          highlightedIndex: this.props.defaultHighlightedIndex,
          selectedItem: item,
          inputValue: this.props.itemToString(item),
          ...otherStateToSet
        }, cb);
      };
      this.selectItemAtIndex = (itemIndex, otherStateToSet, cb) => {
        const item = this.items[itemIndex];
        if (item == null) {
          return;
        }
        this.selectItem(item, otherStateToSet, cb);
      };
      this.selectHighlightedItem = (otherStateToSet, cb) => {
        return this.selectItemAtIndex(this.getState().highlightedIndex, otherStateToSet, cb);
      };
      this.internalSetState = (stateToSet, cb) => {
        let isItemSelected, onChangeArg;
        const onStateChangeArg = {};
        const isStateToSetFunction = typeof stateToSet === "function";
        if (!isStateToSetFunction && stateToSet.hasOwnProperty("inputValue")) {
          this.props.onInputValueChange(stateToSet.inputValue, {
            ...this.getStateAndHelpers(),
            ...stateToSet
          });
        }
        return this.setState((state) => {
          state = this.getState(state);
          let newStateToSet = isStateToSetFunction ? stateToSet(state) : stateToSet;
          newStateToSet = this.props.stateReducer(state, newStateToSet);
          isItemSelected = newStateToSet.hasOwnProperty("selectedItem");
          const nextState = {};
          if (isItemSelected && newStateToSet.selectedItem !== state.selectedItem) {
            onChangeArg = newStateToSet.selectedItem;
          }
          newStateToSet.type = newStateToSet.type || unknown;
          Object.keys(newStateToSet).forEach((key) => {
            if (state[key] !== newStateToSet[key]) {
              onStateChangeArg[key] = newStateToSet[key];
            }
            if (key === "type") {
              return;
            }
            newStateToSet[key];
            if (!isControlledProp(this.props, key)) {
              nextState[key] = newStateToSet[key];
            }
          });
          if (isStateToSetFunction && newStateToSet.hasOwnProperty("inputValue")) {
            this.props.onInputValueChange(newStateToSet.inputValue, {
              ...this.getStateAndHelpers(),
              ...newStateToSet
            });
          }
          return nextState;
        }, () => {
          cbToCb(cb)();
          const hasMoreStateThanType = Object.keys(onStateChangeArg).length > 1;
          if (hasMoreStateThanType) {
            this.props.onStateChange(onStateChangeArg, this.getStateAndHelpers());
          }
          if (isItemSelected) {
            this.props.onSelect(stateToSet.selectedItem, this.getStateAndHelpers());
          }
          if (onChangeArg !== void 0) {
            this.props.onChange(onChangeArg, this.getStateAndHelpers());
          }
          this.props.onUserAction(onStateChangeArg, this.getStateAndHelpers());
        });
      };
      this.rootRef = (node) => this._rootNode = node;
      this.getRootProps = function(_temp, _temp2) {
        let {
          refKey = "ref",
          ref,
          ...rest
        } = _temp === void 0 ? {} : _temp;
        let {
          suppressRefError = false
        } = _temp2 === void 0 ? {} : _temp2;
        _this.getRootProps.called = true;
        _this.getRootProps.refKey = refKey;
        _this.getRootProps.suppressRefError = suppressRefError;
        const {
          isOpen
        } = _this.getState();
        return {
          [refKey]: handleRefs(ref, _this.rootRef),
          role: "combobox",
          "aria-expanded": isOpen,
          "aria-haspopup": "listbox",
          "aria-owns": isOpen ? _this.menuId : null,
          "aria-labelledby": _this.labelId,
          ...rest
        };
      };
      this.keyDownHandlers = {
        ArrowDown(event) {
          event.preventDefault();
          if (this.getState().isOpen) {
            const amount = event.shiftKey ? 5 : 1;
            this.moveHighlightedIndex(amount, {
              type: keyDownArrowDown
            });
          } else {
            this.internalSetState({
              isOpen: true,
              type: keyDownArrowDown
            }, () => {
              const itemCount = this.getItemCount();
              if (itemCount > 0) {
                const {
                  highlightedIndex
                } = this.getState();
                const nextHighlightedIndex = getNextWrappingIndex(1, highlightedIndex, itemCount, (index) => this.getItemNodeFromIndex(index));
                this.setHighlightedIndex(nextHighlightedIndex, {
                  type: keyDownArrowDown
                });
              }
            });
          }
        },
        ArrowUp(event) {
          event.preventDefault();
          if (this.getState().isOpen) {
            const amount = event.shiftKey ? -5 : -1;
            this.moveHighlightedIndex(amount, {
              type: keyDownArrowUp
            });
          } else {
            this.internalSetState({
              isOpen: true,
              type: keyDownArrowUp
            }, () => {
              const itemCount = this.getItemCount();
              if (itemCount > 0) {
                const {
                  highlightedIndex
                } = this.getState();
                const nextHighlightedIndex = getNextWrappingIndex(-1, highlightedIndex, itemCount, (index) => this.getItemNodeFromIndex(index));
                this.setHighlightedIndex(nextHighlightedIndex, {
                  type: keyDownArrowUp
                });
              }
            });
          }
        },
        Enter(event) {
          if (event.which === 229) {
            return;
          }
          const {
            isOpen,
            highlightedIndex
          } = this.getState();
          if (isOpen && highlightedIndex != null) {
            event.preventDefault();
            const item = this.items[highlightedIndex];
            const itemNode = this.getItemNodeFromIndex(highlightedIndex);
            if (item == null || itemNode && itemNode.hasAttribute("disabled")) {
              return;
            }
            this.selectHighlightedItem({
              type: keyDownEnter
            });
          }
        },
        Escape(event) {
          event.preventDefault();
          this.reset({
            type: keyDownEscape,
            ...!this.state.isOpen && {
              selectedItem: null,
              inputValue: ""
            }
          });
        }
      };
      this.buttonKeyDownHandlers = {
        ...this.keyDownHandlers,
        " "(event) {
          event.preventDefault();
          this.toggleMenu({
            type: keyDownSpaceButton
          });
        }
      };
      this.inputKeyDownHandlers = {
        ...this.keyDownHandlers,
        Home(event) {
          const {
            isOpen
          } = this.getState();
          if (!isOpen) {
            return;
          }
          event.preventDefault();
          const itemCount = this.getItemCount();
          if (itemCount <= 0 || !isOpen) {
            return;
          }
          const newHighlightedIndex = getNextNonDisabledIndex(1, 0, itemCount, (index) => this.getItemNodeFromIndex(index), false);
          this.setHighlightedIndex(newHighlightedIndex, {
            type: keyDownHome
          });
        },
        End(event) {
          const {
            isOpen
          } = this.getState();
          if (!isOpen) {
            return;
          }
          event.preventDefault();
          const itemCount = this.getItemCount();
          if (itemCount <= 0 || !isOpen) {
            return;
          }
          const newHighlightedIndex = getNextNonDisabledIndex(-1, itemCount - 1, itemCount, (index) => this.getItemNodeFromIndex(index), false);
          this.setHighlightedIndex(newHighlightedIndex, {
            type: keyDownEnd
          });
        }
      };
      this.getToggleButtonProps = function(_temp3) {
        let {
          onClick,
          onPress,
          onKeyDown,
          onKeyUp,
          onBlur,
          ...rest
        } = _temp3 === void 0 ? {} : _temp3;
        const {
          isOpen
        } = _this.getState();
        const enabledEventHandlers = {
          onClick: callAllEventHandlers(onClick, _this.buttonHandleClick),
          onKeyDown: callAllEventHandlers(onKeyDown, _this.buttonHandleKeyDown),
          onKeyUp: callAllEventHandlers(onKeyUp, _this.buttonHandleKeyUp),
          onBlur: callAllEventHandlers(onBlur, _this.buttonHandleBlur)
        };
        const eventHandlers = rest.disabled ? {} : enabledEventHandlers;
        return {
          type: "button",
          role: "button",
          "aria-label": isOpen ? "close menu" : "open menu",
          "aria-haspopup": true,
          "data-toggle": true,
          ...eventHandlers,
          ...rest
        };
      };
      this.buttonHandleKeyUp = (event) => {
        event.preventDefault();
      };
      this.buttonHandleKeyDown = (event) => {
        const key = normalizeArrowKey(event);
        if (this.buttonKeyDownHandlers[key]) {
          this.buttonKeyDownHandlers[key].call(this, event);
        }
      };
      this.buttonHandleClick = (event) => {
        event.preventDefault();
        if (this.props.environment.document.activeElement === this.props.environment.document.body) {
          event.target.focus();
        }
        if (false) {
          this.toggleMenu({
            type: clickButton
          });
        } else {
          this.internalSetTimeout(() => this.toggleMenu({
            type: clickButton
          }));
        }
      };
      this.buttonHandleBlur = (event) => {
        const blurTarget = event.target;
        this.internalSetTimeout(() => {
          if (!this.isMouseDown && (this.props.environment.document.activeElement == null || this.props.environment.document.activeElement.id !== this.inputId) && this.props.environment.document.activeElement !== blurTarget) {
            this.reset({
              type: blurButton
            });
          }
        });
      };
      this.getLabelProps = (props) => {
        return {
          htmlFor: this.inputId,
          id: this.labelId,
          ...props
        };
      };
      this.getInputProps = function(_temp4) {
        let {
          onKeyDown,
          onBlur,
          onChange,
          onInput,
          onChangeText,
          ...rest
        } = _temp4 === void 0 ? {} : _temp4;
        let onChangeKey;
        let eventHandlers = {};
        {
          onChangeKey = "onChange";
        }
        const {
          inputValue,
          isOpen,
          highlightedIndex
        } = _this.getState();
        if (!rest.disabled) {
          eventHandlers = {
            [onChangeKey]: callAllEventHandlers(onChange, onInput, _this.inputHandleChange),
            onKeyDown: callAllEventHandlers(onKeyDown, _this.inputHandleKeyDown),
            onBlur: callAllEventHandlers(onBlur, _this.inputHandleBlur)
          };
        }
        return {
          "aria-autocomplete": "list",
          "aria-activedescendant": isOpen && typeof highlightedIndex === "number" && highlightedIndex >= 0 ? _this.getItemId(highlightedIndex) : null,
          "aria-controls": isOpen ? _this.menuId : null,
          "aria-labelledby": _this.labelId,
          autoComplete: "off",
          value: inputValue,
          id: _this.inputId,
          ...eventHandlers,
          ...rest
        };
      };
      this.inputHandleKeyDown = (event) => {
        const key = normalizeArrowKey(event);
        if (key && this.inputKeyDownHandlers[key]) {
          this.inputKeyDownHandlers[key].call(this, event);
        }
      };
      this.inputHandleChange = (event) => {
        this.internalSetState({
          type: changeInput,
          isOpen: true,
          inputValue: event.target.value,
          highlightedIndex: this.props.defaultHighlightedIndex
        });
      };
      this.inputHandleBlur = () => {
        this.internalSetTimeout(() => {
          const downshiftButtonIsActive = this.props.environment.document && !!this.props.environment.document.activeElement && !!this.props.environment.document.activeElement.dataset && this.props.environment.document.activeElement.dataset.toggle && this._rootNode && this._rootNode.contains(this.props.environment.document.activeElement);
          if (!this.isMouseDown && !downshiftButtonIsActive) {
            this.reset({
              type: blurInput
            });
          }
        });
      };
      this.menuRef = (node) => {
        this._menuNode = node;
      };
      this.getMenuProps = function(_temp5, _temp6) {
        let {
          refKey = "ref",
          ref,
          ...props
        } = _temp5 === void 0 ? {} : _temp5;
        let {
          suppressRefError = false
        } = _temp6 === void 0 ? {} : _temp6;
        _this.getMenuProps.called = true;
        _this.getMenuProps.refKey = refKey;
        _this.getMenuProps.suppressRefError = suppressRefError;
        return {
          [refKey]: handleRefs(ref, _this.menuRef),
          role: "listbox",
          "aria-labelledby": props && props["aria-label"] ? null : _this.labelId,
          id: _this.menuId,
          ...props
        };
      };
      this.getItemProps = function(_temp7) {
        let {
          onMouseMove,
          onMouseDown,
          onClick,
          onPress,
          index,
          item = false ? void 0 : requiredProp("getItemProps", "item"),
          ...rest
        } = _temp7 === void 0 ? {} : _temp7;
        if (index === void 0) {
          _this.items.push(item);
          index = _this.items.indexOf(item);
        } else {
          _this.items[index] = item;
        }
        const onSelectKey = "onClick";
        const customClickHandler = onClick;
        const enabledEventHandlers = {
          onMouseMove: callAllEventHandlers(onMouseMove, () => {
            if (index === _this.getState().highlightedIndex) {
              return;
            }
            _this.setHighlightedIndex(index, {
              type: itemMouseEnter
            });
            _this.avoidScrolling = true;
            _this.internalSetTimeout(() => _this.avoidScrolling = false, 250);
          }),
          onMouseDown: callAllEventHandlers(onMouseDown, (event) => {
            event.preventDefault();
          }),
          [onSelectKey]: callAllEventHandlers(customClickHandler, () => {
            _this.selectItemAtIndex(index, {
              type: clickItem
            });
          })
        };
        const eventHandlers = rest.disabled ? {
          onMouseDown: enabledEventHandlers.onMouseDown
        } : enabledEventHandlers;
        return {
          id: _this.getItemId(index),
          role: "option",
          "aria-selected": _this.getState().highlightedIndex === index,
          ...eventHandlers,
          ...rest
        };
      };
      this.clearItems = () => {
        this.items = [];
      };
      this.reset = function(otherStateToSet, cb) {
        if (otherStateToSet === void 0) {
          otherStateToSet = {};
        }
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState((_ref) => {
          let {
            selectedItem
          } = _ref;
          return {
            isOpen: _this.props.defaultIsOpen,
            highlightedIndex: _this.props.defaultHighlightedIndex,
            inputValue: _this.props.itemToString(selectedItem),
            ...otherStateToSet
          };
        }, cb);
      };
      this.toggleMenu = function(otherStateToSet, cb) {
        if (otherStateToSet === void 0) {
          otherStateToSet = {};
        }
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState((_ref2) => {
          let {
            isOpen
          } = _ref2;
          return {
            isOpen: !isOpen,
            ...isOpen && {
              highlightedIndex: _this.props.defaultHighlightedIndex
            },
            ...otherStateToSet
          };
        }, () => {
          const {
            isOpen,
            highlightedIndex
          } = _this.getState();
          if (isOpen) {
            if (_this.getItemCount() > 0 && typeof highlightedIndex === "number") {
              _this.setHighlightedIndex(highlightedIndex, otherStateToSet);
            }
          }
          cbToCb(cb)();
        });
      };
      this.openMenu = (cb) => {
        this.internalSetState({
          isOpen: true
        }, cb);
      };
      this.closeMenu = (cb) => {
        this.internalSetState({
          isOpen: false
        }, cb);
      };
      this.updateStatus = debounce(() => {
        const state = this.getState();
        const item = this.items[state.highlightedIndex];
        const resultCount = this.getItemCount();
        const status = this.props.getA11yStatusMessage({
          itemToString: this.props.itemToString,
          previousResultCount: this.previousResultCount,
          resultCount,
          highlightedItem: item,
          ...state
        });
        this.previousResultCount = resultCount;
        setStatus(status, this.props.environment.document);
      }, 200);
      const {
        defaultHighlightedIndex,
        initialHighlightedIndex: _highlightedIndex = defaultHighlightedIndex,
        defaultIsOpen,
        initialIsOpen: _isOpen = defaultIsOpen,
        initialInputValue: _inputValue = "",
        initialSelectedItem: _selectedItem = null
      } = this.props;
      const _state = this.getState({
        highlightedIndex: _highlightedIndex,
        isOpen: _isOpen,
        inputValue: _inputValue,
        selectedItem: _selectedItem
      });
      if (_state.selectedItem != null && this.props.initialInputValue === void 0) {
        _state.inputValue = this.props.itemToString(_state.selectedItem);
      }
      this.state = _state;
    }
    internalClearTimeouts() {
      this.timeoutIds.forEach((id) => {
        clearTimeout(id);
      });
      this.timeoutIds = [];
    }
    getState(stateToMerge) {
      if (stateToMerge === void 0) {
        stateToMerge = this.state;
      }
      return getState(stateToMerge, this.props);
    }
    getItemCount() {
      let itemCount = this.items.length;
      if (this.itemCount != null) {
        itemCount = this.itemCount;
      } else if (this.props.itemCount !== void 0) {
        itemCount = this.props.itemCount;
      }
      return itemCount;
    }
    getItemNodeFromIndex(index) {
      return this.props.environment.document.getElementById(this.getItemId(index));
    }
    scrollHighlightedItemIntoView() {
      {
        const node = this.getItemNodeFromIndex(this.getState().highlightedIndex);
        this.props.scrollIntoView(node, this._menuNode);
      }
    }
    moveHighlightedIndex(amount, otherStateToSet) {
      const itemCount = this.getItemCount();
      const {
        highlightedIndex
      } = this.getState();
      if (itemCount > 0) {
        const nextHighlightedIndex = getNextWrappingIndex(amount, highlightedIndex, itemCount, (index) => this.getItemNodeFromIndex(index));
        this.setHighlightedIndex(nextHighlightedIndex, otherStateToSet);
      }
    }
    getStateAndHelpers() {
      const {
        highlightedIndex,
        inputValue,
        selectedItem,
        isOpen
      } = this.getState();
      const {
        itemToString: itemToString2
      } = this.props;
      const {
        id
      } = this;
      const {
        getRootProps,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        getItemProps,
        openMenu,
        closeMenu,
        toggleMenu,
        selectItem,
        selectItemAtIndex,
        selectHighlightedItem,
        setHighlightedIndex,
        clearSelection,
        clearItems,
        reset,
        setItemCount,
        unsetItemCount,
        internalSetState: setState
      } = this;
      return {
        getRootProps,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        getItemProps,
        reset,
        openMenu,
        closeMenu,
        toggleMenu,
        selectItem,
        selectItemAtIndex,
        selectHighlightedItem,
        setHighlightedIndex,
        clearSelection,
        clearItems,
        setItemCount,
        unsetItemCount,
        setState,
        itemToString: itemToString2,
        id,
        highlightedIndex,
        inputValue,
        isOpen,
        selectedItem
      };
    }
    componentDidMount() {
      if (this.getMenuProps.called && !this.getMenuProps.suppressRefError) {
        validateGetMenuPropsCalledCorrectly(this._menuNode, this.getMenuProps);
      }
      {
        const onMouseDown = () => {
          this.isMouseDown = true;
        };
        const onMouseUp = (event) => {
          this.isMouseDown = false;
          const contextWithinDownshift = targetWithinDownshift(event.target, [this._rootNode, this._menuNode], this.props.environment);
          if (!contextWithinDownshift && this.getState().isOpen) {
            this.reset({
              type: mouseUp
            }, () => this.props.onOuterClick(this.getStateAndHelpers()));
          }
        };
        const onTouchStart = () => {
          this.isTouchMove = false;
        };
        const onTouchMove = () => {
          this.isTouchMove = true;
        };
        const onTouchEnd = (event) => {
          const contextWithinDownshift = targetWithinDownshift(event.target, [this._rootNode, this._menuNode], this.props.environment, false);
          if (!this.isTouchMove && !contextWithinDownshift && this.getState().isOpen) {
            this.reset({
              type: touchEnd
            }, () => this.props.onOuterClick(this.getStateAndHelpers()));
          }
        };
        const {
          environment
        } = this.props;
        environment.addEventListener("mousedown", onMouseDown);
        environment.addEventListener("mouseup", onMouseUp);
        environment.addEventListener("touchstart", onTouchStart);
        environment.addEventListener("touchmove", onTouchMove);
        environment.addEventListener("touchend", onTouchEnd);
        this.cleanup = () => {
          this.internalClearTimeouts();
          this.updateStatus.cancel();
          environment.removeEventListener("mousedown", onMouseDown);
          environment.removeEventListener("mouseup", onMouseUp);
          environment.removeEventListener("touchstart", onTouchStart);
          environment.removeEventListener("touchmove", onTouchMove);
          environment.removeEventListener("touchend", onTouchEnd);
        };
      }
    }
    shouldScroll(prevState, prevProps) {
      const {
        highlightedIndex: currentHighlightedIndex
      } = this.props.highlightedIndex === void 0 ? this.getState() : this.props;
      const {
        highlightedIndex: prevHighlightedIndex
      } = prevProps.highlightedIndex === void 0 ? prevState : prevProps;
      const scrollWhenOpen = currentHighlightedIndex && this.getState().isOpen && !prevState.isOpen;
      const scrollWhenNavigating = currentHighlightedIndex !== prevHighlightedIndex;
      return scrollWhenOpen || scrollWhenNavigating;
    }
    componentDidUpdate(prevProps, prevState) {
      if (true) {
        validateControlledUnchanged(this.state, prevProps, this.props);
        if (this.getMenuProps.called && !this.getMenuProps.suppressRefError) {
          validateGetMenuPropsCalledCorrectly(this._menuNode, this.getMenuProps);
        }
      }
      if (isControlledProp(this.props, "selectedItem") && this.props.selectedItemChanged(prevProps.selectedItem, this.props.selectedItem)) {
        this.internalSetState({
          type: controlledPropUpdatedSelectedItem,
          inputValue: this.props.itemToString(this.props.selectedItem)
        });
      }
      if (!this.avoidScrolling && this.shouldScroll(prevState, prevProps)) {
        this.scrollHighlightedItemIntoView();
      }
      {
        this.updateStatus();
      }
    }
    componentWillUnmount() {
      this.cleanup();
    }
    render() {
      const children = unwrapArray(this.props.children, noop);
      this.clearItems();
      this.getRootProps.called = false;
      this.getRootProps.refKey = void 0;
      this.getRootProps.suppressRefError = void 0;
      this.getMenuProps.called = false;
      this.getMenuProps.refKey = void 0;
      this.getMenuProps.suppressRefError = void 0;
      this.getLabelProps.called = false;
      this.getInputProps.called = false;
      const element = unwrapArray(children(this.getStateAndHelpers()));
      if (!element) {
        return null;
      }
      if (this.getRootProps.called || this.props.suppressRefError) {
        if (!this.getRootProps.suppressRefError && !this.props.suppressRefError) {
          validateGetRootPropsCalledCorrectly(element, this.getRootProps);
        }
        return element;
      } else if (isDOMElement(element)) {
        return (0, import_react.cloneElement)(element, this.getRootProps(getElementProps(element)));
      }
      if (true) {
        throw new Error("downshift: If you return a non-DOM element, you must apply the getRootProps function");
      }
      return void 0;
    }
  }
  Downshift2.defaultProps = {
    defaultHighlightedIndex: null,
    defaultIsOpen: false,
    getA11yStatusMessage: getA11yStatusMessage$1,
    itemToString: (i2) => {
      if (i2 == null) {
        return "";
      }
      if (isPlainObject(i2) && !i2.hasOwnProperty("toString")) {
        console.warn("downshift: An object was passed to the default implementation of `itemToString`. You should probably provide your own `itemToString` implementation. Please refer to the `itemToString` API documentation.", "The object that was passed:", i2);
      }
      return String(i2);
    },
    onStateChange: noop,
    onInputValueChange: noop,
    onUserAction: noop,
    onChange: noop,
    onSelect: noop,
    onOuterClick: noop,
    selectedItemChanged: (prevItem, item) => prevItem !== item,
    environment: typeof window === "undefined" ? {} : window,
    stateReducer: (state, stateToSet) => stateToSet,
    suppressRefError: false,
    scrollIntoView
  };
  Downshift2.stateChangeTypes = stateChangeTypes$3;
  return Downshift2;
})();
true ? Downshift.propTypes = {
  children: import_prop_types.default.func,
  defaultHighlightedIndex: import_prop_types.default.number,
  defaultIsOpen: import_prop_types.default.bool,
  initialHighlightedIndex: import_prop_types.default.number,
  initialSelectedItem: import_prop_types.default.any,
  initialInputValue: import_prop_types.default.string,
  initialIsOpen: import_prop_types.default.bool,
  getA11yStatusMessage: import_prop_types.default.func,
  itemToString: import_prop_types.default.func,
  onChange: import_prop_types.default.func,
  onSelect: import_prop_types.default.func,
  onStateChange: import_prop_types.default.func,
  onInputValueChange: import_prop_types.default.func,
  onUserAction: import_prop_types.default.func,
  onOuterClick: import_prop_types.default.func,
  selectedItemChanged: import_prop_types.default.func,
  stateReducer: import_prop_types.default.func,
  itemCount: import_prop_types.default.number,
  id: import_prop_types.default.string,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any
    })
  }),
  suppressRefError: import_prop_types.default.bool,
  scrollIntoView: import_prop_types.default.func,
  selectedItem: import_prop_types.default.any,
  isOpen: import_prop_types.default.bool,
  inputValue: import_prop_types.default.string,
  highlightedIndex: import_prop_types.default.number,
  labelId: import_prop_types.default.string,
  inputId: import_prop_types.default.string,
  menuId: import_prop_types.default.string,
  getItemId: import_prop_types.default.func
} : void 0;
function validateGetMenuPropsCalledCorrectly(node, _ref3) {
  let {
    refKey
  } = _ref3;
  if (!node) {
    console.error(`downshift: The ref prop "${refKey}" from getMenuProps was not applied correctly on your menu element.`);
  }
}
function validateGetRootPropsCalledCorrectly(element, _ref4) {
  let {
    refKey
  } = _ref4;
  const refKeySpecified = refKey !== "ref";
  const isComposite = !isDOMElement(element);
  if (isComposite && !refKeySpecified && !(0, import_react_is.isForwardRef)(element)) {
    console.error("downshift: You returned a non-DOM element. You must specify a refKey in getRootProps");
  } else if (!isComposite && refKeySpecified) {
    console.error(`downshift: You returned a DOM element. You should not specify a refKey in getRootProps. You specified "${refKey}"`);
  }
  if (!(0, import_react_is.isForwardRef)(element) && !getElementProps(element)[refKey]) {
    console.error(`downshift: You must apply the ref prop "${refKey}" from getRootProps onto your root element.`);
  }
}
var dropdownDefaultStateValues = {
  highlightedIndex: -1,
  isOpen: false,
  selectedItem: null,
  inputValue: ""
};
function callOnChangeProps(action, state, newState) {
  const {
    props,
    type
  } = action;
  const changes = {};
  Object.keys(state).forEach((key) => {
    invokeOnChangeHandler(key, action, state, newState);
    if (newState[key] !== state[key]) {
      changes[key] = newState[key];
    }
  });
  if (props.onStateChange && Object.keys(changes).length) {
    props.onStateChange({
      type,
      ...changes
    });
  }
}
function invokeOnChangeHandler(key, action, state, newState) {
  const {
    props,
    type
  } = action;
  const handler = `on${capitalizeString(key)}Change`;
  if (props[handler] && newState[key] !== void 0 && newState[key] !== state[key]) {
    props[handler]({
      type,
      ...newState
    });
  }
}
function stateReducer(s, a) {
  return a.changes;
}
function getA11ySelectionMessage(selectionParameters) {
  const {
    selectedItem,
    itemToString: itemToStringLocal
  } = selectionParameters;
  return selectedItem ? `${itemToStringLocal(selectedItem)} has been selected.` : "";
}
var updateA11yStatus = debounce((getA11yMessage, document2) => {
  setStatus(getA11yMessage(), document2);
}, 200);
var useIsomorphicLayoutEffect = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function useElementIds(_ref) {
  let {
    id = `downshift-${generateId()}`,
    labelId,
    menuId,
    getItemId,
    toggleButtonId,
    inputId
  } = _ref;
  const elementIdsRef = (0, import_react.useRef)({
    labelId: labelId || `${id}-label`,
    menuId: menuId || `${id}-menu`,
    getItemId: getItemId || ((index) => `${id}-item-${index}`),
    toggleButtonId: toggleButtonId || `${id}-toggle-button`,
    inputId: inputId || `${id}-input`
  });
  return elementIdsRef.current;
}
function getItemIndex(index, item, items) {
  if (index !== void 0) {
    return index;
  }
  if (items.length === 0) {
    return -1;
  }
  return items.indexOf(item);
}
function itemToString(item) {
  return item ? String(item) : "";
}
function isAcceptedCharacterKey(key) {
  return /^\S{1}$/.test(key);
}
function capitalizeString(string) {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
}
function useLatestRef(val) {
  const ref = (0, import_react.useRef)(val);
  ref.current = val;
  return ref;
}
function useEnhancedReducer(reducer, initialState, props) {
  const prevStateRef = (0, import_react.useRef)();
  const actionRef = (0, import_react.useRef)();
  const enhancedReducer = (0, import_react.useCallback)((state2, action2) => {
    actionRef.current = action2;
    state2 = getState(state2, action2.props);
    const changes = reducer(state2, action2);
    const newState = action2.props.stateReducer(state2, {
      ...action2,
      changes
    });
    return newState;
  }, [reducer]);
  const [state, dispatch] = (0, import_react.useReducer)(enhancedReducer, initialState);
  const propsRef = useLatestRef(props);
  const dispatchWithProps = (0, import_react.useCallback)((action2) => dispatch({
    props: propsRef.current,
    ...action2
  }), [propsRef]);
  const action = actionRef.current;
  (0, import_react.useEffect)(() => {
    if (action && prevStateRef.current && prevStateRef.current !== state) {
      callOnChangeProps(action, getState(prevStateRef.current, action.props), state);
    }
    prevStateRef.current = state;
  }, [state, props, action]);
  return [state, dispatchWithProps];
}
function useControlledReducer$1(reducer, initialState, props) {
  const [state, dispatch] = useEnhancedReducer(reducer, initialState, props);
  return [getState(state, props), dispatch];
}
var defaultProps$3 = {
  itemToString,
  stateReducer,
  getA11ySelectionMessage,
  scrollIntoView,
  circularNavigation: false,
  environment: typeof window === "undefined" ? {} : window
};
function getDefaultValue$1(props, propKey, defaultStateValues2) {
  if (defaultStateValues2 === void 0) {
    defaultStateValues2 = dropdownDefaultStateValues;
  }
  const defaultValue = props[`default${capitalizeString(propKey)}`];
  if (defaultValue !== void 0) {
    return defaultValue;
  }
  return defaultStateValues2[propKey];
}
function getInitialValue$1(props, propKey, defaultStateValues2) {
  if (defaultStateValues2 === void 0) {
    defaultStateValues2 = dropdownDefaultStateValues;
  }
  const value = props[propKey];
  if (value !== void 0) {
    return value;
  }
  const initialValue = props[`initial${capitalizeString(propKey)}`];
  if (initialValue !== void 0) {
    return initialValue;
  }
  return getDefaultValue$1(props, propKey, defaultStateValues2);
}
function getInitialState$2(props) {
  const selectedItem = getInitialValue$1(props, "selectedItem");
  const isOpen = getInitialValue$1(props, "isOpen");
  const highlightedIndex = getInitialValue$1(props, "highlightedIndex");
  const inputValue = getInitialValue$1(props, "inputValue");
  return {
    highlightedIndex: highlightedIndex < 0 && selectedItem && isOpen ? props.items.indexOf(selectedItem) : highlightedIndex,
    isOpen,
    selectedItem,
    inputValue
  };
}
function getHighlightedIndexOnOpen(props, state, offset2, getItemNodeFromIndex) {
  const {
    items,
    initialHighlightedIndex,
    defaultHighlightedIndex
  } = props;
  const {
    selectedItem,
    highlightedIndex
  } = state;
  if (items.length === 0) {
    return -1;
  }
  if (initialHighlightedIndex !== void 0 && highlightedIndex === initialHighlightedIndex) {
    return initialHighlightedIndex;
  }
  if (defaultHighlightedIndex !== void 0) {
    return defaultHighlightedIndex;
  }
  if (selectedItem) {
    if (offset2 === 0) {
      return items.indexOf(selectedItem);
    }
    return getNextWrappingIndex(offset2, items.indexOf(selectedItem), items.length, getItemNodeFromIndex, false);
  }
  if (offset2 === 0) {
    return -1;
  }
  return offset2 < 0 ? items.length - 1 : 0;
}
function useMouseAndTouchTracker(isOpen, downshiftElementRefs, environment, handleBlur) {
  const mouseAndTouchTrackersRef = (0, import_react.useRef)({
    isMouseDown: false,
    isTouchMove: false
  });
  (0, import_react.useEffect)(() => {
    const onMouseDown = () => {
      mouseAndTouchTrackersRef.current.isMouseDown = true;
    };
    const onMouseUp = (event) => {
      mouseAndTouchTrackersRef.current.isMouseDown = false;
      if (isOpen && !targetWithinDownshift(event.target, downshiftElementRefs.map((ref) => ref.current), environment)) {
        handleBlur();
      }
    };
    const onTouchStart = () => {
      mouseAndTouchTrackersRef.current.isTouchMove = false;
    };
    const onTouchMove = () => {
      mouseAndTouchTrackersRef.current.isTouchMove = true;
    };
    const onTouchEnd = (event) => {
      if (isOpen && !mouseAndTouchTrackersRef.current.isTouchMove && !targetWithinDownshift(event.target, downshiftElementRefs.map((ref) => ref.current), environment, false)) {
        handleBlur();
      }
    };
    environment.addEventListener("mousedown", onMouseDown);
    environment.addEventListener("mouseup", onMouseUp);
    environment.addEventListener("touchstart", onTouchStart);
    environment.addEventListener("touchmove", onTouchMove);
    environment.addEventListener("touchend", onTouchEnd);
    return function cleanup() {
      environment.removeEventListener("mousedown", onMouseDown);
      environment.removeEventListener("mouseup", onMouseUp);
      environment.removeEventListener("touchstart", onTouchStart);
      environment.removeEventListener("touchmove", onTouchMove);
      environment.removeEventListener("touchend", onTouchEnd);
    };
  }, [isOpen, environment]);
  return mouseAndTouchTrackersRef;
}
var useGetterPropsCalledChecker = () => noop;
if (true) {
  useGetterPropsCalledChecker = function() {
    const isInitialMountRef = (0, import_react.useRef)(true);
    for (var _len = arguments.length, propKeys = new Array(_len), _key = 0; _key < _len; _key++) {
      propKeys[_key] = arguments[_key];
    }
    const getterPropsCalledRef = (0, import_react.useRef)(propKeys.reduce((acc, propKey) => {
      acc[propKey] = {};
      return acc;
    }, {}));
    (0, import_react.useEffect)(() => {
      Object.keys(getterPropsCalledRef.current).forEach((propKey) => {
        const propCallInfo = getterPropsCalledRef.current[propKey];
        if (isInitialMountRef.current) {
          if (!Object.keys(propCallInfo).length) {
            console.error(`downshift: You forgot to call the ${propKey} getter function on your component / element.`);
            return;
          }
        }
        const {
          suppressRefError,
          refKey,
          elementRef
        } = propCallInfo;
        if ((!elementRef || !elementRef.current) && !suppressRefError) {
          console.error(`downshift: The ref prop "${refKey}" from ${propKey} was not applied correctly on your element.`);
        }
      });
      isInitialMountRef.current = false;
    });
    const setGetterPropCallInfo = (0, import_react.useCallback)((propKey, suppressRefError, refKey, elementRef) => {
      getterPropsCalledRef.current[propKey] = {
        suppressRefError,
        refKey,
        elementRef
      };
    }, []);
    return setGetterPropCallInfo;
  };
}
function useA11yMessageSetter(getA11yMessage, dependencyArray, _ref2) {
  let {
    isInitialMount,
    highlightedIndex,
    items,
    environment,
    ...rest
  } = _ref2;
  (0, import_react.useEffect)(() => {
    if (isInitialMount || false) {
      return;
    }
    updateA11yStatus(() => getA11yMessage({
      highlightedIndex,
      highlightedItem: items[highlightedIndex],
      resultCount: items.length,
      ...rest
    }), environment.document);
  }, dependencyArray);
}
function useScrollIntoView(_ref3) {
  let {
    highlightedIndex,
    isOpen,
    itemRefs,
    getItemNodeFromIndex,
    menuElement,
    scrollIntoView: scrollIntoViewProp
  } = _ref3;
  const shouldScrollRef = (0, import_react.useRef)(true);
  useIsomorphicLayoutEffect(() => {
    if (highlightedIndex < 0 || !isOpen || !Object.keys(itemRefs.current).length) {
      return;
    }
    if (shouldScrollRef.current === false) {
      shouldScrollRef.current = true;
    } else {
      scrollIntoViewProp(getItemNodeFromIndex(highlightedIndex), menuElement);
    }
  }, [highlightedIndex]);
  return shouldScrollRef;
}
var useControlPropsValidator = noop;
if (true) {
  useControlPropsValidator = (_ref4) => {
    let {
      isInitialMount,
      props,
      state
    } = _ref4;
    const prevPropsRef = (0, import_react.useRef)(props);
    (0, import_react.useEffect)(() => {
      if (isInitialMount) {
        return;
      }
      validateControlledUnchanged(state, prevPropsRef.current, props);
      prevPropsRef.current = props;
    }, [state, props, isInitialMount]);
  };
}
function downshiftCommonReducer(state, action, stateChangeTypes2) {
  const {
    type,
    props
  } = action;
  let changes;
  switch (type) {
    case stateChangeTypes2.ItemMouseMove:
      changes = {
        highlightedIndex: action.disabled ? -1 : action.index
      };
      break;
    case stateChangeTypes2.MenuMouseLeave:
      changes = {
        highlightedIndex: -1
      };
      break;
    case stateChangeTypes2.ToggleButtonClick:
    case stateChangeTypes2.FunctionToggleMenu:
      changes = {
        isOpen: !state.isOpen,
        highlightedIndex: state.isOpen ? -1 : getHighlightedIndexOnOpen(props, state, 0)
      };
      break;
    case stateChangeTypes2.FunctionOpenMenu:
      changes = {
        isOpen: true,
        highlightedIndex: getHighlightedIndexOnOpen(props, state, 0)
      };
      break;
    case stateChangeTypes2.FunctionCloseMenu:
      changes = {
        isOpen: false
      };
      break;
    case stateChangeTypes2.FunctionSetHighlightedIndex:
      changes = {
        highlightedIndex: action.highlightedIndex
      };
      break;
    case stateChangeTypes2.FunctionSetInputValue:
      changes = {
        inputValue: action.inputValue
      };
      break;
    case stateChangeTypes2.FunctionReset:
      changes = {
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        isOpen: getDefaultValue$1(props, "isOpen"),
        selectedItem: getDefaultValue$1(props, "selectedItem"),
        inputValue: getDefaultValue$1(props, "inputValue")
      };
      break;
    default:
      throw new Error("Reducer called without proper action type.");
  }
  return {
    ...state,
    ...changes
  };
}
function getItemIndexByCharacterKey(_a) {
  var keysSoFar = _a.keysSoFar, highlightedIndex = _a.highlightedIndex, items = _a.items, itemToString2 = _a.itemToString, getItemNodeFromIndex = _a.getItemNodeFromIndex;
  var lowerCasedKeysSoFar = keysSoFar.toLowerCase();
  for (var index = 0; index < items.length; index++) {
    var offsetIndex = (index + highlightedIndex + 1) % items.length;
    var item = items[offsetIndex];
    if (item !== void 0 && itemToString2(item).toLowerCase().startsWith(lowerCasedKeysSoFar)) {
      var element = getItemNodeFromIndex(offsetIndex);
      if (!(element === null || element === void 0 ? void 0 : element.hasAttribute("disabled"))) {
        return offsetIndex;
      }
    }
  }
  return highlightedIndex;
}
var propTypes$2 = {
  items: import_prop_types.default.array.isRequired,
  itemToString: import_prop_types.default.func,
  getA11yStatusMessage: import_prop_types.default.func,
  getA11ySelectionMessage: import_prop_types.default.func,
  circularNavigation: import_prop_types.default.bool,
  highlightedIndex: import_prop_types.default.number,
  defaultHighlightedIndex: import_prop_types.default.number,
  initialHighlightedIndex: import_prop_types.default.number,
  isOpen: import_prop_types.default.bool,
  defaultIsOpen: import_prop_types.default.bool,
  initialIsOpen: import_prop_types.default.bool,
  selectedItem: import_prop_types.default.any,
  initialSelectedItem: import_prop_types.default.any,
  defaultSelectedItem: import_prop_types.default.any,
  id: import_prop_types.default.string,
  labelId: import_prop_types.default.string,
  menuId: import_prop_types.default.string,
  getItemId: import_prop_types.default.func,
  toggleButtonId: import_prop_types.default.string,
  stateReducer: import_prop_types.default.func,
  onSelectedItemChange: import_prop_types.default.func,
  onHighlightedIndexChange: import_prop_types.default.func,
  onStateChange: import_prop_types.default.func,
  onIsOpenChange: import_prop_types.default.func,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any
    })
  })
};
function getA11yStatusMessage(_a) {
  var isOpen = _a.isOpen, resultCount = _a.resultCount, previousResultCount = _a.previousResultCount;
  if (!isOpen) {
    return "";
  }
  if (!resultCount) {
    return "No results are available.";
  }
  if (resultCount !== previousResultCount) {
    return "".concat(resultCount, " result").concat(resultCount === 1 ? " is" : "s are", " available, use up and down arrow keys to navigate. Press Enter or Space Bar keys to select.");
  }
  return "";
}
var defaultProps$2 = __assign(__assign({}, defaultProps$3), { getA11yStatusMessage });
var validatePropTypes$2 = noop;
if (true) {
  validatePropTypes$2 = function(options, caller) {
    import_prop_types.default.checkPropTypes(propTypes$2, options, "prop", caller.name);
  };
}
var MenuKeyDownArrowDown = true ? "__menu_keydown_arrow_down__" : 0;
var MenuKeyDownArrowUp = true ? "__menu_keydown_arrow_up__" : 1;
var MenuKeyDownEscape = true ? "__menu_keydown_escape__" : 2;
var MenuKeyDownHome = true ? "__menu_keydown_home__" : 3;
var MenuKeyDownEnd = true ? "__menu_keydown_end__" : 4;
var MenuKeyDownEnter = true ? "__menu_keydown_enter__" : 5;
var MenuKeyDownSpaceButton = true ? "__menu_keydown_space_button__" : 6;
var MenuKeyDownCharacter = true ? "__menu_keydown_character__" : 7;
var MenuBlur = true ? "__menu_blur__" : 8;
var MenuMouseLeave$1 = true ? "__menu_mouse_leave__" : 9;
var ItemMouseMove$1 = true ? "__item_mouse_move__" : 10;
var ItemClick$1 = true ? "__item_click__" : 11;
var ToggleButtonClick$1 = true ? "__togglebutton_click__" : 12;
var ToggleButtonKeyDownArrowDown = true ? "__togglebutton_keydown_arrow_down__" : 13;
var ToggleButtonKeyDownArrowUp = true ? "__togglebutton_keydown_arrow_up__" : 14;
var ToggleButtonKeyDownCharacter = true ? "__togglebutton_keydown_character__" : 15;
var FunctionToggleMenu$1 = true ? "__function_toggle_menu__" : 16;
var FunctionOpenMenu$1 = true ? "__function_open_menu__" : 17;
var FunctionCloseMenu$1 = true ? "__function_close_menu__" : 18;
var FunctionSetHighlightedIndex$1 = true ? "__function_set_highlighted_index__" : 19;
var FunctionSelectItem$1 = true ? "__function_select_item__" : 20;
var FunctionSetInputValue$1 = true ? "__function_set_input_value__" : 21;
var FunctionReset$2 = true ? "__function_reset__" : 22;
var stateChangeTypes$2 = Object.freeze({
  __proto__: null,
  MenuKeyDownArrowDown,
  MenuKeyDownArrowUp,
  MenuKeyDownEscape,
  MenuKeyDownHome,
  MenuKeyDownEnd,
  MenuKeyDownEnter,
  MenuKeyDownSpaceButton,
  MenuKeyDownCharacter,
  MenuBlur,
  MenuMouseLeave: MenuMouseLeave$1,
  ItemMouseMove: ItemMouseMove$1,
  ItemClick: ItemClick$1,
  ToggleButtonClick: ToggleButtonClick$1,
  ToggleButtonKeyDownArrowDown,
  ToggleButtonKeyDownArrowUp,
  ToggleButtonKeyDownCharacter,
  FunctionToggleMenu: FunctionToggleMenu$1,
  FunctionOpenMenu: FunctionOpenMenu$1,
  FunctionCloseMenu: FunctionCloseMenu$1,
  FunctionSetHighlightedIndex: FunctionSetHighlightedIndex$1,
  FunctionSelectItem: FunctionSelectItem$1,
  FunctionSetInputValue: FunctionSetInputValue$1,
  FunctionReset: FunctionReset$2
});
function downshiftSelectReducer(state, action) {
  const {
    type,
    props,
    shiftKey
  } = action;
  let changes;
  switch (type) {
    case ItemClick$1:
      changes = {
        isOpen: getDefaultValue$1(props, "isOpen"),
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        selectedItem: props.items[action.index]
      };
      break;
    case ToggleButtonKeyDownCharacter:
      {
        const lowercasedKey = action.key;
        const inputValue = `${state.inputValue}${lowercasedKey}`;
        const itemIndex = getItemIndexByCharacterKey({
          keysSoFar: inputValue,
          highlightedIndex: state.selectedItem ? props.items.indexOf(state.selectedItem) : -1,
          items: props.items,
          itemToString: props.itemToString,
          getItemNodeFromIndex: action.getItemNodeFromIndex
        });
        changes = {
          inputValue,
          ...itemIndex >= 0 && {
            selectedItem: props.items[itemIndex]
          }
        };
      }
      break;
    case ToggleButtonKeyDownArrowDown:
      changes = {
        highlightedIndex: getHighlightedIndexOnOpen(props, state, 1, action.getItemNodeFromIndex),
        isOpen: true
      };
      break;
    case ToggleButtonKeyDownArrowUp:
      changes = {
        highlightedIndex: getHighlightedIndexOnOpen(props, state, -1, action.getItemNodeFromIndex),
        isOpen: true
      };
      break;
    case MenuKeyDownEnter:
    case MenuKeyDownSpaceButton:
      changes = {
        isOpen: getDefaultValue$1(props, "isOpen"),
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        ...state.highlightedIndex >= 0 && {
          selectedItem: props.items[state.highlightedIndex]
        }
      };
      break;
    case MenuKeyDownHome:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(1, 0, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case MenuKeyDownEnd:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(-1, props.items.length - 1, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case MenuKeyDownEscape:
      changes = {
        isOpen: false,
        highlightedIndex: -1
      };
      break;
    case MenuBlur:
      changes = {
        isOpen: false,
        highlightedIndex: -1
      };
      break;
    case MenuKeyDownCharacter:
      {
        const lowercasedKey = action.key;
        const inputValue = `${state.inputValue}${lowercasedKey}`;
        const highlightedIndex = getItemIndexByCharacterKey({
          keysSoFar: inputValue,
          highlightedIndex: state.highlightedIndex,
          items: props.items,
          itemToString: props.itemToString,
          getItemNodeFromIndex: action.getItemNodeFromIndex
        });
        changes = {
          inputValue,
          ...highlightedIndex >= 0 && {
            highlightedIndex
          }
        };
      }
      break;
    case MenuKeyDownArrowDown:
      changes = {
        highlightedIndex: getNextWrappingIndex(shiftKey ? 5 : 1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
      };
      break;
    case MenuKeyDownArrowUp:
      changes = {
        highlightedIndex: getNextWrappingIndex(shiftKey ? -5 : -1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
      };
      break;
    case FunctionSelectItem$1:
      changes = {
        selectedItem: action.selectedItem
      };
      break;
    default:
      return downshiftCommonReducer(state, action, stateChangeTypes$2);
  }
  return {
    ...state,
    ...changes
  };
}
useSelect.stateChangeTypes = stateChangeTypes$2;
function useSelect(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes$2(userProps, useSelect);
  const props = {
    ...defaultProps$2,
    ...userProps
  };
  const {
    items,
    scrollIntoView: scrollIntoView2,
    environment,
    initialIsOpen,
    defaultIsOpen,
    itemToString: itemToString2,
    getA11ySelectionMessage: getA11ySelectionMessage2,
    getA11yStatusMessage: getA11yStatusMessage2
  } = props;
  const initialState = getInitialState$2(props);
  const [state, dispatch] = useControlledReducer$1(downshiftSelectReducer, initialState, props);
  const {
    isOpen,
    highlightedIndex,
    selectedItem,
    inputValue
  } = state;
  const toggleButtonRef = (0, import_react.useRef)(null);
  const menuRef = (0, import_react.useRef)(null);
  const itemRefs = (0, import_react.useRef)({});
  const shouldBlurRef = (0, import_react.useRef)(true);
  const clearTimeoutRef = (0, import_react.useRef)(null);
  const elementIds = useElementIds(props);
  const previousResultCountRef = (0, import_react.useRef)();
  const isInitialMountRef = (0, import_react.useRef)(true);
  const latest = useLatestRef({
    state,
    props
  });
  const getItemNodeFromIndex = (0, import_react.useCallback)((index) => itemRefs.current[elementIds.getItemId(index)], [elementIds]);
  useA11yMessageSetter(getA11yStatusMessage2, [isOpen, highlightedIndex, inputValue, items], {
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2,
    ...state
  });
  useA11yMessageSetter(getA11ySelectionMessage2, [selectedItem], {
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2,
    ...state
  });
  const shouldScrollRef = useScrollIntoView({
    menuElement: menuRef.current,
    highlightedIndex,
    isOpen,
    itemRefs,
    scrollIntoView: scrollIntoView2,
    getItemNodeFromIndex
  });
  (0, import_react.useEffect)(() => {
    clearTimeoutRef.current = debounce((outerDispatch) => {
      outerDispatch({
        type: FunctionSetInputValue$1,
        inputValue: ""
      });
    }, 500);
    return () => {
      clearTimeoutRef.current.cancel();
    };
  }, []);
  (0, import_react.useEffect)(() => {
    if (!inputValue) {
      return;
    }
    clearTimeoutRef.current(dispatch);
  }, [dispatch, inputValue]);
  useControlPropsValidator({
    isInitialMount: isInitialMountRef.current,
    props,
    state
  });
  (0, import_react.useEffect)(() => {
    if (isInitialMountRef.current) {
      if ((initialIsOpen || defaultIsOpen || isOpen) && menuRef.current) {
        menuRef.current.focus();
      }
      return;
    }
    if (isOpen) {
      if (menuRef.current) {
        menuRef.current.focus();
      }
      return;
    }
    if (environment.document.activeElement === menuRef.current) {
      if (toggleButtonRef.current) {
        shouldBlurRef.current = false;
        toggleButtonRef.current.focus();
      }
    }
  }, [isOpen]);
  (0, import_react.useEffect)(() => {
    if (isInitialMountRef.current) {
      return;
    }
    previousResultCountRef.current = items.length;
  });
  const mouseAndTouchTrackersRef = useMouseAndTouchTracker(isOpen, [menuRef, toggleButtonRef], environment, () => {
    dispatch({
      type: MenuBlur
    });
  });
  const setGetterPropCallInfo = useGetterPropsCalledChecker("getMenuProps", "getToggleButtonProps");
  (0, import_react.useEffect)(() => {
    isInitialMountRef.current = false;
  }, []);
  (0, import_react.useEffect)(() => {
    if (!isOpen) {
      itemRefs.current = {};
    }
  }, [isOpen]);
  const toggleButtonKeyDownHandlers = (0, import_react.useMemo)(() => ({
    ArrowDown(event) {
      event.preventDefault();
      dispatch({
        type: ToggleButtonKeyDownArrowDown,
        getItemNodeFromIndex,
        shiftKey: event.shiftKey
      });
    },
    ArrowUp(event) {
      event.preventDefault();
      dispatch({
        type: ToggleButtonKeyDownArrowUp,
        getItemNodeFromIndex,
        shiftKey: event.shiftKey
      });
    }
  }), [dispatch, getItemNodeFromIndex]);
  const menuKeyDownHandlers = (0, import_react.useMemo)(() => ({
    ArrowDown(event) {
      event.preventDefault();
      dispatch({
        type: MenuKeyDownArrowDown,
        getItemNodeFromIndex,
        shiftKey: event.shiftKey
      });
    },
    ArrowUp(event) {
      event.preventDefault();
      dispatch({
        type: MenuKeyDownArrowUp,
        getItemNodeFromIndex,
        shiftKey: event.shiftKey
      });
    },
    Home(event) {
      event.preventDefault();
      dispatch({
        type: MenuKeyDownHome,
        getItemNodeFromIndex
      });
    },
    End(event) {
      event.preventDefault();
      dispatch({
        type: MenuKeyDownEnd,
        getItemNodeFromIndex
      });
    },
    Escape() {
      dispatch({
        type: MenuKeyDownEscape
      });
    },
    Enter(event) {
      event.preventDefault();
      dispatch({
        type: MenuKeyDownEnter
      });
    },
    " "(event) {
      event.preventDefault();
      dispatch({
        type: MenuKeyDownSpaceButton
      });
    }
  }), [dispatch, getItemNodeFromIndex]);
  const toggleMenu = (0, import_react.useCallback)(() => {
    dispatch({
      type: FunctionToggleMenu$1
    });
  }, [dispatch]);
  const closeMenu = (0, import_react.useCallback)(() => {
    dispatch({
      type: FunctionCloseMenu$1
    });
  }, [dispatch]);
  const openMenu = (0, import_react.useCallback)(() => {
    dispatch({
      type: FunctionOpenMenu$1
    });
  }, [dispatch]);
  const setHighlightedIndex = (0, import_react.useCallback)((newHighlightedIndex) => {
    dispatch({
      type: FunctionSetHighlightedIndex$1,
      highlightedIndex: newHighlightedIndex
    });
  }, [dispatch]);
  const selectItem = (0, import_react.useCallback)((newSelectedItem) => {
    dispatch({
      type: FunctionSelectItem$1,
      selectedItem: newSelectedItem
    });
  }, [dispatch]);
  const reset = (0, import_react.useCallback)(() => {
    dispatch({
      type: FunctionReset$2
    });
  }, [dispatch]);
  const setInputValue = (0, import_react.useCallback)((newInputValue) => {
    dispatch({
      type: FunctionSetInputValue$1,
      inputValue: newInputValue
    });
  }, [dispatch]);
  const getLabelProps = (0, import_react.useCallback)((labelProps) => ({
    id: elementIds.labelId,
    htmlFor: elementIds.toggleButtonId,
    ...labelProps
  }), [elementIds]);
  const getMenuProps = (0, import_react.useCallback)(function(_temp, _temp2) {
    let {
      onMouseLeave,
      refKey = "ref",
      onKeyDown,
      onBlur,
      ref,
      ...rest
    } = _temp === void 0 ? {} : _temp;
    let {
      suppressRefError = false
    } = _temp2 === void 0 ? {} : _temp2;
    const latestState = latest.current.state;
    const menuHandleKeyDown = (event) => {
      const key = normalizeArrowKey(event);
      if (key && menuKeyDownHandlers[key]) {
        menuKeyDownHandlers[key](event);
      } else if (isAcceptedCharacterKey(key)) {
        dispatch({
          type: MenuKeyDownCharacter,
          key,
          getItemNodeFromIndex
        });
      }
    };
    const menuHandleBlur = () => {
      if (shouldBlurRef.current === false) {
        shouldBlurRef.current = true;
        return;
      }
      const shouldBlur = !mouseAndTouchTrackersRef.current.isMouseDown;
      if (shouldBlur) {
        dispatch({
          type: MenuBlur
        });
      }
    };
    const menuHandleMouseLeave = () => {
      dispatch({
        type: MenuMouseLeave$1
      });
    };
    setGetterPropCallInfo("getMenuProps", suppressRefError, refKey, menuRef);
    return {
      [refKey]: handleRefs(ref, (menuNode) => {
        menuRef.current = menuNode;
      }),
      id: elementIds.menuId,
      role: "listbox",
      "aria-labelledby": elementIds.labelId,
      tabIndex: -1,
      ...latestState.isOpen && latestState.highlightedIndex > -1 && {
        "aria-activedescendant": elementIds.getItemId(latestState.highlightedIndex)
      },
      onMouseLeave: callAllEventHandlers(onMouseLeave, menuHandleMouseLeave),
      onKeyDown: callAllEventHandlers(onKeyDown, menuHandleKeyDown),
      onBlur: callAllEventHandlers(onBlur, menuHandleBlur),
      ...rest
    };
  }, [dispatch, latest, menuKeyDownHandlers, mouseAndTouchTrackersRef, setGetterPropCallInfo, elementIds, getItemNodeFromIndex]);
  const getToggleButtonProps = (0, import_react.useCallback)(function(_temp3, _temp4) {
    let {
      onClick,
      onKeyDown,
      refKey = "ref",
      ref,
      ...rest
    } = _temp3 === void 0 ? {} : _temp3;
    let {
      suppressRefError = false
    } = _temp4 === void 0 ? {} : _temp4;
    const toggleButtonHandleClick = () => {
      dispatch({
        type: ToggleButtonClick$1
      });
    };
    const toggleButtonHandleKeyDown = (event) => {
      const key = normalizeArrowKey(event);
      if (key && toggleButtonKeyDownHandlers[key]) {
        toggleButtonKeyDownHandlers[key](event);
      } else if (isAcceptedCharacterKey(key)) {
        dispatch({
          type: ToggleButtonKeyDownCharacter,
          key,
          getItemNodeFromIndex
        });
      }
    };
    const toggleProps = {
      [refKey]: handleRefs(ref, (toggleButtonNode) => {
        toggleButtonRef.current = toggleButtonNode;
      }),
      id: elementIds.toggleButtonId,
      "aria-haspopup": "listbox",
      "aria-expanded": latest.current.state.isOpen,
      "aria-labelledby": `${elementIds.labelId} ${elementIds.toggleButtonId}`,
      ...rest
    };
    if (!rest.disabled) {
      toggleProps.onClick = callAllEventHandlers(onClick, toggleButtonHandleClick);
      toggleProps.onKeyDown = callAllEventHandlers(onKeyDown, toggleButtonHandleKeyDown);
    }
    setGetterPropCallInfo("getToggleButtonProps", suppressRefError, refKey, toggleButtonRef);
    return toggleProps;
  }, [dispatch, latest, toggleButtonKeyDownHandlers, setGetterPropCallInfo, elementIds, getItemNodeFromIndex]);
  const getItemProps = (0, import_react.useCallback)(function(_temp5) {
    let {
      item,
      index,
      onMouseMove,
      onClick,
      refKey = "ref",
      ref,
      disabled,
      ...rest
    } = _temp5 === void 0 ? {} : _temp5;
    const {
      state: latestState,
      props: latestProps
    } = latest.current;
    const itemHandleMouseMove = () => {
      if (index === latestState.highlightedIndex) {
        return;
      }
      shouldScrollRef.current = false;
      dispatch({
        type: ItemMouseMove$1,
        index,
        disabled
      });
    };
    const itemHandleClick = () => {
      dispatch({
        type: ItemClick$1,
        index
      });
    };
    const itemIndex = getItemIndex(index, item, latestProps.items);
    if (itemIndex < 0) {
      throw new Error("Pass either item or item index in getItemProps!");
    }
    const itemProps = {
      disabled,
      role: "option",
      "aria-selected": `${itemIndex === latestState.highlightedIndex}`,
      id: elementIds.getItemId(itemIndex),
      [refKey]: handleRefs(ref, (itemNode) => {
        if (itemNode) {
          itemRefs.current[elementIds.getItemId(itemIndex)] = itemNode;
        }
      }),
      ...rest
    };
    if (!disabled) {
      itemProps.onClick = callAllEventHandlers(onClick, itemHandleClick);
    }
    itemProps.onMouseMove = callAllEventHandlers(onMouseMove, itemHandleMouseMove);
    return itemProps;
  }, [dispatch, latest, shouldScrollRef, elementIds]);
  return {
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    toggleMenu,
    openMenu,
    closeMenu,
    setHighlightedIndex,
    selectItem,
    reset,
    setInputValue,
    highlightedIndex,
    isOpen,
    selectedItem,
    inputValue
  };
}
var InputKeyDownArrowDown = true ? "__input_keydown_arrow_down__" : 0;
var InputKeyDownArrowUp = true ? "__input_keydown_arrow_up__" : 1;
var InputKeyDownEscape = true ? "__input_keydown_escape__" : 2;
var InputKeyDownHome = true ? "__input_keydown_home__" : 3;
var InputKeyDownEnd = true ? "__input_keydown_end__" : 4;
var InputKeyDownEnter = true ? "__input_keydown_enter__" : 5;
var InputChange = true ? "__input_change__" : 6;
var InputBlur = true ? "__input_blur__" : 7;
var MenuMouseLeave = true ? "__menu_mouse_leave__" : 8;
var ItemMouseMove = true ? "__item_mouse_move__" : 9;
var ItemClick = true ? "__item_click__" : 10;
var ToggleButtonClick = true ? "__togglebutton_click__" : 11;
var FunctionToggleMenu = true ? "__function_toggle_menu__" : 12;
var FunctionOpenMenu = true ? "__function_open_menu__" : 13;
var FunctionCloseMenu = true ? "__function_close_menu__" : 14;
var FunctionSetHighlightedIndex = true ? "__function_set_highlighted_index__" : 15;
var FunctionSelectItem = true ? "__function_select_item__" : 16;
var FunctionSetInputValue = true ? "__function_set_input_value__" : 17;
var FunctionReset$1 = true ? "__function_reset__" : 18;
var ControlledPropUpdatedSelectedItem = true ? "__controlled_prop_updated_selected_item__" : 19;
var stateChangeTypes$1 = Object.freeze({
  __proto__: null,
  InputKeyDownArrowDown,
  InputKeyDownArrowUp,
  InputKeyDownEscape,
  InputKeyDownHome,
  InputKeyDownEnd,
  InputKeyDownEnter,
  InputChange,
  InputBlur,
  MenuMouseLeave,
  ItemMouseMove,
  ItemClick,
  ToggleButtonClick,
  FunctionToggleMenu,
  FunctionOpenMenu,
  FunctionCloseMenu,
  FunctionSetHighlightedIndex,
  FunctionSelectItem,
  FunctionSetInputValue,
  FunctionReset: FunctionReset$1,
  ControlledPropUpdatedSelectedItem
});
function getInitialState$1(props) {
  const initialState = getInitialState$2(props);
  const {
    selectedItem
  } = initialState;
  let {
    inputValue
  } = initialState;
  if (inputValue === "" && selectedItem && props.defaultInputValue === void 0 && props.initialInputValue === void 0 && props.inputValue === void 0) {
    inputValue = props.itemToString(selectedItem);
  }
  return {
    ...initialState,
    inputValue
  };
}
var propTypes$1 = {
  items: import_prop_types.default.array.isRequired,
  itemToString: import_prop_types.default.func,
  getA11yStatusMessage: import_prop_types.default.func,
  getA11ySelectionMessage: import_prop_types.default.func,
  circularNavigation: import_prop_types.default.bool,
  highlightedIndex: import_prop_types.default.number,
  defaultHighlightedIndex: import_prop_types.default.number,
  initialHighlightedIndex: import_prop_types.default.number,
  isOpen: import_prop_types.default.bool,
  defaultIsOpen: import_prop_types.default.bool,
  initialIsOpen: import_prop_types.default.bool,
  selectedItem: import_prop_types.default.any,
  initialSelectedItem: import_prop_types.default.any,
  defaultSelectedItem: import_prop_types.default.any,
  inputValue: import_prop_types.default.string,
  defaultInputValue: import_prop_types.default.string,
  initialInputValue: import_prop_types.default.string,
  id: import_prop_types.default.string,
  labelId: import_prop_types.default.string,
  menuId: import_prop_types.default.string,
  getItemId: import_prop_types.default.func,
  inputId: import_prop_types.default.string,
  toggleButtonId: import_prop_types.default.string,
  stateReducer: import_prop_types.default.func,
  onSelectedItemChange: import_prop_types.default.func,
  onHighlightedIndexChange: import_prop_types.default.func,
  onStateChange: import_prop_types.default.func,
  onIsOpenChange: import_prop_types.default.func,
  onInputValueChange: import_prop_types.default.func,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any
    })
  })
};
function useControlledReducer(reducer, initialState, props) {
  const previousSelectedItemRef = (0, import_react.useRef)();
  const [state, dispatch] = useEnhancedReducer(reducer, initialState, props);
  (0, import_react.useEffect)(() => {
    if (isControlledProp(props, "selectedItem")) {
      if (previousSelectedItemRef.current !== props.selectedItem) {
        dispatch({
          type: ControlledPropUpdatedSelectedItem,
          inputValue: props.itemToString(props.selectedItem)
        });
      }
      previousSelectedItemRef.current = state.selectedItem === previousSelectedItemRef.current ? props.selectedItem : state.selectedItem;
    }
  });
  return [getState(state, props), dispatch];
}
var validatePropTypes$1 = noop;
if (true) {
  validatePropTypes$1 = (options, caller) => {
    import_prop_types.default.checkPropTypes(propTypes$1, options, "prop", caller.name);
  };
}
var defaultProps$1 = {
  ...defaultProps$3,
  getA11yStatusMessage: getA11yStatusMessage$1,
  circularNavigation: true
};
function downshiftUseComboboxReducer(state, action) {
  const {
    type,
    props,
    shiftKey
  } = action;
  let changes;
  switch (type) {
    case ItemClick:
      changes = {
        isOpen: getDefaultValue$1(props, "isOpen"),
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        selectedItem: props.items[action.index],
        inputValue: props.itemToString(props.items[action.index])
      };
      break;
    case InputKeyDownArrowDown:
      if (state.isOpen) {
        changes = {
          highlightedIndex: getNextWrappingIndex(shiftKey ? 5 : 1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
        };
      } else {
        changes = {
          highlightedIndex: getHighlightedIndexOnOpen(props, state, 1, action.getItemNodeFromIndex),
          isOpen: props.items.length >= 0
        };
      }
      break;
    case InputKeyDownArrowUp:
      if (state.isOpen) {
        changes = {
          highlightedIndex: getNextWrappingIndex(shiftKey ? -5 : -1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
        };
      } else {
        changes = {
          highlightedIndex: getHighlightedIndexOnOpen(props, state, -1, action.getItemNodeFromIndex),
          isOpen: props.items.length >= 0
        };
      }
      break;
    case InputKeyDownEnter:
      changes = {
        ...state.isOpen && state.highlightedIndex >= 0 && {
          selectedItem: props.items[state.highlightedIndex],
          isOpen: getDefaultValue$1(props, "isOpen"),
          highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
          inputValue: props.itemToString(props.items[state.highlightedIndex])
        }
      };
      break;
    case InputKeyDownEscape:
      changes = {
        isOpen: false,
        highlightedIndex: -1,
        ...!state.isOpen && {
          selectedItem: null,
          inputValue: ""
        }
      };
      break;
    case InputKeyDownHome:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(1, 0, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case InputKeyDownEnd:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(-1, props.items.length - 1, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case InputBlur:
      changes = {
        isOpen: false,
        highlightedIndex: -1,
        ...state.highlightedIndex >= 0 && action.selectItem && {
          selectedItem: props.items[state.highlightedIndex],
          inputValue: props.itemToString(props.items[state.highlightedIndex])
        }
      };
      break;
    case InputChange:
      changes = {
        isOpen: true,
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        inputValue: action.inputValue
      };
      break;
    case FunctionSelectItem:
      changes = {
        selectedItem: action.selectedItem,
        inputValue: props.itemToString(action.selectedItem)
      };
      break;
    case ControlledPropUpdatedSelectedItem:
      changes = {
        inputValue: action.inputValue
      };
      break;
    default:
      return downshiftCommonReducer(state, action, stateChangeTypes$1);
  }
  return {
    ...state,
    ...changes
  };
}
useCombobox.stateChangeTypes = stateChangeTypes$1;
function useCombobox(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes$1(userProps, useCombobox);
  const props = {
    ...defaultProps$1,
    ...userProps
  };
  const {
    initialIsOpen,
    defaultIsOpen,
    items,
    scrollIntoView: scrollIntoView2,
    environment,
    getA11yStatusMessage: getA11yStatusMessage2,
    getA11ySelectionMessage: getA11ySelectionMessage2,
    itemToString: itemToString2
  } = props;
  const initialState = getInitialState$1(props);
  const [state, dispatch] = useControlledReducer(downshiftUseComboboxReducer, initialState, props);
  const {
    isOpen,
    highlightedIndex,
    selectedItem,
    inputValue
  } = state;
  const menuRef = (0, import_react.useRef)(null);
  const itemRefs = (0, import_react.useRef)({});
  const inputRef = (0, import_react.useRef)(null);
  const toggleButtonRef = (0, import_react.useRef)(null);
  const comboboxRef = (0, import_react.useRef)(null);
  const isInitialMountRef = (0, import_react.useRef)(true);
  const elementIds = useElementIds(props);
  const previousResultCountRef = (0, import_react.useRef)();
  const latest = useLatestRef({
    state,
    props
  });
  const getItemNodeFromIndex = (0, import_react.useCallback)((index) => itemRefs.current[elementIds.getItemId(index)], [elementIds]);
  useA11yMessageSetter(getA11yStatusMessage2, [isOpen, highlightedIndex, inputValue, items], {
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2,
    ...state
  });
  useA11yMessageSetter(getA11ySelectionMessage2, [selectedItem], {
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2,
    ...state
  });
  const shouldScrollRef = useScrollIntoView({
    menuElement: menuRef.current,
    highlightedIndex,
    isOpen,
    itemRefs,
    scrollIntoView: scrollIntoView2,
    getItemNodeFromIndex
  });
  useControlPropsValidator({
    isInitialMount: isInitialMountRef.current,
    props,
    state
  });
  (0, import_react.useEffect)(() => {
    const focusOnOpen = initialIsOpen || defaultIsOpen || isOpen;
    if (focusOnOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  (0, import_react.useEffect)(() => {
    if (isInitialMountRef.current) {
      return;
    }
    previousResultCountRef.current = items.length;
  });
  const mouseAndTouchTrackersRef = useMouseAndTouchTracker(isOpen, [comboboxRef, menuRef, toggleButtonRef], environment, () => {
    dispatch({
      type: InputBlur,
      selectItem: false
    });
  });
  const setGetterPropCallInfo = useGetterPropsCalledChecker("getInputProps", "getComboboxProps", "getMenuProps");
  (0, import_react.useEffect)(() => {
    isInitialMountRef.current = false;
  }, []);
  (0, import_react.useEffect)(() => {
    if (!isOpen) {
      itemRefs.current = {};
    }
  }, [isOpen]);
  const inputKeyDownHandlers = (0, import_react.useMemo)(() => ({
    ArrowDown(event) {
      event.preventDefault();
      dispatch({
        type: InputKeyDownArrowDown,
        shiftKey: event.shiftKey,
        getItemNodeFromIndex
      });
    },
    ArrowUp(event) {
      event.preventDefault();
      dispatch({
        type: InputKeyDownArrowUp,
        shiftKey: event.shiftKey,
        getItemNodeFromIndex
      });
    },
    Home(event) {
      if (!latest.current.state.isOpen) {
        return;
      }
      event.preventDefault();
      dispatch({
        type: InputKeyDownHome,
        getItemNodeFromIndex
      });
    },
    End(event) {
      if (!latest.current.state.isOpen) {
        return;
      }
      event.preventDefault();
      dispatch({
        type: InputKeyDownEnd,
        getItemNodeFromIndex
      });
    },
    Escape(event) {
      const latestState = latest.current.state;
      if (latestState.isOpen || latestState.inputValue || latestState.selectedItem || latestState.highlightedIndex > -1) {
        event.preventDefault();
        dispatch({
          type: InputKeyDownEscape
        });
      }
    },
    Enter(event) {
      const latestState = latest.current.state;
      if (!latestState.isOpen || latestState.highlightedIndex < 0 || event.which === 229) {
        return;
      }
      event.preventDefault();
      dispatch({
        type: InputKeyDownEnter,
        getItemNodeFromIndex
      });
    }
  }), [dispatch, latest, getItemNodeFromIndex]);
  const getLabelProps = (0, import_react.useCallback)((labelProps) => ({
    id: elementIds.labelId,
    htmlFor: elementIds.inputId,
    ...labelProps
  }), [elementIds]);
  const getMenuProps = (0, import_react.useCallback)(function(_temp, _temp2) {
    let {
      onMouseLeave,
      refKey = "ref",
      ref,
      ...rest
    } = _temp === void 0 ? {} : _temp;
    let {
      suppressRefError = false
    } = _temp2 === void 0 ? {} : _temp2;
    setGetterPropCallInfo("getMenuProps", suppressRefError, refKey, menuRef);
    return {
      [refKey]: handleRefs(ref, (menuNode) => {
        menuRef.current = menuNode;
      }),
      id: elementIds.menuId,
      role: "listbox",
      "aria-labelledby": elementIds.labelId,
      onMouseLeave: callAllEventHandlers(onMouseLeave, () => {
        dispatch({
          type: MenuMouseLeave
        });
      }),
      ...rest
    };
  }, [dispatch, setGetterPropCallInfo, elementIds]);
  const getItemProps = (0, import_react.useCallback)(function(_temp3) {
    let {
      item,
      index,
      refKey = "ref",
      ref,
      onMouseMove,
      onMouseDown,
      onClick,
      onPress,
      disabled,
      ...rest
    } = _temp3 === void 0 ? {} : _temp3;
    const {
      props: latestProps,
      state: latestState
    } = latest.current;
    const itemIndex = getItemIndex(index, item, latestProps.items);
    if (itemIndex < 0) {
      throw new Error("Pass either item or item index in getItemProps!");
    }
    const onSelectKey = "onClick";
    const customClickHandler = onClick;
    const itemHandleMouseMove = () => {
      if (index === latestState.highlightedIndex) {
        return;
      }
      shouldScrollRef.current = false;
      dispatch({
        type: ItemMouseMove,
        index,
        disabled
      });
    };
    const itemHandleClick = () => {
      dispatch({
        type: ItemClick,
        index
      });
    };
    const itemHandleMouseDown = (e2) => e2.preventDefault();
    return {
      [refKey]: handleRefs(ref, (itemNode) => {
        if (itemNode) {
          itemRefs.current[elementIds.getItemId(itemIndex)] = itemNode;
        }
      }),
      disabled,
      role: "option",
      "aria-selected": `${itemIndex === latestState.highlightedIndex}`,
      id: elementIds.getItemId(itemIndex),
      ...!disabled && {
        [onSelectKey]: callAllEventHandlers(customClickHandler, itemHandleClick)
      },
      onMouseMove: callAllEventHandlers(onMouseMove, itemHandleMouseMove),
      onMouseDown: callAllEventHandlers(onMouseDown, itemHandleMouseDown),
      ...rest
    };
  }, [dispatch, latest, shouldScrollRef, elementIds]);
  const getToggleButtonProps = (0, import_react.useCallback)(function(_temp4) {
    let {
      onClick,
      onPress,
      refKey = "ref",
      ref,
      ...rest
    } = _temp4 === void 0 ? {} : _temp4;
    const toggleButtonHandleClick = () => {
      dispatch({
        type: ToggleButtonClick
      });
      if (!latest.current.state.isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    };
    return {
      [refKey]: handleRefs(ref, (toggleButtonNode) => {
        toggleButtonRef.current = toggleButtonNode;
      }),
      id: elementIds.toggleButtonId,
      tabIndex: -1,
      ...!rest.disabled && {
        ...{
          onClick: callAllEventHandlers(onClick, toggleButtonHandleClick)
        }
      },
      ...rest
    };
  }, [dispatch, latest, elementIds]);
  const getInputProps = (0, import_react.useCallback)(function(_temp5, _temp6) {
    let {
      onKeyDown,
      onChange,
      onInput,
      onBlur,
      onChangeText,
      refKey = "ref",
      ref,
      ...rest
    } = _temp5 === void 0 ? {} : _temp5;
    let {
      suppressRefError = false
    } = _temp6 === void 0 ? {} : _temp6;
    setGetterPropCallInfo("getInputProps", suppressRefError, refKey, inputRef);
    const latestState = latest.current.state;
    const inputHandleKeyDown = (event) => {
      const key = normalizeArrowKey(event);
      if (key && inputKeyDownHandlers[key]) {
        inputKeyDownHandlers[key](event);
      }
    };
    const inputHandleChange = (event) => {
      dispatch({
        type: InputChange,
        inputValue: event.target.value
      });
    };
    const inputHandleBlur = () => {
      if (latestState.isOpen && !mouseAndTouchTrackersRef.current.isMouseDown) {
        dispatch({
          type: InputBlur,
          selectItem: true
        });
      }
    };
    const onChangeKey = "onChange";
    let eventHandlers = {};
    if (!rest.disabled) {
      eventHandlers = {
        [onChangeKey]: callAllEventHandlers(onChange, onInput, inputHandleChange),
        onKeyDown: callAllEventHandlers(onKeyDown, inputHandleKeyDown),
        onBlur: callAllEventHandlers(onBlur, inputHandleBlur)
      };
    }
    return {
      [refKey]: handleRefs(ref, (inputNode) => {
        inputRef.current = inputNode;
      }),
      id: elementIds.inputId,
      "aria-autocomplete": "list",
      "aria-controls": elementIds.menuId,
      ...latestState.isOpen && latestState.highlightedIndex > -1 && {
        "aria-activedescendant": elementIds.getItemId(latestState.highlightedIndex)
      },
      "aria-labelledby": elementIds.labelId,
      autoComplete: "off",
      value: latestState.inputValue,
      ...eventHandlers,
      ...rest
    };
  }, [dispatch, inputKeyDownHandlers, latest, mouseAndTouchTrackersRef, setGetterPropCallInfo, elementIds]);
  const getComboboxProps = (0, import_react.useCallback)(function(_temp7, _temp8) {
    let {
      refKey = "ref",
      ref,
      ...rest
    } = _temp7 === void 0 ? {} : _temp7;
    let {
      suppressRefError = false
    } = _temp8 === void 0 ? {} : _temp8;
    setGetterPropCallInfo("getComboboxProps", suppressRefError, refKey, comboboxRef);
    return {
      [refKey]: handleRefs(ref, (comboboxNode) => {
        comboboxRef.current = comboboxNode;
      }),
      role: "combobox",
      "aria-haspopup": "listbox",
      "aria-owns": elementIds.menuId,
      "aria-expanded": latest.current.state.isOpen,
      ...rest
    };
  }, [latest, setGetterPropCallInfo, elementIds]);
  const toggleMenu = (0, import_react.useCallback)(() => {
    dispatch({
      type: FunctionToggleMenu
    });
  }, [dispatch]);
  const closeMenu = (0, import_react.useCallback)(() => {
    dispatch({
      type: FunctionCloseMenu
    });
  }, [dispatch]);
  const openMenu = (0, import_react.useCallback)(() => {
    dispatch({
      type: FunctionOpenMenu
    });
  }, [dispatch]);
  const setHighlightedIndex = (0, import_react.useCallback)((newHighlightedIndex) => {
    dispatch({
      type: FunctionSetHighlightedIndex,
      highlightedIndex: newHighlightedIndex
    });
  }, [dispatch]);
  const selectItem = (0, import_react.useCallback)((newSelectedItem) => {
    dispatch({
      type: FunctionSelectItem,
      selectedItem: newSelectedItem
    });
  }, [dispatch]);
  const setInputValue = (0, import_react.useCallback)((newInputValue) => {
    dispatch({
      type: FunctionSetInputValue,
      inputValue: newInputValue
    });
  }, [dispatch]);
  const reset = (0, import_react.useCallback)(() => {
    dispatch({
      type: FunctionReset$1
    });
  }, [dispatch]);
  return {
    getItemProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getToggleButtonProps,
    toggleMenu,
    openMenu,
    closeMenu,
    setHighlightedIndex,
    setInputValue,
    selectItem,
    reset,
    highlightedIndex,
    isOpen,
    selectedItem,
    inputValue
  };
}
var defaultStateValues = {
  activeIndex: -1,
  selectedItems: []
};
function getInitialValue(props, propKey) {
  return getInitialValue$1(props, propKey, defaultStateValues);
}
function getDefaultValue(props, propKey) {
  return getDefaultValue$1(props, propKey, defaultStateValues);
}
function getInitialState(props) {
  const activeIndex = getInitialValue(props, "activeIndex");
  const selectedItems = getInitialValue(props, "selectedItems");
  return {
    activeIndex,
    selectedItems
  };
}
function isKeyDownOperationPermitted(event) {
  if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
    return false;
  }
  const element = event.target;
  if (element instanceof HTMLInputElement && element.value !== "" && (element.selectionStart !== 0 || element.selectionEnd !== 0)) {
    return false;
  }
  return true;
}
function getA11yRemovalMessage(selectionParameters) {
  const {
    removedSelectedItem,
    itemToString: itemToStringLocal
  } = selectionParameters;
  return `${itemToStringLocal(removedSelectedItem)} has been removed.`;
}
var propTypes = {
  selectedItems: import_prop_types.default.array,
  initialSelectedItems: import_prop_types.default.array,
  defaultSelectedItems: import_prop_types.default.array,
  itemToString: import_prop_types.default.func,
  getA11yRemovalMessage: import_prop_types.default.func,
  stateReducer: import_prop_types.default.func,
  activeIndex: import_prop_types.default.number,
  initialActiveIndex: import_prop_types.default.number,
  defaultActiveIndex: import_prop_types.default.number,
  onActiveIndexChange: import_prop_types.default.func,
  onSelectedItemsChange: import_prop_types.default.func,
  keyNavigationNext: import_prop_types.default.string,
  keyNavigationPrevious: import_prop_types.default.string,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any
    })
  })
};
var defaultProps = {
  itemToString: defaultProps$3.itemToString,
  stateReducer: defaultProps$3.stateReducer,
  environment: defaultProps$3.environment,
  getA11yRemovalMessage,
  keyNavigationNext: "ArrowRight",
  keyNavigationPrevious: "ArrowLeft"
};
var validatePropTypes = noop;
if (true) {
  validatePropTypes = (options, caller) => {
    import_prop_types.default.checkPropTypes(propTypes, options, "prop", caller.name);
  };
}
var SelectedItemClick = true ? "__selected_item_click__" : 0;
var SelectedItemKeyDownDelete = true ? "__selected_item_keydown_delete__" : 1;
var SelectedItemKeyDownBackspace = true ? "__selected_item_keydown_backspace__" : 2;
var SelectedItemKeyDownNavigationNext = true ? "__selected_item_keydown_navigation_next__" : 3;
var SelectedItemKeyDownNavigationPrevious = true ? "__selected_item_keydown_navigation_previous__" : 4;
var DropdownKeyDownNavigationPrevious = true ? "__dropdown_keydown_navigation_previous__" : 5;
var DropdownKeyDownBackspace = true ? "__dropdown_keydown_backspace__" : 6;
var DropdownClick = true ? "__dropdown_click__" : 7;
var FunctionAddSelectedItem = true ? "__function_add_selected_item__" : 8;
var FunctionRemoveSelectedItem = true ? "__function_remove_selected_item__" : 9;
var FunctionSetSelectedItems = true ? "__function_set_selected_items__" : 10;
var FunctionSetActiveIndex = true ? "__function_set_active_index__" : 11;
var FunctionReset = true ? "__function_reset__" : 12;
var stateChangeTypes = Object.freeze({
  __proto__: null,
  SelectedItemClick,
  SelectedItemKeyDownDelete,
  SelectedItemKeyDownBackspace,
  SelectedItemKeyDownNavigationNext,
  SelectedItemKeyDownNavigationPrevious,
  DropdownKeyDownNavigationPrevious,
  DropdownKeyDownBackspace,
  DropdownClick,
  FunctionAddSelectedItem,
  FunctionRemoveSelectedItem,
  FunctionSetSelectedItems,
  FunctionSetActiveIndex,
  FunctionReset
});
function downshiftMultipleSelectionReducer(state, action) {
  const {
    type,
    index,
    props,
    selectedItem
  } = action;
  const {
    activeIndex,
    selectedItems
  } = state;
  let changes;
  switch (type) {
    case SelectedItemClick:
      changes = {
        activeIndex: index
      };
      break;
    case SelectedItemKeyDownNavigationPrevious:
      changes = {
        activeIndex: activeIndex - 1 < 0 ? 0 : activeIndex - 1
      };
      break;
    case SelectedItemKeyDownNavigationNext:
      changes = {
        activeIndex: activeIndex + 1 >= selectedItems.length ? -1 : activeIndex + 1
      };
      break;
    case SelectedItemKeyDownBackspace:
    case SelectedItemKeyDownDelete: {
      let newActiveIndex = activeIndex;
      if (selectedItems.length === 1) {
        newActiveIndex = -1;
      } else if (activeIndex === selectedItems.length - 1) {
        newActiveIndex = selectedItems.length - 2;
      }
      changes = {
        selectedItems: [...selectedItems.slice(0, activeIndex), ...selectedItems.slice(activeIndex + 1)],
        ...{
          activeIndex: newActiveIndex
        }
      };
      break;
    }
    case DropdownKeyDownNavigationPrevious:
      changes = {
        activeIndex: selectedItems.length - 1
      };
      break;
    case DropdownKeyDownBackspace:
      changes = {
        selectedItems: selectedItems.slice(0, selectedItems.length - 1)
      };
      break;
    case FunctionAddSelectedItem:
      changes = {
        selectedItems: [...selectedItems, selectedItem]
      };
      break;
    case DropdownClick:
      changes = {
        activeIndex: -1
      };
      break;
    case FunctionRemoveSelectedItem: {
      let newActiveIndex = activeIndex;
      const selectedItemIndex = selectedItems.indexOf(selectedItem);
      if (selectedItemIndex >= 0) {
        if (selectedItems.length === 1) {
          newActiveIndex = -1;
        } else if (selectedItemIndex === selectedItems.length - 1) {
          newActiveIndex = selectedItems.length - 2;
        }
        changes = {
          selectedItems: [...selectedItems.slice(0, selectedItemIndex), ...selectedItems.slice(selectedItemIndex + 1)],
          activeIndex: newActiveIndex
        };
      }
      break;
    }
    case FunctionSetSelectedItems: {
      const {
        selectedItems: newSelectedItems
      } = action;
      changes = {
        selectedItems: newSelectedItems
      };
      break;
    }
    case FunctionSetActiveIndex: {
      const {
        activeIndex: newActiveIndex
      } = action;
      changes = {
        activeIndex: newActiveIndex
      };
      break;
    }
    case FunctionReset:
      changes = {
        activeIndex: getDefaultValue(props, "activeIndex"),
        selectedItems: getDefaultValue(props, "selectedItems")
      };
      break;
    default:
      throw new Error("Reducer called without proper action type.");
  }
  return {
    ...state,
    ...changes
  };
}
useMultipleSelection.stateChangeTypes = stateChangeTypes;
function useMultipleSelection(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes(userProps, useMultipleSelection);
  const props = {
    ...defaultProps,
    ...userProps
  };
  const {
    getA11yRemovalMessage: getA11yRemovalMessage2,
    itemToString: itemToString2,
    environment,
    keyNavigationNext,
    keyNavigationPrevious
  } = props;
  const [state, dispatch] = useControlledReducer$1(downshiftMultipleSelectionReducer, getInitialState(props), props);
  const {
    activeIndex,
    selectedItems
  } = state;
  const isInitialMountRef = (0, import_react.useRef)(true);
  const dropdownRef = (0, import_react.useRef)(null);
  const previousSelectedItemsRef = (0, import_react.useRef)(selectedItems);
  const selectedItemRefs = (0, import_react.useRef)();
  selectedItemRefs.current = [];
  const latest = useLatestRef({
    state,
    props
  });
  (0, import_react.useEffect)(() => {
    if (isInitialMountRef.current) {
      return;
    }
    if (selectedItems.length < previousSelectedItemsRef.current.length) {
      const removedSelectedItem = previousSelectedItemsRef.current.find((item) => selectedItems.indexOf(item) < 0);
      setStatus(getA11yRemovalMessage2({
        itemToString: itemToString2,
        resultCount: selectedItems.length,
        removedSelectedItem,
        activeIndex,
        activeSelectedItem: selectedItems[activeIndex]
      }), environment.document);
    }
    previousSelectedItemsRef.current = selectedItems;
  }, [selectedItems.length]);
  (0, import_react.useEffect)(() => {
    if (isInitialMountRef.current) {
      return;
    }
    if (activeIndex === -1 && dropdownRef.current) {
      dropdownRef.current.focus();
    } else if (selectedItemRefs.current[activeIndex]) {
      selectedItemRefs.current[activeIndex].focus();
    }
  }, [activeIndex]);
  useControlPropsValidator({
    isInitialMount: isInitialMountRef.current,
    props,
    state
  });
  const setGetterPropCallInfo = useGetterPropsCalledChecker("getDropdownProps");
  (0, import_react.useEffect)(() => {
    isInitialMountRef.current = false;
  }, []);
  const selectedItemKeyDownHandlers = (0, import_react.useMemo)(() => ({
    [keyNavigationPrevious]() {
      dispatch({
        type: SelectedItemKeyDownNavigationPrevious
      });
    },
    [keyNavigationNext]() {
      dispatch({
        type: SelectedItemKeyDownNavigationNext
      });
    },
    Delete() {
      dispatch({
        type: SelectedItemKeyDownDelete
      });
    },
    Backspace() {
      dispatch({
        type: SelectedItemKeyDownBackspace
      });
    }
  }), [dispatch, keyNavigationNext, keyNavigationPrevious]);
  const dropdownKeyDownHandlers = (0, import_react.useMemo)(() => ({
    [keyNavigationPrevious](event) {
      if (isKeyDownOperationPermitted(event)) {
        dispatch({
          type: DropdownKeyDownNavigationPrevious
        });
      }
    },
    Backspace(event) {
      if (isKeyDownOperationPermitted(event)) {
        dispatch({
          type: DropdownKeyDownBackspace
        });
      }
    }
  }), [dispatch, keyNavigationPrevious]);
  const getSelectedItemProps = (0, import_react.useCallback)(function(_temp) {
    let {
      refKey = "ref",
      ref,
      onClick,
      onKeyDown,
      selectedItem,
      index,
      ...rest
    } = _temp === void 0 ? {} : _temp;
    const {
      state: latestState
    } = latest.current;
    const itemIndex = getItemIndex(index, selectedItem, latestState.selectedItems);
    if (itemIndex < 0) {
      throw new Error("Pass either selectedItem or index in getSelectedItemProps!");
    }
    const selectedItemHandleClick = () => {
      dispatch({
        type: SelectedItemClick,
        index
      });
    };
    const selectedItemHandleKeyDown = (event) => {
      const key = normalizeArrowKey(event);
      if (key && selectedItemKeyDownHandlers[key]) {
        selectedItemKeyDownHandlers[key](event);
      }
    };
    return {
      [refKey]: handleRefs(ref, (selectedItemNode) => {
        if (selectedItemNode) {
          selectedItemRefs.current.push(selectedItemNode);
        }
      }),
      tabIndex: index === latestState.activeIndex ? 0 : -1,
      onClick: callAllEventHandlers(onClick, selectedItemHandleClick),
      onKeyDown: callAllEventHandlers(onKeyDown, selectedItemHandleKeyDown),
      ...rest
    };
  }, [dispatch, latest, selectedItemKeyDownHandlers]);
  const getDropdownProps = (0, import_react.useCallback)(function(_temp2, _temp3) {
    let {
      refKey = "ref",
      ref,
      onKeyDown,
      onClick,
      preventKeyAction = false,
      ...rest
    } = _temp2 === void 0 ? {} : _temp2;
    let {
      suppressRefError = false
    } = _temp3 === void 0 ? {} : _temp3;
    setGetterPropCallInfo("getDropdownProps", suppressRefError, refKey, dropdownRef);
    const dropdownHandleKeyDown = (event) => {
      const key = normalizeArrowKey(event);
      if (key && dropdownKeyDownHandlers[key]) {
        dropdownKeyDownHandlers[key](event);
      }
    };
    const dropdownHandleClick = () => {
      dispatch({
        type: DropdownClick
      });
    };
    return {
      [refKey]: handleRefs(ref, (dropdownNode) => {
        if (dropdownNode) {
          dropdownRef.current = dropdownNode;
        }
      }),
      ...!preventKeyAction && {
        onKeyDown: callAllEventHandlers(onKeyDown, dropdownHandleKeyDown),
        onClick: callAllEventHandlers(onClick, dropdownHandleClick)
      },
      ...rest
    };
  }, [dispatch, dropdownKeyDownHandlers, setGetterPropCallInfo]);
  const addSelectedItem = (0, import_react.useCallback)((selectedItem) => {
    dispatch({
      type: FunctionAddSelectedItem,
      selectedItem
    });
  }, [dispatch]);
  const removeSelectedItem = (0, import_react.useCallback)((selectedItem) => {
    dispatch({
      type: FunctionRemoveSelectedItem,
      selectedItem
    });
  }, [dispatch]);
  const setSelectedItems = (0, import_react.useCallback)((newSelectedItems) => {
    dispatch({
      type: FunctionSetSelectedItems,
      selectedItems: newSelectedItems
    });
  }, [dispatch]);
  const setActiveIndex = (0, import_react.useCallback)((newActiveIndex) => {
    dispatch({
      type: FunctionSetActiveIndex,
      activeIndex: newActiveIndex
    });
  }, [dispatch]);
  const reset = (0, import_react.useCallback)(() => {
    dispatch({
      type: FunctionReset
    });
  }, [dispatch]);
  return {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    setSelectedItems,
    setActiveIndex,
    reset,
    selectedItems,
    activeIndex
  };
}

// ../../../node_modules/@udecode/plate-combobox/dist/index.es.js
var createComboboxStore = (state) => createStore(`combobox-${state.id}`)(state);
var comboboxStore = createStore("combobox")({
  activeId: null,
  byId: {},
  floatingOptions: {},
  highlightedIndex: 0,
  items: [],
  filteredItems: [],
  targetRange: null,
  text: null
}).extendActions((set, get) => ({
  setComboboxById: (state) => {
    if (get.byId()[state.id])
      return;
    set.state((draft) => {
      draft.byId[state.id] = createComboboxStore(state);
    });
  },
  open: (state) => {
    set.mergeState(state);
  },
  reset: () => {
    set.state((draft) => {
      draft.activeId = null;
      draft.highlightedIndex = 0;
      draft.filteredItems = [];
      draft.items = [];
      draft.text = null;
      draft.targetRange = null;
    });
  }
})).extendSelectors((state) => ({
  isOpen: () => !!state.activeId
}));
var useComboboxSelectors = comboboxStore.use;
var comboboxSelectors = comboboxStore.get;
var comboboxActions = comboboxStore.set;
var getComboboxStoreById = (id) => id ? comboboxSelectors.byId()[id] : null;
var useActiveComboboxStore = () => {
  const activeId = useComboboxSelectors.activeId();
  const comboboxes = useComboboxSelectors.byId();
  return activeId ? comboboxes[activeId] : null;
};
var getTextFromTrigger = (editor, {
  at,
  trigger,
  searchPattern = `\\S+`
}) => {
  const escapedTrigger = escapeRegExp(trigger);
  const triggerRegex = new RegExp(`(?:^|\\s)${escapedTrigger}`);
  let start = at;
  let end;
  while (true) {
    end = start;
    if (!start)
      break;
    start = getPointBefore(editor, start);
    const charRange = start && getRange(editor, start, end);
    const charText = getEditorString(editor, charRange);
    if (!charText.match(searchPattern)) {
      start = end;
      break;
    }
  }
  const range = start && getRange(editor, start, at);
  const text = getEditorString(editor, range);
  if (!range || !text.match(triggerRegex))
    return;
  return {
    range,
    textAfterTrigger: text.substring(trigger.length)
  };
};
var onChangeCombobox = (editor) => () => {
  const byId = comboboxSelectors.byId();
  const activeId = comboboxSelectors.activeId();
  let shouldClose = true;
  for (const store of Object.values(byId)) {
    var _store$get$controlled, _store$get, _store$get$searchPatt, _store$get2;
    const id = store.get.id();
    const controlled = (_store$get$controlled = (_store$get = store.get).controlled) === null || _store$get$controlled === void 0 ? void 0 : _store$get$controlled.call(_store$get);
    if (controlled) {
      if (activeId === id) {
        shouldClose = false;
        break;
      } else {
        continue;
      }
    }
    const {
      selection
    } = editor;
    if (!selection || !isCollapsed(selection)) {
      continue;
    }
    const trigger = store.get.trigger();
    const searchPattern = (_store$get$searchPatt = (_store$get2 = store.get).searchPattern) === null || _store$get$searchPatt === void 0 ? void 0 : _store$get$searchPatt.call(_store$get2);
    const isCursorAfterTrigger = getTextFromTrigger(editor, {
      at: Range.start(selection),
      trigger,
      searchPattern
    });
    if (!isCursorAfterTrigger) {
      continue;
    }
    const {
      range,
      textAfterTrigger
    } = isCursorAfterTrigger;
    comboboxActions.open({
      activeId: id,
      text: textAfterTrigger,
      targetRange: range
    });
    shouldClose = false;
    break;
  }
  if (shouldClose && comboboxSelectors.isOpen()) {
    comboboxActions.reset();
  }
};
function unwrapExports(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var lib = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var IS_MAC = () => typeof window != "undefined" && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
  var MODIFIERS = {
    alt: "altKey",
    control: "ctrlKey",
    meta: "metaKey",
    shift: "shiftKey"
  };
  var ALIASES = () => ({
    add: "+",
    break: "pause",
    cmd: "meta",
    command: "meta",
    ctl: "control",
    ctrl: "control",
    del: "delete",
    down: "arrowdown",
    esc: "escape",
    ins: "insert",
    left: "arrowleft",
    mod: IS_MAC() ? "meta" : "control",
    opt: "alt",
    option: "alt",
    return: "enter",
    right: "arrowright",
    space: " ",
    spacebar: " ",
    up: "arrowup",
    win: "meta",
    windows: "meta"
  });
  var CODES = {
    backspace: 8,
    tab: 9,
    enter: 13,
    shift: 16,
    control: 17,
    alt: 18,
    pause: 19,
    capslock: 20,
    escape: 27,
    " ": 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    arrowleft: 37,
    arrowup: 38,
    arrowright: 39,
    arrowdown: 40,
    insert: 45,
    delete: 46,
    meta: 91,
    numlock: 144,
    scrolllock: 145,
    ";": 186,
    "=": 187,
    ",": 188,
    "-": 189,
    ".": 190,
    "/": 191,
    "`": 192,
    "[": 219,
    "\\": 220,
    "]": 221,
    "'": 222
  };
  for (var f = 1; f < 20; f++) {
    CODES["f" + f] = 111 + f;
  }
  function isHotkey2(hotkey, options, event) {
    if (options && !("byKey" in options)) {
      event = options;
      options = null;
    }
    if (!Array.isArray(hotkey)) {
      hotkey = [hotkey];
    }
    var array = hotkey.map(function(string) {
      return parseHotkey(string, options);
    });
    var check = function check2(e2) {
      return array.some(function(object) {
        return compareHotkey(object, e2);
      });
    };
    var ret = event == null ? check : check(event);
    return ret;
  }
  function isCodeHotkey(hotkey, event) {
    return isHotkey2(hotkey, event);
  }
  function isKeyHotkey(hotkey, event) {
    return isHotkey2(hotkey, { byKey: true }, event);
  }
  function parseHotkey(hotkey, options) {
    var byKey = options && options.byKey;
    var ret = {};
    hotkey = hotkey.replace("++", "+add");
    var values = hotkey.split("+");
    var length = values.length;
    for (var k in MODIFIERS) {
      ret[MODIFIERS[k]] = false;
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = void 0;
    try {
      for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;
        var optional = value.endsWith("?") && value.length > 1;
        if (optional) {
          value = value.slice(0, -1);
        }
        var name = toKeyName(value);
        var modifier = MODIFIERS[name];
        if (length === 1 || !modifier) {
          if (byKey) {
            ret.key = name;
          } else {
            ret.which = toKeyCode(value);
          }
        }
        if (modifier) {
          ret[modifier] = optional ? null : true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
    return ret;
  }
  function compareHotkey(object, event) {
    for (var key in object) {
      var expected = object[key];
      var actual = void 0;
      if (expected == null) {
        continue;
      }
      if (key === "key" && event.key != null) {
        actual = event.key.toLowerCase();
      } else if (key === "which") {
        actual = expected === 91 && event.which === 93 ? 91 : event.which;
      } else {
        actual = event[key];
      }
      if (actual == null && expected === false) {
        continue;
      }
      if (actual !== expected) {
        return false;
      }
    }
    return true;
  }
  function toKeyCode(name) {
    name = toKeyName(name);
    var code = CODES[name] || name.toUpperCase().charCodeAt(0);
    return code;
  }
  function toKeyName(name) {
    name = name.toLowerCase();
    name = ALIASES()[name] || name;
    return name;
  }
  exports.default = isHotkey2;
  exports.isHotkey = isHotkey2;
  exports.isCodeHotkey = isCodeHotkey;
  exports.isKeyHotkey = isKeyHotkey;
  exports.parseHotkey = parseHotkey;
  exports.compareHotkey = compareHotkey;
  exports.toKeyCode = toKeyCode;
  exports.toKeyName = toKeyName;
});
var isHotkey = unwrapExports(lib);
lib.isHotkey;
lib.isCodeHotkey;
lib.isKeyHotkey;
lib.parseHotkey;
lib.compareHotkey;
lib.toKeyCode;
lib.toKeyName;
var getNextNonDisabledIndex2 = (moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) => {
  const currentElementNode = getItemNodeFromIndex(baseIndex);
  if (!currentElementNode || !currentElementNode.hasAttribute("disabled")) {
    return baseIndex;
  }
  if (moveAmount > 0) {
    for (let index = baseIndex + 1; index < itemCount; index++) {
      if (!getItemNodeFromIndex(index).hasAttribute("disabled")) {
        return index;
      }
    }
  } else {
    for (let index = baseIndex - 1; index >= 0; index--) {
      if (!getItemNodeFromIndex(index).hasAttribute("disabled")) {
        return index;
      }
    }
  }
  if (circular) {
    return moveAmount > 0 ? getNextNonDisabledIndex2(1, 0, itemCount, getItemNodeFromIndex, false) : getNextNonDisabledIndex2(-1, itemCount - 1, itemCount, getItemNodeFromIndex, false);
  }
  return -1;
};
var getNextWrappingIndex2 = (moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular = true) => {
  if (itemCount === 0) {
    return -1;
  }
  const itemsLastIndex = itemCount - 1;
  if (typeof baseIndex !== "number" || baseIndex < 0 || baseIndex >= itemCount) {
    baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1;
  }
  let newIndex = baseIndex + moveAmount;
  if (newIndex < 0) {
    newIndex = circular ? itemsLastIndex : 0;
  } else if (newIndex > itemsLastIndex) {
    newIndex = circular ? 0 : itemsLastIndex;
  }
  const nonDisabledNewIndex = getNextNonDisabledIndex2(moveAmount, newIndex, itemCount, getItemNodeFromIndex, circular);
  if (nonDisabledNewIndex === -1) {
    return baseIndex >= itemCount ? -1 : baseIndex;
  }
  return nonDisabledNewIndex;
};
var onKeyDownCombobox = (editor) => (event) => {
  const {
    highlightedIndex,
    filteredItems,
    activeId
  } = comboboxSelectors.state();
  const isOpen = comboboxSelectors.isOpen();
  if (!isOpen)
    return;
  const store = getComboboxStoreById(activeId);
  if (!store)
    return;
  const onSelectItem = store.get.onSelectItem();
  if (isHotkey("down", event)) {
    event.preventDefault();
    const newIndex = getNextWrappingIndex2(1, highlightedIndex, filteredItems.length, () => {
    }, true);
    comboboxActions.highlightedIndex(newIndex);
    return;
  }
  if (isHotkey("up", event)) {
    event.preventDefault();
    const newIndex = getNextWrappingIndex2(-1, highlightedIndex, filteredItems.length, () => {
    }, true);
    comboboxActions.highlightedIndex(newIndex);
    return;
  }
  if (isHotkey("escape", event)) {
    event.preventDefault();
    comboboxActions.reset();
    return;
  }
  if (Hotkeys.isTab(editor, event) || isHotkey("enter", event)) {
    event.preventDefault();
    event.stopPropagation();
    if (filteredItems[highlightedIndex]) {
      onSelectItem === null || onSelectItem === void 0 ? void 0 : onSelectItem(editor, filteredItems[highlightedIndex]);
    }
  }
};
var KEY_COMBOBOX = "combobox";
var createComboboxPlugin = createPluginFactory({
  key: KEY_COMBOBOX,
  handlers: {
    onChange: onChangeCombobox,
    onKeyDown: onKeyDownCombobox
  }
});
var useComboboxControls = () => {
  const isOpen = useComboboxSelectors.isOpen();
  const highlightedIndex = useComboboxSelectors.highlightedIndex();
  const filteredItems = useComboboxSelectors.filteredItems();
  const {
    closeMenu,
    getMenuProps,
    getComboboxProps,
    getInputProps,
    getItemProps
  } = useCombobox({
    isOpen,
    highlightedIndex,
    items: filteredItems,
    circularNavigation: true
  });
  getMenuProps({}, {
    suppressRefError: true
  });
  getComboboxProps({}, {
    suppressRefError: true
  });
  getInputProps({}, {
    suppressRefError: true
  });
  return (0, import_react2.useMemo)(() => ({
    closeMenu,
    getMenuProps,
    getItemProps
  }), [closeMenu, getItemProps, getMenuProps]);
};

// ../../../node_modules/@udecode/plate-ui-combobox/dist/index.es.js
var getComboboxStyles = (props) => {
  const item = [{
    "display": "flex",
    "alignItems": "center",
    "paddingLeft": "0.5rem",
    "paddingRight": "0.5rem",
    "cursor": "pointer"
  }, Ce(["font-size:14px;border-radius:0;min-height:36px;user-select:none;color:rgb(32,31,30);"])];
  return createStyles({
    prefixClassNames: "Combobox",
    ...props
  }, [{
    root: [{
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
      "margin": "0px",
      "padding": "0px",
      "overflow": "scroll"
    }, Ce(["width:300px;max-height:288px;border-radius:0 0 2px 2px;box-shadow:rgba(0,0,0,0.133) 0 3.2px 7.2px 0,rgba(0,0,0,0.11) 0 0.6px 1.8px 0;z-index:500;"])],
    item: [...item, Ce(["background:transparent;:hover{background:rgb(243,242,241);}"])],
    highlightedItem: [...item, Ce(["background:rgb(237,235,233);:hover{background:rgb(237,235,233);}"])]
  }]);
};
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
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
var ComboboxContent = (props) => {
  var _useComboboxSelectors, _activeComboboxStore$, _activeComboboxStore$2, _activeComboboxStore$3, _activeComboboxStore$4, _activeComboboxStore$5, _activeComboboxStore$6, _activeComboboxStore$7;
  const {
    component: Component2,
    items,
    portalElement,
    onRenderItem
  } = props;
  const targetRange = useComboboxSelectors.targetRange();
  const filteredItems = useComboboxSelectors.filteredItems();
  const highlightedIndex = useComboboxSelectors.highlightedIndex();
  const floatingOptions = useComboboxSelectors.floatingOptions();
  const editor = usePlateEditorState();
  const combobox = useComboboxControls();
  const activeComboboxStore = useActiveComboboxStore();
  const text = (_useComboboxSelectors = useComboboxSelectors.text()) !== null && _useComboboxSelectors !== void 0 ? _useComboboxSelectors : "";
  const storeItems = useComboboxSelectors.items();
  const filter = (_activeComboboxStore$ = (_activeComboboxStore$2 = activeComboboxStore.use).filter) === null || _activeComboboxStore$ === void 0 ? void 0 : _activeComboboxStore$.call(_activeComboboxStore$2);
  const sort = (_activeComboboxStore$3 = (_activeComboboxStore$4 = activeComboboxStore.use).sort) === null || _activeComboboxStore$3 === void 0 ? void 0 : _activeComboboxStore$3.call(_activeComboboxStore$4);
  const maxSuggestions = (_activeComboboxStore$5 = (_activeComboboxStore$6 = (_activeComboboxStore$7 = activeComboboxStore.use).maxSuggestions) === null || _activeComboboxStore$6 === void 0 ? void 0 : _activeComboboxStore$6.call(_activeComboboxStore$7)) !== null && _activeComboboxStore$5 !== void 0 ? _activeComboboxStore$5 : storeItems.length;
  (0, import_react3.useEffect)(() => {
    items && comboboxActions.items(items);
  }, [items]);
  (0, import_react3.useEffect)(() => {
    comboboxActions.filteredItems(storeItems.filter(filter ? filter(text) : (value) => value.text.toLowerCase().startsWith(text.toLowerCase())).sort(sort === null || sort === void 0 ? void 0 : sort(text)).slice(0, maxSuggestions));
  }, [filter, sort, storeItems, maxSuggestions, text]);
  const getBoundingClientRect = (0, import_react3.useCallback)(() => getRangeBoundingClientRect(editor, targetRange), [editor, targetRange]);
  const {
    style,
    floating
  } = useVirtualFloating({
    placement: "bottom-start",
    getBoundingClientRect,
    middleware: [offset(4), shift(), flip()],
    ...floatingOptions
  });
  const menuProps = combobox ? combobox.getMenuProps({}, {
    suppressRefError: true
  }) : {
    ref: null
  };
  const {
    root,
    item: styleItem,
    highlightedItem
  } = getComboboxStyles(props);
  return import_react3.default.createElement(PortalBody, {
    element: portalElement
  }, import_react3.default.createElement(_StyledUl, _extends({}, menuProps, {
    ref: floating,
    style,
    className: root.className,
    $_css: root.css
  }), Component2 ? Component2({
    store: activeComboboxStore
  }) : null, filteredItems.map((item, index) => {
    const Item = onRenderItem ? onRenderItem({
      search: text,
      item
    }) : item.text;
    const highlighted = index === highlightedIndex;
    return import_react3.default.createElement(_StyledDiv, _extends({
      key: item.key,
      className: !highlighted ? styleItem === null || styleItem === void 0 ? void 0 : styleItem.className : highlightedItem === null || highlightedItem === void 0 ? void 0 : highlightedItem.className
    }, combobox.getItemProps({
      item,
      index
    }), {
      onMouseDown: (e2) => {
        var _getComboboxStoreById;
        e2.preventDefault();
        const onSelectItem = (_getComboboxStoreById = getComboboxStoreById(comboboxSelectors.activeId())) === null || _getComboboxStoreById === void 0 ? void 0 : _getComboboxStoreById.get.onSelectItem();
        onSelectItem === null || onSelectItem === void 0 ? void 0 : onSelectItem(editor, item);
      },
      $_css2: !highlighted ? styleItem === null || styleItem === void 0 ? void 0 : styleItem.css : highlightedItem === null || highlightedItem === void 0 ? void 0 : highlightedItem.css
    }), Item);
  })));
};
var Combobox = ({
  id,
  trigger,
  searchPattern,
  onSelectItem,
  controlled,
  maxSuggestions,
  filter,
  sort,
  floatingOptions,
  disabled: _disabled,
  ...props
}) => {
  var _props$items, _useEventEditorSelect;
  const storeItems = useComboboxSelectors.items();
  const disabled = _disabled !== null && _disabled !== void 0 ? _disabled : !storeItems.length && !((_props$items = props.items) !== null && _props$items !== void 0 && _props$items.length);
  const editor = usePlateEditorState();
  const focusedEditorId = (_useEventEditorSelect = useEventEditorSelectors.focus) === null || _useEventEditorSelect === void 0 ? void 0 : _useEventEditorSelect.call(useEventEditorSelectors);
  const combobox = useComboboxControls();
  const activeId = useComboboxSelectors.activeId();
  (0, import_react3.useEffect)(() => {
    if (floatingOptions) {
      comboboxActions.floatingOptions(floatingOptions);
    }
  }, [floatingOptions]);
  (0, import_react3.useEffect)(() => {
    comboboxActions.setComboboxById({
      id,
      trigger,
      searchPattern,
      controlled,
      onSelectItem,
      maxSuggestions,
      filter,
      sort
    });
  }, [id, trigger, searchPattern, controlled, onSelectItem, maxSuggestions, filter, sort]);
  if (!combobox || !editor.selection || focusedEditorId !== editor.id || activeId !== id || disabled) {
    return null;
  }
  return import_react3.default.createElement(ComboboxContent, props);
};
var _StyledUl = styled_components_browser_esm_default("ul").withConfig({
  displayName: "Combobox___StyledUl",
  componentId: "sc-1chhjwl-0"
})(["", ""], (p) => p.$_css);
var _StyledDiv = styled_components_browser_esm_default("div").withConfig({
  displayName: "Combobox___StyledDiv",
  componentId: "sc-1chhjwl-1"
})(["", ""], (p) => p.$_css2);

export {
  comboboxStore,
  useComboboxSelectors,
  comboboxSelectors,
  comboboxActions,
  getComboboxStoreById,
  useActiveComboboxStore,
  getTextFromTrigger,
  onChangeCombobox,
  getNextNonDisabledIndex2 as getNextNonDisabledIndex,
  getNextWrappingIndex2 as getNextWrappingIndex,
  onKeyDownCombobox,
  KEY_COMBOBOX,
  createComboboxPlugin,
  useComboboxControls,
  getComboboxStyles,
  Combobox
};
/** @license React v17.0.2
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=chunk-62SZCKX3.js.map

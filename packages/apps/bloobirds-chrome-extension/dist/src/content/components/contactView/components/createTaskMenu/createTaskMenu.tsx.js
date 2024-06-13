import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/createTaskMenu/createTaskMenu.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/createTaskMenu/createTaskMenu.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/createTaskMenu/createTaskMenu.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"];
import { colors, IconButton } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMinimizableModals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { TASK_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { motion, useCycle } from "/vendor/.vite-deps-framer-motion.js__v--396e37ef.js";
import styles from "/src/content/components/contactView/components/createTaskMenu/createTaskMenu.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function removeScrollRecursively(element, action) {
  if (!element || element?.id === "bb-root")
    return null;
  const style = getComputedStyle(element);
  const overflowY = style.overflowY;
  if (overflowY === "auto" || overflowY === "scroll" || element.classList.contains("remove-scroll")) {
    if (action === "add") {
      element.classList.add("remove-scroll");
    } else {
      element.classList.remove("remove-scroll");
    }
  }
  removeScrollRecursively(element.parentElement, action);
}
const actionDictionary = [{
  color: "bloobirds",
  name: "checkDouble",
  type: "TASK"
}, {
  color: "extraCall",
  name: "phone",
  type: "CALL"
}, {
  color: "tangerine",
  name: "mail",
  type: "EMAIL"
}];
const calculatePosition = (index, length, direction = TaskRingPosition.DOWN) => {
  const position = index / length;
  const isSecondHalf = index >= Math.floor(length / 2);
  const isSameRow = length % 2 === 0 && index === length / 2;
  switch (direction) {
    case TaskRingPosition.DOWN:
      return {
        top: isSecondHalf ? `${(length - index - 1) / length * 80}px` : `${position * 80}px`,
        right: `${12 - index * 24 - (isSameRow || isSecondHalf ? 8 : 0)}px`
      };
    case TaskRingPosition.UP:
      return {
        bottom: `${position * 80}px`,
        left: isSecondHalf ? `${(length - index - 1) / length * 80}px` : `${position * 80}px`
      };
    case TaskRingPosition.LEFT: {
      return {
        right: isSecondHalf ? `${-20 + (length - index - 1) * 26}px` : `${-20 + index * 26}px`,
        bottom: `${32 - index * 20 - (isSameRow ? isSecondHalf ? 10 : 8 : isSecondHalf ? 6 : 0)}px`
      };
    }
    case TaskRingPosition.RIGHT:
      return {
        left: isSecondHalf ? `${20 + (length - index - 1) * 26}px` : `${20 + index * 26}px`,
        bottom: `${32 - index * 20 - (isSameRow ? isSecondHalf ? 10 : 8 : isSecondHalf ? 6 : 0)}px`
      };
  }
};
const variants = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2
    }
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};
const listVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        stiffness: 1e3,
        velocity: -100
      }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: {
        stiffness: 1e3
      }
    }
  }
};
const toRgba = (color, alpha) => {
  const hex = colors[color];
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};
const FloatingKid = ({
  position,
  color,
  children
}) => {
  return /* @__PURE__ */ _jsxDEV(motion.li, {
    variants: listVariants,
    className: styles.iconPadding,
    style: {
      position: "absolute",
      listStyle: "none",
      border: `1px solid ${toRgba(color, 0.4)}`,
      boxShadow: `0px 2px 4px ${toRgba(color, 0.2)}`,
      ...position
    },
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 116,
    columnNumber: 5
  }, void 0);
};
_c = FloatingKid;
const TaskTypeRing = ({
  position,
  environment,
  onClose,
  removeScroll
}) => {
  _s();
  const size = 3;
  const {
    openMinimizableModal
  } = useMinimizableModals();
  function openTaskModal(type) {
    onClose();
    openMinimizableModal({
      type: "task",
      data: {
        ...environment,
        location: "bubble",
        ...type ? {
          [TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE]: type
        } : {
          forceOpened: true
        }
      }
    });
  }
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (removeScroll) {
          removeScrollRecursively(ref.current, "remove");
        }
        onClose();
      }
    }
    function handleScroll() {
      onClose();
    }
    function getScrollableAncestor(element) {
      if (!element) {
        return null;
      }
      const style = getComputedStyle(element);
      const overflowY = style.overflowY;
      if (overflowY === "auto" || overflowY === "scroll") {
        return element;
      }
      return getScrollableAncestor(element.parentElement);
    }
    if (removeScroll) {
      removeScrollRecursively(ref.current, "add");
    }
    const scrollableAncestor = getScrollableAncestor(ref.current);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    if (scrollableAncestor) {
      scrollableAncestor.addEventListener("scroll", handleScroll);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      if (removeScroll) {
        removeScrollRecursively(ref.current, "remove");
      }
      if (scrollableAncestor) {
        scrollableAncestor.removeEventListener("scroll", handleScroll);
      }
    };
  }, [ref, onClose]);
  return /* @__PURE__ */ _jsxDEV(motion.ul, {
    variants,
    style: {
      position: "absolute",
      zIndex: 5
    },
    ref,
    children: [Array.from({
      length: size
    }).map((_, index) => /* @__PURE__ */ _jsxDEV(FloatingKid, {
      position: calculatePosition(index, size + 1, position),
      color: actionDictionary[index].color,
      children: /* @__PURE__ */ _jsxDEV(IconButton, {
        ...actionDictionary[index],
        size: 16,
        onClick: () => openTaskModal(actionDictionary[index].type)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 217,
        columnNumber: 11
      }, void 0)
    }, index, false, {
      fileName: _jsxFileName,
      lineNumber: 212,
      columnNumber: 9
    }, void 0)), /* @__PURE__ */ _jsxDEV(FloatingKid, {
      position: calculatePosition(size, size + 1, position),
      color: "peanut",
      children: /* @__PURE__ */ _jsxDEV(IconButton, {
        name: "add",
        onClick: () => openTaskModal(),
        color: "peanut",
        size: 16
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 229,
        columnNumber: 9
      }, void 0)
    }, "list-item-4", false, {
      fileName: _jsxFileName,
      lineNumber: 224,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 210,
    columnNumber: 5
  }, void 0);
};
_s(TaskTypeRing, "Rw49POWx+GEMnR1KQZoWaonwcpE=", false, function() {
  return [useMinimizableModals];
});
_c2 = TaskTypeRing;
export const useDimensions = (ref) => {
  _s2();
  const dimensions = useRef({
    width: 0,
    height: 0
  });
  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);
  return dimensions.current;
};
_s2(useDimensions, "NpC5NsAphXwbxBdzDONhVAO+yb4=");
export var TaskRingPosition = /* @__PURE__ */ ((TaskRingPosition2) => {
  TaskRingPosition2["UP"] = "up";
  TaskRingPosition2["DOWN"] = "down";
  TaskRingPosition2["LEFT"] = "left";
  TaskRingPosition2["RIGHT"] = "right";
  return TaskRingPosition2;
})(TaskRingPosition || {});
export const CreateTaskMenu = ({
  children,
  ...props
}) => {
  _s3();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const {
    height
  } = useDimensions(containerRef);
  return /* @__PURE__ */ _jsxDEV(motion.nav, {
    "data-component": "createTaskMenu",
    initial: false,
    animate: isOpen ? "open" : "closed",
    ref: containerRef,
    custom: height,
    children: [React.cloneElement(children, {
      onClick: toggleOpen
    }), isOpen && /* @__PURE__ */ _jsxDEV(TaskTypeRing, {
      ...props,
      onClose: toggleOpen
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 275,
      columnNumber: 18
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 267,
    columnNumber: 5
  }, void 0);
};
_s3(CreateTaskMenu, "bkodWS93JBXr46jlqLzgn3OoaQc=", false, function() {
  return [useCycle, useDimensions];
});
_c3 = CreateTaskMenu;
var _c, _c2, _c3;
$RefreshReg$(_c, "FloatingKid");
$RefreshReg$(_c2, "TaskTypeRing");
$RefreshReg$(_c3, "CreateTaskMenu");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }
}

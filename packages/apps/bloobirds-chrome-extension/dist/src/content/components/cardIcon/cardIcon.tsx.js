import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/cardIcon/cardIcon.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/cardIcon/cardIcon.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/cardIcon/cardIcon.tsx";
import { Icon } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { ACTIVITY_DIRECTION } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/src/content/components/cardIcon/cardIcon.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const CardIcon = ({
  name,
  color,
  direction,
  size = "s"
}) => {
  const iconDirection = [ACTIVITY_DIRECTION.INCOMING, ACTIVITY_DIRECTION.MISSED].includes(direction) ? "arrowDownLeft" : "arrowTopRight";
  const sizes = {
    s: {
      size: 24,
      arrowSize: 16
    },
    xs: {
      size: 16,
      arrowSize: 12
    },
    xxs: {
      size: 16,
      arrowSize: 6
    }
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._icon,
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name,
      color,
      size: sizes[size].size
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }, void 0), direction && /* @__PURE__ */ _jsxDEV("div", {
      className: clsx({
        [styles._icon_direction]: size === "s",
        [styles._icon_direction_xs]: size !== "s"
      }),
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: iconDirection,
        color,
        size: sizes[size].arrowSize
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 26,
    columnNumber: 5
  }, void 0);
};
_c = CardIcon;
export default CardIcon;
var _c;
$RefreshReg$(_c, "CardIcon");
if (import.meta.hot) {
  let isReactRefreshBoundary = function(mod) {
    if (mod == null || typeof mod !== "object") {
      return false;
    }
    let hasExports = false;
    let areAllExportsComponents = true;
    for (const exportName in mod) {
      hasExports = true;
      if (exportName === "__esModule") {
        continue;
      }
      const desc = Object.getOwnPropertyDescriptor(mod, exportName);
      if (desc && desc.get) {
        return false;
      }
      const exportValue = mod[exportName];
      if (!RefreshRuntime.isLikelyComponentType(exportValue)) {
        areAllExportsComponents = false;
      }
    }
    return hasExports && areAllExportsComponents;
  };
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  import.meta.hot.accept((mod) => {
    if (isReactRefreshBoundary(mod)) {
      if (!window.__vite_plugin_react_timeout) {
        window.__vite_plugin_react_timeout = setTimeout(() => {
          window.__vite_plugin_react_timeout = 0;
          RefreshRuntime.performReactRefresh();
        }, 30);
      }
    } else {
      import.meta.hot.invalidate();
    }
  });
}

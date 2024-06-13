import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-components-column-Column.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/timeTable/components/column/Column.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/timeTable/components/column/Column.tsx";
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react;
import { parseUTCDateToLocal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { isWeekend } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import { cadenceTypesList, TIME_WINDOW } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceTable.type.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-timeTable.module.css.js";
import { BadgeDropdown } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-components-column-BadgeDropdown.tsx.js";
import { ColumnHeader } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-components-column-ColumnHeader.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const Column = React.memo(_c = (props) => {
  const {
    dayTasks,
    virtualColumn,
    date,
    timeWindow,
    isPausedDay,
    setTimeWindowWithDate
  } = props;
  const classnames = clsx(styles.row, {
    [styles.weekendDay]: timeWindow === TIME_WINDOW.DAILY && isWeekend(parseUTCDateToLocal(date))
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.column,
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: `${virtualColumn.size}px`,
      transform: `translateX(${virtualColumn.start}px)`
    },
    children: [/* @__PURE__ */ _jsxDEV(ColumnHeader, {
      date,
      timeWindow,
      isPausedDay,
      setTimeWindowWithDate
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }, void 0), cadenceTypesList?.map((cadenceAction) => {
      if (!dayTasks || !dayTasks[cadenceAction]) {
        return /* @__PURE__ */ _jsxDEV("div", {
          className: classnames
        }, `empty-row-${cadenceAction}`, false, {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 18
        }, void 0);
      }
      return /* @__PURE__ */ _jsxDEV("div", {
        className: classnames,
        children: /* @__PURE__ */ _jsxDEV(BadgeDropdown, {
          dayTasks,
          cadenceAction,
          timeWindow,
          date
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 13
        }, void 0)
      }, `row-${cadenceAction}`, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 11
      }, void 0);
    })]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 33,
    columnNumber: 5
  }, void 0);
});
_c2 = Column;
var _c, _c2;
$RefreshReg$(_c, "Column$React.memo");
$RefreshReg$(_c2, "Column");
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

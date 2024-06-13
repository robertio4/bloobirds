import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-components-components.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/timeTable/components/components.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/timeTable/components/components.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useContext = __vite__cjsImport2_react["useContext"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, IconButton, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { CadenceTableImmutableContext } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-CadenceTable.tsx.js";
import { cadenceTypesList } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceTable.type.ts.js";
import { cadenceTasksDisplay } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceTable.utils.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-timeTable.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const FirstColumnComponent = () => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceTable.timetable.components"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.column, styles.first_column),
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.row
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }, void 0), cadenceTypesList?.map((cadenceAction) => {
      const actionDisplayProps = cadenceTasksDisplay[cadenceAction];
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.row,
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: actionDisplayProps.icon,
          color: actionDisplayProps.color
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 23,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          uppercase: true,
          children: t(actionDisplayProps.key)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 24,
          columnNumber: 13
        }, void 0)]
      }, cadenceAction, true, {
        fileName: _jsxFileName,
        lineNumber: 22,
        columnNumber: 11
      }, void 0);
    })]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 5
  }, void 0);
};
_s(FirstColumnComponent, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = FirstColumnComponent;
export const FirstColumn = React.memo(FirstColumnComponent);
_c2 = FirstColumn;
export const LeftArrowAndFlag = () => {
  _s2();
  const {
    setScrollTo,
    isLeftPageDisabled
  } = useContext(CadenceTableImmutableContext);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceTable.timetable.components"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.edge_column,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.row,
      children: [/* @__PURE__ */ _jsxDEV(Tooltip, {
        position: "top",
        title: t("firstActivity"),
        children: /* @__PURE__ */ _jsxDEV(IconButton, {
          name: "chevronFirst",
          color: "darkBloobirds",
          size: 16,
          onClick: () => setScrollTo("firstActivity")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
        name: "chevronLeft",
        color: "darkBloobirds",
        size: 16,
        onClick: () => setScrollTo("pageBack"),
        disabled: isLeftPageDisabled.current
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
        position: "top",
        title: t("firstCadenceDay"),
        children: /* @__PURE__ */ _jsxDEV(IconButton, {
          name: "flag",
          size: 16,
          color: "darkBloobirds",
          onClick: () => setScrollTo("firstTask")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 61,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }, void 0), cadenceTypesList?.map((cadenceAction) => /* @__PURE__ */ _jsxDEV("div", {
      className: styles.row
    }, `empty-row-${cadenceAction}`, false, {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 9
    }, void 0))]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 43,
    columnNumber: 5
  }, void 0);
};
_s2(LeftArrowAndFlag, "C6u83WDIm/U6414JOvEx+Kww8qY=", false, function() {
  return [useTranslation];
});
_c3 = LeftArrowAndFlag;
export const RightArrowAndFlag = () => {
  _s3();
  const {
    setScrollTo,
    isRightPageDisabled
  } = useContext(CadenceTableImmutableContext);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceTable.timetable.components"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.edge_column,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.row,
      children: [/* @__PURE__ */ _jsxDEV(Tooltip, {
        position: "top",
        title: t("lastCadenceDay"),
        children: /* @__PURE__ */ _jsxDEV(IconButton, {
          name: "flagFilled",
          size: 16,
          color: "darkBloobirds",
          onClick: () => setScrollTo("lastTask")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 86,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 85,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
        name: "chevronRight",
        size: 16,
        color: "darkBloobirds",
        onClick: () => setScrollTo("pageForward"),
        disabled: isRightPageDisabled.current
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
        position: "top",
        title: t("lastActivity"),
        children: /* @__PURE__ */ _jsxDEV(IconButton, {
          name: "chevronLast",
          color: "darkBloobirds",
          size: 16,
          onClick: () => setScrollTo("lastActivity")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 101,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 7
    }, void 0), cadenceTypesList?.map((type, index) => /* @__PURE__ */ _jsxDEV("div", {
      className: styles.row
    }, `row-column-${index}`, false, {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 9
    }, void 0))]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 83,
    columnNumber: 5
  }, void 0);
};
_s3(RightArrowAndFlag, "IsOZSe/zhumrh/3CQDVc3MCGzDw=", false, function() {
  return [useTranslation];
});
_c4 = RightArrowAndFlag;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "FirstColumnComponent");
$RefreshReg$(_c2, "FirstColumn");
$RefreshReg$(_c3, "LeftArrowAndFlag");
$RefreshReg$(_c4, "RightArrowAndFlag");
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

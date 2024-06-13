import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceHeader-CadenceHeader.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/cadenceHeader/CadenceHeader.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/cadenceHeader/CadenceHeader.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useContext = __vite__cjsImport2_react["useContext"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Item, Select } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { CadenceTableContext, CadenceTableImmutableContext } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-CadenceTable.tsx.js";
import { TIME_WINDOW } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceTable.type.ts.js";
import { CurrentCadence } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceHeader-CurrentCadence.tsx.js";
import { LeadFilter } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceHeader-LeadFilter.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceHeader-cadenceHeader.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export function CadenceHeader(props) {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceTable.header"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._title__wrapper,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._name__wrapper,
      children: [/* @__PURE__ */ _jsxDEV(CurrentCadence, {
        ...props
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 9
      }, this), props.bobject?.id.typeName !== BobjectTypes.Lead && /* @__PURE__ */ _jsxDEV(LeadFilter, {
        bobjectType: props.bobject?.id.typeName,
        leads: props.leads
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 11
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._right_wrapper,
      children: [t("show"), " :", /* @__PURE__ */ _jsxDEV(TimeWindowFilter, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(KindFilter, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(TodayButton, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 23,
    columnNumber: 5
  }, this);
}
_s(CadenceHeader, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = CadenceHeader;
export const TimeWindowFilter = () => {
  _s2();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceTable.header.timeWindowFilter"
  });
  const {
    timeWindow
  } = useContext(CadenceTableContext);
  const {
    setTimeWindow
  } = useContext(CadenceTableImmutableContext);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._filter_right_wrapper,
    children: /* @__PURE__ */ _jsxDEV(Select, {
      value: timeWindow,
      onChange: (value) => setTimeWindow(value),
      placeholder: t("placeholder"),
      size: "small",
      variant: "filters",
      width: "150px",
      children: [/* @__PURE__ */ _jsxDEV(Item, {
        value: TIME_WINDOW.DAILY,
        children: t("daily")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        value: TIME_WINDOW.WEEKLY,
        children: t("weekly")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        value: TIME_WINDOW.MONTHLY,
        children: t("monthly")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 48,
    columnNumber: 5
  }, void 0);
};
_s2(TimeWindowFilter, "uX2mRb5i44/+/b+ok8k/iDnBysM=", false, function() {
  return [useTranslation];
});
_c2 = TimeWindowFilter;
const KindFilter = () => {
  _s3();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceTable.header.kindFilter"
  });
  const {
    setKindFilter
  } = useContext(CadenceTableImmutableContext);
  const setFilterValue = (value) => {
    if (value === "anyKind") {
      setKindFilter(null);
    } else {
      setKindFilter(value);
    }
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._filter_right_wrapper,
    children: /* @__PURE__ */ _jsxDEV(Select, {
      onChange: setFilterValue,
      placeholder: t("placeholder"),
      size: "small",
      defaultValue: t("anyType"),
      variant: "filters",
      width: "120px",
      children: [/* @__PURE__ */ _jsxDEV(Item, {
        value: "anyKind",
        children: t("anyType")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        value: "ATTEMPTS",
        children: t("attempts")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 90,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        value: "TOUCHES",
        children: t("touches")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        value: "INCOMING",
        children: t("incoming")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        value: "OUTGOING",
        children: t("outgoing")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        value: "MISSED",
        children: t("missed")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 79,
    columnNumber: 5
  }, void 0);
};
_s3(KindFilter, "8ZARi7Lm0/BjPCxNOlfHzLwtRpU=", false, function() {
  return [useTranslation];
});
_c3 = KindFilter;
const TodayButton = () => {
  _s4();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceTable.header"
  });
  const {
    setScrollTo
  } = useContext(CadenceTableImmutableContext);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._filter_right_wrapper,
    children: /* @__PURE__ */ _jsxDEV(Button, {
      variant: "tertiary",
      size: "small",
      onClick: () => setScrollTo("today"),
      children: t("today").toUpperCase()
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 105,
    columnNumber: 5
  }, void 0);
};
_s4(TodayButton, "B6b5JBybe4uPR65lNkyUsJJbssQ=", false, function() {
  return [useTranslation];
});
_c4 = TodayButton;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "CadenceHeader");
$RefreshReg$(_c2, "TimeWindowFilter");
$RefreshReg$(_c3, "KindFilter");
$RefreshReg$(_c4, "TodayButton");
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

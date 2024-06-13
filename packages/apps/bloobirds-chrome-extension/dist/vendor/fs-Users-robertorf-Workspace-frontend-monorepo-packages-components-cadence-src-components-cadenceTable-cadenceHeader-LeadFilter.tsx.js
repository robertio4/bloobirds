import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceHeader-LeadFilter.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/cadenceHeader/LeadFilter.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/cadenceHeader/LeadFilter.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useContext = __vite__cjsImport2_react["useContext"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Item, Select } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { CadenceTableImmutableContext } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-CadenceTable.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceHeader-cadenceHeader.module.css.js";
import { toSentenceCase } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const LeadFilter = (props) => {
  _s();
  const {
    bobjectType,
    leads
  } = props;
  const {
    setLeadFilter
  } = useContext(CadenceTableImmutableContext);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceTable.header"
  });
  const {
    t: bobjectTypeT
  } = useTranslation("translation", {
    keyPrefix: "bobjectTypes"
  });
  const setFilterValue = (value) => {
    if (value === "all") {
      setLeadFilter([]);
    } else if (value === "noLeads") {
      setLeadFilter(null);
    } else {
      setLeadFilter([value]);
    }
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._filter_wrapper,
    children: /* @__PURE__ */ _jsxDEV(Select, {
      onChange: setFilterValue,
      placeholder: t("placeholder"),
      size: "small",
      defaultValue: "all",
      variant: "filters",
      width: "275px",
      children: [/* @__PURE__ */ _jsxDEV(Item, {
        value: "all",
        children: t("allItem", {
          bobjectType: toSentenceCase(bobjectTypeT(bobjectType.toLowerCase()))
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        value: "noLeads",
        children: /* @__PURE__ */ _jsxDEV("em", {
          children: t("noLeadAssigned")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 9
      }, void 0), leads?.map((lead) => /* @__PURE__ */ _jsxDEV(Item, {
        value: lead.id.value,
        children: lead.fullName
      }, `${lead.id.objectId}`, false, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 11
      }, void 0))]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 33,
    columnNumber: 5
  }, void 0);
};
_s(LeadFilter, "Wr9K5r9wf95Q+eXl3VZVNWX5LiQ=", false, function() {
  return [useTranslation, useTranslation];
});
_c = LeadFilter;
var _c;
$RefreshReg$(_c, "LeadFilter");
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

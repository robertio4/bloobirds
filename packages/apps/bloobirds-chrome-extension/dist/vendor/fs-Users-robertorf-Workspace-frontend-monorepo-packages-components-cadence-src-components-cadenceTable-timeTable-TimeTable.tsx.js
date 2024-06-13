import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-TimeTable.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/timeTable/TimeTable.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/timeTable/TimeTable.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useEventSubscription } from "/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js";
import { api, keepPreviousResponse } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { format } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import __vite__cjsImport6_lodash_debounce from "/vendor/.vite-deps-lodash_debounce.js__v--ce8d7378.js"; const debounce = __vite__cjsImport6_lodash_debounce.__esModule ? __vite__cjsImport6_lodash_debounce.default : __vite__cjsImport6_lodash_debounce;
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { CadenceTableContext } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-CadenceTable.tsx.js";
import { CenterContent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-components-CenterContent.tsx.js";
import { FirstColumn, LeftArrowAndFlag, RightArrowAndFlag } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-components-components.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-timeTable.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TimeTable = ({
  bobject
}) => {
  _s();
  const {
    timeWindow,
    isFullFunctional,
    leadFilter,
    kindFilter
  } = useContext(CadenceTableContext);
  const {
    data,
    mutate
  } = useSWR(bobject && [`/bobjects/${bobject?.id?.objectId}/cadence`, timeWindow, isFullFunctional, kindFilter, leadFilter], () => {
    return api.post(`/bobjects/${bobject?.id?.accountId}/cadence`, {
      bobjectType: bobject?.id?.typeName,
      bobjectId: bobject?.id?.value,
      timeWindow,
      activityKind: kindFilter,
      startDate: isFullFunctional ? null : format(new Date().setDate(new Date().getDate() - 10), "yyyy-MM-dd"),
      endDate: isFullFunctional ? null : format(new Date().setDate(new Date().getDate() + 10), "yyyy-MM-dd"),
      leadIds: leadFilter
    });
  }, {
    use: [keepPreviousResponse]
  });
  function wsCallback(wsMessage) {
    if (!wsMessage || !bobject)
      return;
    if (wsMessage.operation === "UPDATE" && Object.keys(wsMessage.changes).length === 0) {
      return;
    }
    if (wsMessage?.relatedLead === bobject?.id?.value || wsMessage?.relatedCompany === bobject?.id?.value || wsMessage?.relatedOpportunity === bobject?.id?.value) {
      mutate();
    }
    if (bobject?.relatedBobjectIds?.some((relatedBobjectId) => relatedBobjectId === wsMessage?.relatedLead || relatedBobjectId === wsMessage?.relatedCompany || relatedBobjectId === wsMessage?.relatedOpportunity)) {
      mutate();
    }
  }
  const debouncedCallback = React.useRef(debounce(wsCallback, 1e3, {
    leading: true
  })).current;
  useEventSubscription("data-Task", debouncedCallback);
  useEventSubscription("data-Activity", debouncedCallback);
  useEffect(() => {
    return () => {
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);
  const response = data?.data;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    "data-test": "Timetable-Container",
    children: [/* @__PURE__ */ _jsxDEV(FirstColumn, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.table_content,
      children: [/* @__PURE__ */ _jsxDEV(LeftArrowAndFlag, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(CenterContent, {
        response,
        bobject
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(RightArrowAndFlag, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 88,
    columnNumber: 5
  }, void 0);
};
_s(TimeTable, "u5zsd7VzMSKkiyxWRL2NO9jzTaY=", false, function() {
  return [useSWR, useEventSubscription, useEventSubscription];
});
_c = TimeTable;
var _c;
$RefreshReg$(_c, "TimeTable");
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

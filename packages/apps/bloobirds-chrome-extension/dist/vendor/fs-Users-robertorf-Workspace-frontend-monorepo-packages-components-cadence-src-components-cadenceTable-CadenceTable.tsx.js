import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-CadenceTable.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/CadenceTable.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/CadenceTable.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const createContext = __vite__cjsImport2_react["createContext"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { CadenceHeader } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceHeader-CadenceHeader.tsx.js";
import { TIME_WINDOW } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceTable.type.ts.js";
import { TimeTable } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-TimeTable.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const defaultProps = {
  activeUserId: "",
  bobject: {
    id: null,
    assignedTo: null,
    cadenceId: null,
    companyId: null,
    targetMarket: null,
    relatedBobjectIds: []
  },
  leads: [],
  openCadenceControl: () => {
  },
  withoutHeader: false,
  hideActivityHover: false,
  onClickActivityEdit: void 0,
  onClickActivityView: void 0,
  onClickActivityExternal: void 0
};
const INIT_TIME_WINDOW = TIME_WINDOW.DAILY;
export const CadenceTableContext = createContext(null);
export const CadenceTableImmutableContext = createContext(null);
export function CadenceTable(props) {
  _s();
  const cadenceProps = {
    ...defaultProps,
    ...props
  };
  const [timeWindow, setTimeWindow] = useState(INIT_TIME_WINDOW);
  const [scrollTo, setScrollTo] = useState();
  const isLeftPageDisabled = useRef(false);
  const isRightPageDisabled = useRef(false);
  const [isFullFunctional, setIsFullFunctional] = useState(false);
  const [kindFilter, setKindFilter] = useState();
  const [leadFilter, setLeadFilter] = useState([]);
  const getters = useMemo(() => {
    return {
      timeWindow,
      scrollTo,
      isFullFunctional,
      kindFilter,
      leadFilter
    };
  }, [timeWindow, scrollTo, isFullFunctional, kindFilter, leadFilter]);
  const immutableValues = useMemo(() => {
    return {
      setTimeWindow,
      setScrollTo,
      setIsFullFunctional,
      setKindFilter,
      setLeadFilter,
      isLeftPageDisabled,
      isRightPageDisabled,
      hideActivityHover: cadenceProps.hideActivityHover,
      onClickActivityEdit: cadenceProps.onClickActivityEdit,
      onClickActivityView: cadenceProps.onClickActivityView,
      onClickActivityExternal: cadenceProps.onClickActivityExternal
    };
  }, []);
  return /* @__PURE__ */ _jsxDEV("div", {
    onClick: () => setIsFullFunctional(true),
    children: /* @__PURE__ */ _jsxDEV(CadenceTableImmutableContext.Provider, {
      value: immutableValues,
      children: /* @__PURE__ */ _jsxDEV(CadenceTableContext.Provider, {
        value: getters,
        children: [!cadenceProps?.withoutHeader && /* @__PURE__ */ _jsxDEV(CadenceHeader, {
          ...cadenceProps
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 97,
          columnNumber: 44
        }, this), /* @__PURE__ */ _jsxDEV(TimeTable, {
          bobject: cadenceProps.bobject
        }, cadenceProps.bobject.id.value, false, {
          fileName: _jsxFileName,
          lineNumber: 98,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 94,
    columnNumber: 5
  }, this);
}
_s(CadenceTable, "xQ1zXcGTQlLgbPR3Oyqqry2F2Ik=");
_c = CadenceTable;
var _c;
$RefreshReg$(_c, "CadenceTable");
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

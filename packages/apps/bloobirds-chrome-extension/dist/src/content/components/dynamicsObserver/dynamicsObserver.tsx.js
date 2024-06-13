import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/dynamicsObserver/dynamicsObserver.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/dynamicsObserver/dynamicsObserver.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { isElementLoaded } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { Fragment as _Fragment, jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const DynamicsObserver = () => {
  _s();
  const isDynamics = !!document.location.href.match("^.*://.*.crm4.dynamics.com.*");
  const [isObserverConfigured, setIsObserverConfigured] = useState(false);
  const [previousSelectedElement, setPreviousSelectedElement] = useState(null);
  const listNode = useRef(null);
  const {
    useGetCurrentPage,
    setCurrentPage,
    setActiveBobject,
    setExtendedContext,
    setCustomPage
  } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  useEffect(() => {
    if (isDynamics) {
      isElementLoaded(".ms-List").then((el) => {
        if (!el)
          return;
        listNode.current = el;
        if (!isObserverConfigured) {
          mutationObserverDynamicsFocusView.observe(el, {
            childList: true,
            subtree: true,
            attributes: true
          });
          setIsObserverConfigured(true);
        }
      });
    }
  }, []);
  useEffect(() => {
    if (isDynamics && previousSelectedElement) {
      const idArray = previousSelectedElement.split("-");
      idArray?.shift();
      const recordid = idArray?.join("-");
      const dynamicsUrl = new URL(document.location.href);
      const resource = dynamicsUrl.origin;
      const urlSearchParams = new URLSearchParams(window.location.search);
      const bobjectDynamicsType = urlSearchParams?.get("etn");
      const appId = urlSearchParams?.get("appid");
      const newPage = `${resource}/main.aspx?appid=${appId}&etn=${bobjectDynamicsType}&pagetype=entityrecord&id=${recordid}`;
      if (currentPage !== newPage) {
        setCurrentPage(newPage);
        setExtendedContext(null);
        setCustomPage(null);
        setActiveBobject(null);
      }
    }
  }, [previousSelectedElement, currentPage]);
  function isListElement(element) {
    return element === listNode.current;
  }
  function processDynamicsFocusView(mutationsList) {
    for (const mutationElement of mutationsList) {
      if (mutationElement.type === "childList") {
        for (const removedElement of mutationElement.removedNodes) {
          if (isListElement(removedElement)) {
            setIsObserverConfigured(false);
            mutationObserverDynamicsFocusView.disconnect();
            setCurrentPage(null);
            setExtendedContext(null);
            setCustomPage(null);
            setActiveBobject(null);
            listNode.current = null;
            return void 0;
          }
        }
      }
    }
    const elementSelected = document.querySelector('[class*=" SelectedWrapperCardStyle"]  span[id]');
    if (elementSelected) {
      if (elementSelected.id !== previousSelectedElement) {
        setPreviousSelectedElement(elementSelected.id);
        return elementSelected;
      }
    } else {
      setPreviousSelectedElement(null);
    }
    return void 0;
  }
  const debouncedProcessDynamicsFocusView = (mutationsList) => {
    setTimeout(() => {
      processDynamicsFocusView(mutationsList);
    }, 550);
  };
  const mutationObserverDynamicsFocusView = useMemo(() => {
    return new MutationObserver((mutationsList) => {
      debouncedProcessDynamicsFocusView(mutationsList);
    });
  }, []);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
};
_s(DynamicsObserver, "Wvrx7BCThvTkCqQ0bFAazZPEx5s=", true, function() {
  return [useExtensionContext];
});
_c = DynamicsObserver;
export default DynamicsObserver;
var _c;
$RefreshReg$(_c, "DynamicsObserver");
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

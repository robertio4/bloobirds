import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/templateSelectorApp.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/templateSelectorApp.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/templateSelectorApp.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Suspense = __vite__cjsImport2_react["Suspense"]; const useCallback = __vite__cjsImport2_react["useCallback"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { Spinner } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { RecoilRoot } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import { SWRConfig } from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { Actions } from "/src/types/messages.ts.js";
import { TemplateSelectorPlaces } from "/src/types/messagingTemplates.ts.js";
import { normalizeUrl } from "/src/utils/url.ts.js";
import { TemplateSelectorLoading } from "/src/content/components/templatesSelector/components/templateSelectorLoading.tsx.js";
import TemplateSelectorWrapper from "/src/content/components/templatesSelector/templateSelectorWrapper.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const useDebouncedCallback = (func, wait) => {
  _s();
  const timeout = useRef();
  return useCallback((...args) => {
    const later = () => {
      clearTimeout(timeout.current);
      func(...args);
    };
    clearTimeout(timeout.current);
    timeout.current = setTimeout(later, wait);
  }, [func, wait]);
};
_s(useDebouncedCallback, "4JRTAi0rbGHniqlruX+7Xi2vgPU=");
export const TemplateSelectorApp = ({
  place,
  parentForm,
  bubbleContext
}) => {
  _s2();
  const url = normalizeUrl(window.location.href);
  const [currentPage, setCurrentPage] = useState(url);
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canRenderTemplate, setCanRenderTemplate] = useState(true);
  function pageChangeHandler(message) {
    if (message.type === Actions.HistoryUpdate) {
      setLead(null);
      setLoading(true);
      setCurrentPage(normalizeUrl(window.location.href));
      if (place === TemplateSelectorPlaces.SalesNavigator || place === TemplateSelectorPlaces.Linkedin) {
        setCanRenderTemplate(false);
        setTimeout(() => {
          setCanRenderTemplate(true);
        }, 1e3);
      }
    }
  }
  const debouncedPageChangeHandler = place === TemplateSelectorPlaces.SalesNavigator ? useDebouncedCallback(pageChangeHandler, 1e3) : pageChangeHandler;
  useEffect(() => {
    chrome?.runtime?.onMessage.addListener(debouncedPageChangeHandler);
    return () => {
      chrome?.runtime?.onMessage.removeListener(debouncedPageChangeHandler);
    };
  }, []);
  return /* @__PURE__ */ _jsxDEV(SWRConfig, {
    value: {
      revalidateOnFocus: false
    },
    children: /* @__PURE__ */ _jsxDEV(RecoilRoot, {
      children: canRenderTemplate && url === currentPage ? /* @__PURE__ */ _jsxDEV(Suspense, {
        fallback: /* @__PURE__ */ _jsxDEV(Spinner, {
          name: "loadingCircle",
          size: 18
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 86,
          columnNumber: 31
        }, void 0),
        children: /* @__PURE__ */ _jsxDEV(TemplateSelectorWrapper, {
          place,
          parentForm,
          bubbleEl: bubbleContext,
          lead,
          loading,
          setLead,
          setLoading,
          bubbleContext,
          currentPage
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 87,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(TemplateSelectorLoading, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 11
      }, void 0)
    }, "bb-chrome-extension-template-selector", false, {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 79,
    columnNumber: 5
  }, void 0);
};
_s2(TemplateSelectorApp, "2LNeoO05LZX/CYbqG43PNik9WgU=", false, function() {
  return [useDebouncedCallback];
});
_c = TemplateSelectorApp;
var _c;
$RefreshReg$(_c, "TemplateSelectorApp");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/contactView.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/contactView.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/contactView.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useSessionStorage, useSuggestedTemplates } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ContactViewSubTab, PlaybookTab, SessionStorageKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import { TourHandler } from "/src/content/components/tourHandler/tourHandler.tsx.js";
import ContactViewScreens from "/src/content/components/contactView/contactViewScreens.tsx.js";
import ContactViewTabs from "/src/content/components/contactView/contactViewTabs.tsx.js";
import { ContactViewProvider } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ContactView = ({
  defaultContext
}) => {
  _s();
  const {
    useGetActiveBobject,
    setActiveBobject,
    useGetForcedActiveTab,
    useGetForcedActiveSubTab
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const {
    activeBobject: defaultActiveBobject
  } = defaultContext || {};
  const forcedActiveTab = useGetForcedActiveTab();
  const forcedActiveSubTab = useGetForcedActiveSubTab();
  const {
    setLastVisitedBobject
  } = useFloatingMenuContext();
  const {
    get
  } = useSessionStorage();
  useSuggestedTemplates(activeBobject, void 0, PlaybookTab.EMAILS);
  useSuggestedTemplates(activeBobject, void 0, PlaybookTab.PITCHES);
  const activeTabSaved = get(SessionStorageKeys.ActiveTab);
  const activeSubTabSaved = get(SessionStorageKeys.ActiveSubTab);
  useEffect(() => {
    if (defaultActiveBobject) {
      setActiveBobject(defaultContext.activeBobject);
    }
  }, [defaultContext]);
  const bobjectType = activeBobject?.id?.typeName;
  let initialContext = defaultContext;
  if (!defaultContext) {
    if (activeTabSaved && activeSubTabSaved) {
      initialContext = {
        activeTab: activeTabSaved,
        activeSubTab: activeSubTabSaved
      };
    } else {
      initialContext = {
        activeTab: forcedActiveTab ?? (activeBobject && bobjectType),
        activeSubTab: forcedActiveSubTab ?? ContactViewSubTab.OVERVIEW
      };
    }
  }
  if (activeBobject && bobjectType === initialContext.activeTab) {
    setLastVisitedBobject(activeBobject);
  }
  return /* @__PURE__ */ _jsxDEV(ContactViewProvider, {
    defaultContext: initialContext,
    children: [/* @__PURE__ */ _jsxDEV(ContactViewTabs, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewScreens, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(TourHandler, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 65,
    columnNumber: 5
  }, void 0);
};
_s(ContactView, "SbiHRRh2w78BSAHOrVAIIDtdyko=", true, function() {
  return [useExtensionContext, useFloatingMenuContext, useSessionStorage, useSuggestedTemplates, useSuggestedTemplates];
});
_c = ContactView;
var _c;
$RefreshReg$(_c, "ContactView");
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

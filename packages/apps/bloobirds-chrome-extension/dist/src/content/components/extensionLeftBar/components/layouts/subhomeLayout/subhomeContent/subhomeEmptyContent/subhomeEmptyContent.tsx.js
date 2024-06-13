import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMinimizableModals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { NoResultsPage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-src-index.tsx.js";
import { t } from "/vendor/.vite-deps-xstate.js__v--ca84df4a.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const EmptyTaskList = () => {
  _s();
  const {
    t: t2
  } = useTranslation();
  const {
    useGetSidePeekEnabled
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const {
    openMinimizableModal
  } = useMinimizableModals();
  function openTaskModal() {
    openMinimizableModal({
      type: "task",
      data: {
        location: "bubble"
      }
    });
  }
  return /* @__PURE__ */ _jsxDEV(NoResultsPage, {
    title: t2("leftBar.noResultsPage.emptyTaskList.title"),
    description: t2("leftBar.noResultsPage.emptyTaskList.description"),
    actionButton: /* @__PURE__ */ _jsxDEV(Button, {
      size: "small",
      onClick: openTaskModal,
      iconLeft: "plus",
      children: t2("leftBar.noResultsPage.createNewTask")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 9
    }, void 0),
    sidePeekEnabled
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 27,
    columnNumber: 5
  }, void 0);
};
_s(EmptyTaskList, "2HI3+nOHApgQiEC2mW+Wi7n0tWM=", true, function() {
  return [useTranslation, useExtensionContext, useMinimizableModals];
});
_c = EmptyTaskList;
export const NoFilterSelected = () => {
  _s2();
  const {
    useGetSidePeekEnabled
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  return /* @__PURE__ */ _jsxDEV(NoResultsPage, {
    title: t("leftBar.noResultsPage.noFilterSelected.title"),
    description: t("leftBar.noResultsPage.noFilterSelected.description"),
    sidePeekEnabled
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 45,
    columnNumber: 5
  }, void 0);
};
_s2(NoFilterSelected, "4i97H0v//x7XKvyGnqjsbPnAgHo=", true, function() {
  return [useExtensionContext];
});
_c2 = NoFilterSelected;
export const NoFilterResults = () => {
  _s3();
  const {
    useGetSidePeekEnabled
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const {
    t: t2
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV(NoResultsPage, {
    title: t2("leftBar.noResultsPage.noFilterResults.title"),
    description: t2("leftBar.noResultsPage.noFilterResults.description"),
    sidePeekEnabled
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 58,
    columnNumber: 5
  }, void 0);
};
_s3(NoFilterResults, "vtIkBa6xQVKNmjv+4TpL8Gbi8bo=", true, function() {
  return [useExtensionContext, useTranslation];
});
_c3 = NoFilterResults;
var _c, _c2, _c3;
$RefreshReg$(_c, "EmptyTaskList");
$RefreshReg$(_c2, "NoFilterSelected");
$RefreshReg$(_c3, "NoFilterResults");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/inactiveView/list/inactiveTabList.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inactiveView/list/inactiveTabList.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inactiveView/list/inactiveTabList.tsx", _s = $RefreshSig$();
import { SalesforceTabs, MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { VirtualInfiniteScroll } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-virtualInfiniteScroll-dist-index.js.js";
import { CustomCard } from "/src/content/components/card/card.tsx.js";
import SubhomeContentSkeleton from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton.tsx.js";
import { NoFilterResults } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { useInactiveItems } from "/src/content/components/extensionLeftBar/components/views/inactiveView/hooks/useInactiveTab.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const InactiveTabList = ({
  parentRef,
  isLoading
}) => {
  _s();
  const {
    tabBobject
  } = useSubhomeContext();
  const {
    items,
    isLoading: isValidating,
    totalMatching,
    fetchNextPage
  } = useInactiveItems(tabBobject);
  if (!(isValidating && isLoading) && items?.length === 0) {
    return /* @__PURE__ */ _jsxDEV(NoFilterResults, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 12
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: /* @__PURE__ */ _jsxDEV(VirtualInfiniteScroll, {
      parentRef,
      rows: items,
      totalRows: totalMatching,
      isFetchingData: isLoading && isValidating,
      fetchNextPage,
      contentSkeleton: () => /* @__PURE__ */ _jsxDEV(SubhomeContentSkeleton, {
        visible: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 32
      }, void 0),
      children: (data) => data?.id?.objectId && /* @__PURE__ */ _jsxDEV(CustomCard, {
        bobject: data,
        tabName: SalesforceTabs.INACTIVE,
        mutate: () => {
          window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: {
              type: tabBobject
            }
          }));
        },
        isSelectable: true
      }, data?.id?.objectId, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 13
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }, void 0)
  }, void 0, false);
};
_s(InactiveTabList, "kr6m6mTFMdnjzEGcP+tfYzmKJYo=", false, function() {
  return [useSubhomeContext, useInactiveItems];
});
_c = InactiveTabList;
var _c;
$RefreshReg$(_c, "InactiveTabList");
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

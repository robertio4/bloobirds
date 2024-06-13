import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/outboxView/list/outboxTabsList.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/outboxView/list/outboxTabsList.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/outboxView/list/outboxTabsList.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Fragment = __vite__cjsImport2_react["Fragment"];
import { VirtualInfiniteScroll } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-virtualInfiniteScroll-dist-index.js.js";
import { DateGroupHeader } from "/src/content/components/dateGroupHeader/dateGroupHeader.tsx.js";
import SubhomeContentSkeleton from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton.tsx.js";
import { NoFilterResults } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent.tsx.js";
import { OutboxCard } from "/src/content/components/extensionLeftBar/components/views/outboxView/card/outboxCard.tsx.js";
import { useOutboxTab } from "/src/content/components/extensionLeftBar/components/views/outboxView/hooks/useOutboxTab.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const OutboxTabList = ({
  parentRef,
  isLoading
}) => {
  _s();
  const {
    items,
    isLoading: isValidating,
    fetchNextPage,
    totalMatching
  } = useOutboxTab();
  if (!(isValidating && isLoading) && items?.length === 0) {
    return /* @__PURE__ */ _jsxDEV(NoFilterResults, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 12
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: /* @__PURE__ */ _jsxDEV(VirtualInfiniteScroll, {
      parentRef,
      rows: items,
      totalRows: totalMatching,
      isFetchingData: isValidating && isLoading,
      fetchNextPage,
      contentSkeleton: () => /* @__PURE__ */ _jsxDEV(SubhomeContentSkeleton, {
        visible: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 32
      }, void 0),
      children: (data) => data?.id?.objectId && /* @__PURE__ */ _jsxDEV(Fragment, {
        children: [data?.taskDate?.isFirstOfDay && /* @__PURE__ */ _jsxDEV(DateGroupHeader, {
          bobject: data
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 48
        }, void 0), /* @__PURE__ */ _jsxDEV(OutboxCard, {
          bobject: data
        }, data?.id?.objectId, false, {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 15
        }, void 0)]
      }, data?.id?.objectId, true, {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 13
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }, void 0)
  }, void 0, false);
};
_s(OutboxTabList, "Yqs7Vq+Yr79Ly1H0bdG0+/zG5NQ=", false, function() {
  return [useOutboxTab];
});
_c = OutboxTabList;
var _c;
$RefreshReg$(_c, "OutboxTabList");
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

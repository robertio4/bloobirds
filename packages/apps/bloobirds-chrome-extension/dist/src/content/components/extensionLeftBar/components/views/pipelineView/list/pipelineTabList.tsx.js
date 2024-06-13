import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/pipelineView/list/pipelineTabList.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/pipelineView/list/pipelineTabList.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/pipelineView/list/pipelineTabList.tsx", _s = $RefreshSig$();
import { SalesforceTabs, MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { VirtualInfiniteScroll } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-virtualInfiniteScroll-dist-index.js.js";
import { CustomCard } from "/src/content/components/card/card.tsx.js";
import { useExtensionLeftBarContext } from "/src/content/components/extensionLeftBar/extensionLeftBarContext.tsx.js";
import SubhomeContentSkeleton from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton.tsx.js";
import { NoFilterResults } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const PipelineTabList = ({
  parentRef,
  itemHandling,
  isLoading,
  bobjectType
}) => {
  _s();
  const {
    pipelineLastVisitDates
  } = useExtensionLeftBarContext();
  const {
    items,
    isLoading: isValidating,
    totalMatching,
    fetchNextPage
  } = itemHandling;
  if (!(isValidating && isLoading) && items?.length === 0) {
    return /* @__PURE__ */ _jsxDEV(NoFilterResults, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 12
    }, void 0);
  }
  const isNewlyAssignedBobject = (bobject, bobjectType2) => {
    const lastVisitedTabDate = pipelineLastVisitDates[bobjectType2];
    const bobjectAssignedDate = new Date(bobject?.fields?.find((field) => field.logicRole.includes("LAST_ASSIGNED_DATE")).value);
    return lastVisitedTabDate && bobjectAssignedDate && bobjectAssignedDate > lastVisitedTabDate;
  };
  return /* @__PURE__ */ _jsxDEV(VirtualInfiniteScroll, {
    parentRef,
    rows: items,
    totalRows: totalMatching,
    isFetchingData: isValidating && isLoading,
    fetchNextPage,
    contentSkeleton: () => /* @__PURE__ */ _jsxDEV(SubhomeContentSkeleton, {
      visible: true
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 30
    }, void 0),
    children: (data) => data?.id?.objectId && /* @__PURE__ */ _jsxDEV(CustomCard, {
      bobject: data,
      mutate: () => {
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: bobjectType
          }
        }));
      },
      showNew: isNewlyAssignedBobject(data, bobjectType),
      tabName: SalesforceTabs.PIPELINE,
      isSelectable: true
    }, data?.id?.objectId, false, {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 11
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 41,
    columnNumber: 5
  }, void 0);
};
_s(PipelineTabList, "RGVWpIUofC7aAWZoLRa2oHkv3RI=", false, function() {
  return [useExtensionLeftBarContext];
});
_c = PipelineTabList;
var _c;
$RefreshReg$(_c, "PipelineTabList");
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

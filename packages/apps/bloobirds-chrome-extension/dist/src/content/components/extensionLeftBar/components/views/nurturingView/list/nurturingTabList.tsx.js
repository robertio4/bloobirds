import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/nurturingView/list/nurturingTabList.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/nurturingView/list/nurturingTabList.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/nurturingView/list/nurturingTabList.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Fragment = __vite__cjsImport2_react["Fragment"];
import { BobjectTypes, SalesforceTabs, MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { VirtualInfiniteScroll } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-virtualInfiniteScroll-dist-index.js.js";
import { CustomCard } from "/src/content/components/card/card.tsx.js";
import { DateGroupHeader } from "/src/content/components/dateGroupHeader/dateGroupHeader.tsx.js";
import SubhomeContentSkeleton from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton.tsx.js";
import { EmptyTaskList, NoFilterResults } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { useNurturingTab } from "/src/content/components/extensionLeftBar/components/views/nurturingView/hooks/useNurturingTab.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const NurturingTabList = ({
  parentRef,
  isLoading
}) => {
  _s();
  const {
    items: tasks,
    isLoading: isValidating,
    totalMatching,
    fetchNextPage,
    customTasks
  } = useNurturingTab();
  const {
    haveFiltersBeenChanged
  } = useSubhomeContext();
  if (!(isValidating && isLoading) && tasks?.length === 0) {
    return haveFiltersBeenChanged ? /* @__PURE__ */ _jsxDEV(NoFilterResults, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 37
    }, void 0) : /* @__PURE__ */ _jsxDEV(EmptyTaskList, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 59
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(VirtualInfiniteScroll, {
    parentRef,
    rows: tasks,
    totalRows: totalMatching,
    isFetchingData: isLoading && isValidating,
    fetchNextPage,
    contentSkeleton: () => /* @__PURE__ */ _jsxDEV(SubhomeContentSkeleton, {
      visible: true
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 30
    }, void 0),
    children: (data) => data?.id?.objectId && /* @__PURE__ */ _jsxDEV(Fragment, {
      children: [data?.taskDate?.isFirstOfDay && /* @__PURE__ */ _jsxDEV(DateGroupHeader, {
        bobject: data
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 46
      }, void 0), /* @__PURE__ */ _jsxDEV(CustomCard, {
        bobject: data,
        mutate: () => {
          window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: {
              type: BobjectTypes.Task
            }
          }));
        },
        tabName: SalesforceTabs.NURTURING,
        customTasks
      }, data?.id?.objectId, false, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 13
      }, void 0)]
    }, data?.id?.objectId, true, {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 11
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 38,
    columnNumber: 5
  }, void 0);
};
_s(NurturingTabList, "90GcjdWu5ndHzmhU8+wClUM4CHQ=", false, function() {
  return [useNurturingTab, useSubhomeContext];
});
_c = NurturingTabList;
var _c;
$RefreshReg$(_c, "NurturingTabList");
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

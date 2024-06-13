import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/tasksView/list/tasksTabsList.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/tasksView/list/tasksTabsList.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/tasksView/list/tasksTabsList.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Fragment = __vite__cjsImport2_react["Fragment"]; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useQuickLogActivity } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, MessagesEvents, SalesforceTabs, TASK_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { VirtualInfiniteScroll } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-virtualInfiniteScroll-dist-index.js.js";
import { getFieldByLogicRole } from "/src/utils/bobjects.utils.ts.js";
import { CustomCard } from "/src/content/components/card/card.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { DateGroupHeader } from "/src/content/components/dateGroupHeader/dateGroupHeader.tsx.js";
import SubhomeContentSkeleton from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton.tsx.js";
import { NoFilterResults } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent.tsx.js";
import { useTasksTab } from "/src/content/components/extensionLeftBar/components/views/tasksView/hooks/useTasksTab.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TasksTabList = ({
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
  } = useTasksTab();
  const {
    setCurrentTask,
    useGetCurrentTask,
    setContactViewBobjectId
  } = useExtensionContext();
  const currentTask = useGetCurrentTask();
  const {
    logCustomActivity
  } = useQuickLogActivity();
  useEffect(() => {
    if (currentTask && tasks) {
      const updatedTask = tasks.find((t) => t.id.objectId === currentTask.id.objectId);
      const company = getFieldByLogicRole(updatedTask, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
      const lead = getFieldByLogicRole(updatedTask, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
      const opportunity = getFieldByLogicRole(updatedTask, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
      if (opportunity) {
        setContactViewBobjectId(opportunity?.id.value);
      } else if (lead) {
        setContactViewBobjectId(lead?.id.value);
      } else if (company) {
        setContactViewBobjectId(company?.id.value);
      } else {
        setCurrentTask(updatedTask);
      }
    }
  }, [tasks]);
  if (!(isValidating && isLoading) && tasks?.length === 0) {
    return /* @__PURE__ */ _jsxDEV(NoFilterResults, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 12
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(VirtualInfiniteScroll, {
    parentRef,
    rows: tasks,
    totalRows: totalMatching,
    isFetchingData: isValidating || isLoading || !customTasks,
    fetchNextPage,
    contentSkeleton: () => /* @__PURE__ */ _jsxDEV(SubhomeContentSkeleton, {
      visible: true
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 30
    }, void 0),
    children: (data) => data?.id?.objectId && /* @__PURE__ */ _jsxDEV(Fragment, {
      children: [data?.taskDate?.isFirstOfDay && /* @__PURE__ */ _jsxDEV(DateGroupHeader, {
        bobject: data
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 76,
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
        tabName: SalesforceTabs.TASKS,
        customTasks,
        logCustomActivity
      }, data?.id?.objectId, false, {
        fileName: _jsxFileName,
        lineNumber: 77,
        columnNumber: 13
      }, void 0)]
    }, data?.id?.objectId, true, {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 11
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 65,
    columnNumber: 5
  }, void 0);
};
_s(TasksTabList, "Iow7LYCeTb8Qw1AtX/6XWjNege8=", true, function() {
  return [useTasksTab, useExtensionContext, useQuickLogActivity];
});
_c = TasksTabList;
var _c;
$RefreshReg$(_c, "TasksTabList");
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

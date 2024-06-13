import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/clusteredTaskFeed/components/taskList/tasksTabsList.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/clusteredTaskFeed/components/taskList/tasksTabsList.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/clusteredTaskFeed/components/taskList/tasksTabsList.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Suspense = __vite__cjsImport2_react["Suspense"];
import { TaskFeedErrorPage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-index.tsx.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { TaskFeedProvider, useTaskFeedContext } from "/src/content/components/contactView/components/clusteredTaskFeed/utils/useTasksTab.tsx.js";
import { TaskFeedSkeleton } from "/src/content/components/contactView/components/clusteredTaskFeed/components/taskFeedSkeleton/taskFeedSkeleton.tsx.js";
import { TasksTabFilters } from "/src/content/components/contactView/components/clusteredTaskFeed/components/taskFilters/tasksTabFilters.tsx.js";
import TaskTabFeedGroup from "/src/content/components/contactView/components/clusteredTaskFeed/components/taskList/taskTabFeedGroup.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function injectCadenceName(task, cadences) {
  if (!cadences)
    return task;
  const cadenceName = cadences.find((cadence) => cadence.id === task.cadenceId)?.name;
  return {
    ...task,
    cadenceName
  };
}
export const TasksTabList = ({
  parentRef
}) => {
  _s();
  const {
    useGetState,
    tasks
  } = useTaskFeedContext();
  const visibleClusters = useGetState((state) => state.visibleClusters);
  const {
    data
  } = useSWR("/taskFeed/cadences", {
    revalidateOnFocus: false
  });
  return !tasks || tasks.isLoading && !tasks.clusters ? /* @__PURE__ */ _jsxDEV(TaskFeedSkeleton, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 24,
    columnNumber: 5
  }, void 0) : tasks.error ? /* @__PURE__ */ _jsxDEV(TaskFeedErrorPage, {
    onClick: () => tasks?.mutate?.()
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 26,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "16px",
      width: "100%"
    },
    children: [/* @__PURE__ */ _jsxDEV(TasksTabFilters, {
      filtersVisible: true
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }, void 0), tasks?.type === "clustered" && Object.entries(tasks.clusters).filter(([clusterName, _]) => {
      return visibleClusters.includes(clusterName);
    }).map(([clusterName, clusterTasks]) => {
      if (["overdueTasks", "reminders"].includes(clusterName) && clusterTasks.tasks.length === 0)
        return null;
      return /* @__PURE__ */ _jsxDEV(TaskTabFeedGroup, {
        tasks: {
          ...clusterTasks,
          tasks: clusterTasks?.tasks.map((task) => injectCadenceName(task, data?.cadences))
        },
        clusterName,
        isLoading: tasks.isLoading,
        parentRef,
        taskFeedReqBody: tasks.taskFeedRequest,
        defaultOpen: visibleClusters.length === 1
      }, clusterName, false, {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 15
      }, void 0);
    })]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 5
  }, void 0);
};
_s(TasksTabList, "VdL0Oipdnsp+kWcJ56PKGGaELtg=", true, function() {
  return [useTaskFeedContext, useSWR];
});
_c = TasksTabList;
export function ClusteredTasksList(props) {
  return /* @__PURE__ */ _jsxDEV(Suspense, {
    fallback: /* @__PURE__ */ _jsxDEV(TaskFeedSkeleton, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 25
    }, this),
    children: /* @__PURE__ */ _jsxDEV(TaskFeedProvider, {
      mainBobject: props?.mainBobject,
      children: /* @__PURE__ */ _jsxDEV(TasksTabList, {
        ...props
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 62,
    columnNumber: 5
  }, this);
}
_c2 = ClusteredTasksList;
var _c, _c2;
$RefreshReg$(_c, "TasksTabList");
$RefreshReg$(_c2, "ClusteredTasksList");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/newTasksView/list/tasksTabsList.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/tasksTabsList.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/tasksTabsList.tsx", _s = $RefreshSig$();
import { Skeleton } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { TaskFeedErrorPage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-index.tsx.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useSubscribeListeners } from "/src/content/components/contactView/hooks/useSubscribeListeners.tsx.js";
import { useTaskFeedContext } from "/src/content/components/extensionLeftBar/components/views/newTasksView/hooks/useTasksTab.tsx.js";
import TaskTabFeedGroup, { TaskTabFeedGroupTitle } from "/src/content/components/extensionLeftBar/components/views/newTasksView/list/taskTabFeedGroup.tsx.js";
import styles from "/src/content/components/extensionLeftBar/components/views/newTasksView/list/taskTabsList.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const clusterNames = ["dailyTasks", "scheduledTasks", "reminders", "overdueTasks"];
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
  useSubscribeListeners(BobjectTypes.Task, tasks?.mutate);
  if (!tasks || tasks.isLoading && !tasks.clusters) {
    return /* @__PURE__ */ _jsxDEV("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "32px"
      },
      children: clusterNames.map((name) => {
        return /* @__PURE__ */ _jsxDEV("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "4px"
          },
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles.header,
            children: /* @__PURE__ */ _jsxDEV(TaskTabFeedGroupTitle, {
              cluster: name
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 42,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 41,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Skeleton, {
            variant: "rect",
            width: "100%",
            height: "140px"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 44,
            columnNumber: 15
          }, void 0)]
        }, name + "clusterLoader", true, {
          fileName: _jsxFileName,
          lineNumber: 37,
          columnNumber: 13
        }, void 0);
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }, void 0);
  }
  if (tasks?.error) {
    return /* @__PURE__ */ _jsxDEV(TaskFeedErrorPage, {
      onClick: () => tasks?.mutate?.()
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 12
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: tasks?.type === "clustered" && Object.entries(tasks.clusters).filter(([clusterName, _]) => {
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
        lineNumber: 70,
        columnNumber: 15
      }, void 0);
    })
  }, void 0, false);
};
_s(TasksTabList, "Uk6IBv/DOydo1RSh5HaYyfaGEIE=", true, function() {
  return [useTaskFeedContext, useSWR, useSubscribeListeners];
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

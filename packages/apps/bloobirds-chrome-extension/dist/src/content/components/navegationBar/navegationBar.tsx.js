import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/navegationBar/navegationBar.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/navegationBar/navegationBar.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/navegationBar/navegationBar.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, IconButton, Spinner, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useDebounceEffect, useSessionStorage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { MessagesEvents, SessionStorageKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getTaskReferencedBobject, getTaskText } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { clsx } from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useTasksAllSearch } from "/src/content/components/extensionLeftBar/components/views/tasksView/hooks/useTasksTab.ts.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import styles from "/src/content/components/navegationBar/navegationBar.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const NavigationBar = ({
  dragging,
  stage,
  quickFilter
}) => {
  _s();
  const {
    get,
    set
  } = useSessionStorage();
  const {
    setOpenStartTasksNavigation,
    setContactViewBobjectId,
    setTaskId,
    setCurrentTask,
    useGetCurrentTask,
    useGetSidePeekEnabled,
    useGetOpenStartTasksNavigation
  } = useExtensionContext();
  const {
    setIsHome
  } = useFloatingMenuContext();
  const currentTask = useGetCurrentTask();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const openStartTasksNavigation = useGetOpenStartTasksNavigation();
  const {
    cluster
  } = openStartTasksNavigation;
  const {
    tasks,
    isLoading
  } = useTasksAllSearch(stage, quickFilter, cluster);
  const currentTaskIndex = tasks?.findIndex((task) => task.id.value === currentTask?.id.value);
  const index = currentTaskIndex !== -1 ? currentTaskIndex : get(SessionStorageKeys.IndexSelectedTask);
  const [indexSelectedTask, setIndexSelectedTask] = useState(index || 0);
  const isFirst = indexSelectedTask === 0;
  const isLast = indexSelectedTask === tasks?.length - 1;
  const {
    t
  } = useTranslation();
  const selectedTask = tasks?.[indexSelectedTask];
  const tasksCompleted = get(SessionStorageKeys.TaskCompleted);
  const [taskCompleted, setTaskCompleted] = useState(tasksCompleted?.includes(selectedTask?.id?.value));
  const taskTitle = getTaskText(selectedTask, "Title", void 0, false, t);
  const referenceBobject = getTaskReferencedBobject(selectedTask);
  function updateTaskFromIndex(index2) {
    setIndexSelectedTask(index2);
    const nextTask2 = tasks?.[index2];
    const nextTaskReferenceBobject = getTaskReferencedBobject(nextTask2);
    if (nextTaskReferenceBobject)
      setContactViewBobjectId(nextTaskReferenceBobject.bobjectId);
    setTaskId(nextTask2?.id?.value);
  }
  const nextTask = () => {
    const index2 = indexSelectedTask + 1;
    updateTaskFromIndex(index2);
  };
  const previousTask = () => {
    const index2 = indexSelectedTask - 1;
    updateTaskFromIndex(index2);
  };
  const firstTask = () => {
    const index2 = 0;
    updateTaskFromIndex(index2);
  };
  const lastTask = () => {
    const index2 = tasks?.length - 1;
    updateTaskFromIndex(index2);
  };
  const allTasksCompleted = () => {
    if (!tasks?.length)
      return false;
    const tasksCompleted2 = get(SessionStorageKeys.TaskCompleted);
    if (!tasksCompleted2)
      return false;
    return tasks.every((task) => tasksCompleted2.includes(task.id.value));
  };
  const areAllTasksCompleted = allTasksCompleted();
  const containerClasses = clsx(styles.container, {
    [styles.containerGradient]: !taskCompleted,
    [styles.containerGradientCompleted]: taskCompleted,
    [styles.containerSidePeek]: sidePeekEnabled
  });
  const titleClasses = clsx(styles.taskTitle, {
    [styles.taskTitle_sidePeek]: sidePeekEnabled
  });
  useEffect(() => {
    if (tasks?.length && !isLoading) {
      set(SessionStorageKeys.IndexSelectedTask, indexSelectedTask);
    }
  }, [indexSelectedTask]);
  useEffect(() => {
    if (tasks?.length) {
      setIndexSelectedTask(index < tasks?.length ? index : tasks?.length - 1);
    }
  }, [tasks?.length]);
  useEffect(() => {
    if (tasks?.length && currentTaskIndex !== -1) {
      setIndexSelectedTask(currentTaskIndex);
    }
  }, [currentTaskIndex]);
  useDebounceEffect(() => {
    if (selectedTask) {
      if (referenceBobject?.bobjectId) {
        setContactViewBobjectId(referenceBobject.bobjectId);
      } else if (!referenceBobject?.bobjectId && selectedTask?.id.value !== currentTask?.id.value && !tasksCompleted?.includes(selectedTask?.id?.value)) {
        setContactViewBobjectId(null);
        setCurrentTask(selectedTask);
        setIsHome(true);
      }
    }
  }, [selectedTask?.id?.value], 150);
  useEffect(() => {
    const saveTaskCompleted = (event) => {
      const {
        id
      } = event.detail;
      const taskCompleted2 = get(SessionStorageKeys.TaskCompleted);
      if (!taskCompleted2) {
        set(SessionStorageKeys.TaskCompleted, [id]);
      } else {
        set(SessionStorageKeys.TaskCompleted, [...taskCompleted2, id]);
      }
      if (id === selectedTask?.id?.value) {
        setTaskCompleted(true);
      }
    };
    window.addEventListener(MessagesEvents.TaskCompleted, saveTaskCompleted);
    return () => {
      window.removeEventListener(MessagesEvents.TaskCompleted, saveTaskCompleted);
    };
  }, [selectedTask?.id.value]);
  useEffect(() => {
    if (tasksCompleted?.includes(selectedTask?.id?.value)) {
      setTaskCompleted(true);
      setCurrentTask(null);
    } else {
      setTaskCompleted(false);
    }
  }, [tasksCompleted?.length, selectedTask?.id.value]);
  useEffect(() => {
    updateTaskFromIndex(index || 0);
    setIsHome(false);
  }, []);
  useEffect(() => {
    setIndexSelectedTask(index);
  }, [index]);
  return /* @__PURE__ */ _jsxDEV("div", {
    id: "bb-handle",
    className: clsx(containerClasses, {
      [styles.dragging]: dragging
    }),
    children: [/* @__PURE__ */ _jsxDEV("svg", {
      className: styles.handle,
      width: "8",
      height: "14",
      viewBox: "0 0 8 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ _jsxDEV("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1 0.75C0.447715 0.75 0 1.19772 0 1.75V2.25C0 2.80228 0.447715 3.25 1 3.25H1.5C2.05228 3.25 2.5 2.80228 2.5 2.25V1.75C2.5 1.19772 2.05228 0.75 1.5 0.75H1ZM1 5.75C0.447715 5.75 0 6.19772 0 6.75V7.25C0 7.80228 0.447715 8.25 1 8.25H1.5C2.05228 8.25 2.5 7.80228 2.5 7.25V6.75C2.5 6.19772 2.05228 5.75 1.5 5.75H1ZM0 11.75C0 11.1977 0.447715 10.75 1 10.75H1.5C2.05228 10.75 2.5 11.1977 2.5 11.75V12.25C2.5 12.8023 2.05228 13.25 1.5 13.25H1C0.447715 13.25 0 12.8023 0 12.25V11.75ZM6 0.75C5.44772 0.75 5 1.19772 5 1.75V2.25C5 2.80228 5.44772 3.25 6 3.25H6.5C7.05228 3.25 7.5 2.80228 7.5 2.25V1.75C7.5 1.19772 7.05228 0.75 6.5 0.75H6ZM5 6.75C5 6.19772 5.44772 5.75 6 5.75H6.5C7.05228 5.75 7.5 6.19772 7.5 6.75V7.25C7.5 7.80228 7.05228 8.25 6.5 8.25H6C5.44772 8.25 5 7.80228 5 7.25V6.75ZM6 10.75C5.44772 10.75 5 11.1977 5 11.75V12.25C5 12.8023 5.44772 13.25 6 13.25H6.5C7.05228 13.25 7.5 12.8023 7.5 12.25V11.75C7.5 11.1977 7.05228 10.75 6.5 10.75H6Z",
        fill: "#9ACFFF"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 191,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.leftContainer,
      children: areAllTasksCompleted ? /* @__PURE__ */ _jsxDEV("div", {
        className: styles.text,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "white",
          weight: "heavy",
          children: /* @__PURE__ */ _jsxDEV(Trans, {
            i18nKey: "extension.navigationBar",
            coponents: [/* @__PURE__ */ _jsxDEV("span", {
              role: "img",
              "aria-label": "rocket-emoji"
            }, "0", false, {
              fileName: _jsxFileName,
              lineNumber: 204,
              columnNumber: 29
            }, void 0)]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 202,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 201,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 200,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.chevrons,
          children: [/* @__PURE__ */ _jsxDEV(IconButton, {
            className: styles.navigatorButton,
            size: 16,
            color: "white",
            name: "chevronFirst",
            onClick: firstTask,
            disabled: isFirst
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 211,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
            className: styles.navigatorButton,
            size: 16,
            color: "white",
            name: "chevronLeft",
            onClick: previousTask,
            disabled: isFirst
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 219,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 210,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.textPaginator,
          children: !isLoading ? /* @__PURE__ */ _jsxDEV(Text, {
            size: "s",
            inline: true,
            color: "white",
            weight: "heavy",
            children: `${indexSelectedTask + 1}/${tasks?.length}`
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 230,
            columnNumber: 17
          }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
            className: styles.spinnerContainer,
            children: /* @__PURE__ */ _jsxDEV(Spinner, {
              color: "white",
              size: 16,
              name: "loadingCircle"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 235,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 234,
            columnNumber: 17
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 228,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.chevrons,
          children: [/* @__PURE__ */ _jsxDEV(IconButton, {
            className: styles.navigatorButton,
            size: 16,
            color: "white",
            name: "chevronRight",
            onClick: nextTask,
            disabled: isLast,
            dataTest: "button-next-task"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 240,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
            className: styles.navigatorButton,
            size: 16,
            color: "white",
            name: "chevronLast",
            onClick: lastTask,
            disabled: isLast
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 249,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 239,
          columnNumber: 13
        }, void 0)]
      }, void 0, true)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 198,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.rightContainer,
      children: [!areAllTasksCompleted ? /* @__PURE__ */ _jsxDEV("div", {
        className: titleClasses,
        children: !isLoading ? /* @__PURE__ */ _jsxDEV("div", {
          className: styles.taskInfo,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "s",
            color: "white",
            weight: "heavy",
            children: taskTitle
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 266,
            columnNumber: 17
          }, void 0), referenceBobject.bobjectName && /* @__PURE__ */ _jsxDEV("div", {
            className: styles.referenceBobjectInfo,
            onClick: () => setContactViewBobjectId(referenceBobject?.bobjectId),
            children: [/* @__PURE__ */ _jsxDEV(Text, {
              size: "s",
              color: "white",
              weight: "heavy",
              className: styles.dashSeparator,
              children: [" ", "-"]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 274,
              columnNumber: 21
            }, void 0), /* @__PURE__ */ _jsxDEV(Icon, {
              name: referenceBobject.bobjectIcon,
              color: "white",
              size: 16
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 278,
              columnNumber: 21
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              size: "s",
              color: "white",
              weight: "heavy",
              children: referenceBobject.bobjectName
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 279,
              columnNumber: 21
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 270,
            columnNumber: 19
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 265,
          columnNumber: 15
        }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
          className: styles.spinnerContainer,
          children: /* @__PURE__ */ _jsxDEV(Spinner, {
            color: "white",
            size: 16,
            name: "loadingCircle"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 287,
            columnNumber: 17
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 286,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 263,
        columnNumber: 11
      }, void 0) : null, /* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        variant: "clear",
        color: "white",
        iconRight: "cross",
        onClick: () => setOpenStartTasksNavigation({
          open: false
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 292,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 261,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 182,
    columnNumber: 5
  }, void 0);
};
_s(NavigationBar, "5tDsy7sVZcRJhGn5JyRfbGludiU=", true, function() {
  return [useSessionStorage, useExtensionContext, useFloatingMenuContext, useTasksAllSearch, useTranslation, useDebounceEffect];
});
_c = NavigationBar;
export default NavigationBar;
var _c;
$RefreshReg$(_c, "NavigationBar");
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

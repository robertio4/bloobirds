import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/newTasksView/list/taskTabFeedGroup.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/taskTabFeedGroup.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/taskTabFeedGroup.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, createToast, Icon, Skeleton, Spinner, Text, useHover } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { BobjectTypes, MessagesEvents, MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { isBefore } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import { AnimatePresence, motion } from "/vendor/.vite-deps-framer-motion.js__v--396e37ef.js";
import __vite__cjsImport10_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport10_mixpanelBrowser.__esModule ? __vite__cjsImport10_mixpanelBrowser.default : __vite__cjsImport10_mixpanelBrowser;
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { ConfirmMarkAsDoneModal } from "/src/content/components/extensionLeftBar/components/views/newTasksView/components/confirmMarkAsDoneModal/confirmMarkAsDoneModal.tsx.js";
import { useTaskFeedContext } from "/src/content/components/extensionLeftBar/components/views/newTasksView/hooks/useTasksTab.tsx.js";
import { TaskCard } from "/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/taskCard.tsx.js";
import styles from "/src/content/components/extensionLeftBar/components/views/newTasksView/list/taskTabsList.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const CLUSTER = {
  dailyTasks: {
    apiName: "DAILY_TASKS",
    icon: "calendar"
  },
  scheduledTasks: {
    apiName: "SCHEDULED_TASKS",
    icon: "event"
  },
  reminders: {
    apiName: "REMINDERS",
    icon: "clock"
  },
  overdueTasks: {
    apiName: "OVERDUE_TASKS",
    icon: "calendar"
  }
};
function getIsNow(prevTask, nextTask) {
  if (!prevTask || !nextTask)
    return false;
  else {
    const prevDate = new Date(prevTask.scheduledDatetime);
    const nextDate = new Date(nextTask.scheduledDatetime);
    const now = new Date();
    return prevDate < now && nextDate > now;
  }
}
const StartTasksButton = ({
  cluster,
  clusterItems,
  taskFeedReqBody
}) => {
  _s();
  const {
    setOpenStartTasksNavigation
  } = useExtensionContext();
  return /* @__PURE__ */ _jsxDEV(Button, {
    color: clusterItems !== 0 ? "softBloobirds" : "verySoftPeanut",
    className: styles.startButton,
    size: "small",
    variant: "secondary",
    onClick: (e) => {
      e.stopPropagation();
      mixpanel.track(MIXPANEL_EVENTS.START_TASKS_FROM_TASK_TAB_OTO);
      setOpenStartTasksNavigation({
        open: true,
        stage: "ALL",
        cluster: {
          key: CLUSTER[cluster].apiName,
          body: taskFeedReqBody
        }
      });
    },
    disabled: clusterItems === 0,
    children: /* @__PURE__ */ _jsxDEV(Icon, {
      name: "play",
      size: 14,
      color: "bloobirds"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 80,
    columnNumber: 5
  }, void 0);
};
_s(StartTasksButton, "1364VFcYpWZoLddVhf0XS4q69gI=", false, function() {
  return [useExtensionContext];
});
_c = StartTasksButton;
export function TaskTabFeedGroupTitle({
  cluster
}) {
  _s2();
  const {
    t
  } = useTranslation();
  const icon = CLUSTER[cluster].icon;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.title,
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: icon,
      size: 16,
      color: "softPeanut"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("span", {
      className: styles.titleText,
      children: t("taskFeed." + cluster)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 105,
    columnNumber: 5
  }, this);
}
_s2(TaskTabFeedGroupTitle, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c2 = TaskTabFeedGroupTitle;
function TimeBar() {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._time_marker,
    children: [/* @__PURE__ */ _jsxDEV("span", {
      className: styles._time_marker_bullet
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("span", {
      className: styles._time_marker_line
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 114,
    columnNumber: 5
  }, this);
}
_c3 = TimeBar;
function TaskTabFeedGroup({
  tasks,
  clusterName,
  isLoading,
  parentRef,
  taskFeedReqBody,
  defaultOpen = false
}) {
  _s3();
  const accountId = useExtensionContext()?.useGetSettings()?.account?.id;
  const [clusterHeaderRef, isHovered] = useHover();
  const [isExpanded, setIsExpanded] = useState(defaultOpen);
  const [isCompleting, setIsCompleting] = useState(false);
  const {
    useTaskFeedPaginationState: useTaskFeedPaginationState2,
    useTaskFeedFilterValues: useTaskFeedFilterValues2
  } = useTaskFeedContext();
  const {
    filterValues
  } = useTaskFeedFilterValues2();
  const {
    pagination,
    setPagination
  } = useTaskFeedPaginationState2();
  const {
    t
  } = useTranslation();
  const [isConfirmMarkAsDoneOpen, setIsConfirmMarkAsDoneOpen] = useState(false);
  const listClass = clsx(styles.list, {
    [styles.collapsed]: !isExpanded
  });
  const isOverdue = clusterName === "overdueTasks";
  const taskCardClass = clsx(styles.taskCard, {
    [styles.overdue]: isOverdue,
    [styles.isExpanded]: isExpanded
  });
  const hideTaskCardClass = clsx(styles.hiddenTaskCard, {
    [styles.overdue]: isOverdue
  });
  const [headerTask, ...bodyTasks] = tasks.tasks || [];
  const noTasks = tasks?.tasks?.length === 0;
  function increasePagination() {
    setPagination({
      ...pagination,
      [clusterName]: {
        ...pagination[clusterName],
        size: pagination[clusterName].size + 10
      }
    });
  }
  function closeAndScroll() {
    parentRef.current.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setIsExpanded(false);
  }
  const hasTimelineBar = ["reminders", "scheduledTasks"].includes(clusterName);
  function markClusterAsDone(cluster, accountId2) {
    setIsCompleting(true);
    api.patch(`/bobjects/${accountId2}/task/cluster/${cluster}/markAsDone`, {
      filters: Object.values(filterValues)
    }).then(() => {
      setIsCompleting(false);
      window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: {
          type: BobjectTypes.Task
        }
      }));
      createToast({
        message: t("taskFeed.clusterMarkedAsDone"),
        type: "success"
      });
    });
  }
  useEffect(() => {
    if (defaultOpen && !isExpanded) {
      setIsExpanded(true);
    }
  }, [defaultOpen]);
  return /* @__PURE__ */ _jsxDEV("div", {
    ref: clusterHeaderRef,
    className: clsx(styles.taskGroup, {
      [styles.hoverStyle]: !noTasks
    }),
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.header,
      onClick: () => {
        if (tasks.totalElements > 1)
          isExpanded ? setIsExpanded(false) : setIsExpanded(true);
      },
      children: [/* @__PURE__ */ _jsxDEV(TaskTabFeedGroupTitle, {
        cluster: clusterName
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 206,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        style: {
          display: "flex",
          gap: "4px",
          alignItems: "center"
        },
        children: [isHovered && !noTasks && /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles._mark_as_done,
            onClick: (e) => {
              e.stopPropagation();
              setIsConfirmMarkAsDoneOpen(true);
            },
            children: !isCompleting ? /* @__PURE__ */ _jsxDEV(_Fragment, {
              children: [/* @__PURE__ */ _jsxDEV(Icon, {
                name: "checkDouble",
                size: 16,
                color: "bloobirds"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 219,
                columnNumber: 21
              }, this), /* @__PURE__ */ _jsxDEV(Text, {
                color: "bloobirds",
                size: "xs",
                weight: "medium",
                className: styles._mark_as_done_text,
                children: t("taskFeed.markClusterDone")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 220,
                columnNumber: 21
              }, this)]
            }, void 0, true) : /* @__PURE__ */ _jsxDEV(Spinner, {
              name: "loadingCircle",
              size: 16,
              color: "bloobirds"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 230,
              columnNumber: 19
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 210,
            columnNumber: 15
          }, this), /* @__PURE__ */ _jsxDEV(StartTasksButton, {
            cluster: clusterName,
            clusterItems: tasks.totalElements,
            taskFeedReqBody
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 233,
            columnNumber: 15
          }, this)]
        }, void 0, true), !noTasks && /* @__PURE__ */ _jsxDEV("div", {
          className: styles.counter,
          children: tasks.totalElements
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 240,
          columnNumber: 24
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 207,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 200,
      columnNumber: 7
    }, this), headerTask ? /* @__PURE__ */ _jsxDEV("div", {
      className: listClass,
      id: "card-list",
      children: [/* @__PURE__ */ _jsxDEV(TaskCard, {
        task: headerTask,
        className: taskCardClass,
        backgroundTask: !isExpanded && bodyTasks[0]
      }, headerTask.id, false, {
        fileName: _jsxFileName,
        lineNumber: 245,
        columnNumber: 11
      }, this), /* @__PURE__ */ _jsxDEV(AnimatePresence, {
        children: !isExpanded ? bodyTasks.map((task, index) => {
          if (index < 3) {
            return /* @__PURE__ */ _jsxDEV("div", {
              className: hideTaskCardClass,
              style: {
                zIndex: `${9 - index}`
              }
            }, task.id, false, {
              fileName: _jsxFileName,
              lineNumber: 256,
              columnNumber: 21
            }, this);
          } else {
            return null;
          }
        }) : /* @__PURE__ */ _jsxDEV(motion.section, {
          initial: "collapsed",
          animate: "open",
          exit: "collapsed",
          variants: {
            open: {
              opacity: 1,
              height: "auto",
              width: "100%",
              transition: {
                staggerChildren: 0.5
              }
            },
            collapsed: {
              opacity: 0,
              height: 0,
              width: "100%",
              transition: {
                when: "beforeChildren"
              }
            }
          },
          transition: {
            duration: 0.5,
            ease: [0.04, 0.62, 0.23, 0.98]
          },
          children: [bodyTasks.map((task, index) => {
            if (task && task.scheduledDatetime) {
              return /* @__PURE__ */ _jsxDEV(_Fragment, {
                children: [hasTimelineBar && getIsNow(tasks?.tasks[index], task) && /* @__PURE__ */ _jsxDEV(TimeBar, {}, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 296,
                  columnNumber: 83
                }, this), /* @__PURE__ */ _jsxDEV(TaskCard, {
                  task,
                  className: taskCardClass
                }, task.id, false, {
                  fileName: _jsxFileName,
                  lineNumber: 297,
                  columnNumber: 25
                }, this), hasTimelineBar && index === bodyTasks.length - 1 && isBefore(new Date(task.scheduledDatetime), new Date()) && /* @__PURE__ */ _jsxDEV(TimeBar, {}, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 304,
                  columnNumber: 85
                }, this)]
              }, void 0, true);
            }
            return null;
          }), isLoading && /* @__PURE__ */ _jsxDEV("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            },
            children: Array.from({
              length: 3
            }).map((_, index) => /* @__PURE__ */ _jsxDEV(Skeleton, {
              height: "80px",
              width: "100%",
              variant: "rect"
            }, "skeleton" + index, false, {
              fileName: _jsxFileName,
              lineNumber: 313,
              columnNumber: 23
            }, this))
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 311,
            columnNumber: 19
          }, this)]
        }, "content", true, {
          fileName: _jsxFileName,
          lineNumber: 267,
          columnNumber: 15
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 251,
        columnNumber: 11
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 244,
      columnNumber: 9
    }, this) : /* @__PURE__ */ _jsxDEV("div", {
      className: styles.emptyState,
      children: [/* @__PURE__ */ _jsxDEV("h1", {
        children: t("taskFeed.noTasks")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 328,
        columnNumber: 11
      }, this), /* @__PURE__ */ _jsxDEV("h2", {
        children: t("taskFeed.noTasksHint")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 329,
        columnNumber: 11
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 327,
      columnNumber: 9
    }, this), !noTasks && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.footer,
      children: isExpanded ? /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV(Button, {
          variant: "clear",
          size: "small",
          iconLeft: "arrowDown",
          uppercase: false,
          disabled: (tasks.page + 1) * tasks.size >= tasks.totalElements,
          onClick: increasePagination,
          className: styles._load_tasks_button,
          children: t("taskFeed.loadMoreTasks")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 336,
          columnNumber: 15
        }, this), /* @__PURE__ */ _jsxDEV(Button, {
          variant: "clear",
          size: "small",
          iconLeft: "arrowUp",
          uppercase: false,
          onClick: closeAndScroll,
          className: styles._load_tasks_button,
          children: t("taskFeed.closeTasks")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 347,
          columnNumber: 15
        }, this)]
      }, void 0, true) : /* @__PURE__ */ _jsxDEV(Button, {
        variant: "clear",
        size: "small",
        iconLeft: "arrowDown",
        disabled: tasks.totalElements < 2,
        uppercase: false,
        onClick: () => setIsExpanded(true),
        className: styles._load_tasks_button,
        children: t("taskFeed.loadMoreTasks")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 359,
        columnNumber: 13
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 333,
      columnNumber: 9
    }, this), isConfirmMarkAsDoneOpen && /* @__PURE__ */ _jsxDEV(ConfirmMarkAsDoneModal, {
      onClose: () => setIsConfirmMarkAsDoneOpen(false),
      onSave: () => {
        markClusterAsDone(clusterName, accountId);
        setIsConfirmMarkAsDoneOpen(false);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 374,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 196,
    columnNumber: 5
  }, this);
}
_s3(TaskTabFeedGroup, "YlOpQTBpvzH7q8kcmtVojEL+8w0=", false, function() {
  return [useExtensionContext, useHover, useTaskFeedContext, useTaskFeedFilterValues, useTaskFeedPaginationState, useTranslation];
});
_c4 = TaskTabFeedGroup;
export default TaskTabFeedGroup;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "StartTasksButton");
$RefreshReg$(_c2, "TaskTabFeedGroupTitle");
$RefreshReg$(_c3, "TimeBar");
$RefreshReg$(_c4, "TaskTabFeedGroup");
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

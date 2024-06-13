import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/clusteredTaskFeed/components/taskList/taskTabFeedGroup.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/clusteredTaskFeed/components/taskList/taskTabFeedGroup.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/clusteredTaskFeed/components/taskList/taskTabFeedGroup.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Fragment = __vite__cjsImport2_react["Fragment"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { RescheduleModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { Button, createToast, Icon, Skeleton, Spinner, Text, useHover } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { BobjectTypes, MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { isBefore } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import { AnimatePresence, motion } from "/vendor/.vite-deps-framer-motion.js__v--396e37ef.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { ConfirmMarkAsDoneModal } from "/src/content/components/extensionLeftBar/components/views/newTasksView/components/confirmMarkAsDoneModal/confirmMarkAsDoneModal.tsx.js";
import { useTaskFeedContext } from "/src/content/components/contactView/components/clusteredTaskFeed/utils/useTasksTab.tsx.js";
import { TaskCard } from "/src/content/components/contactView/components/clusteredTaskFeed/components/taskCard/taskCard.tsx.js";
import styles from "/src/content/components/contactView/components/clusteredTaskFeed/components/taskList/taskTabsList.module.css.js";
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
  },
  completedTasks: {
    apiName: "COMPLETED_TASKS",
    icon: "checkDouble"
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
export function TaskTabFeedGroupTitle({
  cluster
}) {
  _s();
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
      lineNumber: 79,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("span", {
      className: styles.titleText,
      children: t("taskFeed." + cluster)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 78,
    columnNumber: 5
  }, this);
}
_s(TaskTabFeedGroupTitle, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = TaskTabFeedGroupTitle;
function TimeBar() {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._time_marker,
    children: [/* @__PURE__ */ _jsxDEV("span", {
      className: styles._time_marker_bullet
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("span", {
      className: styles._time_marker_line
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 87,
    columnNumber: 5
  }, this);
}
_c2 = TimeBar;
function TaskTabFeedGroup({
  tasks,
  clusterName,
  isLoading,
  parentRef,
  defaultOpen = false
}) {
  _s2();
  const {
    useGetSettings: useGetSettings2
  } = useExtensionContext() || {};
  const accountId = useGetSettings2()?.account?.id;
  const [clusterHeaderRef, isHovered] = useHover();
  const [isExpanded, setIsExpanded] = useState(defaultOpen);
  const [isCompleting, setIsCompleting] = useState(false);
  const {
    useTaskFeedPaginationState: useTaskFeedPaginationState2,
    useTaskFeedFilterValues: useTaskFeedFilterValues2,
    useGetModalInfo: useGetModalInfo2,
    setOpenedModalInfo
  } = useTaskFeedContext();
  const openedModalInfo = useGetModalInfo2();
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
  const isCompleted = clusterName === "completedTasks";
  const taskCardClass = clsx(styles.taskCard, {
    [styles.completed]: isCompleted,
    [styles.overdue]: isOverdue,
    [styles.isExpanded]: isExpanded
  });
  const hideTaskCardClass = clsx(styles.hiddenTaskCard, {
    [styles.completed]: isCompleted,
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
        lineNumber: 188,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        style: {
          display: "flex",
          gap: "4px",
          alignItems: "center"
        },
        children: [isHovered && !noTasks && /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles._mark_as_done,
            onClick: (e) => {
              e.stopPropagation();
              setIsConfirmMarkAsDoneOpen(true);
            },
            children: !isCompleted && (!isCompleting ? /* @__PURE__ */ _jsxDEV(_Fragment, {
              children: [/* @__PURE__ */ _jsxDEV(Icon, {
                name: "checkDouble",
                size: 16,
                color: "bloobirds"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 202,
                columnNumber: 23
              }, this), /* @__PURE__ */ _jsxDEV(Text, {
                color: "bloobirds",
                size: "xs",
                weight: "medium",
                className: styles._mark_as_done_text,
                children: t("taskFeed.markClusterDone")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 203,
                columnNumber: 23
              }, this)]
            }, void 0, true) : /* @__PURE__ */ _jsxDEV(Spinner, {
              name: "loadingCircle",
              size: 16,
              color: "bloobirds"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 213,
              columnNumber: 21
            }, this))
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 192,
            columnNumber: 15
          }, this)
        }, void 0, false), !noTasks && /* @__PURE__ */ _jsxDEV("div", {
          className: styles.counter,
          children: tasks.totalElements
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 218,
          columnNumber: 24
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 189,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 7
    }, this), headerTask ? /* @__PURE__ */ _jsxDEV("div", {
      className: listClass,
      id: "card-list",
      children: [/* @__PURE__ */ _jsxDEV(TaskCard, {
        task: headerTask,
        className: taskCardClass,
        backgroundTask: !isExpanded && bodyTasks[0],
        showButtons: !isCompleted
      }, headerTask.id, false, {
        fileName: _jsxFileName,
        lineNumber: 223,
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
              lineNumber: 235,
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
              return /* @__PURE__ */ _jsxDEV(Fragment, {
                children: [hasTimelineBar && getIsNow(tasks?.tasks[index], task) && /* @__PURE__ */ _jsxDEV(TimeBar, {}, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 275,
                  columnNumber: 83
                }, this), /* @__PURE__ */ _jsxDEV(TaskCard, {
                  task,
                  className: taskCardClass,
                  showButtons: !isCompleted
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 276,
                  columnNumber: 25
                }, this), hasTimelineBar && index === bodyTasks.length - 1 && isBefore(new Date(task.scheduledDatetime), new Date()) && /* @__PURE__ */ _jsxDEV(TimeBar, {}, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 283,
                  columnNumber: 85
                }, this)]
              }, task?.id, true, {
                fileName: _jsxFileName,
                lineNumber: 274,
                columnNumber: 23
              }, this);
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
              lineNumber: 292,
              columnNumber: 23
            }, this))
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 290,
            columnNumber: 19
          }, this)]
        }, "content", true, {
          fileName: _jsxFileName,
          lineNumber: 246,
          columnNumber: 15
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 230,
        columnNumber: 11
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 222,
      columnNumber: 9
    }, this) : /* @__PURE__ */ _jsxDEV("div", {
      className: styles.emptyState,
      children: [/* @__PURE__ */ _jsxDEV("h1", {
        children: t("taskFeed.noTasks")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 307,
        columnNumber: 11
      }, this), /* @__PURE__ */ _jsxDEV("h2", {
        children: t("taskFeed.noTasksHint")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 308,
        columnNumber: 11
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 306,
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
          lineNumber: 315,
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
          lineNumber: 326,
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
        lineNumber: 338,
        columnNumber: 13
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 312,
      columnNumber: 9
    }, this), isConfirmMarkAsDoneOpen && /* @__PURE__ */ _jsxDEV(ConfirmMarkAsDoneModal, {
      onClose: () => setIsConfirmMarkAsDoneOpen(false),
      onSave: () => {
        markClusterAsDone(clusterName, accountId);
        setIsConfirmMarkAsDoneOpen(false);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 353,
      columnNumber: 9
    }, this), openedModalInfo?.type === "reschedule" && /* @__PURE__ */ _jsxDEV(RescheduleModal, {
      bobject: openedModalInfo.bobject,
      onClose: () => setOpenedModalInfo(null),
      onSave: () => window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: {
          type: BobjectTypes.Task
        }
      }))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 362,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 178,
    columnNumber: 5
  }, this);
}
_s2(TaskTabFeedGroup, "VnvpqXbbfBERZrzF+cWDwC7JrtU=", false, function() {
  return [useExtensionContext, useGetSettings, useHover, useTaskFeedContext, useGetModalInfo, useTaskFeedFilterValues, useTaskFeedPaginationState, useTranslation];
});
_c3 = TaskTabFeedGroup;
export default TaskTabFeedGroup;
var _c, _c2, _c3;
$RefreshReg$(_c, "TaskTabFeedGroupTitle");
$RefreshReg$(_c2, "TimeBar");
$RefreshReg$(_c3, "TaskTabFeedGroup");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/taskHomePageCard/taskHomePageCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/taskHomePageCard/taskHomePageCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/taskHomePageCard/taskHomePageCard.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { AssigneeComponent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { Button, Card, CardBody, CardContent, CardHeader, CardRight, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { checkIsOverdue, useCustomTasks, useMinimizableModals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, MessagesEvents, TASK_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getTaskText } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { getFieldByLogicRole, getTextFromLogicRole } from "/src/utils/bobjects.utils.ts.js";
import { TASK_STATUS_VALUE_LOGIC_ROLE } from "/src/utils/task.ts.js";
import { PriorityLabel } from "/src/content/components/card/fieldTypeComponent.tsx.js";
import { ScheduledDateTime } from "/src/content/components/contactView/components/miniCard/components/cardDates.tsx.js";
import styles from "/src/content/components/contactView/components/miniCard/miniCard.module.css.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { TaskIconDisplay } from "/src/content/components/taskIconDisplay/taskIconDisplay.tsx.js";
import style from "/src/content/components/taskHomePageCard/taskHomePageCard.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TaskHomePageCard = () => {
  _s();
  const {
    setCurrentTask,
    useGetCurrentTask,
    useGetSidePeekEnabled
  } = useExtensionContext();
  const {
    customTasks
  } = useCustomTasks();
  const {
    t
  } = useTranslation();
  const isSidePeekEnabled = useGetSidePeekEnabled();
  const task = useGetCurrentTask();
  const taskTitle = getTaskText(task, "Title", customTasks, true, t);
  const taskDescription = getTaskText(task, "Description", customTasks, true, t);
  const scheduledDatetime = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const assignee = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  const taskPriority = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const isOverdue = checkIsOverdue(task);
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
  const handleEdit = () => {
    openMinimizableModal({
      type: "task",
      data: {
        [task?.id.typeName.toLowerCase()]: task,
        location: "bubble",
        bobjectId: task?.id?.value,
        company,
        lead,
        opportunity
      }
    });
  };
  const handleMarkAsDone = () => {
    api.patch(`/bobjects/${task?.id.value}/raw`, {
      contents: {
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: checkIsOverdue(task) ? TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE : TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED
      },
      params: {
        skipEmptyUpdates: true
      }
    }).then(() => {
      window.dispatchEvent(new CustomEvent(MessagesEvents.TaskCompleted, {
        detail: {
          id: task?.id?.value
        }
      }));
      window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: {
          type: BobjectTypes.Task
        }
      }));
      setCurrentTask(void 0);
    });
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: style.cardWrapper,
    children: /* @__PURE__ */ _jsxDEV(Card, {
      borderColor: "seagreen",
      expand: true,
      children: [/* @__PURE__ */ _jsxDEV(CardHeader, {
        children: /* @__PURE__ */ _jsxDEV(CardBody, {
          children: [/* @__PURE__ */ _jsxDEV(TaskIconDisplay, {
            bobject: task,
            size: isSidePeekEnabled ? 20 : 18
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 95,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            weight: "bold",
            className: styles.taskTitle,
            children: taskTitle
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 96,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles.rightSide,
            children: [/* @__PURE__ */ _jsxDEV(ScheduledDateTime, {
              isOverdue,
              scheduledDateTime: scheduledDatetime,
              isCadence: false
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 100,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(PriorityLabel, {
              priority: taskPriority,
              showOnlyImportant: true,
              onlyFlag: true
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 105,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 99,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 94,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(CardContent, {
        children: /* @__PURE__ */ _jsxDEV(Text, {
          className: styles.verticalEllipsis,
          color: "peanut",
          size: "xs",
          children: taskDescription
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 110,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 109,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(CardContent, {
        children: /* @__PURE__ */ _jsxDEV(CardRight, {
          children: /* @__PURE__ */ _jsxDEV(AssigneeComponent, {
            value: assignee
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 116,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 115,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(CardBody, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: style.buttonsWrapper,
          children: [/* @__PURE__ */ _jsxDEV(Button, {
            expand: true,
            inline: true,
            size: "small",
            variant: "secondary",
            iconLeft: isSidePeekEnabled ? "edit" : void 0,
            onClick: handleEdit,
            uppercase: false,
            className: style.cardButton,
            children: t("extension.card.editTaskButton")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 121,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
            expand: true,
            inline: true,
            size: "small",
            iconLeft: isSidePeekEnabled ? "check" : void 0,
            onClick: handleMarkAsDone,
            uppercase: false,
            className: style.cardButton,
            children: t("extension.card.markAsDone")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 133,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 120,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 119,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 91,
    columnNumber: 5
  }, void 0);
};
_s(TaskHomePageCard, "vg3J0LoECe6CqI1xW+mJfpXA8dM=", true, function() {
  return [useExtensionContext, useCustomTasks, useTranslation, useMinimizableModals];
});
_c = TaskHomePageCard;
export default TaskHomePageCard;
var _c;
$RefreshReg$(_c, "TaskHomePageCard");
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

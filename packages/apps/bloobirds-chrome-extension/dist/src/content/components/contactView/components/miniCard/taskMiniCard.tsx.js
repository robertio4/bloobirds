import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/miniCard/taskMiniCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/miniCard/taskMiniCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/miniCard/taskMiniCard.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { AssigneeComponent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { Card, CardBody, CardContent, CardHeader, CardHoverButtons, CardRight, Text, Tooltip, useHover } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useIsNoStatusPlanAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { FIELDS_LOGIC_ROLE, TASK_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { convertHtmlToString, getFieldByLogicRole, getReferencedBobject, getTaskReferenceBobject, getTaskText, getTextFromLogicRole, getValueFromLogicRole, isCadenceTask, isEmailTask, isScheduledTask, isSkippableTask } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { MiniSkipTaskButton } from "/src/content/components/card/component/miniSkipTaskButton.tsx.js";
import { CadenceName, PriorityLabel } from "/src/content/components/card/fieldTypeComponent.tsx.js";
import { TaskIconDisplay } from "/src/content/components/taskIconDisplay/taskIconDisplay.tsx.js";
import { MiniCardTaskButtons } from "/src/content/components/contactView/components/miniCard/cardButtons/miniCardTaskButtons.tsx.js";
import { BobjectName } from "/src/content/components/contactView/components/miniCard/components/bobjectName.tsx.js";
import { ScheduledDateTime } from "/src/content/components/contactView/components/miniCard/components/cardDates.tsx.js";
import styles from "/src/content/components/contactView/components/miniCard/miniCard.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TaskMiniCard = ({
  task,
  isOverdue,
  hasNextCard,
  sidePeekEnabled,
  isTaskFeed,
  updateIndexOnSave,
  minimized,
  customTasks,
  logCustomActivity
}) => {
  _s();
  const [ref, isHovering] = useHover();
  const {
    t
  } = useTranslation();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [markAsDoneClicked, setMarkAsDoneClicked] = useState(false);
  const buttonsExtraProps = {
    isLoading,
    setIsLoading,
    markAsDoneClicked,
    setMarkAsDoneClicked
  };
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
  const referencedBobject = getReferencedBobject(task);
  const scheduledDatetime = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const priorityBobjectValue = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const assignee = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  const isCadence = isCadenceTask(task);
  const isSkippable = isSkippableTask(task);
  const isScheduled = isScheduledTask(task);
  const stage = getTextFromLogicRole(referencedBobject, FIELDS_LOGIC_ROLE[referencedBobject?.id?.typeName]["STAGE"]);
  const containerClasses = clsx(styles.container, {
    [styles.containerTaskFeed]: isTaskFeed,
    [styles.containerSidePeek]: sidePeekEnabled,
    [styles.borderGreen]: stage === "Prospecting",
    [styles.borderGray]: stage === "Sales" || !!opportunity,
    [styles.border]: isNoStatusPlanAccount,
    [styles.borderRed]: isOverdue,
    [styles.containerMinimized]: minimized
  });
  const cardButtonsClasses = clsx(styles.cardButtons, {
    [styles.cardButtonsSidePeekMinimized]: sidePeekEnabled && minimized,
    [styles.cardButtonsSidePeek]: sidePeekEnabled,
    [styles.cardButtonsBubble]: !sidePeekEnabled
  });
  const isSidePeekInTaskFeed = sidePeekEnabled && isTaskFeed;
  const customTaskId = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const customTask = customTasks?.find((ct) => ct.id === customTaskId?.value);
  const title = getTaskText(task, "Title", customTasks, !isScheduled, t);
  const description = getTaskText(task, "Description", customTasks, !isScheduled, t);
  const hasTemplate = !!getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TEMPLATE);
  let cadenceName = null;
  if (isCadence) {
    const relatedBobject = getTaskReferenceBobject(task);
    cadenceName = getTextFromLogicRole(relatedBobject, FIELDS_LOGIC_ROLE[relatedBobject?.id?.typeName]?.CADENCE);
  }
  useEffect(() => {
    setMarkAsDoneClicked(false);
  }, [task?.id?.objectId]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: containerClasses,
    ref,
    children: [/* @__PURE__ */ _jsxDEV(Card, {
      size: "small",
      expand: true,
      children: [/* @__PURE__ */ _jsxDEV(CardHeader, {
        children: [/* @__PURE__ */ _jsxDEV(CardBody, {
          children: [/* @__PURE__ */ _jsxDEV(TaskIconDisplay, {
            bobject: task,
            size: sidePeekEnabled ? 20 : 18
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 141,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            className: clsx(styles.taskTitle, {
              [styles.taskTitleGrown]: isSidePeekInTaskFeed && !(isEmailTask(task) && hasTemplate) && !isCadence,
              [styles.taskTitleEllipsis]: !isSidePeekInTaskFeed
            }),
            size: "xs",
            weight: "medium",
            children: title
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 142,
            columnNumber: 13
          }, void 0), isCadence && /* @__PURE__ */ _jsxDEV(CadenceName, {
            cadenceName
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 153,
            columnNumber: 27
          }, void 0), isEmailTask(task) && hasTemplate && /* @__PURE__ */ _jsxDEV("div", {
            className: styles.label,
            children: "Template suggested"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 155,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles.rightSide,
            children: priorityBobjectValue && /* @__PURE__ */ _jsxDEV("div", {
              className: styles.priorityLabelWrapper,
              children: /* @__PURE__ */ _jsxDEV(PriorityLabel, {
                priority: priorityBobjectValue,
                showOnlyImportant: true,
                onlyFlag: !sidePeekEnabled
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 160,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 159,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 157,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 140,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: cardButtonsClasses,
          children: /* @__PURE__ */ _jsxDEV(CardHoverButtons, {
            size: "small",
            customBackgroundColor: "white",
            children: [isHovering && isSkippable && /* @__PURE__ */ _jsxDEV(MiniSkipTaskButton, {
              task
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 171,
              columnNumber: 45
            }, void 0), (isHovering || markAsDoneClicked) && /* @__PURE__ */ _jsxDEV(MiniCardTaskButtons, {
              task,
              updateIndexOnSave,
              customTask,
              logCustomActivity,
              ...buttonsExtraProps
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 173,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 170,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 169,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 139,
        columnNumber: 9
      }, void 0), !minimized ? /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV(CardContent, {
          children: [description ? /* @__PURE__ */ _jsxDEV(Tooltip, {
            title: description?.length > 540 && !isTaskFeed && description,
            position: "top",
            children: /* @__PURE__ */ _jsxDEV(Text, {
              className: clsx({
                [styles.verticalEllipsis]: !isTaskFeed
              }),
              color: "peanut",
              size: "xs",
              children: convertHtmlToString(description)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 192,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 188,
            columnNumber: 17
          }, void 0) : /* @__PURE__ */ _jsxDEV(BobjectName, {
            bobject: opportunity || lead,
            style: {
              marginLeft: "0px"
            },
            isBold: true
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 201,
            columnNumber: 17
          }, void 0), !description && /* @__PURE__ */ _jsxDEV(CardRight, {
            children: /* @__PURE__ */ _jsxDEV("div", {
              className: styles.bottomLeftContainer,
              children: [/* @__PURE__ */ _jsxDEV(ScheduledDateTime, {
                isOverdue,
                scheduledDateTime: scheduledDatetime,
                isCadence
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 206,
                columnNumber: 21
              }, void 0), /* @__PURE__ */ _jsxDEV(AssigneeComponent, {
                value: assignee
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 211,
                columnNumber: 21
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 205,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 204,
            columnNumber: 17
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 186,
          columnNumber: 13
        }, void 0), description ? /* @__PURE__ */ _jsxDEV(CardContent, {
          children: [/* @__PURE__ */ _jsxDEV(BobjectName, {
            bobject: opportunity || lead,
            style: {
              marginLeft: "0px"
            },
            isBold: true
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 218,
            columnNumber: 17
          }, void 0), /* @__PURE__ */ _jsxDEV(CardRight, {
            children: /* @__PURE__ */ _jsxDEV("div", {
              className: styles.bottomLeftContainer,
              children: [/* @__PURE__ */ _jsxDEV(ScheduledDateTime, {
                isOverdue,
                scheduledDateTime: scheduledDatetime,
                isCadence
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 225,
                columnNumber: 21
              }, void 0), /* @__PURE__ */ _jsxDEV(AssigneeComponent, {
                value: assignee
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 230,
                columnNumber: 21
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 224,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 223,
            columnNumber: 17
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 217,
          columnNumber: 15
        }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)]
      }, void 0, true) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 7
    }, void 0), hasNextCard && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._dashed_line
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 23
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 137,
    columnNumber: 5
  }, void 0);
};
_s(TaskMiniCard, "STPpf7ZnEOwMwe8fLEzVJOet3Fo=", false, function() {
  return [useHover, useTranslation, useIsNoStatusPlanAccount];
});
_c = TaskMiniCard;
var _c;
$RefreshReg$(_c, "TaskMiniCard");
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

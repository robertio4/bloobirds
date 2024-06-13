import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/miniCard/cardButtons/miniCardTaskButtons.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/miniCard/cardButtons/miniCardTaskButtons.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/miniCard/cardButtons/miniCardTaskButtons.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, Spinner, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserId, useMinimizableModals, checkIsOverdue, useActivities } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, COMPANY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, MessagesEvents, MIXPANEL_EVENTS, TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE, TASK_TYPE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getReferencedBobject, isCadenceTask, isMeetingTypeTask, isScheduledTask } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useWizardContext, WIZARD_MODALS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-wizardModalContext-dist-index.js.js";
import __vite__cjsImport8_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport8_mixpanelBrowser.__esModule ? __vite__cjsImport8_mixpanelBrowser.default : __vite__cjsImport8_mixpanelBrowser;
import { useSWRConfig } from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { getFieldByLogicRole, getTextFromLogicRole, getValueFromLogicRole } from "/src/utils/bobjects.utils.ts.js";
import { getButtonMarkAsDone } from "/src/utils/tasks.utils.ts.js";
import { PriorityTaskButton } from "/src/content/components/card/component/priorityTaskButton.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import styles from "/src/content/components/contactView/components/miniCard/miniCard.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export function MiniCardTaskButtons({
  task,
  isLoading,
  setIsLoading,
  markAsDoneClicked,
  setMarkAsDoneClicked,
  updateIndexOnSave,
  customTask,
  logCustomActivity
}) {
  _s();
  const {
    cache: swrCache
  } = useSWRConfig();
  const {
    useGetActiveBobject,
    useGetActiveBobjectContext,
    useGetSettings
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const {
    leads
  } = useGetActiveBobjectContext() || {};
  const settings = useGetSettings();
  const hasAutoLogCustomActivity = settings?.user?.autoLogCustomActivity;
  const {
    logActivityFromTask
  } = useActivities();
  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
  const referencedBobject = getReferencedBobject(task);
  const type = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
  const taskStatus = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const isEditable = type === TASK_TYPE.NEXT_STEP;
  const isCallAction = isEditable && getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL) === "Yes";
  const companyLastAttemptDate = getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY);
  const lastAttemptDate = lead ? getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY) : null;
  const scheduledDate = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const scheduledDateTime = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const automated = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED)?.valueLogicRole;
  const buttonData = getButtonMarkAsDone({
    taskType: type,
    taskStatus,
    bobjectLastAttemptDate: lastAttemptDate || companyLastAttemptDate,
    taskDateField: scheduledDate || scheduledDateTime,
    taskIsAutomated: automated
  });
  const {
    actionsDisabled
  } = useContactViewContext();
  const assignedTo = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.value;
  const activeUserId = useActiveUserId();
  const assignedToActiveUser = assignedTo === activeUserId;
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extension.card"
  });
  const {
    t: bobjectT
  } = useTranslation("translation", {
    keyPrefix: "bobjectTypes"
  });
  const {
    openWizard,
    resetWizardProperties
  } = useWizardContext();
  function handleClose() {
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  const handleMarkAsDone = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);
    api.patch(`/bobjects/${task?.id?.value}/raw`, {
      contents: {
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: checkIsOverdue(task) ? TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE : TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED
      },
      params: {
        skipEmptyUpdates: true
      }
    }).then(() => {
      updateIndexOnSave?.();
      mixpanel.track(MIXPANEL_EVENTS.COMPLETE_TASK_FROM_CONTACT_VIEW_OTO);
      if (hasAutoLogCustomActivity && customTask) {
        logCustomActivity({
          customTask,
          selectedBobject: referencedBobject,
          leads,
          onSubmit: () => {
          }
        });
      }
      if (isCallAction) {
        logActivityFromTask({
          taskId: task?.id?.value,
          callback: (activity, mainBobject) => {
            openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activity, {
              referenceBobject: mainBobject,
              handleClose
            });
            window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
              detail: {
                type: BobjectTypes.Activity
              }
            }));
          }
        });
      }
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
      if (activeBobject?.id.typeName === BobjectTypes.Lead && company || activeBobject?.id.typeName === BobjectTypes.Company && lead) {
        const bobjectToClear = activeBobject?.id.typeName === BobjectTypes.Lead ? company : lead;
        swrCache.delete(`/tasksFeed/${bobjectToClear?.id?.value}/1`);
      }
      setIsLoading(false);
    });
  };
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const openTaskModal = (event) => {
    event.preventDefault();
    event.stopPropagation();
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
  const isScheduled = isScheduledTask(task);
  const isMeeting = isMeetingTypeTask(task);
  const isCadence = isCadenceTask(task);
  if (isScheduled || isMeeting || isCadence) {
    return /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(PriorityTaskButton, {
        bobject: task
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 202,
        columnNumber: 9
      }, this), isEditable && /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: t("editTaskButton"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Button, {
          dataTest: styles.iconButton,
          size: "small",
          variant: "secondary",
          onClick: openTaskModal,
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            size: 12,
            color: "bloobirds",
            name: "edit"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 212,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 206,
          columnNumber: 13
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 205,
        columnNumber: 11
      }, this), /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: actionsDisabled && !assignedToActiveUser ? t("noPermissions", {
          bobject: bobjectT("task")
        }) : buttonData?.tooltip,
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Button, {
          dataTest: styles.iconButton,
          size: "small",
          color: markAsDoneClicked ? "verySoftMelon" : void 0,
          onClick: (event) => {
            setMarkAsDoneClicked(true);
            handleMarkAsDone(event);
          },
          disabled: actionsDisabled && !assignedToActiveUser,
          ...isCadence ? {
            disabled: buttonData.disabled || actionsDisabled && !assignedToActiveUser
          } : {},
          children: isLoading ? /* @__PURE__ */ _jsxDEV("div", {
            children: /* @__PURE__ */ _jsxDEV(Spinner, {
              name: "loadingCircle",
              size: 8,
              color: "melon"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 239,
              columnNumber: 17
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 238,
            columnNumber: 15
          }, this) : /* @__PURE__ */ _jsxDEV(Icon, {
            size: 12,
            color: markAsDoneClicked ? "melon" : "white",
            name: "check"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 242,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 224,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 216,
        columnNumber: 9
      }, this)]
    }, void 0, true);
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
}
_s(MiniCardTaskButtons, "BsNEhpyS3KLgV7rcpRo6MPyj0dM=", true, function() {
  return [useSWRConfig, useExtensionContext, useActivities, useContactViewContext, useActiveUserId, useTranslation, useTranslation, useWizardContext, useMinimizableModals];
});
_c = MiniCardTaskButtons;
var _c;
$RefreshReg$(_c, "MiniCardTaskButtons");
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

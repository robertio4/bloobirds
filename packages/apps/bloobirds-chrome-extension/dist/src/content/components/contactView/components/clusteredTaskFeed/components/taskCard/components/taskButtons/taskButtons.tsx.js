import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/clusteredTaskFeed/components/taskCard/components/taskButtons/taskButtons.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/clusteredTaskFeed/components/taskCard/components/taskButtons/taskButtons.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/clusteredTaskFeed/components/taskCard/components/taskButtons/taskButtons.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CardButton, createToast, Spinner, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActivities, useCustomTasks, useQuickLogActivity, useUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, MessagesEvents, MIXPANEL_EVENTS, TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE, TASK_TYPE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, forgeIdFieldsFromIdValue, getReferencedBobject, getUserTimeZone, isBeforeToday, isSalesforcePage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useWizardContext, WIZARD_MODALS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-wizardModalContext-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport10_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport10_mixpanelBrowser.__esModule ? __vite__cjsImport10_mixpanelBrowser.default : __vite__cjsImport10_mixpanelBrowser;
import normalizeUrl from "/vendor/.vite-deps-normalize-url.js__v--91e5723a.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import { EditTaskButton } from "/src/content/components/contactView/components/clusteredTaskFeed/components/taskCard/components/taskButtons/components/editTaskButton.tsx.js";
import { RescheduleTaskButton } from "/src/content/components/contactView/components/clusteredTaskFeed/components/taskCard/components/taskButtons/components/rescheduleButton.tsx.js";
import { SkipTaskButton } from "/src/content/components/contactView/components/clusteredTaskFeed/components/taskCard/components/taskButtons/components/skipTaskButton.tsx.js";
import styles from "/src/content/components/contactView/components/clusteredTaskFeed/components/taskCard/components/taskButtons/taskButtons.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
var ButtonStatus = /* @__PURE__ */ ((ButtonStatus2) => {
  ButtonStatus2["Idle"] = "idle";
  ButtonStatus2["Processing"] = "processing";
  ButtonStatus2["Completed"] = "completed";
  return ButtonStatus2;
})(ButtonStatus || {});
export const TaskButtons = ({
  task,
  setBanished,
  setIsProcessing
}) => {
  _s();
  const [buttonStatus, setButtonStatus] = useState("idle" /* Idle */);
  const settings = useUserSettings();
  const {
    logCustomActivity
  } = useQuickLogActivity();
  const hasAutoLogCustomActivity = settings?.user?.autoLogCustomActivity;
  const {
    t
  } = useTranslation();
  const {
    logActivityFromTask
  } = useActivities();
  const {
    openWizard,
    resetWizardProperties
  } = useWizardContext();
  function handleClose() {
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  const referencedBobject = getReferencedBobject(task);
  const type = task.type;
  const opportunity = task.opportunity;
  const lead = task.lead;
  const isOverdue = isBeforeToday(spacetime(task.scheduledDatetime), getUserTimeZone());
  const url = normalizeUrl(window.location.href);
  const isSalesforce = isSalesforcePage(url);
  const canEditTask = type === TASK_TYPE.NEXT_STEP;
  const isSkippable = task.skippable;
  const isCallAction = canEditTask && task.actionCall;
  const salesforceCrmId = task?.crmIds?.crmName === "SALESFORCE" ? task?.crmIds?.crmId : null;
  const company = task.company;
  const buttonData = {
    disabled: !(task.canBeMarkedAsDone || task.skippable),
    tooltip: ""
  };
  const {
    customTasks
  } = useCustomTasks();
  const customTaskId = task?.customTaskId;
  const customTask = customTasks?.find((ct) => ct.id === customTaskId);
  function handleHideAndComplete() {
    setButtonStatus("completed" /* Completed */);
    createToast({
      type: "success",
      message: t("tasks.toasts.completedSuccess")
    });
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: {
          type: BobjectTypes.Task
        }
      }));
      setBanished();
      setIsProcessing(false);
    }, 400);
  }
  const handleMarkAsDone = (event, id) => {
    event?.preventDefault();
    event?.stopPropagation();
    setButtonStatus("processing" /* Processing */);
    setIsProcessing(true);
    api.patch(`/bobjects/${id}/raw`, {
      contents: {
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED
      },
      params: {
        skipEmptyUpdates: true
      }
    }).then(() => {
      if (hasAutoLogCustomActivity && customTask) {
        logCustomActivity({
          customTask,
          selectedBobject: referencedBobject,
          leads: [],
          company,
          companyId: company?.id.value
        });
      }
      if (isCallAction) {
        logActivityFromTask({
          taskId: task?.id,
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
      handleHideAndComplete();
    });
  };
  const salesforceUrl = salesforceCrmId ? `/${salesforceCrmId}` : null;
  const getInfoSalesforceUrl = (t2) => {
    let text = "";
    if (!salesforceUrl) {
      if (lead) {
        text = t2("extension.card.noSalesforceIdLead");
      } else if (opportunity) {
        text = t2("extension.card.noSalesforceIdOpportunity");
      } else if (company) {
        text = t2("extension.card.noSalesforceIdCompany");
      }
    }
    return text;
  };
  const infoSalesforceUrl = getInfoSalesforceUrl(t);
  const handleGoToSalesforce = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    if (salesforceUrl) {
      window.location.href = salesforceUrl;
    }
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      position: "absolute",
      paddingRight: "16px"
    },
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.cardButtons,
      children: [canEditTask && /* @__PURE__ */ _jsxDEV(EditTaskButton, {
        task
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 186,
        columnNumber: 25
      }, void 0), isSalesforce && (company || lead || opportunity) && /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: salesforceUrl ? t("extension.card.navigateSalesforceTooltip") : infoSalesforceUrl,
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(CardButton, {
          dataTest: "home-GoToSalesforce",
          iconLeft: "salesforceOutlined",
          onClick: (event) => {
            handleGoToSalesforce(event);
          },
          size: "small",
          variant: "secondary",
          disabled: !salesforceUrl
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 194,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 188,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(RescheduleTaskButton, {
        task
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 207,
        columnNumber: 9
      }, void 0), isSkippable && /* @__PURE__ */ _jsxDEV(
        SkipTaskButton,
        {
          task: {
            id: forgeIdFieldsFromIdValue(task?.id)
          },
          onBanish: () => setBanished()
        },
        void 0,
        false,
        {
          fileName: _jsxFileName,
          lineNumber: 209,
          columnNumber: 11
        },
        void 0
      ), /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: buttonData?.tooltip,
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(CardButton, {
          dataTest: "home-MarkAsDone",
          iconLeft: buttonStatus === "idle" /* Idle */ ? "check" : void 0,
          variant: buttonData.disabled ? "secondary" : "primary",
          color: buttonData.disabled ? "verySoftPeanut" : "bloobirds",
          className: clsx(styles._mark_as_done, {
            [styles._mark_as_done_clicked]: buttonStatus === "completed" /* Completed */
          }),
          onClick: (event) => {
            mixpanel.track(MIXPANEL_EVENTS.HOME_MARK_AS_DONE_ACTION_CLICKED_ON_SINGLE_CARD);
            handleMarkAsDone(event, task?.id);
          },
          disabled: buttonData.disabled,
          size: "small",
          children: buttonStatus === "processing" /* Processing */ && /* @__PURE__ */ _jsxDEV("div", {
            children: /* @__PURE__ */ _jsxDEV(Spinner, {
              name: "loadingCircle",
              size: 10,
              color: "melon"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 233,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 232,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 216,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 215,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 175,
    columnNumber: 5
  }, void 0);
};
_s(TaskButtons, "zMom7mYUzcdhssLYZWkI4VGlwo4=", false, function() {
  return [useUserSettings, useQuickLogActivity, useTranslation, useActivities, useWizardContext, useCustomTasks];
});
_c = TaskButtons;
var _c;
$RefreshReg$(_c, "TaskButtons");
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

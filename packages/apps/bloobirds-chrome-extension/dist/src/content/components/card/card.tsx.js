import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/card/card.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/card.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/card.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { AssignCadenceDropdown } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-index.tsx.js";
import { Card, CardButton, CardCheckbox, CardContent, CardHeader, CardHoverButtons, CardLeft, Spinner, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useIsB2CAccount, useIsNoStatusPlanAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, COMPANY_FIELDS_LOGIC_ROLE, FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, MessagesEvents, SalesforceTabs, TASK_FIELDS_LOGIC_ROLE, TASK_TYPE, UserPermission } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getFieldByLogicRole, getReferencedBobject, getTaskText, getTextFromLogicRole, getValueFromLogicRole, isCadenceTask, isSkippableTask } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useWizardContext, WIZARD_MODALS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-wizardModalContext-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport11_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport11_mixpanelBrowser.__esModule ? __vite__cjsImport11_mixpanelBrowser.default : __vite__cjsImport11_mixpanelBrowser;
import normalizeUrl from "/vendor/.vite-deps-normalize-url.js__v--91e5723a.js";
import { MIXPANEL_EVENTS } from "/src/utils/mixpanel.ts.js";
import { TASK_STATUS_VALUE_LOGIC_ROLE } from "/src/utils/task.ts.js";
import { getButtonMarkAsDone } from "/src/utils/tasks.utils.ts.js";
import { getSalesforceUrl, isLinkedinOrSalesNav, isSalesforcePage } from "/src/utils/url.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { checkIsOverdue } from "/src/content/components/extensionLeftBar/extensionLeftBar.utils.tsx.js";
import { useExtensionLeftBarContext } from "/src/content/components/extensionLeftBar/extensionLeftBarContext.tsx.js";
import styles from "/src/content/components/card/card.module.css.js";
import CustomCardBody from "/src/content/components/card/cardBody.tsx.js";
import { EditTaskButton } from "/src/content/components/card/component/editTaskButton.tsx.js";
import { LinkedinNavigationButton } from "/src/content/components/card/component/linkedinNavigationButton.tsx.js";
import { MiniSkipTaskButton } from "/src/content/components/card/component/miniSkipTaskButton.tsx.js";
import { PriorityTaskButton } from "/src/content/components/card/component/priorityTaskButton.tsx.js";
import { RescheduleTaskButton } from "/src/content/components/card/component/rescheduleTaskButton.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CustomCard = ({
  bobject,
  fieldsArray,
  mutate,
  tabName,
  showNew,
  isSelectable,
  customTasks,
  logCustomActivity
}) => {
  _s();
  const [hasBeenCompleted, setHasBeenCompleted] = useState(false);
  const [persistentButtonClicked, setPersistentButtonClicked] = useState(false);
  const [displayTooltips, setDisplayTooltips] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {
    setActiveBobject,
    setContactViewBobjectId,
    closeExtendedScreen,
    setCurrentTask,
    setTaskId,
    useGetSettings
  } = useExtensionContext();
  const {
    collapseLeftBar
  } = useExtensionLeftBarContext();
  const {
    setOpenedModalInfo,
    selectedItems,
    selectOneItem,
    useEveryBobject: {
      isActive
    },
    tabBobject
  } = useSubhomeContext();
  const settings = useGetSettings();
  const hasAutoLogCustomActivity = settings?.user?.autoLogCustomActivity;
  const hasAutoCloseLeftBar = settings?.user?.autoCloseLeftBar;
  const {
    openWizard
  } = useWizardContext();
  const {
    t
  } = useTranslation();
  const isB2CAccount = useIsB2CAccount();
  const referencedBobject = getReferencedBobject(bobject);
  const type = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
  const status = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const opportunity = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
  const lead = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const automated = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED)?.valueLogicRole;
  const taskStatus = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const leadLastAttemptDate = lead ? getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY) : null;
  const isHome = tabName === SalesforceTabs.HOME;
  const isInactive = tabName === SalesforceTabs.INACTIVE;
  const isPipeline = tabName === SalesforceTabs.PIPELINE;
  const isTasksTab = tabName === SalesforceTabs.TASKS;
  const isNurturing = tabName === SalesforceTabs.NURTURING;
  const canRescheduleTasks = isTasksTab || isNurturing || isHome;
  const url = normalizeUrl(window.location.href);
  const isSalesforce = isSalesforcePage(url);
  const isLinkedIn = isLinkedinOrSalesNav(url);
  const canEditTask = isTasksTab && type === TASK_TYPE.NEXT_STEP;
  const isTask = type in TASK_TYPE;
  const isOverdue = checkIsOverdue(bobject);
  const isCadence = isTask && isCadenceTask(bobject);
  const isSkippable = isTask && isSkippableTask(bobject);
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const company = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const companyLastAttemptDate = getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY);
  const scheduledDate = isTask && getTextFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const scheduledDateTime = isTask && getTextFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const bobjectType = bobject?.id?.typeName;
  const isCompleted = [TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED, TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE].includes(status);
  const isChecked = selectedItems?.some((item) => item?.id?.objectId === bobject?.id?.objectId) || isActive;
  const buttonData = getButtonMarkAsDone({
    taskType: type,
    taskStatus,
    bobjectLastAttemptDate: leadLastAttemptDate || companyLastAttemptDate,
    taskDateField: scheduledDate || scheduledDateTime,
    taskIsAutomated: automated
  });
  const customTaskId = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const customTask = customTasks?.find((ct) => ct.id === customTaskId?.value);
  function handleHideAndComplete() {
    setIsLoading(false);
    setTimeout(() => {
      setHasBeenCompleted(true);
      mutate();
    }, 750);
  }
  function handleSaveInactiveModal() {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
      detail: {
        type: tabBobject
      }
    }));
  }
  const handleMarkAsDone = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);
    api.patch(`/bobjects/${id}/raw`, {
      contents: {
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED
      },
      params: {
        skipEmptyUpdates: true
      }
    }).then(() => {
      if (hasAutoLogCustomActivity && customTask && customTask.shouldCreateActivity) {
        logCustomActivity({
          customTask,
          selectedBobject: referencedBobject,
          leads: [],
          company
        });
      }
      handleHideAndComplete();
    });
  };
  const salesforceUrl = getSalesforceUrl(bobject, lead, company, opportunity);
  const getInfoSalesforceUrl = (t2) => {
    let text = "";
    if (!salesforceUrl) {
      if (lead || bobjectType === BobjectTypes.Lead) {
        text = t2("extension.card.noSalesforceIdLead");
      } else if (opportunity || bobjectType === BobjectTypes.Opportunity) {
        text = t2("extension.card.noSalesforceIdOpportunity");
      } else if (company || bobjectType === BobjectTypes.Company) {
        text = t2("extension.card.noSalesforceIdCompany");
      }
    }
    return text;
  };
  const infoSalesforceUrl = getInfoSalesforceUrl(t);
  const handleGoToSalesforce = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (salesforceUrl) {
      window.location.href = salesforceUrl;
      if (hasAutoCloseLeftBar)
        collapseLeftBar();
    }
  };
  const stage = getTextFromLogicRole(referencedBobject, FIELDS_LOGIC_ROLE[referencedBobject?.id?.typeName]["STAGE"]);
  const onCardClick = () => {
    const bobjectType2 = bobject?.id?.typeName;
    const bobjectId = bobject?.id?.value;
    if ([BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity].includes(bobjectType2)) {
      setContactViewBobjectId(bobjectId);
    } else if (!company && !lead && !opportunity) {
      setActiveBobject(null);
      setContactViewBobjectId(null);
      setCurrentTask(bobject);
      setTaskId(bobjectId);
    } else if (bobjectType2 === "Task") {
      const leadId = lead?.id?.value;
      const companyId = company?.id?.value;
      const opportunityId = opportunity?.id?.value;
      const b2bOrder = companyId || opportunityId;
      const b2cOrder = opportunityId || companyId;
      setContactViewBobjectId(leadId || isB2CAccount ? b2cOrder : b2bOrder);
      setCurrentTask(bobject);
      setTaskId(bobjectId);
    } else {
      setContactViewBobjectId(referencedBobject?.id?.value);
    }
    closeExtendedScreen();
  };
  const taskDescription = customTasks && getTaskText(bobject, "Description", customTasks, isCadence, t);
  const hasBobject = isTask && (!!company || !!lead || !!opportunity);
  const taskHeaderFieldsArray = [TASK_FIELDS_LOGIC_ROLE.TITLE, TASK_FIELDS_LOGIC_ROLE.PRIORITY];
  const taskFirstLineFieldsArray = [...!taskDescription ? [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY, TASK_FIELDS_LOGIC_ROLE.LEAD, ...!isB2CAccount ? [TASK_FIELDS_LOGIC_ROLE.COMPANY] : [], TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO] : [], ...[TASK_FIELDS_LOGIC_ROLE.DESCRIPTION]];
  const taskSecondLineFieldsArray = [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY, TASK_FIELDS_LOGIC_ROLE.LEAD, ...!isB2CAccount ? [TASK_FIELDS_LOGIC_ROLE.COMPANY] : [], TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO];
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.container, {
      [styles.borderGreen]: stage === "Prospecting",
      [styles.borderGray]: stage === "Sales" || !!opportunity,
      [styles.border]: isNoStatusPlanAccount,
      [styles.borderRed]: isOverdue,
      [styles.isCompleted]: hasBeenCompleted && !bobject?.taskDate?.isLastOfDay,
      [styles.withBody]: isTask
    }),
    children: /* @__PURE__ */ _jsxDEV(Card, {
      size: "small",
      expand: true,
      completed: isCompleted,
      onClick: onCardClick,
      children: [/* @__PURE__ */ _jsxDEV(CardHeader, {
        forceButtonVisibility: persistentButtonClicked,
        children: [/* @__PURE__ */ _jsxDEV(_Fragment, {
          children: isSelectable && /* @__PURE__ */ _jsxDEV(CardLeft, {
            children: /* @__PURE__ */ _jsxDEV(CardCheckbox, {
              checked: isChecked,
              onClick: (value, event) => {
                event.preventDefault();
                event.stopPropagation();
                selectOneItem({
                  ...bobject
                });
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 322,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 321,
            columnNumber: 15
          }, void 0)
        }, void 0, false), /* @__PURE__ */ _jsxDEV(CustomCardBody, {
          bobject,
          fieldsArray: isTask ? taskHeaderFieldsArray : fieldsArray
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 333,
          columnNumber: 11
        }, void 0), showNew ? /* @__PURE__ */ _jsxDEV("span", {
          className: styles.cardNewTag,
          children: t("common.new")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 337,
          columnNumber: 22
        }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false), /* @__PURE__ */ _jsxDEV(CardHoverButtons, {
          size: "small",
          children: !isChecked && /* @__PURE__ */ _jsxDEV("div", {
            className: styles.cardButtons,
            children: [canEditTask && /* @__PURE__ */ _jsxDEV(EditTaskButton, {
              bobject
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 341,
              columnNumber: 33
            }, void 0), isSalesforce && (company || lead || opportunity || [BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity].includes(bobjectType)) && /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: salesforceUrl ? t("extension.card.navigateSalesforceTooltip") : infoSalesforceUrl,
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(CardButton, {
                dataTest: "home-GoToSalesforce",
                iconLeft: "salesforceOutlined",
                onClick: (event) => {
                  mixpanel.track(MIXPANEL_EVENTS.HOME_MARK_AS_DONE_ACTION_CLICKED_ON_SINGLE_CARD);
                  handleGoToSalesforce(event);
                },
                size: "small",
                variant: "secondary",
                disabled: !salesforceUrl
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 357,
                columnNumber: 23
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 349,
              columnNumber: 21
            }, void 0), isLinkedIn && (company || lead) && /* @__PURE__ */ _jsxDEV(LinkedinNavigationButton, {
              bobject
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 372,
              columnNumber: 53
            }, void 0), bobjectType === BobjectTypes.Task && /* @__PURE__ */ _jsxDEV(PriorityTaskButton, {
              bobject
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 373,
              columnNumber: 55
            }, void 0), canRescheduleTasks && /* @__PURE__ */ _jsxDEV(RescheduleTaskButton, {
              bobject
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 375,
              columnNumber: 19
            }, void 0), isSkippable && /* @__PURE__ */ _jsxDEV(MiniSkipTaskButton, {
              task: bobject
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 377,
              columnNumber: 33
            }, void 0), bobjectType === BobjectTypes.Task ? /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: buttonData?.tooltip,
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(CardButton, {
                dataTest: "home-MarkAsDone",
                iconLeft: isLoading ? void 0 : "check",
                variant: buttonData.disabled ? "secondary" : "primary",
                color: buttonData.disabled ? "verySoftPeanut" : "bloobirds",
                className: clsx(styles._mark_as_done, {
                  [styles._mark_as_done_clicked]: persistentButtonClicked
                }),
                onClick: (event) => {
                  setPersistentButtonClicked(true);
                  mixpanel.track(MIXPANEL_EVENTS.HOME_MARK_AS_DONE_ACTION_CLICKED_ON_SINGLE_CARD);
                  handleMarkAsDone(event, bobject?.id.value);
                },
                disabled: buttonData.disabled,
                size: "small",
                children: isLoading && /* @__PURE__ */ _jsxDEV("div", {
                  children: /* @__PURE__ */ _jsxDEV(Spinner, {
                    name: "loadingCircle",
                    size: 10,
                    color: "melon"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 400,
                    columnNumber: 27
                  }, void 0)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 399,
                  columnNumber: 25
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 380,
                columnNumber: 21
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 379,
              columnNumber: 19
            }, void 0) : isInactive ? /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: t("extension.card.nextStep"),
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(CardButton, {
                dataTest: "Subhome-NextStep",
                iconLeft: "rewind",
                onClick: (event) => {
                  mixpanel.track(MIXPANEL_EVENTS[`NEXT_STEP_ACTION_CLICKED_ON_EXTENSION_INACTIVE_TAB`]);
                  event.preventDefault();
                  event.stopPropagation();
                  openWizard(WIZARD_MODALS.NEXT_STEP, bobject, {
                    onSaveCallback: handleSaveInactiveModal
                  });
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 407,
                columnNumber: 21
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 406,
              columnNumber: 19
            }, void 0) : isPipeline && /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: displayTooltips && t("common.setCadence"),
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(AssignDropdownWrapper, {
                bobject,
                onClick: (event) => {
                  mixpanel.track(MIXPANEL_EVENTS[`START_CADENCE_ACTION_CLICKED_ON_EXTENSION_INACTIVE_TAB`]);
                  event?.preventDefault();
                  event?.stopPropagation();
                  setOpenedModalInfo({
                    openedModal: "cadence",
                    bobject
                  });
                },
                onRenderDropdown: () => {
                  setPersistentButtonClicked(true);
                  setDisplayTooltips(false);
                },
                onUnmountDropdown: () => setPersistentButtonClicked(false),
                children: /* @__PURE__ */ _jsxDEV(CardButton, {
                  dataTest: "Subhome-StartCadence",
                  iconLeft: "calendar"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 446,
                  columnNumber: 25
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 425,
                columnNumber: 23
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 424,
              columnNumber: 21
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 340,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 338,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 318,
        columnNumber: 9
      }, void 0), isTask && (taskDescription || hasBobject) ? /* @__PURE__ */ _jsxDEV(CardContent, {
        children: /* @__PURE__ */ _jsxDEV(CustomCardBody, {
          bobject,
          fieldsArray: taskFirstLineFieldsArray,
          isBody: true
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 457,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 456,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false), taskDescription ? /* @__PURE__ */ _jsxDEV(CardContent, {
        children: /* @__PURE__ */ _jsxDEV(CustomCardBody, {
          bobject,
          fieldsArray: taskSecondLineFieldsArray,
          isBody: true
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 468,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 467,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 311,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 300,
    columnNumber: 5
  }, void 0);
};
_s(CustomCard, "q5aFtnDfGUH1VvtM8gD1sKD2hko=", true, function() {
  return [useExtensionContext, useExtensionLeftBarContext, useSubhomeContext, useWizardContext, useTranslation, useIsB2CAccount, useIsNoStatusPlanAccount];
});
_c = CustomCard;
const AssignDropdownWrapper = ({
  onClick,
  onRenderDropdown,
  onUnmountDropdown,
  bobject,
  children
}) => {
  _s2();
  const {
    useGetSettings,
    useGetActiveBobjectContext
  } = useExtensionContext();
  const settings = useGetSettings();
  const contactBobjects = useGetActiveBobjectContext();
  const hasPermissions = settings?.user?.accountAdmin && settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  return /* @__PURE__ */ _jsxDEV(AssignCadenceDropdown, {
    activeUserId: settings?.user.id,
    contactBobjects,
    callback: onClick,
    activeBobject: bobject,
    actionsDisabled: false,
    hasPermissions,
    onRenderDropdown,
    onUnmountDropdown,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 503,
    columnNumber: 5
  }, void 0);
};
_s2(AssignDropdownWrapper, "OwUReV9cQhfQF9WAN2yjmL38S18=", true, function() {
  return [useExtensionContext];
});
_c2 = AssignDropdownWrapper;
var _c, _c2;
$RefreshReg$(_c, "CustomCard");
$RefreshReg$(_c2, "AssignDropdownWrapper");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/outboxView/card/outboxCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/outboxView/card/outboxCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/outboxView/card/outboxCard.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useCallback = __vite__cjsImport2_react["useCallback"]; const useRef = __vite__cjsImport2_react["useRef"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Card, CardBody, CardButton, CardHeader, CardHoverButtons, CardRight, Icon, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useBaseSetEmailVariablesValues, useIsB2CAccount, useMessagingTemplates, useMinimizableModals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, FIELDS_LOGIC_ROLE, MessagesEvents, TASK_AUTOMATED_ERROR_LOGIC_ROLE, TASK_AUTOMATED_STATUS_LOGIC_ROLE, TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE, TASK_TYPE, TEMPLATE_TYPES } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, generateBobjectBasedData, getFieldByLogicRole, getTextFromLogicRole, getValueFromLogicRole, ModalType, replaceVariables } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport9_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport9_mixpanelBrowser.__esModule ? __vite__cjsImport9_mixpanelBrowser.default : __vite__cjsImport9_mixpanelBrowser;
import { getReferencedBobject } from "/src/utils/bobjects.utils.ts.js";
import { formatDateAsText } from "/src/utils/dates.ts.js";
import { MIXPANEL_EVENTS } from "/src/utils/mixpanel.ts.js";
import { CurrentLocalTime, NameComponent } from "/src/content/components/card/fieldTypeComponent.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { AUTOMATION_ERRORS_MESSAGE, AUTOMATION_PAUSED_REASON_MESSAGE, AUTOMATION_RESCHEDULED_MESSAGE, BOBJECT_HIGH_PRIORITY_LOGIC_ROLE, NAME_OR_REFERENCE_FIELDS, SCHEDULED_EMAIL_STATUS_INFO, VARIANT_STYLES } from "/src/content/components/extensionLeftBar/components/views/outboxView/outbox.constants.ts.js";
import styles from "/src/content/components/extensionLeftBar/components/views/outboxView/card/outboxCard.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const OutboxCard = ({
  bobject
}) => {
  _s();
  const {
    t
  } = useTranslation();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const {
    messagingTemplates
  } = useMessagingTemplates({
    type: TEMPLATE_TYPES.EMAIL,
    name: null,
    size: 200,
    page: 0,
    visibility: null,
    onlyMine: false,
    segmentationValues: {}
  });
  const {
    useGetSettings,
    setContactViewBobjectId
  } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const titleRef = useRef();
  const isB2CAccount = useIsB2CAccount();
  const {
    setOpenedModalInfo
  } = useSubhomeContext();
  const referencedBobjectData = useCallback(() => generateBobjectBasedData(bobject, null, null, isB2CAccount), [bobject]);
  const subhomeItemFields = referencedBobjectData();
  const taskHasMultipleReferences = subhomeItemFields?.fields?.filter((field) => field?.value && [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY, TASK_FIELDS_LOGIC_ROLE.COMPANY, TASK_FIELDS_LOGIC_ROLE.LEAD].includes(field?.logicRole))?.length > 1;
  const status = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const template = getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TEMPLATE);
  const templateName = messagingTemplates?.find((t2) => t2?.id === template)?.name;
  const date = getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const company = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
  const emailData = getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.EMAIL_METADATA);
  const taskTitle = getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TITLE);
  const isAutomatedEmail = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole === TASK_TYPE.PROSPECT_CADENCE;
  const automationPausedReason = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.AUTOMATION_PAUSE_REASON)?.valueLogicRole;
  const scheduledDatetime = getTextFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const automatedStatus = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS)?.valueLogicRole;
  const automationError = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.AUTOMATION_ERROR)?.valueLogicRole;
  const isAutomatedStatusFailed = automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED;
  const referenceBobject = getReferencedBobject(bobject);
  const referenceBobjectType = referenceBobject?.id?.typeName;
  const referenceBobjectHighPriority = getFieldByLogicRole(referenceBobject, FIELDS_LOGIC_ROLE[referenceBobjectType]?.HIGH_PRIORITY)?.valueLogicRole;
  const isHightPriority = referenceBobjectHighPriority === BOBJECT_HIGH_PRIORITY_LOGIC_ROLE[referenceBobjectType]?.YES;
  const isCompleted = [TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED, TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE].includes(status);
  const isPending = [TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING, TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED].includes(automatedStatus);
  const bobjectEmailStatusInfo = SCHEDULED_EMAIL_STATUS_INFO[automatedStatus];
  const variant = bobjectEmailStatusInfo?.cardVariant;
  const variantStyles = variant ? VARIANT_STYLES[variant] : {
    backgroundColor: void 0,
    borderColor: void 0
  };
  const fetchLeadsByCompany = useCallback(async () => {
    const {
      data
    } = await api.post(`/bobjects/${accountId}/Lead/search`, {
      query: {
        LEAD__COMPANY: [company?.id.objectId]
      },
      formFields: true,
      pageSize: 50,
      injectReferences: true
    });
    return data;
  }, [company]);
  const getTooltipMessage = () => {
    if (automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED) {
      if (automationError === TASK_AUTOMATED_ERROR_LOGIC_ROLE.VARIABLE_NOT_RESOLVED) {
        return replaceVariables(AUTOMATION_ERRORS_MESSAGE[automationError], {
          BOBJECT: referenceBobjectType
        });
      }
      return AUTOMATION_ERRORS_MESSAGE[automationError] || "";
    }
    if (automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED) {
      const text = AUTOMATION_PAUSED_REASON_MESSAGE[automationPausedReason];
      return text ? replaceVariables(text, {
        DATE: formatDateAsText({
          text: scheduledDatetime,
          patternFormat: "{month-short} {date-ordinal} {time}",
          t
        }),
        OBJECT: referenceBobjectType
      }) : "";
    }
    if (automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED) {
      return replaceVariables(AUTOMATION_RESCHEDULED_MESSAGE, {
        DATE: formatDateAsText({
          text: scheduledDatetime,
          patternFormat: "{month-short} {date-ordinal} {time}",
          t
        })
      });
    }
    return "";
  };
  const onCardClick = () => {
    setContactViewBobjectId(lead?.id?.value || opportunity?.id?.value || company?.id?.value);
  };
  const showTooltip = titleRef?.current?.firstChild?.firstChild?.offsetWidth < titleRef?.current?.firstChild?.firstChild?.scrollWidth;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.container, styles[variant]),
    children: /* @__PURE__ */ _jsxDEV(Card, {
      size: "small",
      expand: true,
      completed: isCompleted,
      backgroundColor: variantStyles?.backgroundColor,
      borderColor: variantStyles?.borderColor,
      onClick: onCardClick,
      children: /* @__PURE__ */ _jsxDEV(CardHeader, {
        children: [/* @__PURE__ */ _jsxDEV(CardBody, {
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles._icon_wrapper,
            children: /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: taskTitle,
              position: "top",
              children: isAutomatedEmail ? /* @__PURE__ */ _jsxDEV(Icon, {
                name: "autoMail",
                color: "tangerine",
                size: 20
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 227,
                columnNumber: 19
              }, void 0) : /* @__PURE__ */ _jsxDEV(Icon, {
                name: "scheduleMail",
                color: "tangerine",
                size: 20
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 229,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 225,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 224,
            columnNumber: 13
          }, void 0), scheduledDatetime && /* @__PURE__ */ _jsxDEV("div", {
            className: styles._datetime,
            children: /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "bloobirds",
              weight: "bold",
              htmlTag: "span",
              children: formatDateAsText({
                text: scheduledDatetime,
                patternFormat: "{time}",
                t
              })
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 235,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 234,
            columnNumber: 15
          }, void 0), isHightPriority && /* @__PURE__ */ _jsxDEV("div", {
            className: styles._high_priority_icon,
            children: /* @__PURE__ */ _jsxDEV(Icon, {
              size: 16,
              name: "zap",
              color: "banana"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 242,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 241,
            columnNumber: 15
          }, void 0), subhomeItemFields?.fields.map(({
            value,
            logicRole
          }, index) => {
            if (value) {
              if (NAME_OR_REFERENCE_FIELDS.includes(logicRole)) {
                return /* @__PURE__ */ _jsxDEV("div", {
                  className: styles.center,
                  children: [taskHasMultipleReferences && logicRole?.includes("__COMPANY") && /* @__PURE__ */ _jsxDEV("div", {
                    className: styles._separator
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 251,
                    columnNumber: 25
                  }, void 0), /* @__PURE__ */ _jsxDEV(NameComponent, {
                    value,
                    bobject: subhomeItemFields?.bobject
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 253,
                    columnNumber: 23
                  }, void 0)]
                }, `Namefield_${logicRole}_${index}`, true, {
                  fileName: _jsxFileName,
                  lineNumber: 249,
                  columnNumber: 21
                }, void 0);
              }
            } else if (logicRole === "CUSTOM_TASK_TIMEZONE") {
              return /* @__PURE__ */ _jsxDEV("div", {
                className: styles.center,
                children: /* @__PURE__ */ _jsxDEV(CurrentLocalTime, {
                  task: bobject
                }, `Timezone_${logicRole}_${index}`, false, {
                  fileName: _jsxFileName,
                  lineNumber: 263,
                  columnNumber: 21
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 262,
                columnNumber: 19
              }, void 0);
            }
            return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
          }), /* @__PURE__ */ _jsxDEV("div", {
            ref: titleRef,
            className: styles._cardTemplateBody,
            children: /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: showTooltip && templateName,
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                className: styles._cardTemplateBody,
                children: templateName
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 271,
                columnNumber: 17
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 270,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 269,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 223,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(CardRight, {
          children: bobjectEmailStatusInfo?.text && /* @__PURE__ */ _jsxDEV("div", {
            className: styles._status,
            children: /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: t("extension.card.empty"),
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(Text, {
                htmlTag: "span",
                size: "xxs",
                color: bobjectEmailStatusInfo?.textColor,
                children: bobjectEmailStatusInfo?.text
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 281,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 280,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 279,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 277,
          columnNumber: 11
        }, void 0), !isCompleted ? /* @__PURE__ */ _jsxDEV(CardHoverButtons, {
          size: "small",
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles.cardButtons,
            children: [!isAutomatedEmail ? /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: t("extension.card.editMail"),
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(CardButton, {
                dataTest: "Scheduled-Edit",
                iconLeft: "edit",
                variant: "secondary",
                onClick: (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  const email = JSON.parse(emailData);
                  fetchLeadsByCompany().then((response) => {
                    const leads = response?.contents;
                    openMinimizableModal({
                      type: "email",
                      title: t("extension.card.empty"),
                      data: {
                        company,
                        lead,
                        mode: email.replyToMessageId ? "REPLY" : "SEND",
                        isBlankEmail: false,
                        leads,
                        activity: null,
                        taskId: bobject?.id?.objectId,
                        isScheduledEmail: true,
                        isFailedAutomation: isAutomatedStatusFailed,
                        scheduledDate: date,
                        savedData: {
                          body: JSON.parse(email.body),
                          subject: JSON.parse(email.subject),
                          templateId: email.templateId,
                          emailFrom: email.emailFrom,
                          to: email.to,
                          cc: email.cc
                        }
                      },
                      onSave: () => {
                        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                          detail: {
                            type: BobjectTypes.Task
                          }
                        }));
                      }
                    });
                  });
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 293,
                columnNumber: 21
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 292,
              columnNumber: 19
            }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {
              children: [template && /* @__PURE__ */ _jsxDEV(Tooltip, {
                title: "Preview",
                position: "top",
                children: /* @__PURE__ */ _jsxDEV(CardButton, {
                  iconLeft: "eye",
                  dataTest: "Automated-Preview",
                  variant: "secondary",
                  onClick: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setEmailVariablesValue({
                      company,
                      lead,
                      opportunity
                    });
                    setOpenedModalInfo({
                      openedModal: ModalType.PREVIEW_EMAIL,
                      bobject,
                      data: {
                        templateId: template
                      }
                    });
                  }
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 343,
                  columnNumber: 25
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 342,
                columnNumber: 23
              }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
                title: t("extension.card.reschedule"),
                position: "top",
                children: /* @__PURE__ */ _jsxDEV(CardButton, {
                  iconLeft: "clock",
                  dataTest: "Automated-Reschedule",
                  variant: "secondary",
                  onClick: (event) => {
                    mixpanel.track(MIXPANEL_EVENTS.OUTBOX_RESCHEDULED_ACTION_CLICKED_ON_AUTOMATED_TAB);
                    event.preventDefault();
                    event.stopPropagation();
                    setOpenedModalInfo({
                      openedModal: ModalType.RESCHEDULE_EMAIL,
                      bobject
                    });
                  }
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 367,
                  columnNumber: 23
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 366,
                columnNumber: 21
              }, void 0)]
            }, void 0, true), /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: `${isPending ? t("extension.card.sendNow") : t("extension.card.retry")}`,
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(CardButton, {
                dataTest: `Scheduled-${isPending ? "SendNow" : "Retry"}`,
                iconLeft: isPending ? "deliver" : "repeat",
                onClick: (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  mixpanel.track(MIXPANEL_EVENTS[`EXTENSION_OUTBOX_${isPending ? "SEND_NOW" : "RETRY"}_ACTION_CLICKED_ON_SCHEDULED_TAB`]);
                  setOpenedModalInfo({
                    openedModal: isPending ? ModalType.SEND_NOW_EMAIL : ModalType.RETRY_EMAIL,
                    bobject
                  });
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 390,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 386,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: t("extension.card.cancel"),
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(CardButton, {
                dataTest: `Cancel-button`,
                iconLeft: "cross",
                color: "tomato",
                onClick: (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  mixpanel.track(MIXPANEL_EVENTS[`EXTENSION_OUTBOX_CANCEL_ACTION_CLICKED_ON_OUTBOX_TAB`]);
                  setOpenedModalInfo({
                    openedModal: ModalType.CANCEL_EMAIL,
                    bobject
                  });
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 411,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 410,
              columnNumber: 17
            }, void 0), bobjectEmailStatusInfo?.text && /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: getTooltipMessage(),
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(Text, {
                htmlTag: "span",
                size: "xxs",
                color: bobjectEmailStatusInfo?.textColor,
                children: bobjectEmailStatusInfo?.text
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 430,
                columnNumber: 21
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 429,
              columnNumber: 19
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 290,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 289,
          columnNumber: 13
        }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 222,
        columnNumber: 9
      }, void 0)
    }, bobject?.id.objectId, false, {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 212,
    columnNumber: 5
  }, void 0);
};
_s(OutboxCard, "IzmpVFcpgY693LLWphdEqZfvVOk=", true, function() {
  return [useTranslation, useBaseSetEmailVariablesValues, useMinimizableModals, useMessagingTemplates, useExtensionContext, useIsB2CAccount, useSubhomeContext];
});
_c = OutboxCard;
var _c;
$RefreshReg$(_c, "OutboxCard");
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

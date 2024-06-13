import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/inboxView/card/emailCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inboxView/card/emailCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inboxView/card/emailCard.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { AttachmentsDropdown } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-activityTimelineItem-dist-index.js.js";
import { AssigneeComponent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { Card, CardBody, CardButton, CardContent, CardHeader, CardLeft, Icon, IconButton, Spinner, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useBaseSetEmailVariablesValues, useCopilotEnabled, useMinimizableModals, useUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ACTIVITY_DIRECTION, ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, BOUNCED_EMAIL_VALUES_LOGIC_ROLE, MessagesEvents, MIXPANEL_EVENTS, REPORTED_VALUES_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, convertHtmlToString, getFieldByLogicRole, getTextFromLogicRole, getValueFromLogicRole, isDifferentYearThanCurrent, isHtml, parseEmailPixels, removeHtmlTags } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { parseISO } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import __vite__cjsImport12_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport12_mixpanelBrowser.__esModule ? __vite__cjsImport12_mixpanelBrowser.default : __vite__cjsImport12_mixpanelBrowser;
import { EMAIL_MODE } from "/src/constants/email.ts.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { formatDateAsText, isToday } from "/src/utils/dates.ts.js";
import { NameComponent } from "/src/content/components/card/fieldTypeComponent.tsx.js";
import CardIcon from "/src/content/components/cardIcon/cardIcon.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { CopilotAnalysisIndicator } from "/src/content/components/extensionLeftBar/components/views/shared/CopilotAnalysisIndicator.tsx.js";
import styles from "/src/content/components/extensionLeftBar/components/views/inboxView/inboxPage.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const EmailCard = ({
  email
}) => {
  _s();
  const {
    t
  } = useTranslation();
  const [hasBeenRead, setHasBeenRead] = useState(false);
  const [readClicked, setReadClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageCollapsed, setMessageCollapsed] = useState(true);
  const direction = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const subject = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT);
  const isBouncedEmail = getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.IS_BOUNCED_EMAIL)?.valueLogicRole === BOUNCED_EMAIL_VALUES_LOGIC_ROLE.YES;
  const activityAttachedFiles = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHED_FILES);
  const activityTime = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const isDifferentYear = isDifferentYearThanCurrent(activityTime);
  const isThisDay = isToday(activityTime);
  const emailHour = formatDateAsText({
    text: parseISO(activityTime),
    patternFormat: isDifferentYear ? "dd MMM, yyyy" : isThisDay ? "{time-24}" : "{date} {month-short}",
    t
  });
  const parsedAttachedFiles = activityAttachedFiles && JSON.parse(activityAttachedFiles);
  const hasAttachedFiles = activityAttachedFiles && parsedAttachedFiles?.filter((att) => !!att)?.length !== 0;
  const {
    setContactViewBobjectId,
    setExtendedContext
  } = useExtensionContext();
  const note = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const titleRef = useRef();
  const activityCompany = getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const activityLead = getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const activityOpportunity = getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
  const title = subject;
  const message = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  const cleanedHtmlString = message?.replace(/<head>[\s\S]*?<\/head>/g, "");
  const isHtmlMessage = message && isHtml(message);
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const threadId = getValueFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_THREAD_ID);
  const isReported = getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)?.valueLogicRole === REPORTED_VALUES_LOGIC_ROLE.YES;
  const leadField = getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const assignee = getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const emailMetadataString = getValueFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_METADATA);
  const emailMetadata = emailMetadataString ? JSON.parse(emailMetadataString) : {};
  const emailToArray = !!emailMetadata && [emailMetadata.from?.[0]?.email].concat(emailMetadata.to?.map((e) => e.email)).filter(Boolean);
  const emailCcArray = !!emailMetadata && emailMetadata.cc?.map((e) => e.email);
  function handleHideAndComplete() {
    setIsLoading(false);
    setTimeout(() => {
      setHasBeenRead(true);
      window.dispatchEvent(new CustomEvent("ACTIVE_BOBJECT_UPDATED", {
        detail: {
          type: BobjectTypes.Activity
        }
      }));
    }, 750);
  }
  const markEmailAsRead = () => {
    setIsLoading(true);
    api.patch(`/bobjects/${email?.id?.value}/raw`, {
      contents: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES
      },
      params: {}
    }).then(handleHideAndComplete);
  };
  const handleOpenEmailModal = async (event, emailTo, emailCc) => {
    event.preventDefault();
    event.stopPropagation();
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_REPLY_FROM_INBOX_OTO);
    setEmailVariablesValue({
      company: activityCompany,
      lead: activityLead,
      opportunity: activityOpportunity
    });
    const templateSubject = getValueFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT, true);
    openMinimizableModal({
      type: "email",
      title: removeHtmlTags(templateSubject),
      data: {
        template: {
          content: "",
          subject: templateSubject
        },
        mode: EMAIL_MODE.REPLY,
        activity: email,
        company: activityCompany,
        lead: activityLead,
        pageBobjectType: activityLead ? BobjectTypes.Lead : BobjectTypes.Company,
        ...emailTo ? {
          defaultToEmail: emailTo
        } : {},
        ...emailCc ? {
          defaultCcEmail: emailCc
        } : {}
      },
      onSave: () => {
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Activity
          }
        }));
      }
    });
  };
  const onCardClick = () => {
    setContactViewBobjectId(activityLead?.id?.value || activityOpportunity?.id?.value || activityCompany?.id?.value);
    setExtendedContext({
      type: ExtendedContextTypes.EMAIL_THREAD,
      threadId,
      bobject: email
    });
  };
  const showTooltip = titleRef?.current?.firstChild?.firstChild?.offsetWidth < titleRef?.current?.firstChild?.firstChild?.scrollWidth;
  const copilotAnalysis = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.COPILOT_ANALYSIS);
  const settings = useUserSettings();
  const isCopilotEnabled = useCopilotEnabled(settings?.account?.id);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.container, {
      [styles.container_max_height]: messageCollapsed,
      [styles.hasBeenRead]: hasBeenRead && !email?.activityDate?.isLastOfDay,
      [styles.container_visible_buttons]: readClicked
    }),
    children: /* @__PURE__ */ _jsxDEV(Card, {
      size: "small",
      expand: true,
      onClick: onCardClick,
      children: [/* @__PURE__ */ _jsxDEV(CardHeader, {
        children: [/* @__PURE__ */ _jsxDEV(CardLeft, {
          children: /* @__PURE__ */ _jsxDEV(CardIcon, {
            size: "xxs",
            name: "mail",
            color: "tangerine",
            direction
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 221,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 220,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(CardBody, {
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles.emailCard_body,
            children: [leadField?.referencedBobject && /* @__PURE__ */ _jsxDEV(NameComponent, {
              value: leadField?.referencedBobject,
              bobject: email,
              shrinkName: false,
              showIcon: false
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 231,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              className: styles.emailCard_cardIcons,
              children: [isCopilotEnabled && copilotAnalysis && /* @__PURE__ */ _jsxDEV(CopilotAnalysisIndicator, {
                size: 12
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 239,
                columnNumber: 57
              }, void 0), isBouncedEmail && /* @__PURE__ */ _jsxDEV(Icon, {
                className: styles.emailCard_bouncedEmail,
                name: "statusCircle",
                size: 6,
                color: "extraMeeting"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 241,
                columnNumber: 19
              }, void 0), hasAttachedFiles && /* @__PURE__ */ _jsxDEV(AttachmentsDropdown, {
                attachedFiles: parsedAttachedFiles
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 248,
                columnNumber: 38
              }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                children: emailHour
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 249,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ _jsxDEV(AssigneeComponent, {
                value: assignee
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 250,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 238,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 229,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 228,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 219,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(CardContent, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.div_not_collapsed,
          children: [!(message || note) ? /* @__PURE__ */ _jsxDEV("div", {
            ref: titleRef,
            className: styles._emailCard_body__text,
            children: /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: showTooltip && title,
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                weight: "bold",
                className: styles._emailCard_body__text,
                children: title
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 260,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 259,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 258,
            columnNumber: 15
          }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
            className: styles._card_content,
            children: [message && /* @__PURE__ */ _jsxDEV("div", {
              className: clsx(styles._message_wrapper, {
                [styles._message_collapsed]: messageCollapsed
              }),
              children: [/* @__PURE__ */ _jsxDEV(IconButton, {
                onClick: (event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setMessageCollapsed(!messageCollapsed);
                },
                name: messageCollapsed ? "chevronRight" : "chevronDown",
                color: "softPeanut",
                size: 12
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 273,
                columnNumber: 21
              }, void 0), isHtmlMessage || message === "Content too long to display" ? /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                className: styles.emailBody,
                children: [/* @__PURE__ */ _jsxDEV("div", {
                  onClick: (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setMessageCollapsed(!messageCollapsed);
                  },
                  children: /* @__PURE__ */ _jsxDEV(Tooltip, {
                    title: showTooltip && title,
                    position: "top",
                    children: /* @__PURE__ */ _jsxDEV(Text, {
                      size: "xs",
                      weight: "bold",
                      className: styles._emailCard_body__text,
                      children: title
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 293,
                      columnNumber: 29
                    }, void 0)
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 292,
                    columnNumber: 27
                  }, void 0)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 285,
                  columnNumber: 25
                }, void 0), !messageCollapsed ? /* @__PURE__ */ _jsxDEV("div", {
                  className: styles._html_message,
                  dangerouslySetInnerHTML: {
                    __html: parseEmailPixels(cleanedHtmlString)
                  }
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 299,
                  columnNumber: 27
                }, void 0) : convertHtmlToString(cleanedHtmlString)?.substring(0, 200)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 284,
                columnNumber: 23
              }, void 0) : /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                className: styles._emailCard_body__text,
                children: [/* @__PURE__ */ _jsxDEV("div", {
                  onClick: (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setMessageCollapsed(!messageCollapsed);
                  },
                  children: /* @__PURE__ */ _jsxDEV(Tooltip, {
                    title: showTooltip && title,
                    position: "top",
                    children: /* @__PURE__ */ _jsxDEV(Text, {
                      size: "xs",
                      weight: "bold",
                      children: title
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 319,
                      columnNumber: 29
                    }, void 0)
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 318,
                    columnNumber: 27
                  }, void 0)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 311,
                  columnNumber: 25
                }, void 0), message]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 310,
                columnNumber: 23
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 268,
              columnNumber: 19
            }, void 0), note && /* @__PURE__ */ _jsxDEV("div", {
              className: styles._note_wrapper,
              children: /* @__PURE__ */ _jsxDEV(Text, {
                size: "xxs",
                children: [/* @__PURE__ */ _jsxDEV("b", {
                  children: [t("common.note"), ":"]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 332,
                  columnNumber: 23
                }, void 0), " ", note]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 331,
                columnNumber: 21
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 330,
              columnNumber: 19
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 266,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: clsx(styles.emailCard_buttons, {
              [styles.emailCard_buttons_collapse]: messageCollapsed,
              [styles.visible_buttons]: readClicked
            }),
            children: [!isReported && direction === ACTIVITY_DIRECTION.INCOMING && /* @__PURE__ */ _jsxDEV(CardButton, {
              variant: readClicked ? "primary" : "secondary",
              onClick: (event) => {
                event.preventDefault();
                event.stopPropagation();
                setReadClicked(true);
                markEmailAsRead();
              },
              className: clsx(styles.popup_button, {
                [styles._mark_as_read_clicked]: readClicked
              }),
              iconLeft: isLoading ? void 0 : "checkDouble",
              uppercase: false,
              color: readClicked ? "verySoftMelon" : "bloobirds",
              size: "small",
              children: isLoading ? /* @__PURE__ */ _jsxDEV("div", {
                style: {
                  width: "80px"
                },
                children: /* @__PURE__ */ _jsxDEV(Spinner, {
                  name: "loadingCircle",
                  size: 10,
                  color: "melon"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 363,
                  columnNumber: 23
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 362,
                columnNumber: 21
              }, void 0) : t("extension.card.markAsRead")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 345,
              columnNumber: 17
            }, void 0), isReported && /* @__PURE__ */ _jsxDEV(CardButton, {
              size: "small",
              variant: "secondary",
              iconLeft: "checkDouble",
              color: "melon",
              className: clsx(styles.popup_button, styles.emailCard_button_reported),
              uppercase: false,
              children: t("extension.card.read")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 371,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(CardButton, {
              size: "small",
              variant: "secondary",
              iconLeft: "replyAll",
              onClick: (e) => handleOpenEmailModal(e, emailToArray, emailCcArray),
              className: styles.popup_button,
              uppercase: false,
              children: t("extension.card.replyAll")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 382,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(CardButton, {
              size: "small",
              iconLeft: "reply",
              onClick: (e) => handleOpenEmailModal(e, void 0, void 0),
              className: styles.popup_button,
              uppercase: false,
              children: t("extension.card.reply")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 392,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 338,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 256,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 255,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 218,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 211,
    columnNumber: 5
  }, void 0);
};
_s(EmailCard, "+UEjp2p8nZqlQ7hJl0o+GYnIFus=", false, function() {
  return [useTranslation, useExtensionContext, useBaseSetEmailVariablesValues, useMinimizableModals, useUserSettings, useCopilotEnabled];
});
_c = EmailCard;
var _c;
$RefreshReg$(_c, "EmailCard");
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

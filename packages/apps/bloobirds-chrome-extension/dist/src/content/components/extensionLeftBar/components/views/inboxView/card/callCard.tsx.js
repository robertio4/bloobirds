import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/inboxView/card/callCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inboxView/card/callCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inboxView/card/callCard.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { AssigneeComponent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { useDialerLauncher } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-index.tsx.js";
import { Card, CardBody, CardButton, CardContent, CardHeader, CardLeft, CardRight, Icon, Spinner, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useAircallPhoneLinkEnabled, useCopilotEnabled, useOpenCCFWithoutObject, useUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useGetI18nSpacetime } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { ACTIVITY_DIRECTION, ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, LEAD_FIELDS_LOGIC_ROLE, REPORTED_VALUES_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getExtensionBobjectByIdFields, getFieldByLogicRole, getHoursMinutesSeconds, getReferencedBobject, getTextFromLogicRole, getValueFromLogicRole, isHtml, openPhoneOrDialer } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { isToday } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import { parsePhoneNumberFromString } from "/vendor/.vite-deps-libphonenumber-js.js__v--da3005b6.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { NameComponent } from "/src/content/components/card/fieldTypeComponent.tsx.js";
import CardIcon from "/src/content/components/cardIcon/cardIcon.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { CopilotAnalysisIndicator } from "/src/content/components/extensionLeftBar/components/views/shared/CopilotAnalysisIndicator.tsx.js";
import styles from "/src/content/components/extensionLeftBar/components/views/inboxView/inboxPage.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const getLeadName = (bobject) => {
  const leadField = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  if (leadField && leadField.referencedBobject) {
    const lead = leadField.referencedBobject;
    const fullName = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
    const name = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.NAME);
    const email = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
    return fullName || name || email || "Untitled lead";
  }
  return "";
};
export const IconLabel = ({
  iconName,
  label
}) => {
  return label ? /* @__PURE__ */ _jsxDEV("div", {
    style: {
      display: "flex",
      alignItems: "center"
    },
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: iconName,
      color: "verySoftBloobirds",
      size: 16
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      color: "peanut",
      className: styles.iconLabel_text,
      children: label
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 87,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
};
_c = IconLabel;
export const CallCard = ({
  activity
}) => {
  _s();
  const {
    t
  } = useTranslation();
  const [hasBeenRead, setHasBeenRead] = useState(false);
  const [markAsDoneClicked, setMarkAsDoneClicked] = useState(false);
  const direction = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const callSID = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.SID);
  const {
    setContactViewBobjectId,
    setExtendedContext
  } = useExtensionContext();
  const phone = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
  const parsedPhone = phone && parsePhoneNumberFromString(phone)?.formatInternational();
  const activityCompany = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const activityLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const activityOpportunity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
  const callDateTime = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME) || getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME);
  const activityFromToday = isToday(new Date(callDateTime));
  const format = activityFromToday ? "{time-24}" : t("dates.monthShortWithTime");
  const parsedDateTime = useGetI18nSpacetime(callDateTime).format(format);
  const callDuration = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION);
  const {
    hours,
    minutes,
    seconds
  } = getHoursMinutesSeconds(parseInt(callDuration));
  const parsedCallDuration = callDuration && (hours > 0 ? hours + " h " : "") + (minutes > 0 ? minutes + " min " : "") + seconds + " s";
  const note = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const isMissed = direction === ACTIVITY_DIRECTION.MISSED;
  const lead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const company = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const threadId = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_THREAD_ID);
  const noteToShow = isHtml(note) ? /* @__PURE__ */ _jsxDEV("div", {
    dangerouslySetInnerHTML: {
      __html: note
    }
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 130,
    columnNumber: 37
  }, void 0) : note;
  const assignee = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const onCardClick = () => {
    if (activityLead?.id?.value || activityOpportunity?.id?.value || activityCompany?.id?.value) {
      setContactViewBobjectId(activityLead?.id?.value || activityOpportunity?.id?.value || activityCompany?.id?.value);
      setExtendedContext({
        type: ExtendedContextTypes.CALL_DETAILS,
        threadId,
        bobject: activity
      });
    }
  };
  const copilotAnalysis = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COPILOT_ANALYSIS);
  const settings = useUserSettings();
  const isCopilotEnabled = useCopilotEnabled(settings?.account?.id);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.container, {
      [styles.hasBeenRead]: hasBeenRead && !activity?.activityDate?.isLastOfDay
    }),
    style: {
      height: "100%"
    },
    children: /* @__PURE__ */ _jsxDEV(Card, {
      expand: true,
      size: "small",
      onClick: onCardClick,
      children: [/* @__PURE__ */ _jsxDEV(CardHeader, {
        forceButtonVisibility: markAsDoneClicked,
        children: [/* @__PURE__ */ _jsxDEV(CardLeft, {
          children: /* @__PURE__ */ _jsxDEV(CardIcon, {
            name: "phone",
            color: isMissed ? "tomato" : "melon",
            direction,
            size: "xxs"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 162,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 161,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(CardBody, {
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles._callCard_body__wrap,
            children: [/* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              weight: "bold",
              className: styles._callCard_body__text,
              children: direction ? t("leftBar.card.call." + direction + "Call") : t("common.call")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 171,
              columnNumber: 15
            }, void 0), (lead || company) && /* @__PURE__ */ _jsxDEV(_Fragment, {
              children: [/* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                children: direction === ACTIVITY_DIRECTION.OUTGOING ? t("leftBar.card.call.with") : t("leftBar.card.call.with")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 176,
                columnNumber: 19
              }, void 0), /* @__PURE__ */ _jsxDEV(NameComponent, {
                value: lead ?? company,
                bobject: activity,
                shrinkName: false,
                showIcon: false
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 181,
                columnNumber: 19
              }, void 0)]
            }, void 0, true)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 170,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 169,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(CardRight, {
          children: /* @__PURE__ */ _jsxDEV("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 0
            },
            children: [isCopilotEnabled && copilotAnalysis && /* @__PURE__ */ _jsxDEV(CopilotAnalysisIndicator, {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 193,
              columnNumber: 55
            }, void 0), /* @__PURE__ */ _jsxDEV(AssigneeComponent, {
              value: assignee
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 194,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 192,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 191,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 160,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(CardContent, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.div_not_collapsed,
          children: [(parsedPhone || callDateTime || parsedCallDuration) && /* @__PURE__ */ _jsxDEV("div", {
            style: {
              display: "flex",
              gap: "8px",
              flexWrap: "wrap"
            },
            children: [/* @__PURE__ */ _jsxDEV(IconLabel, {
              iconName: "agendaPerson",
              label: parsedPhone
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 202,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(IconLabel, {
              iconName: "clock",
              label: parsedDateTime + (callDuration ? ", " + parsedCallDuration : "")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 203,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 201,
            columnNumber: 15
          }, void 0), noteToShow && note !== "null" && /* @__PURE__ */ _jsxDEV(Text, {
            className: styles.note_text,
            size: "xs",
            children: [/* @__PURE__ */ _jsxDEV("b", {
              children: t("leftBar.card.call.note")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 211,
              columnNumber: 17
            }, void 0), " ", noteToShow]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 210,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(CallCardHoverActions, {
            activity,
            setHasBeenRead,
            markAsDoneClicked,
            setMarkAsDoneClicked
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 214,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 199,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 198,
        columnNumber: 9
      }, void 0)]
    }, callSID, true, {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 153,
    columnNumber: 5
  }, void 0);
};
_s(CallCard, "9Wn6wlU/IOmQ2VY4Yhe/UIdPILQ=", false, function() {
  return [useTranslation, useExtensionContext, useGetI18nSpacetime, useUserSettings, useCopilotEnabled];
});
_c2 = CallCard;
const CallCardHoverActions = ({
  activity,
  setHasBeenRead,
  markAsDoneClicked,
  setMarkAsDoneClicked
}) => {
  _s2();
  const {
    t
  } = useTranslation();
  const {
    useGetSettings,
    setContactViewBobjectId,
    closeExtendedScreen
  } = useExtensionContext();
  const settings = useGetSettings();
  const {
    openDialer
  } = useDialerLauncher();
  const {
    setOpenedModalInfo
  } = useSubhomeContext();
  const leadName = getLeadName(activity);
  const leadField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const lead = leadField?.referencedBobject;
  const phone = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
  const leadPhone = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.PHONE);
  const direction = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const [isLoading, setIsLoading] = useState(false);
  const [referencedBobjectState, setReferencedBobjectState] = useState();
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const hasOpenCCFWithoutObjectAccount = useOpenCCFWithoutObject();
  const openModalAddPerson = (activity2) => {
    setOpenedModalInfo({
      openedModal: "addPerson",
      bobject: activity2
    });
  };
  const openDialerAndRedirect = (event, phoneNumber, activity2) => {
    event.preventDefault();
    event.stopPropagation();
    openPhoneOrDialer(phoneNumber, settings, openDialer);
    const referencedBobject = getReferencedBobject(activity2);
    setContactViewBobjectId(referencedBobject?.id?.value);
    closeExtendedScreen();
  };
  const openCallResultModal = (event, activity2) => {
    event.preventDefault();
    event.stopPropagation();
    const referencedBobject = getReferencedBobject(activity2);
    if (!referencedBobject) {
      getExtensionBobjectByIdFields(referencedBobject?.id).then(({
        data
      }) => setReferencedBobjectState(data));
    }
    setOpenedModalInfo({
      openedModal: "callReportResult",
      bobject: activity2,
      referencedBobject: referencedBobject?.id?.typeName !== BobjectTypes.Activity ? referencedBobject : referencedBobjectState
    });
  };
  const handleHideAndComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("ACTIVE_BOBJECT_UPDATED", {
        detail: {
          type: BobjectTypes.Activity
        }
      }));
      setHasBeenRead(true);
    }, 750);
  };
  const markCallAsRead = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setMarkAsDoneClicked(true);
    setIsLoading(true);
    api.patch(`/bobjects/${activity?.id?.value}/raw`, {
      contents: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES
      },
      params: {}
    }).then(handleHideAndComplete);
  };
  const commonCallButtonProps = {
    size: "small",
    uppercase: false,
    color: markAsDoneClicked ? "verySoftMelon" : "extraCall",
    className: clsx(styles.popup_button, {
      [styles._mark_as_read_clicked]: markAsDoneClicked
    })
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.popup_buttons_wrapper, {
      [styles.visible_buttons]: markAsDoneClicked
    }),
    children: [!(leadName || hasOpenCCFWithoutObjectAccount) && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: t("extension.card.assignToLead"),
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(CardButton, {
        size: "small",
        uppercase: false,
        variant: "secondary",
        iconLeft: isLoading ? null : "personAdd",
        className: styles.popup_button,
        onClick: (event) => {
          event.preventDefault();
          event.stopPropagation();
          openModalAddPerson(activity);
        },
        children: isLoading ? /* @__PURE__ */ _jsxDEV("div", {
          children: /* @__PURE__ */ _jsxDEV(Spinner, {
            name: "loadingCircle",
            size: 10,
            color: "melon"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 347,
            columnNumber: 17
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 346,
          columnNumber: 15
        }, void 0) : t("extension.card.assignTo")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 333,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 332,
      columnNumber: 9
    }, void 0), (phone || leadPhone) && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: direction === ACTIVITY_DIRECTION.OUTGOING ? t("extension.card.callAgain") : t("extension.card.callBack"),
      position: "top",
      children: hasAircallPhoneLinkEnabled ? /* @__PURE__ */ _jsxDEV(CardButton, {
        ...commonCallButtonProps,
        onClick: void 0,
        children: /* @__PURE__ */ _jsxDEV("a", {
          href: `callto:${phone ?? leadPhone}`,
          className: styles._call_link,
          children: isLoading ? /* @__PURE__ */ _jsxDEV("div", {
            children: /* @__PURE__ */ _jsxDEV(Spinner, {
              name: "loadingCircle",
              size: 10,
              color: "melon"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 369,
              columnNumber: 21
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 368,
            columnNumber: 19
          }, void 0) : direction === ACTIVITY_DIRECTION.MISSED ? t("extension.card.callBack") : t("extension.card.callAgain")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 366,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 365,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ _jsxDEV(CardButton, {
        iconLeft: isLoading ? null : "phone",
        ...commonCallButtonProps,
        onClick: (event) => {
          if (direction === ACTIVITY_DIRECTION.MISSED) {
            markCallAsRead(event);
          }
          openDialerAndRedirect(event, phone ?? leadPhone, lead);
        },
        children: isLoading ? /* @__PURE__ */ _jsxDEV("div", {
          children: /* @__PURE__ */ _jsxDEV(Spinner, {
            name: "loadingCircle",
            size: 10,
            color: "melon"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 391,
            columnNumber: 19
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 390,
          columnNumber: 17
        }, void 0) : direction === ACTIVITY_DIRECTION.MISSED ? t("extension.card.callBack") : t("extension.card.call")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 379,
        columnNumber: 13
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 356,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: (leadName || hasOpenCCFWithoutObjectAccount) && direction !== ACTIVITY_DIRECTION.MISSED ? t("extension.card.markAsReported") : void 0,
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(CardButton, {
        uppercase: false,
        size: "small",
        color: markAsDoneClicked ? "verySoftMelon" : "bloobirds",
        className: clsx(styles.popup_button, {
          [styles._mark_as_read_clicked]: markAsDoneClicked
        }),
        iconLeft: isLoading ? null : leadName || hasOpenCCFWithoutObjectAccount ? "thumbsUp" : "checkDouble",
        onClick: (event) => {
          (leadName || hasOpenCCFWithoutObjectAccount) && direction !== ACTIVITY_DIRECTION.MISSED ? openCallResultModal(event, activity) : markCallAsRead(event);
        },
        children: isLoading ? /* @__PURE__ */ _jsxDEV("div", {
          children: /* @__PURE__ */ _jsxDEV(Spinner, {
            name: "loadingCircle",
            size: 10,
            color: "melon"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 432,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 431,
          columnNumber: 13
        }, void 0) : leadName || hasOpenCCFWithoutObjectAccount ? t("common.reportResult") : t("extension.card.markAsDone")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 410,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 402,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 326,
    columnNumber: 5
  }, void 0);
};
_s2(CallCardHoverActions, "AKWdG8zXI0NaRn8CzxKyb/YnCVc=", true, function() {
  return [useTranslation, useExtensionContext, useDialerLauncher, useSubhomeContext, useAircallPhoneLinkEnabled, useOpenCCFWithoutObject];
});
_c3 = CallCardHoverActions;
var _c, _c2, _c3;
$RefreshReg$(_c, "IconLabel");
$RefreshReg$(_c2, "CallCard");
$RefreshReg$(_c3, "CallCardHoverActions");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }
}

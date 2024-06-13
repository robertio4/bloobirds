import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/inboxView/card/whatsAppCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inboxView/card/whatsAppCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inboxView/card/whatsAppCard.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { SearchAssignUserDropdown } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-assignUserModal-dist-index.js.js";
import { AssigneeComponent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { Card, CardBody, CardButton, CardContent, CardHeader, CardLeft, CardRight, Icon, IconButton, Spinner, Text, Tooltip, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserSettings, useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useGetI18nSpacetime } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, DIRECTION_VALUES_LOGIC_ROLE, MessagesEvents, REPORTED_VALUES_LOGIC_ROLE, SalesforceTabs } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, formatDate, generateDatePrefix, getDateTimestampString, getFieldByLogicRole, getTextFromLogicRole, getValueFromLogicRole, isHtml } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { isSameDay, isToday, isValid, parse } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import { parsePhoneNumberFromString } from "/vendor/.vite-deps-libphonenumber-js.js__v--da3005b6.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { NameComponent } from "/src/content/components/card/fieldTypeComponent.tsx.js";
import CardIcon from "/src/content/components/cardIcon/cardIcon.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/extensionLeftBar/components/views/inboxView/inboxPage.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const PAGE_SIZE = 8;
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
      lineNumber: 67,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      color: "peanut",
      className: styles.iconLabel_text,
      children: label
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 66,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
};
_c = IconLabel;
const addMessageGrouping = (items, t) => items.map((item, index) => {
  const date = new Date(getValueFromLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
  const itemDirection = getFieldByLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)?.valueLogicRole;
  const reportedStatus = getFieldByLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)?.valueLogicRole;
  const previous = items[index - 1];
  const previousItemDate = previous && new Date(getValueFromLogicRole(previous, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
  const formattedDay = isValid(date) ? formatDate(date, "MMM do, yyyy") : "";
  const dateDay = isValid(date) ? parse(formattedDay, "MMM do, yyyy", new Date()) : "";
  const hashDate = getDateTimestampString(date);
  const isReported = (value, direction) => value === REPORTED_VALUES_LOGIC_ROLE.YES || direction === DIRECTION_VALUES_LOGIC_ROLE.OUTGOING;
  return {
    ...item,
    messageDate: {
      isFirstOfDay: !previousItemDate || !isSameDay(date, previousItemDate),
      day: dateDay,
      formattedDate: formattedDay,
      prefix: generateDatePrefix(date, true, t),
      hashDate
    },
    messageStatus: {
      isReported: isReported(reportedStatus, itemDirection)
    }
  };
});
export const WhatsAppCard = ({
  messages
}) => {
  _s();
  const {
    i18n,
    t
  } = useTranslation();
  const {
    settings
  } = useActiveUserSettings();
  const [hasBeenRead, setHasBeenRead] = useState(false);
  const activity = messages[messages.length - 1];
  const [markAsDoneClicked, setMarkAsDoneClicked] = useState(false);
  const [messageCollapsed, setMessageCollapsed] = useState(true);
  const messageSID = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.WHATSAPP_ID);
  const {
    setContactViewBobjectId,
    setExtendedContext
  } = useExtensionContext();
  const phone = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
  const parsedPhone = phone && parsePhoneNumberFromString(phone)?.formatInternational();
  const activityCompany = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const activityLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const activityOpportunity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
  const messageDateTime = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME) || getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME);
  const activityCaseId = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CASE_ID);
  const activityCaseNumber = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CASE_NUMBER);
  const activityFromToday = isToday(new Date(messageDateTime));
  const format = activityFromToday ? "{time-24}" : i18n.language === "en" ? "{time-24} {month-short} {date-ordinal}" : "{time-24} {date} {month-short}";
  const parsedDateTime = useGetI18nSpacetime(messageDateTime).format(format);
  const note = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  const noteToShow = isHtml(note) ? /* @__PURE__ */ _jsxDEV("div", {
    dangerouslySetInnerHTML: {
      __html: note
    }
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 138,
    columnNumber: 37
  }, void 0) : note;
  const assignee = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const media = getValueFromLogicRole(activity, "ACTIVITY__ATTACHMENTS");
  const message = noteToShow || (media ? "Message with media" : "");
  const onCardClick = () => {
    if (activityLead?.id?.value || activityOpportunity?.id?.value || activityCompany?.id?.value) {
      setContactViewBobjectId(activityLead?.id?.value || activityOpportunity?.id?.value || activityCompany?.id?.value);
      setExtendedContext({
        type: ExtendedContextTypes.WHATSAPP_BUSINESS_THREAD,
        bobject: activity
      });
    }
  };
  const handleClickOnCase = (caseId) => {
    window.open(settings?.account?.salesforceInstance + "/" + caseId, "_blank");
  };
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
            name: "waBusiness",
            color: "melon",
            size: "xs"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 170,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 169,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(CardBody, {
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles._callCard_body__wrap,
            children: [/* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              weight: "bold",
              className: styles._callCard_body__text,
              children: t("leftBar.card.whatsapp.title")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 174,
              columnNumber: 15
            }, void 0), (activityLead || activityCompany) && /* @__PURE__ */ _jsxDEV(_Fragment, {
              children: [/* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                weight: "bold",
                className: styles._card_body__text,
                children: t("leftBar.card.call.with")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 179,
                columnNumber: 19
              }, void 0), /* @__PURE__ */ _jsxDEV(NameComponent, {
                value: activityLead ?? activityCompany,
                bobject: activity,
                shrinkName: false,
                showIcon: false
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 182,
                columnNumber: 19
              }, void 0)]
            }, void 0, true)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 173,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 172,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(CardRight, {
          children: /* @__PURE__ */ _jsxDEV(AssigneeComponent, {
            value: assignee
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 193,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 192,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 168,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(CardContent, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.div_not_collapsed,
          children: [(parsedPhone || messageDateTime) && /* @__PURE__ */ _jsxDEV("div", {
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
              lineNumber: 200,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(IconLabel, {
              iconName: "clock",
              label: t("leftBar.card.whatsapp.lastMessage") + " " + parsedDateTime
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 201,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 199,
            columnNumber: 15
          }, void 0), activityCaseId && /* @__PURE__ */ _jsxDEV("div", {
            style: {
              display: "flex",
              gap: "8px",
              flexWrap: "wrap"
            },
            children: /* @__PURE__ */ _jsxDEV("span", {
              onClick: (e) => {
                e.stopPropagation();
                handleClickOnCase(activityCaseId);
              },
              className: styles.caseIcon,
              children: [/* @__PURE__ */ _jsxDEV(Icon, {
                name: "briefcase",
                color: "verySoftBloobirds",
                size: 16
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 216,
                columnNumber: 19
              }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                color: "bloobirds",
                className: styles.iconLabel_text,
                children: "N\xBA" + activityCaseNumber
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 217,
                columnNumber: 19
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 209,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 208,
            columnNumber: 15
          }, void 0), noteToShow && noteToShow !== "null" && /* @__PURE__ */ _jsxDEV("div", {
            className: styles._collapsed_message,
            style: {
              marginBottom: "20px"
            },
            children: [/* @__PURE__ */ _jsxDEV("div", {
              children: /* @__PURE__ */ _jsxDEV(IconButton, {
                name: "chevronRight",
                color: "softPeanut",
                size: 12,
                onClick: (event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setMessageCollapsed(false);
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 226,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 225,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              className: styles._linkedin_message,
              size: "xs",
              children: message
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 237,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 224,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(WhatsAppCardHoverActions, {
            activity,
            setHasBeenRead,
            markAsDoneClicked,
            setMarkAsDoneClicked,
            messages
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 242,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 197,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 196,
        columnNumber: 9
      }, void 0)]
    }, messageSID, true, {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 161,
    columnNumber: 5
  }, void 0);
};
_s(WhatsAppCard, "GWB/8ou8H3WVPmsIdgZUw2F25ZI=", false, function() {
  return [useTranslation, useActiveUserSettings, useExtensionContext, useGetI18nSpacetime];
});
_c2 = WhatsAppCard;
const WhatsAppCardHoverActions = ({
  activity,
  setHasBeenRead,
  markAsDoneClicked,
  setMarkAsDoneClicked,
  messages
}) => {
  _s2();
  const {
    t
  } = useTranslation();
  const {
    useGetSettings
  } = useExtensionContext();
  const {
    setContactViewBobjectId,
    setExtendedContext
  } = useExtensionContext();
  const activityCompany = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const activityLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const messagePhoneFrom = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
  const [isLoading, setIsLoading] = useState(false);
  const {
    ref,
    visible,
    setVisible
  } = useVisible();
  const hasObjectRelated = activityLead || activityCompany;
  const assignee = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const users = useUserSearch();
  const assigneeUser = users?.users?.find((user) => user?.id === assignee?.id);
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const handleOnLinkOrCreate = (bobjectId) => {
    messages.forEach((message) => {
      api.patch(`/bobjects/${message?.id?.value}/raw`, {
        contents: {
          [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: bobjectId
        },
        params: {}
      }).then(handleHideAndComplete);
    });
  };
  const searchOrCreateContactFlow = () => {
    const profileName = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT);
    window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension, {
      detail: {
        source: "LEFTBAR",
        bobjects: [],
        info: {
          name: profileName,
          number: messagePhoneFrom,
          validatePhone: true,
          onCreate: handleOnLinkOrCreate,
          onSelect: handleOnLinkOrCreate
        }
      }
    }));
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
  const handleRefreshUserAssigned = () => {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("ACTIVE_BOBJECT_UPDATED", {
        detail: {
          type: BobjectTypes.Activity
        }
      }));
    }, 750);
  };
  const markAsRead = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setMarkAsDoneClicked(true);
    setIsLoading(true);
    messages.forEach((message) => {
      api.patch(`/bobjects/${message?.id?.value}/raw`, {
        contents: {
          [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES
        },
        params: {}
      }).then(handleHideAndComplete);
    });
  };
  const replyAction = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (activityLead?.id?.value || activityCompany?.id?.value) {
      setContactViewBobjectId(activityLead?.id?.value || activityCompany?.id?.value);
      setExtendedContext({
        type: ExtendedContextTypes.WHATSAPP_BUSINESS_THREAD,
        bobject: activity
      });
    }
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.popup_buttons_wrapper, {
      [styles.visible_buttons]: markAsDoneClicked || visible
    }),
    children: [/* @__PURE__ */ _jsxDEV(Tooltip, {
      title: hasObjectRelated ? t("leftBar.card.whatsapp.markAsRead") : t("leftBar.card.whatsapp.discardMessage"),
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(CardButton, {
        uppercase: false,
        size: "small",
        variant: "secondary",
        className: clsx(styles.popup_button, {
          [styles._mark_as_read_clicked]: markAsDoneClicked
        }),
        iconLeft: isLoading ? null : "checkDouble",
        onClick: markAsRead,
        children: isLoading ? /* @__PURE__ */ _jsxDEV("div", {
          children: /* @__PURE__ */ _jsxDEV(Spinner, {
            name: "loadingCircle",
            size: 10,
            color: "melon"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 392,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 391,
          columnNumber: 13
        }, void 0) : hasObjectRelated ? t("leftBar.card.whatsapp.markAsRead") : t("common.discard")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 380,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 372,
      columnNumber: 7
    }, void 0), hasObjectRelated && messagePhoneFrom && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: t("leftBar.card.whatsapp.replyButton"),
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(CardButton, {
        size: "small",
        uppercase: false,
        color: "extraCall",
        className: styles.popup_button,
        iconLeft: "waBusiness",
        onClick: replyAction,
        children: t("leftBar.card.whatsapp.replyButton")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 403,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 402,
      columnNumber: 9
    }, void 0), !hasObjectRelated && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: t("leftBar.card.whatsapp.assignMessage"),
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
          searchOrCreateContactFlow();
        },
        children: isLoading ? /* @__PURE__ */ _jsxDEV("div", {
          children: /* @__PURE__ */ _jsxDEV(Spinner, {
            name: "loadingCircle",
            size: 10,
            color: "melon"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 431,
            columnNumber: 17
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 430,
          columnNumber: 15
        }, void 0) : t("leftBar.card.whatsapp.createContact")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 417,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 416,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV(SearchAssignUserDropdown, {
      bobject: messages,
      accountId,
      assigneeUser,
      visible,
      setVisible,
      ref,
      onSave: handleRefreshUserAssigned,
      showCallout: false,
      subhomeTab: SalesforceTabs.INBOX,
      assignReferencedBobject: true,
      children: /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: t("leftBar.card.whatsapp.reassignMessage"),
        position: "top",
        className: styles._tooltip_wrapper,
        children: /* @__PURE__ */ _jsxDEV(CardButton, {
          uppercase: false,
          size: "small",
          color: "bloobirds",
          className: styles.popup_button,
          iconLeft: "deliver",
          onClick: (event) => {
            event.preventDefault();
            event.stopPropagation();
            setVisible(!visible);
          },
          children: t("extension.card.reassign")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 456,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 451,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 439,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 367,
    columnNumber: 5
  }, void 0);
};
_s2(WhatsAppCardHoverActions, "9LW+UmsZdBdCqO1yChigA8vMq7c=", true, function() {
  return [useTranslation, useExtensionContext, useExtensionContext, useVisible, useUserSearch];
});
_c3 = WhatsAppCardHoverActions;
var _c, _c2, _c3;
$RefreshReg$(_c, "IconLabel");
$RefreshReg$(_c2, "WhatsAppCard");
$RefreshReg$(_c3, "WhatsAppCardHoverActions");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/notificationReminders/components/reportCallReminderCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/notificationReminders/components/reportCallReminderCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/notificationReminders/components/reportCallReminderCard.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Card, CardBody, CardHeader, CardLeft, IconButton, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useGetI18nSpacetime } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { ACTIVITY_DIRECTION, ACTIVITY_FIELDS_LOGIC_ROLE, PluralBobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getFieldByLogicRole, getHoursMinutesSeconds, getTextFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useWizardContext, WIZARD_MODALS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-wizardModalContext-dist-index.js.js";
import { isToday } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import { parsePhoneNumberFromString } from "/vendor/.vite-deps-libphonenumber-js.js__v--da3005b6.js";
import { NameComponent } from "/src/content/components/card/fieldTypeComponent.tsx.js";
import CardIcon from "/src/content/components/cardIcon/cardIcon.tsx.js";
import { IconLabel } from "/src/content/components/extensionLeftBar/components/views/inboxView/card/callCard.tsx.js";
import { useNotificationReminders } from "/src/content/components/notificationReminders/notificationReminders.tsx.js";
import styles from "/src/content/components/notificationReminders/notificationReminders.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export function ReportCallReminderCard({
  activity
}) {
  _s();
  const {
    t
  } = useTranslation();
  const {
    dismissReminder
  } = useNotificationReminders();
  const {
    openWizard,
    resetWizardProperties
  } = useWizardContext();
  const direction = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const leadId = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.value;
  const companyId = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.value;
  const opportunityId = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.value;
  const lead = leadId && activity?.referencedBobjects[leadId];
  const company = companyId && activity?.referencedBobjects[companyId];
  const callDateTime = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME) || getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME);
  const activityFromToday = isToday(new Date(callDateTime));
  const format = activityFromToday ? "{time-24}" : t("dates.monthShortWithTime");
  const phone = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
  const parsedPhone = phone && parsePhoneNumberFromString(phone)?.formatInternational();
  const parsedDateTime = useGetI18nSpacetime(callDateTime).format(format);
  const callDuration = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION);
  const {
    hours,
    minutes,
    seconds
  } = getHoursMinutesSeconds(parseInt(callDuration));
  const parsedCallDuration = callDuration && (hours > 0 ? hours + " h " : "") + (minutes > 0 ? minutes + " min " : "") + seconds + " s";
  async function openCorrectContactFlow() {
    const mainBobjectId = opportunityId || leadId || companyId;
    if (mainBobjectId) {
      const response = await api.get(`/linkedin/${PluralBobjectTypes[mainBobjectId.split("/")[1]]?.toLowerCase()}/${mainBobjectId.split("/")[2]}`);
      const referenceBobject = response.data;
      const handleClose = () => {
        dismissReminder();
        resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
      };
      openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activity, {
        handleClose,
        referenceBobject
      });
    }
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.reportCallReminder,
    children: /* @__PURE__ */ _jsxDEV(Card, {
      expand: true,
      size: "small",
      onClick: () => {
      },
      children: [/* @__PURE__ */ _jsxDEV(CardHeader, {
        children: [/* @__PURE__ */ _jsxDEV(CardLeft, {
          children: /* @__PURE__ */ _jsxDEV(CardIcon, {
            name: "phone",
            color: "melon",
            direction,
            size: "xxs"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 90,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 89,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.closeCard,
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "cross",
            color: "softPeanut",
            onClick: () => {
              dismissReminder();
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 98,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 97,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(CardBody, {
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles._callCard_body__wrap,
            children: [/* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              weight: "bold",
              className: styles._callCard_body__text,
              children: t("leftBar.card.call." + direction + "Call")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 108,
              columnNumber: 15
            }, this), (lead || company) && /* @__PURE__ */ _jsxDEV(_Fragment, {
              children: [/* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                children: direction === ACTIVITY_DIRECTION.OUTGOING ? t("leftBar.card.call.with") : t("leftBar.card.call.with")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 113,
                columnNumber: 19
              }, this), /* @__PURE__ */ _jsxDEV(NameComponent, {
                value: lead ?? company,
                bobject: activity,
                shrinkName: false,
                showIcon: false
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 118,
                columnNumber: 19
              }, this)]
            }, void 0, true)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 107,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 106,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 88,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.content,
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.div_not_collapsed,
          children: (parsedPhone || callDateTime || parsedCallDuration) && /* @__PURE__ */ _jsxDEV("div", {
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
              lineNumber: 133,
              columnNumber: 17
            }, this), /* @__PURE__ */ _jsxDEV(IconLabel, {
              iconName: "clock",
              label: parsedDateTime + (callDuration ? ", " + parsedCallDuration : "")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 134,
              columnNumber: 17
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 132,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 130,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 129,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.buttons,
        children: [/* @__PURE__ */ _jsxDEV(Button, {
          onClick: dismissReminder,
          size: "small",
          variant: "clear",
          color: "peanut",
          iconLeft: "cross",
          expand: true,
          uppercase: false,
          className: styles.reminderButton,
          children: t("common.dismiss")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 143,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(Button, {
          onClick: openCorrectContactFlow,
          size: "small",
          variant: "primary",
          iconLeft: "thumbsUp",
          expand: true,
          uppercase: false,
          className: styles.reminderButton,
          children: t("common.reportResult")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 155,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 142,
        columnNumber: 9
      }, this)]
    }, activity?.id, true, {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 86,
    columnNumber: 5
  }, this);
}
_s(ReportCallReminderCard, "dku51lHOM3a/X9VW1Al6U4plV+0=", false, function() {
  return [useTranslation, useNotificationReminders, useWizardContext, useGetI18nSpacetime];
});
_c = ReportCallReminderCard;
var _c;
$RefreshReg$(_c, "ReportCallReminderCard");
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

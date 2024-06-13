import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/card/fieldTypeComponent.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/fieldTypeComponent.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/fieldTypeComponent.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$(), _s5 = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, IconButton, Label, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useDataModel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, COMPANY_FIELDS_LOGIC_ROLE, FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, OPPORTUNITY_FIELDS_LOGIC_ROLE, TASK_FIELDS_LOGIC_ROLE, TASK_PRIORITY_VALUE, TASK_TYPE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { convertHtmlToString, formatDateAsText, getFieldByLogicRole, getNameComponentFields, getTaskLocalTime, getTaskReferenceBobject, getTaskText, getTextFromLogicRole, getValueFromLogicRole, isCadenceTask, isScheduledTask, isMeetingTypeTask, parseCurrency, removeHtmlTags } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { getReferencedBobjectFromLogicRole } from "/src/utils/bobjects.utils.ts.js";
import { addHttpIfNeeded } from "/src/utils/url.ts.js";
import { Name } from "/src/content/components/name/name.tsx.js";
import styles from "/src/content/components/card/card.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const BOLD_FIELDS = [COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET, LEAD_FIELDS_LOGIC_ROLE.ICP, TASK_FIELDS_LOGIC_ROLE.TITLE];
const tooltipDictionary = {
  [COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS]: "numberOfLeads",
  [COMPANY_FIELDS_LOGIC_ROLE.SOURCE]: "companySource",
  [COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET]: "targetMarket",
  [LEAD_FIELDS_LOGIC_ROLE.ICP]: "buyerPersona",
  [LEAD_FIELDS_LOGIC_ROLE.SOURCE]: "leadSource",
  [OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT]: "opportunityAmount"
};
const iconDictionary = {
  [BobjectTypes.Company]: "company",
  [BobjectTypes.Lead]: "person",
  [BobjectTypes.Opportunity]: "fileOpportunity"
};
const getTooltipTitle = (bobjectType, name, bobjectToOpen, t) => {
  if (name?.includes("Attempt") && bobjectType === BobjectTypes.Task) {
    const description = getTextFromLogicRole(bobjectToOpen, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION);
    const referencedBobject = getTaskReferenceBobject(bobjectToOpen);
    const referencedBobjectType = referencedBobject?.id?.typeName;
    const cadenceName = getTextFromLogicRole(
      referencedBobject,
      FIELDS_LOGIC_ROLE[referencedBobjectType]?.CADENCE
    );
    return removeHtmlTags(`${description || ""}${cadenceName ? ` ${t("common.cadence")} : ${cadenceName}` : ""}`);
  } else if (!name && bobjectType === "Email") {
    return t("extension.card.leadEmail");
  } else {
    return name;
  }
};
export const NameComponent = ({
  value,
  bobject,
  shrinkName = true,
  showIcon = true,
  isBody = false,
  customTasks
}) => {
  _s();
  const {
    t
  } = useTranslation();
  const {
    name,
    bobjectType,
    bobjectToOpen
  } = getNameComponentFields(value, bobject);
  const icon = iconDictionary[bobjectType];
  const isTask = bobjectType === BobjectTypes.Task;
  const isScheduled = isTask && isScheduledTask(bobject);
  const isCadence = isTask && isCadenceTask(bobject);
  const isContactBeforeMeeting = isTask && isMeetingTypeTask(bobject);
  const isScheduledDescription = isScheduled && isBody;
  let nameValue = name;
  let cadenceName = null;
  let tooltipTitle = getTooltipTitle(bobjectType, name, bobjectToOpen, t);
  if (!name) {
    const isLead = bobjectType === BobjectTypes.Lead;
    nameValue = getValueFromLogicRole(isLead ? bobjectToOpen : bobject?.id?.typeName === BobjectTypes.Lead ? bobject : void 0, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true);
    if (!nameValue) {
      const referenceBobject = getReferencedBobjectFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.LEAD);
      nameValue = getValueFromLogicRole(referenceBobject, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true);
    }
    tooltipTitle = getTooltipTitle("Email", name, bobjectToOpen, t);
  }
  if (isScheduled || isCadence || isContactBeforeMeeting) {
    nameValue = getTaskText(bobject, "Title", customTasks, true, t);
    if (isCadence && isTask) {
      const relatedBobject = getTaskReferenceBobject(bobject);
      cadenceName = getTextFromLogicRole(relatedBobject, FIELDS_LOGIC_ROLE[relatedBobject?.id?.typeName]?.CADENCE);
    }
  }
  return isTask ? /* @__PURE__ */ _jsxDEV("div", {
    className: clsx({
      [styles._title]: !isScheduledDescription
    }),
    style: {
      paddingRight: 4
    },
    children: /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: !isScheduledDescription && (nameValue?.length > 42 ? nameValue : tooltipTitle),
      position: "top",
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        weight: "medium",
        inline: !isScheduledDescription,
        ellipsis: !isScheduledDescription ? 42 : void 0,
        children: nameValue
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 159,
        columnNumber: 9
      }, void 0), isCadence && /* @__PURE__ */ _jsxDEV(CadenceName, {
        cadenceName
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 167,
        columnNumber: 23
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 154,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [icon && showIcon && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._icon_wrapper,
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        size: 16,
        name: icon,
        color: "verySoftBloobirds"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 174,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 173,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._name_container,
      style: {
        flexShrink: shrinkName ? 1 : 0
      },
      children: /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: tooltipTitle,
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Name, {
          name: nameValue || t("extension.card.bobjectNameUndefined", {
            bobjectType: t("bobjectTypes." + bobjectType?.toLowerCase())
          }),
          bobject: bobjectToOpen
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 179,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 178,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 177,
      columnNumber: 7
    }, void 0)]
  }, void 0, true);
};
_s(NameComponent, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = NameComponent;
export const PlainTextComponent = ({
  value,
  logicRole,
  isBody = false
}) => {
  _s2();
  const {
    t
  } = useTranslation();
  if (logicRole === COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS)
    value = `${value || 0} ${value !== "1" ? "leads" : "lead"}`;
  const isBoldFont = BOLD_FIELDS.includes(logicRole);
  const props = isBoldFont ? {
    color: "peanut",
    weight: "medium",
    ellipsis: 35
  } : {
    color: isBody ? "peanut" : "softPeanut",
    weight: "regular",
    ellipsis: isBody ? void 0 : 35
  };
  if (typeof value !== "string" && value?.text)
    value = value.text;
  return /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: value?.length > 35 ? value : t(`extension.card.${tooltipDictionary[logicRole]}`),
    position: "top",
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles._number_leads_wrapper,
      children: /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        ...props,
        className: styles._plain_component,
        children: value
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 238,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 237,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 233,
    columnNumber: 5
  }, void 0);
};
_s2(PlainTextComponent, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c2 = PlainTextComponent;
export const DescriptionComponent = ({
  value
}) => /* @__PURE__ */ _jsxDEV(Text, {
  size: "xs",
  weight: "medium",
  className: styles._description,
  children: convertHtmlToString(value)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 247,
  columnNumber: 3
}, void 0);
_c3 = DescriptionComponent;
export const AmountComponent = ({
  value,
  logicRole
}) => {
  _s3();
  const {
    t
  } = useTranslation();
  const dataModel = useDataModel();
  const {
    prefix,
    suffix
  } = dataModel?.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT) || {};
  const props = {
    color: "peanut",
    weight: "medium",
    ellipsis: 20
  };
  return /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: value?.length > 20 ? value : t(`extension.card.${tooltipDictionary[logicRole]}`),
    position: "top",
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles._amount_wrapper,
      children: /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        ...props,
        className: styles._plain_component,
        children: [prefix ? prefix : "", " ", parseCurrency(value), " ", suffix ? suffix : ""]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 270,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 269,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 265,
    columnNumber: 5
  }, void 0);
};
_s3(AmountComponent, "whvfqQ87nV7ADrm25DWfqYeR54o=", false, function() {
  return [useTranslation, useDataModel];
});
_c4 = AmountComponent;
export const ScheduledDateTime = ({
  scheduledDateTime,
  isOverdue,
  isCadence = false
}) => {
  _s4();
  const {
    t
  } = useTranslation();
  if (!scheduledDateTime)
    return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
  return /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: isOverdue && "Overdue",
    position: "top",
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles._datetime,
      children: [!isCadence && /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: isOverdue ? "tomato" : "darkBloobirds",
        children: formatDateAsText({
          text: scheduledDateTime,
          patternFormat: "{time-24}",
          t
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 294,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: isOverdue ? "tomato" : "darkBloobirds",
        children: formatDateAsText({
          text: scheduledDateTime,
          patternFormat: t("dates.shortMonth"),
          t
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 298,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 292,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 291,
    columnNumber: 5
  }, void 0);
};
_s4(ScheduledDateTime, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c5 = ScheduledDateTime;
export const PriorityLabel = ({
  priority,
  showOnlyImportant
}) => {
  _s5();
  if (!priority)
    return null;
  const dataModel = useDataModel();
  const priorityTasks = dataModel?.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const id = typeof priority === "string" ? priority : priority?.value;
  const priorityFieldValue = priorityTasks?.find((priorityTask) => priorityTask.id === id);
  const isImportant = priorityFieldValue?.logicRole === TASK_PRIORITY_VALUE.IMPORTANT;
  if (showOnlyImportant && !isImportant)
    return null;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.priority_container,
    children: /* @__PURE__ */ _jsxDEV(Label, {
      overrideStyle: {
        backgroundColor: priorityFieldValue?.backgroundColor,
        color: priorityFieldValue?.textColor,
        borderColor: priorityFieldValue?.backgroundColor,
        textTransform: "initial"
      },
      size: "small",
      children: [isImportant && /* @__PURE__ */ _jsxDEV(Icon, {
        name: "flagFilled",
        size: 12,
        color: "softTomato"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 335,
        columnNumber: 25
      }, void 0), " "]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 326,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 325,
    columnNumber: 5
  }, void 0);
};
_s5(PriorityLabel, "8XDAeuH15vQZAWJRI6U9L0isc2w=", false, function() {
  return [useDataModel];
});
_c6 = PriorityLabel;
export const TimeZoneDisplay = ({
  bobject
}) => {
  const company = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const companyCountry = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.COUNTRY);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: companyCountry && /* @__PURE__ */ _jsxDEV("div", {
      className: clsx(styles._country, styles._s_hidden),
      children: /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: "Company country",
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "peanut",
          children: companyCountry
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 351,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 350,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 349,
      columnNumber: 9
    }, void 0)
  }, void 0, false);
};
_c7 = TimeZoneDisplay;
export const LinkedinComponent = ({
  value
}) => {
  return /* @__PURE__ */ _jsxDEV(IconButton, {
    size: 20,
    name: "linkedin",
    color: "bloobirds",
    onClick: (e) => {
      e.stopPropagation();
      e.preventDefault();
      window.open(addHttpIfNeeded(value), "_blank");
    }
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 363,
    columnNumber: 5
  }, void 0);
};
_c8 = LinkedinComponent;
export const CurrentLocalTime = ({
  task
}) => {
  const type = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
  const isScheduledEmail = type === TASK_TYPE.SCHEDULED_EMAIL;
  const currentTime = getTaskLocalTime(task);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: !isScheduledEmail && currentTime && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: currentTime?.length > 20 && currentTime,
      position: "top",
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: clsx(styles._now_time, styles._m_hidden),
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: "clock",
          size: 20,
          color: "darkBloobirds"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 386,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "darkBloobirds",
          ellipsis: 20,
          children: currentTime
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 387,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 385,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 384,
      columnNumber: 9
    }, void 0)
  }, void 0, false);
};
_c9 = CurrentLocalTime;
export const CadenceName = ({
  cadenceName
}) => {
  return cadenceName ? /* @__PURE__ */ _jsxDEV("div", {
    className: styles._cadence_name,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._separator
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 400,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Icon, {
      name: "cadence",
      size: 18,
      color: "softPeanut"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 401,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      color: "peanut",
      className: styles._cadence_name_text,
      children: cadenceName
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 402,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 399,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
};
_c10 = CadenceName;
var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
$RefreshReg$(_c, "NameComponent");
$RefreshReg$(_c2, "PlainTextComponent");
$RefreshReg$(_c3, "DescriptionComponent");
$RefreshReg$(_c4, "AmountComponent");
$RefreshReg$(_c5, "ScheduledDateTime");
$RefreshReg$(_c6, "PriorityLabel");
$RefreshReg$(_c7, "TimeZoneDisplay");
$RefreshReg$(_c8, "LinkedinComponent");
$RefreshReg$(_c9, "CurrentLocalTime");
$RefreshReg$(_c10, "CadenceName");
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

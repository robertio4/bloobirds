import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-components-column-BadgeDropdownContent.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/timeTable/components/column/BadgeDropdownContent.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/timeTable/components/column/BadgeDropdownContent.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useContext = __vite__cjsImport2_react["useContext"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { ActivityTimelineItem, BobjectName } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-activityTimelineItem-dist-index.js.js";
import { Button, Icon, Text, TimelineItem, useHover } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCustomTasks, useDataModel, useQuickLogActivity } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { useGetI18nSpacetime } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, LEAD_FIELDS_LOGIC_ROLE, MessagesEvents, TASK_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getFieldByLogicRole, getReferencedBobject, getReferencedBobjectFromLogicRole, getTextFromLogicRole, getValueFromLogicRole, injectReferenceFields, isDifferentYearThanCurrent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { isToday } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import { CadenceTableContext, CadenceTableImmutableContext } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-CadenceTable.tsx.js";
import { CadenceType } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceTable.type.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-timeTable.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const scheduledTaskFromNormalTask = (task, action) => {
  let iconColor;
  switch (action) {
    case CadenceType.call:
      iconColor = {
        icon: "phone",
        color: "extraCall"
      };
      break;
    case CadenceType.email:
      iconColor = {
        icon: "mail",
        color: "tangerine"
      };
      break;
    case CadenceType.autoEmail:
      iconColor = {
        icon: "autoMail",
        color: "tangerine"
      };
      break;
    case CadenceType.linkedIn:
      iconColor = {
        icon: "linkedin",
        color: "darkBloobirds"
      };
      break;
    case CadenceType.customTask:
      iconColor = {
        icon: "checkDouble",
        color: "bloobirds"
      };
      break;
    default:
      iconColor = {
        icon: getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_ICON).value,
        color: "peanut"
      };
      break;
  }
  const scheduledDate = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE)?.value;
  return {
    id: task.id.value,
    icon: iconColor.icon,
    color: iconColor.color,
    taskName: getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TITLE)?.value,
    taskDescription: getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION)?.value,
    lead: getReferencedBobjectFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD),
    date: new Date(scheduledDate)
  };
};
const scheduledTaskFromCustomTask = (task) => {
  _s();
  const {
    customTasks
  } = useCustomTasks({
    disabled: true
  });
  const customTask = customTasks?.find((ct) => ct.id === getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK)?.value);
  if (!customTask) {
    return scheduledTaskFromNormalTask(task, CadenceType.customTask);
  }
  const description = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION)?.value;
  const scheduledDate = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE)?.value;
  const lead = task.referencedBobjects[TASK_FIELDS_LOGIC_ROLE.LEAD];
  return {
    id: task.id.value,
    icon: customTask.icon,
    color: customTask.iconColor,
    taskName: customTask.name,
    taskDescription: description || customTask?.description,
    lead,
    date: new Date(scheduledDate)
  };
};
_s(scheduledTaskFromCustomTask, "NAm1pgTnKW66T8DHEBbsLdN1iUA=", false, function() {
  return [useCustomTasks];
});
const ScheduledTaskItem = (scheduledTask) => {
  _s2();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceTable.timetable.column"
  });
  const {
    t: datesT
  } = useTranslation("translation", {
    keyPrefix: "dates"
  });
  const isDifferentYear = isDifferentYearThanCurrent(scheduledTask.date);
  const isThisDay = isToday(scheduledTask.date);
  const nonTranslatedTime = useGetI18nSpacetime(new Date(scheduledTask.date)).format(isDifferentYear ? datesT("shortYear") : datesT("shortMonth"));
  const timeToShow = isThisDay ? t("today") : nonTranslatedTime;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.scheduledTaskItemWrapper,
    children: /* @__PURE__ */ _jsxDEV(TimelineItem, {
      size: "small",
      backgroundColor: "lightestBloobirds",
      data: {
        icon: /* @__PURE__ */ _jsxDEV(Icon, {
          name: scheduledTask.icon,
          color: scheduledTask.color,
          size: 14
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 140,
          columnNumber: 17
        }, void 0),
        color: scheduledTask.color,
        description: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.descriptionContainer,
          children: [scheduledTask.lead && /* @__PURE__ */ _jsxDEV(BobjectName, {
            activityBobjectName: getTextFromLogicRole(scheduledTask.lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
            ellipsis: "80%"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 146,
            columnNumber: 17
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "xxs",
            color: "softPeanut",
            inline: true,
            children: scheduledTask.taskDescription
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 154,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 144,
          columnNumber: 13
        }, void 0),
        iconColor: scheduledTask.color,
        date: timeToShow,
        dashedBorder: true
      },
      activeHover: true,
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.scheduledTask_header,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          children: scheduledTask?.taskName
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 166,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 165,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 135,
    columnNumber: 5
  }, void 0);
};
_s2(ScheduledTaskItem, "vMQfajL25zmM+bTav4e+flc7+ws=", false, function() {
  return [useTranslation, useTranslation, useGetI18nSpacetime];
});
_c = ScheduledTaskItem;
const CompletedActivityItem = ({
  activity,
  dataModel,
  closeDropdown,
  date
}) => {
  _s3();
  const [ref, hovering] = useHover();
  const {
    onClickActivityExternal,
    onClickActivityView,
    onClickActivityEdit,
    hideActivityHover
  } = useContext(CadenceTableImmutableContext);
  const {
    timeWindow
  } = useContext(CadenceTableContext);
  const {
    customTasks
  } = useCustomTasks({
    disabled: false
  });
  const {
    openQuickLogModal
  } = useQuickLogActivity();
  const isStatusActivity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE).text === "Status";
  const activityCustomTask = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const customTask = customTasks?.find((ct) => ct.id === activityCustomTask);
  const activityCompany = getReferencedBobjectFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);
  return /* @__PURE__ */ _jsxDEV("div", {
    ref,
    style: {
      maxHeight: 48,
      cursor: "pointer"
    },
    onClick: () => onClickActivityView(activity, timeWindow, date),
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.dropdown_item_actions,
      style: {
        visibility: hovering && !hideActivityHover ? "visible" : "hidden"
      },
      children: [onClickActivityEdit && !isStatusActivity && /* @__PURE__ */ _jsxDEV(Button, {
        iconLeft: "edit",
        size: "small",
        variant: "secondary",
        onClick: () => {
          closeDropdown();
          if (customTask) {
            openQuickLogModal({
              customTask,
              leads: [],
              selectedBobject: getReferencedBobject(activity),
              companyId: activityCompany?.id.value,
              onSubmit: () => {
                window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                  detail: {
                    type: BobjectTypes.Activity
                  }
                }));
              },
              isEdition: true,
              activity
            });
          } else {
            onClickActivityEdit(activity);
          }
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 219,
        columnNumber: 11
      }, void 0), onClickActivityExternal && /* @__PURE__ */ _jsxDEV(Button, {
        iconLeft: "externalLink",
        size: "small",
        variant: "secondary",
        onClick: () => {
          closeDropdown();
          onClickActivityExternal(activity);
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 249,
        columnNumber: 11
      }, void 0), onClickActivityView && /* @__PURE__ */ _jsxDEV(Button, {
        iconLeft: "eye",
        size: "small",
        variant: "secondary",
        onClick: () => {
          closeDropdown();
          onClickActivityView(activity, timeWindow, date);
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 260,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 214,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ActivityTimelineItem, {
      activity,
      startDisplayDivider: false,
      endDisplayDivider: false,
      dataModel,
      disableButtons: true,
      hovering,
      customTasks
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 271,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 209,
    columnNumber: 5
  }, void 0);
};
_s3(CompletedActivityItem, "0txIW7e9RsomOx7cL6UHr0FTBBM=", false, function() {
  return [useHover, useCustomTasks, useQuickLogActivity];
});
_c2 = CompletedActivityItem;
export const BadgeDropdownContent = ({
  dayTasks,
  cadenceAction,
  closeDropdown,
  date
}) => {
  _s4();
  const actions = dayTasks[cadenceAction];
  const isCustomTask = cadenceAction === "customTask";
  const dataModel = useDataModel();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.dropdown,
    children: [isCustomTask ? actions.tasks.filter((task) => {
      const customTask = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK)?.value;
      const hasActivity = actions.activities.find((activity) => {
        return getFieldByLogicRole(activity.formBobject, ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK)?.value === customTask;
      });
      return !hasActivity;
    }).map((task) => /* @__PURE__ */ _jsxDEV(ScheduledTaskItem, {
      ...scheduledTaskFromCustomTask(injectReferenceFields(task))
    }, task.id.value, false, {
      fileName: _jsxFileName,
      lineNumber: 308,
      columnNumber: 15
    }, void 0)) : actions.tasks.slice(0, actions.tasks.length - actions.activities.length).map((task) => /* @__PURE__ */ _jsxDEV(ScheduledTaskItem, {
      ...scheduledTaskFromNormalTask(injectReferenceFields(task), cadenceAction)
    }, task.id.value, false, {
      fileName: _jsxFileName,
      lineNumber: 318,
      columnNumber: 15
    }, void 0)), dataModel && actions.activities.map((activity) => /* @__PURE__ */ _jsxDEV(CompletedActivityItem, {
      activity: injectReferenceFields(activity.formBobject),
      dataModel,
      closeDropdown,
      date
    }, activity.id.value, false, {
      fileName: _jsxFileName,
      lineNumber: 325,
      columnNumber: 11
    }, void 0))]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 293,
    columnNumber: 5
  }, void 0);
};
_s4(BadgeDropdownContent, "8XDAeuH15vQZAWJRI6U9L0isc2w=", false, function() {
  return [useDataModel];
});
_c3 = BadgeDropdownContent;
var _c, _c2, _c3;
$RefreshReg$(_c, "ScheduledTaskItem");
$RefreshReg$(_c2, "CompletedActivityItem");
$RefreshReg$(_c3, "BadgeDropdownContent");
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

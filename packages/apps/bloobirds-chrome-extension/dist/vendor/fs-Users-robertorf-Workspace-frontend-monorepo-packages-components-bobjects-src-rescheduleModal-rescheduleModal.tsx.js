import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-rescheduleModal-rescheduleModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/rescheduleModal/rescheduleModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/rescheduleModal/rescheduleModal.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Checkbox, DateTimeShortcut, IconButton, Modal, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCadenceInfo, useUserTimeZone } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getFieldByLogicRole, getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { CustomDateDialog } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-customDateDialog-customDateDialog.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-rescheduleModal-rescheduleModal.module.css.js";
import { useRescheduleModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-rescheduleModal-useRescheduleModal.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const RescheduleModal = ({
  bobject,
  onClose,
  onSave
}) => {
  _s();
  const {
    handleSubmit
  } = useRescheduleModal();
  const userTimeZone = useUserTimeZone();
  const [customDateVisible, setCustomDateVisible] = useState(false);
  const [rescheduleWholeCadence, setRescheduleWholeCadence] = useState(false);
  const taskStepId = !Array.isArray(bobject) ? getValueFromLogicRole(bobject, "TASK__CADENCE_STEP_ID") : null;
  const taskCadenceId = !Array.isArray(bobject) ? getValueFromLogicRole(bobject, "TASK__CADENCE") : null;
  const status = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const isCompleted = [TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED, TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE].includes(status);
  const isRejected = status === TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED;
  const company = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
  const mainBobject = opportunity || lead || company;
  const {
    getCadenceById
  } = useCadenceInfo(mainBobject);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "bobjects.rescheduleModal"
  });
  const cadenceEntity = getCadenceById(taskCadenceId);
  const {
    error
  } = useSWR(!Array.isArray(bobject) && taskCadenceId && taskStepId ? "stepId" + bobject.id.value : null, async () => {
    try {
      return await api.get(`/messaging/cadences/${taskCadenceId}/steps/${taskStepId}`);
    } catch (error2) {
      const resError = new Error("Error fetching data");
      resError.status = error2.response.status;
      throw resError;
    }
  });
  const getFormattedHour = () => {
    const dateTimeInfo = !Array.isArray(bobject) ? new Date(getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME)) : null;
    return dateTimeInfo && dateTimeInfo.getHours() !== 0 ? dateTimeInfo.getHours() + ":" + dateTimeInfo.getMinutes() : "8:00";
  };
  const taskTime = getFormattedHour();
  const tomorrowMorning = spacetime().startOf("day").add(1, "day").time(taskTime).toNativeDate();
  const nextMondayDatetime = spacetime().startOf("week").add(1, "week").time(taskTime).toNativeDate();
  const inTwoDays = spacetime().startOf("day").add(2, "day").time(taskTime).toNativeDate();
  const inOneWeek = spacetime().startOf("day").add(1, "week").time(taskTime).toNativeDate();
  const handleSave = async (date) => {
    handleSubmit({
      bobject,
      data: date,
      rescheduleWholeCadence
    }).then(() => {
      setCustomDateVisible(false);
      onSave();
      onClose();
    });
  };
  if (customDateVisible) {
    return /* @__PURE__ */ _jsxDEV(CustomDateDialog, {
      bobject,
      onCancel: () => setCustomDateVisible(false),
      onSubmit: async (date) => {
        const offsetDate = spacetime().goto(userTimeZone).year(date.getFullYear()).month(date.getMonth()).date(date.getDate()).hour(date.getHours()).minute(date.getMinutes()).toNativeDate();
        await handleSave(offsetDate);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 7
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(Modal, {
    className: styles.modal,
    open: true,
    onClose,
    children: [/* @__PURE__ */ _jsxDEV("header", {
      className: styles.header,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "xl",
        children: t("title")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 134,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
        size: 40,
        name: "cross",
        color: "bloobirds",
        onClick: onClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 135,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("main", {
      className: styles.content,
      children: [
        cadenceEntity?.reschedulableMode === "RESCHEDULABLE" && !isCompleted && !isRejected && /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: error?.status === 404 ? t("error") : null,
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(Checkbox, {
            checked: rescheduleWholeCadence,
            onClick: () => setRescheduleWholeCadence(!rescheduleWholeCadence),
            size: "small",
            disabled: error?.status === 404,
            expand: true,
            children: t("rescheduleWholeCadence")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 142,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 141,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ _jsxDEV("div", {
          className: styles.shortcuts,
          children: [/* @__PURE__ */ _jsxDEV(DateTimeShortcut, {
            timezone: userTimeZone,
            text: t("tomorrow"),
            date: tomorrowMorning,
            onClick: handleSave
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 155,
            columnNumber: 11
          }, void 0), /* @__PURE__ */ _jsxDEV(DateTimeShortcut, {
            timezone: userTimeZone,
            text: t("nextMonday"),
            date: nextMondayDatetime,
            onClick: handleSave
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 161,
            columnNumber: 11
          }, void 0), /* @__PURE__ */ _jsxDEV(DateTimeShortcut, {
            timezone: userTimeZone,
            text: t("inTwoDays"),
            date: inTwoDays,
            onClick: handleSave
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 167,
            columnNumber: 11
          }, void 0), /* @__PURE__ */ _jsxDEV(DateTimeShortcut, {
            timezone: userTimeZone,
            text: t("inOneWeek"),
            date: inOneWeek,
            onClick: handleSave
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 173,
            columnNumber: 11
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 154,
          columnNumber: 9
        }, void 0),
        /* @__PURE__ */ _jsxDEV(Button, {
          className: styles.customButton,
          expand: true,
          variant: "tertiary",
          uppercase: true,
          iconLeft: "calendar",
          onClick: () => setCustomDateVisible(true),
          children: t("selectDateAndTime")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 180,
          columnNumber: 9
        }, void 0)
      ]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 132,
    columnNumber: 5
  }, void 0);
};
_s(RescheduleModal, "W+iLdnVuk3sco1Vx4mb+8HOeM3E=", false, function() {
  return [useRescheduleModal, useUserTimeZone, useCadenceInfo, useTranslation, useSWR];
});
_c = RescheduleModal;
var _c;
$RefreshReg$(_c, "RescheduleModal");
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

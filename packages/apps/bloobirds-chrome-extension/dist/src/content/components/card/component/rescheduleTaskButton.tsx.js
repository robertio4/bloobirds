import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/card/component/rescheduleTaskButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/component/rescheduleTaskButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/component/rescheduleTaskButton.tsx", _s2 = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CardButton, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE, TASK_TYPE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import __vite__cjsImport5_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport5_mixpanelBrowser.__esModule ? __vite__cjsImport5_mixpanelBrowser.default : __vite__cjsImport5_mixpanelBrowser;
import { useCadences } from "/src/hooks/useCadences.ts.js";
import { getFieldByLogicRole, getRelatedBobjectTypeName, getTextFromLogicRole } from "/src/utils/bobjects.utils.ts.js";
import { MIXPANEL_EVENTS } from "/src/utils/mixpanel.ts.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const RescheduleTaskButton = ({
  bobject: task
}) => {
  _s2();
  var _s = $RefreshSig$();
  const {
    setOpenedModalInfo
  } = useSubhomeContext();
  const {
    t
  } = useTranslation();
  const getTaskActiveStatus = () => {
    const taskStatus = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
    const isCompleted = TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED === taskStatus || TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE === taskStatus;
    const isRejected = TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED === taskStatus;
    const isProspect = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole === TASK_TYPE.PROSPECT_CADENCE;
    return isProspect && !isCompleted && !isRejected;
  };
  const getCadenceEntity = () => {
    _s();
    const taskRelatedBobjectType = getRelatedBobjectTypeName(task);
    const cadenceId = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CADENCE);
    const {
      cadences: cadencesEntities
    } = useCadences(taskRelatedBobjectType);
    return cadencesEntities?.find((cadenceElement) => cadenceElement?.id === cadenceId);
  };
  _s(getCadenceEntity, "C7eR+RaaAKtoIPZhBPZmznTvOOA=", false, function() {
    return [useCadences];
  });
  const isActiveTask = getTaskActiveStatus();
  const cadenceEntity = getCadenceEntity();
  const isNextStep = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE).valueLogicRole === TASK_TYPE.NEXT_STEP;
  const shouldDisplayButton = cadenceEntity?.reschedulableMode === "RESCHEDULABLE" && isActiveTask || isNextStep;
  return shouldDisplayButton && /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: t("extension.card.rescheduleTask"),
    position: "top",
    children: /* @__PURE__ */ _jsxDEV(CardButton, {
      dataTest: "task-reschedule",
      iconLeft: "clock",
      variant: "secondary",
      color: "bloobirds",
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        mixpanel.track(MIXPANEL_EVENTS.HOME_RESCHEDULE_ACTION_CLICKED_ON_SINGLE_CARD);
        setOpenedModalInfo({
          openedModal: "reschedule",
          bobject: task
        });
      },
      size: "small"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 63,
    columnNumber: 7
  }, void 0);
};
_s2(RescheduleTaskButton, "zPSzJkHbxuPn0z6jE/QBYIOPU9Y=", false, function() {
  return [useSubhomeContext, useTranslation];
});
_c = RescheduleTaskButton;
var _c;
$RefreshReg$(_c, "RescheduleTaskButton");
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

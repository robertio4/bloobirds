import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/taskButtons/components/rescheduleButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/taskButtons/components/rescheduleButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/taskButtons/components/rescheduleButton.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CardButton, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useIsB2CAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, TASK_TYPE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, injectReferencedBobjects } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport7_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport7_mixpanelBrowser.__esModule ? __vite__cjsImport7_mixpanelBrowser.default : __vite__cjsImport7_mixpanelBrowser;
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { MIXPANEL_EVENTS } from "/src/utils/mixpanel.ts.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const RescheduleTaskButton = ({
  task
}) => {
  _s();
  const {
    setOpenedModalInfo
  } = useSubhomeContext();
  const isB2CAccount = useIsB2CAccount();
  const {
    t
  } = useTranslation();
  const {
    data: cadenceEntities
  } = useSWR("/taskFeed/cadences", () => api.get(`/messaging/cadences/?bobjectTypes=${!isB2CAccount ? BobjectTypes.Company : ""},${BobjectTypes.Lead},${BobjectTypes.Opportunity}`).then((response) => response.data));
  const cadenceEntity = cadenceEntities?.cadences.find((cadenceElement) => cadenceElement?.id === task.cadenceId);
  const isNextStep = task.type === TASK_TYPE.NEXT_STEP;
  const shouldDisplayButton = cadenceEntity?.reschedulableMode === "RESCHEDULABLE" || isNextStep;
  return shouldDisplayButton && /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: t("extension.card.rescheduleTask"),
    position: "top",
    children: /* @__PURE__ */ _jsxDEV(CardButton, {
      dataTest: "task-reschedule",
      iconLeft: "clock",
      variant: "secondary",
      color: "bloobirds",
      onClick: async (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        const taskBobject = await api.get(`/bobjects/${task?.id}/form?injectReferences=true`);
        mixpanel.track(MIXPANEL_EVENTS.HOME_RESCHEDULE_ACTION_CLICKED_ON_SINGLE_CARD);
        setOpenedModalInfo({
          openedModal: "reschedule",
          bobject: injectReferencedBobjects(taskBobject?.data)
        });
      },
      size: "small"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 37,
    columnNumber: 7
  }, void 0);
};
_s(RescheduleTaskButton, "QSXYXXljPr2WwP0gDicHuYD+5bc=", false, function() {
  return [useSubhomeContext, useIsB2CAccount, useTranslation, useSWR];
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/card/component/editTaskButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/component/editTaskButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/component/editTaskButton.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CardButton, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMinimizableModals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { TASK_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import __vite__cjsImport6_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport6_mixpanelBrowser.__esModule ? __vite__cjsImport6_mixpanelBrowser.default : __vite__cjsImport6_mixpanelBrowser;
import { getFieldByLogicRole } from "/src/utils/bobjects.utils.ts.js";
import { MIXPANEL_EVENTS } from "/src/utils/mixpanel.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const EditTaskButton = ({
  bobject: task
}) => {
  _s();
  const {
    t
  } = useTranslation();
  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const {
    setContactViewBobjectId,
    setCurrentTask
  } = useExtensionContext();
  const openTaskModal = (event) => {
    event.preventDefault();
    event.stopPropagation();
    mixpanel.track(MIXPANEL_EVENTS.BUBBLE_HOME_EDIT_TASK_ACTION_CHROME_EXTENSION);
    if (opportunity) {
      setContactViewBobjectId(opportunity?.id.value);
    } else if (lead) {
      setContactViewBobjectId(lead?.id.value);
    } else if (company) {
      setContactViewBobjectId(company?.id.value);
    } else {
      setCurrentTask(task);
    }
    openMinimizableModal({
      type: "task",
      data: {
        [task?.id.typeName.toLowerCase()]: task,
        location: "bubble",
        bobjectId: task?.id?.value,
        company,
        lead,
        opportunity
      }
    });
  };
  return /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: t("extension.card.editTaskButton"),
    position: "top",
    children: /* @__PURE__ */ _jsxDEV(CardButton, {
      dataTest: "task-edit",
      iconLeft: "edit",
      variant: "secondary",
      color: "bloobirds",
      onClick: openTaskModal,
      size: "small"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 50,
    columnNumber: 5
  }, void 0);
};
_s(EditTaskButton, "o8mqPoxGePAEA/OSOgSetBGbebA=", false, function() {
  return [useTranslation, useMinimizableModals, useExtensionContext];
});
_c = EditTaskButton;
var _c;
$RefreshReg$(_c, "EditTaskButton");
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

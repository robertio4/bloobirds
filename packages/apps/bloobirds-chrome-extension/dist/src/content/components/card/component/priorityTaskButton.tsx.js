import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/card/component/priorityTaskButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/component/priorityTaskButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/component/priorityTaskButton.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, Tooltip, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { BobjectTypes, MessagesEvents, TASK_FIELDS_LOGIC_ROLE, TASK_PRIORITY_VALUE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, isImportantTask } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useSWRConfig } from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { getFieldByLogicRole } from "/src/utils/bobjects.utils.ts.js";
import styles from "/src/content/components/contactView/components/miniCard/miniCard.module.css.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const PriorityTaskButton = ({
  bobject: task
}) => {
  _s();
  const {
    t
  } = useTranslation();
  const {
    useGetActiveBobject
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const {
    createToast
  } = useToasts();
  const {
    cache: swrCache
  } = useSWRConfig();
  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const handleChangePriority = (e) => {
    e.preventDefault();
    e.stopPropagation();
    api.patch(`/bobjects/${task?.id.value}/raw`, {
      contents: {
        [TASK_FIELDS_LOGIC_ROLE.PRIORITY]: isImportantTask(task) ? TASK_PRIORITY_VALUE.NO_PRIORITY : TASK_PRIORITY_VALUE.IMPORTANT
      },
      params: {
        skipEmptyUpdates: true
      }
    }).then(() => {
      createToast({
        type: "success",
        message: t("extension.card.toasts.changesSaved.success")
      });
      window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: {
          type: BobjectTypes.Task
        }
      }));
      if (activeBobject?.id.typeName === BobjectTypes.Lead && company || activeBobject?.id.typeName === BobjectTypes.Company && lead) {
        const bobjectToClear = activeBobject?.id.typeName === BobjectTypes.Lead ? company : lead;
        swrCache.delete(`/tasksFeed/${bobjectToClear?.id?.value}/1`);
      }
    });
  };
  return /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: t(`extension.card.${isImportantTask(task) ? "unmarkAsImportant" : "markAsImportant"}`),
    position: "top",
    children: /* @__PURE__ */ _jsxDEV(Button, {
      dataTest: styles.iconButton,
      size: "small",
      variant: "secondary",
      onClick: handleChangePriority,
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: "flagFilled",
        size: 12,
        color: "bloobirds"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 58,
    columnNumber: 5
  }, void 0);
};
_s(PriorityTaskButton, "r/bXVa7El3D3mYUNhLM8a8RNh8g=", true, function() {
  return [useTranslation, useExtensionContext, useToasts, useSWRConfig];
});
_c = PriorityTaskButton;
var _c;
$RefreshReg$(_c, "PriorityTaskButton");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/card/component/miniSkipTaskButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/component/miniSkipTaskButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/component/miniSkipTaskButton.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CardButton, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useOpenSkipTaskModal, useSkipModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, MessagesEvents, MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import __vite__cjsImport6_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport6_mixpanelBrowser.__esModule ? __vite__cjsImport6_mixpanelBrowser.default : __vite__cjsImport6_mixpanelBrowser;
import styles from "/src/content/components/card/card.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const MiniSkipTaskButton = ({
  task
}) => {
  _s();
  const {
    openSkipTaskModal
  } = useOpenSkipTaskModal();
  const {
    hasSkipReasons,
    skipTask
  } = useSkipModal();
  const {
    t
  } = useTranslation();
  const onSaveCallback = () => {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
      detail: {
        type: BobjectTypes.Task
      }
    }));
  };
  return /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: t("extension.card.skipTask"),
    position: "top",
    children: /* @__PURE__ */ _jsxDEV(CardButton, {
      className: styles.skipTask_button,
      iconLeft: "skipForward",
      dataTest: "Skip-Task",
      variant: "secondary",
      onClick: (event) => {
        mixpanel.track(MIXPANEL_EVENTS.SKIP_TASK_FROM_CARD);
        event.preventDefault();
        event.stopPropagation();
        if (hasSkipReasons) {
          openSkipTaskModal(task, onSaveCallback);
        } else {
          skipTask(task).then(() => onSaveCallback());
        }
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 24,
    columnNumber: 5
  }, void 0);
};
_s(MiniSkipTaskButton, "JGOiiJceAOg3eNtV9HugpiGK868=", false, function() {
  return [useOpenSkipTaskModal, useSkipModal, useTranslation];
});
_c = MiniSkipTaskButton;
var _c;
$RefreshReg$(_c, "MiniSkipTaskButton");
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

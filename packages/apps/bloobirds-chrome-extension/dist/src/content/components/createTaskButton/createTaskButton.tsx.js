import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/createTaskButton/createTaskButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/createTaskButton/createTaskButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/createTaskButton/createTaskButton.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--9ab99a23.js";
import { Button } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--cd8e33f0.js";
import { useMinimizableModals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const CreateTaskButton = ({
  bobject,
  location = "bubble",
  displayCondition = true,
  className
}) => {
  _s();
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const {
    t
  } = useTranslation();
  function handleAddTask(e) {
    e.stopPropagation();
    e.preventDefault();
    openMinimizableModal({
      type: "task",
      data: {
        ...bobject ? {
          [bobject.id.typeName.toLowerCase()]: bobject
        } : {},
        location
      }
    });
  }
  return displayCondition && /* @__PURE__ */ _jsxDEV(Button, {
    iconLeft: "plus",
    size: "small",
    onClick: handleAddTask,
    className
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 35,
    columnNumber: 7
  }, void 0);
};
_s(CreateTaskButton, "O4+xEVCLIw5v83PWCDxcy8NjpLo=", false, function() {
  return [useMinimizableModals, useTranslation];
});
_c = CreateTaskButton;
export default CreateTaskButton;
var _c;
$RefreshReg$(_c, "CreateTaskButton");
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

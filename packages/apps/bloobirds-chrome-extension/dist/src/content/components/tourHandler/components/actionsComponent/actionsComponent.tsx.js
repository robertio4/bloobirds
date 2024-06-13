import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/tourHandler/components/actionsComponent/actionsComponent.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/tourHandler/components/actionsComponent/actionsComponent.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/tourHandler/components/actionsComponent/actionsComponent.tsx", _s = $RefreshSig$();
import { useActiveAccountId, useNewCadenceTableEnabled, useWhatsappEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ContactViewAction, ContactViewActions } from "/src/content/components/contactView/components/contactViewActions/contactViewActions.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const actionsDictionary = (hasQuickLog, hasWhatsapp) => [{
  color: "extraCall",
  icon: "phone"
}, {
  color: "tangerine",
  icon: "mail"
}, {
  color: "darkBloobirds",
  icon: "linkedin"
}, ...[hasWhatsapp && {
  color: "whatsapp",
  icon: "whatsapp"
}], {
  color: "softBloobirds",
  icon: "taskAction"
}, {
  color: "banana",
  icon: "noteAction"
}, {
  color: "tomato",
  icon: "calendar"
}, ...[hasQuickLog && {
  color: "grape",
  icon: "zap"
}], {
  color: "bloobirds",
  icon: "agendaPerson"
}];
export const ActionsComponent = () => {
  _s();
  const accountId = useActiveAccountId();
  const hasQuickLog = useNewCadenceTableEnabled(accountId);
  const hasWhatsApp = useWhatsappEnabled(accountId);
  const actions = actionsDictionary(hasQuickLog, hasWhatsApp).filter(Boolean);
  return /* @__PURE__ */ _jsxDEV(ContactViewActions, {
    children: actions.map((action) => /* @__PURE__ */ _jsxDEV(ContactViewAction, {
      ...action
    }, `${action.icon}_action_component`, false, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 9
    }, void 0))
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 55,
    columnNumber: 5
  }, void 0);
};
_s(ActionsComponent, "ioUdpgBqMVZ/RzfsVEwOSr8id/c=", false, function() {
  return [useActiveAccountId, useNewCadenceTableEnabled, useWhatsappEnabled];
});
_c = ActionsComponent;
var _c;
$RefreshReg$(_c, "ActionsComponent");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectItem-utils-actionButtons.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectItem/utils/actionButtons.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectItem/utils/actionButtons.tsx", _s = $RefreshSig$();
import { Action } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useAircallPhoneLinkEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { SearchAction } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectItem-bobjectItem.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function SearchBarAction(color, icon, handleClick) {
  return /* @__PURE__ */ _jsxDEV(Action, {
    color,
    icon,
    onClick: (e) => {
      e.stopPropagation();
      e.preventDefault();
      handleClick(e);
    }
  }, `action-${icon}`, false, {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }, this);
}
_c = SearchBarAction;
function CallAction(handleClick) {
  return SearchBarAction("melon", "phone", handleClick);
}
_c2 = CallAction;
function EmailAction(handleClick) {
  return SearchBarAction("tangerine", "mail", handleClick);
}
_c3 = EmailAction;
function WhatsAction(handleClick) {
  return SearchBarAction("whatsapp", "whatsapp", handleClick);
}
_c4 = WhatsAction;
function LinkedInAction(handleClick) {
  return SearchBarAction("darkBloobirds", "linkedin", handleClick);
}
_c5 = LinkedInAction;
function MeetingAction(handleClick) {
  return SearchBarAction("tomato", "calendar", handleClick);
}
_c6 = MeetingAction;
function MainBobjectActions(doAction) {
  _s();
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [!hasAircallPhoneLinkEnabled && CallAction((e) => doAction(SearchAction.Call, e)), EmailAction((e) => doAction(SearchAction.Email, e)), WhatsAction((e) => doAction(SearchAction.WhatsApp, e)), LinkedInAction((e) => doAction(SearchAction.LinkedIn, e)), MeetingAction((e) => doAction(SearchAction.Meeting, e))]
  }, void 0, true);
}
_s(MainBobjectActions, "y52ZTn40aX2xIySjFxGplKbXX+k=", false, function() {
  return [useAircallPhoneLinkEnabled];
});
_c7 = MainBobjectActions;
export function BobjectActions({
  bobject,
  closeModal,
  handleActionOnClick
}) {
  const doAction = (action, event) => {
    handleActionOnClick?.(event, action, bobject);
    closeModal();
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.bobjectItemSelectedActionsColumn,
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.bobjectItemSelectedActionsRow,
      children: MainBobjectActions(doAction)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 83,
    columnNumber: 5
  }, this);
}
_c8 = BobjectActions;
var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
$RefreshReg$(_c, "SearchBarAction");
$RefreshReg$(_c2, "CallAction");
$RefreshReg$(_c3, "EmailAction");
$RefreshReg$(_c4, "WhatsAction");
$RefreshReg$(_c5, "LinkedInAction");
$RefreshReg$(_c6, "MeetingAction");
$RefreshReg$(_c7, "MainBobjectActions");
$RefreshReg$(_c8, "BobjectActions");
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

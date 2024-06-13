import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/whatsappRenderer/components/WhatsappButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/whatsappRenderer/components/WhatsappButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/whatsappRenderer/components/WhatsappButton.tsx", _s = $RefreshSig$();
import { Icon, Spinner, Tooltip, useHover } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import __vite__cjsImport3_classnames from "/vendor/.vite-deps-classnames.js__v--b33663e5.js"; const classNames = __vite__cjsImport3_classnames.__esModule ? __vite__cjsImport3_classnames.default : __vite__cjsImport3_classnames;
import styles from "/src/content/components/whatsappRenderer/whatsapp.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const WhatsappButton = ({
  status,
  type,
  t,
  leadName,
  onClick
}) => {
  _s();
  const isConversation = type === "conversation";
  const [hoverRef, isHover] = useHover();
  let color;
  let text;
  let tooltipTitle;
  switch (status) {
    case "enabled":
      color = "bloobirds";
      text = isConversation ? "Sync Conversation" : "Sync";
      tooltipTitle = isConversation ? t("whatsapp.conversation.syncWithBoobject", {
        name: leadName
      }) : t("whatsapp.messages.syncWithBoobject", {
        name: leadName
      });
      break;
    case "success":
      color = "white";
      text = isConversation ? "Conversation synced" : "Synced";
      tooltipTitle = isConversation ? t("whatsapp.conversation.alreadySynced") : t("whatsapp.messages.alreadySynced");
      break;
    case "error":
      color = "tomato";
      text = isConversation ? "Sync Failed!" : "Failed!";
      tooltipTitle = isConversation ? t("whatsapp.conversation.errorSyncing") : t("whatsapp.messages.errorSyncing");
      break;
    case "loading":
      color = "bloobirds";
      text = /* @__PURE__ */ _jsxDEV(Spinner, {
        size: 8,
        name: "loadingCircle"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 14
      }, void 0);
      tooltipTitle = isConversation ? t("whatsapp.conversation.syncing") : t("whatsapp.messages.syncing");
      break;
    case "disabled":
      color = "softPeanut";
      text = isConversation ? "Sync Conversation" : "Sync";
      tooltipTitle = isConversation ? t("whatsapp.conversation.noContactMatch") : t("whatsapp.messages.noContactMatch");
  }
  const handleClick = (e) => {
    onClick?.(e);
  };
  const classes = classNames(styles.button, styles[status], {
    [styles.conversation]: isConversation
  });
  if (status === "error" && !isConversation && hoverRef.current) {
    console.error("Error syncing whatsapp conversation");
    const btnsContainer = hoverRef.current?.closest("[data-bloobirds-button=true]")?.parentElement;
    const element = btnsContainer?.closest("[data-id]");
    if (btnsContainer && !isConversation) {
      btnsContainer.style.width = "120px";
      if (element && element.dataset.id.split("_")[0] === "true") {
        btnsContainer.style.left = "-130px";
      } else {
        btnsContainer.style.right = "-130px";
      }
    }
  }
  return /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: tooltipTitle,
    position: "top",
    expand: true,
    children: /* @__PURE__ */ _jsxDEV("button", {
      ref: hoverRef,
      className: classes,
      onClick: status !== "loading" && status !== "success" ? handleClick : void 0,
      type: "button",
      "data-test": "Button-whatsapp",
      disabled: status === "disabled",
      children: [/* @__PURE__ */ _jsxDEV(Icon, {
        name: "bloobirds",
        color,
        size: 16
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 9
      }, void 0), isConversation || status === "loading" ? text : !isConversation && isHover ? text : null, status === "error" && /* @__PURE__ */ _jsxDEV(Icon, {
        name: "redoReload",
        color,
        size: 16
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 32
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 85,
    columnNumber: 5
  }, void 0);
};
_s(WhatsappButton, "wHQ5SMxJu0Yt91YTEaPHSzjDZLM=", false, function() {
  return [useHover];
});
_c = WhatsappButton;
export default WhatsappButton;
var _c;
$RefreshReg$(_c, "WhatsappButton");
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

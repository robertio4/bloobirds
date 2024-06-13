import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-components-selectableItem.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/recipientSearchInput/components/selectableItem.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/recipientSearchInput/components/selectableItem.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport2_react["useRef"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CircularBadge, Icon, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-recipientSearchInput.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SelectableItem = ({
  contact,
  selectContact,
  setSelectedIndex,
  selectedIndex,
  index,
  isOutsider = false
}) => {
  _s();
  const ref = useRef();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.components.recipientSearchInput"
  });
  if (index === selectedIndex && ref && ref.current) {
    ref.current.scrollIntoView({
      block: "nearest"
    });
  }
  return /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: isOutsider && t("selectableItemTooltip"),
    position: "top",
    children: /* @__PURE__ */ _jsxDEV("div", {
      ref,
      role: "option",
      "aria-selected": index === selectedIndex,
      id: `${contact.email}-option`,
      className: styles.item,
      onMouseEnter: () => {
        setSelectedIndex(index);
      },
      onMouseDown: (event) => {
        event.preventDefault();
        selectContact(contact);
      },
      children: [/* @__PURE__ */ _jsxDEV(CircularBadge, {
        size: "medium",
        style: {
          color: "white",
          backgroundColor: "var(--lightPeanut)"
        },
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: isOutsider ? "warning" : contact.icon
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 58,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          color: "bloobirds",
          size: "s",
          weight: "medium",
          children: contact.name
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 61,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          color: "softPeanut",
          size: "s",
          children: contact.email
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 9
      }, void 0)]
    }, contact.email, true, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 37,
    columnNumber: 5
  }, void 0);
};
_s(SelectableItem, "wyaZs1zKlhxYGJQNKta+mqh7XwU=", false, function() {
  return [useTranslation];
});
_c = SelectableItem;
var _c;
$RefreshReg$(_c, "SelectableItem");
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

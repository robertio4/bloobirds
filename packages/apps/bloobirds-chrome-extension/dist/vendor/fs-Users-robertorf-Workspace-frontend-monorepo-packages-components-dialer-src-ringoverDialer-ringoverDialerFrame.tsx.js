import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-ringoverDialer-ringoverDialerFrame.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/ringoverDialer/ringoverDialerFrame.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/ringoverDialer/ringoverDialerFrame.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react;
import { Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { InfoWarning } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-dist-index.js.js";
import { MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { useRingoverDialer } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-ringoverDialer-hooks-useRingoverDialerVisibility.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-ringoverDialer-ringoverDialer.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const RingoverDialerFrame = _s(React.forwardRef(_c = _s((props, ref) => {
  _s();
  const {
    contact
  } = useRingoverDialer();
  const setContactViewBobjectId = (bobjectId) => {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension, {
      detail: {
        bobjectId
      }
    }));
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.airCall_dialer_container,
    id: "bb-ringover-dialer",
    children: [contact && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.airCall_dialer_contact,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.airCall_dialer_contact_names,
        children: [contact.leadName && /* @__PURE__ */ _jsxDEV("div", {
          className: styles.airCall_dialer_contact_name,
          onClick: () => setContactViewBobjectId(contact.leadId),
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "bloobirds",
            color: "bloobirds",
            size: 20
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 31,
            columnNumber: 17
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            color: "bloobirds",
            weight: "bold",
            className: styles.airCall_dialer_contact_name_text,
            children: contact.leadName
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 32,
            columnNumber: 17
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 27,
          columnNumber: 15
        }, void 0), contact.companyName && /* @__PURE__ */ _jsxDEV("div", {
          className: styles.airCall_dialer_contact_name,
          onClick: () => setContactViewBobjectId(contact.companyId),
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "company",
            color: "bloobirds",
            size: 16
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 47,
            columnNumber: 17
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "s",
            color: "bloobirds",
            className: styles.airCall_dialer_contact_name_text,
            children: contact.companyName
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 48,
            columnNumber: 17
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 15
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 11
      }, void 0), contact.multipleContacts && /* @__PURE__ */ _jsxDEV("div", {
        className: styles.airCall_dialer_contact_multiple,
        children: /* @__PURE__ */ _jsxDEV(InfoWarning, {
          message: "There are multiple records with this phone number"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 60,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 13
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      id: "ringover-phone",
      ref,
      className: styles.airCall_dialer
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 22,
    columnNumber: 5
  }, void 0);
}, "9fr8H+3AoAb8MwJd/fZ2E5qQfoo=", false, function() {
  return [useRingoverDialer];
})), "9fr8H+3AoAb8MwJd/fZ2E5qQfoo=", false, function() {
  return [useRingoverDialer];
});
_c2 = RingoverDialerFrame;
export default RingoverDialerFrame;
var _c, _c2;
$RefreshReg$(_c, "RingoverDialerFrame$React.forwardRef");
$RefreshReg$(_c2, "RingoverDialerFrame");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/wizardHelper/components/createInSfdcHelper/createInSfdcHelper.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/wizardHelper/components/createInSfdcHelper/createInSfdcHelper.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/wizardHelper/components/createInSfdcHelper/createInSfdcHelper.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Dropdown, Icon, Item, Spinner, Text, useToasts, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { createBobjectInSfdc } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import styles from "/src/content/components/contactView/components/wizardHelper/wizardHelper.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CreateInSfdcHelper = ({
  bobject
}) => {
  _s();
  const {
    ref,
    visible,
    setVisible
  } = useVisible();
  const [loading, setLoading] = useState(false);
  const isLead = bobject?.id?.typeName === "Lead";
  const {
    createToast
  } = useToasts();
  const {
    t
  } = useTranslation();
  const createInSfdc = (createContact) => {
    setLoading(true);
    createBobjectInSfdc(bobject?.id?.value, createContact).then(() => {
      window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: {
          type: bobject?.id?.typeName
        }
      }));
      createToast({
        message: t("sidePeek.overview.toasts.createInSalesforceSuccess", {
          bobject: bobject?.id?.typeName
        }),
        type: "success"
      });
      setLoading(false);
      setVisible(false);
    }).catch((e) => {
      createToast({
        message: t("sidePeek.overview.toasts.createBobjectInSfdcError", {
          bobject: bobject?.id?.typeName,
          message: e?.response?.data?.message ? `: ${e?.response?.data?.message}` : "."
        }),
        type: "error"
      });
      setLoading(false);
      setVisible(false);
    });
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.createsfdc__box,
    children: /* @__PURE__ */ _jsxDEV(Dropdown, {
      ref,
      visible,
      anchor: /* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        variant: "clear",
        color: "white",
        expand: true,
        uppercase: false,
        className: styles.createsfdc__button,
        onClick: () => isLead ? setVisible(true) : createInSfdc(false),
        children: loading ? /* @__PURE__ */ _jsxDEV(Spinner, {
          name: "loadingCircle",
          size: 16
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 72,
          columnNumber: 15
        }, void 0) : /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "white",
          weight: "bold",
          className: styles.button_text,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "plus",
            color: "white",
            size: 16
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 75,
            columnNumber: 17
          }, void 0), t("sidePeek.overview.createInSalesforce"), /* @__PURE__ */ _jsxDEV(Icon, {
            name: "salesforce",
            color: "white",
            size: 16
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 77,
            columnNumber: 17
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 74,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 11
      }, void 0),
      children: [/* @__PURE__ */ _jsxDEV(Item, {
        onClick: () => createInSfdc(false),
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: "personBody",
          color: "softTangerine"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 11
        }, void 0), t("sidePeek.overview.createAs", {
          bobject: "Lead"
        })]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        onClick: () => createInSfdc(true),
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: "personBody",
          color: "gradientPurple"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 88,
          columnNumber: 11
        }, void 0), t("sidePeek.overview.createAs", {
          bobject: "Contact"
        })]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 57,
    columnNumber: 5
  }, void 0);
};
_s(CreateInSfdcHelper, "2qyl9reSPYafXlLfLY1feJt6l54=", false, function() {
  return [useVisible, useToasts, useTranslation];
});
_c = CreateInSfdcHelper;
var _c;
$RefreshReg$(_c, "CreateInSfdcHelper");
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

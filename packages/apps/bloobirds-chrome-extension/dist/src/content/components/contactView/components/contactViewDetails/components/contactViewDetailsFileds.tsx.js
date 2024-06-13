import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/contactViewDetails/components/contactViewDetailsFileds.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewDetails/components/contactViewDetailsFileds.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewDetails/components/contactViewDetailsFileds.tsx", _s = $RefreshSig$();
import { Spinner } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { Source } from "/src/content/components/contactDetails/contactDetailSource/contactDetailSource.tsx.js";
import { NoFieldsSelectedToDisplay } from "/src/content/components/contactDetails/noFieldsSelectedToDisplay/noFieldsSelectedToDisplay.tsx.js";
import { NoSyncedBobject } from "/src/content/components/contactDetails/noSyncedBobject/noSyncedBobject.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/contactView/components/contactViewDetails/contactViewDetails.module.css.js";
import { ContactViewDetailsField } from "/src/content/components/contactView/components/contactViewDetails/components/contactViewDetailsField.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ContactViewDetailsFields = ({
  fields,
  isLoading,
  openExtendedScreen,
  salesforceId,
  source
}) => {
  _s();
  const {
    useGetSidePeekEnabled
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const detailContentClasses = clsx(styles.detail_content, {
    [styles.detail_content_sidePeek]: sidePeekEnabled
  });
  return !isLoading ? /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: fields?.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
      className: detailContentClasses,
      children: fields.map((field) => /* @__PURE__ */ _jsxDEV(ContactViewDetailsField, {
        field,
        sidePeekEnabled
      }, field?.fieldId, false, {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 13
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 9
    }, void 0) : salesforceId || source === Source.bloobirds ? /* @__PURE__ */ _jsxDEV("div", {
      className: styles.detail_content,
      children: /* @__PURE__ */ _jsxDEV(NoFieldsSelectedToDisplay, {
        hasButton: true,
        onClick: openExtendedScreen
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
      className: styles.detail_content,
      children: /* @__PURE__ */ _jsxDEV(NoSyncedBobject, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 9
    }, void 0)
  }, void 0, false) : /* @__PURE__ */ _jsxDEV("div", {
    className: styles.loadingSpinner,
    children: /* @__PURE__ */ _jsxDEV(Spinner, {
      name: "loadingCircle"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 55,
    columnNumber: 5
  }, void 0);
};
_s(ContactViewDetailsFields, "4i97H0v//x7XKvyGnqjsbPnAgHo=", true, function() {
  return [useExtensionContext];
});
_c = ContactViewDetailsFields;
var _c;
$RefreshReg$(_c, "ContactViewDetailsFields");
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

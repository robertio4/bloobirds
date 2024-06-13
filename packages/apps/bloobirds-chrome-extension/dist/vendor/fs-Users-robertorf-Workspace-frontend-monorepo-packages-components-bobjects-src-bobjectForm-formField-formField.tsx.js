import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-formField.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectForm/formField/formField.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectForm/formField/formField.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { DateField } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-dateField-dateField.tsx.js";
import { DecimalField } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-decimalField-decimalField.tsx.js";
import { EmailField } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-emailField-emailField.tsx.js";
import { NumberField } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-numberField-numberField.tsx.js";
import { PhoneField } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-phoneField-phoneField.tsx.js";
import { PicklistField } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-picklistField-picklistField.tsx.js";
import { ReferenceField } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-referenceField-referenceField.tsx.js";
import { TextField } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-textField-textField.tsx.js";
import { URLField } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-urlField-urlField.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const FormField = (props) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "bobjects.bobjectForm"
  });
  const providedProps = {
    ...props,
    requiredMessage: t("requiredMessage")
  };
  switch (props.type) {
    case "PICKLIST":
      return /* @__PURE__ */ _jsxDEV(PicklistField, {
        ...providedProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 14
      }, void 0);
    case "DATE":
      return /* @__PURE__ */ _jsxDEV(DateField, {
        ...providedProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 14
      }, void 0);
    case "DATETIME":
      return /* @__PURE__ */ _jsxDEV(DateField, {
        ...providedProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 14
      }, void 0);
    case "TEXT":
      return /* @__PURE__ */ _jsxDEV(TextField, {
        ...providedProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 14
      }, void 0);
    case "EMAIL":
      return /* @__PURE__ */ _jsxDEV(EmailField, {
        ...providedProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 14
      }, void 0);
    case "URL":
      return /* @__PURE__ */ _jsxDEV(URLField, {
        ...providedProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 14
      }, void 0);
    case "NUMBER":
      return /* @__PURE__ */ _jsxDEV(NumberField, {
        ...providedProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 14
      }, void 0);
    case "DECIMAL":
      return /* @__PURE__ */ _jsxDEV(DecimalField, {
        ...providedProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 14
      }, void 0);
    case "PHONE":
      return /* @__PURE__ */ _jsxDEV(PhoneField, {
        ...providedProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 14
      }, void 0);
    case "REFERENCE":
      return /* @__PURE__ */ _jsxDEV(ReferenceField, {
        ...providedProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 14
      }, void 0);
    default:
      return null;
  }
};
_s(FormField, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = FormField;
FormField.defaultProps = {
  style: "light"
};
var _c;
$RefreshReg$(_c, "FormField");
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

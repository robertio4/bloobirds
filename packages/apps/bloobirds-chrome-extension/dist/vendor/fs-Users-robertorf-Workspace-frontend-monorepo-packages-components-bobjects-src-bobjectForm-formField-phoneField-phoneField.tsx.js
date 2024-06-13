import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-phoneField-phoneField.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectForm/formField/phoneField/phoneField.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectForm/formField/phoneField/phoneField.tsx", _s = $RefreshSig$();
import { useController } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { isValidPhone } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { FormGroup, FormLabel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formGroup-formGroup.tsx.js";
import { Input } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-baseInput-baseInput.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const PhoneField = ({
  control,
  required,
  name,
  id,
  size = "small",
  requiredMessage
}) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "bobjects.bobjectForm"
  });
  const isPhoneValid = (value2) => {
    if (!value2 || value2 == "") {
      return true;
    }
    if (!isValidPhone(value2)) {
      return t("phoneNotValid");
    }
    return true;
  };
  const {
    field: {
      value,
      onChange,
      onBlur
    },
    fieldState: {
      error
    }
  } = useController({
    control,
    name: `fields.${id}`,
    rules: {
      validate: {
        isPhoneValid
      },
      required: {
        value: required,
        message: requiredMessage
      }
    }
  });
  return /* @__PURE__ */ _jsxDEV(FormGroup, {
    size,
    children: [size === "small" && /* @__PURE__ */ _jsxDEV(FormLabel, {
      required,
      children: name
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 28
    }, void 0), /* @__PURE__ */ _jsxDEV(Input, {
      value,
      onChange,
      onBlur,
      error: error?.message,
      size,
      placeholder: size === "small" ? void 0 : `${name}${required ? " *" : ""}`
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 47,
    columnNumber: 5
  }, void 0);
};
_s(PhoneField, "u61YlxLURAwHcl0PeldDT0exE/A=", false, function() {
  return [useTranslation, useController];
});
_c = PhoneField;
var _c;
$RefreshReg$(_c, "PhoneField");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-numberField-numberField.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectForm/formField/numberField/numberField.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectForm/formField/numberField/numberField.tsx", _s = $RefreshSig$();
import { useController } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { FormGroup, FormLabel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formGroup-formGroup.tsx.js";
import { Input } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-baseInput-baseInput.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const NumberField = ({
  control,
  required,
  name,
  id,
  size = "small",
  requiredMessage
}) => {
  _s();
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
      required: {
        value: required,
        message: requiredMessage
      }
    }
  });
  const handleChange = (newValue) => {
    if (newValue === "" || newValue === "-" || newValue.match(/^-?[0-9,.]+$/)) {
      newValue = newValue.replace(/,/g, "");
      newValue = newValue.replace(/\./g, "");
      newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      onChange(newValue);
    }
  };
  return /* @__PURE__ */ _jsxDEV(FormGroup, {
    size,
    children: [size === "small" && /* @__PURE__ */ _jsxDEV(FormLabel, {
      required,
      children: name
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 28
    }, void 0), /* @__PURE__ */ _jsxDEV(Input, {
      size,
      placeholder: size === "small" ? void 0 : `${name}${required ? " *" : ""}`,
      value,
      onChange: handleChange,
      onBlur,
      error: error?.message,
      type: "text"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 40,
    columnNumber: 5
  }, void 0);
};
_s(NumberField, "ZZ1ORrlG1SuCvdqWBiHe979tPUE=", false, function() {
  return [useController];
});
_c = NumberField;
var _c;
$RefreshReg$(_c, "NumberField");
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

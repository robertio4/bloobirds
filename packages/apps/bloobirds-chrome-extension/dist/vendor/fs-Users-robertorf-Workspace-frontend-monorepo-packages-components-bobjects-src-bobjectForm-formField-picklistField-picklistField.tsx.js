import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formField-picklistField-picklistField.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectForm/formField/picklistField/picklistField.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectForm/formField/picklistField/picklistField.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useController } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { Item, Select } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { getUserId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { FormGroup, FormLabel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectForm-formGroup-formGroup.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const PicklistField = ({
  control,
  required,
  logicRole,
  values,
  name,
  id,
  size = "small",
  requiredMessage
}) => {
  _s();
  const {
    field: {
      value,
      onChange
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
  useEffect(() => {
    if (logicRole === "LEAD__ASSIGNED_TO") {
      getUserId().then((userId) => {
        onChange(userId);
      });
    }
  }, [logicRole]);
  return /* @__PURE__ */ _jsxDEV(FormGroup, {
    size,
    children: [size === "small" && /* @__PURE__ */ _jsxDEV(FormLabel, {
      required,
      children: name
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 28
    }, void 0), /* @__PURE__ */ _jsxDEV(Select, {
      autocomplete: values?.length > 8,
      value,
      onChange,
      error: error?.message,
      borderless: false,
      placeholder: size === "small" ? "Select" : `${name}${required ? " *" : ""}`,
      width: "100%",
      size,
      children: values?.filter((option) => option?.enabled).map((option) => /* @__PURE__ */ _jsxDEV(Item, {
        value: option.id,
        children: option.name
      }, option.id, false, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 13
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 43,
    columnNumber: 5
  }, void 0);
};
_s(PicklistField, "/Tlw1uOHLYrIkGZ5ZmnTOuFlfYk=", false, function() {
  return [useController];
});
_c = PicklistField;
var _c;
$RefreshReg$(_c, "PicklistField");
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

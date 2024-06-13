import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceHeader-CurrentCadence.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/cadenceHeader/CurrentCadence.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/cadenceHeader/CurrentCadence.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Label, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useCadenceTable } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-hooks-useCadenceTable.ts.js";
import { useHasCadenceStarted } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-hooks-useHasCadenceStarted.ts.js";
import { AutoAssignDropdown } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-assignCadenceDropdown-autoAssignDropdown-autoAssignDropdown.tsx.js";
import { STEPS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-cadenceControlModal.machine.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceHeader-cadenceHeader.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export function CurrentCadence(props) {
  _s();
  const {
    bobject,
    openCadenceControl,
    activeUserId
  } = props;
  const {
    cadence
  } = useCadenceTable(bobject);
  const {
    hasStarted
  } = useHasCadenceStarted(bobject);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceTable.header"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._name__wrapper,
    children: [/* @__PURE__ */ _jsxDEV(Label, {
      uppercase: false,
      inline: false,
      overrideStyle: {
        padding: "3px 12px",
        letterSpacing: 0
      },
      color: "white",
      icon: "statusCircle",
      iconColor: hasStarted ? "grape" : "softPeanut",
      iconSize: 11,
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: clsx(styles._link, {
          [styles._link_disabled]: !hasStarted
        }),
        onClick: () => hasStarted && openCadenceControl(),
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: getCadenceNameColor(!!cadence, hasStarted),
          inline: true,
          children: getCadenceName(cadence, t)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 44,
          columnNumber: 11
        }, this), hasStarted && /* @__PURE__ */ _jsxDEV(Icon, {
          name: "settings",
          size: 16
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 26
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }, this), !hasStarted && /* @__PURE__ */ _jsxDEV(AutoAssignDropdown, {
      activeUserId,
      activeBobject: bobject,
      callback: () => openCadenceControl(STEPS.CONFIGURE_CADENCE),
      contactBobjects: {
        company: bobject,
        leads: props.leads
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 5
  }, this);
}
_s(CurrentCadence, "jE9RV5o4nYfUG0LzIgJTqbLNLBM=", false, function() {
  return [useCadenceTable, useHasCadenceStarted, useTranslation];
});
_c = CurrentCadence;
function getCadenceNameColor(hasCadence, hasStarted) {
  if (!hasCadence) {
    return "softPeanut";
  }
  return hasStarted ? "bloobirds" : "peanut";
}
function getCadenceName(cadence, t) {
  if (!cadence) {
    return t("noCadenceAssigned");
  }
  return cadence?.name || t("unnamedCadence");
}
var _c;
$RefreshReg$(_c, "CurrentCadence");
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

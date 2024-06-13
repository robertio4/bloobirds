import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/wizardHelper/components/cadenceManagementButton/cadenceManagementButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/wizardHelper/components/cadenceManagementButton/cadenceManagementButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/wizardHelper/components/cadenceManagementButton/cadenceManagementButton.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { AssignCadenceDropdown } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-index.tsx.js";
import { Icon, Spinner, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { UserPermission } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/contactView/components/wizardHelper/wizardHelper.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const CadenceButton = ({
  isDisabled,
  isActive,
  sidePeekEnabled,
  onClick,
  t
}) => /* @__PURE__ */ _jsxDEV("div", {
  className: clsx(styles.cadenceNameWrapper, {
    [styles.cadenceNameDisabled]: isDisabled,
    [styles.cadenceNameActive]: isActive,
    [styles.cadenceNameSmall]: !sidePeekEnabled
  }),
  onClick,
  children: [/* @__PURE__ */ _jsxDEV(Icon, {
    name: isActive ? "pause" : "play",
    color: isActive ? "grape" : "bloobirds",
    size: 16
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 33,
    columnNumber: 5
  }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
    size: sidePeekEnabled ? "xs" : "xxs",
    color: isDisabled ? "lightPeanut" : isActive ? "white" : "bloobirds",
    weight: "heavy",
    inline: true,
    children: isActive ? t("sidePeek.overview.wizardHelper.onCadence") : t("sidePeek.overview.wizardHelper.setCadence")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 34,
    columnNumber: 5
  }, void 0), /* @__PURE__ */ _jsxDEV(Icon, {
    dataTest: "Cadence-Gear",
    color: isActive ? "white" : "softPeanut",
    name: "settings",
    size: 12
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 44,
    columnNumber: 5
  }, void 0)]
}, void 0, true, {
  fileName: _jsxFileName,
  lineNumber: 25,
  columnNumber: 3
}, void 0);
_c = CadenceButton;
const LoadingTasksDisplay = ({
  sidePeekEnabled,
  t
}) => /* @__PURE__ */ _jsxDEV("div", {
  className: clsx(styles.cadenceNameWrapper, styles.loader),
  children: [/* @__PURE__ */ _jsxDEV(Text, {
    size: sidePeekEnabled ? "xs" : "xxs",
    color: "white",
    weight: "bold",
    children: t("sidePeek.overview.wizardHelper.managingTasks")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 61,
    columnNumber: 5
  }, void 0), /* @__PURE__ */ _jsxDEV(Spinner, {
    size: 12,
    color: "white",
    name: "loadingCircle"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 64,
    columnNumber: 5
  }, void 0)]
}, void 0, true, {
  fileName: _jsxFileName,
  lineNumber: 60,
  columnNumber: 3
}, void 0);
_c2 = LoadingTasksDisplay;
export const CadenceManagementButton = ({
  isActive,
  toggleCadenceControlVisibility,
  isDisabled,
  isProcessingTasks
}) => {
  _s();
  const {
    useGetSettings,
    useGetActiveBobject,
    useGetActiveBobjectContext,
    useGetSidePeekEnabled
  } = useExtensionContext();
  const {
    t
  } = useTranslation();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const settings = useGetSettings();
  const activeBobject = useGetActiveBobject();
  const contactBobjects = useGetActiveBobjectContext();
  const hasPermissions = settings?.user?.accountAdmin && settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  return /* @__PURE__ */ _jsxDEV(AssignCadenceDropdown, {
    activeUserId: settings?.user.id,
    contactBobjects,
    callback: isDisabled ? void 0 : toggleCadenceControlVisibility,
    activeBobject,
    actionsDisabled: isDisabled,
    hasPermissions,
    children: isProcessingTasks ? /* @__PURE__ */ _jsxDEV(LoadingTasksDisplay, {
      sidePeekEnabled,
      t
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(CadenceButton, {
      sidePeekEnabled,
      isActive,
      isDisabled,
      t
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 90,
    columnNumber: 5
  }, void 0);
};
_s(CadenceManagementButton, "bgh/cRCKOpqcDyNBVjyBVHzztrs=", true, function() {
  return [useExtensionContext, useTranslation];
});
_c3 = CadenceManagementButton;
var _c, _c2, _c3;
$RefreshReg$(_c, "CadenceButton");
$RefreshReg$(_c2, "LoadingTasksDisplay");
$RefreshReg$(_c3, "CadenceManagementButton");
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

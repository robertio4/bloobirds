import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/wizardHelper/components/startCadenceHelper/startCadenceHelper.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/wizardHelper/components/startCadenceHelper/startCadenceHelper.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/wizardHelper/components/startCadenceHelper/startCadenceHelper.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { AssignCadenceDropdown, CadenceControlModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-index.tsx.js";
import { Button, Icon, Spinner, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { MIXPANEL_EVENTS, UserPermission } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport8_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport8_mixpanelBrowser.__esModule ? __vite__cjsImport8_mixpanelBrowser.default : __vite__cjsImport8_mixpanelBrowser;
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import styles from "/src/content/components/contactView/components/wizardHelper/wizardHelper.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const StartCadenceHelper = ({
  bobject,
  cadenceControlCallback,
  isLoading,
  minimized
}) => {
  _s();
  const [open, setOpen] = useState();
  const {
    useGetActiveBobject,
    useGetActiveBobjectContext,
    useGetSettings,
    useGetSidePeekEnabled
  } = useExtensionContext();
  const contactBobjects = useGetActiveBobjectContext();
  const activeBobject = useGetActiveBobject();
  const {
    actionsDisabled
  } = useContactViewContext();
  const settings = useGetSettings();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const {
    t
  } = useTranslation();
  const titleClasses = clsx(styles.startCadence__container, {
    [styles.wizard__title_sidePeek]: sidePeekEnabled
  });
  const startCadenceTitle = clsx(styles.wizardStartCadenceTitle, {
    [styles.wizardStartCadenceTitleMinimized]: minimized
  });
  const startCadence = clsx(styles.start_cadence, {
    [styles.start_cadenceMinimized]: minimized
  });
  const hasPermissions = settings?.user?.accountAdmin && settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [isLoading ? /* @__PURE__ */ _jsxDEV("div", {
      className: styles.loadingContainer,
      children: /* @__PURE__ */ _jsxDEV(Spinner, {
        color: "white",
        name: "loadingCircle"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
      className: titleClasses,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "white",
        className: startCadenceTitle,
        weight: "bold",
        children: t("sidePeek.overview.wizardHelper.nextStepSuggested")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(AssignCadenceDropdown, {
        activeUserId: settings?.user?.id,
        contactBobjects,
        callback: () => {
          mixpanel.track(MIXPANEL_EVENTS.CLICK_START_CADENCE_FROM_CONTACT_VIEW_OTO);
          setOpen(true);
        },
        activeBobject,
        actionsDisabled,
        hasPermissions,
        children: /* @__PURE__ */ _jsxDEV(Button, {
          size: "medium",
          variant: "tertiary",
          expand: true,
          className: startCadence,
          disabled: actionsDisabled,
          children: [" ", /* @__PURE__ */ _jsxDEV(Icon, {
            name: "play",
            color: "bloobirds",
            size: 12
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 74,
            columnNumber: 15
          }, void 0), t("sidePeek.overview.wizardHelper.startCadence")]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 66,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 9
    }, void 0), open && /* @__PURE__ */ _jsxDEV(CadenceControlModal, {
      bobject,
      setIsOpen: setOpen,
      initialStep: {
        step: "CONFIGURE_CADENCE",
        hadStartedCadence: false
      },
      callbackOnSave: cadenceControlCallback
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 9
    }, void 0)]
  }, void 0, true);
};
_s(StartCadenceHelper, "QqzR0hVjVUvxMJ6Yp3BIhig8yEc=", true, function() {
  return [useExtensionContext, useContactViewContext, useTranslation];
});
_c = StartCadenceHelper;
var _c;
$RefreshReg$(_c, "StartCadenceHelper");
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

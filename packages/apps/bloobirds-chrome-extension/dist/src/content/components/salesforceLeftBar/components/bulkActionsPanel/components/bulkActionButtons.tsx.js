import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/salesforceLeftBar/components/bulkActionsPanel/components/bulkActionButtons.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceLeftBar/components/bulkActionsPanel/components/bulkActionButtons.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceLeftBar/components/bulkActionsPanel/components/bulkActionButtons.tsx", _s2 = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import __vite__cjsImport4_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport4_mixpanelBrowser.__esModule ? __vite__cjsImport4_mixpanelBrowser.default : __vite__cjsImport4_mixpanelBrowser;
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import styles from "/src/content/components/salesforceLeftBar/components/bulkActionsPanel/bulkActionsPanel.module.css.js";
import { BulkActionButtonsTypes } from "/src/content/components/salesforceLeftBar/components/bulkActionsPanel/typings/bulkActionsPanel.typings.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const BulkActionButtons = ({
  tab,
  availableActions
}) => {
  _s2();
  var _s = $RefreshSig$();
  const {
    selectedItems,
    setOpenedModalInfo
  } = useSubhomeContext();
  const renderAction = (actionObject) => {
    _s();
    const {
      action,
      disabled
    } = actionObject;
    const {
      t
    } = useTranslation();
    switch (action) {
      case BulkActionButtonsTypes.StartCadence:
        return /* @__PURE__ */ _jsxDEV("div", {
          className: styles.buttonWrapper,
          children: /* @__PURE__ */ _jsxDEV(Tooltip, {
            position: "top",
            title: disabled ? t("leftBar.bulk.actionDisabled", {
              action: t("leftBar.bulk.setCadence")
            }) : t("leftBar.bulk.setCadence"),
            children: /* @__PURE__ */ _jsxDEV(Button, {
              variant: "secondary",
              iconLeft: "calendar",
              size: "small",
              uppercase: false,
              disabled,
              onClick: () => {
                mixpanel.track(`BULK_ACTION_SET_CADENCE_${tab?.toUpperCase()}_TAB`);
                setOpenedModalInfo({
                  openedModal: "cadence",
                  bobject: selectedItems
                });
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 36,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 28,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 27,
          columnNumber: 11
        }, void 0);
      case BulkActionButtonsTypes.StopCadence:
        return /* @__PURE__ */ _jsxDEV("div", {
          className: styles.buttonWrapper,
          children: /* @__PURE__ */ _jsxDEV(Tooltip, {
            position: "top",
            title: disabled ? t("leftBar.bulk.actionDisabled", {
              action: t("leftBar.bulk.stopCadence")
            }) : t("leftBar.bulk.stopCadence"),
            children: /* @__PURE__ */ _jsxDEV(Button, {
              variant: "secondary",
              size: "small",
              iconLeft: "slash",
              uppercase: false,
              disabled,
              onClick: () => {
                mixpanel.track(`BULK_ACTION_STOP_CADENCE_${tab?.toUpperCase()}_TAB`);
                setOpenedModalInfo({
                  openedModal: "stopCadence",
                  bobject: selectedItems
                });
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 61,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 53,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 11
        }, void 0);
      case BulkActionButtonsTypes.Reschedule:
        return /* @__PURE__ */ _jsxDEV("div", {
          className: styles.buttonWrapper,
          children: /* @__PURE__ */ _jsxDEV(Tooltip, {
            position: "top",
            title: disabled ? t("leftBar.bulk.actionDisabled", {
              action: t("leftBar.bulk.reschedule")
            }) : t("leftBar.bulk.reschedule"),
            children: /* @__PURE__ */ _jsxDEV(Button, {
              variant: "secondary",
              size: "small",
              iconLeft: "clock",
              uppercase: false,
              disabled,
              onClick: () => {
                mixpanel.track(`BULK_ACTION_RESCHEDULE_${tab?.toUpperCase()}_TAB`);
                setOpenedModalInfo({
                  openedModal: "reschedule",
                  bobject: selectedItems
                });
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 86,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 78,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 77,
          columnNumber: 11
        }, void 0);
      case BulkActionButtonsTypes.Reassign:
        return /* @__PURE__ */ _jsxDEV("div", {
          className: styles.buttonWrapper,
          children: /* @__PURE__ */ _jsxDEV(Tooltip, {
            position: "top",
            title: "Reassign",
            children: /* @__PURE__ */ _jsxDEV(Button, {
              variant: "secondary",
              iconLeft: "personAdd",
              size: "small",
              uppercase: false,
              onClick: () => {
                mixpanel.track(`BULK_ACTION_REASSIGN_${tab?.toUpperCase()}_TAB`);
                setOpenedModalInfo({
                  openedModal: "assignUser",
                  bobject: selectedItems
                });
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 104,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 103,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 102,
          columnNumber: 11
        }, void 0);
    }
  };
  _s(renderAction, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [useTranslation];
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.buttonsGroupWrapper,
    children: availableActions?.map((actionObject) => {
      return /* @__PURE__ */ _jsxDEV("div", {
        children: renderAction(actionObject)
      }, actionObject.action, false, {
        fileName: _jsxFileName,
        lineNumber: 123,
        columnNumber: 16
      }, void 0);
    })
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 121,
    columnNumber: 5
  }, void 0);
};
_s2(BulkActionButtons, "Fhs/QMUWTjcBfIhnOWvzeaIHfO0=", false, function() {
  return [useSubhomeContext];
});
_c = BulkActionButtons;
export default BulkActionButtons;
var _c;
$RefreshReg$(_c, "BulkActionButtons");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/stageAndStatusLabel/stageAndStatusLabel.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/stageAndStatusLabel/stageAndStatusLabel.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/stageAndStatusLabel/stageAndStatusLabel.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Label, Tooltip, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useFullSalesEnabled, useIsNoStatusPlanAccount, useObjectCreationSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { useWizardContext, WIZARD_MODALS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-wizardModalContext-dist-index.js.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { StatusLabel } from "/src/content/components/statusLabel/statusLabel.tsx.js";
import { useStatusModalInfo } from "/src/content/components/stageAndStatusLabel/useStatusModalInfo.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function getStatusLabelProps(status, isNoStatusPlanAccount) {
  if (!status) {
    return null;
  }
  if (isNoStatusPlanAccount) {
    return {
      backgroundColor: status?.backgroundColor,
      color: status?.textColor,
      borderColor: status?.backgroundColor,
      text: status?.salesforceLabel
    };
  }
  return {
    backgroundColor: status?.backgroundColor,
    color: status?.textColor,
    borderColor: "",
    text: status?.name
  };
}
export const StageAndStatusLabel = ({
  bobject,
  meta,
  className
}) => {
  _s();
  const {
    useGetDataModel
  } = useExtensionContext();
  const dataModel = useGetDataModel();
  const hasSalesEnabled = useFullSalesEnabled(dataModel.getAccountId());
  const statusInfo = bobject && useStatusModalInfo(bobject);
  const {
    bobjectType,
    status,
    isSalesStage,
    salesforceStatus
  } = statusInfo || {};
  const isOpportunity = bobjectType === "Opportunity";
  const {
    createToast
  } = useToasts();
  const {
    t
  } = useTranslation();
  const {
    openWizard,
    resetWizardProperties
  } = useWizardContext();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const {
    enabledChangeStatus
  } = useObjectCreationSettings();
  const usableStatus = isNoStatusPlanAccount ? salesforceStatus : status;
  const statusLabelProps = getStatusLabelProps(usableStatus, isNoStatusPlanAccount);
  function handleClose() {
    resetWizardProperties(WIZARD_MODALS.CHANGE_STATUS);
  }
  function handleOnSave() {
    handleClose();
    if (!isNoStatusPlanAccount) {
      createToast({
        message: t("sidePeek.stageAndStatusLabel.statusUpdatedSuccessfully"),
        type: "success"
      });
    }
    window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
      detail: {
        type: bobjectType
      }
    }));
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [hasSalesEnabled && !isOpportunity && !isNoStatusPlanAccount ? /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: `${t("common.stage")}: ${isSalesStage ? t("common.sales") : t("common.prospecting")}`,
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(Label, {
        size: "small",
        uppercase: false,
        color: isSalesStage ? "peanut" : "verySoftGrape",
        textColor: isSalesStage ? "white" : "peanut",
        overrideStyle: {
          ...{
            paddingLeft: "3px",
            paddingRight: "3px",
            paddingTop: className ? 0 : "2px",
            paddingBottom: className ? 0 : "2px",
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0
          }
        },
        children: isSalesStage ? t("common.salesAbr") : t("common.prospectingAbr")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 90,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false), usableStatus && statusLabelProps && /* @__PURE__ */ _jsxDEV(StatusLabel, {
      size: "small",
      onClick: () => {
        if (enabledChangeStatus === void 0 || enabledChangeStatus) {
          openWizard(WIZARD_MODALS.CHANGE_STATUS, bobject, {
            ...meta,
            referenceBobject: bobject,
            handleClose,
            handleOnSave,
            statusInfo,
            dataModel
          });
        }
      },
      ...statusLabelProps,
      ...className ? {
        className
      } : {}
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 9
    }, void 0)]
  }, void 0, true);
};
_s(StageAndStatusLabel, "yVnKiLPS8PdgZbB7YgwZjmW1eX8=", true, function() {
  return [useExtensionContext, useFullSalesEnabled, useStatusModalInfo, useToasts, useTranslation, useWizardContext, useIsNoStatusPlanAccount, useObjectCreationSettings];
});
_c = StageAndStatusLabel;
var _c;
$RefreshReg$(_c, "StageAndStatusLabel");
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

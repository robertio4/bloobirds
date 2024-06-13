import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/aircallEventListener/aircallEventListener.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/aircallEventListener/aircallEventListener.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react;
import { fillReferenceFields, getMainBobjectId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-index.tsx.js";
import { useAircallPhoneLinkEnabled, useOpenCCFWithoutObject } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useEventSubscription } from "/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js";
import { PluralBobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useWizardContext, WIZARD_MODALS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-wizardModalContext-dist-index.js.js";
import normalizeUrl from "/vendor/.vite-deps-normalize-url.js__v--91e5723a.js";
import { isSalesforcePage } from "/src/utils/url.ts.js";
import { Fragment as _Fragment, jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
var AircallCallStatus = /* @__PURE__ */ ((AircallCallStatus2) => {
  AircallCallStatus2["ended"] = "call.ended";
  AircallCallStatus2["started"] = "call.started";
  AircallCallStatus2["missed"] = "call.missed";
  AircallCallStatus2["hungup"] = "call.hungup";
  return AircallCallStatus2;
})(AircallCallStatus || {});
export const AircallEventListener = () => {
  _s();
  const {
    openWizard,
    resetWizardProperties
  } = useWizardContext();
  const [showCorrectContactFlow, setShowCorrectContactFlow] = React.useState(false);
  const [mainActivityBobject, setMainActivityBobject] = React.useState(null);
  const [activityCCF, setActivityCCF] = React.useState(null);
  const hasOpenCCFWithoutObjectAccount = useOpenCCFWithoutObject();
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const url = normalizeUrl(window.location.href);
  useEventSubscription("aircall", hasAircallPhoneLinkEnabled ? (value) => {
    const windowReady = isSalesforcePage(url) && document?.visibilityState === "visible";
    if (value?.activityId && value?.callStatus === "call.hungup" /* hungup */ && windowReady) {
      api.get(`/bobjects/${value?.activityId}/form?injectReferences=true`).then((response) => {
        if (response?.data) {
          const activityToCCF = fillReferenceFields(response?.data);
          if (activityToCCF) {
            setActivityCCF(activityToCCF);
            openCorrectContactFlow(activityToCCF);
          }
        }
      });
    }
  } : () => {
  });
  async function openCorrectContactFlow(activity) {
    const mainBobjectId = getMainBobjectId(activity);
    if (mainBobjectId) {
      const response = await api.get(`/linkedin/${PluralBobjectTypes[mainBobjectId.split("/")[1]]?.toLowerCase()}/${mainBobjectId.split("/")[2]}`);
      setMainActivityBobject(response?.data);
    }
    setShowCorrectContactFlow(true);
  }
  function handleClose() {
    setActivityCCF(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: showCorrectContactFlow && activityCCF && (mainActivityBobject || hasOpenCCFWithoutObjectAccount) && openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
      referenceBobject: mainActivityBobject,
      handleClose
    })
  }, void 0, false);
};
_s(AircallEventListener, "gkYSGrR1qNu7yifiWUovUmXJps0=", false, function() {
  return [useWizardContext, useOpenCCFWithoutObject, useAircallPhoneLinkEnabled, useEventSubscription];
});
_c = AircallEventListener;
var _c;
$RefreshReg$(_c, "AircallEventListener");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-astrolineDialer-astrolineDialerFrame-astrolineDialerFrame.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/astrolineDialer/astrolineDialerFrame/astrolineDialerFrame.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/astrolineDialer/astrolineDialerFrame/astrolineDialerFrame.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { PluralBobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useWizardContext, WIZARD_MODALS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-wizardModalContext-dist-index.js.js";
import { fillReferenceFields, getMainBobjectId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-utils.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-astrolineDialer-astrolineDialerFrame-astrolineDialerFrame.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const AstrolineDialerFrame = ({
  launchCCF
}) => {
  _s();
  const [activityCCF, setActivityCCF] = useState(null);
  const [showCorrectContactFlow, setShowCorrectContactFlow] = React.useState(false);
  const [mainActivityBobject, setMainActivityBobject] = React.useState(null);
  const {
    openWizard,
    resetWizardProperties
  } = useWizardContext();
  async function openCorrectContactFlow(activity) {
    const mainBobjectId = getMainBobjectId(activity);
    if (mainBobjectId) {
      const response = await api.get(`/linkedin/${PluralBobjectTypes[mainBobjectId.split("/")[1]]?.toLowerCase()}/${mainBobjectId.split("/")[2]}`);
      setMainActivityBobject(response?.data);
    }
    setShowCorrectContactFlow(true);
  }
  const createCallAndLaunchCCF = async (details) => {
    const {
      data: activity
    } = await api.post("/calls/astroline/calls/" + details?.data?.id + "/end", {
      ...details
    });
    if (launchCCF) {
      api.get(`/bobjects/${activity?.activity?.value}/form?injectReferences=true`).then((response) => {
        const activityToCCF = fillReferenceFields(response?.data);
        if (response?.data) {
          setActivityCCF(activityToCCF);
        }
        openCorrectContactFlow(activityToCCF);
      });
    }
  };
  useEffect(() => {
    const listener = ({
      data: details
    }) => {
      if (details?.type === "phone:terminated" && details?.data?.id) {
        createCallAndLaunchCCF(details);
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);
  function handleClose() {
    setActivityCCF(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("iframe", {
      className: styles.dialer,
      name: "sf",
      id: "sf",
      src: "https://softphone.kunzite.app/",
      frameBorder: "0",
      width: "320",
      height: "460",
      allow: "camera *;microphone *"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 7
    }, void 0), showCorrectContactFlow && activityCCF && mainActivityBobject && openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
      referenceBobject: mainActivityBobject,
      handleClose
    })]
  }, void 0, true);
};
_s(AstrolineDialerFrame, "U6cRZmMXsyIgNw/M4I81xB+5e/M=", false, function() {
  return [useWizardContext];
});
_c = AstrolineDialerFrame;
var _c;
$RefreshReg$(_c, "AstrolineDialerFrame");
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

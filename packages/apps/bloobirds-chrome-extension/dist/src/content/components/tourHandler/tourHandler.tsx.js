import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/tourHandler/tourHandler.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/tourHandler/tourHandler.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/tourHandler/tourHandler.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import __vite__cjsImport3_reactDom from "/vendor/.vite-deps-react-dom.js__v--47a99a8e.js"; const ReactDOM = __vite__cjsImport3_reactDom.__esModule ? __vite__cjsImport3_reactDom.default : __vite__cjsImport3_reactDom;
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Portal } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveAccountId, useLocalStorage, useNewCadenceTableEnabled, useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ContactViewSubTab, ExtensionHelperKeys, LocalStorageKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { ContactViewFooterTab } from "/src/content/components/contactView/components/contactViewFooter/contactViewFooter.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { ActionsComponent } from "/src/content/components/tourHandler/components/actionsComponent/actionsComponent.tsx.js";
import { SliderControls } from "/src/content/components/tourHandler/components/sliderControls/sliderControls.tsx.js";
import { TourStep } from "/src/content/components/tourHandler/components/tourSteps/tourStep.tsx.js";
import { TourSteps } from "/src/content/components/tourHandler/components/tourSteps/tourSteps.tsx.js";
import { stepDefinitions, stepElementIds } from "/src/content/components/tourHandler/tourHandler.constants.ts.js";
import styles from "/src/content/components/tourHandler/tourHandler.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const tourSteps = [ContactViewSubTab.OVERVIEW, ContactViewSubTab.ACTIVITIES, ContactViewSubTab.TASKS, ContactViewSubTab.PLAYBOOK, "ACTIONS"];
const tourStepsIconDictionary = {
  [ContactViewSubTab.OVERVIEW]: "assignBoard",
  [ContactViewSubTab.ACTIVITIES]: "activity",
  [ContactViewSubTab.TASKS]: "checkDouble",
  [ContactViewSubTab.PLAYBOOK]: "magic",
  ACTIONS: "calendarphone"
};
function getElementPosition(tourStepIndex) {
  const isActionsStep = tourSteps[tourStepIndex] === "ACTIONS";
  const selector = `contact-view-${!isActionsStep ? ContactViewSubTab.OVERVIEW : "ACTIONS"}-tab`;
  const element = document.querySelector(`[data-test= "${selector}"]`);
  const elementVerticalPosition = element?.getBoundingClientRect()?.top + (isActionsStep ? 95 : 0);
  const elementHorizontalPosition = document.querySelector('[data-test= "contact-view-Overview-tab"]')?.getBoundingClientRect()?.left;
  if (!elementVerticalPosition || !elementHorizontalPosition)
    return null;
  return {
    position: "absolute",
    top: `${elementVerticalPosition - 200}px`,
    left: `${elementHorizontalPosition - 240}px`
  };
}
export const TourHandler = () => {
  _s();
  const {
    setActiveSubTab
  } = useContactViewContext();
  const {
    get
  } = useLocalStorage();
  const {
    has,
    save
  } = useUserHelpers();
  const {
    t
  } = useTranslation();
  const [tourStepIndex, setTourStepIndex] = useState(0);
  const [tourVisible, setTourVisible] = useState(true);
  function closeModal() {
    save(ExtensionHelperKeys.TOUR_DONE);
    setTourVisible(false);
  }
  const inheritedStyle = getElementPosition(tourStepIndex);
  function handleChangeStep(position) {
    setTourStepIndex(position);
    setActiveSubTab(tourSteps[position] !== "ACTIONS" ? tourSteps[position] : ContactViewSubTab.OVERVIEW);
  }
  if (tourVisible && !has(ExtensionHelperKeys.TOUR_DONE) && get(LocalStorageKeys.IsMenuOpen)) {
    return /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(Portal, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.overlay,
          children: /* @__PURE__ */ _jsxDEV("div", {
            children: /* @__PURE__ */ _jsxDEV("div", {
              className: styles.modal,
              ...inheritedStyle ? {
                style: {
                  ...inheritedStyle
                }
              } : {},
              children: [/* @__PURE__ */ _jsxDEV(TourSteps, {
                position: tourStepIndex,
                setPosition: setTourStepIndex,
                children: Object.values(stepDefinitions).map((stepDefinition, index) => /* @__PURE__ */ _jsxDEV(TourStep, {
                  t,
                  handleClose: closeModal,
                  ...stepDefinition
                }, index, false, {
                  fileName: _jsxFileName,
                  lineNumber: 94,
                  columnNumber: 21
                }, void 0))
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 92,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ _jsxDEV(SliderControls, {
                length: Object.keys(stepElementIds).length,
                setPosition: handleChangeStep,
                position: tourStepIndex,
                closeModal
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 97,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 88,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 87,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 86,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 85,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(OverlayDigger, {
        selectedStep: tourSteps[tourStepIndex]
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 9
      }, void 0)]
    }, void 0, true);
  } else {
    return null;
  }
};
_s(TourHandler, "FiFG4F0x3UoTT47k8VJFRBgaMZc=", false, function() {
  return [useContactViewContext, useLocalStorage, useUserHelpers, useTranslation];
});
_c = TourHandler;
const OverlayHighlight = ({
  selectedStep
}) => {
  switch (selectedStep) {
    case ContactViewSubTab.OVERVIEW:
    case ContactViewSubTab.ACTIVITIES:
    case ContactViewSubTab.TASKS:
    case ContactViewSubTab.PLAYBOOK:
      return /* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: selectedStep,
        icon: tourStepsIconDictionary[selectedStep],
        onClick: () => null,
        color: "bloobirds",
        selected: selectedStep
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 9
      }, void 0);
    case "ACTIONS":
      return /* @__PURE__ */ _jsxDEV(ActionsComponent, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 14
      }, void 0);
  }
};
_c2 = OverlayHighlight;
function hasMountedPlaceholder(element) {
  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i];
    if (child.id === "tour-handler-portal") {
      return true;
    }
  }
  return false;
}
const OverlayDigger = ({
  selectedStep
}) => {
  _s2();
  const {
    useGetSidePeekEnabled
  } = useExtensionContext();
  const isSidepeekEnabled = useGetSidePeekEnabled();
  const accountId = useActiveAccountId();
  const hasCustomTaskEnabled = useNewCadenceTableEnabled(accountId);
  const portalContainerRef = useRef(null);
  const selector = `contact-view-${selectedStep}-tab`;
  const element = document.querySelector(`[data-test= "${selector}"]`);
  const elementPosition = element?.getBoundingClientRect();
  useEffect(() => {
    const placeholderElement = document.createElement("div");
    placeholderElement?.setAttribute("id", "tour-handler-portal");
    portalContainerRef.current = placeholderElement;
    if (element && !hasMountedPlaceholder(element)) {
      element?.appendChild(portalContainerRef.current);
    }
  }, [element]);
  if (!portalContainerRef.current)
    return null;
  const sidepeekCorrection = Math.floor((window.innerWidth * 0.3 - (hasCustomTaskEnabled ? 338 : 296)) / 2);
  const portalStyleProps = {
    position: "fixed",
    left: elementPosition?.left + (selectedStep === "ACTIONS" && isSidepeekEnabled ? sidepeekCorrection : 0),
    top: elementPosition?.top - (selectedStep === "ACTIONS" ? 7 : 0),
    background: "white",
    zIndex: 104,
    ...selectedStep === "ACTIONS" ? {
      height: "48px"
    } : {}
  };
  return ReactDOM.createPortal(/* @__PURE__ */ _jsxDEV(Portal, {
    children: /* @__PURE__ */ _jsxDEV("div", {
      style: portalStyleProps,
      children: /* @__PURE__ */ _jsxDEV(OverlayHighlight, {
        selectedStep
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 185,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 184,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 183,
    columnNumber: 5
  }, void 0), portalContainerRef.current);
};
_s2(OverlayDigger, "WqrFRnPnBac8YyCpQbznyHcRxLI=", true, function() {
  return [useExtensionContext, useActiveAccountId, useNewCadenceTableEnabled];
});
_c3 = OverlayDigger;
var _c, _c2, _c3;
$RefreshReg$(_c, "TourHandler");
$RefreshReg$(_c2, "OverlayHighlight");
$RefreshReg$(_c3, "OverlayDigger");
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

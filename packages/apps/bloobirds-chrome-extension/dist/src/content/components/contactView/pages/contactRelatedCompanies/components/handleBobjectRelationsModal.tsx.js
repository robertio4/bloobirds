import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/pages/contactRelatedCompanies/components/handleBobjectRelationsModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactRelatedCompanies/components/handleBobjectRelationsModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactRelatedCompanies/components/handleBobjectRelationsModal.tsx", _s = $RefreshSig$();
import { Trans } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Modal, ModalCloseIcon, ModalHeader, ModalTitle } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMachine } from "/vendor/.vite-deps-@xstate_react.js__v--bb985310.js";
import styles from "/src/content/components/contactView/pages/contactRelatedCompanies/contactRelatedCompanies.module.css.js";
import { AddRelatedBobjectBody, ConfirmationBody, DeleteParent, InitialModalBody } from "/src/content/components/contactView/pages/contactRelatedCompanies/components/modalBodies.tsx.js";
import { STATES, stepsMachine } from "/src/content/components/contactView/pages/contactRelatedCompanies/components/relatedBobject.machine.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function getTitle(step) {
  switch (step) {
    default:
      return /* @__PURE__ */ _jsxDEV(Trans, {
        i18nKey: "sidePeek.contactRelatedCompanies.addRelatedCompany"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 14
      }, this);
    case STATES.PARENT:
      return /* @__PURE__ */ _jsxDEV(Trans, {
        i18nKey: "sidePeek.contactRelatedCompanies.addParentCompany"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 20,
        columnNumber: 14
      }, this);
    case STATES.CHILD:
      return /* @__PURE__ */ _jsxDEV(Trans, {
        i18nKey: "sidePeek.contactRelatedCompanies.addChildCompany"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 22,
        columnNumber: 14
      }, this);
  }
}
const ModalBody = ({
  step,
  ...props
}) => {
  switch (step) {
    default:
      return /* @__PURE__ */ _jsxDEV(InitialModalBody, {
        ...props
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 14
      }, void 0);
    case STATES.PARENT:
    case STATES.CHILD:
      return /* @__PURE__ */ _jsxDEV(AddRelatedBobjectBody, {
        type: step,
        ...props
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 14
      }, void 0);
    case STATES.CONFIRM:
      return /* @__PURE__ */ _jsxDEV(ConfirmationBody, {
        ...props
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 14
      }, void 0);
    case STATES.DELETE_PARENT:
      return /* @__PURE__ */ _jsxDEV(DeleteParent, {
        ...props
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 14
      }, void 0);
  }
};
_c = ModalBody;
export const HandleBobjectRelationsModal = ({
  initialStep,
  data,
  handleCloseModal
}) => {
  _s();
  const [{
    value: step,
    context
  }, send] = useMachine(stepsMachine(initialStep), {
    context: {
      ...data,
      handleClose: handleCloseModal
    }
  });
  const companyName = data.company?.name;
  const title = getTitle(step);
  return /* @__PURE__ */ _jsxDEV(Modal, {
    width: "472px",
    open: true,
    onClose: handleCloseModal,
    children: [/* @__PURE__ */ _jsxDEV(ModalHeader, {
      className: styles._modal_header,
      children: [/* @__PURE__ */ _jsxDEV(ModalTitle, {
        color: "peanut",
        icon: "company",
        size: "small",
        children: title
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ModalCloseIcon, {
        color: "peanut",
        size: "small",
        onClick: handleCloseModal
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalBody, {
      step,
      context,
      send,
      companyName
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 50,
    columnNumber: 5
  }, void 0);
};
_s(HandleBobjectRelationsModal, "4Qz6ermkmUOveiHlRA6YEIzQ7Co=", false, function() {
  return [useMachine];
});
_c2 = HandleBobjectRelationsModal;
var _c, _c2;
$RefreshReg$(_c, "ModalBody");
$RefreshReg$(_c2, "HandleBobjectRelationsModal");
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

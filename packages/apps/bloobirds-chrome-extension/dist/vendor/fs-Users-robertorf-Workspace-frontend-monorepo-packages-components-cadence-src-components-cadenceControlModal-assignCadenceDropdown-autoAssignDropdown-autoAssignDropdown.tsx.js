import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-assignCadenceDropdown-autoAssignDropdown-autoAssignDropdown.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceControlModal/assignCadenceDropdown/autoAssignDropdown/autoAssignDropdown.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceControlModal/assignCadenceDropdown/autoAssignDropdown/autoAssignDropdown.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useClickAway } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import { Button, Dropdown, Icon, Radio, RadioGroup, Text, Tooltip, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMediaQuery } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { BobjectTypes, FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-assignCadenceDropdown-autoAssignDropdown-autoAssignDropdown.module.css.js";
import { useAutoAssignBobjets } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-assignCadenceDropdown-autoAssignDropdown-useAutoAssignBobjets.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const DropdownContent = ({
  activeUserId: userId,
  activeBobject,
  contactBobjects,
  setDropdownVisible,
  callback
}) => {
  _s();
  const [assignType, setAssignType] = useState("all");
  const {
    assignBobjects
  } = useAutoAssignBobjets(userId);
  const bobjectType = activeBobject?.id?.typeName;
  const hasLeads = contactBobjects?.leads?.length > 0;
  const contactCompany = contactBobjects?.company;
  const {
    t
  } = useTranslation();
  const shouldShowOptions = hasLeads && bobjectType === BobjectTypes.Company || contactCompany && bobjectType === BobjectTypes.Lead;
  const handleSubmit = () => {
    assignBobjects({
      contactBobjects,
      activeBobject,
      mode: assignType,
      callback
    });
    setDropdownVisible(false);
  };
  const getModalText = () => {
    switch (bobjectType) {
      case BobjectTypes.Company:
        return [t("cadence.cadenceControlModal.assignCadenceDropdown.assignCompany"), t("cadence.cadenceControlModal.assignCadenceDropdown.assignCompanyAndLeads")];
      case BobjectTypes.Lead:
        return [t("cadence.cadenceControlModal.assignCadenceDropdown.assignLead"), t("cadence.cadenceControlModal.assignCadenceDropdown.assignLeadAndCompany")];
    }
  };
  const radioText = getModalText();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._auto_assign_dropdown,
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      size: "s",
      align: "center",
      className: styles._auto_assign_text,
      children: /* @__PURE__ */ _jsxDEV(Trans, {
        i18nKey: "cadence.cadenceControlModal.assignCadenceDropdown.title",
        values: {
          bobjectType: t(`bobjectTypes.${bobjectType.toLowerCase()}`)
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 7
    }, void 0), shouldShowOptions && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._radio_group,
      children: /* @__PURE__ */ _jsxDEV(RadioGroup, {
        defaultValue: "all",
        onChange: (value) => {
          setAssignType(value);
        },
        children: [/* @__PURE__ */ _jsxDEV(Radio, {
          value: "all",
          size: "small",
          expand: true,
          children: [radioText[1], /* @__PURE__ */ _jsxDEV(Tooltip, {
            title: t("cadence.cadenceControlModal.assignCadenceDropdown.tooltip"),
            position: "top",
            children: /* @__PURE__ */ _jsxDEV(Icon, {
              name: "info",
              size: 16
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 88,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 84,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 82,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Radio, {
          value: "partial",
          size: "small",
          expand: true,
          children: radioText[0]
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 91,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 76,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
      size: "small",
      onClick: handleSubmit,
      children: t("cadence.cadenceControlModal.assignCadenceDropdown.assignStart")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 67,
    columnNumber: 5
  }, void 0);
};
_s(DropdownContent, "BM0A7UrYdMP2ixCyG87DE8dMh6k=", false, function() {
  return [useAutoAssignBobjets, useTranslation];
});
_c = DropdownContent;
export const AutoAssignDropdown = ({
  activeUserId,
  callback,
  contactBobjects,
  activeBobject,
  children,
  actionsDisabled
}) => {
  _s2();
  const {
    ref,
    visible,
    setVisible
  } = useVisible();
  const dropdownRef = useRef();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceControlModal.assignCadenceDropdown"
  });
  const {
    t: bobjectTypeT
  } = useTranslation();
  const bobjectType = activeBobject?.id?.typeName;
  const assignedToValue = "assignedTo" in activeBobject ? activeBobject?.assignedTo : getValueFromLogicRole(activeBobject, FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO);
  const isAssigned = !!assignedToValue;
  useClickAway(dropdownRef, () => {
    setVisible(false);
  });
  const {
    isSmallDesktop
  } = useMediaQuery();
  function handleOnClick() {
    if (actionsDisabled)
      return;
    else if (isAssigned) {
      callback();
    } else {
      setVisible(!visible);
    }
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._button_wrapper,
    id: "startCadenceButton",
    children: /* @__PURE__ */ _jsxDEV(Dropdown, {
      ref: dropdownRef,
      width: "100%",
      visible,
      arrow: true,
      anchor: children ? /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: actionsDisabled && t("noPermissionsTooltip", {
          bobjectType: bobjectTypeT(bobjectType.toLowerCase())
        }),
        position: "top",
        children: React.cloneElement(children, {
          onClick: handleOnClick
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 150,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ _jsxDEV(Button, {
        dataTest: "Cadence-Start",
        size: "small",
        variant: "secondary",
        iconLeft: "play",
        onClick: () => {
          isAssigned ? callback() : setVisible(!visible);
        },
        children: !isSmallDesktop && t("start")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 160,
        columnNumber: 13
      }, void 0),
      children: /* @__PURE__ */ _jsxDEV(DropdownContent, {
        activeUserId,
        activeBobject,
        contactBobjects,
        setDropdownVisible: setVisible,
        callback
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 174,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 142,
    columnNumber: 5
  }, void 0);
};
_s2(AutoAssignDropdown, "l8rwhA+OGIPro9qnWbHJyzGtGFs=", false, function() {
  return [useVisible, useTranslation, useTranslation, useClickAway, useMediaQuery];
});
_c2 = AutoAssignDropdown;
var _c, _c2;
$RefreshReg$(_c, "DropdownContent");
$RefreshReg$(_c2, "AutoAssignDropdown");
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

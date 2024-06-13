import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-assignCadenceDropdown-adminAssignDropdown-adminAssignDropdown.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceControlModal/assignCadenceDropdown/adminAssignDropdown/adminAssignDropdown.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceControlModal/assignCadenceDropdown/adminAssignDropdown/adminAssignDropdown.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useState = __vite__cjsImport2_react["useState"];
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useClickAway } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import { Button, Dropdown, Radio, RadioGroup, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-assignCadenceDropdown-adminAssignDropdown-adminAssignDropdown.module.css.js";
import { useAdminAssignBobjects } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-assignCadenceDropdown-adminAssignDropdown-useAdminAssignBobjets.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const DropdownContent = ({
  activeUserId: userId,
  activeBobject,
  setDropdownVisible,
  onUnmountDropdown,
  callback
}) => {
  _s();
  const [assignType, setAssignType] = useState("assignToMe");
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceControlModal.assignCadenceDropdown.admin"
  });
  const {
    t: bobjectTypeT
  } = useTranslation("translation", {
    keyPrefix: "bobjectTypes"
  });
  const {
    assignBobjects
  } = useAdminAssignBobjects(userId);
  const bobjectType = activeBobject?.id?.typeName;
  const users = useUserSearch();
  const assignedToValue = "assignedTo" in activeBobject ? activeBobject?.assignedTo : getValueFromLogicRole(activeBobject, FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO);
  const assignee = users?.users?.find((user) => user?.id === assignedToValue);
  const handleSubmit = (event) => {
    onUnmountDropdown?.();
    assignBobjects({
      activeBobject,
      mode: assignType,
      callback: () => {
        callback(event);
        setDropdownVisible(false);
      },
      event
    });
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._auto_assign_dropdown,
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      size: "s",
      weight: "bold",
      className: styles._auto_assign_text,
      children: t("title", {
        bobjectType: bobjectTypeT(bobjectType.toLowerCase()).toLowerCase()
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      color: "softPeanut",
      className: styles._auto_assign_text,
      children: t("subtitle")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._radio_group,
      children: /* @__PURE__ */ _jsxDEV(RadioGroup, {
        defaultValue: "assignToMe",
        onChange: (value) => {
          setAssignType(value);
        },
        children: [/* @__PURE__ */ _jsxDEV(Radio, {
          value: "assignToMe",
          size: "small",
          expand: true,
          children: /* @__PURE__ */ _jsxDEV(Trans, {
            i18nKey: "cadence.cadenceControlModal.assignCadenceDropdown.admin.assignToMe"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 69,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Radio, {
          value: "startCadence",
          size: "small",
          expand: true,
          children: /* @__PURE__ */ _jsxDEV(Trans, {
            i18nKey: "cadence.cadenceControlModal.assignCadenceDropdown.admin.startCadence",
            values: {
              name: assignee?.name || ""
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 72,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 71,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
      onClick: (event) => handleSubmit(event),
      children: "Continue"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 54,
    columnNumber: 5
  }, void 0);
};
_s(DropdownContent, "ZssRmabxUve7IjOoEKp3pU8015I=", false, function() {
  return [useTranslation, useTranslation, useAdminAssignBobjects, useUserSearch];
});
_c = DropdownContent;
export const AdminAssignDropdown = ({
  activeUserId,
  callback,
  activeBobject,
  onRenderDropdown,
  onUnmountDropdown,
  children
}) => {
  _s2();
  const {
    ref: dropdownRef,
    visible,
    setVisible
  } = useVisible();
  useClickAway(dropdownRef, () => {
    setVisible(false);
    onUnmountDropdown?.();
  });
  function handleOnClick() {
    onRenderDropdown?.();
    setVisible(!visible);
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._button_wrapper,
    id: "startCadenceButton",
    children: /* @__PURE__ */ _jsxDEV(Dropdown, {
      ref: dropdownRef,
      width: "100%",
      visible,
      arrow: true,
      anchor: React.cloneElement(children, {
        onClick: handleOnClick
      }),
      children: /* @__PURE__ */ _jsxDEV(DropdownContent, {
        activeUserId,
        activeBobject,
        setDropdownVisible: setVisible,
        onUnmountDropdown,
        callback
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 113,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 105,
    columnNumber: 5
  }, void 0);
};
_s2(AdminAssignDropdown, "fiyhcj8bg472N5snU3fkIS5s56g=", false, function() {
  return [useVisible, useClickAway];
});
_c2 = AdminAssignDropdown;
var _c, _c2;
$RefreshReg$(_c, "DropdownContent");
$RefreshReg$(_c2, "AdminAssignDropdown");
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

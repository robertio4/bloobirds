import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-assignedToSelector-assignedToSelector.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/assignedToSelector/assignedToSelector.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/assignedToSelector/assignedToSelector.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Dropdown, Icon, Input, Spinner, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useDataModel, useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-assignedToSelector-assignedToSelector.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const UserOptions = ({
  filteredUsers,
  handleOnCardClick
}) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "bobjects.assignToSelector.userOptions"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.results,
    children: filteredUsers?.length > 0 ? filteredUsers?.map((user) => {
      if (user && user?.id) {
        return /* @__PURE__ */ _jsxDEV("div", {
          className: styles.result_row,
          onClick: () => {
            handleOnCardClick(user?.id);
          },
          children: /* @__PURE__ */ _jsxDEV(Text, {
            size: "s",
            color: "peanut",
            weight: "medium",
            children: user?.name || t("unnamed")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 32,
            columnNumber: 17
          }, void 0)
        }, user?.id, false, {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 15
        }, void 0);
      }
    }) : /* @__PURE__ */ _jsxDEV("div", {
      className: styles.noResultFound,
      children: [/* @__PURE__ */ _jsxDEV(Icon, {
        name: "searchNone",
        size: 32,
        color: "softPeanut"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.text,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          color: "softPeanut",
          size: "s",
          align: "center",
          children: t("noResultsTitle")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          color: "softPeanut",
          size: "s",
          align: "center",
          children: t("noResultsSubtitle")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 20,
    columnNumber: 5
  }, void 0);
};
_s(UserOptions, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = UserOptions;
export const AssignedToSelector = ({
  assignedToId,
  updateAssignedTo
}) => {
  _s2();
  const {
    users
  } = useUserSearch() || {};
  const dataModel = useDataModel();
  const assignedTo = dataModel && dataModel.findValueById(assignedToId);
  const userName = assignedTo?.name;
  const {
    t
  } = useTranslation();
  const {
    visible,
    ref,
    setVisible
  } = useVisible(false);
  const [searchValue, setSearchValue] = useState("");
  function handleOnCardClick(userId) {
    setSearchValue("");
    updateAssignedTo(userId);
    setVisible(false);
  }
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    width: 323,
    ref,
    visible,
    zIndex: 2e4,
    anchor: /* @__PURE__ */ _jsxDEV("span", {
      onClick: () => setVisible(!visible),
      className: styles.link_button,
      children: /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "bloobirds",
        weight: "regular",
        children: userName
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 9
    }, void 0),
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.content,
      children: [/* @__PURE__ */ _jsxDEV(Input, {
        autoFocus: true,
        width: "100%",
        placeholder: t("common.search"),
        onChange: setSearchValue,
        className: styles.input
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 9
      }, void 0), users ? /* @__PURE__ */ _jsxDEV(UserOptions, {
        filteredUsers: users?.filter((user) => user?.name?.toLowerCase()?.includes(searchValue.toLowerCase())),
        handleOnCardClick
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(Spinner, {
        name: "loadingCircle"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 79,
    columnNumber: 5
  }, void 0);
};
_s2(AssignedToSelector, "mjBmUqgiv/M8ql3BKlwSC9fBUjQ=", false, function() {
  return [useUserSearch, useDataModel, useTranslation, useVisible];
});
_c2 = AssignedToSelector;
var _c, _c2;
$RefreshReg$(_c, "UserOptions");
$RefreshReg$(_c2, "AssignedToSelector");
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

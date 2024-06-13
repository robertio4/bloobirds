import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/users/userTeamsFilter/userFilterByTeams.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/users/userTeamsFilter/userFilterByTeams.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/users/userTeamsFilter/userFilterByTeams.tsx", _s = $RefreshSig$();
import { useFilters, UserFilterByTeams } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-index.tsx.js";
import { useActiveUserId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { getBobjectFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const UserFilterByTeamsLeftBar = ({
  fieldLR
}) => {
  _s();
  const {
    setFilter,
    getFilterValue
  } = useFilters();
  const activeUserId = useActiveUserId();
  const value = getFilterValue(fieldLR);
  const handleOnChange = (value2) => {
    if (value2?.length === 0) {
      setFilter(getBobjectFromLogicRole(fieldLR), fieldLR, [activeUserId]);
    } else {
      setFilter(getBobjectFromLogicRole(fieldLR), fieldLR, value2);
    }
  };
  return /* @__PURE__ */ _jsxDEV(UserFilterByTeams, {
    value,
    onChange: handleOnChange,
    selectProps: {
      width: "100px"
    }
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 21,
    columnNumber: 5
  }, void 0);
};
_s(UserFilterByTeamsLeftBar, "BrN0VlGbHKC7Afx3JLN7XEQLI8I=", false, function() {
  return [useFilters, useActiveUserId];
});
_c = UserFilterByTeamsLeftBar;
var _c;
$RefreshReg$(_c, "UserFilterByTeamsLeftBar");
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

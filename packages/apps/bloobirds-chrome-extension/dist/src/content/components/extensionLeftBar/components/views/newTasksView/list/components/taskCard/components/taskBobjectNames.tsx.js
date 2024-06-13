import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/taskBobjectNames.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/taskBobjectNames.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/taskBobjectNames.tsx", _s = $RefreshSig$();
import styles from "/src/content/components/extensionLeftBar/components/views/newTasksView/list/taskTabsList.module.css.js";
import { Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useIsB2CAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function BobjectName({
  name,
  icon,
  width,
  onClick
}) {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.bobjectName,
    style: {
      maxWidth: width
    },
    onClick,
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: icon,
      color: "lightBloobirds",
      size: 14
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(Text, {
      className: styles.bobjectNameText,
      color: "bloobirds",
      size: "xs",
      weight: "bold",
      children: name
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 5
  }, this);
}
_c = BobjectName;
export function BobjectNames({
  task
}) {
  _s();
  const {
    setContactViewBobjectId
  } = useExtensionContext();
  const isB2CAccount = useIsB2CAccount();
  if (isB2CAccount) {
    task.company = null;
  }
  const hasLeadAndMore = task.lead && (task.company || task.opportunity);
  const hasCompanyAndMore = task.company && task.opportunity;
  const numberOfBobjects = [task.lead, task.company, task.opportunity].filter(Boolean).length;
  const width = `${100 / numberOfBobjects}%`;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.bobjectNames,
    children: [task.lead && /* @__PURE__ */ _jsxDEV(BobjectName, {
      name: task.lead.name,
      icon: "person",
      width,
      onClick: (e) => {
        e.stopPropagation();
        setContactViewBobjectId(task.lead.id);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 21
    }, this), hasLeadAndMore && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.bobjectNamesSeparator
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 26
    }, this), task.company && !isB2CAccount && /* @__PURE__ */ _jsxDEV(BobjectName, {
      name: task.company.name,
      icon: "company",
      width,
      onClick: (e) => {
        e.stopPropagation();
        setContactViewBobjectId(task.company.id);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 41
    }, this), hasCompanyAndMore && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.bobjectNamesSeparator
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 29
    }, this), task.opportunity && /* @__PURE__ */ _jsxDEV(BobjectName, {
      name: task.opportunity.name,
      icon: "fileOpportunity",
      width,
      onClick: (e) => {
        e.stopPropagation();
        setContactViewBobjectId(task.opportunity.id);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 28
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 29,
    columnNumber: 5
  }, this);
}
_s(BobjectNames, "ni4lbXrwM6aKFo3SztaxUBtPwIA=", false, function() {
  return [useExtensionContext, useIsB2CAccount];
});
_c2 = BobjectNames;
var _c, _c2;
$RefreshReg$(_c, "BobjectName");
$RefreshReg$(_c2, "BobjectNames");
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

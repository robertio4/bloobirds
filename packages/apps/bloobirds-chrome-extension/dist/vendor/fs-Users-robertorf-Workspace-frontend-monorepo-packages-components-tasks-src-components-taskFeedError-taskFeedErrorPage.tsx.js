import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-components-taskFeedError-taskFeedErrorPage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/tasks/src/components/taskFeedError/taskFeedErrorPage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/tasks/src/components/taskFeedError/taskFeedErrorPage.tsx", _s = $RefreshSig$();
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-components-taskFeedError-taskFeedErrorPage.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TaskFeedErrorPage = ({
  onClick
}) => {
  _s();
  const {
    t,
    i18n
  } = useTranslation("translation", {
    keyPrefix: "taskFeedErrorPage"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.wrapper,
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: "taskAction",
      size: 36,
      color: "softPeanut"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "l",
      color: "peanut",
      align: "center",
      children: t("title")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "m",
      color: "softPeanut",
      align: "center",
      children: t("subtitle")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
      onClick,
      variant: "secondary",
      size: "small",
      children: t("reloadButton")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "s",
      color: "softPeanut",
      align: "center",
      children: /* @__PURE__ */ _jsxDEV(Trans, {
        i18nKey: "taskFeedErrorPage.linkText",
        components: [/* @__PURE__ */ _jsxDEV("a", {
          href: i18n.language === "en" ? "https://support.bloobirds.com/hc/es-us/requests/new" : "https://support.bloobirds.com/hc/es-es/requests/new",
          target: "_blank",
          rel: "noreferrer"
        }, "0", false, {
          fileName: _jsxFileName,
          lineNumber: 27,
          columnNumber: 13
        }, void 0)]
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 5
  }, void 0);
};
_s(TaskFeedErrorPage, "OZwazanA59tbNDUkc8lMSmTHj9Q=", false, function() {
  return [useTranslation];
});
_c = TaskFeedErrorPage;
var _c;
$RefreshReg$(_c, "TaskFeedErrorPage");
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

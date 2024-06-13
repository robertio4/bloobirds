import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/name/name.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/name/name.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/name/name.tsx", _s = $RefreshSig$();
import { BobjectTypes, MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import classnames from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/name/name.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const Name = ({
  bobject,
  name,
  isCompleted = false,
  className = ""
}) => {
  _s();
  const {
    setContactViewBobjectId,
    closeExtendedScreen
  } = useExtensionContext();
  const onCardClick = () => {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension));
    setContactViewBobjectId(bobject?.id?.value);
    closeExtendedScreen();
  };
  return /* @__PURE__ */ _jsxDEV("span", {
    "data-test": `Span-${bobject?.id?.typeName}-${name}`,
    className: classnames(styles._container, className, {
      [styles._is_complete]: isCompleted
    }),
    onClick: (event) => {
      const bobjectType = bobject?.id?.typeName;
      if (bobjectType === BobjectTypes.Lead || bobjectType === BobjectTypes.Company || bobjectType === BobjectTypes.Opportunity) {
        onCardClick();
      }
      event.preventDefault();
      event.stopPropagation();
    },
    children: typeof name === "string" && name
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 26,
    columnNumber: 5
  }, void 0);
};
_s(Name, "sYw0XlkhqIe57EkrzM4lupcQ1Rk=", false, function() {
  return [useExtensionContext];
});
_c = Name;
var _c;
$RefreshReg$(_c, "Name");
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

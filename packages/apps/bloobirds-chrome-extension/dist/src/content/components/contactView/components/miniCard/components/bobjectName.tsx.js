import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/miniCard/components/bobjectName.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/miniCard/components/bobjectName.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/miniCard/components/bobjectName.tsx", _s = $RefreshSig$();
import { Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { BobjectTypes, FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getMainBobjectIcon, getTextFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { ContactViewTab } from "/src/types/contactView.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import styles from "/src/content/components/contactView/components/miniCard/miniCard.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const BobjectName = ({
  bobject,
  style,
  isBold
}) => {
  _s();
  const {
    setActiveTab
  } = useContactViewContext();
  const {
    setActiveBobject,
    useGetActiveBobjectContext
  } = useExtensionContext();
  const data = useGetActiveBobjectContext();
  const bobjectType = bobject?.id?.typeName;
  const bobjectNameText = getTextFromLogicRole(bobject, bobjectType === BobjectTypes.Company || bobjectType === BobjectTypes.Opportunity ? FIELDS_LOGIC_ROLE[bobjectType]?.NAME : LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  const handleClick = () => {
    let bobjectToRedirect;
    switch (bobjectType) {
      case BobjectTypes.Company:
        bobjectToRedirect = data?.company;
        break;
      case BobjectTypes.Lead:
        bobjectToRedirect = data?.leads?.find((l) => l?.id?.value === bobject?.id?.value);
        break;
      case BobjectTypes.Opportunity:
        bobjectToRedirect = data?.opportunities?.find((o) => o?.id?.value === bobject?.id?.value);
        break;
      default:
        break;
    }
    if (bobjectToRedirect) {
      setActiveBobject(bobjectToRedirect);
      setActiveTab(ContactViewTab[bobjectType?.toUpperCase()]);
    }
  };
  const icon = getMainBobjectIcon(bobjectType);
  return bobjectNameText ? /* @__PURE__ */ _jsxDEV("span", {
    className: styles.leadName,
    style,
    onClick: handleClick,
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: icon,
      color: "bloobirds",
      size: 14
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      color: "bloobirds",
      size: "xs",
      weight: isBold ? "bold" : "regular",
      children: bobjectNameText
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 61,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
};
_s(BobjectName, "ExH6V8q3FcfrDY+IT0j1yYfxaXM=", true, function() {
  return [useContactViewContext, useExtensionContext];
});
_c = BobjectName;
var _c;
$RefreshReg$(_c, "BobjectName");
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

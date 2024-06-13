import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-copyText-copyText.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/copyText/copyText.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/copyText/copyText.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { IconButton, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-copyText-infoCardTemplate.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CopyText = ({
  children,
  isLinkTypeField = false,
  htmlFormat = false,
  textToCopy,
  alwaysDisplay = false
}) => {
  _s();
  if (!React.isValidElement(children))
    throw new Error("The copy component is not recieving the appropiate children");
  const [isVisible, setIsVisible] = useState(false);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "copyText"
  });
  const [tooltipText, setTooltipText] = useState(t("copyToClipboard"));
  function handleOnClick() {
    setTooltipText(t("copied"));
    const clipboardElement = htmlFormat ? new ClipboardItem({
      "text/html": new Blob([`${textToCopy}`], {
        type: "text/html"
      })
    }) : new ClipboardItem({
      "text/plain": new Blob([`${textToCopy}`], {
        type: "text/plain"
      })
    });
    navigator.clipboard.write([clipboardElement]);
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    onMouseEnter: () => setIsVisible(true),
    onMouseLeave: () => {
      setIsVisible(false);
      setTooltipText(t("copyToClipboard"));
    },
    className: clsx(styles._copy_component, {
      [styles._link_copy_component]: isLinkTypeField
    }),
    children: [children, /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: tooltipText,
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(IconButton, {
        size: 16,
        name: "copy",
        className: clsx(styles._copy_icon, {
          [styles._show_icon]: isVisible || alwaysDisplay
        }),
        onClick: handleOnClick
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 49,
    columnNumber: 5
  }, void 0);
};
_s(CopyText, "arEfqHCNn6FKDnbXhxgyMJz5YfE=", false, function() {
  return [useTranslation];
});
_c = CopyText;
var _c;
$RefreshReg$(_c, "CopyText");
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

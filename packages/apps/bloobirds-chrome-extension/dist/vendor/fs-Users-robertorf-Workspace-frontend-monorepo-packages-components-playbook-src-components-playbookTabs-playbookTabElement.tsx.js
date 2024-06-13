import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookTabs-playbookTabElement.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookTabs/playbookTabElement.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookTabs/playbookTabElement.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport2_react["useMemo"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { templateTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { motion } from "/vendor/.vite-deps-framer-motion.js__v--396e37ef.js";
import __vite__cjsImport8_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport8_mixpanelBrowser.__esModule ? __vite__cjsImport8_mixpanelBrowser.default : __vite__cjsImport8_mixpanelBrowser;
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-playbookFeed.module.css.js";
import { Fragment as _Fragment, jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const PlaybookTabElement = (props) => {
  _s();
  const {
    name,
    icon,
    onClick,
    selected,
    sidePeekEnabled,
    className,
    dataTest,
    isSmartEmail
  } = props;
  const isSelected = selected === name;
  const {
    t
  } = useTranslation();
  const isSmallScreen = window.innerWidth < 1440;
  const largeView = useMemo(() => {
    return sidePeekEnabled && !isSmallScreen;
  }, [sidePeekEnabled, isSmallScreen]);
  const TooltipWrapper = ({
    children
  }) => {
    return largeView || isSmartEmail ? /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [" ", children, " "]
    }, void 0, true) : /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: t(`playbook.${name.toLowerCase()}`),
      position: "bottom",
      children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }, void 0);
  };
  const AnimationWrapper = ({
    children
  }) => {
    return largeView || isSmartEmail ? /* @__PURE__ */ _jsxDEV(_Fragment, {
      children
    }, void 0, false) : isSelected && /* @__PURE__ */ _jsxDEV(motion.div, {
      initial: {
        opacity: 0,
        y: -10
      },
      animate: {
        opacity: 1,
        y: 0
      },
      transition: {
        type: "flex"
      },
      children
    }, name, false, {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 9
    }, void 0);
  };
  return /* @__PURE__ */ _jsxDEV(TooltipWrapper, {
    children: /* @__PURE__ */ _jsxDEV("div", {
      style: {
        width: largeView ? 74 : void 0
      },
      className: clsx(className || styles.tab_container),
      onClick: () => {
        if (onClick) {
          onClick(name);
          mixpanel.track(`CLICK_ON_${templateTypes[name]}_SECTION_FROM_PLAYBOOK_OTO`);
        }
      },
      ...dataTest ? {
        "data-test": dataTest
      } : {},
      children: [/* @__PURE__ */ _jsxDEV(Icon, {
        name: icon,
        color: isSelected ? "purple" : "softPeanut",
        size: largeView ? 24 : 20
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 85,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(AnimationWrapper, {
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: isSelected ? "purple" : "softPeanut",
          weight: isSelected ? "bold" : "regular",
          className: styles.title_sidePeek,
          children: t(`playbook.${name.toLowerCase()}`)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 88,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 73,
    columnNumber: 5
  }, void 0);
};
_s(PlaybookTabElement, "6M3ypA7fH7OqqIzp+j6v7EOhVjU=", false, function() {
  return [useTranslation];
});
_c = PlaybookTabElement;
var _c;
$RefreshReg$(_c, "PlaybookTabElement");
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

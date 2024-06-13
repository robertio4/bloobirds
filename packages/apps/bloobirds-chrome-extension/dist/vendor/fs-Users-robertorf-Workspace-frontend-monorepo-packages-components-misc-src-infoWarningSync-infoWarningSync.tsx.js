import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-src-infoWarningSync-infoWarningSync.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/misc/src/infoWarningSync/infoWarningSync.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/misc/src/infoWarningSync/infoWarningSync.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useClickAway } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import { Action, Dropdown, Icon, Button } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { MIXPANEL_EVENTS, UserRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { baseUrls } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport10_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport10_mixpanelBrowser.__esModule ? __vite__cjsImport10_mixpanelBrowser.default : __vite__cjsImport10_mixpanelBrowser;
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-src-infoWarningSync-infoWarning.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const InfoWarningSync = ({
  type,
  id,
  size = "small"
}) => {
  _s();
  const [visible, setVisible] = useState(false);
  const {
    settings
  } = useActiveUserSettings();
  const isAdminUser = settings?.user?.roles?.includes(UserRole.GLOBAL_ADMIN) || settings?.user?.roles?.includes(UserRole.ACCOUNT_ADMIN);
  const {
    t
  } = useTranslation();
  const ref = useRef(null);
  useClickAway(ref, () => setVisible(false));
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    visible,
    width: 200,
    position: "top",
    style: {
      padding: "0px"
    },
    ref,
    anchor: /* @__PURE__ */ _jsxDEV("div", {
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        setVisible(true);
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SYNC_ISSUE);
      },
      className: clsx(styles.anchor, {
        [styles.anchorMedium]: size === "medium"
      }),
      children: /* @__PURE__ */ _jsxDEV(Action, {
        icon: "alertTriangle",
        color: "softBanana"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 9
    }, void 0),
    color: "verySoftBanana",
    children: /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.title,
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: "alertTriangle",
          color: "peanut",
          size: 24
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 59,
          columnNumber: 11
        }, void 0), t("extendedScreen.header.syncIssues")]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 9
      }, void 0), isAdminUser ? /* @__PURE__ */ _jsxDEV("div", {
        className: styles.body,
        children: [/* @__PURE__ */ _jsxDEV(Trans, {
          i18nKey: "extendedScreen.header.syncIssuesMessageAdmin",
          values: {
            type
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
          variant: "secondary",
          iconRight: "externalLink",
          uppercase: false,
          expand: true,
          size: "small",
          className: styles.viewLogsButton,
          onClick: () => window.open(`${baseUrls["development"]}/app/account-settings/integration/salesforce/sync?&bobjectType=${id?.typeName}&bobjectId=${id?.objectId}&dateRange=all_time`, "_blank"),
          children: t("extendedScreen.header.viewLogs")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 65,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
        className: styles.body,
        children: /* @__PURE__ */ _jsxDEV(Trans, {
          i18nKey: "extendedScreen.header.syncIssuesMessage",
          values: {
            type
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 88,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 11
      }, void 0)]
    }, void 0, true)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 34,
    columnNumber: 5
  }, void 0);
};
_s(InfoWarningSync, "+5Ua62S5SyrJRw+R2svyLiGiNIQ=", false, function() {
  return [useActiveUserSettings, useTranslation, useClickAway];
});
_c = InfoWarningSync;
var _c;
$RefreshReg$(_c, "InfoWarningSync");
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

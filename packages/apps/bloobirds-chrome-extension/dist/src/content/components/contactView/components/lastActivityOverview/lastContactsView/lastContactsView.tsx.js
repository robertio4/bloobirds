import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/lastActivityOverview/lastContactsView/lastContactsView.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/lastActivityOverview/lastContactsView/lastContactsView.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/lastActivityOverview/lastContactsView/lastContactsView.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Skeleton, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/contactView/components/lastActivityOverview/lastActivityOverview.module.css.js";
import { useLastActivity } from "/src/content/components/contactView/components/lastActivityOverview/utils/useLastActivity.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const applyHoverStyles = (event, color) => {
  const element = event.currentTarget;
  if (element) {
    element.style.boxShadow = `0px 0px 4px 0px var(--${color})`;
  }
};
const removeHoverStyles = (event) => {
  const element = event.currentTarget;
  if (element) {
    element.style.boxShadow = "";
  }
};
const ActivityInfoCard = ({
  title,
  subtitle,
  color,
  iconName,
  onClick
}) => {
  if (typeof title !== "string" || typeof subtitle !== "string")
    return null;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._activity_info_card,
    style: {
      borderColor: `var(--${color}`,
      paddingLeft: !!iconName && 4,
      cursor: onClick ? "pointer" : "default"
    },
    id: "activityInfocard",
    onMouseOver: (event) => {
      if (onClick)
        applyHoverStyles(event, color);
    },
    onMouseOut: (event) => {
      if (onClick)
        removeHoverStyles(event);
    },
    ...onClick ? {
      onClick
    } : {},
    children: [iconName && /* @__PURE__ */ _jsxDEV(Icon, {
      name: iconName,
      color
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 20
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._activity_info_card_text,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        color,
        size: "m",
        weight: "medium",
        children: title
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "softPeanut",
        children: subtitle
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 41,
    columnNumber: 5
  }, void 0);
};
_c = ActivityInfoCard;
function NoActivity() {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.overview.lastActivity"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    style: {
      padding: "8px",
      textAlignLast: "center",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    },
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      weight: "bold",
      size: "s",
      children: t("noActivity")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(Text, {
      color: "softPeanut",
      size: "s",
      children: t("noActivitySubtitle")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 73,
    columnNumber: 5
  }, this);
}
_s(NoActivity, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c2 = NoActivity;
function LastActivitySkeleton() {
  return /* @__PURE__ */ _jsxDEV("div", {
    style: {
      height: "50px",
      width: "100%",
      paddingTop: "8px"
    },
    children: /* @__PURE__ */ _jsxDEV(Skeleton, {
      variant: "rect",
      height: "100%",
      width: "100%"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 94,
    columnNumber: 5
  }, this);
}
_c3 = LastActivitySkeleton;
export const LastContactsView = ({
  bobjectId,
  leadsIds,
  companyId
}) => {
  _s2();
  const {
    timeInfo,
    activityInfo,
    onClick,
    hasNoActivity
  } = useLastActivity(bobjectId, leadsIds, companyId) || {};
  const {
    useGetSidePeekEnabled
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  if (!activityInfo) {
    return /* @__PURE__ */ _jsxDEV(LastActivitySkeleton, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 12
    }, void 0);
  }
  return hasNoActivity ? /* @__PURE__ */ _jsxDEV(NoActivity, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 121,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles._last_contacts_wrapper, {
      [styles._last_contacts_wrapper_bubble]: !sidePeekEnabled
    }),
    children: [/* @__PURE__ */ _jsxDEV(ActivityInfoCard, {
      ...timeInfo
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ActivityInfoCard, {
      ...activityInfo,
      onClick
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 123,
    columnNumber: 5
  }, void 0);
};
_s2(LastContactsView, "Zl8TcGd36z4D9Cge/kAJ7nLx4b0=", true, function() {
  return [useLastActivity, useExtensionContext];
});
_c4 = LastContactsView;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "ActivityInfoCard");
$RefreshReg$(_c2, "NoActivity");
$RefreshReg$(_c3, "LastActivitySkeleton");
$RefreshReg$(_c4, "LastContactsView");
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

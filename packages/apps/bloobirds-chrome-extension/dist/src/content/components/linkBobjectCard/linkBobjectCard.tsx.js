import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/linkBobjectCard/linkBobjectCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkBobjectCard/linkBobjectCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkBobjectCard/linkBobjectCard.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { BobjectItemCompressed } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { Button, useHover } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { api, bobjectPlurals, getExtensionBobjectByIdFields } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import styles from "/src/content/components/linkBobjectCard/linkBobjectCard.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function parseLongIdIntoIdFields(value) {
  if (!value) {
    return {};
  }
  const [accountId, typeName, objectId] = value.split("/");
  return {
    value,
    typeName,
    objectId,
    accountId
  };
}
export function LinkBobjectCard({
  bobject,
  dataToUpdate,
  linkedInUrl,
  salesNavigatorURL,
  setExactMatch,
  setCurrentBobject
}) {
  _s();
  const {
    useGetSidePeekEnabled,
    setActiveBobject
  } = useExtensionContext();
  const {
    setShowBackButton,
    setIsDuplicatePage
  } = useFloatingMenuContext();
  const isBubbleHomepage = !useGetSidePeekEnabled();
  const linkableBobjectClasses = clsx(styles.linkableBobject, {
    [styles.linkableItemSidePeek]: !isBubbleHomepage
  });
  const bobjectIdValue = bobject && "id" in bobject && bobject?.id?.value ? bobject.id.value : bobject?.rawBobject?.id;
  const [ref, isHovering] = useHover();
  const [loading, setLoading] = useState(false);
  const [bobjectId, setBobjectId] = useState(parseLongIdIntoIdFields(bobjectIdValue));
  const {
    t
  } = useTranslation();
  useEffect(() => {
    setBobjectId(parseLongIdIntoIdFields(bobjectIdValue));
  }, [bobject]);
  const handleLink = () => {
    setLoading(true);
    getExtensionBobjectByIdFields(bobjectId).then(async ({
      data: bobjectToSet
    }) => {
      try {
        if (linkedInUrl || salesNavigatorURL) {
          if (bobjectId?.typeName) {
            await api.put(`/linkedin/${bobjectPlurals[bobjectId?.typeName]?.toLowerCase()}/` + bobjectToSet.id.objectId, {
              salesNavigatorUrl: salesNavigatorURL,
              linkedInUrl
            });
          }
        } else if (dataToUpdate) {
          if (bobjectToSet?.id?.value) {
            await api.patch(`/bobjects/${bobjectToSet?.id?.value}/raw`, {
              contents: {
                ...dataToUpdate
              },
              params: {}
            });
          }
        }
        if (bobjectToSet) {
          setCurrentBobject?.([bobjectToSet]);
          setActiveBobject(bobjectToSet);
          setExactMatch?.(true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    });
  };
  const handleRedirect = () => {
    setLoading(true);
    getExtensionBobjectByIdFields(bobjectId).then(({
      data: bobjectToSet
    }) => {
      if (bobjectToSet) {
        setActiveBobject(bobjectToSet);
        setShowBackButton(true);
        setIsDuplicatePage(true);
      }
      setLoading(false);
    });
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    ref,
    className: linkableBobjectClasses,
    children: [/* @__PURE__ */ _jsxDEV(BobjectItemCompressed, {
      bobject: {
        ...bobject,
        url: null,
        bobjectType: bobject && "bobjectType" in bobject ? bobject?.bobjectType : bobjectId?.typeName
      },
      handleCompanyClicked: () => null,
      handleClick: handleRedirect,
      hoverLight: true
    }, bobjectId?.value, false, {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 7
    }, this), isHovering && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._hoverButtons,
      children: [/* @__PURE__ */ _jsxDEV(Button, {
        variant: "secondary",
        iconLeft: "bloobirds",
        size: "small",
        onClick: handleRedirect,
        disabled: loading
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 144,
        columnNumber: 11
      }, this), /* @__PURE__ */ _jsxDEV(Button, {
        iconLeft: linkedInUrl || salesNavigatorURL ? "linkedin" : "salesforce",
        size: "small",
        onClick: handleLink,
        disabled: loading,
        uppercase: false,
        children: t("link")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 151,
        columnNumber: 11
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 9
    }, this)]
  }, bobjectId?.value, true, {
    fileName: _jsxFileName,
    lineNumber: 122,
    columnNumber: 5
  }, this);
}
_s(LinkBobjectCard, "/Ry9hpZzf3mz9JUWAZYNO/Z9OvM=", true, function() {
  return [useExtensionContext, useFloatingMenuContext, useHover, useTranslation];
});
_c = LinkBobjectCard;
var _c;
$RefreshReg$(_c, "LinkBobjectCard");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/syncSalesforceLists/syncListButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/syncSalesforceLists/syncListButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/syncSalesforceLists/syncListButton.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useSalesforceLeftBarEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { v4 as uuid } from "/vendor/.vite-deps-uuid.js__v--488548d2.js";
import { getSalesforceSobjectFromPage, isSalesforceListPage } from "/src/utils/url.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { SyncCadencesModal } from "/src/content/components/syncSalesforceLists/components/syncCadencesModal/syncCadencesModal.tsx.js";
import { SyncListModal } from "/src/content/components/syncSalesforceLists/components/syncListModal/syncListModal.tsx.js";
import SyncButton from "/src/content/components/syncSalesforceLists/syncButton.tsx.js";
import styles from "/src/content/components/syncSalesforceLists/syncListButton.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const allowedSobjectTypes = ["Lead", "Contact", "Account", "Opportunity"];
const createLiElement = (id, className) => {
  const syncRootElement = document.createElement("li");
  syncRootElement.setAttribute("id", id);
  syncRootElement.setAttribute("style", "align-self: center");
  syncRootElement.setAttribute("class", className);
  return syncRootElement;
};
const SyncListButtonContainer = () => {
  _s();
  const {
    useGetSettings,
    useGetLoggedIn
  } = useExtensionContext();
  const settings = useGetSettings();
  const isLoggedIn = useGetLoggedIn();
  const isSalesforceList = isSalesforceListPage(window.location.href);
  const [renderId, setRenderId] = useState();
  const isSalesforceEnabled = useSalesforceLeftBarEnabled(settings?.account?.id);
  const listReferenceElement = document.getElementsByClassName("forceActionsContainer")[0];
  const sobjectType = getSalesforceSobjectFromPage(window.location.href);
  const isSyncableSobjectType = allowedSobjectTypes.includes(sobjectType);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extension.syncBBButtons"
  });
  const shouldShowButton = isLoggedIn && isSalesforceEnabled && isSyncableSobjectType;
  const syncRootElement = createLiElement(
    "bb-sync-list-li",
    listReferenceElement?.childNodes?.[0]?.className
  );
  const cadenceRootElement = createLiElement(
    "bb-cadence-list-li",
    listReferenceElement?.childNodes?.[0]?.className
  );
  useEffect(() => {
    function chromeTabListener(request) {
      if (request.message === "TAB_UPDATED") {
        setRenderId(uuid());
      }
    }
    chrome?.runtime?.onMessage.addListener(chromeTabListener);
    return () => {
      chrome?.runtime?.onMessage.removeListener(chromeTabListener);
    };
  }, []);
  useEffect(() => {
    const listReferenceElement2 = document.getElementsByClassName("forceActionsContainer")[0];
    const hasSyncButtonsInList = listReferenceElement2?.querySelector('li[id="bb-sync-list-li"]') && listReferenceElement2?.querySelector('li[id="bb-cadence-list-li"]');
    if (!hasSyncButtonsInList && listReferenceElement2 && isSalesforceList && shouldShowButton) {
      setRenderId(uuid());
      listReferenceElement2.insertBefore(syncRootElement, listReferenceElement2.firstChild);
      listReferenceElement2.insertBefore(cadenceRootElement, syncRootElement);
    }
  }, [renderId, listReferenceElement, isSalesforceList]);
  const CadenceSyncTitle = () => /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: "playOutline",
      size: 14,
      className: styles.iconButton
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 7
    }, void 0), " ", t("addToCadence")]
  }, void 0, true);
  const ListSyncTitle = () => /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [t("syncIn"), " ", /* @__PURE__ */ _jsxDEV(Icon, {
      name: "bloobirds",
      size: 14,
      className: styles.iconButton
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 21
    }, void 0)]
  }, void 0, true);
  return shouldShowButton && renderId && isSalesforceList ? /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(SyncButton, {
      id: "bb-cadence-list-li",
      title: /* @__PURE__ */ _jsxDEV(CadenceSyncTitle, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 16
      }, void 0),
      children: /* @__PURE__ */ _jsxDEV(SyncCadencesModal, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 9
      }, void 0)
    }, `${renderId}_cadence_button`, false, {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(SyncButton, {
      id: "bb-sync-list-li",
      title: /* @__PURE__ */ _jsxDEV(ListSyncTitle, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 98,
        columnNumber: 81
      }, void 0),
      children: /* @__PURE__ */ _jsxDEV(SyncListModal, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 9
      }, void 0)
    }, `${renderId}_list_button`, false, {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 7
    }, void 0)]
  }, void 0, true) : null;
};
_s(SyncListButtonContainer, "FNO6YbFLWAuvZ2EsHZsYvEJQP6o=", true, function() {
  return [useExtensionContext, useSalesforceLeftBarEnabled, useTranslation];
});
_c = SyncListButtonContainer;
export default SyncListButtonContainer;
var _c;
$RefreshReg$(_c, "SyncListButtonContainer");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/syncDynamicsLists/syncListButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/syncDynamicsLists/syncListButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/syncDynamicsLists/syncListButton.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { isDynamicsListPage, getDynamicsEntityType } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { v4 as uuid } from "/vendor/.vite-deps-uuid.js__v--488548d2.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { SyncCadencesModal } from "/src/content/components/syncDynamicsLists/components/syncCadencesModal/syncCadencesModal.tsx.js";
import SyncButton from "/src/content/components/syncDynamicsLists/syncButton.tsx.js";
import styles from "/src/content/components/syncDynamicsLists/syncListButton.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const allowedSobjectTypes = ["contact", "account", "lead", "opportunity"];
const createButtonElement = (id) => {
  const syncRootElement = document.createElement("button");
  syncRootElement.setAttribute("id", id);
  syncRootElement.setAttribute("style", "align-self: auto; border: none; background: none; color: var(--bloobirds)");
  return syncRootElement;
};
const SyncListButtonContainer = () => {
  _s();
  const {
    useGetCurrentPage,
    useGetLoggedIn
  } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const isLoggedIn = useGetLoggedIn();
  const isDynamicsList = isDynamicsListPage(currentPage);
  const [renderId, setRenderId] = useState();
  const listReferenceElement = document.querySelector('[data-id="data-set-quickFind-container"]')?.parentNode?.parentNode;
  const objectType = getDynamicsEntityType(currentPage);
  const isSyncableSobjectType = allowedSobjectTypes.includes(objectType);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extension.syncBBButtons"
  });
  const shouldShowButton = isLoggedIn && isSyncableSobjectType;
  const syncRootElement = createButtonElement(
    "bb-sync-list-button",
    listReferenceElement?.childNodes?.[1]?.className
  );
  const cadenceRootElement = createButtonElement(
    "bb-cadence-list-button",
    listReferenceElement?.childNodes?.[1]?.className
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
    if (listReferenceElement) {
      const hasSyncButtonsInList = listReferenceElement?.querySelector('button[id="bb-sync-list-button"]') && listReferenceElement?.querySelector('button[id="bb-cadence-list-button"]');
      if (!hasSyncButtonsInList && isDynamicsList && shouldShowButton) {
        setRenderId(uuid());
        const childNodes = listReferenceElement.childNodes;
        listReferenceElement.insertBefore(syncRootElement, childNodes[1]);
        listReferenceElement.insertBefore(cadenceRootElement, syncRootElement);
      }
    }
  }, [renderId, listReferenceElement, isDynamicsList]);
  const CadenceSyncTitle = () => /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: "playOutline",
      size: 14,
      className: styles.iconButton
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 81,
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
      lineNumber: 87,
      columnNumber: 21
    }, void 0)]
  }, void 0, true);
  return shouldShowButton && renderId && isDynamicsList ? /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: /* @__PURE__ */ _jsxDEV(SyncButton, {
      id: "bb-cadence-list-button",
      title: /* @__PURE__ */ _jsxDEV(CadenceSyncTitle, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 16
      }, void 0),
      children: /* @__PURE__ */ _jsxDEV(SyncCadencesModal, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 99,
        columnNumber: 9
      }, void 0)
    }, `${renderId}_cadence_button`, false, {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 7
    }, void 0)
  }, void 0, false) : null;
};
_s(SyncListButtonContainer, "zYN/knNbWKmmlDGlpylZ5HJlt/Q=", true, function() {
  return [useExtensionContext, useTranslation];
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

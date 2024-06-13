import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/notificationsWrapper/notificationsWrapper.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/notificationsWrapper/notificationsWrapper.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/notificationsWrapper/notificationsWrapper.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport2_react["useRef"];
import __vite__cjsImport3_reactDom from "/vendor/.vite-deps-react-dom.js__v--47a99a8e.js"; const ReactDOM = __vite__cjsImport3_reactDom.__esModule ? __vite__cjsImport3_reactDom.default : __vite__cjsImport3_reactDom;
import { NotificationsDisplay } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-src-index.tsx.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, ContactViewSubTab, MessagesEvents, NotificationsTypes, PluralBobjectTypes, SalesforceTabs } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, injectReferencesGetProcess } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { getTextFromLogicRole } from "/src/utils/bobjects.utils.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useExtensionLeftBarContext } from "/src/content/components/extensionLeftBar/extensionLeftBarContext.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function getType(notificationType) {
  switch (notificationType) {
    case NotificationsTypes.NEW_EMAIL:
    case NotificationsTypes.EMAIL_CLICKED:
    case NotificationsTypes.EMAIL_OPENED:
      return ExtendedContextTypes.EMAIL_THREAD;
    case NotificationsTypes.NEW_LINKEDIN:
      return ExtendedContextTypes.LINKEDIN_THREAD;
    case NotificationsTypes.REPORT_CALL:
    case NotificationsTypes.MISSED_CALL_UNKNOWN:
    case NotificationsTypes.MISSED_CALL_LEAD:
      return ExtendedContextTypes.CALL_DETAILS;
    case NotificationsTypes.MEETING_DONE:
    case NotificationsTypes.MEETING_ACCEPTED:
    case NotificationsTypes.MEETING_DELETED:
    case NotificationsTypes.MEETING_CANCELLED:
    case NotificationsTypes.MEETING_RESCHEDULED:
      return ExtendedContextTypes.MEETING_DETAILS;
    case NotificationsTypes.NEW_INBOUND:
      return ExtendedContextTypes.INBOUND_ACTIVITY;
    default:
      return null;
  }
}
function getReferencedBobjectId(bobject) {
  const relatedCompany = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);
  const relatedLead = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const relatedOpportunity = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY);
  const getMainBobject = () => {
    if (relatedOpportunity)
      return relatedOpportunity;
    if (relatedLead)
      return relatedLead;
    if (relatedCompany)
      return relatedCompany;
    return null;
  };
  return getMainBobject();
}
export const NotificationsWrapper = () => {
  _s();
  const {
    setExtendedContext,
    setContactViewBobjectId,
    useGetExtendedContext,
    setForcedActiveSubTab
  } = useExtensionContext();
  const extendedContext = useGetExtendedContext();
  const {
    setCurrentTab,
    setCurrentSubTab
  } = useExtensionLeftBarContext();
  const handleCardClick = (notification) => {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension));
    if ([NotificationsTypes.NEW_INBOUND_LEAD].includes(notification.type)) {
      setContactViewBobjectId(`${notification.accountId}/Lead/${notification.url.split("/").at(-1)}`);
    } else if ([NotificationsTypes.LEAD_ASSIGNED, NotificationsTypes.COMPANY_ASSIGNED].includes(notification.type)) {
      setCurrentTab(SalesforceTabs.PIPELINE);
      setCurrentSubTab(PluralBobjectTypes[notification.type === NotificationsTypes.LEAD_ASSIGNED ? BobjectTypes.Lead : BobjectTypes.Company]);
    } else {
      const type = getType(notification.type);
      api.get(`/bobjects/${notification.accountId}/Activity/${notification.objectId}/form?injectReferences=true`).then(({
        data
      }) => {
        const referencedBobjectIdValue = getReferencedBobjectId(data);
        setContactViewBobjectId(referencedBobjectIdValue);
        setForcedActiveSubTab(ContactViewSubTab.ACTIVITIES);
        if (extendedContext.type !== type || extendedContext.bobject?.id.value !== data?.id.value) {
          const bobject = injectReferencesGetProcess(data);
          setExtendedContext({
            type,
            bobject
          });
        }
      });
    }
  };
  const ref = useRef();
  ref.current = document.getElementById("placeholder-div");
  if (ref.current) {
    return ReactDOM.createPortal(/* @__PURE__ */ _jsxDEV(NotificationsDisplay, {
      onCardClick: handleCardClick
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 7
    }, void 0), ref.current);
  } else
    return null;
};
_s(NotificationsWrapper, "q+7VpYxM8sgIrpGuGG2SOTbDhOg=", true, function() {
  return [useExtensionContext, useExtensionLeftBarContext];
});
_c = NotificationsWrapper;
var _c;
$RefreshReg$(_c, "NotificationsWrapper");
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

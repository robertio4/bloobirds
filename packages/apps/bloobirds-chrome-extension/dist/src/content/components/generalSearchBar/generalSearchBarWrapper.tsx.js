import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/generalSearchBar/generalSearchBarWrapper.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/generalSearchBar/generalSearchBarWrapper.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/generalSearchBar/generalSearchBarWrapper.tsx", _s2 = $RefreshSig$();
import { useDialerLauncher } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-index.tsx.js";
import { GeneralSearchBar } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-generalSearchBar-dist-index.js.js";
import { useMinimizableModals, useWhatsappOpenNewPage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, MessagesEvents, OPPORTUNITY_FIELDS_LOGIC_ROLE, SearchAction } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { EMAIL_MODE, forgeIdFieldsFromIdValue, getExtensionBobjectByIdFields, normalizeUrl, openPhoneOrDialer, openWhatsAppWeb } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { clickMessageButton } from "/src/injectors/linkedin/linkedinMessagesFromBBInjector.tsx.js";
import { isLinkedinOrSalesNav } from "/src/utils/url.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function GeneralSearchBarWrapper() {
  _s2();
  var _s = $RefreshSig$();
  const {
    setContactViewBobjectId,
    useGetSettings: useGetSettings2,
    useGetDataModel: useGetDataModel2
  } = useExtensionContext();
  const settings = useGetSettings2();
  const dataModel = useGetDataModel2();
  const {
    openDialer
  } = useDialerLauncher();
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const url = normalizeUrl(window.location.href);
  const isLinkedIn = isLinkedinOrSalesNav(url);
  const handleMainBobjectClick = (event, bobject) => {
    event?.preventDefault();
    event?.stopPropagation();
    if (bobject) {
      setContactViewBobjectId(bobject.rawBobject.id);
    }
  };
  const actionHandler = ({
    action,
    company,
    data,
    bobject
  }) => {
    const {
      phoneNumber,
      linkedInUrl,
      salesNavigatorUrl,
      forceWsOpenNewPage
    } = data;
    const linkedinLeadName = linkedInUrl?.split("/")[4]?.split("?")[0];
    const currentPage = window?.location?.href;
    const isInLeadProfile = currentPage.includes(linkedinLeadName);
    switch (action) {
      case SearchAction.Call:
        openPhoneOrDialer(phoneNumber ?? void 0, settings, openDialer);
        break;
      case SearchAction.Email:
        openMinimizableModal({
          type: "email",
          title: "New email",
          data: {
            template: {
              content: "",
              subject: ""
            },
            company,
            ...bobject?.id?.typeName === BobjectTypes.Lead ? {
              lead: bobject
            } : {},
            mode: EMAIL_MODE.SEND,
            activity: null
          },
          onSave: () => {
            window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
              detail: {
                type: BobjectTypes.Activity
              }
            }));
          }
        });
        break;
      case SearchAction.WhatsApp:
        openWhatsAppWeb(forceWsOpenNewPage, phoneNumber);
        break;
      case SearchAction.LinkedIn:
        if (linkedInUrl) {
          if (isInLeadProfile) {
            clickMessageButton();
          } else {
            window.open(linkedInUrl + "?bb-messaging-tab-open", "_blank");
          }
        } else if (salesNavigatorUrl) {
          window.open(salesNavigatorUrl + "?bb-messaging-tab-open", "_blank");
        } else {
          window.open("https://www.linkedin.com/messaging/thread/new/?bbFullName=" + bobject.fullName, "_blank");
        }
        window.open(linkedInUrl ?? "https://www.linkedin.com", isLinkedIn ? "_self" : "_blank");
        break;
      case SearchAction.Meeting:
        openMinimizableModal({
          type: "calendarMeeting",
          data: {
            company,
            ...bobject?.id?.typeName === BobjectTypes.Lead ? {
              lead: bobject
            } : {}
          },
          onSave: () => {
            window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
              detail: {
                type: BobjectTypes.Activity
              }
            }));
          }
        });
    }
  };
  const handleActionOnClick = (event, action, bobject) => {
    _s();
    event.preventDefault();
    event.stopPropagation();
    const oppCompanyFieldId = dataModel.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY)?.id;
    setContactViewBobjectId(bobject?.rawBobject?.id);
    const forceWsOpenNewPage = useWhatsappOpenNewPage(bobject?.id?.accountId);
    const bobjectIdObject = forgeIdFieldsFromIdValue(bobject?.rawBobject?.id);
    getExtensionBobjectByIdFields(bobjectIdObject).then(({
      data: extensionBobject
    }) => {
      const data = {
        phoneNumber: extensionBobject?.phoneNumbers?.[0],
        linkedInUrl: extensionBobject?.linkedInUrl,
        salesNavigatorUrl: extensionBobject?.salesNavigatorUrl,
        forceWsOpenNewPage
      };
      if (extensionBobject?.id?.typeName === BobjectTypes.Company) {
        actionHandler({
          action,
          company: extensionBobject,
          data
        });
        return;
      } else {
        const companyIdObject = forgeIdFieldsFromIdValue(extensionBobject?.companyId ?? extensionBobject?.rawBobject[oppCompanyFieldId]);
        getExtensionBobjectByIdFields(companyIdObject).then(({
          data: company
        }) => {
          actionHandler({
            action,
            company,
            bobject: extensionBobject,
            data
          });
          return;
        });
      }
    });
  };
  _s(handleActionOnClick, "NVywhQee/XedYPE8CwACXOpt+vo=", false, function() {
    return [useWhatsappOpenNewPage];
  });
  return /* @__PURE__ */ _jsxDEV(GeneralSearchBar, {
    actions: {
      handleMainBobjectClick,
      handleActionOnClick
    }
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 181,
    columnNumber: 10
  }, this);
}
_s2(GeneralSearchBarWrapper, "wq+ZHWkhnrxZa1VnFm3gKi5OCoU=", false, function() {
  return [useExtensionContext, useGetSettings, useGetDataModel, useDialerLauncher, useMinimizableModals];
});
_c = GeneralSearchBarWrapper;
export default GeneralSearchBarWrapper;
var _c;
$RefreshReg$(_c, "GeneralSearchBarWrapper");
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

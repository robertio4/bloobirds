import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/inboxView/list/InboxTabsList.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inboxView/list/InboxTabsList.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inboxView/list/InboxTabsList.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Fragment = __vite__cjsImport2_react["Fragment"];
import { AddLeadToActivityModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-addLeadToActivityModal-dist-index.js.js";
import { useOpenCCFWithoutObject } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ACTIVITY_TYPES, ACTIVITY_TYPES_VALUES_LOGIC_ROLE, BobjectTypes, MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getTextFromLogicRole, isCallActivity } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { VirtualInfiniteScroll } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-virtualInfiniteScroll-dist-index.js.js";
import { useWizardContext, WIZARD_MODALS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-wizardModalContext-dist-index.js.js";
import { useBuyerPersonas } from "/src/hooks/useBuyerPersonas.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { DateGroupHeader } from "/src/content/components/dateGroupHeader/dateGroupHeader.tsx.js";
import SubhomeContentSkeleton from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton.tsx.js";
import { NoFilterResults } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { CallCard } from "/src/content/components/extensionLeftBar/components/views/inboxView/card/callCard.tsx.js";
import { EmailCard } from "/src/content/components/extensionLeftBar/components/views/inboxView/card/emailCard.tsx.js";
import { LinkedinCard } from "/src/content/components/extensionLeftBar/components/views/inboxView/card/linkedinCard.tsx.js";
import { WhatsAppCard } from "/src/content/components/extensionLeftBar/components/views/inboxView/card/whatsAppCard.tsx.js";
import { useInboxTab } from "/src/content/components/extensionLeftBar/components/views/inboxView/hooks/useInboxTab.ts.js";
import { InboxTabBulkActions } from "/src/content/components/extensionLeftBar/components/views/inboxView/list/InboxTabBulkActions.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const CardActivity = ({
  data
}) => {
  switch (data?.type) {
    case ACTIVITY_TYPES.CALL:
      return /* @__PURE__ */ _jsxDEV(CallCard, {
        activity: data
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 14
      }, void 0);
    case ACTIVITY_TYPES.EMAIL:
      return /* @__PURE__ */ _jsxDEV(EmailCard, {
        email: data
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 14
      }, void 0);
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return /* @__PURE__ */ _jsxDEV(LinkedinCard, {
        messages: data.messages,
        leadId: data?.value,
        isLastDayItem: data?.activityDate?.isLastOfDay
      }, `conversation-${data?.value}`, false, {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 9
      }, void 0);
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
      return /* @__PURE__ */ _jsxDEV(WhatsAppCard, {
        messages: data.messages,
        leadId: data?.id,
        isLastDayItem: data?.activityDate?.isLastOfDay
      }, `conversation-${data?.id}`, false, {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 9
      }, void 0);
    default:
      return null;
  }
};
_c = CardActivity;
export const InboxTabList = ({
  parentRef,
  isLoading
}) => {
  _s();
  const {
    items,
    calls,
    emails,
    linkedin,
    whatsapp,
    isLoading: isValidating,
    fetchNextPage,
    mutate
  } = useInboxTab();
  const {
    useGetSettings
  } = useExtensionContext();
  const hasOpenCCFWithoutObjectAccount = useOpenCCFWithoutObject();
  const {
    openWizard,
    resetWizardProperties
  } = useWizardContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const {
    openedModalInfo: {
      openedModal,
      bobject,
      referencedBobject
    },
    resetOpenedModalInfo
  } = useSubhomeContext();
  const isAddPersonModal = openedModal === "addPerson";
  const isCallResultModal = openedModal === "callReportResult";
  const buyerPersonas = useBuyerPersonas();
  function handleClose() {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
      detail: {
        type: BobjectTypes.Activity
      }
    }));
    resetOpenedModalInfo();
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  if (!(isValidating && isLoading) && items?.length === 0) {
    return /* @__PURE__ */ _jsxDEV(NoFilterResults, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 12
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(InboxTabBulkActions, {
      calls,
      emails,
      linkedin,
      whatsapp,
      mutate
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(VirtualInfiniteScroll, {
      parentRef,
      rows: items,
      totalRows: items.length,
      isFetchingData: isLoading && isValidating,
      fetchNextPage,
      contentSkeleton: () => /* @__PURE__ */ _jsxDEV(SubhomeContentSkeleton, {
        visible: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 118,
        columnNumber: 32
      }, void 0),
      children: (data) => (data?.id?.objectId || data?.id) && /* @__PURE__ */ _jsxDEV(Fragment, {
        children: [data?.activityDate?.isFirstOfDay && /* @__PURE__ */ _jsxDEV(DateGroupHeader, {
          bobject: data
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 125,
          columnNumber: 52
        }, void 0), /* @__PURE__ */ _jsxDEV(
          CardActivity,
          {
            data
          },
          data?.id?.objectId || data?.id,
          false,
          {
            fileName: _jsxFileName,
            lineNumber: 126,
            columnNumber: 15
          },
          void 0
        )]
      }, data?.id?.objectId || data?.id, true, {
        fileName: _jsxFileName,
        lineNumber: 123,
        columnNumber: 13
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 7
    }, void 0), isAddPersonModal && /* @__PURE__ */ _jsxDEV(AddLeadToActivityModal, {
      accountId,
      activity: bobject,
      buyerPersonas,
      onClose: handleClose,
      shouldAllowToAddPhone: isCallActivity(bobject),
      onSubmit: (leadId, shouldUpdatePhone) => {
        const isCall = isCallActivity(bobject);
        if (isCall && shouldUpdatePhone) {
          const phone = getTextFromLogicRole(bobject, "ACTIVITY__CALL_LEAD_PHONE_NUMBER");
          if (phone && phone !== "") {
            const contentToPatch = {
              LEAD__PHONE: phone
            };
            api.patch(`/bobjects/${accountId}/Lead/${leadId}/raw`, contentToPatch);
          }
        }
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Activity
          }
        }));
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 9
    }, void 0), isCallResultModal && (referencedBobject || hasOpenCCFWithoutObjectAccount) && openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, bobject, {
      referenceBobject: referencedBobject,
      handleClose
    })]
  }, void 0, true);
};
_s(InboxTabList, "aMaTbWTyv8lUD2W73n/2zgOerJk=", true, function() {
  return [useInboxTab, useExtensionContext, useOpenCCFWithoutObject, useWizardContext, useSubhomeContext, useBuyerPersonas];
});
_c2 = InboxTabList;
var _c, _c2;
$RefreshReg$(_c, "CardActivity");
$RefreshReg$(_c2, "InboxTabList");
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

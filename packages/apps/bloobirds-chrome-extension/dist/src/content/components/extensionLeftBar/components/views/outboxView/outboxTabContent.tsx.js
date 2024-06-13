import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/outboxView/outboxTabContent.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/outboxView/outboxTabContent.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/outboxView/outboxTabContent.tsx", _s = $RefreshSig$();
import { ScheduleEmailModal, SendEmailModal, PreviewEmailModal, CancelEmailModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-index.tsx.js";
import { useBobject } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, TASK_AUTOMATED_STATUS_LOGIC_ROLE, TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE, MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { EmailModalType, ModalType } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { OutboxTabFilters } from "/src/content/components/extensionLeftBar/components/views/outboxView/filters/outboxTabFilters.tsx.js";
import { OutboxTabList } from "/src/content/components/extensionLeftBar/components/views/outboxView/list/outboxTabsList.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const OutboxTabContent = ({
  parentRef
}) => {
  _s();
  const {
    query,
    setSelectedQuickFilter,
    setOpenedModalInfo,
    openedModalInfo: {
      openedModal,
      bobject
    },
    isLoading
  } = useSubhomeContext();
  const {
    useGetSettings
  } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const {
    patchBobject,
    bulkPatchBobjects
  } = useBobject(BobjectTypes.Task, accountId);
  const rescheduleEmail = ({
    bobject: bobject2,
    datetime
  }) => {
    if (Array.isArray(bobject2)) {
      let data;
      bobject2.forEach((bobjectItem) => {
        data = {
          ...data,
          [bobjectItem?.id.objectId]: {
            [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: datetime,
            [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
            [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO
          }
        };
      });
      bulkPatchBobjects(data).then(() => {
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Task
          }
        }));
      });
    } else {
      const data = {
        [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: datetime,
        [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO
      };
      patchBobject(bobject2?.id?.objectId, data).then(() => {
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Task
          }
        }));
      });
    }
  };
  function handleClose() {
    setOpenedModalInfo({
      openedModal: void 0,
      bobject: void 0
    });
  }
  const isRescheduleEmail = openedModal === ModalType.RESCHEDULE_EMAIL;
  const isSendNowEmail = openedModal === ModalType.SEND_NOW_EMAIL;
  const isRetryEmail = openedModal === ModalType.RETRY_EMAIL;
  const isPreviewEmail = openedModal === ModalType.PREVIEW_EMAIL;
  const isCancelEmail = openedModal === ModalType.CANCEL_EMAIL;
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(OutboxTabFilters, {
      onToggleSelected: (quickFilterSelected) => {
        setSelectedQuickFilter(quickFilterSelected);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 7
    }, void 0), Object.keys(query).length > 0 ? /* @__PURE__ */ _jsxDEV(OutboxTabList, {
      parentRef,
      isLoading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 9
    }, void 0) : null, isRescheduleEmail && /* @__PURE__ */ _jsxDEV(ScheduleEmailModal, {
      emails: [],
      onClose: () => handleClose(),
      onSubmit: async ({
        date
      }) => {
        handleClose();
        rescheduleEmail({
          bobject,
          datetime: date
        });
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Task
          }
        }));
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 9
    }, void 0), isSendNowEmail && /* @__PURE__ */ _jsxDEV(SendEmailModal, {
      bobject,
      modalType: EmailModalType.SEND,
      onClose: () => handleClose(),
      onSubmit: () => {
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Task
          }
        }));
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 9
    }, void 0), isRetryEmail && /* @__PURE__ */ _jsxDEV(SendEmailModal, {
      bobject,
      modalType: EmailModalType.RETRY,
      onClose: () => handleClose(),
      onSubmit: () => {
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Task
          }
        }));
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 9
    }, void 0), isPreviewEmail && /* @__PURE__ */ _jsxDEV(PreviewEmailModal, {
      taskId: bobject?.id?.objectId,
      onClose: () => handleClose()
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 144,
      columnNumber: 9
    }, void 0), isCancelEmail && /* @__PURE__ */ _jsxDEV(CancelEmailModal, {
      handleClose,
      open: true,
      bobject,
      onSubmit: () => {
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Task
          }
        }));
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 147,
      columnNumber: 9
    }, void 0)]
  }, void 0, true);
};
_s(OutboxTabContent, "DGF6h+NgWC87S4nWaqktwd84v+Y=", true, function() {
  return [useSubhomeContext, useExtensionContext, useBobject];
});
_c = OutboxTabContent;
export default OutboxTabContent;
var _c;
$RefreshReg$(_c, "OutboxTabContent");
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

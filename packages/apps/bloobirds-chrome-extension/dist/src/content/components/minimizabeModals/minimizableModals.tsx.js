import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/minimizabeModals/minimizableModals.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/minimizabeModals/minimizableModals.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/minimizabeModals/minimizableModals.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { ConfirmDeleteModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { ConfirmCloseModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-confirmCloseModal-dist-index.js.js";
import { SmartEmailModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-index.tsx.js";
import { IconButton, Portal, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserId, useMeetingLinks, useMinimizableModal, useMinimizableModals, useMinimizableStore } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { MeetingModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-index.tsx.js";
import { HandleTemplateModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-index.tsx.js";
import { TaskStaticModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-index.tsx.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getExtensionBobjectByIdFields, baseUrls } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import classNames from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import { NoteModal } from "/src/content/components/noteModal/noteModal.tsx.js";
import { TaskModal } from "/src/content/components/taskModal/taskModal.tsx.js";
import styles from "/src/content/components/minimizabeModals/minimizableModals.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const icons = {
  email: "mail",
  meeting: "calendar",
  note: "noteAction",
  task: "taskAction",
  taskStatic: "taskAction",
  calendarMeeting: "calendar"
};
const GenericModal = ({
  type,
  id
}) => {
  _s();
  const {
    useGetSettings,
    useGetDataModel,
    setActiveBobject
  } = useExtensionContext();
  const {
    isLoading: areMeetingLinksLoading
  } = useMeetingLinks();
  const {
    getConnections,
    getMutateConnections
  } = useFloatingMenuContext();
  const settings = useGetSettings();
  const dataModel = useGetDataModel();
  const connections = getConnections();
  const mutateConnections = getMutateConnections();
  const userId = settings?.user?.id;
  const accountId = settings?.account?.id;
  const {
    data: {
      lead,
      leads,
      company,
      opportunity,
      opportunities,
      pageBobjectType,
      mode,
      template,
      stage,
      onSaveCallback,
      onDeleteCallback
    },
    closeModal
  } = useMinimizableModal(id);
  const activeUserId = useActiveUserId();
  const baseUrl = baseUrls[process.env.ENV];
  const [transformedBobject, setTransformedBobject] = useState();
  switch (type) {
    case "email":
      if (areMeetingLinksLoading || !activeUserId) {
        return null;
      } else {
        return /* @__PURE__ */ _jsxDEV(SmartEmailModal, {
          id,
          user: {
            id: userId
          },
          accountId,
          connections,
          mutateConnections,
          emailSettingsRedirect: () => {
            closeModal();
            window.open(`${baseUrl}/app/management/user`, "_blank");
          },
          handleRedirect: () => null,
          dataModel,
          statusActivityRedirect: (bobject) => {
            getExtensionBobjectByIdFields(bobject.id).then(({
              data
            }) => setTransformedBobject(data));
            setActiveBobject(transformedBobject);
            closeModal();
          },
          bobjectsInfo: {
            activeBobject: pageBobjectType === BobjectTypes.Company ? company : lead ?? opportunity,
            company,
            lead,
            leads,
            opportunity,
            opportunities,
            pageBobjectType
          },
          mode,
          isExtension: true,
          userSettings: settings?.user
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 86,
          columnNumber: 11
        }, void 0);
      }
    case "meeting":
    case "note":
      return /* @__PURE__ */ _jsxDEV(NoteModal, {
        id
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 124,
        columnNumber: 14
      }, void 0);
    case "task":
      return /* @__PURE__ */ _jsxDEV(TaskModal, {
        id
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 126,
        columnNumber: 14
      }, void 0);
    case "taskStatic":
      return /* @__PURE__ */ _jsxDEV(TaskStaticModal, {
        id
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 128,
        columnNumber: 14
      }, void 0);
    case "calendarMeeting":
      return /* @__PURE__ */ _jsxDEV(MeetingModal, {
        id,
        accountId,
        userId,
        settings,
        connections,
        mutateConnections,
        dataModel
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 9
      }, void 0);
    case "handleTemplate":
      return /* @__PURE__ */ _jsxDEV(HandleTemplateModal, {
        template,
        handleClose: closeModal,
        contextValues: {
          onSaveCallback,
          onDeleteCallback,
          ...stage ? {
            stage
          } : {}
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 143,
        columnNumber: 9
      }, void 0);
    default:
      return null;
  }
};
_s(GenericModal, "58go8j7f+rXVT70i+iPVAOkmbnU=", true, function() {
  return [useExtensionContext, useMeetingLinks, useFloatingMenuContext, useMinimizableModal, useActiveUserId];
});
_c = GenericModal;
const MinimizedModal = ({
  id
}) => {
  _s2();
  const {
    maximize,
    type,
    title,
    openConfirmModal
  } = useMinimizableModal(id);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: classNames(styles._minimizedModal__container, styles[type]),
    onClick: maximize,
    children: [/* @__PURE__ */ _jsxDEV(IconButton, {
      name: icons[type],
      color: "white",
      size: 16,
      onClick: maximize
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      color: "white",
      size: "s",
      weight: "medium",
      ellipsis: 24,
      children: title
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 160,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
      name: "maximize",
      color: "white",
      size: 16,
      onClick: maximize
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 163,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
      name: "cross",
      color: "white",
      size: 18,
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        openConfirmModal();
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 164,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 158,
    columnNumber: 5
  }, void 0);
};
_s2(MinimizedModal, "dNsiQocElr1l3GqhjEN0QH6PegY=", false, function() {
  return [useMinimizableModal];
});
_c2 = MinimizedModal;
const MinimizableModal = ({
  id
}) => {
  _s3();
  const {
    open,
    type
  } = useMinimizableModal(id);
  if (open) {
    return /* @__PURE__ */ _jsxDEV(GenericModal, {
      type,
      id
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 12
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(MinimizedModal, {
    id
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 185,
    columnNumber: 10
  }, void 0);
};
_s3(MinimizableModal, "kF/vtYzw2HRInCXzYkGF8DISocs=", false, function() {
  return [useMinimizableModal];
});
_c3 = MinimizableModal;
const MinimizableModals = () => {
  _s4();
  const {
    minimizableModals,
    confirmationModal
  } = useMinimizableModals();
  useMinimizableStore();
  return /* @__PURE__ */ _jsxDEV(Portal, {
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles._container,
      children: [confirmationModal.open && /* @__PURE__ */ _jsxDEV(ConfirmCloseModal, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 195,
        columnNumber: 36
      }, void 0), /* @__PURE__ */ _jsxDEV(ConfirmDeleteModal, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 196,
        columnNumber: 9
      }, void 0), minimizableModals?.map(({
        id
      }) => /* @__PURE__ */ _jsxDEV(MinimizableModal, {
        id
      }, id, false, {
        fileName: _jsxFileName,
        lineNumber: 198,
        columnNumber: 11
      }, void 0))]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 193,
    columnNumber: 5
  }, void 0);
};
_s4(MinimizableModals, "RT938FMsqWozGi355o4S5yjRouU=", false, function() {
  return [useMinimizableModals, useMinimizableStore];
});
_c4 = MinimizableModals;
export default MinimizableModals;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "GenericModal");
$RefreshReg$(_c2, "MinimizedModal");
$RefreshReg$(_c3, "MinimizableModal");
$RefreshReg$(_c4, "MinimizableModals");
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

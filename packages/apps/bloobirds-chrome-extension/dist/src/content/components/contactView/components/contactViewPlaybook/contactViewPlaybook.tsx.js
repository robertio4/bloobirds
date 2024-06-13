import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/contactViewPlaybook/contactViewPlaybook.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewPlaybook/contactViewPlaybook.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewPlaybook/contactViewPlaybook.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport2_react["useMemo"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useActiveUserSettings, useMinimizableModals, usePlaybook } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { PlaybookFeed } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-index.tsx.js";
import { MessagesEvents, PlaybookTab, TEMPLATE_TYPES, TemplateStage, templateTypes, UserRole, Environment } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getLinkedInURL, getTemplateTypeButtons } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ContactViewPlaybook = () => {
  _s();
  const {
    useGetActiveBobject,
    useGetDataModel,
    setExtendedContext,
    useGetActiveBobjectContext,
    closeExtendedScreen,
    useGetExtendedContext,
    openExtendedScreen,
    useGetSidePeekEnabled,
    useGetSettings,
    useGetWhatsappLead
  } = useExtensionContext();
  const whatsappLead = useGetWhatsappLead();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const activeBobject = useGetActiveBobject();
  const data = useGetActiveBobjectContext();
  const extendedContext = useGetExtendedContext();
  const {
    getMeta,
    setMeta
  } = useFloatingMenuContext();
  const {
    company,
    leads
  } = data || {};
  const dataModel = useGetDataModel();
  const accountId = useGetSettings()?.account?.id;
  const stage = dataModel?.findValueById(activeBobject?.stage);
  const isSalesStage = stage?.logicRole?.includes("SALES") || activeBobject.id.typeName === "Opportunity";
  const {
    actionsDisabled
  } = useContactViewContext();
  const {
    settings
  } = useActiveUserSettings();
  const userId = settings?.user?.id;
  const userRoles = settings?.user?.roles;
  const isAdminUser = userRoles?.includes(UserRole.GLOBAL_ADMIN) || userRoles?.includes(UserRole.ACCOUNT_ADMIN);
  const meta = getMeta();
  const [selectedTab, setSelectedTab] = useState(PlaybookTab.PITCHES);
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const {
    t
  } = useTranslation();
  const whatsappData = {
    phoneNumber: activeBobject?.phoneNumbers?.[0],
    isSameActiveLead: whatsappLead?.id === activeBobject?.id.value,
    userName: settings?.user?.name,
    lead: activeBobject
  };
  function openEditingModal(template) {
    const getDefaultStage = () => {
      if (template?.type === TEMPLATE_TYPES.SNIPPET) {
        return TemplateStage.All;
      }
      if (isSalesStage) {
        return TemplateStage.Sales;
      }
      return TemplateStage.Prospecting;
    };
    openMinimizableModal({
      type: "handleTemplate",
      title: "Template",
      data: {
        template,
        stage: getDefaultStage(),
        onSaveCallback: closeExtendedScreen
      }
    });
  }
  function handleOnClick(template, tabSelected, handleEmailModal) {
    const userIsOwner = userId === template?.createdBy;
    const userCanEdit = userIsOwner || isAdminUser;
    if (extendedContext?.template?.id === template.id) {
      closeExtendedScreen();
    } else {
      openExtendedScreen({
        type: ExtendedContextTypes[`PLAYBOOK_${templateTypes[tabSelected]}`],
        template,
        buttonData: getTemplateTypeButtons({
          template,
          tabSelected,
          linkedInURL: getLinkedInURL(template.id, company, leads, activeBobject),
          handleEmailModal,
          isSEE: false,
          userCanEdit,
          editTemplate: () => openEditingModal(template),
          t,
          whatsappData
        }),
        actionsDisabled
      });
    }
  }
  const defaultStage = isSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting;
  const getPlaybookStage = () => {
    if (meta?.stage) {
      return meta.stage;
    } else {
      return defaultStage;
    }
  };
  const playbookStage = useMemo(getPlaybookStage, [meta?.stage, isSalesStage]);
  const {
    segmentationFields,
    activeBobjectSegmentationValues
  } = usePlaybook({
    stage: playbookStage,
    bobjectData: {
      company,
      activeBobject
    }
  });
  function toggleFilterView(value, tabSelected) {
    value ? setExtendedContext({
      type: ExtendedContextTypes.PLAYBOOK_SEGMENTATION_FILTER
    }) : closeExtendedScreen();
    setMeta({
      ...meta,
      segmentationData: activeBobjectSegmentationValues,
      isFilterViewOpen: value,
      shouldShowBattlecards: [PlaybookTab.SNIPPETS, PlaybookTab.PITCHES].includes(tabSelected),
      shouldShowVisibilityFilters: tabSelected !== PlaybookTab.QQS
    });
  }
  const segmentationData = useMemo(() => meta?.segmentationData ? meta.segmentationData : activeBobjectSegmentationValues, [meta?.segmentationData, activeBobjectSegmentationValues]);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: /* @__PURE__ */ _jsxDEV(PlaybookFeed, {
      shouldShowTemplateSuggestions: false,
      environment: Environment.EXTENSION,
      accountId,
      activeBobject,
      isMainBobjectSalesStage: isSalesStage,
      company,
      leads,
      onCardClicked: handleOnClick,
      isFilterViewOpen: meta?.isFilterViewOpen,
      toggleFilterView,
      setFiltersContext: setMeta,
      segmentationFields,
      segmentationValues: segmentationData,
      visibilityFilters: meta?.visibilityFilters,
      stage: playbookStage,
      refreshMainBobject: () => window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: {
          type: activeBobject?.id?.typeName
        }
      })),
      actionsDisabled,
      sidePeekEnabled,
      selectedTab,
      setSelectedTab,
      templateFunctions: {
        editTemplate: openEditingModal
      },
      whatsappData
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 7
    }, void 0)
  }, void 0, false);
};
_s(ContactViewPlaybook, "09DNnQbo1XalQICP/yWo+UE3qfU=", true, function() {
  return [useExtensionContext, useFloatingMenuContext, useContactViewContext, useActiveUserSettings, useMinimizableModals, useTranslation, usePlaybook];
});
_c = ContactViewPlaybook;
var _c;
$RefreshReg$(_c, "ContactViewPlaybook");
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

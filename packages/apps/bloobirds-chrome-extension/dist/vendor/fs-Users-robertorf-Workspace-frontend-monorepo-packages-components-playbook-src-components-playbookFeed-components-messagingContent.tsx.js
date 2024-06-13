import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-components-messagingContent.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFeed/components/messagingContent.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFeed/components/messagingContent.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useActiveUserSettings, useBaseSetEmailVariablesValues, useMessagingTemplates, useMinimizableModals, useSuggestedTemplates, useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { NoResultsPage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-dist-index.js.js";
import { BobjectTypes, ExtensionHelperKeys, PlaybookTab, templateTypes, UserHelperTooltipsKeys, UserRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { EMAIL_MODE, getLinkedInURL, getTemplateTypeButtons, partition } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport8_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport8_mixpanelBrowser.__esModule ? __vite__cjsImport8_mixpanelBrowser.default : __vite__cjsImport8_mixpanelBrowser;
import { useDebounce } from "/vendor/.vite-deps-use-debounce.js__v--e00a6ff0.js";
import { MessagingCard } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookCard-playbookCard.tsx.js";
import { SnippetsTooltipBlock } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-snippetsTooltipBlock-snippetsTooltipBlock.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-playbookFeed.module.css.js";
import { usePlaybookFeed } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-usePlaybookFeed.tsx.js";
import { noResultsContent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-components-tabContent.utils.tsx.js";
import { TemplateListDisplay } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-components-templateList-templateList.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const MessagingContent = ({
  parentRef
}) => {
  _s();
  const {
    selectedTab: tabSelected,
    templateFunctions,
    isSmartEmail,
    onCardClicked,
    activeBobject,
    segmentationValues,
    visibilityFilters,
    searchValue,
    stage,
    actionsDisabled,
    company,
    leads,
    sidePeekEnabled,
    whatsappData,
    environment
  } = usePlaybookFeed();
  const {
    t
  } = useTranslation();
  const [debounceSearchValue] = useDebounce(searchValue, 300);
  const {
    messagingTemplates,
    isLoading
  } = useMessagingTemplates({
    stage,
    type: templateTypes[tabSelected],
    name: debounceSearchValue ? debounceSearchValue : null,
    size: 200,
    page: 0,
    visibility: visibilityFilters?.onlyPrivate ? "PRIVATE" : null,
    onlyMine: visibilityFilters?.onlyMine,
    onlyOfficials: visibilityFilters?.onlyOfficial,
    onlyBattlecards: visibilityFilters?.onlyBattlecards,
    segmentationValues
  });
  const isSnippets = tabSelected === PlaybookTab.SNIPPETS;
  const setEmailVariablesValues = useBaseSetEmailVariablesValues();
  const {
    has,
    save
  } = useUserHelpers();
  const shouldShowEmailTooltip = tabSelected === PlaybookTab.EMAILS && !has(UserHelperTooltipsKeys.BLANK_EMAIL_TOOLTIP) && isSmartEmail;
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const {
    settings
  } = useActiveUserSettings();
  const userId = settings?.user?.id;
  const userRoles = settings?.user?.roles;
  const isAdminUser = userRoles?.includes(UserRole.GLOBAL_ADMIN) || userRoles?.includes(UserRole.ACCOUNT_ADMIN);
  const snippetsTooltipBlockSeen = has(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_SEEN_ONE_TIME);
  const snippetsTooltipBlockHidden = has(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_HIDDEN);
  const suggestedTemplates = useSuggestedTemplates(activeBobject, {
    company,
    leads
  }, tabSelected);
  const handleEmailModal = (template) => {
    const activeBobjectType = activeBobject?.id?.typeName;
    setEmailVariablesValues({
      company: company?.rawBobject,
      lead: activeBobjectType === BobjectTypes.Lead ? activeBobject?.rawBobject : leads && leads[0]?.rawBobject,
      opportunity: void 0
    });
    openMinimizableModal({
      type: "email",
      title: t("smartEmailModal.newEmail"),
      data: {
        template: {
          content: template?.content,
          subject: template?.subject || "",
          id: template?.id,
          format: template?.format,
          mediaFiles: template?.mediaFiles,
          name: template?.name || t("playbook.untitledTemplate")
        },
        mode: EMAIL_MODE.SEND,
        isBlankEmail: false,
        company: activeBobjectType === BobjectTypes.Company ? activeBobject : company,
        leads,
        lead: activeBobjectType === BobjectTypes.Lead ? activeBobject : leads?.[0],
        pageBobjectType: activeBobject.id.typeName
      },
      onSave: () => {
        window.dispatchEvent(new CustomEvent("ACTIVE_BOBJECT_UPDATED", {
          detail: {
            type: BobjectTypes.Activity
          }
        }));
      }
    });
  };
  function handleOnClick(template) {
    onCardClicked(template, tabSelected, handleEmailModal);
    mixpanel.track(`CLICK_ON_${templateTypes[tabSelected]}_CARD_FROM_PLAYBOOK_OTO`);
  }
  const handleAddTemplateClick = () => {
    templateFunctions?.editTemplate({
      type: templateTypes[tabSelected],
      edit: true
    });
    mixpanel.track(`CLICK_ON_${templateTypes[tabSelected]}_ADD_TEMPLATE_FROM_PLAYBOOK_OTO`);
  };
  useEffect(() => {
    return () => {
      if (!noTemplates && !noResults && isSnippets) {
        save(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_SEEN_ONE_TIME);
      }
    };
  }, [messagingTemplates, isSnippets]);
  const [myTemplates, teamTemplates] = partition(messagingTemplates, (template) => template?.createdBy === userId);
  const areThereSegmentationFiltersApplied = segmentationValues && Object.keys(segmentationValues).length !== 0;
  const areThereVisibilityFiltersApplied = visibilityFilters && Object.values(visibilityFilters).some((v) => !!v);
  const noResults = messagingTemplates?.length === 0 && (searchValue?.length > 0 || areThereSegmentationFiltersApplied || areThereVisibilityFiltersApplied);
  const noTemplates = messagingTemplates?.length === 0 && !areThereSegmentationFiltersApplied && !areThereVisibilityFiltersApplied && searchValue?.length === 0;
  const renderTemplate = (template, showTooltip) => {
    const shouldShowSnippetsTooltip = isSmartEmail && isSnippets && snippetsTooltipBlockSeen && !snippetsTooltipBlockHidden && showTooltip;
    if (shouldShowSnippetsTooltip) {
      return /* @__PURE__ */ _jsxDEV(SnippetsTooltipBlock, {
        hasBeenSeen: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 176,
        columnNumber: 14
      }, void 0);
    }
    const userIsOwner = userId === template?.createdBy;
    const userCanEdit = userIsOwner || isAdminUser;
    const linkedInURL = getLinkedInURL(template?.id, company, leads, activeBobject);
    const buttonProps = getTemplateTypeButtons({
      template,
      tabSelected,
      linkedInURL,
      handleEmailModal,
      isSEE: isSmartEmail,
      userCanEdit,
      environment,
      templateFunctions,
      t,
      whatsappData
    });
    return /* @__PURE__ */ _jsxDEV(MessagingCard, {
      template,
      onClick: handleOnClick,
      tabSelected,
      buttonProps,
      isSmartEmail,
      templateFunctions,
      actionsDisabled,
      sidePeekEnabled
    }, template?.id, false, {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 7
    }, void 0);
  };
  const {
    actionButton,
    description,
    title
  } = noResultsContent({
    tabSelected,
    callback: handleAddTemplateClick,
    t
  });
  const templateListDisplayVariables = {
    sidePeekEnabled,
    renderTemplate,
    handleAddTemplateClick,
    isSmartEmail
  };
  if (!messagingTemplates)
    return null;
  const templatesAggregate = {
    suggestedTemplates,
    myTemplates,
    teamTemplates,
    firstOfEach: {
      [suggestedTemplates?.[0]?.id]: "suggestedTemplates",
      [myTemplates?.[0]?.id]: "myTemplates",
      [teamTemplates?.[0]?.id]: "teamTemplates"
    }
  };
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [isSmartEmail && isSnippets && !snippetsTooltipBlockSeen && !snippetsTooltipBlockHidden && !noTemplates && !noResults && /* @__PURE__ */ _jsxDEV(SnippetsTooltipBlock, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 241,
      columnNumber: 23
    }, void 0), /* @__PURE__ */ _jsxDEV(TemplateListDisplay, {
      parentRef,
      displayedTemplates: templatesAggregate,
      shouldShowTooltip: suggestedTemplates?.length === 0 && shouldShowEmailTooltip,
      ...templateListDisplayVariables
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 7
    }, void 0), noResults && !isLoading && /* @__PURE__ */ _jsxDEV(NoResultsPage, {
      title: t("playbook.tabContent.noResults"),
      description: t("playbook.tabContent.noResultsHint"),
      actionButton
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 249,
      columnNumber: 9
    }, void 0), noTemplates && !isLoading && /* @__PURE__ */ _jsxDEV(NoResultsPage, {
      title,
      description,
      actionButton
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 256,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.invisibleFooter
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 258,
      columnNumber: 7
    }, void 0)]
  }, void 0, true);
};
_s(MessagingContent, "Gx379W/s/EAcftI/djsjUnOpv8c=", false, function() {
  return [usePlaybookFeed, useTranslation, useDebounce, useMessagingTemplates, useBaseSetEmailVariablesValues, useUserHelpers, useMinimizableModals, useActiveUserSettings, useSuggestedTemplates];
});
_c = MessagingContent;
var _c;
$RefreshReg$(_c, "MessagingContent");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-templatesTab-templatesTab.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/pages/templatesTab/templatesTab.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/pages/templatesTab/templatesTab.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useDataModel, useFullSalesEnabled, usePlaybook } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { HandleTemplate, PlaybookFeed, SegmentationFilter, TemplateDetail } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-dist-index.js.js";
import { deserialize, useRichTextEditorPlugins } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { PlaybookTab, TemplateStage, Environment } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getIsSales } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { insertNodes } from "/vendor/.vite-deps-@udecode_plate.js__v--feffb7cb.js";
import { useSmartEmailModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-templatesTab-templatesTab.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function getPage(selectedTemplate, filterDetailView) {
  if (selectedTemplate) {
    return selectedTemplate.edit ? "EditOrCreateTemplate" : "TemplateDetail";
  } else {
    return filterDetailView ? "SegmentationFilters" : "PlaybookFeed";
  }
}
const getDeserializedTemplate = (content, format, plugins) => {
  return JSON.parse(JSON.stringify(deserialize(content, {
    format,
    plugins
  })));
};
const insertText = (editor, template, plugins, position) => {
  const deserializedTemplate = getDeserializedTemplate(template.content, template.format, plugins);
  insertNodes(editor, deserializedTemplate, {
    at: position
  });
};
export const TemplatesTab = ({
  tabProps
}) => {
  _s();
  const {
    bodyEditor
  } = tabProps;
  const {
    activeBobject,
    company,
    leads,
    opportunities,
    playbookTab,
    setPlaybookTab,
    replaceEmailBodyWithTemplate,
    selectedTemplate,
    setSelectedTemplate,
    mutateSnippets,
    accountId,
    contactBobject
  } = useSmartEmailModal();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.playbookTab"
  });
  const isSalesEnabled = useFullSalesEnabled(accountId);
  const [filterDetailView, setFilterDetailView] = useState(false);
  const bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    replaceMeetingLinks: true,
    rawHTMLBlock: true,
    replyHistory: true
  });
  const onClickCard = (template) => {
    setSelectedTemplate({
      ...template,
      edit: false
    });
  };
  const replaceTemplate = (template) => {
    replaceEmailBodyWithTemplate(template);
  };
  const insertTemplate = (template) => {
    const bodySelection = bodyEditor?.selection;
    insertText(bodyEditor, template, bodyPlugins, bodySelection ?? [0]);
  };
  const dataModel = useDataModel();
  const isSalesStage = useMemo(() => !!activeBobject && getIsSales(dataModel, activeBobject), [!!dataModel, activeBobject?.id.value]);
  const stage = dataModel?.findValueById(activeBobject?.stage);
  const [segmentationValues, setSegmentationValues] = useState({
    segmentationData: void 0,
    stage: isSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting,
    visibilityFilters: {
      onlyMine: false,
      onlyOfficial: false,
      onlyPrivate: false,
      onlyBattlecards: false
    }
  });
  const defaultStage = isSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting;
  const playbookStage = segmentationValues?.stage ? segmentationValues.stage : defaultStage;
  const {
    segmentationFields,
    activeBobjectSegmentationValues
  } = usePlaybook({
    stage: playbookStage,
    bobjectData: {
      company,
      activeBobject: activeBobject?.rawBobject ? activeBobject : contactBobject
    }
  });
  useEffect(() => {
    setSegmentationValues((values) => ({
      ...values,
      stage: !activeBobject ? TemplateStage.All : defaultStage
    }));
  }, [isSalesStage]);
  useEffect(() => {
    setSegmentationValues((values) => ({
      ...values,
      segmentationData: activeBobjectSegmentationValues
    }));
  }, [activeBobjectSegmentationValues]);
  function editTemplate(template) {
    setSelectedTemplate({
      ...template,
      edit: true
    });
  }
  const page = getPage(selectedTemplate, filterDetailView);
  const contextProps = useSmartEmailModal();
  switch (page) {
    case "EditOrCreateTemplate":
      return /* @__PURE__ */ _jsxDEV(HandleTemplate, {
        contextProps,
        accountId,
        onBack: () => setSelectedTemplate(null),
        template: selectedTemplate,
        mutateSnippets,
        contextValues: stage ? typeof stage === "string" ? {
          stage
        } : {
          stage: stage.name.toUpperCase()
        } : {}
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 156,
        columnNumber: 9
      }, void 0);
    case "TemplateDetail":
      return /* @__PURE__ */ _jsxDEV(TemplateDetail, {
        setSelectedTemplate,
        template: selectedTemplate,
        extended: true,
        backButtonAction: () => setSelectedTemplate(null),
        replaceButtonAction: replaceTemplate,
        insertButtonAction: insertTemplate
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 173,
        columnNumber: 9
      }, void 0);
    case "SegmentationFilters":
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.filterDetailContainer,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.backButton,
          onClick: () => setFilterDetailView(false),
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "arrowLeft",
            size: 20,
            color: "purple"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 186,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "s",
            color: "purple",
            children: t("header.back")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 187,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 185,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.filterElementsContainer,
          children: /* @__PURE__ */ _jsxDEV(SegmentationFilter, {
            isSmartEmail: true,
            shouldShowBattlecards: [PlaybookTab.SNIPPETS, PlaybookTab.PITCHES].includes(playbookTab),
            shouldShowVisibilityFilters: playbookTab !== PlaybookTab.QQS,
            activeBobjectSegmentationValues,
            isSalesEnabled,
            segmentationFields,
            setFiltersContext: setSegmentationValues,
            filterValues: segmentationValues?.segmentationData,
            visibilityFilters: segmentationValues?.visibilityFilters,
            stage: segmentationValues?.stage,
            defaultStage: !activeBobject ? TemplateStage.All : defaultStage
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 192,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 191,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 184,
        columnNumber: 9
      }, void 0);
    case "PlaybookFeed":
      return /* @__PURE__ */ _jsxDEV(PlaybookFeed, {
        shouldShowTemplateSuggestions: true,
        accountId,
        environment: Environment.SMART_EMAIL,
        selectedTab: playbookTab,
        setSelectedTab: setPlaybookTab,
        activeBobject,
        isMainBobjectSalesStage: isSalesStage,
        company,
        leads,
        opportunities,
        onCardClicked: onClickCard,
        toggleFilterView: () => setFilterDetailView(true),
        segmentationFields,
        setFiltersContext: setSegmentationValues,
        segmentationValues: segmentationValues?.segmentationData,
        visibilityFilters: segmentationValues?.visibilityFilters,
        stage: segmentationValues?.stage,
        templateFunctions: {
          replaceTemplate,
          insertTemplate,
          editTemplate
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 212,
        columnNumber: 9
      }, void 0);
    default:
      return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
  }
};
_s(TemplatesTab, "5t13ZRbRic4ZGa9a5CFukJyoDOU=", false, function() {
  return [useSmartEmailModal, useTranslation, useFullSalesEnabled, useRichTextEditorPlugins, useDataModel, usePlaybook, useSmartEmailModal];
});
_c = TemplatesTab;
var _c;
$RefreshReg$(_c, "TemplatesTab");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/templatesSelector/templateSelector.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/templatesSelector/templateSelector.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/templatesSelector/templateSelector.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, IconButton, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useDataModel, useFullSalesEnabled, usePlaybook } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { PlaybookFeed, SegmentationFilter, TemplateDetail } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-index.tsx.js";
import { PlaybookTab, TemplateStage, Environment } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getIsSales } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import styles from "/src/content/components/templatesSelector/templatesSelector.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function getPage(selectedTemplate, filterDetailView) {
  if (selectedTemplate) {
    return selectedTemplate.edit ? "EditOrCreateTemplate" : "TemplateDetail";
  } else {
    return filterDetailView ? "SegmentationFilters" : "PlaybookFeed";
  }
}
export const TemplateSelector = ({
  environment,
  lead,
  closeDropdown,
  setEditModal,
  handleAdd,
  whatsappData
}) => {
  _s();
  const dataModel = useDataModel();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.playbookTab"
  });
  const accountId = lead?.id?.accountId;
  const isSalesEnabled = useFullSalesEnabled(accountId);
  const [filterDetailView, setFilterDetailView] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const isSalesStage = useMemo(() => !!lead && getIsSales(dataModel, lead), [!!dataModel, lead?.id?.value]);
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
      activeBobject: lead
    }
  });
  const onClickCard = (template) => {
    setSelectedTemplate(template);
  };
  const replaceTemplate = (template) => {
    handleAdd({
      id: template.id,
      fallbackContent: template.previewContent
    });
  };
  function editTemplate(template) {
    setEditModal({
      template,
      open: true
    });
  }
  useEffect(() => {
    setSegmentationValues((values) => ({
      ...values,
      stage: !lead ? TemplateStage.All : defaultStage
    }));
  }, [isSalesStage]);
  useEffect(() => {
    setSegmentationValues((values) => ({
      ...values,
      segmentationData: activeBobjectSegmentationValues
    }));
  }, [activeBobjectSegmentationValues]);
  const page = getPage(selectedTemplate, filterDetailView);
  switch (page) {
    case "TemplateDetail":
      return /* @__PURE__ */ _jsxDEV(TemplateDetail, {
        setSelectedTemplate,
        template: selectedTemplate,
        extended: true,
        backButtonAction: () => setSelectedTemplate(null),
        replaceButtonAction: replaceTemplate,
        insertButtonAction: replaceTemplate,
        onlyReadable: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 123,
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
            lineNumber: 137,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "s",
            color: "purple",
            children: t("header.back")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 138,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 136,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.filterElementsContainer,
          children: /* @__PURE__ */ _jsxDEV(SegmentationFilter, {
            isSmartEmail: true,
            shouldShowBattlecards: false,
            shouldShowVisibilityFilters: true,
            activeBobjectSegmentationValues,
            isSalesEnabled,
            segmentationFields,
            setFiltersContext: setSegmentationValues,
            filterValues: segmentationValues?.segmentationData,
            visibilityFilters: segmentationValues?.visibilityFilters,
            stage: segmentationValues?.stage,
            defaultStage: !lead ? TemplateStage.All : defaultStage
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 143,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 142,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 135,
        columnNumber: 9
      }, void 0);
    case "PlaybookFeed":
      return /* @__PURE__ */ _jsxDEV(PlaybookFeed, {
        shouldShowTemplateSuggestions: true,
        accountId,
        environment,
        selectedTab: environment === Environment.WHATSAPP_TEMPLATE_SELECTOR ? PlaybookTab.WHATSAPP : PlaybookTab.LINKEDIN,
        activeBobject: lead,
        isMainBobjectSalesStage: isSalesStage,
        onCardClicked: onClickCard,
        toggleFilterView: () => setFilterDetailView(true),
        segmentationFields,
        setFiltersContext: setSegmentationValues,
        segmentationValues: segmentationValues?.segmentationData,
        visibilityFilters: segmentationValues?.visibilityFilters,
        stage: segmentationValues?.stage,
        templateFunctions: {
          replaceTemplate,
          editTemplate
        },
        whatsappData,
        headerComponent: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.crossContainer,
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "cross",
            color: "purple",
            onClick: closeDropdown
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 186,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 185,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 161,
        columnNumber: 9
      }, void 0);
    default:
      return /* @__PURE__ */ _jsxDEV("div", {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 192,
        columnNumber: 15
      }, void 0);
  }
};
_s(TemplateSelector, "imgmVb8PUwlcBWGKqC5ctEZPn48=", false, function() {
  return [useDataModel, useTranslation, useFullSalesEnabled, usePlaybook];
});
_c = TemplateSelector;
var _c;
$RefreshReg$(_c, "TemplateSelector");
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

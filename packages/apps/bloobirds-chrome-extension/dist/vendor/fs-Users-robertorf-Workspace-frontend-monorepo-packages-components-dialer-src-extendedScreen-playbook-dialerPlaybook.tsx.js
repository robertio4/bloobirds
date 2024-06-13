import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-extendedScreen-playbook-dialerPlaybook.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/extendedScreen/playbook/dialerPlaybook.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/extendedScreen/playbook/dialerPlaybook.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, IconButton, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useDataModel, useFullSalesEnabled, useMinimizableModals, usePlaybook, useSuggestedTemplates } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { PlaybookFeed, SegmentationFilter, TemplateDetail } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-dist-index.js.js";
import { PlaybookTab, TemplateStage, Environment } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getIsSales } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useDialer } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-extendedScreen-playbook-dialerPlaybook.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const DialerPlaybookFeed = ({
  accountId,
  isRightOpen,
  handleOnClose,
  setShowAutoSetting,
  userId,
  isAdminUser
}) => {
  _s();
  const [selectedTemplate, setSelectedTemplate] = useState(void 0);
  const [page, setPage] = useState("PlaybookFeed");
  const isSalesEnabled = useFullSalesEnabled(accountId);
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const userIsOwner = userId === selectedTemplate?.createdBy;
  const userCanEdit = userIsOwner || isAdminUser;
  const matchBobject = useDialer((state) => state.bobjectMatch);
  const matchedBobject = matchBobject?.bobject;
  const suggestedTemplate = useSuggestedTemplates(matchedBobject, void 0, PlaybookTab.PITCHES);
  useEffect(() => {
    if (suggestedTemplate.length === 1) {
      setSelectedTemplate(suggestedTemplate[0]);
      setPageView("TemplateDetail");
    }
  }, [suggestedTemplate?.length]);
  const bobject = matchBobject && matchBobject.bobject;
  const dataModel = useDataModel();
  const isSalesStage = useMemo(() => bobject && getIsSales(dataModel, bobject), [!!dataModel, bobject?.id.value]);
  const defaultStage = !bobject ? TemplateStage.All : isSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting;
  const [segmentationValues, setSegmentationValues] = useState({
    segmentationData: void 0,
    stage: defaultStage
  });
  const {
    segmentationFields,
    activeBobjectSegmentationValues
  } = usePlaybook({
    stage: segmentationValues?.stage,
    bobjectData: {
      company: matchBobject ? {
        rawBobject: matchBobject.relatedBobject
      } : void 0,
      activeBobject: bobject
    }
  });
  const {
    t
  } = useTranslation();
  useEffect(() => {
    setSegmentationValues((values) => ({
      ...values,
      stage: defaultStage
    }));
  }, [isSalesStage]);
  useEffect(() => {
    setSegmentationValues((values) => ({
      ...values,
      segmentationData: activeBobjectSegmentationValues
    }));
  }, [activeBobjectSegmentationValues]);
  function setPageView(view) {
    setPage(view);
    setShowAutoSetting(view === "PlaybookFeed");
  }
  function onCardClicked(template) {
    setSelectedTemplate(template);
    setPageView("TemplateDetail");
  }
  const onClickBack = () => {
    setSelectedTemplate(void 0);
    setPageView("PlaybookFeed");
  };
  const onClickEditTemplate = (e) => {
    e.stopPropagation();
    e.preventDefault();
    openEditingModal(selectedTemplate);
  };
  function openEditingModal(template) {
    const getDefaultStage = () => {
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
        onSaveCallback: () => setPageView("PlaybookFeed")
      }
    });
  }
  switch (page) {
    case "TemplateDetail":
      return /* @__PURE__ */ _jsxDEV(TemplateDetail, {
        dialerButtons: /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: [/* @__PURE__ */ _jsxDEV("div", {
            style: {
              cursor: userCanEdit ? "auto" : "initial"
            },
            children: /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: !userCanEdit && t("dialer.extendedScreen.onlyAdminCanEditTemplate"),
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(IconButton, {
                name: "edit",
                color: userCanEdit ? "purple" : "softPeanut",
                size: 20,
                onClick: userCanEdit ? onClickEditTemplate : void 0
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 152,
                columnNumber: 21
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 148,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 147,
            columnNumber: 17
          }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "cross",
            color: "purple",
            onClick: handleOnClose
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 161,
            columnNumber: 15
          }, void 0)]
        }, void 0, true),
        template: selectedTemplate,
        extended: true,
        backButtonAction: onClickBack
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 143,
        columnNumber: 9
      }, void 0);
    case "SegmentationFilters":
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.filterDetailContainer,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.segmentationHeader,
          ...isRightOpen ? {
            style: {
              flexDirection: "row-reverse"
            }
          } : {},
          children: [/* @__PURE__ */ _jsxDEV(IconButton, {
            name: "cross",
            color: "purple",
            onClick: handleOnClose
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 176,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles.backButton,
            onClick: () => setPageView("PlaybookFeed"),
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "arrowLeft",
              size: 20,
              color: "purple"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 178,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              size: "s",
              color: "purple",
              children: t("common.back")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 179,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 177,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 172,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.filterElementsContainer,
          children: /* @__PURE__ */ _jsxDEV(SegmentationFilter, {
            isSalesEnabled,
            isSmartEmail: false,
            activeBobjectSegmentationValues,
            segmentationFields,
            setFiltersContext: setSegmentationValues,
            filterValues: segmentationValues?.segmentationData,
            visibilityFilters: segmentationValues?.visibilityFilters,
            shouldShowVisibilityFilters: true,
            shouldShowBattlecards: true,
            stage: segmentationValues?.stage,
            defaultStage
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 185,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 184,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 171,
        columnNumber: 9
      }, void 0);
    case "PlaybookFeed":
    default:
      return /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: clsx(styles.header, {
            [styles.headerLeft]: !isRightOpen,
            [styles.headerRight]: isRightOpen
          }),
          ...isRightOpen ? {
            style: {
              flexDirection: "row-reverse"
            }
          } : {},
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "cross",
            color: "purple",
            onClick: handleOnClose
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 212,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 205,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.playbookFeedContainer,
          children: /* @__PURE__ */ _jsxDEV(PlaybookFeed, {
            selectedTab: PlaybookTab.PITCHES,
            shouldShowTemplateSuggestions: true,
            accountId,
            environment: Environment.DIALER,
            activeBobject: bobject,
            isMainBobjectSalesStage: isSalesStage,
            company: matchBobject?.relatedBobject && {
              rawBobject: matchBobject.relatedBobject
            },
            leads: void 0,
            onCardClicked,
            toggleFilterView: () => setPageView("SegmentationFilters"),
            segmentationFields,
            setFiltersContext: setSegmentationValues,
            segmentationValues: segmentationValues?.segmentationData,
            stage: segmentationValues?.stage,
            visibilityFilters: segmentationValues.visibilityFilters,
            templateFunctions: {
              editTemplate: openEditingModal,
              insertTemplate: () => {
              },
              replaceTemplate: () => {
              }
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 215,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 214,
          columnNumber: 11
        }, void 0)]
      }, void 0, true);
  }
};
_s(DialerPlaybookFeed, "x8VLcYz8QBTxCIyFXcmDLhaFauw=", false, function() {
  return [useFullSalesEnabled, useMinimizableModals, useDialer, useSuggestedTemplates, useDataModel, usePlaybook, useTranslation];
});
_c = DialerPlaybookFeed;
var _c;
$RefreshReg$(_c, "DialerPlaybookFeed");
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

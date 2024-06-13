import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-playbookFeed.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFeed/playbookFeed.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFeed/playbookFeed.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, IconButton, Input, Spinner, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { usePlaybook, useSnippetsEnabled, useWhatsappEnabled, useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { ExtensionHelperKeys, MIXPANEL_EVENTS, PlaybookTab, TemplateStage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import __vite__cjsImport7_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport7_mixpanelBrowser.__esModule ? __vite__cjsImport7_mixpanelBrowser.default : __vite__cjsImport7_mixpanelBrowser;
import { Environment } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-types-playbook.ts.js";
import { PlaybookTabs } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookTabs-playbookTabs.tsx.js";
import { TabContent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-components-tabContent.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-playbookFeed.module.css.js";
import { PlaybookFeedProvider, usePlaybookFeed } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-usePlaybookFeed.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const TemplateSearch = ({
  setSearchValue,
  defaultOpen
}) => {
  _s();
  const {
    t
  } = useTranslation();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return isOpen ? /* @__PURE__ */ _jsxDEV(Input, {
    icon: "search",
    size: "small",
    onChange: setSearchValue,
    color: "verySoftPurple",
    placeholder: t("playbook.searchTemplates"),
    className: styles.noBorder
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 35,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(IconButton, {
    color: "purple",
    onClick: () => setIsOpen(true),
    name: "search",
    size: 20
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 44,
    columnNumber: 5
  }, void 0);
};
_s(TemplateSearch, "IDXodwwUzSq1oY9PT8UOmFtKldo=", false, function() {
  return [useTranslation];
});
_c = TemplateSearch;
const withProvider = (Component) => (props) => /* @__PURE__ */ _jsxDEV(PlaybookFeedProvider, {
  props: {
    isSmartEmail: props.environment === Environment.SMART_EMAIL,
    ...props
  },
  children: /* @__PURE__ */ _jsxDEV(Component, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 52,
    columnNumber: 5
  }, void 0)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 49,
  columnNumber: 3
}, void 0);
export const PlaybookFeedComponent = () => {
  _s2();
  const {
    accountId,
    activeBobject,
    isMainBobjectSalesStage,
    company,
    environment,
    selectedTab = PlaybookTab.PITCHES,
    setSelectedTab = () => {
    },
    isFilterViewOpen,
    toggleFilterView,
    stage,
    segmentationFields,
    segmentationValues,
    visibilityFilters,
    setFiltersContext,
    sidePeekEnabled = false,
    setSearchValue,
    headerComponent
  } = usePlaybookFeed();
  const hasSnippetsEnabled = useSnippetsEnabled(accountId);
  const hasWhatsappEnabled = useWhatsappEnabled(accountId);
  const isSmartEmail = environment === Environment.SMART_EMAIL;
  const {
    has
  } = useUserHelpers();
  const {
    t
  } = useTranslation();
  const snippetsBlockHidden = has(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_HIDDEN);
  const handleChangeTab = (tab) => {
    setSelectedTab(tab);
    setFiltersContext({
      segmentationData: segmentationValues || activeBobjectSegmentationValues,
      stage,
      isFilterViewOpen,
      visibilityFilters,
      shouldShowBattlecards: [PlaybookTab.PITCHES, PlaybookTab.SNIPPETS].includes(tab),
      shouldShowVisibilityFilters: tab !== PlaybookTab.QQS
    });
  };
  const getPlaybookStage = () => {
    if (stage) {
      return stage;
    } else {
      return isMainBobjectSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting;
    }
  };
  const {
    activeBobjectSegmentationValues
  } = usePlaybook({
    stage: getPlaybookStage(),
    bobjectData: {
      company,
      activeBobject
    }
  });
  const haveDefaultSegmentationLoaded = activeBobjectSegmentationValues && Object.keys(activeBobjectSegmentationValues).length > 0;
  const headerText = !isSmartEmail ? t("playbook.playbook") : hasSnippetsEnabled ? t("playbook.templatesAndSnippets") : t("playbook.playbookTemplates");
  useEffect(() => {
    if (haveDefaultSegmentationLoaded && isMainBobjectSalesStage === [TemplateStage.Sales, TemplateStage.All].includes(stage) && !segmentationValues) {
      setFiltersContext({
        segmentationData: activeBobjectSegmentationValues,
        stage,
        isFilterViewOpen,
        visibilityFilters,
        shouldShowBattlecards: [PlaybookTab.PITCHES, PlaybookTab.SNIPPETS].includes(selectedTab),
        shouldShowVisibilityFilters: selectedTab !== PlaybookTab.QQS
      });
    }
  }, [haveDefaultSegmentationLoaded]);
  const selectedValuesNames = useMemo(() => {
    if (!segmentationValues) {
      return [];
    }
    return Object.entries(segmentationValues).reduce((acc, [fieldId, itemValues]) => {
      if (itemValues?.length === 0)
        return acc;
      const segmentationFieldsToSearch = stage === TemplateStage.All ? [...segmentationFields[TemplateStage.Prospecting], ...segmentationFields[TemplateStage.Sales]] : segmentationFields?.[stage];
      const segmentationField = segmentationFieldsToSearch?.find((segmentation) => segmentation.id === fieldId);
      if (!itemValues)
        return [...acc, t("playbook.allAssets", {
          segmentationName: segmentationField?.name
        })];
      const valuesNames = itemValues?.reduce((accField, itemValue) => {
        const field = segmentationField?.values?.find((segValue) => segValue.id === itemValue);
        if (field)
          return [...accField, field?.name];
        return accField;
      }, []);
      return [...acc, ...valuesNames];
    }, []);
  }, [segmentationValues]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    children: [headerComponent, /* @__PURE__ */ _jsxDEV("div", {
      className: styles.header_container,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.headerTitle,
        style: isSmartEmail ? {
          marginBottom: "24px"
        } : void 0,
        children: [/* @__PURE__ */ _jsxDEV("span", {
          className: styles.title_container,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "magic",
            size: 24,
            color: "purple"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 178,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            color: "purple",
            weight: "bold",
            children: headerText
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 179,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 177,
          columnNumber: 11
        }, void 0), selectedTab !== PlaybookTab.QQS && /* @__PURE__ */ _jsxDEV(TemplateSearch, {
          setSearchValue,
          defaultOpen: isSmartEmail || sidePeekEnabled
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 184,
          columnNumber: 13
        }, void 0), snippetsBlockHidden && selectedTab === PlaybookTab.SNIPPETS && isSmartEmail && /* @__PURE__ */ _jsxDEV(IconButton, {
          onClick: () => {
            mixpanel.track(MIXPANEL_EVENTS.SNIPPETS_BUTTON_TIP_CLICKED);
            window.open("https://support.bloobirds.com/hc/en-us/articles/9198098513948-10-snippets-that-will-save-you-a-lot-of-time", "_blank");
          },
          size: 18,
          className: styles.suggestionsButton,
          name: "suggestions",
          color: "bloobirds"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 190,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 173,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.contentWrapper,
        children: /* @__PURE__ */ _jsxDEV(Button, {
          size: "small",
          color: isFilterViewOpen ? "purple" : "lightPurple",
          uppercase: false,
          onClick: () => {
            toggleFilterView(!isFilterViewOpen, selectedTab);
          },
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles.buttonContent,
            children: [/* @__PURE__ */ _jsxDEV("div", {
              className: styles.buttonText,
              children: selectedValuesNames?.length !== 0 ? /* @__PURE__ */ _jsxDEV(_Fragment, {
                children: [/* @__PURE__ */ _jsxDEV(Text, {
                  size: "xs",
                  color: "white",
                  weight: "bold",
                  className: styles.segmentedFor,
                  children: [t("playbook.selectedFilters", {
                    count: selectedValuesNames?.length || 0
                  }), " "]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 219,
                  columnNumber: 21
                }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                  size: "xs",
                  color: "white",
                  className: styles.selectedValuesNames,
                  children: selectedValuesNames?.join(", ")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 222,
                  columnNumber: 21
                }, void 0)]
              }, void 0, true) : /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                color: "white",
                weight: "bold",
                className: styles.segmentedFor,
                children: t("playbook.selectSegmentationCriteria")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 227,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 216,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              className: styles.buttonButtons,
              children: [/* @__PURE__ */ _jsxDEV(Icon, {
                name: "sliders",
                color: "white",
                size: 16
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 233,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
                name: "cross",
                color: "white",
                size: 16,
                onClick: (e) => {
                  e.stopPropagation();
                  setFiltersContext({
                    segmentationData: void 0,
                    isFilterViewOpen,
                    stage
                  });
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 234,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 232,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 215,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 207,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 206,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(PlaybookTabs, {
        environment,
        hasSnippetsEnabled,
        hasWhatsappEnabled,
        tabSelected: selectedTab,
        handleChangeTab,
        sidePeekEnabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 251,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 172,
      columnNumber: 7
    }, void 0), segmentationFields ? /* @__PURE__ */ _jsxDEV(TabContent, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 261,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
      className: styles.spinner,
      children: /* @__PURE__ */ _jsxDEV(Spinner, {
        name: "loadingCircle",
        color: "purple"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 264,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 263,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 170,
    columnNumber: 5
  }, void 0);
};
_s2(PlaybookFeedComponent, "ulnogbRlCSov+m9dNuU9DOyM7hw=", false, function() {
  return [usePlaybookFeed, useSnippetsEnabled, useWhatsappEnabled, useUserHelpers, useTranslation, usePlaybook];
});
_c2 = PlaybookFeedComponent;
export const PlaybookFeed = withProvider(PlaybookFeedComponent);
_c3 = PlaybookFeed;
var _c, _c2, _c3;
$RefreshReg$(_c, "TemplateSearch");
$RefreshReg$(_c2, "PlaybookFeedComponent");
$RefreshReg$(_c3, "PlaybookFeed");
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

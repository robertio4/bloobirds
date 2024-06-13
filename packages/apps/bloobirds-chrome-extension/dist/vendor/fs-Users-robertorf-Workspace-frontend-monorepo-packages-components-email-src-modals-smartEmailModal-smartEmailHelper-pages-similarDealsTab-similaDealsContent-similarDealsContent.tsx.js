import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-similarDealsTab-similaDealsContent-similarDealsContent.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/pages/similarDealsTab/similaDealsContent/similarDealsContent.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/pages/similarDealsTab/similaDealsContent/similarDealsContent.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport2_react["useRef"];
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { NoDataPage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-activityFeed-dist-index.js.js";
import { Button, Checkbox, Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { ExtensionHelperKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import __vite__cjsImport8_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport8_mixpanelBrowser.__esModule ? __vite__cjsImport8_mixpanelBrowser.default : __vite__cjsImport8_mixpanelBrowser;
import { CompanyCard, SimilarDealsSkeleton } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-components-companyCard-companyCard.tsx.js";
import SimilarDealsTimeFilter from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-similarDealsTab-filters-similarDealsTimeFilter.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-similarDealsTab-similarDeals.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const InfoBanner = () => {
  _s();
  const {
    saveCustom
  } = useUserHelpers();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.similarDealsTab.infoBanner"
  });
  function handleLearnMore() {
    mixpanel.track("SMART_EMAIL_SIMILAR_DEALS_LEARN_MORE");
    window.open("https://support.bloobirds.com/hc/en-us/articles/9263498944540-5-ways-in-which-Similar-Won-Deals-will-help-you-close-a-new-deal", "_blank");
  }
  function banishBanner() {
    mixpanel.track("SMART_EMAIL_SIMILAR_DEALS_DONT_SHOW_BANNER");
    saveCustom({
      key: ExtensionHelperKeys.SIMILAR_DEALS_INFO_BANNER,
      data: "Banner banished"
    });
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._info_banner,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._info_banner_title,
      children: [/* @__PURE__ */ _jsxDEV(Icon, {
        name: "book",
        color: "purple",
        size: 24
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        color: "purple",
        weight: "bold",
        children: t("title")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      color: "purple",
      weight: "regular",
      children: /* @__PURE__ */ _jsxDEV(Trans, {
        i18nKey: "smartEmailModal.similarDealsTab.infoBanner.content"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._info_banner_footer,
      children: [/* @__PURE__ */ _jsxDEV(Checkbox, {
        color: "purple",
        size: "small",
        onClick: (value) => {
          if (value)
            banishBanner();
        },
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          children: t("checkBox")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 57,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        variant: "secondary",
        color: "purple",
        uppercase: false,
        onClick: handleLearnMore,
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: "book",
          color: "purple",
          size: 16
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 66,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "purple",
          weight: "bold",
          children: t("learnMore")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 67,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 39,
    columnNumber: 5
  }, void 0);
};
_s(InfoBanner, "i2LqAKmfFTAacp+tBZoW6pFPk8g=", false, function() {
  return [useUserHelpers, useTranslation];
});
_c = InfoBanner;
export const NoDeals = () => {
  _s2();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.similarDealsTab.noDeals"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._no_results_container,
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: "searchNone",
      color: "softPeanut",
      size: 36
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        align: "center",
        color: "softPeanut",
        weight: "bold",
        children: t("title")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        align: "center",
        color: "softPeanut",
        children: t("subtitle")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 81,
    columnNumber: 5
  }, void 0);
};
_s2(NoDeals, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c2 = NoDeals;
export const SimilarDealsContent = ({
  activeBobject,
  similarDealsHook,
  isBubble = false
}) => {
  _s3();
  const {
    get
  } = useUserHelpers();
  const bannerStatus = get(ExtensionHelperKeys.SIMILAR_DEALS_INFO_BANNER);
  const hasSeenTheBanner = !!bannerStatus && bannerStatus !== "Banner banished";
  const ref = useRef();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.similarDealsTab"
  });
  const {
    similarDeals,
    isLoading,
    error,
    dateFilter,
    setDateFilter
  } = similarDealsHook || {};
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._header,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        color: "peanut",
        weight: "medium",
        children: t("title")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 109,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(SimilarDealsTimeFilter, {
        dateFilter,
        setDateFilter
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 7
    }, void 0), !bannerStatus && /* @__PURE__ */ _jsxDEV(InfoBanner, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 25
    }, void 0), error || !activeBobject ? /* @__PURE__ */ _jsxDEV("div", {
      className: styles._no_results,
      children: /* @__PURE__ */ _jsxDEV(NoDataPage, {
        objectName: t("deals").toLowerCase()
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 117,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
      className: styles._deals_container,
      ref,
      children: isLoading ? /* @__PURE__ */ _jsxDEV(SimilarDealsSkeleton, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: similarDeals?.length > 0 ? similarDeals?.map((company, index) => /* @__PURE__ */ _jsxDEV(CompanyCard, {
          company,
          index,
          isBubble
        }, company.name, false, {
          fileName: _jsxFileName,
          lineNumber: 127,
          columnNumber: 19
        }, void 0)) : /* @__PURE__ */ _jsxDEV(NoDeals, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 135,
          columnNumber: 17
        }, void 0)
      }, void 0, false)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 9
    }, void 0), hasSeenTheBanner && /* @__PURE__ */ _jsxDEV(InfoBanner, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 28
    }, void 0)]
  }, void 0, true);
};
_s3(SimilarDealsContent, "ki+3RxqgpVJNSJjhHqyxdOwT+kU=", false, function() {
  return [useUserHelpers, useTranslation];
});
_c3 = SimilarDealsContent;
var _c, _c2, _c3;
$RefreshReg$(_c, "InfoBanner");
$RefreshReg$(_c2, "NoDeals");
$RefreshReg$(_c3, "SimilarDealsContent");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/linkedInScreens/multipleLeadsPage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkedInScreens/multipleLeadsPage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkedInScreens/multipleLeadsPage.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, Input, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useObjectCreationSettings, useSearchBobjects } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useCreationForm } from "/src/hooks/useCreationForm.ts.js";
import { scrapLeadFullName } from "/src/utils/scrapper/profileScrapper.ts.js";
import { BubbleWindow, BubbleWindowContent, BubbleWindowFooter, BubbleWindowHeaderCircularBadge } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import { LinkBobjectCard } from "/src/content/components/linkBobjectCard/linkBobjectCard.tsx.js";
import WhatsappBobjectCard from "/src/content/components/whatsappRenderer/layouts/components/card.tsx.js";
import styles from "/src/content/components/linkedInScreens/styles.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CreateItHereCallToAction = ({
  info,
  leadName
}) => {
  _s();
  const {
    t
  } = useTranslation();
  const {
    enabledObjectCreation
  } = useObjectCreationSettings();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._createItHereCallToAction,
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      size: "l",
      color: "peanut",
      children: info ? t("sidePeek.multipleLeadsPage.footerInfo.title") : !enabledObjectCreation ? t("sidePeek.multipleLeadsPage.footerDisabledObjectCreation.title") : t("sidePeek.multipleLeadsPage.footerLinkedin.title")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "l",
      color: "peanut",
      weight: "heavy",
      children: info ? t("sidePeek.multipleLeadsPage.footerInfo.description") : !enabledObjectCreation ? t("sidePeek.multipleLeadsPage.footerDisabledObjectCreation.description", {
        leadName
      }) : t("sidePeek.multipleLeadsPage.footerLinkedin.description")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 27,
    columnNumber: 5
  }, void 0);
};
_s(CreateItHereCallToAction, "xzzd8zgPW7a11bUBJJRj5uoeuS4=", false, function() {
  return [useTranslation, useObjectCreationSettings];
});
_c = CreateItHereCallToAction;
export default _s2((props) => {
  _s2();
  const {
    leads,
    linkedInUrl,
    salesNavigatorUrl,
    setCurrentLead,
    setExactMatch,
    dataToUpdate,
    accountId,
    info,
    leadName
  } = props;
  const {
    t
  } = useTranslation();
  const fullName = info?.name ?? scrapLeadFullName();
  const {
    setCreateLead,
    setSyncLead
  } = useCreationForm();
  const {
    setActiveBobject,
    setExtendedContext,
    setContactViewBobjectId
  } = useExtensionContext();
  const {
    setGoBack,
    setIsDuplicatePage,
    setShowBackButton
  } = useFloatingMenuContext();
  const [searchValue, setSearchValue] = useState();
  const {
    results
  } = useSearchBobjects({
    searchValue,
    accountId,
    bobjectTypes: ["Lead"]
  });
  const {
    enabledObjectCreation
  } = useObjectCreationSettings();
  const itemsToDisplay = searchValue?.length > 0 ? results : leads;
  useEffect(() => {
    setIsDuplicatePage(false);
    setShowBackButton(false);
    setGoBack(() => {
      setActiveBobject(null);
      setExtendedContext(null);
      setContactViewBobjectId(null);
    });
  }, []);
  useEffect(() => {
    if (leads?.length === 0 && !searchValue) {
      setSearchValue(fullName);
    }
  }, [leads, searchValue]);
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: [/* @__PURE__ */ _jsxDEV(BubbleWindowHeaderCircularBadge, {
      title: "?",
      backgroundColor: "var(--lightBloobirds)",
      color: "darkBloobirds",
      titleColor: "darkBloobirds",
      borderColor: "darkBloobirds"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowContent, {
      className: styles._textWrapperMultipleLeads,
      children: [info ? /* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        color: "peanut",
        className: styles._text,
        children: /* @__PURE__ */ _jsxDEV(Trans, {
          i18nKey: "sidePeek.multipleLeadsPage.titleInfo",
          components: [/* @__PURE__ */ _jsxDEV("br", {}, "0", false, {
            fileName: _jsxFileName,
            lineNumber: 116,
            columnNumber: 80
          }, void 0)]
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 116,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 115,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        color: "peanut",
        className: styles._text,
        children: /* @__PURE__ */ _jsxDEV(Trans, {
          i18nKey: "sidePeek.multipleLeadsPage.titleLinkedin",
          count: leads?.length ?? 0
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 120,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 119,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._leadManagementWrapper,
        children: [/* @__PURE__ */ _jsxDEV(Input, {
          width: "100%",
          placeholder: `${t("common.search")} ...`,
          onChange: setSearchValue,
          value: searchValue,
          defaultValue: fullName,
          className: styles.input,
          icon: "search"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 125,
          columnNumber: 11
        }, void 0), itemsToDisplay?.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
          className: styles._leadListWrapper,
          children: itemsToDisplay.map((lead, index) => info ? /* @__PURE__ */ _jsxDEV(WhatsappBobjectCard, {
            bobject: lead,
            isLinkMode: true,
            phoneNumber: info?.number,
            onSelect: info?.onSelect
          }, index + (lead?.id?.value ?? lead?.rawBobject?.id), false, {
            fileName: _jsxFileName,
            lineNumber: 138,
            columnNumber: 19
          }, void 0) : /* @__PURE__ */ _jsxDEV(LinkBobjectCard, {
            bobject: lead,
            linkedInUrl,
            salesNavigatorURL: salesNavigatorUrl,
            setCurrentBobject: setCurrentLead,
            setExactMatch,
            dataToUpdate
          }, index + (lead?.id?.value ?? lead?.rawBobject?.id), false, {
            fileName: _jsxFileName,
            lineNumber: 146,
            columnNumber: 19
          }, void 0))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 135,
          columnNumber: 13
        }, void 0) : searchValue?.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
          className: styles.noResults,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            size: 36,
            color: "softPeanut",
            name: "searchNone"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 160,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            align: "center",
            color: "softPeanut",
            children: t("sidePeek.multipleLeadsPage.noResultsFound", {
              searchValue
            })
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 161,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            align: "center",
            color: "softPeanut",
            children: t("sidePeek.multipleLeadsPage.otherSearchItem")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 164,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 159,
          columnNumber: 13
        }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
          className: styles.noResults,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            size: 36,
            color: "softPeanut",
            name: "search"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 170,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            align: "center",
            color: "softPeanut",
            children: t("sidePeek.multipleLeadsPage.searchInDatabase")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 171,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 169,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 124,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(CreateItHereCallToAction, {
        info,
        leadName
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 177,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowFooter, {
      className: styles._buttons,
      children: /* @__PURE__ */ _jsxDEV(Button, {
        iconLeft: "send",
        expand: true,
        onClick: () => enabledObjectCreation ? setCreateLead(true) : setSyncLead(true),
        children: enabledObjectCreation ? t("sidePeek.multipleLeadsPage.createNewLead") : t("sidePeek.multipleLeadsPage.createNewLeadDisabled")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 180,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 179,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 105,
    columnNumber: 5
  }, void 0);
}, "2LAnJWfQKIaKOj60Q+phtUbRTbc=", false, function() {
  return [useTranslation, useCreationForm, useExtensionContext, useFloatingMenuContext, useSearchBobjects, useObjectCreationSettings];
});
var _c;
$RefreshReg$(_c, "CreateItHereCallToAction");
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

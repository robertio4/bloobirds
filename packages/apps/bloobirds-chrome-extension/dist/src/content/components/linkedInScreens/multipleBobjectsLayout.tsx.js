import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/linkedInScreens/multipleBobjectsLayout.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkedInScreens/multipleBobjectsLayout.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkedInScreens/multipleBobjectsLayout.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, Input, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveAccountId, useSearchBobjects } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, COMPANY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, OPPORTUNITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getTextFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useCreationForm } from "/src/hooks/useCreationForm.ts.js";
import { BubbleWindow, BubbleWindowContent, BubbleWindowFooter, BubbleWindowHeaderCircularBadge } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { LinkBobjectCard } from "/src/content/components/linkBobjectCard/linkBobjectCard.tsx.js";
import { CreateItHereCallToAction } from "/src/content/components/linkedInScreens/multipleLeadsPage.tsx.js";
import styles from "/src/content/components/linkedInScreens/styles.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const MultipleBobjectsPage = ({
  children
}) => {
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 29,
    columnNumber: 10
  }, void 0);
};
_c = MultipleBobjectsPage;
const parseBobjectToLinkedInBobject = (bobject) => {
  const bobjectType = bobject.id.typeName;
  let bobjectToReturn = {
    bobjectType: bobject.id.typeName,
    id: bobject.id
  };
  if (bobjectType === BobjectTypes.Lead) {
    bobjectToReturn = {
      ...bobjectToReturn,
      fullName: getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
      jobTitle: getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE),
      email: getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.EMAIL),
      phone: getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.PHONE)
    };
  } else if (bobjectType === BobjectTypes.Company) {
    bobjectToReturn = {
      ...bobjectToReturn,
      companyName: getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.NAME),
      website: getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.WEBSITE)
    };
  } else if (bobjectType === BobjectTypes.Opportunity) {
    bobjectToReturn = {
      ...bobjectToReturn,
      name: getTextFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME),
      amount: getTextFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT)
    };
  }
  return bobjectToReturn;
};
const List = ({
  bobjects,
  itemExtraProps,
  searchValueController,
  children
}) => {
  _s();
  const [searchValue, setSearchValue] = searchValueController || [];
  const accountId = useActiveAccountId();
  const {
    t
  } = useTranslation();
  const {
    t: bobjectT
  } = useTranslation();
  const {
    results
  } = useSearchBobjects({
    searchValue,
    accountId
  });
  const itemsToDisplay = searchValue?.length > 0 ? results : bobjects;
  return /* @__PURE__ */ _jsxDEV(BubbleWindowContent, {
    className: styles._textWrapperMultipleLeads,
    children: children ? children : /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        color: "peanut",
        className: styles._text,
        children: /* @__PURE__ */ _jsxDEV(Trans, {
          i18nKey: "sidePeek.duplicatesLayout.possibleMatches",
          values: {
            count: itemsToDisplay?.length,
            bobjectType: bobjectT(`bobjectTypes.${bobjects[0]?.id?.typeName?.toLowerCase() ?? "lead"}`)
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 82,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 81,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._leadManagementWrapper,
        children: [searchValueController && /* @__PURE__ */ _jsxDEV(Input, {
          width: "100%",
          placeholder: `${t("common.search")} ...`,
          onChange: setSearchValue,
          value: searchValue,
          defaultValue: searchValue,
          className: styles.input,
          icon: "search"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 94,
          columnNumber: 15
        }, void 0), itemsToDisplay?.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
          className: styles._leadListWrapper,
          children: itemsToDisplay.map((bobject, index) => {
            const isBobject = bobject?.raw;
            let parsedBobject = bobject;
            if (isBobject) {
              parsedBobject = parseBobjectToLinkedInBobject(bobject);
            }
            return /* @__PURE__ */ _jsxDEV(LinkBobjectCard, {
              bobject: parsedBobject,
              ...itemExtraProps
            }, index + (bobject?.id?.value ? bobject.id.value : bobject?.rawBobject?.id), false, {
              fileName: _jsxFileName,
              lineNumber: 113,
              columnNumber: 21
            }, void 0);
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 105,
          columnNumber: 15
        }, void 0) : searchValue?.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
          className: styles.noResults,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            size: 36,
            color: "softPeanut",
            name: "searchNone"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 125,
            columnNumber: 17
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            align: "center",
            color: "softPeanut",
            children: t("sidePeek.duplicatesLayout.noResults", {
              searchValue
            })
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 126,
            columnNumber: 17
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            align: "center",
            color: "softPeanut",
            children: t("sidePeek.duplicatesLayout.tryOtherTerms")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 129,
            columnNumber: 17
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 124,
          columnNumber: 15
        }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
          className: styles.noResults,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            size: 36,
            color: "softPeanut",
            name: "search"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 135,
            columnNumber: 17
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            align: "center",
            color: "softPeanut",
            children: t("sidePeek.duplicatesLayout.searchOnDB")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 136,
            columnNumber: 17
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 134,
          columnNumber: 15
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 11
      }, void 0)]
    }, void 0, true)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 76,
    columnNumber: 5
  }, void 0);
};
_s(List, "+dGEUntznS3L16kE9jZYFFuxWGU=", false, function() {
  return [useActiveAccountId, useTranslation, useTranslation, useSearchBobjects];
});
_c2 = List;
const Footer = ({
  children
}) => {
  _s2();
  const {
    setCreateLead
  } = useCreationForm();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.duplicatesLayout"
  });
  return /* @__PURE__ */ _jsxDEV(BubbleWindowFooter, {
    className: styles._buttons,
    children: children ? children : /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(CreateItHereCallToAction, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 157,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
        iconLeft: "send",
        expand: true,
        onClick: () => setCreateLead(true),
        children: t("createNewLead")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 158,
        columnNumber: 11
      }, void 0)]
    }, void 0, true)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 152,
    columnNumber: 5
  }, void 0);
};
_s2(Footer, "xxkRS8evMgGLa3I6z75TGTAk+6w=", false, function() {
  return [useCreationForm, useTranslation];
});
_c3 = Footer;
const Header = ({
  children
}) => /* @__PURE__ */ _jsxDEV(_Fragment, {
  children: [/* @__PURE__ */ _jsxDEV(BubbleWindowHeaderCircularBadge, {
    title: "?",
    backgroundColor: "var(--lightBloobirds)",
    color: "darkBloobirds",
    titleColor: "darkBloobirds",
    borderColor: "darkBloobirds"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 169,
    columnNumber: 5
  }, void 0), children]
}, void 0, true);
_c4 = Header;
export const MultipleBobjectsLayout = Object.assign(MultipleBobjectsPage, {
  Header,
  List,
  Footer
});
_c5 = MultipleBobjectsLayout;
var _c, _c2, _c3, _c4, _c5;
$RefreshReg$(_c, "MultipleBobjectsPage");
$RefreshReg$(_c2, "List");
$RefreshReg$(_c3, "Footer");
$RefreshReg$(_c4, "Header");
$RefreshReg$(_c5, "MultipleBobjectsLayout");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/pages/contactRelatedCompanies/contactRelatedCompanies.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactRelatedCompanies/contactRelatedCompanies.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactRelatedCompanies/contactRelatedCompanies.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { ContactViewTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { BubbleWindow } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { CompanyBriefCard } from "/src/content/components/contactView/components/companyBriefCard/companyBriefCard.tsx.js";
import { CompanyBriefHeader } from "/src/content/components/contactView/components/companyBriefHeader/companyBriefHeader.tsx.js";
import { ContactViewContent } from "/src/content/components/contactView/components/contactViewContent/contactViewContent.tsx.js";
import NoBobjectsPage from "/src/content/components/contactView/pages/noBobjectsPage/noBobjectsPage.tsx.js";
import { HandleBobjectRelationsModal } from "/src/content/components/contactView/pages/contactRelatedCompanies/components/handleBobjectRelationsModal.tsx.js";
import styles from "/src/content/components/contactView/pages/contactRelatedCompanies/contactRelatedCompanies.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const AddParentCompanyButton = ({
  size,
  onClick
}) => {
  _s();
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV(Button, {
    size,
    variant: "secondary",
    iconLeft: "addCircle",
    uppercase: false,
    onClick,
    children: /* @__PURE__ */ _jsxDEV(Text, {
      color: "bloobirds",
      size: size === "small" ? "xs" : "s",
      children: size === "small" ? t("sidePeek.noObjectsPage.addParentCompany") : t("sidePeek.noObjectsPage.addRelationship")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 25,
    columnNumber: 5
  }, void 0);
};
_s(AddParentCompanyButton, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = AddParentCompanyButton;
const CompaniesDisplay = ({
  companies
}) => {
  _s2();
  const {
    t
  } = useTranslation();
  const [showAll, setShowAll] = useState(companies.length <= 3);
  const companiesToShow = showAll ? companies : companies.slice(0, 3);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._companies_display,
    children: [companiesToShow.map((company) => /* @__PURE__ */ _jsxDEV(CompanyBriefCard, {
      company
    }, company.id.objectId, false, {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 9
    }, void 0)), !showAll && /* @__PURE__ */ _jsxDEV(Button, {
      variant: "clear",
      onClick: () => setShowAll(true),
      uppercase: false,
      children: t("common.showAll")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 46,
    columnNumber: 5
  }, void 0);
};
_s2(CompaniesDisplay, "axEUOPZ3/dWHh0uBzMz1uYfIG5o=", false, function() {
  return [useTranslation];
});
_c2 = CompaniesDisplay;
const RelatedBobjectsView = ({
  company,
  parentCompany,
  childCompanies,
  setModalOpen,
  siblingCompanies,
  sidePeekEnabled
}) => {
  _s3();
  const defaultButtonProps = {
    size: "small",
    variant: "secondary",
    uppercase: false,
    className: styles.editRelationshipText
  };
  const {
    t
  } = useTranslation();
  const longText = document.querySelector("#floating-menu")?.clientWidth > 470;
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.container,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.relatedEntityBlock,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.infoHeader,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            weight: "bold",
            color: "softPeanut",
            className: styles.sectionTitle,
            children: t("sidePeek.contactRelatedCompanies.parentCompany")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 88,
            columnNumber: 13
          }, void 0), !parentCompany ? /* @__PURE__ */ _jsxDEV(AddParentCompanyButton, {
            size: "small",
            onClick: () => setModalOpen("PARENT")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 92,
            columnNumber: 15
          }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
            className: styles.buttonContainer,
            children: [/* @__PURE__ */ _jsxDEV(Button, {
              ...defaultButtonProps,
              iconLeft: "cross",
              onClick: () => setModalOpen("DELETE_PARENT"),
              children: /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                color: "bloobirds",
                children: sidePeekEnabled && longText ? t("sidePeek.contactRelatedCompanies.removeRelationships") : t("sidePeek.contactRelatedCompanies.remove")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 100,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 95,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
              ...defaultButtonProps,
              iconLeft: "refresh",
              onClick: () => setModalOpen("PARENT"),
              children: /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                color: "bloobirds",
                children: sidePeekEnabled && longText ? t("sidePeek.contactRelatedCompanies.replaceRelationships") : t("sidePeek.contactRelatedCompanies.replace")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 111,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 106,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 94,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 87,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.entitiesList,
          children: [parentCompany && /* @__PURE__ */ _jsxDEV(CompanyBriefCard, {
            company: parentCompany
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 121,
            columnNumber: 31
          }, void 0), siblingCompanies?.length > 1 && /* @__PURE__ */ _jsxDEV("div", {
            className: styles.siblingsWrapper,
            children: [/* @__PURE__ */ _jsxDEV("div", {
              className: styles.siblingsTitle,
              children: [/* @__PURE__ */ _jsxDEV(Icon, {
                name: "child",
                color: "softPeanut",
                size: 16
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 125,
                columnNumber: 19
              }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                color: "softPeanut",
                weight: "bold",
                children: t("sidePeek.contactRelatedCompanies.siblingCompanies")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 126,
                columnNumber: 19
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 124,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(
              CompaniesDisplay,
              {
                companies: siblingCompanies.filter(({
                  id: {
                    objectId
                  }
                }) => objectId !== company.id.objectId)
              },
              void 0,
              false,
              {
                fileName: _jsxFileName,
                lineNumber: 130,
                columnNumber: 17
              },
              void 0
            )]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 123,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 120,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.relatedEntityBlock,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.infoHeader,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            weight: "bold",
            color: "softPeanut",
            className: styles.sectionTitle,
            children: t("sidePeek.contactRelatedCompanies.childCompanies")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 142,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
            ...defaultButtonProps,
            iconLeft: childCompanies?.length ? "edit" : "addCircle",
            onClick: () => setModalOpen("CHILD"),
            children: /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "bloobirds",
              weight: "regular",
              children: childCompanies?.length ? sidePeekEnabled ? t("sidePeek.contactRelatedCompanies.editChildCompanies") : t("sidePeek.contactRelatedCompanies.editCompanies") : t("sidePeek.contactRelatedCompanies.addChildCompanies")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 150,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 145,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 141,
          columnNumber: 11
        }, void 0), childCompanies?.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
          className: styles.entitiesList,
          children: /* @__PURE__ */ _jsxDEV(CompaniesDisplay, {
            companies: childCompanies
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 161,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 160,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 140,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 7
    }, void 0)
  }, void 0, false);
};
_s3(RelatedBobjectsView, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c3 = RelatedBobjectsView;
export const ContactRelatedCompanies = (props) => {
  _s4();
  const {
    setActiveBobject,
    useGetSidePeekEnabled
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const [modalOpen, setModalOpen] = useState(void 0);
  const {
    company,
    parentCompany,
    childCompanies
  } = props;
  const hasRelatedCompanies = parentCompany || childCompanies?.length > 0;
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: [hasRelatedCompanies ? /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(CompanyBriefHeader, {
        company,
        sidePeekEnabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 187,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewContent, {
        fullWidth: true,
        children: /* @__PURE__ */ _jsxDEV(RelatedBobjectsView, {
          setModalOpen,
          sidePeekEnabled,
          ...props
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 189,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 188,
        columnNumber: 11
      }, void 0)]
    }, void 0, true) : /* @__PURE__ */ _jsxDEV(NoBobjectsPage, {
      contactPage: ContactViewTab.RELATED_COMPANIES,
      children: /* @__PURE__ */ _jsxDEV(AddParentCompanyButton, {
        size: "medium",
        onClick: () => setModalOpen("INITIAL")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 198,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 197,
      columnNumber: 9
    }, void 0), modalOpen && /* @__PURE__ */ _jsxDEV(HandleBobjectRelationsModal, {
      initialStep: modalOpen,
      data: props,
      handleCloseModal: (event, value) => {
        setActiveBobject(value || company);
        setModalOpen(void 0);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 202,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 184,
    columnNumber: 5
  }, void 0);
};
_s4(ContactRelatedCompanies, "vzfWkJIIqpKUDSTznne+L9ADOXY=", true, function() {
  return [useExtensionContext];
});
_c4 = ContactRelatedCompanies;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "AddParentCompanyButton");
$RefreshReg$(_c2, "CompaniesDisplay");
$RefreshReg$(_c3, "RelatedBobjectsView");
$RefreshReg$(_c4, "ContactRelatedCompanies");
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

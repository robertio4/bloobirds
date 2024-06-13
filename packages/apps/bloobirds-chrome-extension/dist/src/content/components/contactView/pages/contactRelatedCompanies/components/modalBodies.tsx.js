import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/pages/contactRelatedCompanies/components/modalBodies.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactRelatedCompanies/components/modalBodies.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactRelatedCompanies/components/modalBodies.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, ModalContent, ModalFooter, Spinner, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { COMPANY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import styles from "/src/content/components/contactView/pages/contactRelatedCompanies/contactRelatedCompanies.module.css.js";
import { EVENTS, STATES } from "/src/content/components/contactView/pages/contactRelatedCompanies/components/relatedBobject.machine.tsx.js";
import { RelatedBobjectSelector } from "/src/content/components/contactView/pages/contactRelatedCompanies/components/relatedBobjectSelector/relatedBobjectSelector.tsx.js";
import { SearchItem } from "/src/content/components/contactView/pages/contactRelatedCompanies/components/searchItem/searchItem.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const InitialModalBody = ({
  send,
  companyName
}) => {
  _s();
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(ModalContent, {
      className: styles._add_related_company_content,
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles._modal_content_text,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          align: "center",
          children: [t("sidePeek.contactRelatedCompanies.addParentOrChildCompany") + " ", /* @__PURE__ */ _jsxDEV(Text, {
            htmlTag: "span",
            size: "m",
            color: "bloobirds",
            children: companyName
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 27,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          align: "center",
          children: t("sidePeek.contactRelatedCompanies.selectTypeCompany")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 31,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalFooter, {
      className: styles._add_related_company_footer_content,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        children: /* @__PURE__ */ _jsxDEV(Button, {
          onClick: () => send(STATES.PARENT),
          className: styles._add_related_company_button,
          uppercase: true,
          children: t("sidePeek.contactRelatedCompanies.parentCompany")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        children: /* @__PURE__ */ _jsxDEV(Button, {
          className: styles._add_related_company_button,
          onClick: () => send(STATES.CHILD),
          uppercase: true,
          children: t("sidePeek.contactRelatedCompanies.childCompany")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }, void 0)]
  }, void 0, true);
};
_s(InitialModalBody, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = InitialModalBody;
export const AddRelatedBobjectBody = ({
  send,
  type,
  context: {
    company,
    parentCompany,
    childCompanies,
    siblingCompanies,
    handleClose
  }
}) => {
  _s2();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [children, setChildren] = useState(childCompanies);
  const childrenToDelete = useRef([]);
  const isChild = type === "CHILD";
  const {
    t
  } = useTranslation();
  const handleSaveChildren = () => {
    setIsSubmitting(true);
    const childrenToAssignReq = children.reduce((acc, curr) => {
      return {
        ...acc,
        [curr?.id?.value]: {
          [COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT]: company?.id?.value
        }
      };
    }, {});
    const childrenToDeleteReq = childrenToDelete.current.reduce((acc, curr) => {
      return {
        ...acc,
        [curr?.id?.value]: {
          [COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT]: null
        }
      };
    }, {});
    return api.patch(`/bobjects/${company.id.accountId}/Company/bulk`, {
      ...childrenToAssignReq,
      ...childrenToDeleteReq
    });
  };
  function handleOnClick(value) {
    switch (type) {
      case STATES.PARENT:
        return send(STATES.CONFIRM, {
          dataToAssign: value
        });
      default:
        setChildren(children ? [...children, value] : [value]);
    }
  }
  function handleDelete(child) {
    const newChildren = children.filter((c) => c.id.value !== child.id.value);
    setChildren(newChildren);
    childrenToDelete.current.push(child);
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(ModalContent, {
      className: styles._modal_content,
      children: [parentCompany && !isChild && /* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        children: /* @__PURE__ */ _jsxDEV(Trans, {
          i18nKey: "sidePeek.contactRelatedCompanies.existingRelatedCompany"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 119,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 118,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        children: t("sidePeek.contactRelatedCompanies.searchAndSelect") + " " + (isChild ? t("sidePeek.contactRelatedCompanies.child") : t("sidePeek.contactRelatedCompanies.parent")) + " " + t("sidePeek.contactRelatedCompanies.company")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(RelatedBobjectSelector, {
        company,
        data: {
          parentCompany,
          childCompanies,
          siblingCompanies
        },
        handleOnClick
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        className: styles._search_input_text,
        size: "xs",
        color: "softPeanut",
        children: t("sidePeek.contactRelatedCompanies.searchByName")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 136,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._display_child_companies,
        children: isChild && children?.filter((childCompany) => !childCompany.delete).map((childCompany) => /* @__PURE__ */ _jsxDEV(SearchItem, {
          company: childCompany,
          handleDelete: () => handleDelete(childCompany)
        }, childCompany?.id.value, false, {
          fileName: _jsxFileName,
          lineNumber: 144,
          columnNumber: 17
        }, void 0))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 139,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 7
    }, void 0), isChild && /* @__PURE__ */ _jsxDEV(ModalFooter, {
      className: styles._modal_footer,
      children: [/* @__PURE__ */ _jsxDEV(Button, {
        variant: "clear",
        onClick: handleClose,
        uppercase: true,
        children: t("common.cancel")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 154,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
        onClick: () => {
          handleSaveChildren().then(() => {
            setIsSubmitting(false);
            handleClose();
          });
        },
        uppercase: true,
        children: isSubmitting ? /* @__PURE__ */ _jsxDEV(Spinner, {
          color: "white",
          name: "loadingCircle"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 167,
          columnNumber: 15
        }, void 0) : t("sidePeek.contactRelatedCompanies.saveChanges")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 157,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 153,
      columnNumber: 9
    }, void 0)]
  }, void 0, true);
};
_s2(AddRelatedBobjectBody, "oYBjrDN1m0JVgMFlQcG9wLCOPlw=", false, function() {
  return [useTranslation];
});
_c2 = AddRelatedBobjectBody;
export const ConfirmationBody = ({
  send,
  context: {
    company,
    parentCompany,
    dataToAssign
  }
}) => {
  _s3();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const parentCompanyName = dataToAssign.name;
  const {
    t
  } = useTranslation();
  function handleSave() {
    setIsSubmitting(true);
    return api.patch(`/bobjects/${company?.id?.value}/raw`, {
      [COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT]: dataToAssign.id.value
    });
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(ModalContent, {
      className: styles._confirm_modal_content,
      children: /* @__PURE__ */ _jsxDEV("div", {
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: [t("sidePeek.contactRelatedCompanies.confirmSetCompany") + " ", /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            color: "bloobirds",
            inline: true,
            weight: "bold",
            children: parentCompanyName
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 201,
            columnNumber: 13
          }, void 0), " ", t("sidePeek.contactRelatedCompanies.asParentCompany")]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 199,
          columnNumber: 11
        }, void 0), parentCompany && /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: /* @__PURE__ */ _jsxDEV(Trans, {
            i18nKey: "sidePeek.contactRelatedCompanies.confirmSetAndRemoveCompany"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 208,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 207,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 198,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 197,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalFooter, {
      className: styles._modal_footer,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        children: /* @__PURE__ */ _jsxDEV(Button, {
          variant: "clear",
          onClick: () => send(EVENTS.CANCEL),
          uppercase: true,
          children: dataToAssign ? t("sidePeek.contactRelatedCompanies.discardChanges") : t("common.cancel")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 215,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 214,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        children: /* @__PURE__ */ _jsxDEV(Button, {
          onClick: () => {
            handleSave().then(() => {
              setIsSubmitting(false);
              send(EVENTS.NEXT);
            });
          },
          uppercase: true,
          children: isSubmitting ? /* @__PURE__ */ _jsxDEV(Spinner, {
            color: "white",
            name: "loadingCircle"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 231,
            columnNumber: 29
          }, void 0) : t("common.confirm")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 222,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 221,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 7
    }, void 0)]
  }, void 0, true);
};
_s3(ConfirmationBody, "gv1P2S/qvlBQMGwfCtRte6YNRak=", false, function() {
  return [useTranslation];
});
_c3 = ConfirmationBody;
export const DeleteParent = ({
  send,
  context: {
    company,
    parentCompany
  }
}) => {
  _s4();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const parentCompanyName = parentCompany.name;
  const {
    t
  } = useTranslation();
  function handleSave() {
    setIsSubmitting(true);
    return api.patch(`/bobjects/${company?.id?.value}/raw`, {
      [COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT]: null
    });
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(ModalContent, {
      className: styles._confirm_modal_content,
      children: /* @__PURE__ */ _jsxDEV("div", {
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: [t("sidePeek.contactRelatedCompanies.goingToRemove") + " ", /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            color: "bloobirds",
            inline: true,
            weight: "bold",
            children: parentCompanyName
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 262,
            columnNumber: 13
          }, void 0), " " + t("sidePeek.contactRelatedCompanies.goingToRemoveConfirm")]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 260,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 259,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 258,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalFooter, {
      className: styles._modal_footer,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        children: /* @__PURE__ */ _jsxDEV(Button, {
          variant: "clear",
          onClick: () => send(EVENTS.CANCEL),
          uppercase: true,
          children: t("common.cancel")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 271,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 270,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        children: /* @__PURE__ */ _jsxDEV(Button, {
          color: "tomato",
          onClick: () => {
            handleSave().then(() => {
              setIsSubmitting(false);
              send(EVENTS.NEXT);
            });
          },
          uppercase: true,
          children: isSubmitting ? /* @__PURE__ */ _jsxDEV(Spinner, {
            color: "white",
            name: "loadingCircle"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 286,
            columnNumber: 29
          }, void 0) : t("common.delete")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 276,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 275,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 269,
      columnNumber: 7
    }, void 0)]
  }, void 0, true);
};
_s4(DeleteParent, "gv1P2S/qvlBQMGwfCtRte6YNRak=", false, function() {
  return [useTranslation];
});
_c4 = DeleteParent;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "InitialModalBody");
$RefreshReg$(_c2, "AddRelatedBobjectBody");
$RefreshReg$(_c3, "ConfirmationBody");
$RefreshReg$(_c4, "DeleteParent");
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

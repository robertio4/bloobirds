import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-confirmDeleteModal-components-confirmDeleteModal-ConfirmDeleteModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/confirmDeleteModal/components/confirmDeleteModal/ConfirmDeleteModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/confirmDeleteModal/components/confirmDeleteModal/ConfirmDeleteModal.tsx", _s = $RefreshSig$();
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Modal, ModalContent, ModalFooter, ModalHeader, ModalTitle, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useSelectAll } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { APP_CL, APP_CL_COMPANIES, APP_CL_LEADS, BobjectTypes, companyIdUrl, companyUrl, FIELDS_LOGIC_ROLE, PluralBobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getFieldByLogicRole, getRelatedBobject, getValueFromLogicRole, isCompany, isLead, isOpportunity } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useConfirmDeleteModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-confirmDeleteModal-hooks-useConfirmDeleteModal.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-confirmDeleteModal-components-confirmDeleteModal-ConfirmDeleteModal.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ConfirmDeleteModal = ({
  history,
  location
}) => {
  _s();
  const {
    bobject,
    isOpen,
    closeDeleteModal,
    isQueuedBulk,
    setRefresh,
    length,
    callback
  } = useConfirmDeleteModal();
  const {
    resetSelectedItems
  } = useSelectAll();
  const {
    t
  } = useTranslation();
  if (!isOpen)
    return null;
  const accountId = bobject?.id?.accountId;
  const isBulk = Array.isArray(bobject);
  const sampleBobject = isBulk ? bobject[0] : bobject;
  const bobjectType = sampleBobject?.id?.typeName;
  const bobjectName = getValueFromLogicRole(sampleBobject, `${bobjectType?.toUpperCase()}__NAME`);
  const handleDelete = async () => {
    if (isBulk) {
      const objectsIds = bobject?.map((object) => object?.id?.objectId);
      if (isQueuedBulk) {
        const allItems = typeof isQueuedBulk !== "boolean" && "query" in isQueuedBulk;
        api.post(`/bobjects/bulkAction/createBulk${allItems ? "ByQuery" : ""}`, {
          importName: `Delete ${allItems ? isQueuedBulk?.totalItems : bobject?.length} ${PluralBobjectTypes[bobjectType]}`,
          actionType: "DELETE",
          bobjectType,
          ...allItems ? {
            query: {
              query: isQueuedBulk.query
            }
          } : {
            bobjectIds: bobject?.map((b) => b?.id?.objectId)
          },
          contents: {}
        }).then(() => {
          closeDeleteModal();
          setRefresh(true);
        });
      } else {
        await api.delete(`${accountId}/${bobjectType}/delete/bulk`, {
          data: [objectsIds]
        });
      }
      resetSelectedItems();
    } else {
      await api.delete(`/bobjects/${bobject?.id?.value}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        data: {}
      });
    }
    if (history && location) {
      if (location.pathname?.includes(APP_CL)) {
        if (isCompany(bobject)) {
          history.push(APP_CL_COMPANIES);
        } else if (isOpportunity(bobject)) {
          const company = getRelatedBobject(bobject, BobjectTypes.Company);
          history.push(companyUrl(company));
        } else if (isLead(bobject)) {
          const companyLead = getFieldByLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType].COMPANY)?.text;
          if (!companyLead) {
            history.push(APP_CL_LEADS);
          } else {
            history.push(companyIdUrl(companyLead));
          }
        }
      }
    }
    if (callback) {
      callback();
    }
    closeDeleteModal();
  };
  return /* @__PURE__ */ _jsxDEV(Modal, {
    width: 600,
    open: isOpen,
    onClose: closeDeleteModal,
    children: [/* @__PURE__ */ _jsxDEV(ModalHeader, {
      children: /* @__PURE__ */ _jsxDEV(ModalTitle, {
        children: t("bobjects.confirmDeleteModal.title", {
          bobject: bobjectType ? t(`bobjectTypes.${bobjectType.toLowerCase()}`) : ""
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 137,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalContent, {
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles._content,
        children: [isBulk ? /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: t("bobjects.confirmDeleteModal.bulkMessage", {
            count: length || bobject?.length || 0,
            bobjectType: t(`bobjectTypes.${bobjectType.toLowerCase()}`, {
              count: length || bobject?.length || 0
            })
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 146,
          columnNumber: 13
        }, void 0) : /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: t("bobjects.confirmDeleteModal.message", {
            bobjectName: bobjectName ? bobjectName : "",
            bobjectType: bobjectType ? t(`bobjectTypes.${bobjectType.toLowerCase()}`) : ""
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 155,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: /* @__PURE__ */ _jsxDEV(Trans, {
            i18nKey: "bobjects.confirmDeleteModal.subtitle"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 163,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 162,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 144,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalFooter, {
      children: [/* @__PURE__ */ _jsxDEV(Button, {
        variant: "tertiary",
        onClick: closeDeleteModal,
        children: t("bobjects.confirmDeleteModal.cancel")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 168,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
        variant: "primary",
        color: "tomato",
        dataTest: "deleteModalDeleteButton",
        onClick: handleDelete,
        children: isBulk ? t("bobjects.confirmDeleteModal.deleteBulk", {
          bobjectType: t(`bobjectTypes.${bobjectType.toLowerCase()}`, {
            count: 2
          })
        }) : t("bobjects.confirmDeleteModal.delete")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 171,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 135,
    columnNumber: 5
  }, void 0);
};
_s(ConfirmDeleteModal, "c8qhf+dpRyK+wID6QOa2G0bfrs4=", false, function() {
  return [useConfirmDeleteModal, useSelectAll, useTranslation];
});
_c = ConfirmDeleteModal;
var _c;
$RefreshReg$(_c, "ConfirmDeleteModal");
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

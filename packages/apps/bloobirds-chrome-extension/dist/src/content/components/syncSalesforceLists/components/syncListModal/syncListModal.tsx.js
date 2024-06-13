import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/syncSalesforceLists/components/syncListModal/syncListModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/syncSalesforceLists/components/syncListModal/syncListModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/syncSalesforceLists/components/syncListModal/syncListModal.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Callout, Checkbox, Modal, ModalCloseIcon, ModalContent, ModalFooter, ModalHeader, ModalTitle, Spinner, Text, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { getSalesforceSobjectFromPage } from "/src/utils/url.ts.js";
import { inProgressBulkActionsState } from "/src/content/components/bulkActionsToasts/bulkActionsToasts.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/syncSalesforceLists/components/syncListModal/syncListModal.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const allowedSobjectTypes = ["Lead", "Contact", "Account", "Opportunity"];
export const relatedCompanySobjects = ["Lead", "Contact", "Opportunity"];
export const relatedLeadsSobjects = ["Account", "Opportunity"];
const pluralSobjectTypes = {
  Lead: "leads",
  Contact: "contacts",
  Account: "accounts",
  Opportunity: "opportunities"
};
function SyncListInfo(props) {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.syncSalesforceList.syncListInfo"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.content,
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      size: "m",
      weight: "medium",
      children: props.syncText
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      children: [props.relatedCompanyAllowed && /* @__PURE__ */ _jsxDEV("div", {
        className: styles.relatedObjectsSetting,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          weight: "bold",
          children: t("titleAccounts")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 59,
          columnNumber: 13
        }, this), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.checkbox,
          children: /* @__PURE__ */ _jsxDEV(Checkbox, {
            size: "small",
            onClick: props.onCreateAccountsClick,
            checked: props.shouldCreateAccounts,
            children: t("checkBoxTextAccounts", {
              type: props.sobjectType
            })
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 63,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 62,
          columnNumber: 13
        }, this), props.shouldCreateAccounts && /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          children: t("shouldCreateAccountsText", {
            type: props.sobjectType
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 72,
          columnNumber: 15
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 11
      }, this), props.relatedLeadsAllowed && /* @__PURE__ */ _jsxDEV("div", {
        className: styles.relatedObjectsSetting,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          children: t("titleContacts")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 80,
          columnNumber: 13
        }, this), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.checkbox,
          children: /* @__PURE__ */ _jsxDEV(Checkbox, {
            size: "small",
            onClick: props.onCreateContactsClick,
            checked: props.shouldCreateContacts,
            children: t("checkBoxTextContacts", {
              type: props.sobjectType
            })
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 84,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 83,
          columnNumber: 13
        }, this), props.shouldCreateContacts && /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "softPeanut",
          children: t("shouldCreateContactsText", {
            type: props.sobjectType
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 93,
          columnNumber: 15
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 11
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.callout,
      children: /* @__PURE__ */ _jsxDEV(Callout, {
        variant: "neutral",
        icon: "info",
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          children: t("callout", {
            type: pluralSobjectTypes[props.sobjectType]
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 102,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 52,
    columnNumber: 5
  }, this);
}
_s(SyncListInfo, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = SyncListInfo;
export const SyncListModal = ({
  onClose,
  salesforceIds,
  isRecentList = false
}) => {
  _s2();
  const {
    useGetCurrentPage
  } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const sobjectType = getSalesforceSobjectFromPage(currentPage);
  const [createCompany, setCreateCompany] = useState(true);
  const [createRelatedLeads, setCreateRelatedLeads] = useState(true);
  const {
    createToast
  } = useToasts();
  const [loading, setLoading] = useState(false);
  const [, setInProgressBulkActions] = useRecoilState(inProgressBulkActionsState);
  const {
    useGetSettings
  } = useExtensionContext();
  const relatedCompanyAllowed = relatedCompanySobjects?.includes(sobjectType);
  const relatedLeadsAllowed = relatedLeadsSobjects?.includes(sobjectType);
  const isNotAllowedSobjectType = !allowedSobjectTypes?.includes(sobjectType);
  const searchParams = new URLSearchParams(window.location.search);
  const listId = searchParams.get("filterName");
  const [wholeList, setWholeList] = useState(false);
  const settings = useGetSettings();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.syncSalesforceList.syncListModal"
  });
  const handleSync = async () => {
    setLoading(true);
    const body = {
      createRelatedCompany: relatedCompanyAllowed && createCompany,
      createRelatedLead: relatedLeadsAllowed && createRelatedLeads
    };
    const syncSelection = salesforceIds?.length > 0 && !wholeList;
    if (syncSelection) {
      body["salesforceIds"] = salesforceIds;
    }
    const response = await api.post(syncSelection ? `/utils/service/salesforce/sync/sobjects/${sobjectType}` : `/utils/service/salesforce/sync/list/${sobjectType}/${listId}`, body);
    if (response.status === 200) {
      createToast({
        message: t("toasts.success", {
          type: sobjectType
        }),
        type: "success"
      });
      setInProgressBulkActions((prev) => [...prev, {
        uniqueNotificationId: response.data.uniqueNotificationId,
        name: t("bulkMessages.starting"),
        status: "CREATING",
        owner: settings?.user?.id
      }]);
      onClose();
    } else {
      createToast({
        message: t("toasts.error", {
          type: sobjectType
        }),
        type: "error"
      });
    }
    setLoading(false);
  };
  const {
    data
  } = useSWR(wholeList && listId && listId !== "Recent" && "sync-sfdc-list-" + listId, () => api.get(`/utils/service/salesforce/total/${sobjectType}/${listId}`));
  const listSize = data?.data?.listSize || 0;
  const syncText = salesforceIds?.length > 0 && !wholeList ? t("bulkMessages.synchronizeItems", {
    count: salesforceIds.length,
    type: pluralSobjectTypes[sobjectType]
  }) : t("bulkMessages.synchronizeAll", {
    count: salesforceIds.length,
    type: pluralSobjectTypes[sobjectType]
  });
  const Actions = () => {
    if (salesforceIds.length > 0 || wholeList && listSize > 0 && !isRecentList) {
      return /* @__PURE__ */ _jsxDEV(SyncListInfo, {
        syncText,
        relatedCompanyAllowed,
        onCreateAccountsClick: () => setCreateCompany(!createCompany),
        shouldCreateAccounts: createCompany,
        sobjectType,
        relatedLeadsAllowed,
        onCreateContactsClick: () => setCreateRelatedLeads(!createRelatedLeads),
        shouldCreateContacts: createRelatedLeads
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 197,
        columnNumber: 9
      }, void 0);
    }
    if (wholeList && listSize === 0 && !isRecentList) {
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.recently_viewed_content,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: t("noResults", {
            type: pluralSobjectTypes[sobjectType]
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 213,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 212,
        columnNumber: 9
      }, void 0);
    }
    if (salesforceIds.length === 0 && !(wholeList && listSize > 0 || isRecentList)) {
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.recently_viewed_content,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: t("noSelected")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 221,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 220,
        columnNumber: 9
      }, void 0);
    }
    if (salesforceIds.length === 0 && isRecentList) {
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.recently_viewed_content,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: t("recentTitle")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 229,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: t("recentSubtitle")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 230,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 228,
        columnNumber: 9
      }, void 0);
    }
    return null;
  };
  return /* @__PURE__ */ _jsxDEV(Modal, {
    open: true,
    onClose,
    width: 660,
    children: [/* @__PURE__ */ _jsxDEV(ModalHeader, {
      size: "small",
      children: [/* @__PURE__ */ _jsxDEV(ModalTitle, {
        variant: "primary",
        size: "small",
        icon: "bloobirds",
        children: t("title", {
          type: pluralSobjectTypes[sobjectType] || sobjectType
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 241,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ModalCloseIcon, {
        onClick: onClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 244,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalContent, {
      children: isNotAllowedSobjectType ? /* @__PURE__ */ _jsxDEV("div", {
        className: styles.content,
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.errorMessage,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            children: t("contentUpperBlock", {
              type: sobjectType
            })
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 251,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            children: t("contentDownBlock")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 252,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 249,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 248,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(Actions, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 256,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 246,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalFooter, {
      children: [/* @__PURE__ */ _jsxDEV(Button, {
        onClick: onClose,
        variant: "clear",
        children: t("goBack")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 260,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.buttons,
        children: [!wholeList && !isRecentList && /* @__PURE__ */ _jsxDEV(Button, {
          disabled: loading,
          variant: "secondary",
          onClick: () => setWholeList(true),
          children: t("syncWholeList")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 265,
          columnNumber: 13
        }, void 0), (salesforceIds.length > 0 && !wholeList || wholeList) && /* @__PURE__ */ _jsxDEV(Button, {
          disabled: loading || wholeList && listSize === 0,
          onClick: handleSync,
          children: loading ? /* @__PURE__ */ _jsxDEV(Spinner, {
            color: "white",
            name: "loadingCircle"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 271,
            columnNumber: 26
          }, void 0) : t("sync")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 270,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 263,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 259,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 239,
    columnNumber: 5
  }, void 0);
};
_s2(SyncListModal, "DxTXrfO5owpx/L/jyy6KbHcMPcU=", true, function() {
  return [useExtensionContext, useToasts, useRecoilState, useExtensionContext, useTranslation, useSWR];
});
_c2 = SyncListModal;
var _c, _c2;
$RefreshReg$(_c, "SyncListInfo");
$RefreshReg$(_c2, "SyncListModal");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }
}

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/syncSalesforceContactsScreen/syncSalesforceContactScreen.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/syncSalesforceContactsScreen/syncSalesforceContactScreen.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/syncSalesforceContactsScreen/syncSalesforceContactScreen.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Checkbox, CircularBadge, Text, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { LEAD_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { BubbleWindow } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import TopIconBar from "/src/content/components/topIconBar/topIconBar.tsx.js";
import styles from "/src/content/components/syncSalesforceContactsScreen/syncSalesforceContactScreen.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SyncSalesforceContactScreen = ({
  draftBobjectToSync,
  companyIdRelated,
  onSync,
  opportunityRelatedId
}) => {
  _s();
  const {
    createToast
  } = useToasts();
  const {
    useGetDataModel,
    useGetSettings,
    setActiveBobject,
    setExtendedContext,
    setCustomPage
  } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const {
    t
  } = useTranslation();
  const [selectedBobjects, setSelectedBobject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bobjects, setBobjects] = useState(draftBobjectToSync);
  const leadNameField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.NAME);
  const leadSurnameField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.SURNAME);
  const leadTitleField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE);
  const leadEmailField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.EMAIL);
  const leadAssignedTo = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  const users = useUserSearch();
  const updateSelected = (bobject) => {
    setSelectedBobject((currSelected) => currSelected?.find((b) => opportunityRelatedId ? b?.salesforceId === bobject?.salesforceId : b?.sobject?.["Id"] === bobject?.sobject?.["Id"]) ? currSelected?.filter((b) => opportunityRelatedId ? b?.salesforceId !== bobject?.salesforceId : b?.sobject?.["Id"] !== bobject?.sobject?.["Id"]) : [...currSelected, bobject]);
  };
  const syncLeadsRequest = (url, data, isBulk, requestData) => {
    apiRequest(url, data, isBulk).then((response) => {
      if (response?.status === 200) {
        setSelectedBobject([]);
        setLoading(false);
        if (opportunityRelatedId) {
          addLeadsToOpportunity(isBulk ? response?.data?.map((bobject) => bobject?.value) : [response?.data?.value], opportunityRelatedId?.value);
          const resultingBobjects = bobjects?.filter((bobj) => isBulk ? requestData?.map((obj) => obj?.salesforceId).includes(bobj?.salesforceId) : bobj?.salesforceId !== requestData?.salesforceId);
          setBobjects(resultingBobjects);
          if (resultingBobjects?.length === 0) {
            setCustomPage(null);
          }
        } else {
          const resultingBobjects = bobjects?.filter((bobj) => isBulk ? requestData?.map((obj) => obj?.sobject?.["Id"]).includes(bobj?.sobject?.["Id"]) : bobj?.sobject?.["Id"] !== requestData?.sobject?.["Id"]);
          setBobjects(resultingBobjects);
          if (resultingBobjects?.length === 0) {
            setCustomPage(null);
          }
        }
        if (onSync) {
          onSync();
        }
        createToast({
          message: t("sidePeek.overview.toasts.contactSyncedSuccess"),
          type: "success"
        });
      }
    }).catch(() => {
      createToast({
        message: t("sidePeek.overview.toasts.contactSyncedError"),
        type: "error"
      });
    }).finally(() => {
      setSelectedBobject([]);
      setLoading(false);
    });
  };
  const apiRequest = (url, data, isBulk) => {
    return isBulk ? api.put(url, data) : api.post(url, data);
  };
  const syncLeads = (requestData) => {
    setLoading(true);
    const isBulk = Array.isArray(requestData);
    const contents = isBulk ? bobjects?.map((bobject) => {
      return {
        ...bobject?.rawBobject,
        [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: companyIdRelated?.value
      };
    }) : {
      ...requestData?.rawBobject,
      [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: companyIdRelated?.value
    };
    const url = isBulk ? `/bobjects/${settings?.account?.id}/Lead/bulk` : `/bobjects/${settings?.account?.id}/Lead`;
    const data = isBulk ? contents : {
      contents,
      params: {}
    };
    if (isBulk) {
      const syncLeads2 = requestData?.filter((lead) => lead?.id?.objectId === null);
      const syncLeadsWithOpportunity = requestData?.filter((lead) => lead?.id?.objectId !== null);
      if (syncLeads2.length > 0) {
        syncLeadsRequest(url, data, isBulk, syncLeads2);
      }
      if (syncLeadsWithOpportunity.length > 0) {
        const leadIds = syncLeadsWithOpportunity.map((lead) => lead?.id?.value);
        addLeadsToOpportunity(leadIds, opportunityRelatedId?.value);
        const resultingBobjects = bobjects?.filter((bobject) => !leadIds?.includes(bobject?.id?.value));
        if (resultingBobjects?.length === 0) {
          setCustomPage(null);
        }
        setBobjects(resultingBobjects);
      }
    } else {
      if (requestData?.id?.objectId === null) {
        syncLeadsRequest(url, data, isBulk, requestData);
      } else {
        addLeadsToOpportunity([requestData?.id?.value], opportunityRelatedId?.value);
        const resultingBobjects = bobjects?.filter((bobj) => bobj?.salesforceId !== requestData?.salesforceId);
        if (resultingBobjects?.length === 0) {
          setCustomPage(null);
        }
        setBobjects(resultingBobjects);
      }
    }
  };
  const addLeadsToOpportunity = (leadsToRelate, opportunityId) => {
    api.post(`/bobjects/${settings?.account?.id}/operations/fill/opportunity-leads`, {
      leadsToRelate,
      opportunityId
    }).then(() => {
      setLoading(false);
      setSelectedBobject([]);
      if (onSync) {
        onSync();
      }
    });
  };
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: [/* @__PURE__ */ _jsxDEV(TopIconBar, {
      dragging: false,
      onBackButton: () => {
        setCustomPage(null);
      },
      backgroundColor: "lightestBloobirds",
      onRefresh: () => {
        setActiveBobject(null);
        setExtendedContext(null);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.wrapper,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.header,
        children: [/* @__PURE__ */ _jsxDEV("span", {
          className: styles.left_header,
          children: [/* @__PURE__ */ _jsxDEV(Checkbox, {
            size: "small",
            disableHoverStyle: true,
            checked: selectedBobjects?.length === bobjects.length,
            onClick: () => {
              selectedBobjects?.length === bobjects?.length ? setSelectedBobject([]) : setSelectedBobject(bobjects);
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 209,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            children: t("sidePeek.overview.selectAll")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 219,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 208,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("span", {
          className: styles.right_header,
          children: /* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            color: "softPeanut",
            weight: "bold",
            children: t("sidePeek.overview.contacts", {
              count: selectedBobjects?.length
            })
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 222,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 221,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 207,
        columnNumber: 9
      }, void 0), bobjects?.map((bobject) => {
        const assignedTo = bobject?.rawBobject[leadAssignedTo?.id];
        const assigneeUser = users?.users?.find((user) => user?.id === assignedTo);
        const assignedColor = assigneeUser?.color;
        const assignedShortName = assigneeUser?.shortname;
        const assignedName = assigneeUser?.name;
        return /* @__PURE__ */ _jsxDEV("div", {
          className: styles.container,
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles.top_container,
            children: [/* @__PURE__ */ _jsxDEV(Checkbox, {
              size: "small",
              disableHoverStyle: true,
              checked: !!selectedBobjects?.find((b) => opportunityRelatedId ? b?.salesforceId === bobject?.salesforceId : b?.sobject?.["Id"] === bobject?.sobject?.["Id"]),
              onClick: () => updateSelected(bobject)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 236,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              className: styles.info_container,
              children: [/* @__PURE__ */ _jsxDEV(Text, {
                size: "s",
                color: "bloobirds",
                children: [bobject?.rawBobject[leadNameField?.id], " ", bobject?.rawBobject[leadSurnameField?.id]]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 249,
                columnNumber: 19
              }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                color: "softPeanut",
                children: bobject?.rawBobject[leadTitleField?.id] || bobject?.rawBobject[leadEmailField?.id]
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 253,
                columnNumber: 19
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 248,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 235,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles.bottom_container,
            children: [/* @__PURE__ */ _jsxDEV("div", {
              children: assigneeUser && /* @__PURE__ */ _jsxDEV("div", {
                className: styles.assigned_to,
                children: [/* @__PURE__ */ _jsxDEV(CircularBadge, {
                  style: {
                    fontSize: "9px"
                  },
                  backgroundColor: assignedColor || "lightPeanut",
                  size: "small",
                  className: styles.assign_badge,
                  children: assignedShortName || "U"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 263,
                  columnNumber: 23
                }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                  size: "s",
                  ellipsis: 18,
                  children: assignedName
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 271,
                  columnNumber: 23
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 262,
                columnNumber: 21
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 260,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              children: /* @__PURE__ */ _jsxDEV(Button, {
                size: "small",
                iconRight: "bloobirds",
                disabled: loading,
                onClick: () => syncLeads(bobject),
                children: t("sidePeek.overview.sync").toUpperCase()
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 278,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 277,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 259,
            columnNumber: 15
          }, void 0)]
        }, bobject?.sobject?.["Id"], true, {
          fileName: _jsxFileName,
          lineNumber: 234,
          columnNumber: 13
        }, void 0);
      })]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 206,
      columnNumber: 7
    }, void 0), selectedBobjects?.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.sync_bloobirds_banner,
      children: /* @__PURE__ */ _jsxDEV(Button, {
        iconRight: "bloobirds",
        variant: "tertiary",
        className: styles.button,
        onClick: () => syncLeads(selectedBobjects),
        children: t("sidePeek.overview.syncInBloobirds")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 294,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 293,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 194,
    columnNumber: 5
  }, void 0);
};
_s(SyncSalesforceContactScreen, "H2bKQ/BKr9K+EOYh6zijh2+bwCM=", true, function() {
  return [useToasts, useExtensionContext, useTranslation, useUserSearch];
});
_c = SyncSalesforceContactScreen;
var _c;
$RefreshReg$(_c, "SyncSalesforceContactScreen");
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

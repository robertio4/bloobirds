import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/syncSalesforceLists/components/syncCadencesModal/syncCadencesModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/syncSalesforceLists/components/syncCadencesModal/syncCadencesModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/syncSalesforceLists/components/syncCadencesModal/syncCadencesModal.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useClickAway } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import { CadencePreview, CadenceSelector, useCadences, useCadenceSteps } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-index.tsx.js";
import { Button, Callout, Checkbox, DateTimePicker, Item, Modal, ModalCloseIcon, ModalContent, ModalFooter, ModalHeader, ModalTitle, Select, Spinner, Text, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { getSalesforceSobjectFromPage } from "/src/utils/url.ts.js";
import { inProgressBulkActionsState } from "/src/content/components/bulkActionsToasts/bulkActionsToasts.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { relatedCompanySobjects, relatedLeadsSobjects } from "/src/content/components/syncSalesforceLists/components/syncListModal/syncListModal.tsx.js";
import styles from "/src/content/components/syncSalesforceLists/components/syncCadencesModal/syncCadencesModal.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const pluralSobjectTypes = {
  Lead: "leads",
  Contact: "contacts",
  Account: "accounts",
  Opportunity: "opportunities"
};
const allowedSobjectTypes = ["Lead", "Contact", "Account", "Opportunity"];
const sobjectToBobject = {
  Lead: "Lead",
  Contact: "Lead",
  Account: "Company",
  Opportunity: "Opportunity"
};
function StartCadenceSettings(props) {
  return /* @__PURE__ */ _jsxDEV("div", {
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      size: "m",
      weight: "medium",
      children: props.startCadenceText
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 7
    }, this), props.showCadenceSelector && /* @__PURE__ */ _jsxDEV(CadenceSelector, {
      selectedBobject: {
        id: {
          typeName: sobjectToBobject[props.sobjectType],
          value: "",
          objectId: "",
          accountId: props.accountId
        },
        fields: [],
        stage: null
      },
      onCadenceSelected: props.onCadenceSelected,
      ref: props.ref,
      userId: props.userId,
      className: styles.box
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 9
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.cadencePreview,
      children: /* @__PURE__ */ _jsxDEV(CadencePreview, {
        cadenceId: props?.selectedCadence,
        isChromeExtension: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 117,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.cadenceBox,
      children: [/* @__PURE__ */ _jsxDEV(Select, {
        value: props.selectedCadence,
        onClick: props.onClick,
        placeholder: "Select the cadence",
        className: styles.select,
        children: props.enabledCadences?.map((cadence) => /* @__PURE__ */ _jsxDEV(Item, {
          value: cadence.id,
          className: styles.hidden,
          children: cadence.name
        }, cadence.id, false, {
          fileName: _jsxFileName,
          lineNumber: 127,
          columnNumber: 13
        }, this))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 120,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        children: /* @__PURE__ */ _jsxDEV(DateTimePicker, {
          dataTest: "BaseInput-Cadence-DatetimePicker",
          value: props.date,
          placeholder: "Start cadence date *",
          withTimePicker: props.withTimePicker,
          onChange: props.onChange
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 133,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 132,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.cadenceOptions,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        weight: "medium",
        children: "Cadence options"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 143,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.checkbox,
        children: /* @__PURE__ */ _jsxDEV(Checkbox, {
          size: "small",
          onClick: () => props.setSyncMode(props.syncMode === "syncAndStart" ? "startOnly" : "syncAndStart"),
          checked: props.syncMode === "syncAndStart",
          children: ["If the ", props.sobjectType, " is not currently synced, sync it before starting the cadence"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 147,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 146,
        columnNumber: 9
      }, this), props.relatedCompanyAllowed && /* @__PURE__ */ _jsxDEV("div", {
        className: styles.checkbox,
        children: /* @__PURE__ */ _jsxDEV(Checkbox, {
          size: "small",
          onClick: props.onCreateAccountsClick,
          checked: props.shouldCreateAccounts,
          children: ["Create companies when syncing ", props.sobjectType, " without an existing one"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 159,
          columnNumber: 13
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 158,
        columnNumber: 11
      }, this), props.relatedLeadsAllowed && /* @__PURE__ */ _jsxDEV("div", {
        className: styles.checkbox,
        children: /* @__PURE__ */ _jsxDEV(Checkbox, {
          size: "small",
          onClick: props.onCreateLeadsClick,
          checked: props.shouldCreateLeads,
          children: ["Create leads when syncing ", props.sobjectType, " without an existing one"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 170,
          columnNumber: 13
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 169,
        columnNumber: 11
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.checkbox,
        children: /* @__PURE__ */ _jsxDEV(Checkbox, {
          size: "small",
          onClick: () => props.setReplaceCadence(props.replaceCadence === "replace" ? "skip" : "replace"),
          checked: props.replaceCadence === "replace",
          children: ["If the ", props.sobjectType, " is currently enrolled in a cadence, replace it with the new"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 180,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 179,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.infoBox,
      children: /* @__PURE__ */ _jsxDEV(Callout, {
        variant: "neutral",
        icon: "info",
        width: "100%",
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          children: ["You will start the ", props.cadenceName, " cadence for the ", props.objectCount, " ", pluralSobjectTypes[props.sobjectType], ".", props.syncMode === "syncAndStart" && ` If the ${pluralSobjectTypes[props.sobjectType]} are not synchronized with Bloobirds, they will be synced before starting the cadence.`, props.syncMode === "startOnly" && ` If the ${pluralSobjectTypes[props.sobjectType]} are not synchronized with Bloobirds, they will be skipped.`]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 193,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 192,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 191,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 94,
    columnNumber: 5
  }, this);
}
_c = StartCadenceSettings;
function ConfigureCadence({
  sobjectType,
  salesforceIds,
  isRecentList,
  onClose
}) {
  _s();
  const [syncMode, setSyncMode] = useState("syncAndStart");
  const [replaceCadence, setReplaceCadence] = useState("skip");
  const [selectedCadence, setSelectedCadence] = useState(null);
  const [showCadenceSelector, setShowCadenceSelector] = useState(false);
  const [createCompany, setCreateCompany] = useState(true);
  const [createLead, setCreateLead] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [, setInProgressBulkActions] = useRecoilState(inProgressBulkActionsState);
  const ref = useRef(null);
  useClickAway(ref, () => setShowCadenceSelector(false));
  const {
    useGetSettings: useGetSettings2
  } = useExtensionContext();
  const {
    t
  } = useTranslation();
  const searchParams = new URLSearchParams(window.location.search);
  const listId = searchParams.get("filterName");
  const [wholeList, setWholeList] = useState(false);
  const {
    createToast
  } = useToasts();
  const [loading, setLoading] = useState(false);
  const settings = useGetSettings2();
  const accountId = settings?.account?.id;
  const userId = settings?.user?.id;
  const {
    cadences
  } = useCadences({
    bobjectTypeName: sobjectToBobject[sobjectType],
    accountId
  });
  const enabledCadences = cadences?.filter((cadenceElement) => cadenceElement?.enabled);
  const {
    steps
  } = useCadenceSteps(selectedCadence);
  const [isStartCadenceWithDateTime, setIsStartCadenceWithDateTime] = useState(false);
  const isNotAllowedSobjectType = !allowedSobjectTypes?.includes(sobjectType);
  const relatedCompanyAllowed = relatedCompanySobjects?.includes(sobjectType);
  const relatedLeadAllowed = relatedLeadsSobjects?.includes(sobjectType);
  useEffect(() => {
    let showDateTime = false;
    steps?.forEach((step) => {
      if (step?.dayNumber === 0 && step.actionTypes.includes("AUTOMATED_EMAIL")) {
        showDateTime = step.automationSchedulingMode === "DELAY";
      }
    });
    setIsStartCadenceWithDateTime(showDateTime);
  }, [steps, selectedCadence]);
  const {
    data
  } = useSWR(wholeList && listId && listId !== "Recent" && "sync-sfdc-list-" + listId, () => api.get(`/utils/service/salesforce/total/${sobjectType}/${listId}`));
  const listSize = data?.data?.listSize || 0;
  const startCadenceText = salesforceIds?.length > 0 && !wholeList ? "You are about to start a cadence for " + salesforceIds.length + " " + pluralSobjectTypes[sobjectType] : "You are about to start a cadence for " + listSize + " " + pluralSobjectTypes[sobjectType] + " in this list";
  const cadenceName = enabledCadences?.find((cadence) => cadence.id === selectedCadence)?.name;
  const objectCount = salesforceIds?.length > 0 && !wholeList ? salesforceIds.length : listSize;
  const handleSync = async () => {
    if (!selectedCadence && !selectedDate) {
      createToast({
        message: `Please select a cadence and a date to start the cadence`,
        type: "error"
      });
      return;
    }
    setLoading(true);
    const body = {
      syncNewObjects: syncMode === "syncAndStart",
      startCadenceDate: selectedDate,
      cadenceId: selectedCadence,
      createRelatedCompany: relatedCompanyAllowed && createCompany,
      createRelatedLead: relatedLeadAllowed && createLead,
      skipEnrollIfObjectIsAlreadyOnCadence: replaceCadence === "skip"
    };
    const syncSelection = salesforceIds?.length > 0 && !wholeList;
    if (syncSelection) {
      body["salesforceIds"] = salesforceIds;
    }
    const response = await api.post(syncSelection ? `/utils/service/salesforce/sync/sobjects/${sobjectType}` : `/utils/service/salesforce/sync/list/${sobjectType}/${listId}`, body);
    if (response.status === 200) {
      createToast({
        message: `Your ${sobjectType}s are being synced!`,
        type: "success"
      });
      setInProgressBulkActions((prev) => [...prev, {
        uniqueNotificationId: response.data.uniqueNotificationId,
        name: t("extension.bulkActionsToast.startingListBulk"),
        status: "CREATING",
        owner: settings?.user?.id
      }]);
      onClose();
    } else {
      createToast({
        message: `There was an error syncing your ${sobjectType}. Please try again later!`,
        type: "error"
      });
    }
    setLoading(false);
  };
  const Actions = () => {
    if (salesforceIds?.length > 0 || wholeList && listSize > 0 && !isRecentList) {
      return /* @__PURE__ */ _jsxDEV(StartCadenceSettings, {
        showCadenceSelector,
        sobjectType,
        accountId,
        onCadenceSelected: (c) => {
          setSelectedCadence(c.id);
          setShowCadenceSelector(false);
        },
        onCreateAccountsClick: (c) => {
          setCreateCompany(c);
        },
        onCreateLeadsClick: (c) => {
          setCreateLead(c);
        },
        shouldCreateAccounts: createCompany,
        shouldCreateLeads: createLead,
        ref,
        userId,
        selectedCadence,
        onClick: () => setShowCadenceSelector(true),
        enabledCadences,
        date: selectedDate,
        withTimePicker: isStartCadenceWithDateTime,
        onChange: (date) => {
          setSelectedDate(date);
        },
        cadenceName,
        objectCount,
        syncMode,
        setSyncMode,
        startCadenceText,
        relatedCompanyAllowed,
        relatedLeadsAllowed: relatedLeadAllowed,
        setReplaceCadence,
        replaceCadence
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 333,
        columnNumber: 9
      }, this);
    }
    if (wholeList && listSize === 0 && !isRecentList) {
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.recently_viewed_content,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: ["There are no ", pluralSobjectTypes[sobjectType], " in this list. Change the filters and try to synchronize a list with objects."]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 375,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 374,
        columnNumber: 9
      }, this);
    }
    if (salesforceIds.length === 0 && !(wholeList || isRecentList)) {
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.recently_viewed_content,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: "There are no objects selected, do you want to synchronize all the objects of the list (this will use all the items of the list and not only the ones that are visible on the page)"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 386,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 385,
        columnNumber: 9
      }, this);
    }
    if (salesforceIds.length === 0 && isRecentList) {
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.recently_viewed_content,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: "You are attempting to start a cadence in objects from a recently viewed list."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 398,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: "Unfortunately, we are unable to start a cadence on the whole list unless you select some items from it. Try to select some items first or change the list."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 401,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 397,
        columnNumber: 9
      }, this);
    }
    return null;
  };
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(ModalContent, {
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.content,
        children: isNotAllowedSobjectType ? /* @__PURE__ */ _jsxDEV("div", {
          className: styles.content,
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles.errorMessage,
            children: [/* @__PURE__ */ _jsxDEV(Text, {
              size: "m",
              children: ["You are attempting to synchronize objects of the type \u2018", sobjectType, "\u2018. Unfortunately,"]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 420,
              columnNumber: 17
            }, this), /* @__PURE__ */ _jsxDEV(Text, {
              size: "m",
              children: ["we are unable to send these types of objects to Bloobirds via a list. Currently, we only support syncing ", /* @__PURE__ */ _jsxDEV("b", {
                children: "leads, contacts, accounts, and opportunities"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 426,
                columnNumber: 43
              }, this), " from Salesforce lists."]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 424,
              columnNumber: 17
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 418,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 417,
          columnNumber: 13
        }, this) : /* @__PURE__ */ _jsxDEV(Actions, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 432,
          columnNumber: 13
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 415,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 414,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(ModalFooter, {
      children: [/* @__PURE__ */ _jsxDEV(Button, {
        onClick: onClose,
        variant: "clear",
        children: "GO BACK"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 437,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.buttons,
        children: [!wholeList && !isRecentList && /* @__PURE__ */ _jsxDEV(Button, {
          disabled: loading,
          variant: "secondary",
          onClick: () => setWholeList(true),
          children: "SYNC WHOLE LIST"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 442,
          columnNumber: 13
        }, this), (salesforceIds.length > 0 && !wholeList || wholeList) && /* @__PURE__ */ _jsxDEV(Button, {
          disabled: loading || wholeList && listSize === 0 || !selectedCadence || !selectedDate,
          onClick: handleSync,
          children: loading ? /* @__PURE__ */ _jsxDEV(Spinner, {
            color: "white",
            name: "loadingCircle"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 453,
            columnNumber: 26
          }, this) : "Start cadences"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 447,
          columnNumber: 13
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 440,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 436,
      columnNumber: 7
    }, this)]
  }, void 0, true);
}
_s(ConfigureCadence, "+ujx1Ac6qQbfUb2VYLJNT1lday4=", false, function() {
  return [useRecoilState, useClickAway, useExtensionContext, useTranslation, useToasts, useGetSettings, useCadences, useCadenceSteps, useSWR];
});
_c2 = ConfigureCadence;
export function SyncCadencesModal({
  onClose,
  salesforceIds,
  isRecentList
}) {
  _s2();
  const [step] = useState("config");
  const {
    useGetCurrentPage
  } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const sobjectType = getSalesforceSobjectFromPage(currentPage);
  return /* @__PURE__ */ _jsxDEV(Modal, {
    open: true,
    onClose,
    width: 800,
    children: [/* @__PURE__ */ _jsxDEV(ModalHeader, {
      size: "small",
      children: [/* @__PURE__ */ _jsxDEV(ModalTitle, {
        variant: "primary",
        size: "small",
        icon: "bloobirds",
        children: ["Start a cadence for ", pluralSobjectTypes[sobjectType]]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 475,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(ModalCloseIcon, {
        onClick: onClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 478,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 474,
      columnNumber: 7
    }, this), step === "config" && /* @__PURE__ */ _jsxDEV(ConfigureCadence, {
      sobjectType,
      salesforceIds,
      isRecentList,
      onClose
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 481,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 473,
    columnNumber: 5
  }, this);
}
_s2(SyncCadencesModal, "vQ3Je0keRA5VS00a7wzbcF1vjJ0=", true, function() {
  return [useExtensionContext];
});
_c3 = SyncCadencesModal;
var _c, _c2, _c3;
$RefreshReg$(_c, "StartCadenceSettings");
$RefreshReg$(_c2, "ConfigureCadence");
$RefreshReg$(_c3, "SyncCadencesModal");
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

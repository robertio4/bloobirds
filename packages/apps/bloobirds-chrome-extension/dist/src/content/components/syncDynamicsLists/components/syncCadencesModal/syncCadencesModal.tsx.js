import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/syncDynamicsLists/components/syncCadencesModal/syncCadencesModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/syncDynamicsLists/components/syncCadencesModal/syncCadencesModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/syncDynamicsLists/components/syncCadencesModal/syncCadencesModal.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useClickAway } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import { CadencePreview, CadenceSelector, useCadences, useCadenceSteps } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-index.tsx.js";
import { Button, Callout, Checkbox, DateTimePicker, Item, Modal, ModalCloseIcon, ModalContent, ModalFooter, ModalHeader, ModalTitle, Select, Skeleton, Spinner, Text, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { getDynamicsEntityType } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import { inProgressBulkActionsState } from "/src/content/components/bulkActionsToasts/bulkActionsToasts.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { getDynamicsCheckedIds, getTotalObjectsInList, syncDynamicsList } from "/src/content/components/syncDynamicsLists/dynamicsListSelection.utils.ts.js";
import styles from "/src/content/components/syncDynamicsLists/components/syncCadencesModal/syncCadencesModal.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const pluralDObjectTypes = {
  lead: "leads",
  contact: "contacts",
  account: "accounts",
  opportunity: "opportunities"
};
const allowedDobjectTypes = ["account", "contact", "lead", "opportunity"];
const dObjectToBobject = {
  lead: "Lead",
  contact: "Lead",
  account: "Company",
  opportunity: "Opportunity"
};
function StartCadenceSettings(props) {
  return /* @__PURE__ */ _jsxDEV("div", {
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      size: "m",
      weight: "medium",
      children: props.startCadenceText
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 7
    }, this), props.showCadenceSelector && /* @__PURE__ */ _jsxDEV(CadenceSelector, {
      selectedBobject: {
        id: {
          typeName: dObjectToBobject[props.dObjectType],
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
      lineNumber: 94,
      columnNumber: 9
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.cadencePreview,
      children: /* @__PURE__ */ _jsxDEV(CadencePreview, {
        cadenceId: props?.selectedCadence,
        isChromeExtension: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 111,
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
          lineNumber: 122,
          columnNumber: 13
        }, this))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 115,
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
          lineNumber: 128,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 127,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.cadenceOptions,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        weight: "medium",
        children: "Cadence options"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 138,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.checkbox,
        children: /* @__PURE__ */ _jsxDEV(Checkbox, {
          size: "small",
          onClick: () => {
            props.setReplaceCadence(props.replaceCadence === "replace" ? "skip" : "replace");
          },
          checked: props.replaceCadence === "replace",
          children: ["If the ", props.dObjectType, " is currently enrolled in a cadence, replace it with the new"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 142,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 141,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.infoBox,
      children: /* @__PURE__ */ _jsxDEV(Callout, {
        variant: "neutral",
        icon: "info",
        width: "100%",
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          children: ["You will start the ", props.cadenceName, " cadence for the ", props.objectCount, " ", pluralDObjectTypes[props.dObjectType], ".", props.syncMode === "syncAndStart" && ` If the ${pluralDObjectTypes[props.dObjectType]} are not synchronized with Bloobirds, they will be synced before starting the cadence.`, props.syncMode === "startOnly" && ` If the ${pluralDObjectTypes[props.dObjectType]} are not synchronized with Bloobirds, they will be skipped.`]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 155,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 154,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 153,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 89,
    columnNumber: 5
  }, this);
}
_c = StartCadenceSettings;
function ConfigureCadence({
  objectType,
  onClose
}) {
  _s();
  const [syncMode, setSyncMode] = useState("syncAndStart");
  const [replaceCadence, setReplaceCadence] = useState("skip");
  const [selectedCadence, setSelectedCadence] = useState(null);
  const [showCadenceSelector, setShowCadenceSelector] = useState(false);
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
  const listId = searchParams.get("viewid");
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
    bobjectTypeName: dObjectToBobject[objectType],
    accountId
  });
  const enabledCadences = cadences?.filter((cadenceElement) => cadenceElement?.enabled);
  const {
    steps
  } = useCadenceSteps(selectedCadence);
  const [isStartCadenceWithDateTime, setIsStartCadenceWithDateTime] = useState(false);
  const isNotAllowedSobjectType = !allowedDobjectTypes?.includes(objectType);
  const handleSelectCadence = (cadence) => {
    let showDateTime = false;
    steps?.forEach((step) => {
      if (step?.dayNumber === 0 && step.actionTypes.includes("AUTOMATED_EMAIL")) {
        showDateTime = step.automationSchedulingMode === "DELAY";
      }
    });
    setIsStartCadenceWithDateTime(showDateTime);
    setSelectedCadence(cadence.id);
    setShowCadenceSelector(false);
  };
  const {
    total: listSize,
    isLoading: isTotalLoading
  } = getTotalObjectsInList(listId, objectType, wholeList);
  const dynamicsIds = getDynamicsCheckedIds();
  const startCadenceText = dynamicsIds?.size > 0 && !wholeList ? "You are about to start a cadence for " + dynamicsIds.size + " " + pluralDObjectTypes[objectType] : "You are about to start a cadence for " + listSize + " " + pluralDObjectTypes[objectType] + " in this list";
  const cadenceName = enabledCadences?.find((cadence) => cadence.id === selectedCadence)?.name;
  const objectCount = dynamicsIds?.size > 0 && !wholeList ? dynamicsIds.size : listSize;
  const handleSync = async () => {
    if (!selectedCadence && !selectedDate) {
      createToast({
        message: `Please select a cadence and a date to start the cadence`,
        type: "error"
      });
      return;
    }
    setLoading(true);
    const response = await syncDynamicsList({
      selectedDate,
      selectedCadence,
      objectType,
      replaceCadence,
      wholeList,
      listId,
      dynamicsIds
    });
    if (response.status === 200) {
      createToast({
        message: `Your ${objectType}s are being synced!`,
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
        message: `There was an error syncing your ${objectType}. Please try again later!`,
        type: "error"
      });
    }
    setLoading(false);
  };
  const Actions = () => {
    if (isTotalLoading) {
      return /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV(Skeleton, {
          variant: "text",
          height: 25,
          width: "100%"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 285,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(Skeleton, {
          variant: "text",
          height: 66,
          width: "100%"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 286,
          columnNumber: 11
        }, this)]
      }, void 0, true);
    }
    if (dynamicsIds?.size > 0 || wholeList && listSize > 0) {
      return /* @__PURE__ */ _jsxDEV(StartCadenceSettings, {
        showCadenceSelector,
        dObjectType: objectType,
        accountId,
        onCadenceSelected: handleSelectCadence,
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
        setReplaceCadence,
        replaceCadence
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 293,
        columnNumber: 9
      }, this);
    }
    if (wholeList && listSize === 0) {
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.recently_viewed_content,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: ["There are no ", pluralDObjectTypes[objectType], " in this list. Change the filters and try to synchronize a list with objects."]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 322,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 321,
        columnNumber: 9
      }, this);
    }
    if (dynamicsIds.size === 0 && !wholeList) {
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.recently_viewed_content,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: "There are no objects selected. Please select at least one object to start a cadence."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 333,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 332,
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
              children: ["You are attempting to synchronize objects of the type \u2018", objectType, "\u2018. Unfortunately,"]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 351,
              columnNumber: 17
            }, this), /* @__PURE__ */ _jsxDEV(Text, {
              size: "m",
              children: ["we are unable to send these types of objects to Bloobirds via a list. Currently, we only support syncing ", /* @__PURE__ */ _jsxDEV("b", {
                children: "leads, contacts, accounts, and opportunities"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 357,
                columnNumber: 43
              }, this), " from Dynamics lists."]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 355,
              columnNumber: 17
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 349,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 348,
          columnNumber: 13
        }, this) : /* @__PURE__ */ _jsxDEV(Actions, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 363,
          columnNumber: 13
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 346,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 345,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(ModalFooter, {
      children: [/* @__PURE__ */ _jsxDEV(Button, {
        onClick: onClose,
        variant: "clear",
        children: "GO BACK"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 368,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.buttons,
        children: (dynamicsIds.size > 0 && !wholeList || wholeList) && /* @__PURE__ */ _jsxDEV(Button, {
          disabled: loading || wholeList && listSize === 0 || !selectedCadence || !selectedDate,
          onClick: handleSync,
          children: loading ? /* @__PURE__ */ _jsxDEV(Spinner, {
            color: "white",
            name: "loadingCircle"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 384,
            columnNumber: 26
          }, this) : "Start cadences"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 378,
          columnNumber: 13
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 371,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 367,
      columnNumber: 7
    }, this)]
  }, void 0, true);
}
_s(ConfigureCadence, "4ATGXYqng+sBNQrAr+pjWpKsK8o=", false, function() {
  return [useRecoilState, useClickAway, useExtensionContext, useTranslation, useToasts, useGetSettings, useCadences, useCadenceSteps];
});
_c2 = ConfigureCadence;
export function SyncCadencesModal({
  onClose
}) {
  _s2();
  const [step] = useState("config");
  const {
    useGetCurrentPage
  } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const objectType = getDynamicsEntityType(currentPage);
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
        children: ["Start a cadence for ", pluralDObjectTypes[objectType]]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 402,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(ModalCloseIcon, {
        onClick: onClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 405,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 401,
      columnNumber: 7
    }, this), step === "config" && /* @__PURE__ */ _jsxDEV(ConfigureCadence, {
      objectType,
      onClose
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 407,
      columnNumber: 29
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 400,
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

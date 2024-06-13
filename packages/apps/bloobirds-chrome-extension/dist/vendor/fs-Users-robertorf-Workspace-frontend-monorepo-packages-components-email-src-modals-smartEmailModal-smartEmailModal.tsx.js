import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailModal.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const createContext = __vite__cjsImport2_react["createContext"]; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useActiveUserSettings, useBaseResetEmailVariablesValues, useBaseSetEmailVariablesValues, useSnippetsEnabled, useTimeSlotsEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { useSnippets } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-dist-index.js.js";
import { BobjectTypes, PlaybookTab, SmartEmailTab, COMPANY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, EMAIL_MODE, getTextFromLogicRole, getUserTimeZone } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useSimilarDeals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-hooks-useSimilarDeals.ts.js";
import { SmartEmailModalComponent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.view.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
async function fillVariables(bobject, setEmailVariablesValue) {
  const {
    data
  } = await api.get(`/bobjects/${bobject?.id?.value}/form?injectReferences=true`);
  let companyReferenceBobject;
  if (bobject?.bobjectType === BobjectTypes.Lead || bobject?.bobjectType === BobjectTypes.Opportunity) {
    for (const key in data?.referencedBobjects) {
      if (key.indexOf(BobjectTypes.Company) !== -1) {
        companyReferenceBobject = data?.referencedBobjects[key];
      }
    }
  }
  const bobjectType = bobject?.bobjectType?.toLowerCase();
  setEmailVariablesValue({
    company: companyReferenceBobject?.raw?.contents,
    [bobjectType]: data?.raw?.contents
  });
}
const getLeadName = ({
  isLead,
  activeBobject,
  lead,
  isExtension
}) => {
  if (isLead) {
    return isExtension ? activeBobject.fullName : getTextFromLogicRole(activeBobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  } else {
    return getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  }
};
const useRefreshEmailVariables = (relatedBobjectInfo) => {
  _s();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const [previousBobject, setPreviousBobject] = useState(relatedBobjectInfo?.activeBobject?.id?.value);
  const resetEmailVariablesValue = useBaseResetEmailVariablesValues();
  useEffect(() => {
    if (previousBobject !== relatedBobjectInfo?.activeBobject?.id?.value) {
      if (relatedBobjectInfo?.activeBobject) {
        fillVariables(relatedBobjectInfo?.activeBobject, setEmailVariablesValue);
        setPreviousBobject(relatedBobjectInfo?.activeBobject?.id?.value);
      } else {
        resetEmailVariablesValue();
        setPreviousBobject(null);
      }
    }
  }, [relatedBobjectInfo?.activeBobject]);
};
_s(useRefreshEmailVariables, "XpL8sxRBDniFtf/Lurl9kjmyNYw=", false, function() {
  return [useBaseSetEmailVariablesValues, useBaseResetEmailVariablesValues];
});
const SmartEmailModalContext = createContext(null);
function updateIndex(count, editorsStored, length) {
  if (!editorsStored)
    return count === 0 ? 1 : 0;
  return count === length - 1 ? 0 : count + 1;
}
const SmartEmailModalProvider = ({
  children,
  bobjectsInfo,
  accountId,
  dataModel,
  ...props
}) => {
  _s2();
  const focusedRef = useRef(0);
  const isLead = bobjectsInfo?.activeBobject?.id.typeName === BobjectTypes.Lead;
  const leadToSet = isLead ? bobjectsInfo?.activeBobject?.id?.value : !isLead && bobjectsInfo?.lead?.id?.value;
  const [filters, setFilters] = useState({
    type: [],
    lead: leadToSet ? [leadToSet] : [],
    user: []
  });
  const {
    settings
  } = useActiveUserSettings();
  const accountName = settings?.account?.name;
  const [relatedBobjectsInfo, updateRelatedBobjectsInfo] = useState(bobjectsInfo);
  const similarDealsHook = useSimilarDeals(accountId, relatedBobjectsInfo.company?.id.objectId);
  const [selectedTab, setSelectedTab] = useState(props?.mode === EMAIL_MODE.REPLY ? SmartEmailTab.PAST_ACTIVITY : SmartEmailTab.TEMPLATES);
  const [playbookTab, setPlaybookTab] = useState(PlaybookTab.EMAILS);
  const [replaceEmailBodyWithTemplate, setReplaceEmailBodyWithTemplate] = useState();
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [taskTitle, setTaskTitle] = useState();
  const [newLeadInfo, setNewLeadInfo] = useState();
  const [leadCreatedCallback, setLeadCreatedCallback] = useState();
  const [selectedActivity, setSelectedActivity] = useState();
  const hasSnippetsEnabled = useSnippetsEnabled(accountId);
  const hasTimeSlotsEnabled = useTimeSlotsEnabled(accountId);
  const {
    snippets,
    mutate
  } = useSnippets();
  const [editorsStored, setEditorsStored] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const {
    t
  } = useTranslation();
  const companyName = props.isExtension ? relatedBobjectsInfo?.company?.name : getTextFromLogicRole(relatedBobjectsInfo?.company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const leadName = !companyName && getLeadName({
    activeBobject: bobjectsInfo.activeBobject,
    lead: relatedBobjectsInfo.lead,
    isLead,
    isExtension: props.isExtension
  });
  const [slotsData, setSlotsData] = useState({
    calendarSlotsVisible: false,
    calendarSlots: [],
    selectedTimezone: getUserTimeZone(),
    meetingTitle: companyName || leadName ? `${companyName ?? leadName} <> ${accountName}` : t("smartEmailModal.untitledMeeting")
  });
  const editorsRef = useRef();
  function storeEditorRef(editor) {
    if (editorsStored || editorsRef?.current?.some((storedEditor) => storedEditor?.id === editor.id))
      return;
    if (editor.id === "shortcutInput") {
      const newArray = [...editorsRef.current || []];
      newArray.splice(3, 0, editor);
      editorsRef.current = newArray;
      return;
    }
    editorsRef.current = [...editorsRef.current || [], editor];
    if (editorsRef.current.length > 3) {
      setEditorsStored(true);
    }
  }
  useRefreshEmailVariables(relatedBobjectsInfo);
  const updateFocusedIndex = () => {
    focusedRef.current = updateIndex(focusedRef.current, editorsStored, editorsRef.current?.length);
  };
  return /* @__PURE__ */ _jsxDEV(SmartEmailModalContext.Provider, {
    value: {
      editorsStored,
      editorsRef,
      storeEditorRef,
      focusedRef,
      updateFocusedIndex,
      hasSnippetsEnabled,
      hasTimeSlotsEnabled,
      filters,
      setFilters,
      ...props,
      selectedTab,
      tooltipVisible,
      setTooltipVisible,
      snippets,
      mutateSnippets: mutate,
      setSelectedTab,
      slotsData,
      setSlotsData,
      playbookTab,
      setPlaybookTab,
      dataModel,
      similarDealsHook,
      accountId,
      contactBobject: bobjectsInfo?.activeBobject,
      ...relatedBobjectsInfo,
      setRelatedBobjectsInfo: (value) => {
        updateRelatedBobjectsInfo((prevState) => ({
          ...prevState,
          ...value
        }));
      },
      resetBobjectEnvironment: () => updateRelatedBobjectsInfo({
        activeBobject: void 0,
        company: void 0,
        leads: void 0,
        opportunity: void 0,
        pageBobjectType: void 0
      }),
      replaceEmailBodyWithTemplate,
      updateReplaceMethod: (method) => {
        setReplaceEmailBodyWithTemplate(() => method);
      },
      selectedTemplate,
      setSelectedTemplate: (value) => {
        setSelectedTemplate(value);
        if (!value) {
          setEditorsStored(false);
          editorsRef.current = editorsRef.current.slice(0, 1);
          focusedRef.current = 0;
        }
      },
      setTaskTitle,
      taskTitle,
      newLeadInfo,
      setNewLeadInfo,
      leadCreatedCallback,
      setLeadCreatedCallback,
      selectedActivity,
      setSelectedActivity
    },
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 198,
    columnNumber: 5
  }, void 0);
};
_s2(SmartEmailModalProvider, "OsMf5EafMYAVmLeDlOfIMgfJVa4=", false, function() {
  return [useActiveUserSettings, useSimilarDeals, useSnippetsEnabled, useTimeSlotsEnabled, useSnippets, useTranslation, useRefreshEmailVariables];
});
_c = SmartEmailModalProvider;
export const useSmartEmailModal = () => {
  _s3();
  const context = useContext(SmartEmailModalContext);
  if (context === void 0) {
    throw new Error("useSmartEmailModal must be used within the modal provider");
  }
  return context;
};
_s3(useSmartEmailModal, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const withProvider = (Component) => ({
  handleRedirect,
  scheduleEmailRedirect,
  emailSettingsRedirect,
  targetMarkets,
  idealCustomerProfiles,
  ...providerProps
}) => {
  return /* @__PURE__ */ _jsxDEV(SmartEmailModalProvider, {
    ...providerProps,
    children: /* @__PURE__ */ _jsxDEV(Component, {
      handleRedirect,
      scheduleEmailRedirect,
      emailSettingsRedirect,
      targetMarkets,
      idealCustomerProfiles,
      isExtension: providerProps.isExtension,
      userSettings: providerProps.userSettings
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 297,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 296,
    columnNumber: 5
  }, void 0);
};
export const SmartEmailModal = withProvider(SmartEmailModalComponent);
_c2 = SmartEmailModal;
var _c, _c2;
$RefreshReg$(_c, "SmartEmailModalProvider");
$RefreshReg$(_c2, "SmartEmailModal");
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

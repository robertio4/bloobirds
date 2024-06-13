import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useState = __vite__cjsImport2_react["useState"];
import { FIELDS_LOGIC_ROLE, PluralBobjectTypes, SalesforceTabs, SingularFromPluralBobjectTypes, MessagesEvents, ACTIVITY_FIELDS_LOGIC_ROLE, TASK_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { tabBobjectType } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport5_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport5_mixpanelBrowser.__esModule ? __vite__cjsImport5_mixpanelBrowser.default : __vite__cjsImport5_mixpanelBrowser;
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const SubhomeContext = React.createContext(null);
export const useSubhomeContext = () => {
  _s();
  const context = React.useContext(SubhomeContext);
  if (!context) {
    throw new Error("useSubhome must be used within a Subhome");
  }
  return context;
};
_s(useSubhomeContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const modalInfoDefaultState = {
  openedModal: void 0,
  bobject: void 0,
  referencedBobject: void 0
};
const TaskTypeTabs = [SalesforceTabs.TASKS, SalesforceTabs.NURTURING, SalesforceTabs.OUTBOX];
const ActivityTypeTabs = [SalesforceTabs.INBOX, SalesforceTabs.MEETINGS];
const SubhomeLayout = ({
  children,
  defaultTab,
  defaultSubhomeTab = PluralBobjectTypes.Company
}) => {
  _s2();
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const [selectedSubhomeTab, setSelectedSubhomeTab] = useState(defaultSubhomeTab);
  const [showStats, setShowStats] = useState(true);
  const [sort, setSort] = useState();
  const [query, setQuery] = useState({});
  const [subquery, setSubquery] = useState();
  const [openedModalInfo, setOpenedModalInfo] = useState(modalInfoDefaultState);
  const [stage, setStage] = useState("ALL");
  const [selectedQuickFilter, setSelectedQuickFilter] = useState();
  const [haveFiltersBeenChanged, setHaveFiltersBeenChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectAllChecked, setSelectAllChecked] = useState(false);
  const [useEveryBobject, setUseEveryBobject] = useState({
    isActive: false,
    total: 0,
    query
  });
  const {
    useGetSettings,
    useGetDataModel
  } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const defaultQuery = useMemo(() => {
    const bobjectType = SingularFromPluralBobjectTypes[selectedSubhomeTab];
    const assignedToField = dataModel.findFieldByLogicRole(FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO);
    const activityAssignedToField = dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.USER);
    const taskAssignedToField = dataModel.findFieldByLogicRole(TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
    if (TaskTypeTabs.includes(selectedTab)) {
      return {
        [taskAssignedToField?.id]: [userId]
      };
    } else if (ActivityTypeTabs.includes(selectedTab)) {
      return {
        [activityAssignedToField?.id]: [userId]
      };
    } else {
      return {
        [assignedToField?.id]: [userId]
      };
    }
  }, [selectedSubhomeTab]);
  const selectOneItem = (item) => {
    const exists = selectedItems.some((selectedItem) => selectedItem?.id.objectId === item?.id.objectId);
    let newSelectedItems = [...selectedItems];
    if (exists) {
      newSelectedItems = newSelectedItems.filter((selectedItem) => selectedItem?.id.objectId !== item?.id.objectId);
    } else {
      newSelectedItems = [...newSelectedItems, item];
    }
    setSelectedItems(newSelectedItems);
    setUseEveryBobject({
      isActive: false
    });
  };
  const resetSelectedItems = () => {
    setSelectedItems([]);
    setUseEveryBobject({
      isActive: false
    });
  };
  const handleModalSave = () => {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
      detail: {
        type: selectedItems[0]?.id?.typeName
      }
    }));
    resetSelectedItems();
  };
  const handleModalClose = () => {
    setOpenedModalInfo(modalInfoDefaultState);
    resetSelectedItems();
  };
  useEffect(() => {
    setSelectedSubhomeTab(defaultSubhomeTab);
  }, [defaultSubhomeTab]);
  useEffect(() => {
    setSelectedItems([]);
    setUseEveryBobject({
      isActive: false
    });
  }, [selectedSubhomeTab]);
  return /* @__PURE__ */ _jsxDEV(SubhomeContext.Provider, {
    value: {
      openedModalInfo,
      setOpenedModalInfo,
      resetOpenedModalInfo: () => setOpenedModalInfo(modalInfoDefaultState),
      selectedTab,
      setSelectedTab,
      selectedSubhomeTab,
      setSelectedSubhomeTab,
      showStats,
      toggleStats: () => setShowStats(!showStats),
      selectedItems,
      setSelectedItems,
      isSelectAllChecked,
      setSelectAllChecked,
      toggleSelectAll: (value) => {
        setSelectAllChecked(value);
      },
      selectOneItem,
      useEveryBobject,
      setUseEveryBobject,
      sort,
      setSort,
      query,
      setQuery: (value) => {
        mixpanel.track(`CLICKED_FILTER_IN_TAB_${selectedTab?.toUpperCase()}` + (selectedTab === SalesforceTabs.PIPELINE ? `_AND_SUBTAB_${selectedSubhomeTab?.toUpperCase()}` : ""));
        setQuery({
          ...defaultQuery,
          ...value
        });
        setUseEveryBobject({
          ...useEveryBobject,
          ...{
            query: {
              ...defaultQuery,
              ...value
            }
          }
        });
      },
      subquery,
      setSubquery,
      stage,
      setStage,
      tabBobject: tabBobjectType(selectedSubhomeTab),
      selectedQuickFilter,
      setSelectedQuickFilter: (qf) => {
        setSelectedQuickFilter(qf);
        setHaveFiltersBeenChanged(true);
      },
      haveFiltersBeenChanged,
      setHaveFiltersBeenChanged,
      isLoading,
      setIsLoading,
      handleModalClose,
      handleModalSave
    },
    children: /* @__PURE__ */ _jsxDEV("div", {
      style: {
        width: "100%"
      },
      children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 193,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 141,
    columnNumber: 5
  }, void 0);
};
_s2(SubhomeLayout, "M8rfIB7RiVYEIHPm2V5zvKRUQlc=", true, function() {
  return [useExtensionContext];
});
_c = SubhomeLayout;
export default SubhomeLayout;
var _c;
$RefreshReg$(_c, "SubhomeLayout");
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

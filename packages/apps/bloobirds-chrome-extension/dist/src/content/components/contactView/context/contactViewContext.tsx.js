import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/context/contactViewContext.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/context/contactViewContext.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/context/contactViewContext.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const createContext = __vite__cjsImport2_react["createContext"]; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useLayoutEffect = __vite__cjsImport2_react["useLayoutEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useActiveUserSettings, useSessionStorage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { UserRole, UserPermission, SessionStorageKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { Actions } from "/src/types/messages.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const Context = createContext(null);
function ContactViewProvider({
  defaultContext,
  children
}) {
  _s();
  const [activeTab, setActiveTab] = useState(defaultContext?.activeTab);
  const [activeSubTab, setActiveSubTab] = useState(defaultContext?.activeSubTab);
  const {
    useGetActiveBobject: useGetActiveBobject2,
    setActiveBobject,
    history,
    setHistory
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject2();
  const {
    getGoBack,
    setShowBackButton,
    setGoBack
  } = useFloatingMenuContext();
  const goBack = getGoBack();
  const {
    settings
  } = useActiveUserSettings();
  const userId = settings?.user?.id;
  const userRoles = settings?.user?.roles;
  const userPermissions = settings?.user?.permissions;
  const isAdminUser = userRoles?.includes(UserRole.GLOBAL_ADMIN) || userRoles?.includes(UserRole.ACCOUNT_ADMIN);
  const hasEditAllPermissions = userPermissions?.includes(UserPermission.EDIT_ALL);
  const [actionsDisabled, setActionsDisabled] = useState(false);
  const {
    set
  } = useSessionStorage();
  const value = {
    activeTab,
    setActiveTab,
    activeSubTab,
    setActiveSubTab,
    actionsDisabled
  };
  useEffect(() => {
    setActionsDisabled(!isAdminUser && !hasEditAllPermissions && (userId !== activeBobject?.assignedTo || !activeBobject?.assignedTo));
  }, [userRoles, userPermissions, activeBobject?.assignedTo]);
  useEffect(() => {
    chrome.runtime?.onMessage.addListener((message) => {
      if (message.type === Actions.HistoryUpdate) {
        setShowBackButton(false);
      }
    });
  }, []);
  useEffect(() => {
    setShowBackButton(history.length > 1);
  }, [history]);
  useLayoutEffect(() => {
    setHistory([]);
  }, []);
  useEffect(() => {
    const oldContext = {
      activeTab,
      activeBobject,
      activeSubTab
    };
    if (history.length === 0 && activeBobject) {
      setHistory([...history, oldContext]);
    } else if (history.length > 0) {
      const {
        activeTab: lastActiveTab,
        activeBobject: lastActiveBobject,
        activeSubTab: lastActiveSubTab
      } = history[history.length - 1];
      if ((lastActiveTab !== activeTab || lastActiveSubTab !== activeSubTab || lastActiveBobject?.id?.value !== activeBobject?.id?.value) && activeBobject && activeBobject.id.typeName === activeTab) {
        setHistory([oldContext, ...history]);
      }
    }
  }, [activeTab, activeBobject, activeSubTab]);
  useEffect(() => {
    if (history.length > 1 && goBack) {
      const lastPage = history.pop();
      setHistory([...history]);
      if (lastPage?.activeBobject?.id?.value) {
        setActiveBobject(lastPage.activeBobject);
      }
      if (lastPage?.activeSubTab) {
        setActiveSubTab(lastPage.activeSubTab);
      }
      if (lastPage?.activeTab) {
        setActiveTab(lastPage.activeTab);
      }
      setGoBack(void 0);
    }
  }, [goBack]);
  useEffect(() => {
    set(SessionStorageKeys.ActiveTab, `${activeTab}`);
    set(SessionStorageKeys.ActiveSubTab, `${activeSubTab}`);
  }, [activeTab, activeSubTab]);
  return /* @__PURE__ */ _jsxDEV(Context.Provider, {
    value,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 124,
    columnNumber: 10
  }, this);
}
_s(ContactViewProvider, "V3HRapO32RIH0esBrj4LsT3SLHg=", false, function() {
  return [useExtensionContext, useGetActiveBobject, useFloatingMenuContext, useActiveUserSettings, useSessionStorage];
});
_c = ContactViewProvider;
function useContactViewContext() {
  _s2();
  const context = useContext(Context);
  if (!context) {
    throw new Error("useContactViewContext must be used within a ContactViewProvider");
  }
  return context;
}
_s2(useContactViewContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
export { ContactViewProvider, useContactViewContext };
var _c;
$RefreshReg$(_c, "ContactViewProvider");
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

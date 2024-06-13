import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/context.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/context.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/context.tsx", _s = $RefreshSig$(), _s24 = $RefreshSig$(), _s25 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const createContext = __vite__cjsImport2_react["createContext"]; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"];
import { useLazyRef, useSessionStorage, useUserHelpers, useLocalStorage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, ExtensionHelperKeys, MessagesEvents, SessionStorageKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getPluralBobjectName, injectReferencesGetProcess } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport6_useSyncExternalStore_shim from "/vendor/.vite-deps-use-sync-external-store_shim.js__v--03bee27d.js"; const useSyncExternalStore = __vite__cjsImport6_useSyncExternalStore_shim["useSyncExternalStore"];
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const ExtensionContext = createContext(null);
function useExtensionContextStore() {
  _s();
  const context = useContext(ExtensionContext);
  if (context === void 0) {
    throw new Error("useExtensionContext must be used within a ExtensionProvider");
  }
  return context;
}
_s(useExtensionContextStore, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function useExtensionContext() {
  _s24();
  var _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$(), _s5 = $RefreshSig$(), _s6 = $RefreshSig$(), _s7 = $RefreshSig$(), _s8 = $RefreshSig$(), _s9 = $RefreshSig$(), _s10 = $RefreshSig$(), _s11 = $RefreshSig$(), _s12 = $RefreshSig$(), _s13 = $RefreshSig$(), _s14 = $RefreshSig$(), _s15 = $RefreshSig$(), _s16 = $RefreshSig$(), _s17 = $RefreshSig$(), _s18 = $RefreshSig$(), _s19 = $RefreshSig$(), _s20 = $RefreshSig$(), _s21 = $RefreshSig$(), _s22 = $RefreshSig$(), _s23 = $RefreshSig$();
  const store = useExtensionContextStore();
  const {
    set
  } = useSessionStorage();
  const {
    set: setLocal
  } = useLocalStorage();
  const {
    has,
    save,
    reset
  } = useUserHelpers();
  function useGetExtensionContext2(selector) {
    _s2();
    const cb = () => selector(store.snapshot());
    return useSyncExternalStore(store.subscribe, cb, cb);
  }
  _s2(useGetExtensionContext2, "FpwL93IKMLJZuQQXefVtWynbBPQ=", false, function() {
    return [useSyncExternalStore];
  });
  const closeExtendedScreen = () => {
    store.setState("extendedContext", {
      open: false
    });
  };
  const setNoMatchFound = (noMatchFound) => {
    closeExtendedScreen();
    store.setState("noMatchFound", null);
    store.setState("noMatchFound", noMatchFound);
  };
  const setContactViewBobjectId = (id) => {
    setNoMatchFound(null);
    store.setState("duplicatesDetected", false);
    const activeBobject = store.snapshot().activeBobject;
    store.setState("activeTab", null);
    setIsSettings(false);
    if (id === null) {
      store.setState("activeBobject", null);
      store.setState("contactViewBobjectId", id);
    } else if (id !== activeBobject?.id?.value) {
      const bobjectId = id;
      const bobjectType = bobjectId?.split("/")?.[1];
      const objectId = bobjectId?.split("/")?.[2];
      const pluralBobjectType = getPluralBobjectName(bobjectType, 2);
      if (pluralBobjectType) {
        store.setState("loading", true);
        api.get(`/linkedin/${pluralBobjectType?.toLowerCase()}/${objectId}`).then((data) => {
          const bobject = data?.data;
          if (bobject?.id?.value) {
            store.setState("activeBobject", bobject);
            store.setState("contactViewBobjectId", id);
            api.get(`/linkedin/context/${bobjectType}/${objectId}`).then((data2) => {
              const activeBobjectContext = data2?.data;
              const currentActiveBobject = store.snapshot().activeBobject;
              const currentActiveBobjectContext = store.snapshot().activeBobjectContext;
              if (activeBobjectContext) {
                if (currentActiveBobjectContext && currentActiveBobject && activeBobjectContext?.bobjectIds?.length > 0 && !activeBobjectContext?.bobjectIds?.includes(currentActiveBobject?.id?.value)) {
                  store.setState("loading", false);
                  return;
                }
                store.setState("activeBobjectContext", activeBobjectContext);
                store.setState("loading", false);
                window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension));
              }
            });
          }
        });
      }
    }
  };
  const refreshActiveBobjectContext = () => {
    const activeBobject = store.snapshot().activeBobject;
    if (activeBobject) {
      const bobjectType = activeBobject?.id?.typeName;
      const objectId = activeBobject?.id?.objectId;
      api.get(`/linkedin/context/${bobjectType}/${objectId}`).then((data) => {
        const activeBobjectContext = data?.data;
        const currentActiveBobject = store.snapshot().activeBobject;
        const currentActiveBobjectContext = store.snapshot().activeBobjectContext;
        if (activeBobjectContext) {
          if (currentActiveBobjectContext && currentActiveBobject && activeBobjectContext?.bobjectIds?.length > 0 && !activeBobjectContext?.bobjectIds?.includes(currentActiveBobject?.id?.value)) {
            store.setState("loading", false);
            return;
          }
          store.setState("activeBobjectContext", activeBobjectContext);
        }
      });
    }
  };
  const launchBobjectSideEffects = (bobjectType) => {
    const listeners = store.snapshot().activeBobjectListeners;
    if (listeners[bobjectType]) {
      listeners[bobjectType].forEach((cb) => cb());
    }
  };
  const refreshExtendedScreenBobject = () => {
    const currentExtendedContext = store.snapshot().extendedContext;
    if (currentExtendedContext?.bobject?.id?.value) {
      api.get(`/bobjects/${currentExtendedContext?.bobject?.id?.value}/form?injectReferences=true`).then((data) => {
        const bobject = injectReferencesGetProcess(data?.data);
        if (bobject) {
          store.setState("extendedContext", {
            ...currentExtendedContext,
            bobject
          });
        }
      });
    }
  };
  const setActiveBobject = (activeBobject, activeTab, uploadContext = true) => {
    store.setState("activeBobject", activeBobject);
    store.setState("activeTab", activeTab);
    if (activeBobject && uploadContext) {
      store.setState("activeBobjectContext", null);
      api.get(`/linkedin/context/${activeBobject?.id?.typeName}/${activeBobject?.id?.objectId}`).then((data) => {
        const activeBobjectContext = data?.data;
        const currentActiveBobject = store.snapshot().activeBobject;
        const currentActiveBobjectContext = store.snapshot().activeBobjectContext;
        if (activeBobjectContext) {
          if (currentActiveBobject && currentActiveBobjectContext && activeBobjectContext?.bobjectIds?.length > 0 && !activeBobjectContext?.bobjectIds?.includes(currentActiveBobject?.id?.value)) {
            return;
          }
          store.setState("activeBobjectContext", activeBobjectContext);
        } else {
          store.setState("activeBobjectContext", null);
        }
      });
    }
  };
  const updateActiveBobject = (bobject) => {
    const activeBobject = store.snapshot().activeBobject;
    if (activeBobject?.id?.value === bobject?.id?.value) {
      const uploadContext = false;
      setActiveBobject(bobject, null, uploadContext);
      launchBobjectSideEffects(bobject?.id?.typeName);
      launchBobjectSideEffects(BobjectTypes.Task);
      launchBobjectSideEffects(BobjectTypes.Activity);
    }
  };
  const setSidePeekEnabled = (enabled) => {
    store.setState("sidePeekEnabled", enabled);
    if (enabled) {
      setLocal(ExtensionHelperKeys.SIDEPEEK_DISABLED, false);
      reset(ExtensionHelperKeys.SIDEPEEK_DISABLED);
    } else {
      setLocal(ExtensionHelperKeys.SIDEPEEK_DISABLED, true);
      save(ExtensionHelperKeys.SIDEPEEK_DISABLED);
    }
  };
  const setIsSettings = (isSettings) => {
    store.setState("isSettings", isSettings);
    set(SessionStorageKeys.IsSettings, isSettings);
  };
  const setExtendedContext = (newExtendedContext) => {
    const extendedContext = store.snapshot().extendedContext;
    if (newExtendedContext === null || newExtendedContext.bobject === null || extendedContext?.bobject?.id?.value && extendedContext?.bobject?.id?.value === newExtendedContext?.bobject?.id?.value || extendedContext?.template?.id && extendedContext?.template?.id === newExtendedContext?.template?.id) {
      store.setState("extendedContext", {
        open: false
      });
    } else {
      store.setState("extendedContext", {
        ...newExtendedContext,
        open: true
      });
    }
  };
  const setCurrentTask = (task) => store.setState("currentTask", task);
  const setCustomPage = (customPage) => store.setState("customPage", customPage);
  const setDuplicatesDetected = (duplicatesDetected) => store.setState("duplicatesDetected", duplicatesDetected);
  return {
    useGetExtensionContext: useGetExtensionContext2,
    useGetCurrentPage: _s3(() => {
      _s3();
      return useGetExtensionContext2((state) => state.currentPage);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    setCurrentPage: (currentPage) => store.setState("currentPage", currentPage),
    useGetLoggedIn: _s4(() => {
      _s4();
      return useGetExtensionContext2((state) => state.loggedIn);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    setLoggedIn: (loggedIn) => store.setState("loggedIn", loggedIn),
    useGetDataModel: _s5(() => {
      _s5();
      return useGetExtensionContext2((state) => state.dataModel);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    useGetSettings: _s6(() => {
      _s6();
      return useGetExtensionContext2((state) => state.settings);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    updateSettings: (settings) => store.setState("settings", settings),
    useGetContactViewBobjectId: _s7(() => {
      _s7();
      return useGetExtensionContext2((state) => state.contactViewBobjectId);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    useGetActiveBobject: _s8(() => {
      _s8();
      return useGetExtensionContext2((state) => state.activeBobject);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    setActiveBobject,
    updateActiveBobject,
    history: useGetExtensionContext2((state) => state.history) || [],
    setHistory: (history) => {
      store.setState("history", history);
    },
    addBobjectToHistory: (bobject) => {
      const history = store.snapshot().history;
      if (bobject) {
        const newObject = {
          activeBobject: bobject,
          activeTab: bobject.id.type,
          activeSubTab: "Overview"
        };
        store.setState("history", [...history, newObject]);
      }
    },
    useGetActiveBobjectContext: _s9(() => {
      _s9();
      return useGetExtensionContext2((state) => state.activeBobjectContext);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    useGetForcedActiveTab: _s10(() => {
      _s10();
      return useGetExtensionContext2((state) => state.activeTab);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    useGetForcedActiveSubTab: _s11(() => {
      _s11();
      return useGetExtensionContext2((state) => state.activeSubTab);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    setContactViewBobjectId,
    useGetIsLoading: _s12(() => {
      _s12();
      return useGetExtensionContext2((state) => state.loading);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    setIsLoading: (loading) => store.setState("loading", loading),
    useGetNoMatchFound: _s13(() => {
      _s13();
      return useGetExtensionContext2((state) => state.noMatchFound);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    setNoMatchFound,
    useGetDuplicatesDetected: _s14(() => {
      _s14();
      return useGetExtensionContext2((state) => state.duplicatesDetected);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    setDuplicatesDetected,
    setCurrentTask,
    useGetCurrentTask: _s15(() => {
      _s15();
      return useGetExtensionContext2((state) => state.currentTask);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    useGetExtendedContext: _s16(() => {
      _s16();
      return useGetExtensionContext2((state) => state.extendedContext);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    setExtendedContext,
    closeExtendedScreen,
    refreshExtendedScreenBobject,
    openExtendedScreen: (extendedContext) => {
      store.setState("extendedContext", {
        ...extendedContext,
        open: true
      });
    },
    subscribeListener: (bobjectType, callback) => {
      const listeners = store.snapshot().activeBobjectListeners;
      if (!listeners[bobjectType]) {
        listeners[bobjectType] = /* @__PURE__ */ new Set();
      }
      listeners[bobjectType].add(callback);
      store.setState("activeBobjectListeners", listeners);
    },
    unsuscribeListener: (bobjectType, callback) => {
      const listeners = store.snapshot().activeBobjectListeners;
      if (listeners[bobjectType]) {
        listeners[bobjectType].delete(callback);
      }
      store.setState("activeBobjectListeners", listeners);
    },
    launchBobjectSideEffects,
    refreshActiveBobjectContext,
    useGetOpenStartTasksNavigation: _s17(() => {
      _s17();
      return useGetExtensionContext2((state) => state.openStartTasksNavigation);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    setOpenStartTasksNavigation: (openStartTasksNavigation) => {
      const {
        open
      } = openStartTasksNavigation;
      store.setState("openStartTasksNavigation", openStartTasksNavigation);
      set(SessionStorageKeys.OpenStartTasksNavigation, openStartTasksNavigation);
      if (!open) {
        set(SessionStorageKeys.IndexSelectedTask, 0);
      }
      window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension));
    },
    useGetTaskId: _s18(() => {
      _s18();
      return useGetExtensionContext2((state) => state.taskId);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    setTaskId: (taskId) => store.setState("taskId", taskId),
    setCustomPage,
    useGetCustomPage: _s19(() => {
      _s19();
      return useGetExtensionContext2((state) => state.customPage);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    useGetSalesforceSyncMutate: _s20(() => {
      _s20();
      return useGetExtensionContext2((state) => state.salesforceSyncMutate);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    setSalesforceSyncMutate: (salesforceSyncMutate) => store.setState("salesforceSyncMutate", salesforceSyncMutate),
    setSidePeekEnabled,
    toggleSidePeek: () => {
      const sidePeekEnabled = store.snapshot().sidePeekEnabled;
      setSidePeekEnabled(!sidePeekEnabled);
    },
    useGetSidePeekEnabled: _s21(() => {
      _s21();
      const sidePeekEnabled = useGetExtensionContext2((state) => state.sidePeekEnabled);
      if (sidePeekEnabled === null) {
        const sidePeekHelper = !has(ExtensionHelperKeys.SIDEPEEK_DISABLED);
        store.setState("sidePeekEnabled", sidePeekHelper);
        return sidePeekHelper;
      }
      return sidePeekEnabled;
    }, "xtvLB5IQGrnMSaFn5560jEFD1/4=", false, function() {
      return [useGetExtensionContext2];
    }),
    useGetWhatsappLead: _s22(() => {
      _s22();
      return useGetExtensionContext2((state) => state.whatsappLead);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    setWhatsappLead: (whatsappLead) => {
      store.setState("whatsappLead", whatsappLead);
    },
    setForcedActiveSubTab: (activeSubTab) => {
      store.setState("activeSubTab", activeSubTab);
      const activeBobject = store.snapshot().activeBobject;
      store.setState("activeBobject", null);
      store.setState("activeBobject", activeBobject);
    },
    useGetIsSettings: _s23(() => {
      _s23();
      return useGetExtensionContext2((state) => state.isSettings);
    }, "V9ryTAG86n1B2GKLTPnOMc7+bbk=", false, function() {
      return [useGetExtensionContext2];
    }),
    updateIsSettings: () => {
      const isSettings = !store.snapshot().isSettings;
      store.setState("isSettings", isSettings);
      set(SessionStorageKeys.IsSettings, isSettings);
    },
    setIsSettings,
    resetExtensionContext: () => {
      closeExtendedScreen();
      setActiveBobject(null);
      setExtendedContext(null);
      setCurrentTask(null);
      setContactViewBobjectId(null);
      setCustomPage(null);
      setIsSettings(false);
      setNoMatchFound(null);
      setDuplicatesDetected(false);
    }
  };
}
_s24(useExtensionContext, "LBucteCkqjpevSbskTWuTgUfAxY=", false, function() {
  return [useExtensionContextStore, useSessionStorage, useLocalStorage, useUserHelpers, useGetExtensionContext];
});
function ExtensionProvider({
  children,
  value
}) {
  _s25();
  const listener = useLazyRef(() => /* @__PURE__ */ new Set());
  const state = useLazyRef(() => {
    return value;
  });
  const store = useMemo(() => {
    return {
      setState: (key, value2) => {
        if (Object.is(state.current[key], value2)) {
          return;
        }
        state.current[key] = value2;
        store.emit();
      },
      snapshot: () => state.current,
      subscribe: (callback) => {
        listener.current.add(callback);
        return () => listener.current.delete(callback);
      },
      emit: () => listener.current.forEach((cb) => cb())
    };
  }, []);
  useEffect(() => {
    if (!state.current.dataModel && value.dataModel) {
      store.setState("dataModel", value.dataModel);
    }
  }, [value.dataModel]);
  return /* @__PURE__ */ _jsxDEV(ExtensionContext.Provider, {
    value: store,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 490,
    columnNumber: 10
  }, this);
}
_s25(ExtensionProvider, "roCULFSiDhpPpYiMBD63fLhaveI=", false, function() {
  return [useLazyRef, useLazyRef];
});
_c = ExtensionProvider;
export { ExtensionProvider, useExtensionContext };
var _c;
$RefreshReg$(_c, "ExtensionProvider");
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

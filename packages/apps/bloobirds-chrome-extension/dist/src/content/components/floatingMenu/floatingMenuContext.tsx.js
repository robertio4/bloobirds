import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/floatingMenu/floatingMenuContext.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/floatingMenu/floatingMenuContext.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/floatingMenu/floatingMenuContext.tsx", _s = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const createContext = __vite__cjsImport2_react["createContext"]; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"];
import { useLazyRef, useLocalStorage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { LocalStorageKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import __vite__cjsImport5_useSyncExternalStore_shim from "/vendor/.vite-deps-use-sync-external-store_shim.js__v--03bee27d.js"; const useSyncExternalStore = __vite__cjsImport5_useSyncExternalStore_shim["useSyncExternalStore"];
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const FloatingMenuContextStore = createContext(null);
function useFloatingMenuContextStore() {
  _s();
  const context = useContext(FloatingMenuContextStore);
  if (context === void 0) {
    throw new Error("useFloatingMenuContext must be used within a FloatingMenuProvider");
  }
  return context;
}
_s(useFloatingMenuContextStore, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function useFloatingMenuContext() {
  _s3();
  var _s2 = $RefreshSig$();
  const {
    set
  } = useLocalStorage();
  const store = useFloatingMenuContextStore();
  function getState(selector) {
    _s2();
    const cb = () => selector(store.snapshot());
    return useSyncExternalStore(store.subscribe, cb, cb);
  }
  _s2(getState, "FpwL93IKMLJZuQQXefVtWynbBPQ=", false, function() {
    return [useSyncExternalStore];
  });
  return {
    getState,
    getIsHome: () => getState((state) => state.isHome),
    setIsHome: (bool) => store.setState("isHome", bool),
    getIsDuplicatePage: () => getState((state) => state.isDuplicatePage),
    setIsDuplicatePage: (bool) => store.setState("isDuplicatePage", bool),
    getPosition: () => getState((state) => state.position),
    getConnections: () => getState((state) => state.connections),
    getMutateConnections: () => getState((state) => state.mutateConnections),
    getOnRefresh: () => getState((state) => state.onRefresh),
    setGoBack: (goBack) => store.setState("goBack", goBack),
    getGoBack: () => getState((state) => state.goBack),
    setShowBackButton: (bool) => store.setState("showBackButton", bool),
    getShowBackButton: () => getState((state) => state.showBackButton),
    setLastVisitedBobject: (lastVisitedBobject) => {
      const lastVisitedBobjects = store.snapshot().lastVisitedBobjects;
      const lastVisitedBobjectsArray = Object.keys(lastVisitedBobjects).map((key) => lastVisitedBobjects[key]);
      if (lastVisitedBobjectsArray.length === 15) {
        if (!lastVisitedBobjectsArray.find((bobject) => bobject?.id?.value === lastVisitedBobject?.id?.value)) {
          lastVisitedBobjectsArray.pop();
        } else {
          lastVisitedBobjectsArray.splice(lastVisitedBobjectsArray.findIndex((bobject) => bobject?.id?.value === lastVisitedBobject?.id?.value), 1);
        }
      }
      lastVisitedBobjectsArray.unshift(lastVisitedBobject);
      const newLastVisitedBobjects = lastVisitedBobjectsArray.reduce((acc, bobject) => {
        if (bobject && bobject.id) {
          return {
            ...acc,
            [bobject.id.value]: bobject
          };
        }
        return acc;
      }, {});
      set(LocalStorageKeys.LastVisitedBobjects, newLastVisitedBobjects);
      store.setState("lastVisitedBobjects", newLastVisitedBobjects);
    },
    getLastVisitedBobjects: () => getState((state) => state.lastVisitedBobjects),
    setMeta: (data) => store.setState("meta", data),
    getMeta: () => getState((state) => state.meta)
  };
}
_s3(useFloatingMenuContext, "EqNu9CZH2oNBA9f5GBFo3uykNoI=", false, function() {
  return [useLocalStorage, useFloatingMenuContextStore];
});
const FloatingMenuProvider = ({
  children,
  value
}) => {
  _s4();
  const listener = useLazyRef(() => /* @__PURE__ */ new Set());
  const setState = (key, value2) => {
    if (Object.is(state.current[key], value2)) {
      return;
    }
    state.current[key] = value2;
    store.emit();
  };
  const state = useLazyRef(() => {
    return value;
  });
  useEffect(() => {
    setState("position", value.position);
  }, [value.position]);
  useEffect(() => {
    setState("onRefresh", value.onRefresh);
  }, [value.onRefresh]);
  const store = useMemo(() => {
    return {
      setState,
      snapshot: () => state.current,
      subscribe: (callback) => {
        listener.current.add(callback);
        return () => listener.current.delete(callback);
      },
      emit: () => listener.current.forEach((cb) => cb())
    };
  }, []);
  return /* @__PURE__ */ _jsxDEV(FloatingMenuContextStore.Provider, {
    value: store,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 144,
    columnNumber: 5
  }, void 0);
};
_s4(FloatingMenuProvider, "prFJiVXN4PT3e9M146ypfdckFbA=", false, function() {
  return [useLazyRef, useLazyRef];
});
_c = FloatingMenuProvider;
export { FloatingMenuProvider, useFloatingMenuContext, useFloatingMenuContextStore };
var _c;
$RefreshReg$(_c, "FloatingMenuProvider");
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

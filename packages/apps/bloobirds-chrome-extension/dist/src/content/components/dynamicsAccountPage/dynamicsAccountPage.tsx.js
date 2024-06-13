import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/dynamicsAccountPage/dynamicsAccountPage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/dynamicsAccountPage/dynamicsAccountPage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/dynamicsAccountPage/dynamicsAccountPage.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useState = __vite__cjsImport2_react["useState"];
import { ContactViewSubTab, ContactViewTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, searchCompaniesByQuery } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { searchOppsByQuery } from "/src/utils/leads.ts.js";
import { ContactView } from "/src/content/components/contactView/contactView.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import Loading from "/src/content/components/loadingIndicator/loadingIndicator.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const dynamicsObjectTools = {
  account: {
    search: searchCompaniesByQuery,
    tab: ContactViewTab.COMPANY,
    bobjectType: "companies"
  },
  opportunity: {
    search: searchOppsByQuery,
    tab: ContactViewTab.OPPORTUNITY,
    bobjectType: "opportunities"
  }
};
export const DynamicsPage = ({
  info
}) => {
  _s();
  const {
    id: dynamicsId,
    entity
  } = info;
  const {
    tab,
    bobjectType
  } = dynamicsObjectTools[entity];
  const [dynamicsObject, setDynamicsObject] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    setActiveBobject,
    useGetCurrentPage
  } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const refresh = async () => {
    try {
      api.get(`/linkedin/${bobjectType}/dynamics/${dynamicsId}`).then((data) => {
        setLoading(false);
        if (data.data) {
          setDynamicsObject([data.data]);
          setTimeout(() => {
            api.get(`/linkedin/${bobjectType}/dynamics/${dynamicsId}`).then((dataWithRelated) => {
              if (dataWithRelated.data) {
                setActiveBobject(dataWithRelated.data);
                setDynamicsObject([dataWithRelated.data]);
              }
            });
          }, 6e3);
        } else {
          setLoading(false);
        }
      });
      return;
    } catch (error) {
      console.error("Error fetching dynamics account", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refresh();
  }, [currentPage]);
  const initialContext = useMemo(() => ({
    activeTab: tab,
    activeSubTab: ContactViewSubTab.OVERVIEW,
    activeBobject: dynamicsObject?.[0]
  }), [dynamicsObject]);
  return /* @__PURE__ */ _jsxDEV("div", {
    children: loading ? /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 18
    }, void 0) : dynamicsObject && /* @__PURE__ */ _jsxDEV(ContactView, {
      defaultContext: initialContext
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 50
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 71,
    columnNumber: 5
  }, void 0);
};
_s(DynamicsPage, "nRL+Z2kIqUp+/B8PqNpL4wbYBm8=", true, function() {
  return [useExtensionContext];
});
_c = DynamicsPage;
var _c;
$RefreshReg$(_c, "DynamicsPage");
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

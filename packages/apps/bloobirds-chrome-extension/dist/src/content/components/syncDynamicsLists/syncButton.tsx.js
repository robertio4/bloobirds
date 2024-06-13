import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/syncDynamicsLists/syncButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/syncDynamicsLists/syncButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/syncDynamicsLists/syncButton.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"]; const cloneElement = __vite__cjsImport2_react["cloneElement"];
import __vite__cjsImport3_reactDom from "/vendor/.vite-deps-react-dom.js__v--47a99a8e.js"; const ReactDOM = __vite__cjsImport3_reactDom.__esModule ? __vite__cjsImport3_reactDom.default : __vite__cjsImport3_reactDom;
import { isDynamicsListPage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/syncDynamicsLists/syncListButton.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function checkButtonRenderable(ref, setRefReady) {
  setTimeout(() => {
    if (!ref.current && document.getElementById("bb-sync-cadences-button")) {
      setRefReady(true);
    } else {
      checkButtonRenderable(ref, setRefReady);
    }
  }, 500);
}
const SyncButton = ({
  id,
  title,
  children
}) => {
  _s();
  const {
    useGetCurrentPage
  } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const isDynamicsList = isDynamicsListPage(currentPage);
  const [modalOpen, setModalOpen] = useState(false);
  const [, setRefReady] = useState(false);
  const ref = useRef();
  ref.current = document.getElementById(id);
  useEffect(() => {
    checkButtonRenderable(ref, setRefReady);
  }, []);
  if (isDynamicsList && ref.current) {
    return ReactDOM.createPortal(/* @__PURE__ */ _jsxDEV("a", {
      children: [/* @__PURE__ */ _jsxDEV("div", {
        onClick: () => setModalOpen(true),
        className: styles.syncButton,
        children: title
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, void 0), modalOpen && cloneElement(children, {
        onClose: () => setModalOpen(false)
      })]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, void 0), document.getElementById(id));
  } else
    return null;
};
_s(SyncButton, "8dqWOt6IKsq8hFoOetDG3PVOnlY=", true, function() {
  return [useExtensionContext];
});
_c = SyncButton;
export default SyncButton;
var _c;
$RefreshReg$(_c, "SyncButton");
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

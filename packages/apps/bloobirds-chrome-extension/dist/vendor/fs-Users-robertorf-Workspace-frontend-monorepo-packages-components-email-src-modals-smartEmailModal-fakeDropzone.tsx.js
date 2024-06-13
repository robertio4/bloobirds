import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-fakeDropzone.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/fakeDropzone.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/fakeDropzone.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { insertImage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { useDebounce } from "/vendor/.vite-deps-use-debounce.js__v--e00a6ff0.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export default function FakeDropzone({
  editor
}) {
  _s();
  const [dragging, setDragging] = useState(false);
  const [isDropzoneDragged, setDropzoneDragged] = useState(false);
  const [delayedDragging] = useDebounce(dragging, 50);
  useEffect(() => {
    window.addEventListener("dragover", function(e) {
      e.preventDefault();
      setDragging(true);
    }, false);
    window.addEventListener("dragleave", function(e) {
      e.preventDefault();
      setDragging(false);
    }, false);
    window.addEventListener("drop", function(e) {
      e.preventDefault();
      setDragging(false);
    }, false);
    return () => {
      window.removeEventListener("dragover", () => {
      });
      window.removeEventListener("dragleave", () => {
      });
      window.removeEventListener("drop", () => {
      });
    };
  }, []);
  const dropImage = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDragging(false);
    const {
      files
    } = e.dataTransfer;
    for (const file of files) {
      const [mime] = file.type.split("/");
      if (mime === "image") {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("visible", "true");
        const response = await api.post("/messaging/mediaFiles", formData, {
          validateStatus: () => true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        if (response.status === 201) {
          insertImage(editor, response.data.url);
        }
      }
    }
  };
  if (!delayedDragging) {
    return null;
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    id: "dropzone",
    style: {
      height: document.getElementById("emailBody")?.offsetHeight - 90
    },
    className: clsx(styles._editor__container__dragged, {
      [styles._editor__container__dragged__active]: isDropzoneDragged
    }),
    onDragLeave: () => {
      setDropzoneDragged(false);
    },
    onDragOver: () => {
      setDropzoneDragged(true);
    },
    onDrop: dropImage,
    children: "Drop your images here"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 84,
    columnNumber: 5
  }, this);
}
_s(FakeDropzone, "RFk+9DZa0ZKDUbIRcU3Qzdpbqa4=", false, function() {
  return [useDebounce];
});
_c = FakeDropzone;
var _c;
$RefreshReg$(_c, "FakeDropzone");
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

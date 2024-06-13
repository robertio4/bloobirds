import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplateModal-components-attachmentList.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplateModal/components/attachmentList.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplateModal/components/attachmentList.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { Icon, IconButton, Spinner, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { addHttpIfNeeded } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplateModal-components-attachment.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function AttachmentItem({
  id,
  uploading,
  name,
  onDelete
}) {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.item,
    role: "listitem",
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.content,
      children: [uploading ? /* @__PURE__ */ _jsxDEV(Spinner, {
        name: "loadingCircle",
        size: 14,
        color: "softPeanut"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 19,
        columnNumber: 11
      }, this) : /* @__PURE__ */ _jsxDEV(Icon, {
        name: "file",
        size: 16,
        color: "softPeanut"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 11
      }, this), /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: name,
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          children: name
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 24,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }, this), !uploading && onDelete && /* @__PURE__ */ _jsxDEV(IconButton, {
      name: "cross",
      onClick: () => onDelete(id),
      size: 16,
      color: "softPeanut"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 16,
    columnNumber: 5
  }, this);
}
_c = AttachmentItem;
const AttachmentLink = ({
  file,
  onDelete
}) => {
  _s();
  const {
    link,
    title,
    type
  } = file;
  const [isHover, setIsHover] = useState(false);
  return /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: link,
    position: "top",
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles._attachment_box,
      onMouseEnter: () => setIsHover(true),
      onMouseLeave: () => setIsHover(false),
      children: [/* @__PURE__ */ _jsxDEV(Icon, {
        name: "link",
        size: 18,
        color: isHover ? "bloobirds" : "softPeanut"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        onClick: () => window.open(addHttpIfNeeded(link), "_blank"),
        children: /* @__PURE__ */ _jsxDEV(Text, {
          color: isHover ? "bloobirds" : "softPeanut",
          decoration: isHover ? "underline" : "none",
          ellipsis: 20,
          size: "xs",
          children: title
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 49,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
        name: "cross",
        onClick: onDelete,
        size: 18,
        color: isHover ? "softTomato" : "lightestGray"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 41,
    columnNumber: 5
  }, void 0);
};
_s(AttachmentLink, "FTC8EpIspi2qaDtU9gFRhqZT02A=");
_c2 = AttachmentLink;
export function AttachmentList({
  files,
  onDelete
}) {
  const listClasses = clsx(styles.list);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: listClasses,
    role: "list",
    children: files.map((file) => /* @__PURE__ */ _jsxDEV(AttachmentItem, {
      ...file,
      onDelete: typeof onDelete === "function" ? () => onDelete(file?.id) : null
    }, file.internalId, false, {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 9
    }, this))
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 77,
    columnNumber: 5
  }, this);
}
_c3 = AttachmentList;
export function AttachmentLinkList({
  files,
  onDelete
}) {
  const listClasses = clsx(styles.list, {
    [styles.wrappedList]: files?.length > 5
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: listClasses,
    role: "list",
    children: files.map((file) => /* @__PURE__ */ _jsxDEV(AttachmentLink, {
      file,
      onDelete: typeof onDelete === "function" ? () => onDelete(file) : null
    }, file.title, false, {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 9
    }, this))
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 100,
    columnNumber: 5
  }, this);
}
_c4 = AttachmentLinkList;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "AttachmentItem");
$RefreshReg$(_c2, "AttachmentLink");
$RefreshReg$(_c3, "AttachmentList");
$RefreshReg$(_c4, "AttachmentLinkList");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-components-prioritySelector-prioritySelector.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/tasks/src/components/prioritySelector/prioritySelector.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/tasks/src/components/prioritySelector/prioritySelector.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { Icon, Label } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useDataModel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { TASK_FIELDS_LOGIC_ROLE, TASK_PRIORITY_VALUE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-components-prioritySelector-prioritySelector.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const PrioritySelector = ({
  value,
  onChange,
  overrideStyle = {}
}) => {
  _s();
  const [open, setOpen] = useState(false);
  const dataModel = useDataModel();
  const priorityTask = dataModel?.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const defaultValue = value && priorityTask?.find((priorityTask2) => priorityTask2.logicRole === value || priorityTask2.name === value);
  const isImportantSelected = defaultValue?.logicRole === TASK_PRIORITY_VALUE.IMPORTANT;
  if (open) {
    return /* @__PURE__ */ _jsxDEV("div", {
      className: styles.containerOpen,
      style: overrideStyle,
      children: priorityTask?.map((priority) => /* @__PURE__ */ _jsxDEV(Label, {
        overrideStyle: {
          backgroundColor: priority?.backgroundColor,
          color: priority?.textColor,
          borderColor: priority?.backgroundColor,
          textTransform: "initial"
        },
        hoverStyle: {
          opacity: 0.7
        },
        size: "small",
        onClick: () => {
          setOpen(false);
          onChange(priority?.logicRole);
        },
        children: [priority?.logicRole === TASK_PRIORITY_VALUE.IMPORTANT && /* @__PURE__ */ _jsxDEV(Icon, {
          name: "flagFilled",
          size: 12,
          color: "softTomato"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 54,
          columnNumber: 15
        }, void 0), " ", priority?.name]
      }, priority?.id, true, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 11
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    style: overrideStyle,
    children: /* @__PURE__ */ _jsxDEV(Label, {
      overrideStyle: {
        backgroundColor: defaultValue?.backgroundColor,
        color: defaultValue?.textColor,
        borderColor: defaultValue?.backgroundColor,
        textTransform: "initial"
      },
      size: "small",
      hoverStyle: {
        opacity: 0.7
      },
      onClick: () => {
        setOpen(true);
      },
      children: [isImportantSelected && /* @__PURE__ */ _jsxDEV(Icon, {
        name: "flagFilled",
        size: 12,
        color: "softTomato"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 80,
        columnNumber: 33
      }, void 0), " ", defaultValue?.name]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 64,
    columnNumber: 5
  }, void 0);
};
_s(PrioritySelector, "1jCjBNzFaxxjYddluTqBbXSzcPg=", false, function() {
  return [useDataModel];
});
_c = PrioritySelector;
var _c;
$RefreshReg$(_c, "PrioritySelector");
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

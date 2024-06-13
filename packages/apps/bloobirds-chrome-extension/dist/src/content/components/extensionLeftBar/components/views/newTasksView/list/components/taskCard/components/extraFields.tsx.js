import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/extraFields.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/extraFields.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/extraFields.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { getI18nSpacetimeLng } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { getUserTimeZone } from "/src/utils/dates.ts.js";
import styles from "/src/content/components/extensionLeftBar/components/views/newTasksView/list/taskTabsList.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const isoDateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?(Z|[+-]\d{2}:\d{2})?([+-]\d{4})?$/;
export function ExtraFields({
  extraFields
}) {
  _s();
  const {
    i18n
  } = useTranslation();
  const formatDate = (value) => {
    if (isoDatePattern.test(value)) {
      return new Date(value).toLocaleDateString();
    } else if (isoDateTimePattern.test(value)) {
      return getI18nSpacetimeLng(i18n.language, new Date(), getUserTimeZone()).since(getI18nSpacetimeLng(i18n.language, new Date(value), getUserTimeZone())).rounded;
    } else {
      return value;
    }
  };
  const getColorByDateTime = (value) => {
    if (isoDateTimePattern.test(value)) {
      const now = new Date();
      const pastDate = new Date(value);
      const timeDiff = Math.abs(now - pastDate);
      const hoursDiff = Math.floor(timeDiff / (1e3 * 60 * 60));
      if (hoursDiff < 2) {
        return "melon";
      } else if (hoursDiff < 6) {
        return "banana";
      } else if (hoursDiff < 12) {
        return "tangerine";
      } else if (hoursDiff <= 24) {
        return "softTomato";
      } else {
        return "softPeanut";
      }
    }
    return "lightBloobirds";
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.extraFields,
    children: extraFields.map((field, index) => {
      if (!field.value)
        return null;
      const formattedValue = formatDate(field.value);
      const iconColor = getColorByDateTime(field.value);
      const icon = iconColor !== "lightBloobirds" ? "flagFilled" : field.icon || "circle";
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.extraField,
        children: /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: `${field.name}: ${field.value}`,
          position: "top",
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: icon,
            color: iconColor,
            size: 16
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 60,
            columnNumber: 15
          }, this), /* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            color: "peanut",
            weight: "bold",
            children: formattedValue
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 61,
            columnNumber: 15
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 59,
          columnNumber: 13
        }, this)
      }, index, false, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 11
      }, this);
    })
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 51,
    columnNumber: 5
  }, this);
}
_s(ExtraFields, "iD7vDB/EPQWin5ATG71yacngHuk=", false, function() {
  return [useTranslation];
});
_c = ExtraFields;
var _c;
$RefreshReg$(_c, "ExtraFields");
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

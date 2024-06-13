import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/duplicatedLead/duplicatedLead.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/duplicatedLead/duplicatedLead.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/duplicatedLead/duplicatedLead.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { updateLead } from "/src/utils/leads.ts.js";
import { BubbleWindow, BubbleWindowContent, BubbleWindowFooter, BubbleWindowHeader } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import styles from "/src/content/components/duplicatedLead/duplicatedLead.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export default function DuplicatedLead({
  linkedInURL,
  salesNavigatorURL,
  lead,
  field,
  onUpdate
}) {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.duplicates"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    setActiveBobject
  } = useExtensionContext();
  const {
    setIsDuplicatePage
  } = useFloatingMenuContext();
  const leadName = lead?.fullName;
  const fieldName = field?.name.toLowerCase();
  const handleLeadRedirect = () => {
    setActiveBobject(lead);
  };
  useEffect(() => {
    setIsDuplicatePage(true);
    return () => setIsDuplicatePage(false);
  }, []);
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: [/* @__PURE__ */ _jsxDEV(BubbleWindowHeader, {
      color: "banana",
      backgroundColor: "verySoftBanana",
      name: "copy"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(BubbleWindowContent, {
      className: styles.wrapper,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        align: "center",
        className: styles.title,
        children: t("duplicatedLead")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(Text, {
        align: "center",
        color: "gray",
        size: "m",
        children: leadName ? /* @__PURE__ */ _jsxDEV("span", {
          children: [t("existingLead"), /* @__PURE__ */ _jsxDEV("span", {
            onClick: handleLeadRedirect,
            className: styles.link,
            children: [leadName, " ", /* @__PURE__ */ _jsxDEV(Icon, {
              name: "externalLink",
              size: 20
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 64,
              columnNumber: 28
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 63,
            columnNumber: 15
          }, this), " ", t("fieldName", {
            fieldName
          })]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 61,
          columnNumber: 13
        }, this) : /* @__PURE__ */ _jsxDEV("span", {
          children: t("sameField", {
            fieldName
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 69,
          columnNumber: 13
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(BubbleWindowFooter, {
      children: /* @__PURE__ */ _jsxDEV(Button, {
        expand: true,
        disabled: isSubmitting,
        onClick: async () => {
          setIsSubmitting(true);
          const response = await updateLead(lead.id, linkedInURL, salesNavigatorURL);
          onUpdate(response.data);
        },
        children: t("mergeExisting")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 74,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 53,
    columnNumber: 5
  }, this);
}
_s(DuplicatedLead, "xiJXCYNjCZ4qS4QES8W3bUm1s/M=", false, function() {
  return [useTranslation, useExtensionContext, useFloatingMenuContext];
});
_c = DuplicatedLead;
var _c;
$RefreshReg$(_c, "DuplicatedLead");
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

import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/leadBriefCard/components/mainNoteButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/leadBriefCard/components/mainNoteButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/leadBriefCard/components/mainNoteButton.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { isLead, isOpportunity } from "/src/utils/bobjects.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { InfoDetailElement } from "/src/content/components/contactView/components/briefCardComponents/infoDetailElement.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const MainNoteButton = ({
  bobject
}) => {
  _s();
  const {
    setExtendedContext
  } = useExtensionContext();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.bobjectBriefCard"
  });
  const openNoteModal = (extraInfo = {}) => {
    const isLeadBobject = isLead(bobject);
    const isOpportunityBobject = isOpportunity(bobject);
    setExtendedContext({
      type: ExtendedContextTypes.NOTE_DETAILS,
      bobject,
      extraInfo: {
        ...isLeadBobject ? {
          lead: {
            ...bobject,
            fullName: bobject?.fullName
          }
        } : {},
        ...isOpportunityBobject ? {
          opportunity: {
            ...bobject,
            name: bobject?.name
          }
        } : {},
        bobjectId: bobject?.id?.value || bobject?.data?.id?.value,
        originallyMainNote: true,
        location: "bubble",
        ...extraInfo
      }
    });
  };
  const handleClick = (e) => {
    e.stopPropagation();
    api.get(`/bobjects/${bobject.mainNote}/form`).then((res) => {
      const bobjectFieldsData = {};
      res?.data?.fields.forEach((field) => {
        bobjectFieldsData[field.logicRole || field.name] = field.value;
      });
      openNoteModal(bobjectFieldsData);
    }).catch(openNoteModal);
  };
  return /* @__PURE__ */ _jsxDEV(InfoDetailElement, {
    icon: "note",
    iconColor: "banana",
    text: t("note"),
    onClick: handleClick
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 62,
    columnNumber: 5
  }, void 0);
};
_s(MainNoteButton, "Jg2pCJwvRj6d5nUFgA/kRlRXPQw=", false, function() {
  return [useExtensionContext, useTranslation];
});
_c = MainNoteButton;
var _c;
$RefreshReg$(_c, "MainNoteButton");
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

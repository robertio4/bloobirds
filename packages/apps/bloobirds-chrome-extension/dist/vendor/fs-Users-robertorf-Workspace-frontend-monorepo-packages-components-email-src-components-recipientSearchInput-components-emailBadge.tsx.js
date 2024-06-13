import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-components-emailBadge.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/recipientSearchInput/components/emailBadge.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/recipientSearchInput/components/emailBadge.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Tag, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useObjectCreationSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { SmartEmailTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { isEmail } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useSmartEmailModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-recipientSearchInput.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function getTooltipText(email, isOutsider, isValidEmail, showAddToDB, t) {
  if (showAddToDB)
    return t("notRegisteredTooltip");
  if (isOutsider && isValidEmail)
    return t("outsiderTooltip", {
      email
    });
}
export const EmailBadge = ({
  contact,
  unselectEmail,
  isOutsider = false
}) => {
  _s();
  const {
    enabledObjectCreation
  } = useObjectCreationSettings();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.components.recipientSearchInput"
  });
  const {
    newLeadInfo,
    setNewLeadInfo,
    setSelectedTab,
    company
  } = useSmartEmailModal() || {
    setNewLeadInfo: {
      email: void 0,
      company: void 0
    },
    setSelectedTab: () => null
  };
  const isSmartEmailEditor = typeof setNewLeadInfo === "function";
  const isContactOnDatabase = contact.isInDB;
  const isValidEmail = isEmail(contact.email);
  const showAddToDB = !contact.isCompanyMember && !isContactOnDatabase && isValidEmail && isSmartEmailEditor;
  const tooltipText = getTooltipText(contact.email, isOutsider, isValidEmail, showAddToDB, t);
  const color = (() => {
    if (!isValidEmail)
      return "verySoftTomato";
    else if (contact.isCompanyMember)
      return "lightBloobirds";
    else if (showAddToDB) {
      return "verySoftTangerine";
    } else if (isContactOnDatabase && !isOutsider) {
      return "lightBloobirds";
    } else {
      return "softBanana";
    }
  })();
  return /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: tooltipText,
    position: "top",
    children: /* @__PURE__ */ _jsxDEV(Tag, {
      uppercase: false,
      color,
      iconLeft: showAddToDB && enabledObjectCreation ? "plus" : void 0,
      onClickLeft: () => {
        if (showAddToDB && enabledObjectCreation) {
          setNewLeadInfo({
            ...newLeadInfo,
            email: contact.email,
            company
          });
          setSelectedTab(SmartEmailTab.CREATE_LEAD);
        }
      },
      iconRight: "cross",
      onClickRight: (e) => {
        e.stopPropagation();
        unselectEmail();
      },
      children: [showAddToDB ? /* @__PURE__ */ _jsxDEV(Icon, {
        name: "alertTriangle",
        color: "tangerine",
        size: 16,
        className: styles.warningIcon
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 71,
        columnNumber: 11
      }, void 0) : isOutsider && isValidEmail && /* @__PURE__ */ _jsxDEV(Icon, {
        name: "alertTriangle",
        color: "peanut",
        size: 16,
        className: styles.warningIcon
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 13
      }, void 0), contact.email]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 53,
    columnNumber: 5
  }, void 0);
};
_s(EmailBadge, "cjVnSXcCXRdeCgrnTrGcfZ9I5qA=", false, function() {
  return [useObjectCreationSettings, useTranslation, useSmartEmailModal];
});
_c = EmailBadge;
var _c;
$RefreshReg$(_c, "EmailBadge");
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

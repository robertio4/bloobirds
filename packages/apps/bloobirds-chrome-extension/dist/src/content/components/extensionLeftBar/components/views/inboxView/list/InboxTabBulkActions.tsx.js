import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/inboxView/list/InboxTabBulkActions.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inboxView/list/InboxTabBulkActions.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inboxView/list/InboxTabBulkActions.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES, REPORTED_VALUES_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getFieldByLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { useMarkAsDone } from "/src/content/components/extensionLeftBar/components/views/inboxView/hooks/useInboxTab.ts.js";
import styles from "/src/content/components/extensionLeftBar/components/views/inboxView/inboxPage.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const getAllConversationActivities = (activitiesByLead) => {
  const allActivities = [];
  Object.keys(activitiesByLead).forEach((leadId) => {
    if (activitiesByLead[leadId]?.messages.length) {
      allActivities.push(activitiesByLead[leadId]?.messages);
    }
  });
  return allActivities.flat().filter((message) => {
    const messageReportedStatus = getFieldByLogicRole(message, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)?.valueLogicRole;
    return messageReportedStatus !== REPORTED_VALUES_LOGIC_ROLE.YES;
  });
};
export const InboxTabBulkActions = ({
  calls,
  emails,
  linkedin,
  whatsapp,
  mutate
}) => {
  _s();
  const {
    selectedQuickFilter
  } = useSubhomeContext();
  const {
    markAsDone
  } = useMarkAsDone(mutate);
  const {
    useGetDataModel
  } = useExtensionContext();
  const dataModel = useGetDataModel();
  const {
    t
  } = useTranslation();
  if (!selectedQuickFilter) {
    return null;
  }
  if (selectedQuickFilter.id === ACTIVITY_TYPES.CALL) {
    return /* @__PURE__ */ _jsxDEV("div", {
      className: styles.buttonBulkAction,
      children: /* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        inline: true,
        iconLeft: "thumbsUp",
        variant: "secondary",
        onClick: () => markAsDone(dataModel, calls),
        children: t("leftBar.actions.markAllReported")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }, void 0);
  }
  let activities;
  if (selectedQuickFilter.id === ACTIVITY_TYPES.LINKEDIN) {
    activities = getAllConversationActivities(linkedin);
  } else if (selectedQuickFilter.id === ACTIVITY_TYPES.CUSTOM_TASK) {
    activities = getAllConversationActivities(whatsapp);
  } else {
    activities = emails;
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.buttonBulkAction,
    children: /* @__PURE__ */ _jsxDEV(Button, {
      size: "small",
      inline: true,
      iconLeft: "checkDouble",
      variant: "secondary",
      onClick: () => markAsDone(dataModel, activities),
      children: t("leftBar.actions.readAll")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 71,
    columnNumber: 5
  }, void 0);
};
_s(InboxTabBulkActions, "fbcMNWMNuscjxe5kFvzGd+BzUTk=", true, function() {
  return [useSubhomeContext, useMarkAsDone, useExtensionContext, useTranslation];
});
_c = InboxTabBulkActions;
var _c;
$RefreshReg$(_c, "InboxTabBulkActions");
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

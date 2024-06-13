import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/miniCard/cardButtons/miniCardActivityButtons.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/miniCard/cardButtons/miniCardActivityButtons.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/miniCard/cardButtons/miniCardActivityButtons.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES, LEAD_FIELDS_LOGIC_ROLE, OPPORTUNITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getFieldByLogicRole, getTextFromLogicRole } from "/src/utils/bobjects.utils.ts.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import styles from "/src/content/components/contactView/components/miniCard/miniCard.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export function MiniCardActivityButtons({
  activity,
  setOpenedModal
}) {
  _s();
  const isMeeting = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE) === ACTIVITY_TYPES.MEETING;
  const {
    actionsDisabled
  } = useContactViewContext();
  const lead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const leadAssignee = getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.value;
  const opportunity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
  const opportunityAssignee = getFieldByLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.value;
  const activeUserId = useActiveUserId();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extension.card"
  });
  const {
    t: bobjectT
  } = useTranslation("translation", {
    keyPrefix: "bobjectTypes"
  });
  const assignedToActiveUser = leadAssignee === activeUserId || opportunityAssignee === activeUserId;
  if (isMeeting)
    return /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: actionsDisabled && !assignedToActiveUser && t("noPermissions", {
        bobject: bobjectT("activity")
      }),
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(Button, {
        dataTest: styles.iconButton,
        size: "small",
        onClick: () => {
          setOpenedModal("meeting");
        },
        disabled: actionsDisabled && !assignedToActiveUser,
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          size: 11,
          color: "white",
          name: "thumbsUp"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 55,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 7
    }, this);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
}
_s(MiniCardActivityButtons, "meqUw+RVPhBjQ8F72JboX97vQFQ=", false, function() {
  return [useContactViewContext, useActiveUserId, useTranslation, useTranslation];
});
_c = MiniCardActivityButtons;
var _c;
$RefreshReg$(_c, "MiniCardActivityButtons");
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

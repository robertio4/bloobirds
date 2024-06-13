import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-components-column-BadgeDropdown.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/timeTable/components/column/BadgeDropdown.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/timeTable/components/column/BadgeDropdown.tsx", _s = $RefreshSig$();
import { useClickAway } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import { CounterBadge, Dropdown, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { TIME_WINDOW } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceTable.type.ts.js";
import { cadenceTasksDisplay } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceTable.utils.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-timeTable.module.css.js";
import { BadgeDropdownContent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-components-column-BadgeDropdownContent.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const BadgeDropdown = ({
  dayTasks,
  cadenceAction,
  timeWindow,
  date
}) => {
  _s();
  const actionDisplayProps = cadenceTasksDisplay[cadenceAction];
  const numOfActivities = dayTasks[cadenceAction].numOfActivities;
  const numOfTasks = dayTasks[cadenceAction].numOfTasks;
  const numBounced = (cadenceAction === "autoEmail" || cadenceAction === "email") && dayTasks[cadenceAction].activities.filter((activity) => activity.bounced).length;
  const isBounced = numBounced > 0;
  const {
    ref,
    visible,
    setVisible
  } = useVisible(false);
  useClickAway(ref, () => setVisible(false));
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    ref,
    visible,
    position: "bottom",
    onClose: () => setVisible(false),
    anchor: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.clickable,
      onClick: () => setVisible(!visible),
      children: /* @__PURE__ */ _jsxDEV(CounterBadge, {
        done: numOfActivities,
        total: numOfTasks,
        size: "l",
        short: timeWindow === TIME_WINDOW.DAILY,
        color: actionDisplayProps.color,
        error: isBounced
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 9
    }, void 0),
    children: /* @__PURE__ */ _jsxDEV(BadgeDropdownContent, {
      date,
      dayTasks,
      cadenceAction,
      closeDropdown: () => setVisible(false)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 37,
    columnNumber: 5
  }, void 0);
};
_s(BadgeDropdown, "YtcCfG99PQ28m+5UyR8KoVwd6To=", false, function() {
  return [useVisible, useClickAway];
});
_c = BadgeDropdown;
var _c;
$RefreshReg$(_c, "BadgeDropdown");
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

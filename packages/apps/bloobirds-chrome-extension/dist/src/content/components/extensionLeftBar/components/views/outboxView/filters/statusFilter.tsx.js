import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/outboxView/filters/statusFilter.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/outboxView/filters/statusFilter.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/outboxView/filters/statusFilter.tsx", _s = $RefreshSig$();
import { useTranslation, Trans } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useFilters } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-index.tsx.js";
import { Item, Select } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { BobjectTypes, TASK_AUTOMATED_STATUS_LOGIC_ROLE, TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const scheduledStatus = [{
  id: "",
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.all"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 20
  }, void 0)
}, {
  id: TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING,
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.scheduled"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 12
  }, void 0)
}, {
  id: TASK_AUTOMATED_STATUS_LOGIC_ROLE.COMPLETED,
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.succesfullySent"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 21,
    columnNumber: 12
  }, void 0)
}, {
  id: TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED,
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.failed"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 25,
    columnNumber: 12
  }, void 0)
}];
export const automatedStatus = [{
  id: "",
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.all"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 29,
    columnNumber: 20
  }, void 0)
}, {
  id: TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING,
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.scheduled"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 32,
    columnNumber: 12
  }, void 0)
}, {
  id: TASK_AUTOMATED_STATUS_LOGIC_ROLE.COMPLETED,
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.succesfullySent"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 36,
    columnNumber: 12
  }, void 0)
}, {
  id: TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.rescheduled"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 40,
    columnNumber: 12
  }, void 0)
}, {
  id: TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED,
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.paused"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 44,
    columnNumber: 12
  }, void 0)
}, {
  id: TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED,
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.failed"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 48,
    columnNumber: 12
  }, void 0)
}];
const StatusFilter = ({
  shouldBeDisplayed = true,
  isAutomatedStatus
}) => {
  _s();
  const bobjectType = BobjectTypes.Task;
  const {
    setORsFilters
  } = useFilters();
  const {
    t
  } = useTranslation();
  const values = isAutomatedStatus ? automatedStatus : scheduledStatus;
  const handleOnChange = (value) => {
    if (value === TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED) {
      setORsFilters("statusFilter", value, bobjectType, [{
        fieldLR: TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS,
        filterValues: TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED
      }, {
        fieldLR: TASK_FIELDS_LOGIC_ROLE.STATUS,
        filterValues: [TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED]
      }]);
    } else if (value === TASK_AUTOMATED_STATUS_LOGIC_ROLE.COMPLETED) {
      setORsFilters("statusFilter", value, bobjectType, [{
        fieldLR: TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS,
        filterValues: TASK_AUTOMATED_STATUS_LOGIC_ROLE.COMPLETED
      }, {
        fieldLR: TASK_FIELDS_LOGIC_ROLE.STATUS,
        filterValues: [TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED, TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE]
      }]);
    } else {
      setORsFilters("statusFilter", value, bobjectType, [{
        fieldLR: TASK_FIELDS_LOGIC_ROLE.STATUS,
        filterValues: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO, TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE]
      }, {
        fieldLR: TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS,
        filterValues: value ? [value] : ""
      }]);
    }
  };
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: shouldBeDisplayed ? /* @__PURE__ */ _jsxDEV(Select, {
      size: "small",
      variant: "filters",
      placeholder: t("leftBar.filters.status"),
      onChange: handleOnChange,
      autocomplete: values?.length > 8,
      children: values?.map((item) => /* @__PURE__ */ _jsxDEV(Item, {
        value: item.id,
        children: item.value || item?.name
      }, item.id, false, {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 13
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)
  }, void 0, false);
};
_s(StatusFilter, "CDmtVm1xYgY2DCgpcQQphk+oosU=", false, function() {
  return [useFilters, useTranslation];
});
_c = StatusFilter;
export default StatusFilter;
var _c;
$RefreshReg$(_c, "StatusFilter");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }
}

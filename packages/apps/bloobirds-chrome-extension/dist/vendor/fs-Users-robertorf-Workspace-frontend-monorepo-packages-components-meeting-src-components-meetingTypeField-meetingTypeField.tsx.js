import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-meetingTypeField-meetingTypeField.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/meetingTypeField/meetingTypeField.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/meetingTypeField/meetingTypeField.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { Label, Dropdown, Spinner, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { usePicklist, useDataModel, useMeetingReportResult } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { BobjectTypes, ACTIVITY_FIELDS_LOGIC_ROLE, MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getFieldByLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport7_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport7_mixpanelBrowser.__esModule ? __vite__cjsImport7_mixpanelBrowser.default : __vite__cjsImport7_mixpanelBrowser;
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const MeetingTypeField = ({
  activity,
  styles,
  onUpdate
}) => {
  _s();
  const mainTypeLR = ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE;
  const mainTypeField = getFieldByLogicRole(activity, mainTypeLR);
  const {
    data: meetingTypes
  } = usePicklist(mainTypeField?.name);
  const types = meetingTypes?.filter((i) => i.enabled).sort((a, b) => a.ordering - b.ordering);
  const {
    visible,
    setVisible,
    ref
  } = useVisible();
  const dataModel = useDataModel();
  const {
    reportResult
  } = useMeetingReportResult(dataModel, mainTypeField?.value);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState(null);
  const setMeetingType = (value) => {
    setVisible(false);
    setIsLoading(true);
    reportResult(activity, value).then(() => {
      mixpanel.track(MIXPANEL_EVENTS.CLICK_EDIT_MEETING_TYPE_FROM_TAB_OTO);
      setType(types?.find((i) => i.id === value));
      onUpdate?.(() => setIsLoading(false));
      window.dispatchEvent(new CustomEvent("ACTIVE_BOBJECT_UPDATED", {
        detail: {
          type: BobjectTypes.Activity
        }
      }));
    });
  };
  if (!mainTypeField?.value || !types) {
    return null;
  }
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    ref,
    visible,
    position: "top-start",
    arrow: false,
    anchor: /* @__PURE__ */ _jsxDEV("div", {
      style: {
        cursor: "pointer"
      },
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        setVisible(!visible);
      },
      children: /* @__PURE__ */ _jsxDEV(Label, {
        overrideStyle: {
          minWidth: "80px",
          minHeight: "18px",
          display: "flex",
          color: "var(--peanut)",
          ...styles
        },
        uppercase: false,
        size: "small",
        children: isLoading ? /* @__PURE__ */ _jsxDEV(Spinner, {
          color: "darkBloobirds",
          name: "dots",
          size: 10
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 15
        }, void 0) : type?.value || mainTypeField?.text
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 9
    }, void 0),
    children: /* @__PURE__ */ _jsxDEV("div", {
      style: {
        display: "flex",
        padding: "0px 8px",
        gap: "8px",
        flexDirection: "column"
      },
      children: types.map(({
        id,
        value
      }) => /* @__PURE__ */ _jsxDEV("div", {
        style: {
          cursor: "pointer"
        },
        onClick: (e) => {
          e.stopPropagation();
          e.preventDefault();
        },
        children: /* @__PURE__ */ _jsxDEV(Label, {
          overrideStyle: {
            color: "var(--peanut)"
          },
          uppercase: false,
          size: "small",
          selected: value === (type?.value || mainTypeField?.text),
          value: id,
          onClick: setMeetingType,
          children: value
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 104,
          columnNumber: 13
        }, void 0)
      }, id, false, {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 11
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 56,
    columnNumber: 5
  }, void 0);
};
_s(MeetingTypeField, "LTI0JcId4JgXRFbmWFweOvv3aww=", false, function() {
  return [usePicklist, useVisible, useDataModel, useMeetingReportResult];
});
_c = MeetingTypeField;
var _c;
$RefreshReg$(_c, "MeetingTypeField");
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

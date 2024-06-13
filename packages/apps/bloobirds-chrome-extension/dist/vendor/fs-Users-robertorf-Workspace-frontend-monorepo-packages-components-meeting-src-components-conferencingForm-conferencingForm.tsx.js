import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-conferencingForm-conferencingForm.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/conferencingForm/conferencingForm.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/conferencingForm/conferencingForm.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useController, useFormContext } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, IconButton, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { GoogleMeetSvg as googleMeetSvg, GoogleMeetWhiteSvg as googleMeetWhiteSvg } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-assets-svg.ts.js";
import { useCalendar } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-hooks-useCalendar.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-conferencingForm-conferencingForm.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ConferencingForm = () => {
  _s();
  const {
    conferencingGoogleMeet,
    setConferencingGoogleMeet,
    connections,
    accountSelected
  } = useCalendar();
  const [emailProvider, setEmailProvider] = useState(null);
  const {
    control
  } = useFormContext();
  const {
    field: {
      value: conferencingValue,
      onChange: conferencingOnChange
    }
  } = useController({
    control,
    name: "conferencingGoogleMeet",
    defaultValue: conferencingGoogleMeet
  });
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "meetingModal.mainForm.conferencingForm"
  });
  useEffect(() => {
    if (accountSelected && connections && connections?.list?.length > 0) {
      const selectedConnection = connections?.list?.find((connection) => connection.id == accountSelected);
      setEmailProvider(selectedConnection?.provider || connections?.list[0]?.provider);
    }
  }, [accountSelected]);
  let conferencingIcon, conferencingLabel;
  if (emailProvider && emailProvider == "ews") {
    conferencingIcon = /* @__PURE__ */ _jsxDEV(Icon, {
      size: 20,
      color: conferencingValue ? "white" : "purple",
      name: "mSTeams"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 7
    }, void 0);
    conferencingLabel = conferencingValue ? t("linkByTeams") : t("addTeams");
  } else {
    conferencingIcon = conferencingValue ? /* @__PURE__ */ _jsxDEV("img", {
      src: googleMeetWhiteSvg
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }, void 0) : /* @__PURE__ */ _jsxDEV("img", {
      src: googleMeetSvg
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 7
    }, void 0);
    conferencingLabel = conferencingValue ? t("linkByGoogle") : t("addGoogle");
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: clsx(styles._conferencing_container, {
        [styles._conferencing_container_marked]: conferencingValue
      }),
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles._title,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles._google_meet_icon,
          children: conferencingIcon
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: conferencingValue ? "white" : "peanut",
          children: conferencingLabel
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 69,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
        name: conferencingValue ? "cross" : "plus",
        color: conferencingValue ? "white" : "bloobirds",
        onClick: () => {
          setConferencingGoogleMeet(!conferencingGoogleMeet);
          conferencingOnChange(!conferencingValue);
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 61,
    columnNumber: 5
  }, void 0);
};
_s(ConferencingForm, "Z5StEIj9bK0jSAfY0WtF2H06BXc=", false, function() {
  return [useCalendar, useFormContext, useController, useTranslation];
});
_c = ConferencingForm;
var _c;
$RefreshReg$(_c, "ConferencingForm");
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

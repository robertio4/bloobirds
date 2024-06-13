import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-scheduleEmailModal-scheduleEmailModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/scheduleEmailModal/scheduleEmailModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/scheduleEmailModal/scheduleEmailModal.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, DateTimeShortcut, Icon, IconButton, Item, Modal, Section, Select, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useTimeZones, useUserTimeZone } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { getTextFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport7_lodash_groupBy from "/vendor/.vite-deps-lodash_groupBy.js__v--c39aff61.js"; const groupBy = __vite__cjsImport7_lodash_groupBy.__esModule ? __vite__cjsImport7_lodash_groupBy.default : __vite__cjsImport7_lodash_groupBy;
import { compose } from "/vendor/.vite-deps-redux.js__v--b0a0de7c.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import { useEmailMatching } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-hooks-index.ts.js";
import CustomDateDialog from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-scheduleEmailModal-customDateDialog-customDateDialog.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-scheduleEmailModal-scheduleEmailModal.module.css.js";
import { getLocationFromTimeZone } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-scheduleEmailModal-scheduleEmailModal.utils.js.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const removeContinent = (value) => value?.replace(/\s([A-z]*)\//, " ");
const replaceUnderscores = (value) => value?.replace("_", ":");
const cleanTimezoneName = compose(removeContinent, replaceUnderscores);
const ScheduleEmailModal = ({
  emails,
  onSubmit,
  onClose
}) => {
  _s();
  const userTimeZone = useUserTimeZone();
  const timezonesList = useTimeZones();
  const allTimeZones = timezonesList || [];
  const {
    company,
    lead,
    isLoading
  } = useEmailMatching(emails);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.components.scheduleEmailModal"
  });
  const [selectedTimeZone, setSelectedTimeZone] = useState(userTimeZone);
  const [customDateVisible, setCustomDateVisible] = useState(false);
  const leadTimeZone = getLocationFromTimeZone(getTextFromLogicRole(lead, "LEAD__TIME_ZONE"));
  const companyTimeZone = getLocationFromTimeZone(getTextFromLogicRole(company, "COMPANY__TIME_ZONE"));
  useEffect(() => {
    if (leadTimeZone) {
      setSelectedTimeZone(leadTimeZone);
    } else if (companyTimeZone) {
      setSelectedTimeZone(companyTimeZone);
    } else {
      setSelectedTimeZone(userTimeZone);
    }
  }, [leadTimeZone, companyTimeZone, userTimeZone]);
  const tomorrowMorning = spacetime().goto(selectedTimeZone).startOf("day").add(1, "day").add(8, "hour").goto("utc").toNativeDate();
  const tomorrowAfternoon = spacetime().goto(selectedTimeZone).startOf("day").add(1, "day").add(16, "hour").goto("utc").toNativeDate();
  const handleSubmit = async (date) => {
    setCustomDateVisible(false);
    await onSubmit({
      date,
      timezone: selectedTimeZone
    });
  };
  if (isLoading) {
    return null;
  }
  if (customDateVisible) {
    return /* @__PURE__ */ _jsxDEV(CustomDateDialog, {
      onCancel: () => setCustomDateVisible(false),
      onSubmit: async (date) => {
        const offsetDate = spacetime().goto(selectedTimeZone).year(date.getFullYear()).month(date.getMonth()).date(date.getDate()).hour(date.getHours()).minute(date.getMinutes()).toNativeDate();
        await handleSubmit(offsetDate);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }, void 0);
  }
  const continentTimeZones = groupBy(allTimeZones, ({
    location
  }) => location.split("/")[0].trim());
  return /* @__PURE__ */ _jsxDEV(Modal, {
    className: styles.modal,
    open: true,
    onClose,
    children: [/* @__PURE__ */ _jsxDEV("header", {
      className: styles.header,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "xl",
        children: t("title")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 113,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
        size: 40,
        name: "cross",
        color: "bloobirds",
        onClick: onClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("main", {
      className: styles.content,
      children: [/* @__PURE__ */ _jsxDEV(Select, {
        width: "100%",
        borderless: false,
        value: selectedTimeZone,
        onChange: setSelectedTimeZone,
        size: "small",
        autocomplete: true,
        children: [leadTimeZone && /* @__PURE__ */ _jsxDEV(Section, {
          id: "lead-timezone",
          children: t("leadTimezone")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 125,
          columnNumber: 28
        }, void 0), leadTimeZone && /* @__PURE__ */ _jsxDEV(Item, {
          section: "lead-timezone",
          label: leadTimeZone,
          value: leadTimeZone,
          children: cleanTimezoneName(allTimeZones.find(({
            location
          }) => location === leadTimeZone)?.name)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 127,
          columnNumber: 13
        }, void 0), companyTimeZone && /* @__PURE__ */ _jsxDEV(Section, {
          id: "company-timezone",
          children: t("companyTimezone")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 133,
          columnNumber: 31
        }, void 0), companyTimeZone && /* @__PURE__ */ _jsxDEV(Item, {
          section: "company-timezone",
          label: companyTimeZone,
          value: companyTimeZone,
          children: cleanTimezoneName(allTimeZones.find(({
            location
          }) => location === companyTimeZone)?.name)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 135,
          columnNumber: 13
        }, void 0), userTimeZone && /* @__PURE__ */ _jsxDEV(Section, {
          id: "my-timezone",
          children: t("myTimezone")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 141,
          columnNumber: 28
        }, void 0), userTimeZone && /* @__PURE__ */ _jsxDEV(Item, {
          section: "my-timezone",
          label: userTimeZone,
          value: userTimeZone,
          children: cleanTimezoneName(allTimeZones.find(({
            location
          }) => location === userTimeZone)?.name)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 143,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Section, {
          id: "america-timezone",
          children: t("america")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 149,
          columnNumber: 11
        }, void 0), continentTimeZones["America"]?.map(({
          location,
          name
        }) => /* @__PURE__ */ _jsxDEV(Item, {
          section: "america-timezone",
          label: location,
          value: location,
          children: cleanTimezoneName(name)
        }, location, false, {
          fileName: _jsxFileName,
          lineNumber: 151,
          columnNumber: 13
        }, void 0)), /* @__PURE__ */ _jsxDEV(Section, {
          id: "europe-timezone",
          children: t("europe")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 155,
          columnNumber: 11
        }, void 0), continentTimeZones["Europe"]?.map(({
          location,
          name
        }) => /* @__PURE__ */ _jsxDEV(Item, {
          section: "europe-timezone",
          label: location,
          value: location,
          children: cleanTimezoneName(name)
        }, location, false, {
          fileName: _jsxFileName,
          lineNumber: 157,
          columnNumber: 13
        }, void 0)), /* @__PURE__ */ _jsxDEV(Section, {
          id: "africa-timezone",
          children: t("africa")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 161,
          columnNumber: 11
        }, void 0), continentTimeZones["Africa"]?.map(({
          location,
          name
        }) => /* @__PURE__ */ _jsxDEV(Item, {
          section: "africa-timezone",
          label: location,
          value: location,
          children: cleanTimezoneName(name)
        }, location, false, {
          fileName: _jsxFileName,
          lineNumber: 163,
          columnNumber: 13
        }, void 0)), /* @__PURE__ */ _jsxDEV(Section, {
          id: "asia-timezone",
          children: t("asia")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 167,
          columnNumber: 11
        }, void 0), continentTimeZones["Asia"]?.map(({
          location,
          name
        }) => /* @__PURE__ */ _jsxDEV(Item, {
          section: "asia-timezone",
          label: location,
          value: location,
          children: cleanTimezoneName(name)
        }, location, false, {
          fileName: _jsxFileName,
          lineNumber: 169,
          columnNumber: 13
        }, void 0)), /* @__PURE__ */ _jsxDEV(Section, {
          id: "australia-timezone",
          children: t("australia")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 173,
          columnNumber: 11
        }, void 0), continentTimeZones["Australia"]?.map(({
          location,
          name
        }) => /* @__PURE__ */ _jsxDEV(Item, {
          section: "australia-timezone",
          label: location,
          value: location,
          children: cleanTimezoneName(name)
        }, location, false, {
          fileName: _jsxFileName,
          lineNumber: 175,
          columnNumber: 13
        }, void 0)), /* @__PURE__ */ _jsxDEV(Section, {
          id: "antarctica-timezone",
          children: t("antarctica")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 179,
          columnNumber: 11
        }, void 0), continentTimeZones["Antarctica"]?.map(({
          location,
          name
        }) => /* @__PURE__ */ _jsxDEV(Item, {
          section: "antarctica-timezone",
          label: location,
          value: location,
          children: cleanTimezoneName(name)
        }, location, false, {
          fileName: _jsxFileName,
          lineNumber: 181,
          columnNumber: 13
        }, void 0))]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 117,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("section", {
        className: styles.timezones,
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: "timezones",
          size: 24,
          color: "softBloobirds"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 187,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          weight: "medium",
          color: "peanut",
          children: t("dateTimeFromSelectedTimezone")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 188,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 186,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.shortcuts,
        children: [/* @__PURE__ */ _jsxDEV(DateTimeShortcut, {
          timezone: selectedTimeZone,
          text: t("tomorrowMorning"),
          date: tomorrowMorning,
          onClick: handleSubmit
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 193,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(DateTimeShortcut, {
          timezone: selectedTimeZone,
          text: t("tomorrowAfternoon"),
          date: tomorrowAfternoon,
          onClick: handleSubmit
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 199,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 192,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
        className: styles.customButton,
        expand: true,
        variant: "tertiary",
        uppercase: true,
        iconLeft: "calendar",
        onClick: () => setCustomDateVisible(true),
        children: t("selectDateAndTime")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 206,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 111,
    columnNumber: 5
  }, void 0);
};
_s(ScheduleEmailModal, "AsvQ2/t19n2zqmWOj0FXYd6FrA4=", false, function() {
  return [useUserTimeZone, useTimeZones, useEmailMatching, useTranslation];
});
_c = ScheduleEmailModal;
export default ScheduleEmailModal;
var _c;
$RefreshReg$(_c, "ScheduleEmailModal");
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

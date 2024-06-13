import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/activityFeed/activityFeedWrapper.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/activityFeed/activityFeedWrapper.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/activityFeed/activityFeedWrapper.tsx", _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { NewActivityFeed, useActivityFeed, ActivityFeedUserFilter, MagicFilter, PastActivityLeadFilter, PastActivityTypeFilter } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-activityFeed-dist-index.js.js";
import { Button, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCustomTasks, useMinimizableModals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE, ACTIVITY_TYPES_VALUES_LOGIC_ROLE, BOBJECT_TYPES, BobjectTypes, COMPANY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, MIXPANEL_EVENTS, OPPORTUNITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getFieldByLogicRole, getRelatedBobject, getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport10_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport10_mixpanelBrowser.__esModule ? __vite__cjsImport10_mixpanelBrowser.default : __vite__cjsImport10_mixpanelBrowser;
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import { useSubscribeListeners } from "/src/content/components/contactView/hooks/useSubscribeListeners.tsx.js";
import styles from "/src/content/components/contactView/components/activityFeed/activityFeed.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ActivityFeedWrapper = ({
  parentRef,
  bobject
}) => {
  _s3();
  var _s = $RefreshSig$(), _s2 = $RefreshSig$();
  const bobjectType = bobject?.id?.typeName;
  const isLeadPage = bobjectType === BobjectTypes.Lead;
  const [showTypeFilters, setShowTypeFilters] = useState(false);
  const {
    filters,
    setFilters,
    resetTypeFilter,
    activeMagicFilter,
    setActiveMagicFilter,
    newActivityFeedData,
    newActivitiesLoading,
    fetchNextPage
  } = useActivityFeed({
    activeBobject: bobject,
    subscribeMutator: _s((value) => {
      _s();
      return useSubscribeListeners(bobjectType, value);
    }, "5lh/oNeJ/Om59rFVq7iZrhvEvPs=", false, function() {
      return [useSubscribeListeners];
    })
  });
  const {
    minimizableModals
  } = useMinimizableModals();
  const {
    useGetDataModel,
    useGetActiveBobject,
    setExtendedContext,
    useGetActiveBobjectContext,
    useGetSidePeekEnabled,
    useGetExtendedContext,
    closeExtendedScreen
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const dataModel = useGetDataModel();
  const activeBobject = useGetActiveBobject();
  const data = useGetActiveBobjectContext();
  const leads = data?.leads || [];
  const leadsAvailable = leads.map((lead) => ({
    id: lead?.id.value,
    name: lead?.fullName
  }));
  const {
    actionsDisabled
  } = useContactViewContext();
  const [enabledArrowNavigation, setEnabledArrowNavigation] = useState(true);
  const [selectedLead, setSelectedLead] = useState();
  const defaultLeadValue = activeBobject?.id?.typeName === BobjectTypes.Lead ? [activeBobject?.id?.value] : leadsAvailable?.map((l) => l?.id);
  const extendedContext = useGetExtendedContext();
  const {
    getCustomTaskLogicRole
  } = useCustomTasks();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "activityTimelineItem.activityFeed"
  });
  useEffect(() => {
    resetTypeFilter();
    setActiveMagicFilter(false);
    setSelectedLead(filters?.lead?.length !== 0 ? filters?.lead : defaultLeadValue);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const elementsDisabledArrowNavigation = document.querySelectorAll("#floating-menu div[role=textbox]");
      const handleFocus = () => {
        setEnabledArrowNavigation(false);
      };
      const handleBlur = () => {
        setEnabledArrowNavigation(true);
      };
      elementsDisabledArrowNavigation.forEach((element) => {
        element.addEventListener("focus", handleFocus);
        element.addEventListener("blur", handleBlur);
      });
      return () => {
        elementsDisabledArrowNavigation.forEach((element) => {
          element.removeEventListener("focus", handleFocus);
          element.removeEventListener("blur", handleBlur);
        });
      };
    }, 500);
  }, [extendedContext]);
  useEffect(() => {
    setEnabledArrowNavigation(!(minimizableModals?.length > 0));
  }, [minimizableModals]);
  const handleOnClick = async (activity) => {
    const activityType = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)?.valueLogicRole;
    const threadId = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_THREAD_ID);
    const lead = getRelatedBobject(activity, BOBJECT_TYPES.LEAD);
    const company = getRelatedBobject(activity, BOBJECT_TYPES.COMPANY);
    const opportunity = getRelatedBobject(activity, BOBJECT_TYPES.OPPORTUNITY);
    const activityBody = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
    const bobjectFieldsData = {};
    activity.fields.forEach((field) => {
      bobjectFieldsData[field.logicRole || field.name] = field.value;
    });
    const activityMainNoteYes = dataModel?.findValueByLogicRole(ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.YES);
    const isMainNote = bobjectFieldsData[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE] === activityMainNoteYes?.id;
    mixpanel.track(MIXPANEL_EVENTS.CLICK_IN_ACTIVITY_FROM_FEED_OTO);
    switch (activityType) {
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
        setExtendedContext({
          type: ExtendedContextTypes.EMAIL_THREAD,
          threadId,
          bobjectId: activity?.id,
          bobject: activity,
          actionsDisabled
        });
        break;
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
        if (activityBody)
          setExtendedContext({
            type: ExtendedContextTypes.LINKEDIN_THREAD,
            bobject: activity,
            actionsDisabled
          });
        break;
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK: {
        const customActivityType = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
        const customTaskLogicRole = getCustomTaskLogicRole(customActivityType?.value);
        switch (customTaskLogicRole) {
          case "WHATSAPP":
            setExtendedContext({
              type: ExtendedContextTypes.WHATSAPP_THREAD,
              bobject: activity
            });
            break;
          case "WHATSAPP_BUSINESS":
            setExtendedContext({
              type: ExtendedContextTypes.WHATSAPP_BUSINESS_THREAD,
              bobject: activity
            });
            break;
          default:
            break;
        }
        break;
      }
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
        setExtendedContext({
          type: ExtendedContextTypes.MEETING_DETAILS,
          threadId,
          bobject: activity,
          actionsDisabled
        });
        break;
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
        setExtendedContext({
          type: ExtendedContextTypes.CALL_DETAILS,
          threadId,
          bobject: activity,
          actionsDisabled
        });
        break;
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
        setExtendedContext({
          type: ExtendedContextTypes.INBOUND_ACTIVITY,
          threadId,
          bobject: activity
        });
        break;
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
        setExtendedContext({
          type: ExtendedContextTypes.NOTE_DETAILS,
          bobject: activity,
          actionsDisabled,
          extraInfo: {
            lead: lead && {
              ...lead,
              fullName: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME)
            },
            company: company && {
              ...company,
              name: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME)
            },
            opportunity: opportunity && {
              ...opportunity,
              name: getValueFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME)
            },
            bobjectId: activity?.id?.value,
            originallyMainNote: isMainNote,
            location: "bubble",
            ...bobjectFieldsData
          }
        });
        break;
      default:
        closeExtendedScreen();
        break;
    }
  };
  const headerClasses = clsx(styles.header_container, {
    [styles.header_container_sidePeek]: sidePeekEnabled
  });
  function setTypeFilter(value) {
    setFilters({
      ...filters,
      type: value,
      activeBobjectId: activeBobject?.id?.value
    });
  }
  function setLeadFilter(value) {
    setFilters({
      ...filters,
      lead: value,
      activeBobjectId: activeBobject?.id?.value
    });
  }
  function setUserFilter(value) {
    setFilters({
      ...filters,
      user: value,
      activeBobjectId: activeBobject?.id?.value
    });
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: headerClasses,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.left_header,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          weight: "bold",
          className: sidePeekEnabled && styles.title_sidePeek,
          children: t("title")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 264,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
          iconLeft: "slidersHor",
          size: "small",
          onClick: () => {
            setShowTypeFilters(!showTypeFilters);
          },
          color: activeMagicFilter ? "softPeanut" : "bloobirds",
          variant: showTypeFilters ? "primary" : "clear",
          disabled: activeMagicFilter
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 272,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 263,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.right_header,
        children: [/* @__PURE__ */ _jsxDEV(ActivityFeedUserFilter, {
          selectedUser: filters.user,
          setUserFilter
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 284,
          columnNumber: 11
        }, void 0), !isLeadPage && /* @__PURE__ */ _jsxDEV(PastActivityLeadFilter, {
          setLeadFilter,
          leadsAvailable,
          selectedLead,
          setSelectedLead,
          isSEE: false
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 286,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(MagicFilter, {
          isDisabled: filters.type?.length !== 0,
          magicFilterHandling: [activeMagicFilter, () => {
            setShowTypeFilters(false);
            setActiveMagicFilter(!activeMagicFilter);
          }]
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 294,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 283,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 262,
      columnNumber: 7
    }, void 0), showTypeFilters && /* @__PURE__ */ _jsxDEV(PastActivityTypeFilter, {
      filters,
      setTypeFilter,
      sidePeekEnabled
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 307,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV(NewActivityFeed, {
      newActivityFeedData,
      newActivitiesLoading,
      fetchNextPage,
      activeBobject,
      enabledArrowNavigation,
      handleOnClick,
      parentRef,
      estimateSize: 45,
      actionsDisabled,
      sidePeekEnabled,
      selectedItem: extendedContext?.bobject?.id.value,
      subscribeMutator: _s2((mutator) => {
        _s2();
        return useSubscribeListeners(activeBobject?.id?.typeName, mutator);
      }, "5lh/oNeJ/Om59rFVq7iZrhvEvPs=", false, function() {
        return [useSubscribeListeners];
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 313,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 261,
    columnNumber: 5
  }, void 0);
};
_s3(ActivityFeedWrapper, "zIwpSC8JOPTEoFjvIG5aINCpW/0=", true, function() {
  return [useActivityFeed, useMinimizableModals, useExtensionContext, useContactViewContext, useCustomTasks, useTranslation];
});
_c = ActivityFeedWrapper;
var _c;
$RefreshReg$(_c, "ActivityFeedWrapper");
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

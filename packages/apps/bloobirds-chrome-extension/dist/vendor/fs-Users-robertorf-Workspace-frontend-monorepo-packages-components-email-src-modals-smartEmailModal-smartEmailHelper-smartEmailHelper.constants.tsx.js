var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/smartEmailHelper.constants.tsx", _s2 = $RefreshSig$();
import { PastActivityTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-activityFeed-dist-index.js.js";
import { useSubscribeListeners } from "/src/content/components/contactView/hooks/useSubscribeListeners.tsx.js";
import { useObjectCreationSettings, useIsB2CAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { BobjectTypes, DateFilterValues, SmartEmailTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { useSmartEmailModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.tsx.js";
import { CalendarTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-calendarTab-calendarTab.tsx.js";
import { CreateLeadTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-createLeadTab-createLeadTab.tsx.js";
import { CreateTaskTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-createTaskTab-createTaskTab.tsx.js";
import { PreviewTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-previewTab-previewTab.tsx.js";
import { SimilarDealsTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-similarDealsTab-similarDealsTab.tsx.js";
import { TemplatesTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-templatesTab-templatesTab.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const emailHelperTabs = (parentRef, tabProps) => {
  _s2();
  var _s = $RefreshSig$();
  const {
    newLeadInfo
  } = useSmartEmailModal();
  const {
    enabledObjectCreation
  } = useObjectCreationSettings();
  const isB2CAccount = useIsB2CAccount();
  const {
    dataModel,
    user,
    selectedActivity,
    setSelectedActivity,
    activeBobject,
    opportunity,
    pageBobjectType,
    filters,
    setFilters,
    company,
    leads,
    accountId
  } = useSmartEmailModal();
  return {
    [SmartEmailTab.PREVIEW]: {
      title: "Preview",
      icon: "eye",
      dataTest: "previewTab",
      key: "previewTab",
      tab: /* @__PURE__ */ _jsxDEV(PreviewTab, {
        previewTabProps: tabProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 12
      }, void 0),
      visible: true
    },
    [SmartEmailTab.PAST_ACTIVITY]: {
      title: "Past Activity",
      dataTest: "pastActivityTab",
      key: "pastActivityTab",
      icon: "historyNonFlipped",
      tab: /* @__PURE__ */ _jsxDEV(PastActivityTab, {
        ref: parentRef,
        accountId,
        dataModel,
        user,
        selectedActivity,
        setSelectedActivity,
        subscribeMutator: _s((mutator) => {
          _s();
          return useSubscribeListeners(BobjectTypes.Activity, mutator);
        }, "5lh/oNeJ/Om59rFVq7iZrhvEvPs=", false, function() {
          return [useSubscribeListeners];
        }),
        data: {
          activeBobject,
          opportunity,
          pageBobjectType,
          filters,
          setFilters,
          company,
          leads
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 9
      }, void 0),
      visible: true
    },
    ...isB2CAccount ? {} : {
      [SmartEmailTab.CLOSED_DEALS]: {
        title: "Similar won deals",
        dataTest: "similarWonDealsTab",
        key: "similarWonDealsTab",
        icon: "fileOpportunity",
        tab: /* @__PURE__ */ _jsxDEV(SimilarDealsTab, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 92,
          columnNumber: 18
        }, void 0),
        visible: true,
        workInProgress: false
      }
    },
    [SmartEmailTab.TEMPLATES]: {
      title: "Templates & Snippets",
      dataTest: "templatesTab",
      key: "templatesTab",
      icon: "file",
      tab: /* @__PURE__ */ _jsxDEV(TemplatesTab, {
        tabProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 12
      }, void 0),
      visible: true,
      workInProgress: false
    },
    [SmartEmailTab.CREATE_TASK]: {
      title: "New Task",
      dataTest: "createTaskTab",
      key: "createTaskTab",
      icon: "checkDouble",
      tab: /* @__PURE__ */ _jsxDEV(CreateTaskTab, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 111,
        columnNumber: 12
      }, void 0),
      visible: true
    },
    [SmartEmailTab.CREATE_LEAD]: {
      title: "Create Lead",
      dataTest: "createLeadTab",
      key: "createLeadTab",
      icon: "personAdd",
      tab: /* @__PURE__ */ _jsxDEV(CreateLeadTab, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 119,
        columnNumber: 12
      }, void 0),
      visible: newLeadInfo?.email !== void 0 && enabledObjectCreation
    },
    [SmartEmailTab.CALENDAR]: {
      title: "Calendar",
      dataTest: "calendarTab",
      key: "calendarTab",
      icon: "calendar",
      tab: /* @__PURE__ */ _jsxDEV(CalendarTab, {
        tabProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 127,
        columnNumber: 12
      }, void 0),
      visible: true
    }
  };
};
_s2(emailHelperTabs, "nbLMl+qXL4RwIVZjnYGJVbs2ZEA=", false, function() {
  return [useSmartEmailModal, useObjectCreationSettings, useIsB2CAccount, useSmartEmailModal];
});
export const PAST_ACTIVITY_FILTERS = [{
  label: "Calls",
  value: "ACTIVITY__TYPE__CALL"
}, {
  label: "Emails",
  value: "ACTIVITY__TYPE__EMAIL"
}, {
  label: "Meetings",
  value: "ACTIVITY__TYPE__MEETING"
}, {
  label: "LinkedIn",
  value: "ACTIVITY__TYPE__LINKEDIN_MESSAGE"
}, {
  label: "Inbound",
  value: "ACTIVITY__TYPE__INBOUND"
}];
export const emailHelperFilterItems = ["All", "All files", "PDFs", "Images", "Links", "Snippets"];
export const pastActivityFilterItems = ["All", "Calls", "Emails", "Meetings", "Linkedin", "Inbound"];
export const DATE_FILTER_DAY_VALUES = {
  [DateFilterValues.LAST_30_DAYS]: 30,
  [DateFilterValues.LAST_90_DAYS]: 90,
  [DateFilterValues.LAST_180_DAYS]: 180,
  [DateFilterValues.LAST_YEAR]: 365,
  [DateFilterValues.ALL_TIME]: 1e4
};
export const DATE_FILTER_VALUES = [{
  value: DateFilterValues.LAST_30_DAYS,
  label: "Last 30 days"
}, {
  value: DateFilterValues.LAST_90_DAYS,
  label: "Last 3 months"
}, {
  value: DateFilterValues.LAST_180_DAYS,
  label: "Last 6 months"
}, {
  value: DateFilterValues.LAST_YEAR,
  label: "Last year"
}, {
  value: DateFilterValues.ALL_TIME,
  label: "All time"
}];

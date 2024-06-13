import { getI18nSpacetimeLng } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  BobjectTypes,
  MatchRows,
  CUSTOM_TASK_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
  toSentenceCase,
  api,
  injectReferencesGetProcess
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
const getBaseQuery = (time) => ({
  [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: {
    query: {
      lte: time
    },
    searchMode: "RANGE__SEARCH"
  },
  [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [
    ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING,
    ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL,
    ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND,
    ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN,
    ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL,
    ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK
  ]
});
export function getActivityTypeProps(type, isWhatsApp, t) {
  switch (type) {
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
      return {
        title: t("tasksTitles.call"),
        color: "extraCall",
        iconName: "phone"
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
      return {
        title: t("tasksTitles.meeting"),
        color: "extraMeeting",
        iconName: "calendar"
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
      return {
        title: t("tasksTitles.email"),
        color: "tangerine",
        iconName: "mail"
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
      return {
        title: t("tasksTitles.inbound"),
        color: "softBanana",
        iconName: "inbox"
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return {
        title: t("tasksTitles.linkedin"),
        color: "darkBloobirds",
        iconName: "linkedin"
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
      return isWhatsApp ? {
        title: t("tasksTitles.whatsapp"),
        color: "extraCall",
        iconName: "whatsapp"
      } : { title: t("tasksTitles.customActivity"), color: "grape", iconName: null };
    default:
      return {
        title: t("tasksTitles.other"),
        color: "bloobirds",
        iconName: null
      };
  }
}
const queries = (bobjectIdFields, leadIds, companyId = null) => ({
  Company: [
    leadIds && {
      [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: leadIds
    },
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [bobjectIdFields.value]
    }
  ],
  Lead: [
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: [bobjectIdFields.value]
    }
  ],
  Opportunity: [
    (leadIds || []).length > 0 && {
      [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: leadIds
    },
    { [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [bobjectIdFields.value] },
    companyId && {
      [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: MatchRows.EMPTY,
      [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [bobjectIdFields.value],
      [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: companyId
    }
  ]
});
export function getQuery(bobjectIdFields, leadIds, companyId = null, time = new Date()) {
  const bobjectType = bobjectIdFields.typeName;
  switch (bobjectType) {
    case BobjectTypes.Lead:
      return {
        query: {
          [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: [bobjectIdFields.value],
          ...getBaseQuery(time)
        },
        queries: queries(bobjectIdFields, leadIds)[bobjectIdFields?.typeName].filter(Boolean)
      };
    case BobjectTypes.Company:
      return {
        query: {
          [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [bobjectIdFields.value],
          ...getBaseQuery(time)
        },
        queries: queries(bobjectIdFields, leadIds)[bobjectIdFields?.typeName].filter(Boolean)
      };
    case BobjectTypes.Opportunity:
      return {
        query: getBaseQuery(time),
        queries: queries(bobjectIdFields, leadIds, companyId)[bobjectIdFields?.typeName].filter(
          Boolean
        )
      };
    default:
      return {};
  }
}
export function getType(activity, isWhatsApp, isWhatsappBusiness) {
  const type = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)?.valueLogicRole;
  switch (type) {
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
      return ExtendedContextTypes.CALL_DETAILS;
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
      return ExtendedContextTypes.MEETING_DETAILS;
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
      return ExtendedContextTypes.EMAIL_THREAD;
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
      return ExtendedContextTypes.NOTE_DETAILS;
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
      return ExtendedContextTypes.INBOUND_ACTIVITY;
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return ExtendedContextTypes.LINKEDIN_THREAD;
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
      return isWhatsApp ? ExtendedContextTypes.WHATSAPP_THREAD : isWhatsappBusiness ? ExtendedContextTypes.WHATSAPP_BUSINESS_THREAD : null;
    default:
      return ExtendedContextTypes.CALL_DETAILS;
  }
}
export function parseLastActivity(lastActivity, tHook, getCustomTaskLogicRole, openExtendedScreen) {
  const [activity] = lastActivity;
  const activityDate = new Date(getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
  const { t, i18n } = tHook;
  const lang = i18n.language;
  const customActivityType = getValueFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK
  );
  const customTaskLogicRole = getCustomTaskLogicRole(customActivityType);
  const isWhatsappBusiness = customTaskLogicRole === CUSTOM_TASK_LOGIC_ROLE.WHATSAPP_BUSINESS;
  const isWhatsApp = customTaskLogicRole === CUSTOM_TASK_LOGIC_ROLE.WHATSAPP;
  return {
    onClick: () => {
      api.get("/bobjects/" + lastActivity?.[0]?.id?.value + "/form?injectReferences=true").then(({ data: activity2 }) => {
        const activityFilled = injectReferencesGetProcess(activity2);
        openExtendedScreen(
          !(isWhatsApp || isWhatsappBusiness) && customActivityType ? null : {
            type: getType(activityFilled, isWhatsApp, isWhatsappBusiness),
            bobject: activityFilled
          }
        );
      });
    },
    timeInfo: {
      title: toSentenceCase(
        getI18nSpacetimeLng(lang, new Date()).since(getI18nSpacetimeLng(lang, activityDate)).rounded ?? ""
      ),
      color: "bloobirds",
      subtitle: t("sidePeek.overview.lastActivity.since")
    },
    activityInfo: {
      ...getActivityTypeProps(
        getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)?.valueLogicRole,
        isWhatsApp || isWhatsappBusiness,
        t
      ),
      subtitle: t("sidePeek.overview.lastActivity.lastContact")
    }
  };
}

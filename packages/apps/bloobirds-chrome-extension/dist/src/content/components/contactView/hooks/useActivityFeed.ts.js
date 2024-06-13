import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import { useUserHelpers, useNewActivityFeed, useUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  BobjectTypes,
  magicFilterORs,
  MatchRows,
  REPORTED_VALUES_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  COMPANY_FIELDS_LOGIC_ROLE,
  UserPermission,
  OPPORTUNITY_FIELDS_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, injectReferencesSearchProcess, keepPreviousResponse } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { endOfDay } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import __vite__cjsImport5_lodash_isEqual from "/vendor/.vite-deps-lodash_isEqual.js__v--1a3ee503.js"; const isEqual = __vite__cjsImport5_lodash_isEqual.__esModule ? __vite__cjsImport5_lodash_isEqual.default : __vite__cjsImport5_lodash_isEqual;
import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { BASE_SEARCH_REQUEST } from "/src/content/components/extensionLeftBar/components/views/view.utils.tsx.js";
import { useSubscribeListeners } from "/src/content/components/contactView/hooks/useSubscribeListeners.tsx.js";
const activityTypes = [
  ACTIVITY_TYPES.CALL,
  ACTIVITY_TYPES.EMAIL,
  ACTIVITY_TYPES.LINKEDIN,
  ACTIVITY_TYPES.MEETING,
  ACTIVITY_TYPES.NOTE,
  ACTIVITY_TYPES.INBOUND,
  ACTIVITY_TYPES.CUSTOM_TASK,
  "ACTIVITY__TYPE__CADENCE"
];
const ACTIVITY_COLUMNS = [
  ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
  ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT,
  ACTIVITY_FIELDS_LOGIC_ROLE.INBOUND_FORM_NAME,
  ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY,
  ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE.NOTE,
  ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
  ACTIVITY_FIELDS_LOGIC_ROLE.TITLE,
  ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHED_FILES,
  ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHMENTS,
  ACTIVITY_FIELDS_LOGIC_ROLE.IS_BOUNCED_EMAIL,
  ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION,
  ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION,
  ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_METADATA,
  ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL,
  ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT,
  ACTIVITY_FIELDS_LOGIC_ROLE.CADENCE,
  ACTIVITY_FIELDS_LOGIC_ROLE.CADENCE_TYPE,
  ACTIVITY_FIELDS_LOGIC_ROLE.STATUS_TITLE,
  ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK,
  ACTIVITY_FIELDS_LOGIC_ROLE.LEAD,
  ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY,
  ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY
];
const ACTIVITY_REFERENCED_COLUMNS = [
  COMPANY_FIELDS_LOGIC_ROLE.NAME,
  COMPANY_FIELDS_LOGIC_ROLE.CADENCE,
  LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
  LEAD_FIELDS_LOGIC_ROLE.CADENCE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.CADENCE
];
const PAGE_SIZE = 25;
const activitiesFilterAtom = atom({
  key: "activityTypeFilterAtom",
  default: {
    type: [],
    lead: []
  }
});
const activeMagicFilterAtom = atom({
  key: "activeMagicFilterAtom-old",
  default: false
});
export const useActivityFeed = () => {
  const [page, setPage] = useState(1);
  const { useGetActiveBobject, useGetActiveBobjectContext } = useExtensionContext();
  const settings = useUserSettings();
  const user = settings?.user;
  const accountId = settings?.account.id;
  const hasNewActivityFeed = useNewActivityFeed(accountId);
  const canSeeOthersActivities = user?.permissions?.includes(
    UserPermission.USER_ACTIVITY_VISIBILITY
  );
  const activeBobject = useGetActiveBobject();
  const { helpers } = useUserHelpers();
  const activityVisibleFilters = helpers?.["ACTIVITY_FILTERS"] ? JSON.parse(helpers?.["ACTIVITY_FILTERS"])?.filter((i) => i) : activityTypes;
  const contextData = useGetActiveBobjectContext();
  const [filters, setFilters] = useRecoilState(activitiesFilterAtom);
  const [activeMagicFilter, setActiveMagicFilter] = useRecoilState(activeMagicFilterAtom);
  const fetchNextPage = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    mutate();
    setPage((prevState) => {
      return hasNewActivityFeed ? 1 : prevState;
    });
  }, [filters, activeMagicFilter]);
  const query = {
    Company: {
      [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [activeBobject.id.value]
    },
    Lead: {
      [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: [activeBobject.id.value]
    },
    Opportunity: {
      [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [activeBobject.id.value]
    }
  };
  const queries = {
    [BobjectTypes.Company]: [
      contextData?.leads && {
        [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: filters.lead?.length !== 0 ? filters.lead : contextData?.leads?.map((lead) => lead?.id?.value)
      },
      {
        [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [activeBobject?.id.value]
      }
    ],
    [BobjectTypes.Lead]: [
      {
        [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: filters.lead?.length !== 0 ? filters.lead : [activeBobject?.id.value]
      },
      contextData?.company && {
        [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: filters.lead?.length !== 0 ? filters.lead : [activeBobject?.id.value],
        [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [contextData?.company?.id?.value]
      }
    ],
    [BobjectTypes.Opportunity]: [
      {
        [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [activeBobject?.id.value]
      },
      activeBobject?.leads?.length > 0 && {
        [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: filters.lead?.length !== 0 ? filters.lead : activeBobject?.leads,
        [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: MatchRows.EMPTY
      }
    ]
  };
  const fetchActivities = () => {
    const filteredTypes = filters?.type;
    const bobjectQueries = queries[activeBobject?.id?.typeName]?.filter(Boolean);
    const bobjectQuery = query[activeBobject?.id?.typeName];
    return api.post("/bobjects/" + activeBobject.id.accountId + "/Activity/search", {
      query: {
        ...activeMagicFilter ? bobjectQuery : {
          [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: filteredTypes?.length !== 0 ? filteredTypes : activityVisibleFilters,
          ...!canSeeOthersActivities && { [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: user?.id }
        },
        ...!canSeeOthersActivities && { [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: user?.id }
      },
      page: 0,
      pageSize: page ? page * PAGE_SIZE : 1e3,
      sort: [
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
          direction: "DESC"
        }
      ],
      queries: activeMagicFilter ? magicFilterORs(activeBobject?.id?.typeName) : bobjectQueries,
      columns: ACTIVITY_COLUMNS,
      referencedColumns: ACTIVITY_REFERENCED_COLUMNS,
      ...BASE_SEARCH_REQUEST,
      trimBigBodies: true
    });
  };
  const { data, mutate, isValidating } = useSWR(
    contextData && `/activityFeed/${activeBobject?.id?.value}/${page}`,
    fetchActivities,
    {
      revalidateOnFocus: true,
      use: [keepPreviousResponse]
    }
  );
  const fetchMeetingActivities = () => {
    return api.post("/bobjects/" + activeBobject.id.accountId + "/Activity/search", {
      query: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: [
          REPORTED_VALUES_LOGIC_ROLE.NO,
          "__MATCH_EMPTY_ROWS__"
        ],
        [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE]: "__MATCH_FULL_ROWS__",
        [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: {
          query: {
            lte: endOfDay(new Date())
          },
          searchMode: "RANGE__SEARCH"
        },
        [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING,
        ...!canSeeOthersActivities && { [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: user?.id }
      },
      page: 0,
      pageSize: page ? page * PAGE_SIZE : 1e3,
      sort: [
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME,
          direction: "ASC"
        }
      ],
      queries: queries[activeBobject?.id?.typeName]?.filter(Boolean),
      columns: ACTIVITY_COLUMNS,
      referencedColumns: ACTIVITY_REFERENCED_COLUMNS,
      ...BASE_SEARCH_REQUEST
    });
  };
  const {
    data: meetingsData,
    mutate: mutateMeetingActivities,
    isValidating: isValidatingMeetings
  } = useSWR(`/${activeBobject?.id.value}/meetingActivities/${page}`, fetchMeetingActivities);
  const totalMatching = useMemo(() => data?.data?.totalMatching, [data]);
  useSubscribeListeners(activeBobject?.id?.typeName, mutate);
  return {
    data,
    isLoading: isValidating || isValidatingMeetings,
    activities: data && injectReferencesSearchProcess(data?.data)?.contents,
    meetingActivities: meetingsData && injectReferencesSearchProcess(meetingsData?.data)?.contents,
    mutateMeetingActivities,
    total: totalMatching,
    fetchNextPage,
    mutate,
    filters,
    setFilters,
    setTypeFilter: (value) => {
      if (!isEqual(value, filters.type)) {
        setFilters({ ...filters, type: value });
      }
    },
    setLeadFilter: (value) => {
      if (!isEqual(value, filters.lead)) {
        setFilters({ ...filters, lead: value });
      }
    },
    resetTypeFilter: () => {
      setFilters({ ...filters, type: [] });
    },
    activeMagicFilter,
    setActiveMagicFilter: (value) => {
      setActiveMagicFilter(value);
    }
  };
};

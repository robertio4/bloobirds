import { useEffect, useMemo, useState } from 'react';

import { useUserHelpers, useNewActivityFeed, useUserSettings } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  ExtensionBobject,
  ExtensionOpportunity,
  magicFilterORs,
  MatchRows,
  REPORTED_VALUES_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  COMPANY_FIELDS_LOGIC_ROLE,
  UserPermission,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { api, injectReferencesSearchProcess, keepPreviousResponse } from '@bloobirds-it/utils';
import { endOfDay } from 'date-fns';
import isEqual from 'lodash/isEqual';
import { atom, useRecoilState } from 'recoil';
import useSWR from 'swr';

import { useExtensionContext } from '../../context';
import { BASE_SEARCH_REQUEST } from '../../extensionLeftBar/components/views/view.utils';
import { useSubscribeListeners } from './useSubscribeListeners';

const activityTypes = [
  ACTIVITY_TYPES.CALL,
  ACTIVITY_TYPES.EMAIL,
  ACTIVITY_TYPES.LINKEDIN,
  ACTIVITY_TYPES.MEETING,
  ACTIVITY_TYPES.NOTE,
  ACTIVITY_TYPES.INBOUND,
  ACTIVITY_TYPES.CUSTOM_TASK,
  'ACTIVITY__TYPE__CADENCE',
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
  ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY,
];

const ACTIVITY_REFERENCED_COLUMNS = [
  COMPANY_FIELDS_LOGIC_ROLE.NAME,
  COMPANY_FIELDS_LOGIC_ROLE.CADENCE,
  LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
  LEAD_FIELDS_LOGIC_ROLE.CADENCE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.CADENCE,
];

const PAGE_SIZE = 25;

const activitiesFilterAtom = atom({
  key: 'activityTypeFilterAtom',
  default: {
    type: [],
    lead: [],
  },
});

const activeMagicFilterAtom = atom({
  key: 'activeMagicFilterAtom-old',
  default: false,
});

export const useActivityFeed = () => {
  const [page, setPage] = useState(1);
  const { useGetActiveBobject, useGetActiveBobjectContext } = useExtensionContext();
  const settings = useUserSettings();
  const user = settings?.user;
  const accountId = settings?.account.id;
  const hasNewActivityFeed = useNewActivityFeed(accountId);
  const canSeeOthersActivities = user?.permissions?.includes(
    UserPermission.USER_ACTIVITY_VISIBILITY,
  );
  const activeBobject = useGetActiveBobject();
  const { helpers } = useUserHelpers();
  const activityVisibleFilters = helpers?.['ACTIVITY_FILTERS']
    ? JSON.parse(helpers?.['ACTIVITY_FILTERS'])?.filter(i => i)
    : activityTypes;
  const contextData = useGetActiveBobjectContext();

  const [filters, setFilters] = useRecoilState(activitiesFilterAtom);
  const [activeMagicFilter, setActiveMagicFilter] = useRecoilState(activeMagicFilterAtom);

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    mutate();
    setPage(prevState => {
      return hasNewActivityFeed ? 1 : prevState;
    });
  }, [filters, activeMagicFilter]);

  const query = {
    Company: {
      [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [activeBobject.id.value],
    },

    Lead: {
      [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: [activeBobject.id.value],
    },

    Opportunity: {
      [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [activeBobject.id.value],
    },
  };

  const queries = {
    [BobjectTypes.Company]: [
      contextData?.leads && {
        [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]:
          filters.lead?.length !== 0
            ? filters.lead
            : contextData?.leads?.map(lead => lead?.id?.value),
      },
      {
        [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [activeBobject?.id.value],
      },
    ],
    [BobjectTypes.Lead]: [
      {
        [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]:
          filters.lead?.length !== 0 ? filters.lead : [activeBobject?.id.value],
      },
      contextData?.company && {
        [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]:
          filters.lead?.length !== 0 ? filters.lead : [activeBobject?.id.value],
        [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [contextData?.company?.id?.value],
      },
    ],
    // TODO: Take also the leads info to fetch the activities
    [BobjectTypes.Opportunity]: [
      {
        [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [activeBobject?.id.value],
      },

      (activeBobject as ExtensionOpportunity)?.leads?.length > 0 && {
        [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]:
          filters.lead?.length !== 0
            ? filters.lead
            : (activeBobject as ExtensionOpportunity)?.leads,
        [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: MatchRows.EMPTY,
      },
    ],
  };

  const fetchActivities = () => {
    const filteredTypes = filters?.type;
    const bobjectQueries = queries[activeBobject?.id?.typeName]?.filter(Boolean);
    const bobjectQuery = query[activeBobject?.id?.typeName];
    return api.post('/bobjects/' + activeBobject.id.accountId + '/Activity/search', {
      query: {
        ...(activeMagicFilter
          ? bobjectQuery
          : {
              [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]:
                filteredTypes?.length !== 0 ? filteredTypes : activityVisibleFilters,
              ...(!canSeeOthersActivities && { [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: user?.id }),
            }),
        ...(!canSeeOthersActivities && { [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: user?.id }),
      },
      page: 0,
      pageSize: page ? page * PAGE_SIZE : 1000,
      sort: [
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
          direction: 'DESC',
        },
      ],
      queries: activeMagicFilter ? magicFilterORs(activeBobject?.id?.typeName) : bobjectQueries,
      columns: ACTIVITY_COLUMNS,
      referencedColumns: ACTIVITY_REFERENCED_COLUMNS,
      ...BASE_SEARCH_REQUEST,
    });
  };

  const { data, mutate, isValidating } = useSWR(
    contextData && `/activityFeed/${activeBobject?.id?.value}/${page}`,
    fetchActivities,
    {
      revalidateOnFocus: true,
      use: [keepPreviousResponse],
    },
  );

  const fetchMeetingActivities = () => {
    return api.post('/bobjects/' + activeBobject.id.accountId + '/Activity/search', {
      query: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: [
          REPORTED_VALUES_LOGIC_ROLE.NO,
          '__MATCH_EMPTY_ROWS__',
        ],
        [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE]: '__MATCH_FULL_ROWS__',
        [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: {
          query: {
            lte: endOfDay(new Date()),
          },
          searchMode: 'RANGE__SEARCH',
        },
        [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING,
        ...(!canSeeOthersActivities && { [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: user?.id }),
      },
      page: 0,
      pageSize: page ? page * PAGE_SIZE : 1000,
      sort: [
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME,
          direction: 'ASC',
        },
      ],
      queries: queries[activeBobject?.id?.typeName]?.filter(Boolean),
      columns: ACTIVITY_COLUMNS,
      referencedColumns: ACTIVITY_REFERENCED_COLUMNS,
      ...BASE_SEARCH_REQUEST,
    });
  };

  const {
    data: meetingsData,
    mutate: mutateMeetingActivities,
    isValidating: isValidatingMeetings,
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
    setTypeFilter: (value: string[]) => {
      if (!isEqual(value, filters.type)) {
        setFilters({ ...filters, type: value });
      }
    },
    setLeadFilter: (value: Bobject[] | ExtensionBobject[]) => {
      if (!isEqual(value, filters.lead)) {
        setFilters({ ...filters, lead: value });
      }
    },
    resetTypeFilter: () => {
      setFilters({ ...filters, type: [] });
    },
    activeMagicFilter,
    setActiveMagicFilter: (value: any) => {
      setActiveMagicFilter(value);
    },
  };
};

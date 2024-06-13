import { useEffect, useMemo, useState } from 'react';

import { useSearchSubscription } from '@bloobirds-it/plover';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import {
  differenceInDays,
  endOfDay,
  startOfDay,
  subDays,
  injectReferencesSearchProcess,
} from '@bloobirds-it/utils';
import { isEqual } from 'lodash';
import {
  atom,
  DefaultValue,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  DATA_SOURCES,
} from '../../../constants/activity';
import { useEntity } from '../../../hooks';
import SessionManagerFactory from '../../../misc/session';
import { getFieldByLogicRole, getTextFromLogicRole } from '../../../utils/bobjects.utils';

const SessionManager = SessionManagerFactory();

const defaultDateFilter = {
  start: startOfDay(subDays(new Date(), 7)),
  end: endOfDay(new Date()),
};

const dateFilterAtom = atom({
  key: 'inboxLinkedinDateFilter',
  default: defaultDateFilter,
});

const activityUserFilterAtom = atom({
  key: 'inboxLinkedinUserFilter',
  default: null,
});

const manuallyLoggedFilterAtom = atom({
  key: 'inboxLinkedinManuallyLoggedFilter',
  default: false,
});

const filtersAtom = selector({
  key: 'inboxLinkedinFilters',
  get: ({ get }) => {
    const dateFilter = get(dateFilterAtom);
    const activityUserFilter = get(activityUserFilterAtom);
    const manuallyLoggedFilter = get(manuallyLoggedFilterAtom);

    return {
      date: dateFilter,
      activityUser: activityUserFilter,
      manuallyLogged: manuallyLoggedFilter,
    };
  },
  set: ({ set, reset }, value) => {
    if (value instanceof DefaultValue) {
      reset(dateFilterAtom);
      reset(activityUserFilterAtom);
      reset(manuallyLoggedFilterAtom);
    } else {
      if (value.date) set(dateFilterAtom, value.date);
      if (value.activityUser) set(activityUserFilterAtom, value.activityUser);
      if (typeof value.manuallyLogged === 'boolean') {
        set(manuallyLoggedFilterAtom, value.manuallyLogged);
      }
    }
  },
});

const oldQueryAtom = selector({
  key: 'inboxLinkedinActivitiesQuery',
  get: ({ get }) => {
    const filters = get(filtersAtom);

    const query = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: SessionManager?.getUser()?.id,
      [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN,
      [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: {
        query: {
          gte: filters.date.start,
          lte: filters.date.end,
        },
        searchMode: 'RANGE__SEARCH',
      },
      [ACTIVITY_FIELDS_LOGIC_ROLE.DATA_SOURCE]: filters.manuallyLogged
        ? DATA_SOURCES.WEB_APP
        : DATA_SOURCES.CHROME_EXTENSION,
    };

    if (filters.activityUser) {
      query[ACTIVITY_FIELDS_LOGIC_ROLE.USER] = filters.activityUser;
    }

    return query;
  },
});

const itemsAtom = atom({
  key: 'inboxLinkedinItemsAtom',
  default: [],
});

//TODO clean this
const responseAtom = selector({
  key: 'inboxLinkedinResponse',
  get: () => null,
  set: ({ set }, response) => {
    set(itemsAtom, response.contents);
  },
});

const queryAtom = atom({
  key: 'inboxLinkedinQueryAtom',
  default: {},
});

const querySelector = selector({
  key: 'inboxLinkedinQuerySelector',
  get: ({ get }) => get(queryAtom),
  set: ({ set, get }, query) => {
    set(queryAtom, query);
  },
});

export const useInboxLinkedinThreads = () => {
  const setResponse = useSetRecoilState(responseAtom);
  const items = useRecoilValue(itemsAtom);
  const resetItems = useResetRecoilState(itemsAtom);
  const query = useRecoilValue(querySelector);

  const { data, isLoading } = useSearchSubscription(
    {
      query,
      formFields: true,
      sort: [
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
          direction: 'ASC',
        },
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.LEAD,
          direction: 'DESC',
        },
      ],
      pageSize: 1000,
      injectReferences: true,
    },
    BOBJECT_TYPES.ACTIVITY,
  );

  useEffect(() => {
    if (data?.data) {
      const extendedResponse = injectReferencesSearchProcess(data?.data);
      setResponse(extendedResponse);
    }
  }, [data]);

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);
  return { items, isLoading, totalMatching, resetItems };
};

export const useInboxLinkedinFilters = () => {
  const dateFilter = useRecoilValue(dateFilterAtom);
  const activityUserFilter = useRecoilValue(activityUserFilterAtom);
  const showManuallyLoggedFilter = useRecoilValue(manuallyLoggedFilterAtom);
  const resetDateFilter = useResetRecoilState(dateFilterAtom);
  const resetActivityUserFilter = useResetRecoilState(activityUserFilterAtom);
  const resetManuallyLoggedFilter = useResetRecoilState(manuallyLoggedFilterAtom);
  const resetAllFilters = useResetRecoilState(filtersAtom);
  const setFilters = useSetRecoilState(filtersAtom);

  const usingDefaultFilters = useMemo(
    () =>
      isEqual(dateFilter, defaultDateFilter) && !activityUserFilter && !showManuallyLoggedFilter,
    [dateFilter, activityUserFilter, showManuallyLoggedFilter],
  );
  return {
    dateFilter,
    activityUserFilter,
    showManuallyLoggedFilter,
    usingDefaultFilters,
    resetDateFilter,
    resetActivityUserFilter,
    resetManuallyLoggedFilter,
    resetAllFilters,
    setActivityUserFilter: value => {
      if (!isEqual(value, activityUserFilter)) {
        if (value?.includes('all') || value?.length === 0) {
          resetActivityUserFilter();
          return;
        }
        setFilters({ activityUser: value });
      }
    },
    setShowManuallyLoggedFilter: value => {
      setFilters({ manuallyLogged: value });
    },
    setDateFilter: value => {
      if (!isEqual(value, dateFilter)) {
        if (!dateFilter.start) {
          setFilters({ date: value });
        } else {
          // Check that day has changed
          const diffStart = differenceInDays(dateFilter.start, value.start);
          const diffEnd = differenceInDays(dateFilter.end, value.end);
          if (diffStart !== 0 || diffEnd !== 0) {
            setFilters({ date: value });
          }
        }
      }
    },
  };
};
export const useInboxActivitiesLinkedin = () => {
  const { items: activities, isLoading } = useInboxLinkedinThreads();
  const query = useRecoilValue(queryAtom);
  const [activitiesGroupByLead, setActivitiesGroupByLead] = useState({});
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const sourceFieldId = bobjectFieldsEntity?.findByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.SOURCE)?.id;
  const sourceFieldArray =
    query && Object.keys(query)?.length > 0 && Array.isArray(query[sourceFieldId])
      ? query[sourceFieldId]
      : [];
  const quickFilterObject = {
    showManuallyLoggedFilter: !sourceFieldArray?.includes(DATA_SOURCES.CHROME_EXTENSION),
  };
  const { showManuallyLoggedFilter } = quickFilterObject;

  useEffect(() => {
    if (!showManuallyLoggedFilter) {
      if (activities?.length > 0) {
        const activitiesByLead = {};
        activities.forEach(activity => {
          const activityLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
          const values = activitiesByLead[activityLead?.value]?.messages || [];
          activitiesByLead[activityLead?.value] = {
            messages: [...values, activity],
            lastMessage: activity,
          };
        });

        const sortedLeadsId = Object.keys(activitiesByLead).sort((leadA, leadB) => {
          const lastMessageLeadA = activitiesByLead[leadA].lastMessage;
          const lastMessageLeadB = activitiesByLead[leadB].lastMessage;
          const lastMessageLeadADate =
            lastMessageLeadA &&
            getTextFromLogicRole(lastMessageLeadA, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
          const lastMessageLeadBDate =
            lastMessageLeadB &&
            getTextFromLogicRole(lastMessageLeadB, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);

          return lastMessageLeadADate > lastMessageLeadBDate ? -1 : 1;
        });

        const sortedActivitiesByLead = {};

        sortedLeadsId.forEach(
          leadId => (sortedActivitiesByLead[leadId] = activitiesByLead[leadId]),
        );

        setActivitiesGroupByLead(sortedActivitiesByLead);
      } else {
        setActivitiesGroupByLead({});
      }
    }
  }, [activities]);

  return {
    activitiesByLead: showManuallyLoggedFilter ? activities : activitiesGroupByLead || [],
    totalMatching: activities?.length,
    isLoading,
    showManuallyLoggedFilter,
  };
};
// NEW Hooks

export const useInboxLinkedinQuery = () => {
  const [query, setQuery] = useRecoilState(querySelector);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const filters = useRecoilValue(filtersAtom);
  const defaultQuery = useMemo(() => {
    const userField = bobjectFieldsEntity?.findByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.USER);
    const activityTypeField = bobjectFieldsEntity?.findByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TYPE);
    const timeField = bobjectFieldsEntity?.findByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
    const sourceField = bobjectFieldsEntity?.findByLogicRole(
      ACTIVITY_FIELDS_LOGIC_ROLE.DATA_SOURCE,
    );

    return {
      [userField?.id]: SessionManager?.getUser()?.id,
      [activityTypeField?.id]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN],
      [sourceField?.id]: [DATA_SOURCES.CHROME_EXTENSION],
      [timeField?.id]: {
        query: {
          gte: filters?.date?.start,
          lte: filters?.date?.end,
        },
        searchMode: 'RANGE__SEARCH',
      },
    };
  }, [bobjectFieldsEntity]);

  const resetQuery = () => setQuery(defaultQuery);

  const setNewQuery = newQuery => {
    setQuery({ ...defaultQuery, ...newQuery });
  };
  return { query, setNewQuery, resetQuery };
};
export const useInboxLinkedinFooter = () => {
  const [query] = useRecoilState(querySelector);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const activityTimeField = bobjectFieldsEntity?.findByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const dateFilterValue = query[activityTimeField?.id];
  const dateFilter = dateFilterValue
    ? {
        start: new Date(dateFilterValue?.query?.gte),
        end: new Date(dateFilterValue?.query?.lte),
      }
    : undefined;
  return { dateFilter };
};

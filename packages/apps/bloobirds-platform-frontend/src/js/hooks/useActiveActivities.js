import { useEffect, useMemo, useState } from 'react';

import { useSearchSubscription } from '@bloobirds-it/plover';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { differenceInDays, getDateRange, injectReferencesSearchProcess } from '@bloobirds-it/utils';
import { isEqual } from 'lodash';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { useUserPermissions, useUserSettings } from '../components/userPermissions/hooks';
import { ACTIVITY_FIELDS_LOGIC_ROLE, IS_PINNED_VALUES_LOGIC_ROLE } from '../constants/activity';
import { useContactBobjects } from '../pages/contactPages/contactPageContext';
import { getOpportunityLeadsIds, isOpportunity } from '../utils/bobjects.utils';
import { isCompanyPage, isLeadPage, isOpportunityPage } from '../utils/pages.utils';
import { useRouter } from './useRouter';
import { useSelectedLead } from './useSelectedLead';
import { useTimetableFilters } from './useTimetable';

const defaultTypeFilter = [];

const defaultDateFilter = {
  startDate: null,
  endDate: null,
};

const firstLoadedAtom = atom({
  key: 'activeActivitiesFirstLoaded',
  default: false,
});

const loadingAtom = atom({
  key: 'activeActivitiesLoading',
  default: true,
});

const typeFilterAtom = atom({
  key: 'activeActivitiesTypeFilter',
  default: defaultTypeFilter,
});

const dateFilterAtom = atom({
  key: 'activeActivitiesDateFilter',
  default: defaultDateFilter,
});

const leadFilterAtom = atom({
  key: 'activeActivitiesLeadFilter',
  default: null,
});

const pageAtom = atom({
  key: 'activeActivitiesPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'activeActivitiesHasNextPage',
  default: true,
});

const isCompanyPageAtom = atom({
  key: 'activeActivitiesIsCompanyPage',
  default: false,
});

const filtersAtom = selector({
  key: 'activeActivitiesFilters',
  get: ({ get }) => {
    const typeFilter = get(typeFilterAtom);
    const { startDate, endDate } = get(dateFilterAtom);
    const leadId = get(leadFilterAtom);

    let dateRange = [];
    if (startDate) {
      dateRange = getDateRange({
        startingDate: startDate,
        pastRange: 0,
        futureRange: differenceInDays(endDate, startDate),
      });
    }
    return {
      date: dateRange,
      type: typeFilter,
      lead: leadId,
    };
  },
  set: ({ set, reset }, value) => {
    if (value && Object.keys(value).length !== 0) {
      if (value.type) set(typeFilterAtom, value.type);
      if (value.date) set(dateFilterAtom, value.date);
      if (value.lead) set(leadFilterAtom, value.lead);
    }
    reset(loadingAtom);
    reset(firstLoadedAtom);
    reset(hasNextPageAtom);
    reset(pageAtom);
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

const activitiesAtom = atom({
  key: 'activeActivities',
  default: [],
});

const pinnedActivitiesAtom = atom({
  key: 'pinnedActivities',
  default: [],
});

const responseAtom = selector({
  key: 'activeActivitiesResponse',
  get: () => null,
  set: ({ get, set }, response) => {
    if (response) {
      set(activitiesAtom, response?.contents);
      set(loadingAtom, false);
      if (!get(firstLoadedAtom)) {
        set(loadingAtom, false);
        set(firstLoadedAtom, true);
      }
    }
    if (response && response?.contents.length === response?.totalMatching) {
      set(hasNextPageAtom, false);
    } else if (!get(hasNextPageAtom)) {
      set(hasNextPageAtom, true);
    }
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export const useActiveActivitiesFilters = () => {
  const [typeFilter, setTypeFilter] = useRecoilState(typeFilterAtom);
  const dateFilter = useRecoilValue(dateFilterAtom);
  const leadFilter = useRecoilValue(leadFilterAtom);
  const resetTypeFilter = useResetRecoilState(typeFilterAtom);
  const resetDateFilter = useResetRecoilState(dateFilterAtom);
  const resetLeadFilter = useResetRecoilState(leadFilterAtom);
  const setFilters = useSetRecoilState(filtersAtom);

  const usingDefaultFilters =
    isEqual(typeFilter, defaultTypeFilter) && isEqual(dateFilter, defaultDateFilter);

  return {
    ...dateFilter,
    usingDefaultFilters,
    typeFilter,
    resetDateFilter,
    resetTypeFilter,
    resetLeadFilter,
    resetAllFilters: () => {
      resetDateFilter();
      resetTypeFilter();
      resetLeadFilter();
    },
    setTypeFilter,
    setDateFilter: value => {
      if (!isEqual(value, dateFilter)) {
        if (!dateFilter.startDate) {
          setFilters({ date: value });
        } else {
          // Check that day has changed
          const diffStart = differenceInDays(dateFilter.startDate, value.startDate);
          const diffEnd = differenceInDays(dateFilter.endDate, value.endDate);
          if (diffStart !== 0 || diffEnd !== 0) {
            setFilters({ date: value });
          }
        }
      }
    },
    setLeadFilter: value => {
      if (!isEqual(value, leadFilter)) {
        setFilters({ lead: value });
      }
    },
  };
};

export const useActiveActivitiesPage = () => {
  const hasNextPage = useRecoilValue(hasNextPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);

  const loadNextPage = () => {
    setPage(page + 1);
  };

  return {
    hasNextPage,
    loadNextPage,
  };
};

function getQueries(isCompanyPage, filters, selectedLead, company, leads, selectedOpportunity) {
  if (!selectedOpportunity) {
    // In case we are in a lead page
    if (!isCompanyPage && selectedLead) {
      const queries = [
        {
          [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: [selectedLead],
        },
      ];
      // In case this lead has a company
      if (company) {
        queries.push({
          [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: [selectedLead],
          [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [company],
        });
      }
      return { queries };
    } else if (isCompanyPage && (filters.lead === 'any' || !filters.lead)) {
      // In case we are in a company page and filter of cadence is any or all
      const queries = [
        {
          [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [company],
        },
      ];
      if (leads?.length) {
        queries.push({
          [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: leads?.map(lead => lead?.id?.value),
          [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: ['__MATCH_EMPTY_ROWS__'],
        });
      }
      return { queries };
    }
    // In case we are in a company page and the leads filter is applied, we won't use the queries
    return { queries: [{}] };
  } else {
    // In case we are in an opportunity page
    const queries = [
      {
        [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [selectedOpportunity?.id?.value],
      },
    ];
    if (leads?.length)
      queries.push({
        [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: leads?.map(lead => lead?.id?.value),
        [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_EMPTY_ROWS__'],
      });
    return { queries };
  }
}

function getQuery(companyPage, filters, company) {
  {
    const query = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: filters.type,
      [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: filters.date,
    };

    // In case we are in a company page, and the filter of leads in cadence is applied
    if (companyPage && filters.lead && filters.lead !== 'any') {
      query[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = [filters.lead];

      if (company) {
        query[ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY] = [company];
      }
    }

    return query;
  }
}

function getSearchRequest(query, page) {
  return {
    query,
    page: 0,
    formFields: true,
    pageSize: page * 10,
    injectReferences: true,
    sort: [
      {
        field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
        direction: 'DESC',
      },
    ],
  };
}

function getPinnedQuery(filters, company, selectedLead, isLeadContact) {
  const query = {
    [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: filters.type,
    [ACTIVITY_FIELDS_LOGIC_ROLE.IS_PINNED]: IS_PINNED_VALUES_LOGIC_ROLE.YES,
  };

  if (filters.lead && filters.lead !== 'any' && !isLeadContact) {
    query[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = [filters.lead];
  } else if (isLeadContact && selectedLead) {
    query[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = [selectedLead];
  }

  if (company) {
    query[ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY] = [company];
  } else if (selectedLead) {
    query[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = [selectedLead];
  }
  return query;
}

function getPinnedSearchRequest(pinnedQuery) {
  return {
    query: pinnedQuery,
    page: 0,
    formFields: true,
    pageSize: 100,
    injectReferences: true,
    sort: [
      {
        field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
        direction: 'DESC',
      },
    ],
  };
}

export const useActiveActivities = ({ shouldCreateSubscription = false } = {}) => {
  const [pinnedActivities, setPinnedActivities] = useState([]);
  const { pathname } = useRouter();
  const activities = useRecoilValue(activitiesAtom);
  const { leadFilter } = useTimetableFilters();
  const { selectedLead } = useSelectedLead();
  const contactBobjects = useContactBobjects();
  const loading = useRecoilValue(loadingAtom);
  const leadFilterId = leadFilter !== 'any' ? leadFilter : null;
  const opportunityLeads = useMemo(() => {
    const oppLeads = getOpportunityLeadsIds(contactBobjects?.active);
    return contactBobjects?.leads?.filter(lead => oppLeads?.includes(lead?.id?.value));
  }, [contactBobjects?.leads, contactBobjects?.active]);
  const { user } = useUserSettings();
  const { othersActivities: canSeeOthersActivities } = useUserPermissions();

  const setResponse = useSetRecoilState(responseAtom);
  const setIsCompanyPage = useSetRecoilState(isCompanyPageAtom);
  const setLoading = useSetRecoilState(loadingAtom);
  const hasLoadLeadPage = isLeadPage(pathname);
  const resetActiveActivities = useResetRecoilState(activitiesAtom);
  const resetPinnedActiveActivities = useResetRecoilState(pinnedActivitiesAtom);
  const resetActivitiesFilters = useResetRecoilState(filtersAtom);
  const resetHasNextPage = useResetRecoilState(hasNextPageAtom);
  const resetPageNumber = useResetRecoilState(pageAtom);
  const resetFirstLoaded = useResetRecoilState(firstLoadedAtom);
  const resetLoading = useResetRecoilState(loadingAtom);

  const isCompanyPageFlag = useRecoilValue(isCompanyPageAtom);
  const filters = useRecoilValue(filtersAtom);
  const page = useRecoilValue(pageAtom);

  const selectedLeadId = isLeadPage(pathname) ? selectedLead?.id?.value : leadFilterId;
  const company = contactBobjects?.company?.id?.value;
  const leads = isOpportunityPage(pathname) ? opportunityLeads : contactBobjects?.leads;
  const selectedOpportunity = isOpportunity(contactBobjects?.active)
    ? contactBobjects?.active
    : null;

  const queries = getQueries(
    isCompanyPageFlag,
    filters,
    selectedLeadId,
    company,
    leads,
    selectedOpportunity,
  );

  const query = {
    ...getQuery(isCompanyPageFlag, filters, contactBobjects?.company?.id?.value),
    ...(!canSeeOthersActivities && { [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: [user?.id] }),
  };
  const search = getSearchRequest(query, page);

  const pinnedQuery = {
    ...getPinnedQuery(filters, company, selectedLeadId, isLeadPage(pathname)),
    ...(!canSeeOthersActivities && { [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: [user?.id] }),
  };

  const pinnedSearch = getPinnedSearchRequest(pinnedQuery);

  useEffect(() => {
    setIsCompanyPage(isCompanyPage(pathname));
    resetActivitiesState();
  }, [pathname]);

  const resetActivitiesState = () => {
    resetPinnedActiveActivities();
    resetActivitiesFilters();
    resetActiveActivities();
    resetHasNextPage();
    resetPageNumber();
    resetFirstLoaded();
    resetLoading();
  };

  const isValidContact =
    contactBobjects?.company ||
    (hasLoadLeadPage && !!selectedLead) ||
    isOpportunity(contactBobjects?.active);

  const { data: activitiesData } = useSearchSubscription(
    shouldCreateSubscription &&
      isValidContact && {
        ...search,
        ...queries,
      },
    BOBJECT_TYPES.ACTIVITY,
  );

  const { data: pinnedActivitiesResponse } = useSearchSubscription(
    shouldCreateSubscription &&
      (contactBobjects?.company || (hasLoadLeadPage && !!selectedLead)) && {
        ...pinnedSearch,
        ...queries,
      },
    BOBJECT_TYPES.ACTIVITY,
  );

  useEffect(() => {
    if (activitiesData?.data.contents) {
      const extendedResponse = injectReferencesSearchProcess(activitiesData.data);
      setResponse(extendedResponse);
    } else {
      setResponse(undefined);
    }
  }, [activitiesData]);

  useEffect(() => {
    if (pinnedActivitiesResponse?.data.contents) {
      const extendedResponse = injectReferencesSearchProcess(pinnedActivitiesResponse.data);
      setPinnedActivities(extendedResponse?.contents);
    } else {
      setPinnedActivities([]);
    }
  }, [pinnedActivitiesResponse]);

  if (loading && activitiesData?.data?.contents?.length > 0) {
    setLoading(false);
  }

  return {
    activitiesData,
    pinnedActivities,
    activities,
    loading,
    resetActivitiesState,
  };
};

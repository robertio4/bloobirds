import { useEffect, useMemo, useState } from 'react';

import { useUserHelpers, useUserSettings } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  BobjectTypes,
  magicFilterORs,
  UserPermission,
} from '@bloobirds-it/types';
import { api, injectReferencesSearchProcess, keepPreviousResponse } from '@bloobirds-it/utils';
import useSWR from 'swr';

const PAGE_SIZE = 20;

export const usePastActivity = extraData => {
  const { activeBobject, opportunity, pageBobjectType, filters, setFilters } = extraData;
  const [activeMagicFilter, setActiveMagicFilter] = useState<boolean>();
  const { helpers } = useUserHelpers();
  const settings = useUserSettings();
  const user = settings?.user;
  const canSeeOthersActivities = user?.permissions?.includes(
    UserPermission.USER_ACTIVITY_VISIBILITY,
  );
  const activityVisibleFilters =
    helpers?.['ACTIVITY_FILTERS'] && JSON.parse(helpers?.['ACTIVITY_FILTERS'])?.filter(i => i);
  const [page, setPage] = useState(1);

  const fetchNextPage = () => {
    setPage(page + 1);
  };
  //@ts-ignore
  const query = useMemo(() => {
    const filteredTypes = filters?.type;
    const filteredLeads = filters?.lead;
    const filteredUsers = filters?.user;
    const relatedQuery = {};
    if (
      filteredLeads?.length === 0 &&
      //@ts-ignore
      [activeBobject?.id?.typeName, activeBobject?.bobjectType].includes(BobjectTypes.Company)
    ) {
      relatedQuery[ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY] = [activeBobject?.id.value];
    } else if (
      filteredLeads?.length === 0 &&
      //@ts-ignore
      [activeBobject?.id?.typeName, activeBobject?.bobjectType].includes(BobjectTypes.Lead)
    ) {
      relatedQuery[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = [activeBobject?.id?.value];
    } else {
      relatedQuery[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] =
        filteredLeads?.length === 0 ? [''] : filteredLeads;
    }
    const activitiesQuery = activeMagicFilter
      ? null
      : {
          [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]:
            filteredTypes?.length !== 0 ? filteredTypes : activityVisibleFilters,
        };

    return {
      ...activitiesQuery,
      ...(pageBobjectType !== BobjectTypes.Opportunity && relatedQuery),
      ...((!canSeeOthersActivities || filteredUsers) && {
        [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: !canSeeOthersActivities ? user?.id : filteredUsers,
      }),
    };
  }, [filters, activeMagicFilter, canSeeOthersActivities]);

  const queries = useMemo(() => {
    const filteredLeads = filters?.lead;
    const oppORs = [
      opportunity && {
        [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [opportunity?.id?.value],
      },
      {
        [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]:
          filteredLeads?.length === 0 && activeBobject?.id?.typeName === BobjectTypes.Lead
            ? activeBobject?.id?.value
            : filteredLeads,
        [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_EMPTY_ROWS__'],
      },
    ];

    let queriesToReturn = [];

    if (pageBobjectType === BobjectTypes.Opportunity) {
      queriesToReturn = [...queriesToReturn, ...oppORs];
    } else if (activeMagicFilter) {
      queriesToReturn = [...queriesToReturn, ...magicFilterORs(activeBobject?.id?.typeName)];
    }

    return queriesToReturn;
  }, [filters, activeMagicFilter]);

  useEffect(() => {
    mutate();
  }, [filters.type, filters.lead, activeMagicFilter, filters.user]);

  const fetchActivities = () => {
    return (
      activeBobject?.id.accountId &&
      api.post('/bobjects/' + activeBobject?.id.accountId + '/Activity/search', {
        query,
        queries: queries?.length !== 0 ? queries : null,
        page: 0,
        formFields: true,
        pageSize: page ? page * PAGE_SIZE : 1000,
        injectReferences: true,
        sort: [
          {
            field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
            direction: 'DESC',
          },
        ],
      })
    );
  };
  const { data, mutate, isLoading, error } = useSWR(
    activeBobject && `/activityFeed/${activeBobject?.id?.value}/${page}/see`,
    fetchActivities,
    {
      use: [keepPreviousResponse],
    },
  );
  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);
  const pastActivitiesInfo = {
    activities:
      data &&
      (activeBobject || filters.lead.length > 0) &&
      injectReferencesSearchProcess(data?.data)?.contents,
    data,
    fetchNextPage,
    totalMatching,
  };
  return {
    pastActivitiesInfo,
    isLoading,
    error,
    mutate,
    filters,
    setFilters,
    magicFilterHandling: [activeMagicFilter, setActiveMagicFilter] as [
      boolean,
      React.Dispatch<React.SetStateAction<boolean>>,
    ],
  };
};

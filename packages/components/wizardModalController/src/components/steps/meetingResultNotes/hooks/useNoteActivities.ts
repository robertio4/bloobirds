import { useMemo, useState } from 'react';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  Bobject,
} from '@bloobirds-it/types';
import { api, injectReferencesSearchProcess, keepPreviousResponse } from '@bloobirds-it/utils';
import useSWR from 'swr';

export interface UseNoteActivitiesProps {
  accountId: string;
  activityId: string;
  leadId?: string;
  companyId?: string;
  opportunityId?: string;
  activity: Bobject;
}

const PAGE_SIZE = 25;

export const useNoteActivities = (props: UseNoteActivitiesProps) => {
  const { leadId, companyId, opportunityId, accountId, activityId, activity } = props;
  const [page, setPage] = useState(1);

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const activeBobjectId = leadId || companyId || opportunityId || null;

  const query = {
    [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE],
  };

  const queries = [
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: [leadId],
    },
    { [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [companyId] },
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [opportunityId],
    },
  ].filter(obj => !!Object.values(obj)[0][0]);

  const fetchActivities = () => {
    return (
      accountId &&
      activeBobjectId &&
      api.post('/bobjects/' + accountId + '/Activity/search', {
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

  const { data, mutate, isLoading } = useSWR(
    activityId && `/activityFeed/${activityId}/${page}/notes`,
    fetchActivities,
    {
      revalidateOnFocus: true,
      use: [keepPreviousResponse],
    },
  );

  const fetchMainActivity = () => {
    return activity && api.get('/bobjects/' + activity?.id?.value + '/form');
  };

  const {
    data: mainActivityData,
    mutate: mutateMainActivity,
    isLoading: isMainActivityLoading,
  } = useSWR(activity && `/activityFeed/${activity?.id?.value}/${page}/main`, fetchMainActivity, {
    revalidateOnFocus: true,
    use: [keepPreviousResponse],
  });

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);

  const activities = data && activeBobjectId && injectReferencesSearchProcess(data?.data)?.contents;
  const mainActivity = mainActivityData && mainActivityData?.data;

  return {
    isLoading: isLoading || isMainActivityLoading,
    activities: [mainActivity, ...(activities || [])],
    mainActivity,
    mutateMainActivity,
    data,
    totalMatching: totalMatching + (activity ? 1 : 0),
    fetchNextPage,
    mutate,
  };
};

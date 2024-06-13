import { useEffect, useRef, useState } from 'react';

import { useUserHelpers, useUserSettings } from '@bloobirds-it/hooks';
import { useEventSubscription } from '@bloobirds-it/plover';
import {
  GroupedActivityFeedInterface,
  GroupedActivityFeedRequestInterface,
  GroupedActivityInterface,
  UserPermission,
  magicFilterORs,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { api, getUserTimeZone, keepPreviousResponse } from '@bloobirds-it/utils';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import useSWR from 'swr';

const activityTypes = [
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK,
  'ACTIVITY__TYPE__CADENCE',
];

const newActivitiesFilterAtom = atom({
  key: 'newActivityTypeFilterAtom',
  default: {
    type: [],
    lead: [],
    user: [],
    magicFilter: false,
    activeBobjectId: undefined,
  },
});

export const useActivityFeed = ({ activeBobject, subscribeMutator }) => {
  const activeBobjectId = activeBobject?.id.value;
  const activeBobjectType = activeBobject?.id.typeName;
  const settings = useUserSettings();
  const user = settings?.user;
  const canSeeOthersActivities = user?.permissions?.includes(
    UserPermission.USER_ACTIVITY_VISIBILITY,
  );
  const { helpers } = useUserHelpers();
  const activityVisibleFilters = helpers?.['ACTIVITY_FILTERS']
    ? JSON.parse(helpers?.['ACTIVITY_FILTERS'])?.filter(i => i)
    : activityTypes;

  const [filters, setFilters] = useRecoilState(newActivitiesFilterAtom);
  const resetFilters = useResetRecoilState(newActivitiesFilterAtom);
  const placeholderItems = useRef<GroupedActivityInterface[]>([]);
  const [newFeedIndex, setNewFeedIndex] = useState(0);
  useEffect(() => {
    mutate();
  }, []);

  const fetchNextPage = () => {
    placeholderItems.current = [...(newActivityFeedData ? newActivityFeedData.activities : [])];
    setNewFeedIndex(newActivityFeedData?.index);
  };

  function fetchNewActivityFeed(
    body: GroupedActivityFeedRequestInterface,
  ): Promise<GroupedActivityFeedInterface> {
    return api.post('/utils/service/activity/groupActivities', body).then(data => {
      return {
        ...data.data,
        activities: [...(placeholderItems.current ?? []), ...data.data.activities],
      };
    });
  }

  const query = {
    Company: {
      [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [activeBobjectId],
    },

    Lead: {
      [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: [activeBobjectId],
    },

    Opportunity: {
      [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [activeBobjectId],
    },
  };

  const { data: newActivityFeedData, isLoading, mutate } = useSWR<GroupedActivityFeedInterface>(
    activeBobject &&
      `/${activeBobject.id.value}/groupActivities/${newFeedIndex}/${JSON.stringify(filters)}`,
    () => {
      //TODO figure out why the resetRecoil doesnt update this values
      const filteredTypes = filters.activeBobjectId !== activeBobjectId ? [] : filters.type;
      const bobjectQuery = query[activeBobjectType];

      return fetchNewActivityFeed({
        query: {
          ...(filters.magicFilter
            ? bobjectQuery
            : {
                [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]:
                  filteredTypes?.length !== 0 ? filteredTypes : activityVisibleFilters,
              }),
          ...(!canSeeOthersActivities && { [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: user?.id }),
          ...(filters.lead?.length !== 0 && {
            [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: filters.lead,
          }),
          ...(filters.user?.length !== 0 && {
            [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: filters.user,
          }),
        },
        zoneId: getUserTimeZone(),
        bobjectId: activeBobjectId,
        pageSize: 20,
        index: newFeedIndex,
        queries: filters.magicFilter ? magicFilterORs(activeBobjectType) : [],
      });
    },
    { use: [keepPreviousResponse] },
  );
  //TODO check this interaction when theres only one activityFeed left
  useEffect(() => {
    if (activeBobject?.id?.value !== filters.activeBobjectId) {
      resetFilters();
    }
  }, [activeBobject?.id?.value]);

  useEventSubscription('data-Activity', data => {
    if (
      (data?.operation === 'CREATE' || data?.operation === 'UPDATE') &&
      (data?.relatedLead === activeBobject?.id?.value ||
        data?.relatedCompany === activeBobject?.id?.value)
    ) {
      mutate();
    }
  });

  const isAPP =
    ['app.dev-bloobirds.com', 'app.bloobirds.com', 'localhost'].includes(
      window.location.hostname,
    ) || window.location.hostname.includes('bloobirds-platform-frontend.pages.dev');
  if (!isAPP) {
    subscribeMutator?.(mutate);
  }

  return {
    newActivityFeedData,
    newActivitiesLoading: isLoading,
    fetchNextPage,
    mutate,
    filters,
    setFilters: (value: any) => {
      placeholderItems.current = [];
      setNewFeedIndex(0);
      setFilters(value);
    },
    resetTypeFilter: () => {
      setFilters({ ...filters, type: [] });
    },
    activeMagicFilter: filters.magicFilter,
    setActiveMagicFilter: (value: boolean) => setFilters({ ...filters, magicFilter: value }),
  };
};

import useSWR from 'swr';

import { useAccountId } from '../../../../hooks/useAccountId';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
} from '../../../../types/activity';
import { api } from '../../../../utils/api';

export const useMeetingActivities = (activityId: string) => {
  const accountId = useAccountId();

  const fetchActivities = () => {
    return api.post('/bobjects/' + accountId + '/Activity/search', {
      //TODO: Add columns in query
      query: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING],
      },
      page: 0,
      formFields: true,
      pageSize: 30,
      injectReferences: true,
      sort: [
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
          direction: 'DESC',
        },
      ],
    });
  };

  const { data } = useSWR(accountId && `/Activities/${activityId}`, fetchActivities);

  return {
    data,
    activities: data?.data?.contents,
    total: data?.data?.totalMatching,
  };
};

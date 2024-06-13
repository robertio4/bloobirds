import useSWR from 'swr';
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES_VALUES_LOGIC_ROLE } from '@bloobirds-it/types';
import { api, injectReferencesSearchProcess } from '@bloobirds-it/utils';

export const useEmailThreadActivities = (threadId: string, accountId: string) => {
  const fetchActivities = () => {
    return api.post('/bobjects/' + accountId + '/Activity/search', {
      //TODO: Add columns in query
      query: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL],
        [ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_THREAD_ID]: threadId,
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

  const { data } = useSWR(
    accountId && threadId && `/emailThreadActivities/${threadId}`,
    fetchActivities,
  );

  return {
    data,
    activities: data && injectReferencesSearchProcess(data?.data)?.contents,
    total: data?.data?.totalMatching,
  };
};

import { useState } from 'react';

//import { useExtensionContext } from '@bloobirds-it/bloobirds-chrome-extension/src/content/components/context';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  DATA_SOURCES,
} from '@bloobirds-it/types';
import { api, injectReferencesSearchProcess, keepPreviousResponse } from '@bloobirds-it/utils';
import useSWR from 'swr';

const PAGE_SIZE = 10;
const SIDEPEEK_PAGE_SIZE = 20;

export const useLinkedinThreads = (
  linkedinThread: string,
  accountId: string,
  leadId: string,
  reverse?: boolean,
) => {
  const [page, setPage] = useState(1);
  //const { useGetSidePeekEnabled } = useExtensionContext();
  //const isSidePeekEnabled = useGetSidePeekEnabled();
  //const pageSize = isSidePeekEnabled ? SIDEPEEK_PAGE_SIZE : PAGE_SIZE;
  const pageSize = SIDEPEEK_PAGE_SIZE;

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  // TODO: To be changed
  const query = {
    [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: [leadId],
    [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN],
    [ACTIVITY_FIELDS_LOGIC_ROLE.SOURCE]: [DATA_SOURCES.CHROME_EXTENSION],
    [ACTIVITY_FIELDS_LOGIC_ROLE.LINKEDIN_THREAD]: [linkedinThread],
  };

  const response = useSWR(
    `/bobjects/${accountId}/Activity/search/${leadId}/${linkedinThread}/${page}}`,
    async () => {
      const response = await api.post('/bobjects/' + accountId + '/Activity/search', {
        query,
        formFields: true,
        sort: [
          {
            field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
            direction: reverse ? 'DESC' : 'ASC',
          },
          {
            field: ACTIVITY_FIELDS_LOGIC_ROLE.LEAD,
            direction: 'DESC',
          },
        ],
        page: 0,
        pageSize: page ? page * pageSize : 100,
        injectReferences: true,
      });
      if (response?.data) {
        return {
          injectedContents: injectReferencesSearchProcess(response?.data),
          totalMatching: response.data?.totalMatching,
        };
      }
      return null;
    },
    {
      use: [keepPreviousResponse],
    },
  );

  return {
    items: response?.data?.injectedContents?.contents,
    isLoading: !response,
    totalMatching: response?.data?.totalMatching,
    mutate: response?.mutate,
    fetchNextPage,
  };
};

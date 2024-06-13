import { GlobalSearchResponse } from '@bloobirds-it/types';
import { api, keepPreviousResponse } from '@bloobirds-it/utils';
import useSWR from 'swr';

type SearchBobjectsHook = {
  searchValue: string;
  accountId: string;
  callback?: () => void;
  numberOfResults?: number;
  bobjectTypes?: string[];
};

export const useSearchBobjects = ({
  searchValue,
  accountId,
  callback,
  numberOfResults = 20,
  bobjectTypes = ['Company', 'Lead', 'Opportunity'],
}: SearchBobjectsHook) => {
  const { data: response } = useSWR(
    searchValue && searchValue !== '' ? ['bobjectSelector', searchValue] : null,
    () => {
      return api
        .post(`/bobjects/${accountId}/global-search`, {
          query: searchValue,
          bobjectTypes,
          numberOfResults,
        })
        .then(response => {
          callback?.();
          return response;
        });
    },
    { use: [keepPreviousResponse] },
  );

  const results: GlobalSearchResponse[] = response?.data?.results;
  const totalMatching: number = response?.data?.totalMatching;

  return { results, totalMatching, response };
};

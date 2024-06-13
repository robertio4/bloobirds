import { BobjectType } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

const searchQuery = {
  page: 0,
  formFields: true,
  pageSize: 100,
  injectReferences: true,
  sort: [] as Array<string>,
};

export const fetchLeadsByRelatedBobject = (
  bobjectType: BobjectType,
  bobjectId: string,
  accountId: string,
) => {
  return api.post('/bobjects/' + accountId + '/Lead/search', {
    query: { [`LEAD__${bobjectType.toUpperCase()}`]: [bobjectId] },
    ...searchQuery,
  });
};

export const useGetBobjectByTypeAndId = (bobjectId: string, injectReferences: boolean = false) => {
  const { data, isValidating } = useSWR(bobjectId ? `/${bobjectId}/form` : null, () =>
    api.get(`/bobjects/${bobjectId}/form?injectReferences=${injectReferences}`),
  );
  return { bobject: data?.data, isValidating };
};

export const useBobject = (bobjectType: BobjectType, accountId: string) => {
  const searchForBobject = (queryParams: { [x: string]: any }) =>
    api.post(`/bobjects/${accountId}/Lead/search`, { query: queryParams, ...searchQuery });

  const patchBobject = (bobjectId: string, data: any) =>
    api.patch(`/bobjects/${accountId}/${bobjectType}/${bobjectId}/raw`, data);

  const bulkPatchBobjects = (data: any) =>
    api.patch(`/bobjects/${accountId}/${bobjectType}/bulk`, data);

  return {
    searchForBobject,
    patchBobject,
    bulkPatchBobjects,
  };
};

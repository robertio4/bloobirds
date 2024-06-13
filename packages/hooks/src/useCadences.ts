import { BobjectType, BobjectTypes, CadenceObject } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { useFullSalesEnabled } from './useFeatureFlags';

interface CadenceResponse {
  cadences: CadenceObject[];
}

interface PaginatedCadenceResponse extends CadenceResponse {
  totalElements: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const fetchCadences = async (url: string) => {
  const response = await api.get(url, {});
  return response.data;
};

export const useCadences = (
  bobjectTypeName: BobjectType | BobjectTypes | BobjectTypes[] | undefined,
  accountId: string | undefined,
  selectedAuthor?: string[],
  searchValue?: string,
  requestParams?: { page?: number; pageSize?: number },
  includeDeleted = false,
  showDisabled = true,
) => {
  const { page, pageSize } = requestParams || {};
  const isFullSalesEnabled = useFullSalesEnabled(accountId);
  const getBobjectTypesNames = () => {
    if (bobjectTypeName) {
      return Array.isArray(bobjectTypeName)
        ? bobjectTypeName?.length === 0
          ? [
              BobjectTypes.Company,
              BobjectTypes.Lead,
              isFullSalesEnabled ? BobjectTypes.Opportunity : '',
            ]
          : bobjectTypeName
        : [bobjectTypeName];
    }
    return null;
  };

  const markAsDefault = (cadenceId: string) =>
    api.put(`/messaging/cadences/${cadenceId}/markAsDefault`);

  const clone = ({
    cadenceId,
    bobjectTypeToClone,
    name,
  }: {
    cadenceId: string;
    bobjectTypeToClone: string;
    name: string;
  }) =>
    api.post(`/messaging/cadences/${cadenceId}/clone`, {
      name,
      bobjectType: bobjectTypeToClone,
    });

  const deleteCadence = (cadenceId: string) =>
    api.delete(`/messaging/cadences/${cadenceId}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: {},
    });

  const bobjectTypesToRequest = getBobjectTypesNames()?.join(',');
  const { data: entities, mutate } = useSWR<CadenceResponse>(
    `/messaging/cadences?bobjectTypes=${bobjectTypesToRequest}&includeDeleted=${includeDeleted}`,
    fetchCadences,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: true,
    },
  );

  const { data: paginatedEntities, mutate: mutatePaginatedEntities, error } = useSWR<
    PaginatedCadenceResponse
  >(
    selectedAuthor || searchValue || page || pageSize
      ? `/messaging/cadences?bobjectTypes=${bobjectTypesToRequest}&author=${selectedAuthor?.join(
          ',',
        )}&search=${searchValue ?? ''}&page=${page}&pageSize=${pageSize}${
          showDisabled ? '' : '&enabled=true'
        }`
      : null,
    (page || pageSize) && fetchCadences,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: true,
    },
  );

  const getUsesCadence = async (cadenceId: string, bobjectTypeName: string) => {
    const query = {
      [`${bobjectTypeName.toUpperCase()}__CADENCE`]: cadenceId,
    };
    const searchQuery = {
      query,
      page: 0,
      formFields: true,
      pageSize: 1000,
      injectReferences: true,
      sort: [] as Array<string>,
    };
    const response = await api.post(
      `/bobjects/${accountId}/${bobjectTypeName}/aggregation`,
      searchQuery,
    );

    const count = response?.data?.contents[0]?.value;

    return count || 0;
  };

  return {
    cadences: entities?.cadences,
    paginatedCadences: paginatedEntities?.cadences,
    totalCadences: paginatedEntities?.totalElements,
    refreshCadences: mutate,
    refreshPaginatedCadences: mutatePaginatedEntities,
    isLoading: !paginatedEntities,
    error,
    markAsDefault,
    clone,
    delete: deleteCadence,
    getUsesCadence,
  };
};

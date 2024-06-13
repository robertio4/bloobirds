import { useFullSalesEnabled } from '@bloobirds-it/hooks';
import { BobjectType, BobjectTypes, CadenceObject } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

const fetchCadences = async (url: string) => {
  const response = await api.get(url, {});
  return response.data;
};

interface CadencesResponse {
  cadences: CadenceObject[];
}

interface PaginatedCadencesResponse extends CadencesResponse {
  paginatedCadences: CadenceObject[];
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

interface UseCadencesProps {
  bobjectTypeName: BobjectType | BobjectTypes | BobjectTypes[] | undefined;
  accountId: string | undefined;
  filters?: {
    selectedAuthor?: string[];
    selectedTags?: string[];
    searchValue?: string;
    showDisabled?: boolean;
  };
  requestParams?: { page?: number; pageSize?: number };
  includeDeleted?: boolean;
}

interface UseCadencesReturn {
  cadences: CadenceObject[];
  paginatedCadences: CadenceObject[];
  totalCadences: number;
  refreshCadences: () => void;
  refreshPaginatedCadences: () => void;
  isLoading: boolean;
  error: boolean;
  markAsDefault: (cadenceId: string) => Promise<any>;
  clone: (props: { cadenceId: string; bobjectTypeToClone: string; name: string }) => Promise<any>;
  delete: (cadenceId: string) => Promise<any>;
  getUsesCadence: (cadenceId: string, bobjectTypeName: string) => Promise<number>;
}

export const useCadences: (props: UseCadencesProps) => UseCadencesReturn = ({
  bobjectTypeName,
  accountId,
  filters,
  requestParams,
  includeDeleted = false,
}) => {
  const { selectedAuthor, selectedTags, searchValue, showDisabled = true } = filters || {};
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
  const { data: entities, mutate } = useSWR<CadencesResponse>(
    `/messaging/cadences?bobjectTypes=${bobjectTypesToRequest}&includeDeleted=${includeDeleted}`,
    fetchCadences,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: true,
    },
  );

  const { data: paginatedEntities, mutate: mutatePaginatedEntities, error } = useSWR<
    PaginatedCadencesResponse
  >(
    selectedAuthor || searchValue || page || pageSize
      ? `/messaging/cadences?bobjectTypes=${bobjectTypesToRequest}&author=${selectedAuthor?.join(
          ',',
        )}&tags=${selectedTags?.join(',')}&search=${
          searchValue ?? ''
        }&page=${page}&pageSize=${pageSize}${showDisabled ? '' : '&enabled=true'}`
      : null,
    (page || pageSize) && fetchCadences,
    {
      keepPreviousData: true,
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

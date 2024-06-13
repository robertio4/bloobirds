import { useEffect, useMemo, useState } from 'react';

import { useUserTimeZone } from '@bloobirds-it/hooks';
import { BobjectTypes } from '@bloobirds-it/types';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import spacetime from 'spacetime';
import { ArrayParam, DateParam, useQueryParam } from 'use-query-params';

import { RangeType } from '../../../../hooks/useDashboardFilters';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { api } from '../../../../utils/api';
import {
  AnalyzeCadenceTableResponse,
  AnalyzeObjectsTableRow,
  CadenceTableKPI,
} from './analyzeCadenceList.typings';

const cadenceAnalyzeSortDirectionAtom = atom({
  key: 'analyticsCadenceListSortDirectionAtom',
  default: {
    field: '',
    direction: 'ASC',
  },
});

const cadenceAnalyzePageAtom = atom({
  key: 'cadenceAnalyzePageAtom',
  default: 0,
});

const cadenceAnalyzePageSizeAtom = atom({
  key: 'cadenceAnalyzePageSizeAtom',
  default: 20,
});

const analyzeCadenceResponseAtom = atom<{
  data: AnalyzeCadenceTableResponse | undefined;
  error: boolean;
  loading: boolean;
}>({
  key: 'analyzeCadenceResponseAtom',
  default: { data: undefined, error: false, loading: true },
});

const analyzeKpisResponseAtom = atom<{
  data: CadenceTableKPI[][];
  error?: boolean;
  loading: boolean;
}>({
  key: 'analyzeKpisResponseAtom',
  default: { data: [], error: false, loading: true },
});

const today = new Date();
const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const lastDayThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

export const useAnalyzeCadenceList = (cadenceId?: string) => {
  const [sort, setSort] = useRecoilState<{ field: string | undefined; direction: string }>(
    cadenceAnalyzeSortDirectionAtom,
  );

  const [dateRangeTypeFilter, setDateRangeTypeFilter] = useQueryParam<RangeType, RangeType>(
    'dateRangeType',
  );
  const [dateRangeStartFilter, setDateRangeStartFilter] = useQueryParam(
    'dateRangeStart',
    DateParam,
  );
  const [dateRangeEndFilter, setDateRangeEndFilter] = useQueryParam('dateRangeEnd', DateParam);

  const [startedBy, setStartedBy] = useQueryParam('startedBy', ArrayParam);
  const [bobjectType, setBobjectType]: [
    Array<BobjectTypes>,
    (x: Array<BobjectTypes>) => void,
  ] = useQueryParam('type', ArrayParam);

  const [page, setPage] = useRecoilState(cadenceAnalyzePageAtom);
  const resetPage = useResetRecoilState(cadenceAnalyzePageAtom);
  const [pageSize, setPageSize] = useRecoilState(cadenceAnalyzePageSizeAtom);

  const [analyzeCadenceResponse, setAnalyzeCadenceResponse] = useRecoilState(
    analyzeCadenceResponseAtom,
  );

  const [cadenceKpisResponse, setCadenceKpisResponse] = useRecoilState(analyzeKpisResponseAtom);

  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [modifiedFilters, setModifiedFilters] = useState<boolean>(false);

  const hasSalesEnabled = useFullSalesEnabled();

  useEffect(() => {
    const haveFiltersChanged =
      (dateRangeTypeFilter && dateRangeTypeFilter !== 'this_month') ||
      startedBy?.length > 0 ||
      (!cadenceId && bobjectType?.length > 0);
    setModifiedFilters(haveFiltersChanged);
  }, [dateRangeTypeFilter, startedBy, bobjectType, cadenceId]);

  const userTimeZone = useUserTimeZone();
  const setDefaultFilters = () => {
    setDateRangeStartFilter(firstDayThisMonth);
    setDateRangeEndFilter(lastDayThisMonth);
    setDateRangeTypeFilter('this_month');
  };

  const resetAllFilters = () => {
    setDefaultFilters();
    setStartedBy(undefined);
    setBobjectType(undefined);
  };

  useEffect(() => {
    if (!dateRangeTypeFilter) {
      setDefaultFilters();
    }
  }, []);

  const query = useMemo(() => {
    return {
      type: (
        bobjectType ?? [
          BobjectTypes.Company,
          BobjectTypes.Lead,
          ...(hasSalesEnabled ? [BobjectTypes.Opportunity] : []),
        ]
      ).map(type => type.toUpperCase()),
      startDate: spacetime(dateRangeStartFilter).format('iso-short'),
      endDate: spacetime(dateRangeEndFilter).format('iso-short'),
      startedBy,
      timezone: userTimeZone,
      ...(cadenceId ? { cadenceId: cadenceId } : {}),
    };
  }, [bobjectType, startedBy, cadenceId, userTimeZone, dateRangeStartFilter, dateRangeEndFilter]);

  const isQueryReady = () => {
    return query.startDate && query.endDate && query.timezone && query.type;
  };

  useEffect(() => {
    if (analyzeCadenceResponse?.data && sort.field != analyzeCadenceResponse.data.orderBy.field) {
      setSort({ ...analyzeCadenceResponse.data.orderBy });
    }
  }, [analyzeCadenceResponse]);

  useEffect(() => {
    if (isQueryReady()) {
      setAnalyzeCadenceResponse({ data: undefined, error: false, loading: true });

      const orderBy = sort.field ? sort : undefined;
      if (query.cadenceId) {
        fetchObjectsInCadence({ ...query, page, pageSize, orderBy })
          .then(data => {
            data?.result?.forEach(row => {
              const rowObject = row as AnalyzeObjectsTableRow;
              if (rowObject?.startDate) {
                rowObject.startDate = spacetime(rowObject.startDate, 'UTC')
                  .goto(userTimeZone)
                  .format('{month} {date-ordinal}, {year} {hour-24-pad}:{minute-pad}');
              }
            });
            setAnalyzeCadenceResponse({ data: data, error: false, loading: false });
          })
          .catch(() => setAnalyzeCadenceResponse({ data: undefined, error: true, loading: false }));
      } else {
        fetchCadences({ ...query, page, pageSize, orderBy })
          .then(data => setAnalyzeCadenceResponse({ data, error: false, loading: false }))
          .catch(() => setAnalyzeCadenceResponse({ data: undefined, error: true, loading: false }));
      }
    }
  }, [query, page, pageSize, sort, refreshData]);

  useEffect(() => {
    if (isQueryReady()) {
      setCadenceKpisResponse({ data: [], error: false, loading: true });
      fetchKpis({ ...query, page, pageSize })
        .then(data => setCadenceKpisResponse({ data, error: false, loading: false }))
        .catch(() => setCadenceKpisResponse({ data: [], error: true, loading: false }));
    }
  }, [query, refreshData]);

  useEffect(() => {
    setSort({
      field: '',
      direction: 'ASC',
    });
    setPage(0);
    setPageSize(20);
  }, [cadenceId]);

  const fetchCadences = (queryData: any): Promise<AnalyzeCadenceTableResponse> => {
    return api
      .post<AnalyzeCadenceTableResponse>('analytics/cadence/performance', queryData)
      .then(res => res?.data);
  };

  const fetchObjectsInCadence = async (queryData: any): Promise<AnalyzeCadenceTableResponse> => {
    return api
      .post<AnalyzeCadenceTableResponse>('analytics/cadence/objects', queryData)
      .then(res => res?.data);
  };

  const fetchKpis = (queryData: any): Promise<CadenceTableKPI[][]> => {
    return api
      .post<CadenceTableKPI[][]>('analytics/cadence/aggregation', queryData)
      .then(res => res?.data);
  };

  const totalElements = analyzeCadenceResponse.data?.totalElements;

  const headers = analyzeCadenceResponse.data?.headers;

  const handleReorder = (category: string) => {
    if (category === sort.field) {
      if (sort.direction === 'ASC') {
        setSort({ ...sort, direction: 'DESC' });
      } else {
        setSort({ ...sort, direction: 'ASC' });
      }
    } else {
      setSort({ field: category, direction: 'ASC' });
    }
  };

  return {
    analyticsListProps: {
      rows: analyzeCadenceResponse?.data?.result ?? [],
      headers,
      analyticsListError: analyzeCadenceResponse.error,
      isLoading: analyzeCadenceResponse.loading,
      sortDirection: sort.direction,
      sortField: sort.field,
      handleReorder,
    },
    kpisProps: {
      kpis: cadenceKpisResponse.data,
      isKpisLoading: cadenceKpisResponse.loading,
      kpiError: cadenceKpisResponse.error,
    },
    rangeDateProps: {
      rangeFilterDate: {
        type: dateRangeTypeFilter ?? 'this_month',
        start: dateRangeStartFilter ?? firstDayThisMonth,
        end: dateRangeEndFilter ?? lastDayThisMonth,
      },
      setRangeFilterDate: ({ type, start, end }: { type: RangeType; start: Date; end: Date }) => {
        setDateRangeTypeFilter(type);
        setDateRangeStartFilter(start);
        setDateRangeEndFilter(end);
      },
    },
    startedByProps: {
      startedBy,
      setStartedBy,
    },
    totalElements,
    selectedBobjectType: bobjectType ?? [],
    setSelectedBobjecType: (value: BobjectTypes[]) => {
      setBobjectType(value);
    },
    page,
    setPage,
    resetPage,
    resetAllFilters,
    modifiedFilters,
    pageSize,
    setPageSize,
    refresh: () => setRefreshData(!refreshData),
  };
};

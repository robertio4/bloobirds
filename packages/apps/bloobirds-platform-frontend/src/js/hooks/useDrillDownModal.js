import { atom, useRecoilState } from 'recoil';
import { getDashboardTimeRange } from '../pages/dashboardPages/utils/getDashboardTimeRange';
import { dateRangeToApiFilter, useDashboard } from './useDashboard';
import { api } from '../utils/api';
import { useNewDashboardEnabled } from './useFeatureFlags';
import { useNewDashboard } from './index';
import { useDrillDownData } from '../pages/dashboardPages/v1/panels/shared/useDrillDownData';

const drillDownDataAtom = atom({
  key: 'drillDownDataAtom-old',
  default: {
    data: null,
    title: null,
    report: null,
    localFilters: {},
    isFetching: false,
    loaded: false,
    hasErrors: false,
  },
});

const drillDownPaginationAtom = atom({
  key: 'drillDownPaginationAtom',
  default: {
    limit: null,
    offset: 0,
  },
});

const openDrillDownModalAtom = atom({
  key: 'openDrillDownModalAtom-old',
  default: false,
});

export const useDrillDownModal = () => {
  const [drillDownData, setDrillDownData] = useRecoilState(drillDownDataAtom);
  const [openDrillDown, setOpenDrillDown] = useRecoilState(openDrillDownModalAtom);
  const [drillDownPagination, setDrillDownPagination] = useRecoilState(drillDownPaginationAtom);

  const resetDrillDownData = () => {
    setDrillDownData({
      data: null,
      title: null,
      report: null,
      localFilters: {},
      isFetching: false,
      loaded: false,
      hasErrors: false,
    });
  };

  const {
    dateRangeStartFilter,
    dateRangeEndFilter,
    dateRangeTypeFilter,
    intervalFilter,
    filters,
  } = useDashboard();

  const fetchDrillDown = async ({ reports, filters: filterParams }) => {
    const response = await api.post('/statistics/analytics/report', {
      reports,
      filters: filterParams,
      requestType: 'drilldown',
    });
    return response.data;
  };

  const fetchDrillDownData = async (report, localFilters, nullField, limit, offset) => {
    const totalFilters = { ...filters, ...localFilters };

    const buildFilters = (start, end) => ({
      timeWindow: intervalFilter,
      fields: {
        ...(totalFilters || {}),
      },
      ...dateRangeToApiFilter(start, end),
      nullField: nullField || null,
      limit,
      offset,
    });

    const rangeParams = {
      start: dateRangeStartFilter,
      end: dateRangeEndFilter,
      interval: intervalFilter,
      type: dateRangeTypeFilter,
    };

    const originalRange = getDashboardTimeRange({
      ...rangeParams,
      withPadding: false,
    });

    const response = await Promise.all([
      fetchDrillDown({
        reports: report,
        filters: buildFilters(originalRange.start, originalRange.end),
      }),
    ]).catch(() => setDrillDownData({ ...drillDownData, hasErrors: true }));
    return response[0];
  };

  const updateDrillDown = (report, title, localFilters, nullField, limit, offset) => {
    if (!drillDownData.isFetching) {
      setDrillDownData({ ...drillDownData, isFetching: true, loaded: false, hasErrors: false });
      fetchDrillDownData(report, localFilters, nullField, limit, offset).then(response => {
        setDrillDownData({
          data: response?.results[report],
          title,
          report,
          localFilters,
          nullField,
          loaded: true,
          isFetching: false,
          hasErrors: false,
        });
      });
    }
  };

  return {
    drillDownData,
    fetchDrillDownData,
    setDrillDownData,
    updateDrillDown,
    resetDrillDownData,
    drillDownPagination,
    setDrillDownPagination,
    openDrillDown,
    setOpenDrillDown,
  };
};

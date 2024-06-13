import { useEffect, useState } from 'react';
import { PerformanceData, ReportFilters } from '../../../../../constants/newDashboards';
import useDashboardFilters, { URLFilters } from '../../../../../hooks/useDashboardFilters';
import { getDashboardTimeRange } from '../../../utils/getDashboardTimeRange';
import { api } from '../../../../../utils/api';
import { dateRangeToApiFilter } from '../../../utils/dateUtils';

export interface UsePerformanceData {
  loading: boolean;
  error: boolean;
  data: PerformanceData;
}

export const usePerformanceData = (report: string): UsePerformanceData => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    report,
    currentMetrics: {},
    previousMetrics: {},
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const {
    intervalFilter,
    getTranslatedFilters,
    translateGroupBy,
    rangeParams,
    filters,
    groupBy,
  } = useDashboardFilters();

  const dateRange = getDashboardTimeRange({ ...rangeParams, withPadding: false });

  const buildFilters = (): ReportFilters => {
    return {
      timeWindow: intervalFilter,
      newMoreFilters: { ...getTranslatedFilters() },
      ...dateRangeToApiFilter(dateRange.start, dateRange.end),
      newGroupBy: translateGroupBy(),
    };
  };

  const [currentFilters, setCurrentFilters] = useState<URLFilters>();
  const [currentRange, setCurrentRange] = useState<{
    start: Date;
    end: Date;
    interval: string;
    type: string;
  }>();

  const filtersHaveChanged = (newFilters: URLFilters) => {
    const change = JSON.stringify(newFilters) !== JSON.stringify(currentFilters);

    if (change) {
      setCurrentFilters({ ...newFilters });
    }
    return change;
  };

  const rangeChanged = (newRange: { start: Date; end: Date; interval: string; type: string }) => {
    const change = JSON.stringify(newRange) !== JSON.stringify(currentRange);

    if (change) {
      setCurrentRange(newRange);
    }
    return change;
  };

  useEffect(() => {
    if (!loading) {
      if (filtersHaveChanged(filters) || rangeChanged(rangeParams)) {
        setLoading(true);
        api
          .post<PerformanceData>('/analytics/dashboard/performance', {
            filters: buildFilters(),
            report,
          })
          .then(response => {
            const data = response.data;
            setPerformanceData({ ...data });
          })
          .catch(e => {
            setError(true);
          })
          .finally(() => setLoading(false));
      }
    }
  }, [rangeParams, filters, groupBy, report]);

  return {
    loading,
    error,
    data: performanceData,
  };
};

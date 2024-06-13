import { api } from '../../../../../utils/api';
import { DrillDownData, ReportFilters } from '../../../../../constants/newDashboards';

const getData = async (
  report: string,
  filters: ReportFilters,
  limit: number,
  offset: number,
): Promise<DrillDownData> => {
  const data = await api.post<DrillDownData>(`/analytics/dashboard/drilldown`, {
    report,
    filters,
    limit,
    offset,
  });
  return data.data;
};

export const useDrillDownData = (
  report: string,
  filters: ReportFilters,
  limit: number,
  offset: number,
) => {
  return getData(report, filters, limit, offset);
};

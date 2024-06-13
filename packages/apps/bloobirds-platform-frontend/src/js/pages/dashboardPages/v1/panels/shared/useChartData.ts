import { useEffect, useState } from 'react';

import { toRgba } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks } from '@bloobirds-it/hooks';
import { format } from 'date-fns';

import { useCompanyStatus } from '../../../../../components/changeStatusModal/hooks/useCompanyStatus';
import { useLeadStatus } from '../../../../../components/changeStatusModal/hooks/useLeadStatus';
import {
  ChartData,
  ExtendedChartData,
  ReportFilters,
  ValuesInformation,
} from '../../../../../constants/newDashboards';
import { useEntity } from '../../../../../hooks';
import useDashboardFilters, { URLFilters } from '../../../../../hooks/useDashboardFilters';
import { api } from '../../../../../utils/api';
import { dateRangeToApiFilter } from '../../../utils/dateUtils';
import { getDashboardTimeRange } from '../../../utils/getDashboardTimeRange';

export interface UseChartData {
  loading: boolean;
  error: boolean;
  data: ExtendedChartData;
}
const formatDateForAPI = (date: Date) => format(date, 'yyyy-MM-dd');

export const useChartData = (
  report: string,
  timeline: boolean,
  isHistoric: boolean,
  canLoad: boolean,
  cohortDate?: Date,
): UseChartData => {
  const [chartData, setChartData] = useState<ExtendedChartData>({
    result: [],
    groupById: null,
    hasGrouped: null,
    fieldLogicRole: null,
    report,
    canDrillDown: false,
    stackValuesInformation: {},
    valuesInformation: {},
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const picklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const bobjectFieldsRepo = useEntity('bobjectFields');
  const customTasksField = bobjectFieldsRepo?.findByLogicRole('ACTIVITY__CUSTOM_TASK');
  const picklistFieldType = useEntity('fieldTypes').findBy('enumName')('PICKLIST');
  const globalPicklistFieldType = useEntity('fieldTypes').findBy('enumName')('GLOBAL_PICKLIST');
  const {
    intervalFilter,
    getTranslatedFilters,
    translateGroupBy,
    rangeParams,
    filters,
    groupBy,
  } = useDashboardFilters();

  const dateRange = timeline
    ? getDashboardTimeRange({ ...rangeParams, withPadding: true })
    : getDashboardTimeRange({ ...rangeParams, withPadding: false });

  const buildFilters = (): ReportFilters => {
    return {
      timeWindow: intervalFilter,
      newMoreFilters: { ...getTranslatedFilters() },
      ...dateRangeToApiFilter(dateRange.start, dateRange.end),
      newGroupBy: translateGroupBy(),
    };
  };

  const [currentReport, setCurrentReport] = useState<string>();
  const [currentFilters, setCurrentFilters] = useState<URLFilters>();
  const { customTasks } = useCustomTasks({ disabled: true });
  const [currentRange, setCurrentRange] = useState<{
    start: Date;
    end: Date;
    interval: string;
    type: string;
  }>();
  const [currentGroupBy, setCurrentGroupBy] = useState<string>();
  const [currentCohort, setCurrentCohort] = useState<Date>();
  const [currentCanLoad, setCurrentCanLoad] = useState<boolean>(false);
  const [refresh, setRefresh] = useState(false);
  const { statuses: companyStatuses } = useCompanyStatus();
  const { statuses: leadStatuses } = useLeadStatus();

  useEffect(() => {
    if (currentCanLoad !== canLoad) {
      setCurrentCanLoad(canLoad);
    }
  }, [canLoad]);

  useEffect(() => {
    if (filtersHaveChanged(filters)) {
      setRefresh(true);
    }
  }, [filters]);

  useEffect(() => {
    if (cohortChanged(cohortDate)) {
      setRefresh(true);
    }
  }, [cohortDate]);

  useEffect(() => {
    if (rangeChanged(rangeParams)) {
      setRefresh(true);
    }
  }, [rangeParams]);

  useEffect(() => {
    if (groupByChanged(groupBy)) {
      setRefresh(true);
    }
  }, [groupBy]);

  useEffect(() => {
    if (reportChanged(report)) {
      setRefresh(true);
    }
  }, [report]);

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

  const groupByChanged = (newGroupBy: string) => {
    const change = currentGroupBy !== newGroupBy;
    if (change) {
      setCurrentGroupBy(newGroupBy);
    }
    return change;
  };

  const reportChanged = (newReport: string) => {
    const change = currentReport !== newReport;
    if (change) {
      setCurrentReport(newReport);
    }
    return change;
  };

  const cohortChanged = (newDate: Date) => {
    const change = newDate !== currentCohort;
    if (change) {
      setCurrentCohort(newDate);
    }
    return change;
  };

  useEffect(() => {
    if (!loading) {
      if (refresh && canLoad) {
        setLoading(true);
        setError(false);
        const filters = buildFilters();
        const historicAssignedTo = { ...filters.newMoreFilters['HISTORIC_ASSIGNED_TO'] };
        delete filters.newMoreFilters['HISTORIC_ASSIGNED_TO'];
        api
          .post<ChartData>(
            isHistoric ? '/analytics/dashboard/historic' : '/analytics/dashboard/chart',
            {
              filters,
              report,
              timeline,
              historicAssignedTo: isHistoric ? historicAssignedTo : undefined,
              groupByAssignTo: groupBy === 'HISTORIC_ASSIGNED_TO',
              cohortDate: isHistoric && cohortDate ? formatDateForAPI(cohortDate) : undefined,
            },
          )
          .then(response => {
            const data = response.data;
            if (data) {
              data.result = data?.result?.map(point => {
                const labelName = point._label;
                const labelGroupName = point._label_group;
                if (labelGroupName) {
                  return { ...point, _label: labelName, _label_group: labelGroupName };
                } else {
                  return { count: point.count, __timestamp: point.__timestamp, _label: labelName };
                }
              });
              setChartData({ ...processData(data) });
            }
          })
          .catch(e => {
            setError(true);
          })
          .finally(() => {
            setLoading(false);
            setRefresh(false);
          });
      }
    }
  }, [refresh, canLoad]);

  const fillIdAndColor = (
    valueId: string,
    fieldId: string,
    color: string,
    logicRole: string | undefined,
  ): { valueId: string; fieldId: string; color: string; logicRole: string | undefined } => {
    return {
      fieldId: fieldId ? fieldId : 'None',
      valueId: valueId ? valueId : 'None',
      color: color ? color : 'None',
      logicRole,
    };
  };

  const getValuesIdAndColor = (
    bobjectField: { fieldType: string; id: string; bobjectGlobalPicklist: string },
    labels: Set<string>,
  ): ValuesInformation => {
    return Array.from(labels).reduce<ValuesInformation>((acc, label) => {
      let valuesInfo;
      let key = label;
      if (key === '') {
        key = 'No Value';
      }
      if (!bobjectField) {
        valuesInfo = fillIdAndColor('None', 'None', 'None', undefined);
      } else {
        if (
          bobjectField.fieldType !== globalPicklistFieldType.id &&
          bobjectField.fieldType !== picklistFieldType.id
        ) {
          valuesInfo = fillIdAndColor(label, bobjectField.id, null, undefined);
        } else {
          // @ts-ignore
          let picklistValues = [];
          if (bobjectField.bobjectGlobalPicklist) {
            // @ts-ignore
            picklistValues = picklistFieldValues.filterBy('bobjectGlobalPicklist')(
              bobjectField.bobjectGlobalPicklist,
            );
          } else {
            // @ts-ignore
            picklistValues = picklistFieldValues.filterBy('bobjectField')(bobjectField.id);
          }
          const picklistValue = picklistValues.find(
            (pckv: { value: string }) => pckv.value === label,
          );
          if (picklistValue) {
            valuesInfo = fillIdAndColor(
              picklistValue.id,
              bobjectField.id,
              picklistValue.backgroundColor,
              picklistValue.logicRole,
            );
            key = picklistValue.value;
          } else {
            if (report === 'ALL_ACTIVITY_OUTGOING') {
              const customTask = customTasks?.find(ct => ct.id === label);
              if (customTask) {
                valuesInfo = fillIdAndColor(
                  customTask.id,
                  customTasksField.id,
                  toRgba(customTask.iconColor, 1),
                  undefined,
                );
                key = customTask.name;
              } else {
                valuesInfo = fillIdAndColor(label, bobjectField.id, null, undefined);
              }
            } else {
              valuesInfo = fillIdAndColor(label, bobjectField.id, null, undefined);
            }
          }
        }
      }

      acc[key] = valuesInfo;
      return acc;
    }, {});
  };

  const processData = (responseData: ChartData): ExtendedChartData => {
    let stackValuesInformation: ValuesInformation = {};
    let valuesInformation: ValuesInformation = {};
    if (responseData.fieldLogicRole !== null) {
      const bobjectField = bobjectFieldsRepo.findByLogicRole(responseData.fieldLogicRole);
      const keys = responseData.result.reduce((acc, point) => {
        acc.add(point._label);
        return acc;
      }, new Set<string>());
      valuesInformation = getValuesIdAndColor(bobjectField, keys);
    }

    if (responseData.hasGrouped) {
      const bobjectField = bobjectFieldsRepo.findBy('id')(responseData.groupById);
      const keys = responseData.result.reduce((acc, point) => {
        acc.add(point._label_group);
        return acc;
      }, new Set<string>());
      stackValuesInformation = getValuesIdAndColor(bobjectField, keys);
    }

    if (['LEAD_PIPELINE', 'COMPANY_PIPELINE'].includes(responseData.report)) {
      const statuses =
        responseData.report === 'COMPANY_PIPELINE'
          ? companyStatuses.map(s => s.name)
          : leadStatuses.map(s => s.name);
      responseData.result.sort((a, b) => statuses.indexOf(a._label) - statuses.indexOf(b._label));
    }

    if (responseData.report === 'ALL_ACTIVITY_OUTGOING') {
      responseData.result = responseData.result.map(point => {
        if (!['Email', 'Call', 'Linkedin Message'].includes(point._label)) {
          const customTask = customTasks?.find(ct => ct.id === point._label);
          if (customTask) {
            return { ...point, _label: customTask.name };
          }
        }
        return { ...point };
      });
    }

    return {
      ...responseData,
      stackValuesInformation,
      valuesInformation,
    };
  };

  return {
    loading,
    error,
    data: chartData,
  };
};

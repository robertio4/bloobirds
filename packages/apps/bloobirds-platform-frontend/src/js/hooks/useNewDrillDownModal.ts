import { atom, useRecoilState } from 'recoil';
import { getDashboardTimeRange } from '../pages/dashboardPages/utils/getDashboardTimeRange';
import { api } from '../utils/api';
import {
  DrillDownData,
  DrillDownRequest,
  FunnelDrillDownRequest,
  ReportFilters,
} from '../constants/newDashboards';
import useDashboardFilters from './useDashboardFilters';
import { dateRangeToApiFilter } from '../pages/dashboardPages/utils/dateUtils';
import { useState } from 'react';

interface DrillDownDataAtom {
  data?: DrillDownData;
  title?: string;
  report?: string;
  localFilters?: { [key: string]: [string] | '__MATCH_EMPTY_ROWS__' };
  isFetching: boolean;
  nullField?: string;
  loaded: boolean;
  hasErrors: boolean;
}

interface FunnelDrillDownDataAtom {
  data?: DrillDownData;
  title?: string;
  entity?: string;
  targetStatus: string;
  targetStatusDepth: number;
  startingStatus: string;
  isFetching: boolean;
  nullField?: string;
  loaded: boolean;
  hasErrors: boolean;
}

const drillDownDataAtom = atom<DrillDownDataAtom>({
  key: 'drillDownDataAtom-new',
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

const funnelDrillDownInitialState: FunnelDrillDownDataAtom = {
  data: null,
  title: null,
  entity: null,
  targetStatus: null,
  startingStatus: null,
  targetStatusDepth: null,
  isFetching: false,
  loaded: false,
  hasErrors: false,
};

const funnelDrillDownDataAtom = atom<FunnelDrillDownDataAtom>({
  key: 'funnelDrillDownDataAtom-new',
  default: funnelDrillDownInitialState,
});

const openDrillDownModalAtom = atom<boolean>({
  key: 'openDrillDownModalAtom-new',
  default: false,
});

const isFunnelAtom = atom<boolean>({
  key: 'isModalAtom',
  default: false,
});

export const useNewDrillDownModal = () => {
  const [drillDownData, setDrillDownData] = useRecoilState(drillDownDataAtom);
  const [openDrillDown, setOpenDrillDown] = useRecoilState(openDrillDownModalAtom);
  const [isFunnel, setIsFunnel] = useRecoilState(isFunnelAtom);
  const [funnelDrillDownData, setFunnelDrillDownData] = useRecoilState(funnelDrillDownDataAtom);
  const [hideValues, setHideValues] = useState<string[]>([]);
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
    setHideValues([]);

    setFunnelDrillDownData(funnelDrillDownInitialState);
    setIsFunnel(false);
  };

  const {
    dateRangeStartFilter,
    dateRangeEndFilter,
    dateRangeTypeFilter,
    intervalFilter,
    filters,
    getTranslatedFilters,
    translateFilters,
    rangeParams,
  } = useDashboardFilters();

  const fetchDrillDown = async (drillDownBody: DrillDownRequest): Promise<DrillDownData> => {
    const response = await api.post<DrillDownData>('/analytics/dashboard/drilldown', drillDownBody);
    return response.data;
  };

  const fetchFunnelDrillDown = async (request: FunnelDrillDownRequest): Promise<DrillDownData> => {
    const originalRange = getDashboardTimeRange({ ...rangeParams, withPadding: false });

    const filters: ReportFilters = {
      newMoreFilters: getTranslatedFilters(),
      ...dateRangeToApiFilter(originalRange.start, originalRange.end),
    };

    const historicAssignedTo = { ...filters.newMoreFilters['HISTORIC_ASSIGNED_TO'] };
    delete filters.newMoreFilters['HISTORIC_ASSIGNED_TO'];
    const response = await api.post<DrillDownData>('/analytics/dashboard/funnel/drilldown', {
      ...request,
      filters,
      historicAssignedTo,
    });

    return response.data;
  };

  const fetchDrillDownData = async (
    report: string,
    localFilters: { [key: string]: [string] | '__MATCH_EMPTY_ROWS__' },
    nullField: string,
    limit: number,
    offset: number,
    hideValues: string[],
  ): Promise<DrillDownData> => {
    const totalFilters = { ...filters };
    Object.entries(localFilters).forEach(([key, value]) => {
      if (value !== '__MATCH_EMPTY_ROWS__') {
        totalFilters[key] = {
          searchMode: 'EXACT__SEARCH',
          query: value,
        };
      } else {
        totalFilters[key] = value;
      }
    });

    const buildFilters = (start: Date, end: Date): ReportFilters => ({
      timeWindow: intervalFilter,
      newMoreFilters: translateFilters(totalFilters),
      ...dateRangeToApiFilter(start, end),
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

    try {
      return await fetchDrillDown({
        report,
        filters: buildFilters(originalRange.start, originalRange.end),
        limit,
        offset,
        hideValues: hideValues.length > 0 ? hideValues : undefined,
      });
    } catch (e) {
      setDrillDownData({ ...drillDownData, hasErrors: true });
    }
  };

  const updateDrillDown = (
    report: string,
    title: string,
    localFilters: { [key: string]: [string] | '__MATCH_EMPTY_ROWS__' },
    nullField: string,
    limit: number,
    offset: number,
    valuesToHide: string[],
  ) => {
    setIsFunnel(false);
    if (!drillDownData.isFetching) {
      setDrillDownData({ ...drillDownData, isFetching: true, loaded: false, hasErrors: false });
      setHideValues(valuesToHide || []);
      fetchDrillDownData(
        report,
        localFilters,
        nullField,
        limit,
        offset,
        valuesToHide ? (hideValues ? hideValues : []) : [],
      ).then(response => {
        setDrillDownData({
          data: response,
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

  const launchFunnelDrillDown = (newState: FunnelDrillDownRequest & { title: string }) => {
    setIsFunnel(true);
    if (!drillDownData.isFetching) {
      setOpenDrillDown(true);
      setFunnelDrillDownData({
        ...newState,
        isFetching: true,
        loaded: false,
        hasErrors: false,
      });
      fetchFunnelDrillDown(newState).then(response => {
        setFunnelDrillDownData({
          data: response,
          ...newState,
          loaded: true,
          isFetching: false,
          hasErrors: false,
        });
      });
    }
  };

  const paginateFunnel = (limit: number, offset: number) => {
    if (!drillDownData.isFetching) {
      setIsFunnel(true);
      setFunnelDrillDownData({
        ...funnelDrillDownData,
        isFetching: true,
        loaded: false,
        hasErrors: false,
      });
      fetchFunnelDrillDown({
        entity: funnelDrillDownData.entity,
        limit,
        offset,
        startingStatus: funnelDrillDownData.startingStatus,
        targetStatusDepth: funnelDrillDownData.targetStatusDepth,
        targetStatus: funnelDrillDownData.targetStatus,
      }).then(response => {
        setFunnelDrillDownData({
          ...funnelDrillDownData,
          data: { ...response },
          loaded: true,
          isFetching: false,
          hasErrors: false,
        });
      });
    }
  };

  return {
    drillDownData,
    funnelDrillDownData,
    fetchDrillDownData,
    setDrillDownData,
    updateDrillDown,
    resetDrillDownData,
    openDrillDown,
    setOpenDrillDown,
    launchFunnelDrillDown,
    paginateFunnel,
    isFunnel,
    setIsFunnel,
  };
};

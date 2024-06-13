import { isEmpty, isEqual } from 'lodash';
import { string } from 'prop-types';
import { DateParam, JsonParam, StringParam, useQueryParam } from 'use-query-params';

import { AttributeFilter, GroupByField, Operator } from '../constants/newDashboards';
import { getIntervalFromType } from '../pages/dashboardPages/utils/getIntervalFromType';
import { mergeRemovingUndefined } from '../utils/objects.utils';
import { useEntity } from './entities/useEntity';
import { useBobjectTypes } from './useBobjectTypes';
import { useQueryParams } from './useQueryParams';

export interface URLFilters {
  [key: string]: URLFilter | SearchModes;
}

type SearchModes =
  | 'AUTOCOMPLETE__SEARCH'
  | 'EXACT__SEARCH'
  | '__MATCH_FULL_ROWS__'
  | '__MATCH_EMPTY_ROWS__'
  | 'NOT__SEARCH'
  | 'RANGE__SEARCH__BETWEEN__DATES'
  | 'RANGE__SEARCH__LT'
  | 'RANGE__SEARCH__GTE'
  | 'RANGE__SEARCH__LTE'
  | 'RANGE__SEARCH__GT'
  | 'RANGE__SEARCH__BETWEEN';

interface URLFilter {
  searchMode: SearchModes;
  query: string | string[] | any;
  searchType?: SearchModes;
}

const operatorDict: { [key in SearchModes]: Operator } = {
  AUTOCOMPLETE__SEARCH: 'STRING_CONTAINS',
  EXACT__SEARCH: 'STRING_EQUAL',
  __MATCH_FULL_ROWS__: 'STRING_NOT_EMPTY',
  __MATCH_EMPTY_ROWS__: 'STRING_EMPTY',
  NOT__SEARCH: 'STRING_NOT_EQUAL',
  RANGE__SEARCH__BETWEEN__DATES: 'DATE_BETWEEN',
  RANGE__SEARCH__GT: 'NUMBER_GREATER_THAN',
  RANGE__SEARCH__LT: 'NUMBER_LESS_THAN',
  RANGE__SEARCH__GTE: 'NUMBER_GREAT_EQUAL_THAN',
  RANGE__SEARCH__LTE: 'NUMBER_LESS_EQUAL_THAN',
  RANGE__SEARCH__BETWEEN: 'NUMBER_BETWEEN',
};

export type RangeType =
  | 'custom'
  | 'today'
  | 'this_week'
  | 'this_month'
  | 'this_quarter'
  | 'this_year'
  | 'all_time'
  | 'yesterday'
  | 'last_week'
  | 'last_month'
  | 'last_quarter'
  | 'last_year';

const useDashboardFilters = () => {
  const [intervalFilter, setIntervalFilter] = useQueryParam('interval', StringParam);

  const changeIntervalFilter = (value: string) => setIntervalFilter(value, 'replaceIn');

  const [dateRangeTypeFilter = 'this_week', setDateRangeTypeFilter] = useQueryParam(
    'dateRangeType',
    StringParam,
  );

  const changeDateRangeTypeFilter = (value: string) => setDateRangeTypeFilter(value, 'replaceIn');

  const [dateRangeStartFilter, setDateRangeStartFilter] = useQueryParam(
    'dateRangeStart',
    DateParam,
  );
  const changeDateRangeStartFilter = (value: Date) => setDateRangeStartFilter(value, 'replaceIn');

  const [dateRangeEndFilter, setDateRangeEndFilter] = useQueryParam('dateRangeEnd', DateParam);

  const changeDateRangeEndFilter = (value: Date) => setDateRangeEndFilter(value, 'replaceIn');

  const [filters, setFilters] = useQueryParam<URLFilters>('filters', JsonParam);

  const changeFilters = (value: URLFilters) => setFilters(value, 'replaceIn');
  const [groupBy, setGroupBy] = useQueryParam<string>('groupBy', JsonParam);

  const changeGroupBy = (value: string) => setGroupBy(value, 'replaceIn');
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();

  const getBobjectTypeFromFilterField = (filterId: string) => {
    // @ts-ignore
    const field = bobjectFields?.findBy('id', filterId);
    // @ts-ignore
    return bobjectTypes.findBy('id')(field?.bobjectType)?.name;
  };

  const translateGroupBy = (): GroupByField => {
    if (!groupBy) {
      return null;
    }
    if (groupBy === 'HISTORIC_ASSIGNED_TO') {
      return null;
    }
    return {
      entity: getBobjectTypeFromFilterField(groupBy),
      fieldId: groupBy,
    };
  };

  const translateFilters = (filtersToTranslate: URLFilters) => {
    if (!filtersToTranslate) {
      return {};
    }
    const newFilters: { [key: string]: AttributeFilter } = {};
    Object.entries(filtersToTranslate).forEach(([fieldId, filter]) => {
      let operator: Operator;
      if (typeof filter === 'string') {
        operator = operatorDict[filter as SearchModes];
      } else {
        operator = operatorDict[(filter as URLFilter).searchMode];
        if (!operator) {
          operator = operatorDict[(filter as URLFilter).searchType];
        }
      }

      const query = filter instanceof string ? undefined : (filter as URLFilter).query;
      const entity = getBobjectTypeFromFilterField(fieldId);
      let params: string[] = [];
      switch (operator) {
        case 'STRING_EQUAL':
          if (typeof query === 'string') {
            params = [query as string];
          } else if (query instanceof Array && query.length === 1) {
            params = [query[0]];
          } else if (query instanceof Array) {
            operator = 'STRING_IN';
            params = query;
          }
          break;
        case 'STRING_CONTAINS':
          if (typeof query === 'string') {
            params = [query as string];
          } else {
            params = query;
          }

          break;
        case 'STRING_NOT_EQUAL':
          params = [query];
          break;
        case 'STRING_EMPTY':
          params = [];
          break;
        case 'STRING_NOT_EMPTY':
          params = [];
          break;
        default:
          params = [...Object.values(query)] as string[];
      }
      newFilters[fieldId] = {
        operator,
        params,
        entity,
      };
    });
    return newFilters;
  };

  const getTranslatedFilters = () => {
    return translateFilters(filters);
  };

  return {
    intervalFilter,
    setIntervalFilter: changeIntervalFilter,
    dateRangeTypeFilter,
    setDateRangeTypeFilter: changeDateRangeTypeFilter,
    dateRangeStartFilter,
    setDateRangeStartFilter: changeDateRangeStartFilter,
    dateRangeEndFilter,
    setDateRangeEndFilter: changeDateRangeEndFilter,
    filters,
    setFilters: changeFilters,
    groupBy,
    setGroupBy: changeGroupBy,
    getTranslatedFilters,
    translateGroupBy,
    translateFilters,
    updateFilters: (newValue: any) => {
      const nextFilters = mergeRemovingUndefined(filters || {}, newValue);
      if (isEmpty(nextFilters) && filters !== undefined) {
        changeFilters({});
      } else if (!isEmpty(nextFilters) && filters === undefined) {
        changeFilters(nextFilters);
      } else if (!isEmpty(nextFilters) && filters !== undefined && !isEqual(nextFilters, filters)) {
        changeFilters(nextFilters);
      }
    },
    rangeParams: {
      start: dateRangeStartFilter,
      end: dateRangeEndFilter,
      interval: intervalFilter,
      type: dateRangeTypeFilter,
    },
    clearFilters: () => {
      changeFilters({});
      changeGroupBy(undefined);
    },
    setDateRange: ({ type, start, end }: { type: string; start: Date; end: Date }) => {
      changeDateRangeTypeFilter(type);

      if (type === 'custom') {
        changeDateRangeStartFilter(start);
        changeDateRangeEndFilter(end);
      } else {
        changeDateRangeStartFilter(undefined);
        changeDateRangeEndFilter(undefined);
      }

      changeIntervalFilter(getIntervalFromType(type, start, end));
    },
    initialLoad: ({
      initialInterval,
      initialRange,
    }: {
      initialInterval: string;
      initialRange: RangeType;
    }) => {
      if (!intervalFilter) {
        changeIntervalFilter(initialInterval);
      }

      changeDateRangeTypeFilter(initialRange);
    },
  };
};

export default useDashboardFilters;

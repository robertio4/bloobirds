import { MainBobjectTypes } from './bobjects';

export interface Filter {
  [id: string]: string | FilterValue;
}

export type FiltersBobjectTypes = MainBobjectTypes | 'Activity' | 'Task';

export type FiltersType = Record<FiltersBobjectTypes | 'conditions', Filter>;

export type RelativeDateFilterValue = {
  start: Date | string;
  end: Date | string;
  type?: string;
  value?: string;
};

export interface FiltersWithLoaderFlag extends FiltersType {
  hasLoadedStorage: boolean;
}

export enum FilterType {
  RANGE_BETWEEN = 'RANGE__SEARCH__BETWEEN',
  EXACT = 'EXACT__SEARCH',
  RANGE_GT = 'RANGE__SEARCH__GT',
  RANGE_GTE = 'RANGE__SEARCH__GTE',
  RANGE_LT = 'RANGE__SEARCH__LT',
  RANGE_LTE = 'RANGE__SEARCH__LTE',
  NOT_EMPTY = 'IS__NOT__EMPTY',
  EMPTY = 'IS__EMPTY',
}

export enum SearchType {
  AUTOCOMPLETE = 'AUTOCOMPLETE__SEARCH',
  EXACT = 'EXACT__SEARCH',
  NOT = 'NOT__SEARCH',
  RANGE_BETWEEN = 'RANGE__SEARCH__BETWEEN',
  RANGE_BETWEEN_DATES = 'RANGE__SEARCH__BETWEEN__DATES',
  RANGE_GT = 'RANGE__SEARCH__GT',
  RANGE_GTE = 'RANGE__SEARCH__GTE',
  RANGE_LT = 'RANGE__SEARCH__LT',
  RANGE_LTE = 'RANGE__SEARCH__LTE',
  CUSTOM = 'custom',
  TODAY = 'today',
  THIS_WEEK = 'this_week',
  THIS_MONTH = 'this_month',
  THIS_QUARTER = 'this_quarter',
  THIS_YEAR = 'this_year',
  ALL_TIME = 'all_time',
  YESTERDAY = 'yesterday',
  LAST_WEEK = 'last_week',
  LAST_MONTH = 'last_month',
  LAST_QUARTER = 'last_quarter',
  LAST_YEAR = 'last_year',
}

export enum RelativesDate {
  ALL_TIME = 'all_time',
  LAST_MONTH = 'last_month',
  LAST_QUARTER = 'last_quarter',
  LAST_WEEK = 'last_week',
  LAST_YEAR = 'last_year',
  NEXT_30_DAYS = 'next_30_days',
  NEXT_7_DAYS = 'next_7_days',
  SINCE_TODAY = 'since_today',
  MORE_THAN_6_MONTHS = 'more_than_6_month',
  NEXT_6_MONTHS = 'next_6_months',
  THIS_MONTH = 'this_month',
  THIS_QUARTER = 'this_quarter',
  THIS_WEEK = 'this_week',
  THIS_YEAR = 'this_year',
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  UNTIL_NOW = 'until_now',
}

export enum SearchMode {
  AUTOCOMPLETE = 'AUTOCOMPLETE__SEARCH',
  EXACT = 'EXACT__SEARCH',
  NOT = 'NOT__SEARCH',
  RANGE = 'RANGE__SEARCH',
  SUBQUERY = 'SUBQUERY__SEARCH',
}

export enum MatchRows {
  FULL = '__MATCH_FULL_ROWS__',
  EMPTY = '__MATCH_EMPTY_ROWS__',
}

export enum SearchTypeByKey {
  gt = SearchType.RANGE_GT,
  gte = SearchType.RANGE_GTE,
  lt = SearchType.RANGE_LT,
  lte = SearchType.RANGE_LTE,
}

export interface FilterValue {
  query: SearchTypeByKey | string | Array<string>;
  searchMode: SearchMode;
  searchType?: SearchType;
  type?: FilterType;
}

export enum Direction {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface SearchSort {
  field: string;
  direction: Direction;
}

export type UseEveryBobjectType = {
  isActive: boolean;
  total?: number;
  query?: { [x: string]: any };
  assigneeId?: string;
};

export enum ScheduleShortTimes {
  tenMinutes = 'in_10_minutes',
  thirtyMinutes = 'in_30_minutes',
  oneHour = 'in_1_hour',
  twoHours = 'in_2_hours',
  fourHours = 'in_4_hours',
  oneDay = 'in_1_day',
  twoDays = 'in_2_days',
  custom = 'custom',
}

export enum Unit {
  minutes = 'minutes',
  hours = 'hours',
  days = 'days',
}

export const ScheduleShortTimesValues: {
  [x: string]: { [type: string]: Unit | string | number };
} = {
  in_10_minutes: { unit: 'minutes', amount: 10 },
  in_30_minutes: { unit: 'minutes', amount: 30 },
  in_1_hour: { unit: 'hours', amount: 1 },
  in_2_hours: { unit: 'hours', amount: 2 },
  in_4_hours: { unit: 'hours', amount: 4 },
  in_1_day: { unit: 'days', amount: 1 },
  in_2_days: { unit: 'days', amount: 2 },
};


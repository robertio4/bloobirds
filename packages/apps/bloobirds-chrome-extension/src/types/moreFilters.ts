export enum SearchMode {
  RANGE = 'RANGE__SEARCH',
  EXACT = 'EXACT__SEARCH',
  NOT = 'NOT__SEARCH',
  AUTOCOMPLETE = 'AUTOCOMPLETE__SEARCH',
}

export enum SearchType {
  RANGE_BETWEEN_DATES = 'RANGE__SEARCH__BETWEEN__DATES',
  RANGE_BETWEEN = 'RANGE__SEARCH__BETWEEN',
  RANGE_GT = 'RANGE__SEARCH__GT',
  RANGE_GTE = 'RANGE__SEARCH__GTE',
  RANGE_LT = 'RANGE__SEARCH__LT',
  RANGE_LTE = 'RANGE__SEARCH__LTE',
}

export enum FilterType {
  CUSTOM = 'custom',
  RANGE_BETWEEN = 'RANGE__SEARCH__BETWEEN',
  RANGE_GT = 'RANGE__SEARCH__GT',
  RANGE_GTE = 'RANGE__SEARCH__GTE',
  RANGE_LT = 'RANGE__SEARCH__LT',
  RANGE_LTE = 'RANGE__SEARCH__LTE',
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

export enum MatchRows {
  FULL = '__MATCH_FULL_ROWS__',
  EMPTY = '__MATCH_EMPTY_ROWS__',
}

export interface Query {
  gte?: Date | string;
  gt?: Date | string;
  lte?: Date | string;
  lt?: Date | string;
}

export interface FilterValue {
  query: Query | string | Array<string>;
  searchMode: SearchMode;
  searchType?: SearchType;
  type?: FilterType;
}

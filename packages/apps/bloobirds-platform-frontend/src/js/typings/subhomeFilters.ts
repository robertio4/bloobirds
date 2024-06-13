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

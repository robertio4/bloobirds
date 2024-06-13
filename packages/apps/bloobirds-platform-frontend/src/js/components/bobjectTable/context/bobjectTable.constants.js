export const VALUE_SEARCH_MODES = [
  'AUTOCOMPLETE__SEARCH',
  'EXACT__SEARCH',
  'RANGE__SEARCH',
  'NOT__SEARCH',
];

export const RANGE_SEARCH_MODES = [
  'RANGE__SEARCH__GT',
  'RANGE__SEARCH__LT',
  'RANGE__SEARCH__GTE',
  'RANGE__SEARCH__LTE',
  'RANGE__SEARCH__BETWEEN',
  'RANGE__SEARCH__BETWEEN__DATES',
];

export const RELATIVE_DATES_OPTIONS = Object.freeze({
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  THIS_WEEK: 'this_week',
  LAST_WEEK: 'last_week',
  LAST_MONTH: 'last_month',
  LAST_QUARTER: 'last_quarter',
  LAST_YEAR: 'last_year',
  THIS_MONTH: 'this_month',
  THIS_QUARTER: 'this_quarter',
  THIS_YEAR: 'this_year',
  ALL_TIME: 'all_time',
});

export const NON_VALUE_SEARCH_MODES = ['__MATCH_FULL_ROWS__', '__MATCH_EMPTY_ROWS__'];

export const SEARCH_MODES = {
  AUTOCOMPLETE__SEARCH: 'AUTOCOMPLETE__SEARCH',
  SUBQUERY__SEARCH: 'SUBQUERY__SEARCH',
  EXACT_SEARCH: 'EXACT__SEARCH',
};

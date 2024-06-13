export const PICKLIST_FIELD_TYPES = [
  'Picklist',
  'Global Picklist',
  'Multi picklist',
  'Multi global picklist',
  'Reference entity',
];

export const DATE_FIELD_TYPES = ['Date', 'DateTime'];

export const TEXT_FIELD_TYPES = ['URL', 'Phone', 'Email', 'Text'];

export const NUMBER_FIELD_TYPES = ['Number', 'Decimal'];

export const FIELD_FILTERS = {
  AUTOCOMPLETE__SEARCH: 'Contains:',
  EXACT__SEARCH: 'Contains exactly:',
  RANGE__SEARCH__GT: 'Is greater than',
  RANGE__SEARCH__LT: 'Is less than',
  RANGE__SEARCH__GTE: 'Is greater or equal than',
  RANGE__SEARCH__LTE: 'Is less or equal than',
  NOT__SEARCH: 'Is not',
  equal: 'Is equal than',
};

export const NON_VALUE_FILTERS = {
  __MATCH_FULL_ROWS__: "It's not empty",
  __MATCH_EMPTY_ROWS__: "It's empty",
};

export const MULTIPICKLIST_FILTERS = {
  EXACT__SEARCH: 'Is any of',
  __MATCH_FULL_ROWS__: "It's not empty",
  __MATCH_EMPTY_ROWS__: "It's empty",
  NOT__SEARCH: 'Is not',
};

export const DATES_FILTERS = 'RANGE__SEARCH__BETWEEN__DATES';

export const RANGE_QUERY = 'RANGE__SEARCH';

export const NUMBER_FIELD_FILTERS = {
  RANGE__SEARCH__GT: 'Is greater than',
  RANGE__SEARCH__LT: 'Is less than',
  RANGE__SEARCH__GTE: 'Is greater or equal than',
  RANGE__SEARCH__LTE: 'Is less or equal than',
  RANGE__SEARCH__BETWEEN: 'Between',
};

export const RANGE_SEARCH_MODES = [
  'RANGE__SEARCH__GT',
  'RANGE__SEARCH__LT',
  'RANGE__SEARCH__GTE',
  'RANGE__SEARCH__LTE',
  'RANGE__SEARCH__BETWEEN',
  'RANGE__SEARCH__BETWEEN__DATES',
];

export const TEXT_PICKLIST_SEARCH_MODES = ['AUTOCOMPLETE__SEARCH', 'EXACT__SEARCH', 'NOT__SEARCH'];

export const RELATIVE_DATES_OPTIONS = {
  all_time: 'All time',
  last_month: 'Last month',
  last_quarter: 'Last quarter',
  last_week: 'Last week',
  last_year: 'Last year',
  next_30_days: 'Next 30 days',
  next_7_days: 'Next 7 days',
  since_today: 'Since today',
  more_than_6_month: 'More than 6 month',
  this_month: 'This month',
  this_quarter: 'This quarter',
  this_week: 'This week',
  this_year: 'This year',
  today: 'Today',
  until_now: 'Today',
  yesterday: 'Yesterday',
};

export const NON_VALUE_SEARCH_MODES = ['__MATCH_FULL_ROWS__', '__MATCH_EMPTY_ROWS__'];

export const USER_GLOBAL_PICKLIST = [
  'COMPANY__ASSIGNED_TO',
  'ACTIVITY__ASSIGNED_TO',
  'LEAD__ASSIGNED_TO',
  'TASK__ASSIGNED_TO',
];

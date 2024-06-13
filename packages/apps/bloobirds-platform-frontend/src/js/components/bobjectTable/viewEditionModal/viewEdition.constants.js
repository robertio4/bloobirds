export const PICKLIST_FIELD_TYPES = [
  'Picklist',
  'Global Picklist',
  'Multi picklist',
  'Multi global picklist',
];

export const DATE_FIELD_TYPES = ['Date', 'DateTime'];

export const TEXT_FIELD_TYPES = ['URL', 'Phone', 'Email', 'Text'];

export const NUMBER_FIELD_TYPES = ['Number', 'Decimal'];

export const FIELD_FILTERS = {
  AUTOCOMPLETE__SEARCH: 'Contains:',
  EXACT__SEARCH: 'Contains exactly:',
  __MATCH_FULL_ROWS__: "It's not empty",
  __MATCH_EMPTY_ROWS__: "It's empty",
  RANGE__SEARCH__GT: 'Is greater than',
  RANGE__SEARCH__LT: 'Is less than',
  RANGE__SEARCH__GTE: 'Is greater or equal than',
  RANGE__SEARCH__LTE: 'Is less or equal than',
  NOT__SEARCH: 'Is not',
};

export const MULTIPICKLIST_FILTERS = {
  EXACT__SEARCH: 'Is any of',
  __MATCH_FULL_ROWS__: "It's not empty",
  __MATCH_EMPTY_ROWS__: "It's empty",
  NOT__SEARCH: 'Is not',
};

export const NUMBER_FIELD_FILTERS = {
  RANGE__SEARCH__GT: 'Is greater than',
  RANGE__SEARCH__LT: 'Is less than',
  RANGE__SEARCH__GTE: 'Is greater or equal than',
  RANGE__SEARCH__LTE: 'Is less or equal than',
  RANGE__SEARCH__BETWEEN: 'Between',
  RANGE__SEARCH__BETWEEN__DATES: 'Between',
};

export const RANGE_SEARCH_MODES = [
  'RANGE__SEARCH__GT',
  'RANGE__SEARCH__LT',
  'RANGE__SEARCH__GTE',
  'RANGE__SEARCH__LTE',
  'RANGE__SEARCH__BETWEEN',
  'RANGE__SEARCH__BETWEEN__DATES',
];

export const RELATIVE_DATES_OPTIONS = {
  today: 'Today',
  yesterday: 'Yesterday',
  this_week: 'This week',
  last_week: 'Last week',
  this_month: 'This month',
  last_month: 'Last month',
  this_quarter: 'This quarter',
  last_quarter: 'Last quarter',
  this_year: 'This year',
  last_year: 'Last year',
  all_time: 'All time',
};

export const NON_VALUE_SEARCH_MODES = ['__MATCH_FULL_ROWS__', '__MATCH_EMPTY_ROWS__'];

export const USER_GLOBAL_PICKLIST = [
  'COMPANY__ASSIGNED_TO',
  'ACTIVITY__ASSIGNED_TO',
  'LEAD__ASSIGNED_TO',
  'TASK__ASSIGNED_TO',
];

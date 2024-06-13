import {
  MULTIPICKLIST_FILTERS,
  RELATIVE_DATES_OPTIONS,
  USER_GLOBAL_PICKLIST,
} from '../constants/filtersModal';
import {
  addYears,
  endOfDay,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
} from 'date-fns';

export const wrapValues = value => {
  if (value === undefined || value === null || value === '') {
    return [];
  }
  if (!Array.isArray(value)) {
    return [value];
  }
  return value;
};

const getMultiPicklistValue = (value, field) => {
  const values = wrapValues(value?.value);
  const length = values?.length;
  const totalCount = USER_GLOBAL_PICKLIST.includes(field.logicRole)
    ? field?.fieldValues?.length + 1
    : field?.fieldValues?.length;
  const texts = values?.map(v =>
    v === '__me__'
      ? 'Me'
      : field.fieldValues?.find(picklistValue => picklistValue?.value === v)?.label,
  );
  if (length === 0) return '';
  if (length === 1) return texts[0];
  if (length === totalCount) return 'All selected';
  return `${texts[length - 1]} and ${length - 1} other`;
};

export const renderDisplayValue = (value, field) => {
  if (!value || !value.type) {
    return '';
  }
  if (value.type && !value.value) {
    return MULTIPICKLIST_FILTERS[value.type];
  }
  if (value.type === 'EXACT__SEARCH') {
    return `${MULTIPICKLIST_FILTERS[value?.type]} ${getMultiPicklistValue(value, field)}`;
  }
  if (value.type === 'RANGE__SEARCH__BETWEEN__DATES') {
    if (value.value.type === 'custom') {
      if (value.value.start && value.value.end) {
        return `From ${value.value.start} to ${value.value.end}`;
      }
      if (value.value.start) {
        return `From ${value.value.start}`;
      }
      if (value.value.end) {
        return `To ${value.value.end}`;
      }
    }
    return RELATIVE_DATES_OPTIONS[value.value.type];
  }
  return `${MULTIPICKLIST_FILTERS[value?.type]} ${
    value?.value === '__me__'
      ? 'Me'
      : field.fieldValues?.find(picklistValue => picklistValue.value === value.value)?.label
  }`;
};

const WEEK_STARTS_ON_MONDAY = { weekStartsOn: 1 };
const dateRangeToQuery = dateRange => {
  let range;
  const TODAY = new Date();
  const START_OF_TIME = new Date(-8640000000000000);
  switch (dateRange) {
    case 'today':
      range = {
        start: startOfDay(TODAY),
        end: endOfDay(TODAY),
      };
      break;
    case 'this_week':
      range = {
        start: startOfWeek(TODAY, WEEK_STARTS_ON_MONDAY),
        end: endOfWeek(TODAY, WEEK_STARTS_ON_MONDAY),
      };
      break;
    case 'this_month':
      range = {
        start: startOfMonth(TODAY),
        end: endOfMonth(TODAY),
      };
      break;
    case 'this_quarter':
      range = {
        start: startOfQuarter(TODAY),
        end: endOfQuarter(TODAY),
      };
      break;
    case 'this_year':
      range = {
        start: startOfYear(TODAY),
        end: endOfYear(TODAY),
      };
      break;
    case 'all_time':
      range = {
        start: START_OF_TIME,
        end: addYears(TODAY, 5),
      };
      break;
    default:
      range = {
        start: null,
        end: null,
      };
  }
  return range;
};

export const rangeToQuery = query => {
  let rangeQuery;
  switch (query?.type) {
    case 'RANGE__SEARCH__GT':
      rangeQuery = {
        query: {
          gt: query?.value,
        },
        searchMode: 'RANGE__SEARCH',
        type: query?.type || query?.value?.type,
        searchType: query.type,
      };
      break;
    case 'RANGE__SEARCH__GTE':
      rangeQuery = {
        query: {
          gte: query?.value,
        },
        searchMode: 'RANGE__SEARCH',
        type: query?.type || query?.value?.type,
        searchType: query.type,
      };
      break;

    case 'RANGE__SEARCH__LTE':
      rangeQuery = {
        query: {
          lte: query?.value,
        },
        searchMode: 'RANGE__SEARCH',
        type: query?.type || query?.value?.type,
        searchType: query.type,
      };
      break;
    case 'RANGE__SEARCH__LT':
      rangeQuery = {
        query: {
          lt: query?.value,
        },
        searchMode: 'RANGE__SEARCH',
        type: query?.type || query?.value?.type,
        searchType: query.type,
      };
      break;
    case 'RANGE__SEARCH__BETWEEN':
      rangeQuery = {
        query: {
          gte: query?.value?.start,
          lte: query?.value?.end,
        },
        searchMode: 'RANGE__SEARCH',
        type: query?.type || query?.value?.type,
        searchType: query.type,
      };
      break;
    case 'RANGE__SEARCH__BETWEEN__DATES':
      if (Object.keys(RELATIVE_DATES_OPTIONS).includes(query?.value)) {
        const range = dateRangeToQuery(query?.value);
        rangeQuery = {
          query: {
            gte: range.start,
            lte: range.end,
          },
          searchMode: 'RANGE__SEARCH',
          type: query?.value?.type,
          searchType: query.type,
        };
      } else {
        rangeQuery = {
          query: {
            gte: query?.value?.start || query?.value.split(',')[0],
            lte: query?.value?.end || query?.value.split(',')[1],
          },
          searchMode: 'RANGE__SEARCH',
          type: query?.value?.type,
          searchType: query.type,
        };
      }
      break;
    default:
      rangeQuery = {
        query: query?.value,
        searchMode: query?.type,
        type: query?.value?.type,
        searchType: query?.type,
      };
  }
  return rangeQuery;
};

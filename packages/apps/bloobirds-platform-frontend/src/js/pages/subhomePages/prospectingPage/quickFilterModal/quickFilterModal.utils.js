import { RELATIVE_DATES_OPTIONS } from '../../../../components/bobjectTable/viewEditionModal/viewEdition.constants';
import { isObject } from 'lodash';
import { FilterType, SearchType } from '../../../../typings/moreFilters';

const RANGE_TYPES = [
  SearchType.RANGE_GT,
  SearchType.RANGE_GTE,
  SearchType.RANGE_LT,
  SearchType.RANGE_LTE,
];

const RELATIVE_DATES = [
  FilterType.TODAY,
  FilterType.THIS_WEEK,
  FilterType.THIS_MONTH,
  FilterType.THIS_QUARTER,
  FilterType.THIS_YEAR,
  FilterType.ALL_TIME,
  FilterType.YESTERDAY,
  FilterType.LAST_WEEK,
  FilterType.LAST_MONTH,
  FilterType.LAST_QUARTER,
  FilterType.LAST_YEAR,
];

export const filtersToRequest = ({ filters, bobjectFields }) => {
  if (!filters || !isObject(filters) || !bobjectFields) {
    return {};
  }

  // TODO: refactor this
  return Object.keys(filters).map(key => {
    let filter = filters[key];
    if (Array.isArray(filter)) {
      if (typeof filter[0] === 'string') {
        return {
          bobjectFieldId: bobjectFields?.findByLogicRole(key)?.id,
          values: filter,
          searchType: 'EXACT__SEARCH',
        };
      }
      filter = filter[0];
    }
    let searchType;
    if (!filter?.searchMode) {
      searchType = filter.type || 'EXACT__SEARCH';
      if (filter?.value) {
        if (searchType === 'RANGE__SEARCH__BETWEEN') {
          filter = [filter?.value?.start, filter?.value?.end];
        } else {
          filter = [filter.value];
        }
      }
      if (filter?.query) {
        if (RANGE_TYPES.includes(searchType)) {
          filter = [filter?.query?.start];
        }
      }
    } else if (RELATIVE_DATES.includes(filter?.searchMode)) {
      searchType = filter?.type;

      if (filter?.query) {
        filter = [filter?.value?.start, filter?.value?.end];
      }
    } else if (filter?.searchMode === 'RANGE__SEARCH' || filter?.searchMode === 'custom') {
      searchType = filter?.searchType;
      if (
        searchType === 'RANGE__SEARCH__BETWEEN' ||
        searchType === 'RANGE__SEARCH__BETWEEN__DATES'
      ) {
        filter = Object.keys(RELATIVE_DATES_OPTIONS).includes(filter.type)
          ? [filter?.type]
          : [filter?.query?.gte, filter?.query?.lte];
      } else if (RANGE_TYPES.includes(searchType)) {
        filter = [
          filter?.query?.gte || filter?.query?.lte || filter?.query?.lt || filter?.query?.gt,
        ];
      } else if (searchType?.match('^__\\w*__$')) {
        filter = [searchType];
      } else {
        filter = [filter];
      }
    } else if (filter?.searchMode === 'RANGE__SEARCH__CUSTOM_DATE') {
      return {
        bobjectFieldId: bobjectFields?.findByLogicRole(key)?.id || key,
        values: [filter?.customDate] || null,
        searchType: filter?.type,
      };
    } else {
      searchType = filter?.searchMode;
      filter = Array.isArray(filter?.query) ? filter?.query : [filter?.query];
    }

    return {
      bobjectFieldId: bobjectFields?.findByLogicRole(key)?.id || key,
      values: (Array.isArray(filter) ? filter : [filter]) || null,
      searchType: searchType || '',
    };
  });
};

export function parseQuickFilterKeys(filters) {
  const parsedFilters = { ...filters };
  Object.keys(parsedFilters).forEach(key => {
    if (parsedFilters[key]?.type === 'RANGE__SEARCH__LT') {
      parsedFilters[key] = {
        searchMode: 'RANGE__SEARCH',
        query: { lt: parsedFilters[key]?.query?.end || parsedFilters[key]?.query?.lt },
      };
    } else if (parsedFilters[key]?.type === 'RANGE__SEARCH__GT') {
      parsedFilters[key] = {
        searchMode: 'RANGE__SEARCH',
        query: { gt: parsedFilters[key]?.query?.start || parsedFilters[key]?.query?.gt },
      };
    } else if (parsedFilters[key]?.type === 'RANGE__SEARCH__LTE') {
      parsedFilters[key] = {
        searchMode: 'RANGE__SEARCH',
        query: { lte: parsedFilters[key]?.query?.end || parsedFilters[key]?.query?.lte },
      };
    } else if (parsedFilters[key]?.type === 'RANGE__SEARCH__GTE') {
      parsedFilters[key] = {
        searchMode: 'RANGE__SEARCH',
        query: { gte: parsedFilters[key]?.query?.start || parsedFilters[key]?.query?.gte },
      };
    } else if (
      parsedFilters[key]?.type === 'RANGE__SEARCH__BETWEEN' ||
      parsedFilters[key]?.type === 'RANGE__SEARCH__BETWEEN__DATES'
    ) {
      parsedFilters[key] = {
        searchMode: 'RANGE__SEARCH',
        query: {
          gte: parsedFilters[key]?.query?.start || parsedFilters[key]?.query?.gte,
          lte: parsedFilters[key]?.query?.end || parsedFilters[key]?.query?.lte,
        },
      };
    }
  });

  return parsedFilters;
}

export const getModalTitle = ({ isCreation, isEdit, isEditName }) => {
  if ((isEdit && isCreation) || isEditName) {
    return 'Edit quick filter name';
  }
  if (isCreation) {
    return 'Save as new quick filter';
  }
  return 'Update quick filter';
};

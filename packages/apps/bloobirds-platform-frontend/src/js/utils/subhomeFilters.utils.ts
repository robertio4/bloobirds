import { useLocation } from 'react-router';

import { BobjectTypes, FIELDS_LOGIC_ROLE, MainBobjectTypes } from '@bloobirds-it/types';
import spacetimeClass, { TimeUnit } from 'spacetime';

import { Filter, FiltersBobjectTypes, RelativeDateFilterValue } from '../hooks/useSubhomeFilters';
import {
  FilterType,
  MatchRows,
  RelativesDate,
  SearchMode,
  SearchType,
  SearchTypeByKey,
} from '../typings/subhomeFilters';
import { isEmptyObject, isObject } from './objects.utils';

interface DateRange {
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
}

const START_OF_TIME = 43200;

const getTypeFromValue = (value: any) => {
  if (!isObject(value)) {
    return '';
  }
  const keys = Object.keys(value);

  if (keys.length === 1) {
    return SearchTypeByKey[keys[0] as any];
  }

  return SearchType.RANGE_BETWEEN;
};

const getSearchTypeFromQuickFilter = (value: any) => {
  if (!value) return '';
  const keys = Object.keys(value?.query || {});

  const keysOfRange = keys?.length;
  let searchType = value?.searchMode || SearchMode.EXACT;
  if (keysOfRange === 1 && SearchTypeByKey[keys[0] as any]) {
    searchType = SearchTypeByKey[keys[0] as any];
  }
  if (value?.searchMode === SearchMode.RANGE && keysOfRange > 1) {
    searchType = SearchType.RANGE_BETWEEN;
  }

  return searchType;
};

const getValueFromQuickFilter = (value: any) => {
  if (!value) return '';
  const { searchMode } = value;

  switch (searchMode) {
    case SearchMode.RANGE: {
      return Object.keys(value?.query)?.map((prop: string) => value?.query[prop]);
    }
    case SearchMode.AUTOCOMPLETE:
    case SearchMode.EXACT:
    case SearchMode.NOT: {
      return Array.isArray(value?.query) ? value.query : [value?.query];
    }
  }
  return '';
};

const parseRelativeDates = (relativeDate: string) => {
  const spacetime = spacetimeClass();
  switch (relativeDate) {
    case RelativesDate.ALL_TIME:
      return {
        gte: spacetimeClass(START_OF_TIME).format('iso'),
        lte: spacetimeClass.now().add(5, 'year').format('iso'),
      };
    case RelativesDate.LAST_MONTH:
    case RelativesDate.LAST_QUARTER:
    case RelativesDate.LAST_YEAR:
    case RelativesDate.LAST_WEEK: {
      const lastTimeKey = relativeDate.split('_')[1] as TimeUnit;

      return {
        gte: spacetime.subtract(1, lastTimeKey).startOf(lastTimeKey).format('iso'),
        lte: spacetime.subtract(1, lastTimeKey).endOf(lastTimeKey).format('iso'),
      };
    }
    case RelativesDate.THIS_MONTH:
    case RelativesDate.THIS_QUARTER:
    case RelativesDate.THIS_WEEK:
    case RelativesDate.THIS_YEAR: {
      const thisTimeKey = relativeDate.split('_')[1] as TimeUnit;

      return {
        gte: spacetime.startOf(thisTimeKey).format('iso'),
        lte: spacetime.endOf(thisTimeKey).format('iso'),
      };
    }
    case RelativesDate.TODAY:
      return {
        gte: spacetime.startOf('day').format('iso'),
        lte: spacetime.endOf('day').format('iso'),
      };
    case RelativesDate.YESTERDAY:
      return {
        gte: spacetime.subtract(1, 'day').startOf('day').format('iso'),
        lte: spacetime.subtract(1, 'day').endOf('day').format('iso'),
      };
    case RelativesDate.NEXT_7_DAYS:
      return {
        lte: spacetime.add(7, 'day').endOf('day').format('iso'),
        gte: spacetimeClass.now().startOf('day').format('iso'),
      };
    case RelativesDate.NEXT_30_DAYS:
      return {
        lte: spacetime.add(30, 'day').endOf('day').format('iso'),
        gte: spacetimeClass.now().startOf('day').format('iso'),
      };
    case RelativesDate.SINCE_TODAY:
      return {
        lte: spacetimeClass.now().add(5, 'year').format('iso'),
        gte: spacetime.startOf('day').format('iso'),
      };
    case RelativesDate.MORE_THAN_6_MONTHS:
      return {
        lte: spacetimeClass.now().subtract(6, 'month').format('iso'),
      };
    case RelativesDate.NEXT_6_MONTHS:
      return {
        lte: spacetimeClass.now().add(6, 'month').format('iso'),
        gte: spacetime.startOf('day').format('iso'),
      };
    case RelativesDate.UNTIL_NOW:
      return {
        lte: spacetime.endOf('day').format('iso'),
        gte: spacetimeClass.now().subtract(5, 'year').format('iso'),
      };
    default:
      return {};
  }
};

export const parsedDateValueToRelativeDates = (dateValue: DateRange) => {
  const endDate = spacetimeClass(dateValue?.lt || dateValue?.lte);
  const startDate = spacetimeClass(dateValue?.gt || dateValue?.gte);

  if (spacetimeClass.now().diff(endDate.endOf('day'), 'day') === 0) {
    return RelativesDate.UNTIL_NOW;
  }

  if (spacetimeClass.now().diff(endDate.endOf('day'), 'day') === 7) {
    return RelativesDate.NEXT_7_DAYS;
  }

  if (spacetimeClass.now().diff(endDate.endOf('day'), 'day') === 30) {
    return RelativesDate.NEXT_30_DAYS;
  }

  if (spacetimeClass.now().diff(startDate.endOf('day'), 'month') === 6) {
    return RelativesDate.MORE_THAN_6_MONTHS;
  }

  if (spacetimeClass(START_OF_TIME).diff(startDate, 'day') === 0) {
    return RelativesDate.ALL_TIME;
  }

  return RelativesDate.SINCE_TODAY;
};

const parseFilterRangeValue = (data: any) => {
  if (!data) return '';

  const { type } = data;

  switch (type) {
    case FilterType.RANGE_BETWEEN:
      return {
        query: {
          gte: data.value.start,
          lte: data.value.end,
        },
        searchMode: SearchMode.RANGE,
      };
    case FilterType.RANGE_LT:
      return {
        query: {
          lt: data.value,
        },
        searchMode: SearchMode.RANGE,
      };
    case FilterType.RANGE_LTE:
      return {
        query: {
          lte: data.value,
        },
        searchMode: SearchMode.RANGE,
      };
    case FilterType.RANGE_GT:
      return {
        query: {
          gt: data.value,
        },
        searchMode: SearchMode.RANGE,
      };
    case FilterType.RANGE_GTE:
      return {
        query: {
          gte: data.value,
        },
        searchMode: SearchMode.RANGE,
      };
    case FilterType.EXACT:
      return {
        searchMode: SearchMode.EXACT,
        query: data.value,
      };
    case FilterType.NOT_EMPTY:
    case MatchRows.FULL:
      return [MatchRows.FULL];
    case FilterType.EMPTY:
    case MatchRows.EMPTY:
      return [MatchRows.EMPTY];
    default:
      return '';
  }
};

export const parseFilterRelativeDateValue = (data: any) => {
  if (!data) return '';

  return {
    query: {
      gte: spacetimeClass(data?.start).format('iso'),
      lte: spacetimeClass(data?.end).format('iso'),
    },
    searchMode: SearchMode.RANGE,
  };
};

const parseFilterRangeValueToFilter = (data: any) => {
  if (!data) return '';

  const { query } = data;

  if (!query) return '';
  const numOfKeys = Object.keys(query)?.length;

  if (numOfKeys === 1) {
    if (query?.gte) {
      return {
        type: FilterType.RANGE_GTE,
        value: query?.gte,
      };
    }
    if (query?.lte) {
      return {
        type: FilterType.RANGE_LTE,
        value: query?.lte,
      };
    }
    if (query?.gt) {
      return {
        type: FilterType.RANGE_GT,
        value: query?.gt,
      };
    }
    if (query?.lt) {
      return {
        type: FilterType.RANGE_LT,
        value: query?.lt,
      };
    }
  } else if (numOfKeys === 2) {
    return {
      type: FilterType.RANGE_BETWEEN,
      value: {
        start: query?.gte,
        end: query?.lte,
      },
    };
  }
};

const parseFilterExactValueToFilter = (data: Filter) => {
  if (!data) return '';

  return {
    type: FilterType.EXACT,
    value: data?.query,
  };
};

const parseQuickFilterValue = (value: any) => {
  if (!value) return '';

  const { searchType } = value;
  // IF the value is a string, and it's one of the values of the RelativeDate enum, we return the value
  if (Object.values(RelativesDate).includes(value?.bobjectPicklistValue)) {
    return value?.bobjectPicklistValue;
  }
  switch (searchType) {
    case SearchType.RANGE_BETWEEN_DATES: {
      if (value?.query) {
        return value;
      }
      if (Object.values(RelativesDate).includes(value?.bobjectPicklistValue)) {
        return {
          query: parseRelativeDates(value?.bobjectPicklistValue),
          searchMode: SearchMode.RANGE,
        };
      }
      const [dateA, dateB] = value?.bobjectPicklistValue?.split(',') || [];
      return {
        query: {
          lte: dateA > dateB ? dateA : dateB,
          gte: dateA > dateB ? dateB : dateA,
        },
        searchMode: SearchMode.RANGE,
      };
    }
    case SearchType.RANGE_GT:
      return {
        query: {
          gt: value?.bobjectPicklistValue,
        },
        searchMode: SearchMode.RANGE,
      };
    case SearchType.RANGE_GTE:
      return {
        query: {
          gte: value?.bobjectPicklistValue,
        },
        searchMode: SearchMode.RANGE,
      };
    case SearchType.RANGE_LT:
      return {
        query: {
          lt: value?.bobjectPicklistValue,
        },
        searchMode: SearchMode.RANGE,
      };
    case SearchType.RANGE_LTE:
      return {
        query: {
          lte: value?.bobjectPicklistValue,
        },
        searchMode: SearchMode.RANGE,
      };
    case SearchType.RANGE_BETWEEN: {
      const [dateA, dateB] = value?.bobjectPicklistValue?.split(',') || [];
      return {
        query: {
          lte: dateA > dateB ? dateA : dateB,
          gte: dateA > dateB ? dateB : dateA,
        },
        searchMode: SearchMode.RANGE,
      };
    }
    case SearchType.EXACT: {
      if (value?.bobjectPicklistValue === MatchRows.FULL) return MatchRows.FULL;
      if (value?.bobjectPicklistValue === MatchRows.EMPTY) return MatchRows.EMPTY;
      return { query: value?.bobjectPicklistValue, searchMode: SearchMode.EXACT };
    }
    case SearchType.NOT:
      return {
        query: value?.bobjectPicklistValue,
        searchMode: SearchMode.NOT,
      };
    case SearchType.AUTOCOMPLETE:
      return {
        query: value?.bobjectPicklistValue,
        searchMode: SearchMode.AUTOCOMPLETE,
      };
  }
};

const parseSubqueriesValues = (subqueriesValues: any) =>
  Object.keys(subqueriesValues)?.reduce((parsedValues: any, filterKey: any) => {
    const filterValue = subqueriesValues[filterKey];
    const value = filterValue?.query ? filterValue : { query: filterValue };
    return { ...parsedValues, [filterKey]: value };
  }, {});

const replaceConditionalFields = (filters: Filter) => {
  return Object.keys(filters)?.reduce((newFilters: any, filterId: string) => {
    const value = filters[filterId] as string;
    newFilters = { ...newFilters, [filterId]: value };
    return newFilters;
  }, {});
};

export const removeFiltersById = (filters: any, filtersIds: string[]) => {
  return Object.keys(filters)?.reduce((newFilters: any, bobjectType: any) => {
    const filtersByBobjectType = filters[bobjectType];
    if (filtersByBobjectType && Object.keys(filtersByBobjectType).length) {
      Object.keys(filtersByBobjectType).forEach((fieldId: string) => {
        if (filtersIds.includes(fieldId)) {
          const filtersByBobjectType = { ...newFilters[bobjectType] };
          delete filtersByBobjectType[fieldId];
          newFilters = {
            ...newFilters,
            [bobjectType]: {
              ...filtersByBobjectType,
            },
          };
        } else {
          newFilters = {
            ...newFilters,
            [bobjectType]: {
              ...newFilters[bobjectType],
              [fieldId]: filtersByBobjectType[fieldId],
            },
          };
        }
      });
    } else {
      newFilters = {
        ...newFilters,
        [bobjectType]: {},
      };
    }
    return { ...newFilters };
  }, {});
};

export const transformFiltersToFiltersState = (
  filterValue: string[] | string | RelativeDateFilterValue,
) => {
  let value;
  const isInputPickerValue =
    filterValue &&
    isObject(filterValue) &&
    // @ts-ignore
    (!!filterValue?.value || [MatchRows.EMPTY, MatchRows.FULL].includes(filterValue?.type));
  // @ts-ignore
  const isRelativeDatePickerValue = filterValue && isObject(filterValue) && !!filterValue?.start;
  if (isInputPickerValue) {
    value = parseFilterRangeValue(filterValue);
  } else if (isRelativeDatePickerValue) {
    value = parseFilterRelativeDateValue(filterValue);
  } else {
    value = filterValue;
  }
  //removes undefined values in case necessary
  if (Array.isArray(value) && value.includes(undefined)) {
    value = value.filter(item => item !== undefined);
  }

  return value;
};

export const transformFilterStateToFilter = (filter: Filter) => {
  if (!filter) return undefined;

  const { searchMode } = filter;

  if (searchMode === SearchMode.RANGE) {
    // refactor for date relative filters
    // const relativeDate = parsedDateValueToRelativeDates(filter?.value);

    return parseFilterRangeValueToFilter(filter);
  }
  if (searchMode === SearchMode.EXACT) {
    return parseFilterExactValueToFilter(filter);
  }

  return filter;
};

export const transformQuickFiltersToFilters = (
  filters: any[],
  bobjectFields: any,
  bobjectTypes: any,
) => {
  return filters?.reduce((query: any, filter: any) => {
    const filterValue = filter.values;
    const fieldObject = bobjectFields?.get(filter.bobjectFieldId);
    const bobjectType = bobjectTypes?.get(fieldObject?.bobjectType);
    const parsedValues = filterValue?.map((value: any) => parseQuickFilterValue(value));

    if (!parsedValues || !parsedValues.length) return query;
    // IF parsed values is an array of objects with query and searchMode, we need to join them grouped by searchMode
    if (
      Array.isArray(parsedValues) &&
      parsedValues?.length > 1 &&
      isObject(parsedValues[0]) &&
      parsedValues[0]?.query
    ) {
      const queryValues = parsedValues.map((pv: any) => pv.query);

      return {
        ...query,
        [bobjectType?.name]: {
          ...query[bobjectType?.name],
          [filter.bobjectFieldId]: { query: queryValues, searchMode: parsedValues[0]?.searchMode },
        },
      };
    }

    return {
      ...query,
      [bobjectType?.name]: {
        ...query[bobjectType?.name],
        [filter.bobjectFieldId]:
          Array.isArray(parsedValues) && parsedValues?.length === 1
            ? parsedValues[0]
            : parsedValues,
      },
    };
  }, {});
};

export const transformMoreFiltersToFilters = (
  filters: any[],
  bobjectFields: any,
  bobjectTypes: any,
) => {
  const fieldsIds = Object.keys(filters);

  return fieldsIds?.reduce((query: any, fieldId: any) => {
    const filterValue = filters[fieldId];
    const fieldObject = bobjectFields?.get(fieldId);

    const bobjectType = bobjectTypes?.get(fieldObject?.bobjectType);
    const isRangeValue = filterValue && isObject(filterValue);
    const isArrayValue = Array.isArray(filterValue);
    const isExactValue = filterValue.searchMode === SearchMode.EXACT;

    let parsedValue;

    if (isRangeValue && !isExactValue) {
      parsedValue = filterValue?.searchType
        ? {
            query: filterValue?.query,
            searchMode: filterValue?.searchMode,
            searchType: filterValue?.searchType,
            type: filterValue?.type,
          }
        : {
            query: filterValue?.query,
            searchMode: filterValue?.searchMode,
          };
    } else if (isExactValue) {
      parsedValue = filterValue.query;
    } else if (isArrayValue) {
      const firstValue = filterValue[0];
      const firstValueIsRangeValue = firstValue && isObject(firstValue);

      if (firstValueIsRangeValue) {
        parsedValue = firstValue;
      } else {
        parsedValue = isObject(firstValue) ? filterValue[0]?.query : filterValue;
      }
    } else {
      parsedValue = filterValue;
    }

    return {
      ...query,
      [bobjectType?.name]: {
        ...query[bobjectType?.name],
        [fieldId]: parsedValue,
      },
    };
  }, {});
};

export const transformFiltersToMoreFilters = (filters: Record<BobjectTypes, any>): any[] => {
  return Object.keys(filters).reduce((moreFilters: any, bobjectType: string) => {
    const isBobjectType = Object.values(BobjectTypes).includes(bobjectType as BobjectTypes);
    const filtersByBobjectType = filters[bobjectType as BobjectTypes];
    if (
      isBobjectType &&
      typeof filtersByBobjectType === 'object' &&
      Object.keys(filtersByBobjectType).length
    ) {
      Object.keys(filtersByBobjectType).forEach((fieldId: string) => {
        const fieldValue = filtersByBobjectType[fieldId];
        const isRangeValue = fieldValue && isObject(fieldValue);
        const isMatchValue = [MatchRows.EMPTY, MatchRows.FULL].includes(fieldValue);
        const isRelativeDateValue =
          fieldValue &&
          (Object.values(RelativesDate).includes(fieldValue?.type as RelativesDate) ||
            Object.values(RelativesDate).includes(fieldValue as RelativesDate));
        const isExactValue = fieldValue && isRangeValue && fieldValue.type === SearchMode.EXACT;
        const isAutocompleteValue = fieldValue && fieldValue.searchMode === SearchMode.AUTOCOMPLETE;
        let filterValue;

        if (isMatchValue) {
          filterValue = [fieldValue];
        } else if (
          Array.isArray(fieldValue) &&
          [MatchRows.EMPTY, MatchRows.FULL].includes(fieldValue[0])
        ) {
          filterValue = fieldValue?.map((value: string) => value);
        } else if (isRelativeDateValue) {
          const parsedDates =
            typeof fieldValue === 'string' ? parseRelativeDates(fieldValue) : fieldValue.query;
          filterValue = {
            query: Object.keys(parsedDates)?.reduce(
              (acc: any, key: string) => ({ ...acc, [key]: new Date(parsedDates[key]) }),
              {},
            ),
            searchMode: SearchMode.RANGE,
            searchType: SearchType.RANGE_BETWEEN_DATES,
            type: fieldValue?.type || fieldValue,
          };
        } else if (isAutocompleteValue) {
          filterValue = {
            query: fieldValue?.query,
            searchMode: SearchMode.AUTOCOMPLETE,
          };
        } else if (!isRangeValue || isExactValue) {
          filterValue = {
            query: isExactValue ? fieldValue?.value : fieldValue,
            searchMode: SearchMode.EXACT,
          };
        } else {
          filterValue = {
            query: fieldValue.query,
            searchMode: fieldValue.searchMode,
            searchType: fieldValue?.searchType
              ? fieldValue?.searchType
              : getTypeFromValue(fieldValue?.query),
            type: fieldValue?.type,
          };
        }

        moreFilters = { ...moreFilters, [fieldId]: filterValue };
      });
    }

    return moreFilters;
  }, {});
};

export const transformFiltersToQuickFilters = (filters: any) => {
  if (!filters) return {};

  return Object.keys(filters).reduce((quickFilters: any, bobjectType: string) => {
    const filtersByBobjectType = replaceConditionalFields(filters[bobjectType]);
    if (filtersByBobjectType && Object.keys(filtersByBobjectType).length) {
      Object.keys(filtersByBobjectType).forEach((fieldId: string) => {
        const fieldValue = filtersByBobjectType[fieldId];
        const isRangeValue = fieldValue && isObject(fieldValue);
        const isMatchValue = [MatchRows.EMPTY, MatchRows.FULL].includes(fieldValue);
        let filterValues;
        if (isMatchValue) {
          filterValues = [fieldValue];
        } else {
          filterValues = !isRangeValue ? fieldValue : getValueFromQuickFilter(fieldValue);
        }
        quickFilters = [
          ...quickFilters,
          {
            bobjectFieldId: fieldId,
            values: Array.isArray(filterValues) ? filterValues : [filterValues],
            searchType: getSearchTypeFromQuickFilter(
              Array.isArray(fieldValue) ? fieldValue[0] : fieldValue,
            ),
          },
        ];
      });
    }
    return quickFilters;
  }, []);
};

export const transformFiltersToQuery = (
  filters: any,
  mainBobject: FiltersBobjectTypes,
  bobjectFields: any,
) => {
  return Object.keys(filters).reduce((query: any, bobjectType: string) => {
    const bobjectTypeFilters = replaceConditionalFields(filters[bobjectType]);
    const parsedFilters = Object.keys(bobjectTypeFilters).reduce(
      (parsedFilters: any, fieldId: string) => {
        const fieldValue = bobjectTypeFilters[fieldId];
        const isRelativeDateValue =
          fieldValue && Object.values(RelativesDate).includes(fieldValue as RelativesDate);
        const isRangeValue = fieldValue && isObject(fieldValue);
        const isDateRange = fieldValue && (fieldValue?.lte || fieldValue?.gt);

        if (!isRelativeDateValue && !isRangeValue) {
          return { ...parsedFilters, [fieldId]: fieldValue };
        } else if (!isRelativeDateValue && isRangeValue) {
          let value = !isObject(fieldValue) ? { query: fieldValue } : fieldValue;
          if (isDateRange) {
            value = {
              query: fieldValue,
              searchMode: SearchMode.RANGE,
            };
          }
          return { ...parsedFilters, [fieldId]: value || fieldValue?.value };
        } else {
          const value = {
            query: parseRelativeDates(fieldValue as string),
            searchMode: SearchMode.RANGE,
            searchType: SearchType.RANGE_BETWEEN,
            type: SearchType.RANGE_BETWEEN,
          };
          return { ...parsedFilters, [fieldId]: value };
        }
      },
      {},
    );

    if (bobjectType === mainBobject) {
      query = { ...query, ...parsedFilters };
    } else {
      const referencedFieldLogicRole =
        FIELDS_LOGIC_ROLE[mainBobject as BobjectTypes][
          bobjectType.toUpperCase() as Uppercase<Exclude<MainBobjectTypes, typeof mainBobject>>
        ];
      const referencedField = bobjectFields.findByLogicRole(referencedFieldLogicRole);

      query = {
        ...query,
        ...(!isEmptyObject(parsedFilters) && referencedField
          ? {
              [referencedField?.id]: {
                query: {
                  ...parseSubqueriesValues(parsedFilters),
                },
                searchMode: 'SUBQUERY__SEARCH',
              },
            }
          : {}),
      };
    }
    return query;
  }, {});
};

export const subhomeAvailableBobjectTypes = (hasSalesEnabled: boolean) => {
  const isSales = useLocation()?.pathname?.includes('/sales');
  const isOuboxWithSales = useLocation()?.pathname?.includes('/outbox') && hasSalesEnabled;
  if (isSales || isOuboxWithSales) {
    return [BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity];
  } else {
    return [BobjectTypes.Company, BobjectTypes.Lead];
  }
};

export const resetFiltersByBobjectType = (
  bobjectTypes: BobjectTypes[] | MainBobjectTypes[],
  filters: any,
) => {
  const availableBobjectTypes = [BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity];

  const includedBobjectTypes: BobjectTypes[] = availableBobjectTypes.filter(bobjectType =>
    // @ts-ignore
    bobjectTypes.includes(bobjectType),
  );

  const bobjectFilters: any = {};

  includedBobjectTypes.forEach(bobjectType => (bobjectFilters[bobjectType] = {}));
  bobjectFilters.conditions = { relatedBobjectType: bobjectTypes };

  return { ...filters, ...bobjectFilters };
};

export const transformFilterBobjectTypeToORsState = (
  bobjectType: FiltersBobjectTypes | FiltersBobjectTypes[],
) => {
  if (!Array.isArray(bobjectType)) {
    if (['Task', 'Activity'].includes(bobjectType) || !bobjectType) return [];
    return [bobjectType] as MainBobjectTypes[];
  } else {
    return bobjectType.filter(type => ['Task', 'Activity'].includes(type)) as MainBobjectTypes[];
  }
};

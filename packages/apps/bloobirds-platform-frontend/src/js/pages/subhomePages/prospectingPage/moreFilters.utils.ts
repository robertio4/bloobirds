import { MatchRows, SearchMode } from '../../../typings/moreFilters';

export const replaceIdByLogicRole = (filters: object, bobjectFields: any, bobjectTypes: any) =>
  Object.keys(filters)
    .map(key => {
      const tagRegex = /_[A-Z][a-z]*_/;
      const logicRoleRegex = /[A-Z][a-z]*__/;
      const hasTag = tagRegex.test(key);
      const keyIsALogicRole = logicRoleRegex.test(key);
      const filterLogicRole = bobjectFields.get(key)?.logicRole;
      const filterType = bobjectFields.get(key)?.bobjectType;
      const filterTypeName = bobjectTypes.get(filterType)?.name;
      const filterKey = `_${filterTypeName}_${key}`;
      const fieldId = !hasTag && !keyIsALogicRole ? filterLogicRole || filterKey : key;
      return { [fieldId]: filters[key] };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

export const isAMatchValue = (value: MatchRows) =>
  [MatchRows.EMPTY, MatchRows.FULL].includes(value);

// TODO: add unit test
export const parseMoreFilterValue = (filterKey: string, filterValue: any) => {
  const { query, searchMode, searchType, type } = filterValue;
  const value = Array.isArray(query) ? query[0] : query || filterValue;

  if (filterValue?.isParsed) {
    return { [filterKey]: filterValue };
  }

  switch (searchMode) {
    case SearchMode.RANGE:
      return {
        [filterKey]: {
          query: {
            start: query?.gte || query?.gt || query?.start,
            end: query?.lte || query?.lt || query?.end,
            type: searchType ? type : query?.type,
          },
          type: searchType,
          searchMode: searchType ? type : searchMode,
          isParsed: true,
        },
      };
    case SearchMode.AUTOCOMPLETE:
    case SearchMode.NOT:
      return {
        [filterKey]: {
          query: value,
          searchMode,
          isParsed: true,
        },
      };
    case SearchMode.EXACT:
    default:
      return { [filterKey]: isAMatchValue(value) ? value : { searchMode, query, isParsed: true } };
  }
};

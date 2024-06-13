import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useSessionStorage } from '@bloobirds-it/hooks';
import {
  BobjectType,
  BobjectTypes,
  Filter,
  FiltersBobjectTypes,
  FiltersType,
  FiltersWithLoaderFlag,
  MainBobjectTypes,
  QuickFilter,
  RelativeDateFilterValue,
} from '@bloobirds-it/types';
import { getBobjectFromLogicRole, isEqual, mergeTwoObjects } from '@bloobirds-it/utils';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

import {
  parseFilterRelativeDateValue,
  removeFiltersById,
  resetFiltersByBobjectType,
  transformFilterBobjectTypeToORsState,
  transformFilterStateToFilter,
  transformFiltersToFiltersState,
  transformMoreFiltersToFilters,
  transformQuickFiltersToFilters,
} from '../utils/filters.utils';

export interface Filters {
  bobjectType: FiltersBobjectTypes;
  filters: FiltersWithLoaderFlag;
  defaultFilters: FiltersType;
  haveFiltersBeenChanged: boolean;
  key: string;
  selectedQuickFilter: QuickFilter;
  getFilterValue: (filterLR: string) => any;
  removeSelectedQuickFilter: (quickfilter: QuickFilter) => void;
  resetFilters: () => void;
  setFilters: (x: any) => void;
  setFilterConditions: (key: string, value: string | MainBobjectTypes | MainBobjectTypes[]) => void;
  setBobjectType: (bobjectType: FiltersBobjectTypes) => void;
  setFilter: (bobjectType: FiltersBobjectTypes, fieldLR: string, filter: string[] | string) => void;
  setORsFilters: (
    id: string,
    value: string,
    bobjectType: FiltersBobjectTypes,
    filtersValues: { fieldLR: string; filterValues: string[] | string | RelativeDateFilterValue }[],
  ) => void;
  setHaveFiltersBeenChanged: (haveFiltersBeenChanged: boolean) => void;
  setKey: (key: string) => void;
  setMoreFilters: (filter: Filter[]) => void;
  setQuickFilter: (filter: QuickFilter) => void;
  setSelectedQuickFilter: (selectedQuickFilter: QuickFilter) => void;
  setSubqueryBobjectType?: Dispatch<SetStateAction<MainBobjectTypes[]>>;
  setDefaultFiltersValues: (
    fields: { fieldLR: string; defaultValue: string | string[] | RelativeDateFilterValue }[],
  ) => void;
  removeFilter: (fieldId: string) => void;
  defaultQuickFilters: QuickFilter[];
}

const FiltersContext = createContext<Filters | null>(null);

const defaultStructure = (): FiltersWithLoaderFlag => ({
  Company: {},
  Lead: {},
  Opportunity: {},
  Task: {},
  Activity: {},
  conditions: {},
  hasLoadedStorage: false,
});

const FiltersProvider = ({
  setSubqueryBobjectType,
  children,
  bobjectFields,
  defaultQuickFilters,
}: {
  setSubqueryBobjectType: Dispatch<SetStateAction<MainBobjectTypes[]>>;
  children: ReactNode;
  bobjectFields: any;
  defaultSort?: string;
  defaultQuickFilters?: QuickFilter[];
}) => {
  const [haveFiltersBeenChanged, setHaveFiltersBeenChanged] = useState<boolean>(false);
  const [bobjectType, setBobjectType] = useState<FiltersBobjectTypes>(BobjectTypes.Company);
  const [key, setKey] = useState<string>();
  const { get, set, remove } = useSessionStorage();
  const [defaultFilters, setDefaultFilters] = useState<FiltersWithLoaderFlag>(defaultStructure());
  const [filters, setFilters] = useState<FiltersWithLoaderFlag>(defaultStructure());
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<QuickFilter>();

  //adds Quickfilters to filters
  useEffect(() => {
    if (selectedQuickFilter?.filters) {
      setQuickFilter(selectedQuickFilter);
    }
  }, [selectedQuickFilter]);

  //save in session storage
  useEffect(() => {
    if (key) {
      const storedFilters = get(key);

      set(key, { ...storedFilters, quickFilter: selectedQuickFilter });
    }
  }, [selectedQuickFilter]);

  //load filters from session storage
  useEffect(() => {
    if (key) {
      const sessionFilters = get(key);
      const savedFilters = sessionFilters?.filters;
      const savedQuickFilter = sessionFilters?.quickFilter;
      if (savedQuickFilter) {
        setSelectedQuickFilter(savedQuickFilter);
      }

      const parsedQuickFilters =
        savedQuickFilter &&
        transformQuickFiltersToFilters(savedQuickFilter?.filters || [], bobjectFields);
      const aggregatedSessionStorageFilters = mergeTwoObjects(savedFilters, parsedQuickFilters);

      setHaveFiltersBeenChanged(
        (savedFilters && !isEqual(savedFilters, defaultFilters)) || savedQuickFilter,
      );

      // Fields are overwritten in webapp
      let mergedFilters;
      if (savedQuickFilter) {
        if (savedQuickFilter.type === 'ORs') {
          mergedFilters = { ...filters, ORs: parsedQuickFilters as FiltersWithLoaderFlag };
        } else {
          mergedFilters = mergeTwoObjects(
            defaultFilters,
            aggregatedSessionStorageFilters,
          ) as FiltersWithLoaderFlag;
        }
      } else {
        mergedFilters = { ...defaultFilters, ...aggregatedSessionStorageFilters };
      }

      setFilters({
        ...mergedFilters,
        ...{ hasLoadedStorage: true },
      });
    }
  }, [key]);

  const findFilterById = (filterId: string): FiltersType => {
    let filter;
    Object.keys(filters).forEach(bobjectType => {
      if (filters[bobjectType as FiltersBobjectTypes][filterId]) {
        filter = filters[bobjectType as FiltersBobjectTypes][filterId];
      }
    });

    // @ts-ignore
    if (isObject(filter) && Array.isArray(filter?.query)) filter = filter?.query;

    return filter;
  };

  const getFilterValue = (filterLR: string) => {
    if (filters) {
      const filterId = bobjectFields.findFieldByLogicRole(filterLR)?.id;
      const filterValue = findFilterById(filterId) as Record<string, Filter>;

      return transformFilterStateToFilter(filterValue);
    }
    return '';
  };

  const removeSelectedQuickFilter = (quickFilter: QuickFilter) => {
    let fieldIdsToRemove = quickFilter?.filters?.map(filter => filter?.bobjectFieldId);
    //@ts-ignore
    if (quickFilter.type === 'ORs') {
      fieldIdsToRemove = [Object.keys(filters['ORs'])[0]];
    }
    const cleanedFilters = removeFiltersById(filters, fieldIdsToRemove);
    const mergedFilters = mergeTwoObjects(defaultFilters, cleanedFilters) as FiltersWithLoaderFlag;
    setFilters(mergedFilters);
    setSelectedQuickFilter(undefined);
  };

  const removeFilter = (fieldId: string) => {
    const cleanedFilters = removeFiltersById(filters, [fieldId]);
    setFilters(cleanedFilters);
    const storedFilters = get(key);
    set(key, { ...storedFilters, filters: cleanedFilters });
    if (isEqual(cleanedFilters, defaultFilters) || selectedQuickFilter)
      setHaveFiltersBeenChanged(false);
  };

  const setFilter = (
    filterBobjectType: FiltersBobjectTypes,
    fieldLR: string,
    filterValues: string[] | string | RelativeDateFilterValue,
    autoChanged = true,
  ) => {
    setHaveFiltersBeenChanged(autoChanged);
    const fieldId = bobjectFields?.findFieldByLogicRole(fieldLR)?.id;
    const isRemoveAction =
      !filterValues || (Array.isArray(filterValues) && filterValues?.length === 0);
    if (isRemoveAction) {
      removeFilter(fieldId);
    } else {
      const transformedValue = transformFiltersToFiltersState(filterValues);
      if (transformedValue) {
        const aggregatedFilters = {
          ...filters,
          [filterBobjectType]: {
            ...filters[filterBobjectType],
            [fieldId]: transformedValue,
          },
        };
        const oRsBobjectType = transformFilterBobjectTypeToORsState(filterBobjectType);
        if (typeof setSubqueryBobjectType === 'function') setSubqueryBobjectType(oRsBobjectType);
        setFilters(aggregatedFilters);

        const { hasLoadedStorage, ...filtersForStorage } = aggregatedFilters;

        const storedFilters = get(key);
        set(key, { ...storedFilters, filters: filtersForStorage });
      }
    }
  };

  const setORsFilters = (
    id: string,
    value: string,
    filterBobjectType: FiltersBobjectTypes,
    filtersValues: {
      fieldLR: string;
      filterValues: string[] | string | RelativeDateFilterValue;
      type: string;
    }[],
  ) => {
    setHaveFiltersBeenChanged(true);
    let aggregatedFilters = { ...filters };
    for (const { fieldLR, filterValues } of filtersValues) {
      const fieldId = bobjectFields?.findFieldByLogicRole(fieldLR)?.id;
      const isRemoveAction =
        !filterValues || (Array.isArray(filterValues) && filterValues?.length === 0);

      if (isRemoveAction) {
        aggregatedFilters = removeFiltersById(aggregatedFilters, [fieldId]);
      } else {
        const transformedValue = transformFiltersToFiltersState(filterValues);
        if (transformedValue) {
          aggregatedFilters['ORs'] = {
            [filterBobjectType]: {
              ...aggregatedFilters['ORs'][filterBobjectType],
              [fieldId]: transformedValue,
            },
          };
        }
      }
    }
    setFilters(aggregatedFilters);
  };

  const setFilterConditions = (key: string, value: string | BobjectType[]) => {
    if (key === 'relatedBobjectType') resetFilters(value as MainBobjectTypes[]);
  };

  const setDefaultFiltersValues = (
    fields: { fieldLR: string; defaultValue: string | RelativeDateFilterValue | string[] }[],
  ) => {
    const tempFilters: Partial<FiltersType> = {};
    for (const { fieldLR, defaultValue } of fields) {
      const bobjectType = getBobjectFromLogicRole(fieldLR);
      //const fieldId = getFieldIdByLogicRole(bobjectFields, fieldLR);
      const fieldId = bobjectFields?.findFieldByLogicRole(fieldLR)?.id;
      const parsedDefaultValue = (defaultValue as RelativeDateFilterValue)?.start
        ? parseFilterRelativeDateValue(defaultValue)
        : defaultValue;
      tempFilters[bobjectType] = { ...tempFilters[bobjectType], [fieldId]: parsedDefaultValue };
    }
    const newDefaultFilters = { ...defaultStructure(), ...tempFilters };
    setDefaultFilters(newDefaultFilters);
    setFilters(newDefaultFilters);
  };

  const setMoreFilters = (moreFilters: Filter[]) => {
    const parsedMoreFilters = transformMoreFiltersToFilters(moreFilters, bobjectFields);
    const mergedFilters = mergeTwoObjects(
      defaultFilters,
      parsedMoreFilters,
    ) as FiltersWithLoaderFlag;

    setFilters({
      ...(isEmpty(parsedMoreFilters) ? defaultFilters : mergedFilters),
      hasLoadedStorage: true,
    });
  };

  const setQuickFilter = (quickFilter: QuickFilter) => {
    const parsedQuickFilters = transformQuickFiltersToFilters(
      quickFilter?.filters || [],
      bobjectFields,
    );
    let mergedFilters;
    // @ts-ignore
    if (quickFilter.type === 'ORs') {
      mergedFilters = {
        ...filters,
        ['ORs']: parsedQuickFilters,
      };
    } else {
      mergedFilters = mergeTwoObjects(filters, parsedQuickFilters) as FiltersWithLoaderFlag;
    }

    setHaveFiltersBeenChanged(true);
    setFilters(mergedFilters);
    //setSelectedQuickFilter(quickFilter);
  };

  const resetFilters = (bobjectType?: MainBobjectTypes[]) => {
    setHaveFiltersBeenChanged(false);
    setSelectedQuickFilter(null);
    if (typeof setSubqueryBobjectType === 'function') setSubqueryBobjectType([]);
    if (bobjectType) {
      const filtersToSet = resetFiltersByBobjectType(bobjectType, filters);
      setFilters(filtersToSet);
    } else {
      setFilters({
        ...defaultFilters,
        ...{
          hasLoadedStorage: true,
        },
      });
    }
    remove(key);
  };

  return (
    <FiltersContext.Provider
      value={{
        bobjectType,
        filters,
        defaultFilters,
        haveFiltersBeenChanged,
        key,
        selectedQuickFilter,
        getFilterValue,
        removeFilter,
        removeSelectedQuickFilter,
        resetFilters,
        setBobjectType,
        setFilter,
        setORsFilters,
        setFilters,
        setHaveFiltersBeenChanged,
        setKey,
        setMoreFilters,
        setQuickFilter,
        setSelectedQuickFilter,
        setFilterConditions,
        setDefaultFiltersValues,
        setSubqueryBobjectType,
        defaultQuickFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

const useFilters = (bobjectType?: FiltersBobjectTypes, key?: string) => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }

  useEffect(() => {
    if (context && bobjectType) {
      context.setBobjectType(bobjectType);
    }
  }, [context]);

  useEffect(() => {
    if (context && key) {
      context.setKey(key);
    }
  }, [key]);

  return context;
};

export { FiltersProvider, useFilters };

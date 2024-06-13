import * as React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';

import { BobjectType, MainBobjectTypes } from '@bloobirds-it/types';
import { isEmpty, isObject } from 'lodash';

import { useSubhomeContext } from '../pages/subhomePages/subhomeContext';
import { QuickFilter } from '../typings/quickFilters';
import { getBobjectFromLogicRole, getFieldIdByLogicRole } from '../utils/bobjects.utils';
import { isEqual, mergeTwoObjects } from '../utils/objects.utils';
import {
  parseFilterRelativeDateValue,
  removeFiltersById,
  resetFiltersByBobjectType,
  transformFilterBobjectTypeToORsState,
  transformFilterStateToFilter,
  transformFiltersToFiltersState,
  transformMoreFiltersToFilters,
  transformQuickFiltersToFilters,
} from '../utils/subhomeFilters.utils';
import { useEntity } from './entities/useEntity';
import { useBobjectTypes } from './useBobjectTypes';
import { useSessionStorage } from './useSessionStorage';

export type FiltersBobjectTypes = MainBobjectTypes | 'Activity' | 'Task';

export interface Filter {
  [id: string]: string | FilterValue;
}

export type FiltersType = Record<FiltersBobjectTypes | 'conditions', Filter>;

export type RelativeDateFilterValue = {
  start: Date | string;
  end: Date | string;
  type?: string;
};

interface FilterValue {
  searchMode?: string;
  query?: any;
}

interface FiltersWithLoaderFlag extends FiltersType {
  hasLoadedStorage: boolean;
}

export interface SubhomeFilters {
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
}

const SubhomeFiltersContext = React.createContext<SubhomeFilters | null>(null);

const defaultStructure = (): FiltersWithLoaderFlag => ({
  Company: {},
  Lead: {},
  Opportunity: {},
  Task: {},
  Activity: {},
  conditions: {},
  hasLoadedStorage: false,
});

const SubhomeFiltersProvider = ({
  setSubqueryBobjectType,
  children,
}: {
  setSubqueryBobjectType: Dispatch<SetStateAction<Array<MainBobjectTypes>>>;
  children: React.ReactNode;
}) => {
  const { haveFiltersBeenChanged, setHaveFiltersBeenChanged } = useSubhomeContext();
  const [bobjectType, setBobjectType] = useState<FiltersBobjectTypes>('Company');
  const [key, setKey] = useState<string>();
  const { get, set, remove } = useSessionStorage();
  const [defaultFilters, setDefaultFilters] = useState<FiltersWithLoaderFlag>(defaultStructure());
  const [filters, setFilters] = useState<FiltersWithLoaderFlag>(defaultStructure());
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<QuickFilter>();
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();

  //adds Quickfilters to filters
  React.useEffect(() => {
    if (selectedQuickFilter?.filters) {
      setQuickFilter(selectedQuickFilter);
    }
  }, [selectedQuickFilter]);

  React.useEffect(() => {
    if (key) {
      const storedFilters = get(key);

      set(key, { ...storedFilters, quickFilter: selectedQuickFilter });
    }
  }, [selectedQuickFilter]);

  //load filters from session storage
  React.useEffect(() => {
    if (key) {
      const sessionFilters = get(key);
      const savedFilters = sessionFilters?.filters;
      const savedQuickFilter = sessionFilters?.quickFilter;
      if (savedQuickFilter) setSelectedQuickFilter(savedQuickFilter);
      const parsedQuickFilters =
        savedQuickFilter &&
        transformQuickFiltersToFilters(
          savedQuickFilter?.filters || [],
          bobjectFields,
          bobjectTypes,
        );
      const aggregatedSessionStorageFilters = { ...savedFilters, ...parsedQuickFilters };
      setHaveFiltersBeenChanged(savedFilters && !isEqual(savedFilters, defaultFilters));

      setFilters({
        ...defaultFilters,
        ...aggregatedSessionStorageFilters,
        ...{ hasLoadedStorage: true },
      });
    }
  }, [key]);

  const findFilterById = (filterId: string): Filter => {
    let filter;
    Object.keys(filters).forEach(bobjectType => {
      if (filters[bobjectType as FiltersBobjectTypes][filterId]) {
        filter = filters[bobjectType as FiltersBobjectTypes][filterId];
      }
    });

    return filter;
  };

  const getFilterValue = (filterLR: string) => {
    if (filters) {
      const filterId = getFieldIdByLogicRole(bobjectFields, filterLR);
      let filterValue = findFilterById(filterId);

      if (filterValue && isObject(filterValue) && Array.isArray(filterValue?.query))
        filterValue = filterValue?.query;
      return transformFilterStateToFilter(filterValue);
    }
    return '';
  };

  const removeSelectedQuickFilter = (quickfilter: QuickFilter) => {
    const fieldIdsToRemove = quickfilter?.filters?.map(filter => filter?.bobjectFieldId);
    const cleanedFilters = removeFiltersById(filters, fieldIdsToRemove);
    const mergedFilters = mergeTwoObjects(defaultFilters, cleanedFilters) as FiltersWithLoaderFlag;
    setFilters(mergedFilters);
    setSelectedQuickFilter(undefined);
  };

  const removeFilter = (fieldId: string) => {
    const cleanedFilters = removeFiltersById(filters, [fieldId]);
    setFilters(cleanedFilters);
    set(key, { filters: cleanedFilters });
    if (isEqual(cleanedFilters, defaultFilters)) setHaveFiltersBeenChanged(false);
  };

  const setFilter = (
    filterBobjectType: FiltersBobjectTypes,
    fieldLR: string,
    filterValues: string[] | string | RelativeDateFilterValue,
  ) => {
    setHaveFiltersBeenChanged(true);
    const fieldId = getFieldIdByLogicRole(bobjectFields, fieldLR);
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
        set(key, { filters: filtersForStorage });
      }
    }
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
      const fieldId = getFieldIdByLogicRole(bobjectFields, fieldLR);
      const parsedDefaultValue = defaultValue?.start
        ? parseFilterRelativeDateValue(defaultValue)
        : defaultValue;
      tempFilters[bobjectType] = { ...tempFilters[bobjectType], [fieldId]: parsedDefaultValue };
    }
    const newDefaultFilters = { ...defaultStructure(), ...tempFilters };
    setDefaultFilters(newDefaultFilters);
    setFilters(newDefaultFilters);
  };

  const setMoreFilters = (moreFilters: Filter[]) => {
    const parsedMoreFilters = transformMoreFiltersToFilters(
      moreFilters,
      bobjectFields,
      bobjectTypes,
    );
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
      bobjectTypes,
    );
    const mergedFilters = mergeTwoObjects(filters, parsedQuickFilters) as FiltersWithLoaderFlag;
    setFilters(mergedFilters);
    setSelectedQuickFilter(quickFilter);
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
    <SubhomeFiltersContext.Provider
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
        setFilters,
        setHaveFiltersBeenChanged,
        setKey,
        setMoreFilters,
        setQuickFilter,
        setSelectedQuickFilter,
        setFilterConditions,
        setDefaultFiltersValues,
        setSubqueryBobjectType,
      }}
    >
      {children}
    </SubhomeFiltersContext.Provider>
  );
};

const useSubhomeFilters = (bobjectType?: FiltersBobjectTypes, key?: string) => {
  const context = React.useContext(SubhomeFiltersContext);
  if (context === undefined) {
    throw new Error('useSubhomeFilters must be used within a SubhomeFiltersProvider');
  }

  React.useEffect(() => {
    if (context && bobjectType) {
      context.setBobjectType(bobjectType);
    }
  }, [context]);

  React.useEffect(() => {
    if (context && key) {
      context.setKey(`subhomeFilters-${key}`);
    }
  }, [key]);

  return context;
};

export { SubhomeFiltersProvider, useSubhomeFilters };

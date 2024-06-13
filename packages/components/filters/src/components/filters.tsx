import React, { Children, Dispatch, ReactElement, SetStateAction, useEffect } from 'react';

import {
  FiltersBobjectTypes,
  MainBobjectTypes,
  RelativeDateFilterValue,
} from '@bloobirds-it/types';

import { FiltersProvider, useFilters } from '../hooks';
import { transformFiltersToQuery } from '../utils/filters.utils';
import styles from './filter.module.css';

export type SortValues =
  | 'highPriority'
  | 'timeZone'
  | 'country'
  | 'name'
  | 'source'
  | 'mrRating'
  | 'assignedDateRecent'
  | 'assignedDateOldest'
  | 'lastAttemptRecent'
  | 'lastAttemptOldest'
  | 'lastUpdateRecent'
  | 'lastUpdateOldest';

export type OppsSortValues =
  | 'closeDateOldest'
  | 'closeDateMostRecent'
  | 'state'
  | 'amount'
  | 'creationDateRecent'
  | 'creationDateOldest'
  | 'lastUpdateRecent'
  | 'lastUpdateOldest';

export type AllSortValues = OppsSortValues | SortValues;

interface FiltersProps {
  children: ReactElement[];
  bobjectType: FiltersBobjectTypes;
  tabName: string;
  onQueryChange: (query: any) => void;
  onSubqueryChange?: (query: any) => void;
  hasSortChanged?: boolean;
  onSortChange?: ((value: SortValues) => void) | ((value: AllSortValues) => void);
  defaultFilters?: { fieldLR: string; defaultValue: string | string[] | RelativeDateFilterValue }[];
  defaultSort?: SortValues;
  setOrsBobjectType?: Dispatch<SetStateAction<MainBobjectTypes[]>>;
  showFiltersTooltip?: boolean;
  bobjectFields: any;
  defaultQuickFilters?: any;
  onHaveFiltersBeenChanged: (haveFiltersBeenChanged: boolean) => void;
}

const withProvider = (Component: any) => ({ ...props }: FiltersProps) => (
  <FiltersProvider
    setSubqueryBobjectType={props.setOrsBobjectType}
    bobjectFields={props.bobjectFields}
    defaultSort={props.defaultSort}
    defaultQuickFilters={props.defaultQuickFilters}
  >
    <Component {...props} />
  </FiltersProvider>
);

const Filters = ({
  bobjectType,
  children,
  defaultFilters = [],
  tabName,
  onQueryChange,
  bobjectFields,
  onHaveFiltersBeenChanged,
}: FiltersProps) => {
  const { filters, setDefaultFiltersValues, haveFiltersBeenChanged } = useFilters(
    bobjectType,
    tabName,
  );

  const hasDefaultFilters = typeof defaultFilters === 'object';

  useEffect(() => {
    if (typeof onHaveFiltersBeenChanged === 'function')
      onHaveFiltersBeenChanged(haveFiltersBeenChanged);
  }, [haveFiltersBeenChanged]);

  useEffect(() => {
    if (defaultFilters) setDefaultFiltersValues(defaultFilters);
  }, [hasDefaultFilters, tabName]);

  useEffect(() => {
    if (!filters.hasLoadedStorage) return;
    const queryFromFilters = transformFiltersToQuery(filters, bobjectType, bobjectFields);
    let subqueryFromFilters;
    if (Object.prototype.hasOwnProperty.call(filters, 'ORs')) {
      subqueryFromFilters = transformFiltersToQuery(filters['ORs'], bobjectType, bobjectFields);
    }

    onQueryChange({ query: queryFromFilters, subquery: subqueryFromFilters });
  }, [filters]);

  return (
    <div className={styles.container}>
      {Children.map(children, (child, index) => {
        return React.cloneElement(child);
      })}
    </div>
  );
};

export default withProvider(Filters);

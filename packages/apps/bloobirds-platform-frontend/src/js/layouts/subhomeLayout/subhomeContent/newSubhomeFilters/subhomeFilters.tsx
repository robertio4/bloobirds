import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';

import { Button, Tooltip } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes } from '@bloobirds-it/types';

import { FiltersTooltip } from '../../../../components/discoveryTooltips/prospectingTourTooltips/filtersTooltip';
import { useEntity } from '../../../../hooks';
import useModalVisibility from '../../../../hooks/useModalVisibility';
import { useQuickStartEnabled } from '../../../../hooks/useQuickStartGuide';
import {
  FiltersBobjectTypes,
  RelativeDateFilterValue,
  SubhomeFiltersProvider,
  useSubhomeFilters,
} from '../../../../hooks/useSubhomeFilters';
import { isObject } from '../../../../utils/objects.utils';
import { transformFiltersToQuery } from '../../../../utils/subhomeFilters.utils';
import SubhomeFilterGroup from '../subhomeFilterGroup/subhomeFilterGroup';
import styles from './subhomeFilter.module.css';

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

interface SubhomeFiltersProps {
  children: ReactElement[];
  bobjectType: FiltersBobjectTypes;
  tabName: string;
  onQueryChange: (query: any) => void;
  hasSortChanged?: boolean;
  onSortChange?: ((value: SortValues) => void) | ((value: AllSortValues) => void);
  defaultFilters?: { fieldLR: string; defaultValue: string | string[] | RelativeDateFilterValue }[];
  defaultSort?: SortValues;
  setOrsBobjectType?: Dispatch<SetStateAction<BobjectTypes>>;
}

const withProvider = (Component: any) => ({ ...props }: SubhomeFiltersProps) => (
  <SubhomeFiltersProvider setSubqueryBobjectType={props.setOrsBobjectType}>
    <Component {...props} />
  </SubhomeFiltersProvider>
);

const NewSubhomeFilters = ({
  bobjectType,
  children,
  defaultFilters = [],
  tabName,
  hasSortChanged,
  onSortChange = () => {},
  onQueryChange = () => {},
}: SubhomeFiltersProps) => {
  const hasQSGEnabled = useQuickStartEnabled();
  const isOnCadenceTab = tabName === 'onCadence';
  const {
    filters,
    selectedQuickFilter,
    haveFiltersBeenChanged,
    resetFilters,
    setDefaultFiltersValues,
  } = useSubhomeFilters(bobjectType, tabName);
  const usingDefaultFilters = !haveFiltersBeenChanged && !hasSortChanged;
  const [resettingFiltersCounter, setResettingFiltersCounter] = useState(0);
  const hasDefaultFilters = typeof defaultFilters === 'object';
  const quickFiltersDisabled =
    isObject(filters?.conditions) && Object.keys(filters?.conditions).length !== 0;
  const indexLastChild = React.Children.count(children) - 1;
  const { openModal: openCreateModal } = useModalVisibility('createQuickFilterModal');
  const { openModal: openUpdateModal } = useModalVisibility('updateQuickFilterModal');
  const bobjectFields = useEntity('bobjectFields');

  useEffect(() => {
    if (defaultFilters) setDefaultFiltersValues(defaultFilters);
  }, [hasDefaultFilters]);

  useEffect(() => {
    if (!filters.hasLoadedStorage) return;
    const queryFromFilters = transformFiltersToQuery(filters, bobjectType, bobjectFields);
    onQueryChange(queryFromFilters);
  }, [filters]);

  return (
    <div className={styles.container}>
      {React.Children.map(children, (child, index) => {
        if (index === indexLastChild)
          return (
            <SubhomeFilterGroup>
              {child.props.children}
              {!usingDefaultFilters && (
                <div className={styles.actionButtons}>
                  {haveFiltersBeenChanged && (
                    <Tooltip
                      position="bottom"
                      title={
                        quickFiltersDisabled &&
                        'The company or lead task filter \n' +
                          'cannot be saved as quick filter, \n' +
                          'deselect this filter to continue. '
                      }
                    >
                      <Button
                        iconLeft="save"
                        variant="clear"
                        uppercase={false}
                        disabled={quickFiltersDisabled}
                        onClick={() => {
                          if (selectedQuickFilter) {
                            openUpdateModal();
                          } else {
                            openCreateModal();
                          }
                        }}
                      >
                        {selectedQuickFilter ? 'Update quick filter' : 'Save quick filter'}
                      </Button>
                    </Tooltip>
                  )}
                  <Button
                    variant="clear"
                    color="bloobirds"
                    iconLeft="cross"
                    uppercase={false}
                    onClick={() => {
                      onSortChange(undefined);
                      resetFilters();
                      setResettingFiltersCounter(x => x + 1);
                    }}
                  >
                    Clear
                  </Button>
                </div>
              )}
              {hasQSGEnabled && isOnCadenceTab && <FiltersTooltip defaultTooltipVisible />}
            </SubhomeFilterGroup>
          );
        return React.cloneElement(child, {
          ...(resettingFiltersCounter !== 0 ? { key: resettingFiltersCounter } : {}),
        });
      })}
    </div>
  );
};

export default withProvider(NewSubhomeFilters);

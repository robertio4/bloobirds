import { Icon } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { isEmpty } from 'lodash';
import FiltersModal from '../../../../../components/filtersModal/filtersModal';
import { useFiltersModal } from '../../../../../hooks/useFiltersModal';
import {
  Filter,
  FiltersBobjectTypes,
  useSubhomeFilters,
} from '../../../../../hooks/useSubhomeFilters';
import { BobjectField, BobjectType } from '../../../../../typings/bobjects';
import { transformFiltersToMoreFilters } from '../../../../../utils/subhomeFilters.utils';
import styles from './moreFilter.module.css';
import { haveSameContentArrays } from '../../../../../utils/objects.utils';

interface Config {
  filterFieldsMethod: (field: BobjectField) => boolean;
}

const MoreFilter = ({ bobjectType, config }: { bobjectType: BobjectType; config?: Config }) => {
  const { openFiltersModal, isOpen: isOpenFiltersModal, closeFiltersModal } = useFiltersModal();
  const {
    filters,
    defaultFilters,
    setMoreFilters,
    setHaveFiltersBeenChanged,
    selectedQuickFilter,
    setSelectedQuickFilter,
  } = useSubhomeFilters();
  const parsedFilters = useMemo(() => {
    const filtersWithoutDefault = { ...filters };
    for (const [bType, fields] of Object.entries(defaultFilters)) {
      for (const [fieldId, defaultValue] of Object.entries(fields)) {
        const bobjectType = bType as FiltersBobjectTypes;
        const { [fieldId]: value, ...rest } = filtersWithoutDefault[bobjectType];
        if (
          value === defaultValue ||
          (Array.isArray(value) &&
            Array.isArray(defaultValue) &&
            haveSameContentArrays(value, defaultValue))
        ) {
          filtersWithoutDefault[bobjectType] = rest;
        }
      }
    }
    return transformFiltersToMoreFilters(filtersWithoutDefault) || [];
  }, [filters]);

  const filtersCount = Object.keys(parsedFilters)?.length;
  const hasMoreFilters = filtersCount > 0;

  const handleSave = (filters: Filter[]) => {
    const areFiltersEmpty = isEmpty(filters);
    setHaveFiltersBeenChanged(!areFiltersEmpty);
    setMoreFilters(filters);
    //get the active bobjectKeys to control quickfilters
    const filtersValues =
      typeof filters === 'object' &&
      Object.values(filters).flatMap(bobjectFilters => Object.keys(bobjectFilters));
    if (!filtersValues.includes(selectedQuickFilter?.filters[0]?.bobjectFieldId)) {
      setSelectedQuickFilter(null);
    }
  };

  return (
    <>
      <div
        className={clsx(styles.moreFilterInput, {
          [styles.moreFiltersInputSelected]: hasMoreFilters,
        })}
        onClick={() =>
          !isOpenFiltersModal
            ? openFiltersModal({ bobjectTypesToSet: [bobjectType] })
            : closeFiltersModal()
        }
      >
        {!hasMoreFilters ? 'More filters' : `More filters (${filtersCount})`}
        <Icon name="filter" size={12} color={!hasMoreFilters ? 'peanut' : 'white'} />
      </div>
      {isOpenFiltersModal && (
        <FiltersModal values={parsedFilters} config={config} handleSave={handleSave} />
      )}
    </>
  );
};

export default MoreFilter;

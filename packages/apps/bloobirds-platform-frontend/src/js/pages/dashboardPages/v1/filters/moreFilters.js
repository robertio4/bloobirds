import React, { useState } from 'react';
import { useEntity } from '../../../../hooks';
import { Icon } from '@bloobirds-it/flamingo-ui';
import { ViewEditionContextProvider } from '../../../../components/bobjectTable/viewEditionModal/viewEdition.context';
import ViewEditionModal from '../../../../components/bobjectTable/viewEditionModal';
import { useInSalesDashboards } from '../../../../hooks/useInSalesDashboards';
import classNames from 'clsx';
import styles from '../dashboardPageContent/dashboardPageContent.module.css';
import { useFiltersModal } from '../../../../hooks/useFiltersModal';

export const MoreFilters = ({ onChange, value }) => {
  const [shouldShowAdvancedFilters, setShouldShowAdvancedFilters] = useState(false);
  const inSalesDashboard = useInSalesDashboards();

  const bobjectFields = useEntity('bobjectFields');
  const filtersAppliedCount = Object.keys(value || {}).reduce(
    (total, key) => value[key]?.length + total,
    0,
  );
  const { openFiltersModal, isOpen: isOpenFiltersModal, closeFiltersModal } = useFiltersModal();
  const handleChange = filtersValue => {
    const finalFilters = {};

    Object.keys(filtersValue).forEach(key => {
      const filter = filtersValue[key];
      if (filter instanceof Array) {
        finalFilters[key] = filter[0];
      } else {
        finalFilters[key] = filter;
      }
    });
    if (Object.keys(finalFilters).length === 0) {
      onChange(undefined);
    } else {
      onChange(finalFilters);
    }
  };

  return (
    <>
      <div
        className={classNames(styles._more_filter_input, {
          [styles._more_filters_input_selected]: filtersAppliedCount !== 0,
        })}
        onClick={() => setShouldShowAdvancedFilters(!shouldShowAdvancedFilters)}
      >
        {filtersAppliedCount === 0 ? 'More filters' : `More filters (${filtersAppliedCount})`}
        <Icon name="filter" size={12} color={filtersAppliedCount === 0 ? 'softPeanut' : 'white'} />
      </div>
      {shouldShowAdvancedFilters && (
        <ViewEditionContextProvider
          bobjectType={[
            'Company',
            'Lead',
            'Activity',
            !inSalesDashboard ? 'Task' : null,
            inSalesDashboard ? 'Opportunity' : null,
          ].filter(Boolean)}
          setQuery={onChange}
          query={value}
          shouldShowField={field =>
            (field.type === 'Global Picklist' || field.type === 'Picklist') &&
            bobjectFields?.findBy('id')(field?.name)?.reportingEnabled
          }
          viewEditionFromDashboards
          showRelationships={false}
        >
          <ViewEditionModal
            modalType="filter"
            handleCloseModal={() => setShouldShowAdvancedFilters(false)}
          />
        </ViewEditionContextProvider>
      )}
    </>
  );
};

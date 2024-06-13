import classNames from 'clsx';
import { Icon } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import { useInSalesDashboards } from '../../../../hooks/useInSalesDashboards';
import { useEntity } from '../../../../hooks';
import { useFiltersModal } from '../../../../hooks/useFiltersModal';
import styles from '../../v1/dashboardPageContent/dashboardPageContent.module.css';
import FiltersModal from '../../../../components/filtersModal/filtersModal';

interface MoreFilters {
  onChange: (value: any) => void;
  value: any;
}

export const MoreFilters = ({ onChange, value }: MoreFilters) => {
  const inSalesDashboard = useInSalesDashboards();

  const bobjectFields = useEntity('bobjectFields');
  const filtersAppliedCount = value ? Object.keys(value).length : 0;
  const { openFiltersModal, isOpen: isOpenFiltersModal, closeFiltersModal } = useFiltersModal();
  const handleChange = (filtersValue: Record<string, any>) => {
    const finalFilters: Record<string, any> = {};

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
        onClick={() => {
          if (!isOpenFiltersModal) {
            openFiltersModal({
              bobjectTypesToSet: [
                'Company',
                'Lead',
                'Activity',
                !inSalesDashboard ? 'Task' : null,
                inSalesDashboard ? 'Opportunity' : null,
              ].filter(Boolean),
            });
          } else {
            closeFiltersModal();
          }
        }}
      >
        {filtersAppliedCount === 0 ? 'More filters' : `More filters (${filtersAppliedCount})`}
        <Icon name="filter" size={12} color={filtersAppliedCount === 0 ? 'softPeanut' : 'white'} />
      </div>

      {isOpenFiltersModal && (
        <FiltersModal
          config={{
            showRelationships: false,
          }}
          values={value || []}
          handleSave={handleChange}
        />
      )}
    </>
  );
};

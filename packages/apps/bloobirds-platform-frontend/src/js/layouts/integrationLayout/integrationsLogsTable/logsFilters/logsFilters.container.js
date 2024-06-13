import React, { useEffect, useState } from 'react';
import LogsFiltersView from './logsFilters.view';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';

const LogsFiltersContainer = ({
  filters,
  onFilterChange,
  onRefreshClicked,
  fetching,
  syncDirections,
  crm,
  logTracing,
  handleAddLogTracing,
}) => {
  const isSalesEnabled = useFullSalesEnabled();
  const bobjectTypesEntities = useBobjectTypes();
  const [bobjectTypes, setBobjectTypes] = useState([]);

  useEffect(() => {
    if (bobjectTypesEntities) {
      const types = bobjectTypesEntities
        .all()
        .filter(
          type =>
            !(
              type.name === BOBJECT_TYPES.TASK ||
              (!isSalesEnabled && type.name === BOBJECT_TYPES.OPPORTUNITY)
            ),
        );
      setBobjectTypes([...types]);
    }
  }, [bobjectTypesEntities]);

  return (
    <LogsFiltersView
      crm={crm}
      syncDirections={syncDirections}
      fetching={fetching}
      bobjectTypes={bobjectTypes}
      onFilterChange={onFilterChange}
      onRefreshClicked={onRefreshClicked}
      filters={filters}
      logTracing={logTracing}
      handleAddLogTracing={handleAddLogTracing}
    />
  );
};

export default LogsFiltersContainer;

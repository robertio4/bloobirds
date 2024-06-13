import React, { useEffect, useState } from 'react';

import { BOBJECT_TYPES } from '@bloobirds-it/types';

import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import ActionsHeaderView from './actionsHeader.view';

const ActionsHeaderContainer = ({
  filters,
  onFilterChange,
  onRefreshClicked,
  fetching,
  setShowActionModal,
  integrationName,
}) => {
  const bobjectTypesRepo = useBobjectTypes();
  const [bobjectTypes, setBobjectTypes] = useState([]);

  useEffect(() => {
    if (bobjectTypesRepo) {
      const types = bobjectTypesRepo
        .all()
        .filter(type => type.name !== 'Task' && type.name !== BOBJECT_TYPES.OPPORTUNITY);
      setBobjectTypes([...types]);
    }
  }, [bobjectTypesRepo]);

  return (
    <ActionsHeaderView
      fetching={fetching}
      bobjectTypes={bobjectTypes}
      onFilterChange={onFilterChange}
      onRefreshClicked={onRefreshClicked}
      filters={filters}
      setShowActionModal={setShowActionModal}
      integrationName={integrationName}
    />
  );
};

export default ActionsHeaderContainer;

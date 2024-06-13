import React, { useEffect, useState } from 'react';

import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { uniqBy } from 'lodash';
import useSWR from 'swr';

import { useBobjectTypes } from '../../../hooks/useBobjectTypes';
import { api } from '../../../utils/api';
import ActionsView from './actions.view';

const object = {
  genericAction: 'actionName',
  bobjectType: 'bloobirdsTrigger',
  bloobirdsTrigger: 'bloobirdsTrigger',
};

const ActionsContainer = ({ driver, integrationName }) => {
  const [filters, setFilters] = useState({
    bobjectType: '',
    bloobirdsTrigger: '',
    genericAction: '',
  });
  const bobjectTypesEntities = useBobjectTypes();
  const [bobjectTypes, setBobjectTypes] = useState([]);
  const [actionsSubscribed, setActionsSubscribed] = useState();

  useEffect(() => {
    if (bobjectTypesEntities) {
      const types = bobjectTypesEntities
        .all()
        .filter(type => type.name !== 'Task' && type.name !== BOBJECT_TYPES.OPPORTUNITY);
      setBobjectTypes([...types]);
    }
  }, [bobjectTypesEntities]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters({ ...newFilters });
  };

  const { data: actionsAvailable } = useSWR(
    `/integrations/manager/drivers/${driver}/actions/available`,
    async () =>
      await api
        .get(`/integrations/manager/drivers/${driver}/actions/available`)
        .then(res => res.data),
  );
  const { data: actionsSubs } = useSWR(
    `/integrations/manager/drivers/${driver}/actions/subscribed`,
    async () =>
      await api
        .get(`/integrations/manager/drivers/${driver}/actions/subscribed`)
        .then(res => res.data),
  );

  useEffect(() => {
    setActionsSubscribed(actionsSubs);
  }, [actionsSubs]);

  useEffect(() => {
    const appliedFilters = Object.keys(filters).filter(filterKey => filters[filterKey] !== '');
    let initialActions = actionsSubs;
    appliedFilters.forEach(filter => {
      initialActions = initialActions.filter(action =>
        action[object[filter]].toLowerCase().includes(filters[filter].toLowerCase()),
      );
    });
    setActionsSubscribed(uniqBy(initialActions, 'actionId'));
  }, [filters]);

  return (
    <ActionsView
      filters={filters}
      onFilterChange={handleFilterChange}
      actionsAvailable={actionsAvailable?.actions}
      actionsSubscribed={actionsSubscribed}
      bobjectTypes={bobjectTypes}
      driver={driver}
      integrationName={integrationName}
    />
  );
};

export default ActionsContainer;

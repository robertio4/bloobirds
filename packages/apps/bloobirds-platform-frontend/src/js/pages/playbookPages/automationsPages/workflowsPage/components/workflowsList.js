import React, { useMemo } from 'react';

import { Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { set } from 'lodash';

import { SearchLogs } from '../../../../../../assets/svg';
import {
  EntityHeaderItem,
  EntityList,
  EntityListHeader,
} from '../../../../../components/entityList/entityList';
import { useWorkflows } from '../../useAutomationsEdition';
import { useWorkflow } from '../../workflowEditionPage/context/workflowsContext';
import styles from '../workflowsPage.module.css';
import WorkflowsCard from './workflowsCard';

const HEADER_NAMES = [
  { name: 'Name', className: styles._card__cell_name },
  { name: 'Status', className: styles._card__cell_label },
  { name: 'Runs', className: styles._card__cell_ray },
  // { name: 'Type', className: styles[`_card__cell_type`] },
  { name: 'Author', className: styles._card__cell_author },
  { name: 'Creation date', className: styles._card__cell_creation },
  { name: 'Last Update', className: styles._card__cell_last_update },
  { name: 'Enabled', className: styles._card__cell_status },
];

const WorkflowsList = ({ searchValue, showDisabled, setShowDisabled, setIsAllDisabled }) => {
  const { workflows } = useWorkflows();
  const {
    state: { listFilters },
  } = useWorkflow();

  const filteredList = useMemo(() => {
    let filteredArray = workflows;
    if (listFilters) {
      Object.keys(listFilters).forEach(filter => {
        if (listFilters[filter] !== '') {
          filteredArray = filteredArray.filter(workflow => {
            return workflow[filter] === listFilters[filter];
          });
        }
      });
    }
    if (searchValue) {
      if (filteredArray)
        filteredArray = filteredArray.filter(workflow =>
          workflow?.name?.toLowerCase().includes(searchValue.toLowerCase()),
        );
      filteredArray = workflows.filter(workflow =>
        workflow?.name?.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    if (!showDisabled) {
      filteredArray = filteredArray.filter(workflow => workflow?.isEnabled);
    }

    const isAllDisabled = filteredArray.every(workflow => !workflow?.isEnabled);
    if (isAllDisabled) {
      setShowDisabled(true);
    }
    setIsAllDisabled(isAllDisabled);

    return filteredArray;
  }, [searchValue, listFilters, workflows]);

  return (
    <>
      {workflows ? (
        <EntityList>
          {filteredList?.length > 0 ? (
            <>
              <EntityListHeader>
                {HEADER_NAMES.map(header => (
                  <EntityHeaderItem
                    key={header?.name}
                    label={header?.name}
                    className={header?.className}
                  />
                ))}
              </EntityListHeader>
              {filteredList?.length > 0 ? (
                filteredList?.map(workflow => (
                  <WorkflowsCard key={workflow?.id} workflow={workflow} />
                ))
              ) : (
                <div className={styles._no_results__contents}>
                  <SearchLogs className={styles._no_results__img} />
                  <Text size="xl" weight="bold" align="center" color="softPeanut">
                    No workflows created yet
                  </Text>
                </div>
              )}
            </>
          ) : (
            <div className={styles._no_results__contents}>
              <SearchLogs className={styles._no_results__img} />
              <Text size="xl" weight="bold" align="center" color="softPeanut">
                No workflows match the current search
              </Text>
            </div>
          )}
        </EntityList>
      ) : (
        <div className={styles._no_results__contents}>
          <Spinner size={40} color="bloobirds" name="dots" />
        </div>
      )}
    </>
  );
};

export default WorkflowsList;

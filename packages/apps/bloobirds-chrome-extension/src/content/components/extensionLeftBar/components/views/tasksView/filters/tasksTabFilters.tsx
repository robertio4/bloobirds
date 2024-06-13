import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Filter, FilterGroup, Filters, QuickFilters } from '@bloobirds-it/filters';
import { Button } from '@bloobirds-it/flamingo-ui';
import {
  useMinimizableModals,
  useUserSearch,
  useIsNoStatusPlanAccount,
  useLocalStorage,
} from '@bloobirds-it/hooks';
import {
  BobjectTypes,
  LocalStorageKeys,
  QuickFilter,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  UserPermission,
} from '@bloobirds-it/types';

import { useExtensionContext } from '../../../../../context';
import stylesQF from '../../../../extensionLeftBar.module.css';
import { SubhomeResetButton } from '../../../layouts/subhomeLayout/subhomeContent/subhomeResetButton/subhomeResetButton';
import { SubhomeStageFilter } from '../../../layouts/subhomeLayout/subhomeContent/subhomeStageFilter/subhomeStageFilter';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { scheduledFilterValues } from '../../view.utils';
import { StartTask } from '../components/startTask';
import { parseTaskTypeQuery, TaskTypeFilter } from './components/taskTypeFilter';
import styles from './tasksTabFilters.module.css';
import { tasksTabQuickFilters } from './tasksTabQuickFilters';

export const TasksTabFilters = () => {
  const { useGetDataModel, useGetSettings } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const { openMinimizableModal } = useMinimizableModals();
  const userFilterAvailable =
    settings?.user?.accountAdmin || settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  const users = useUserSearch();
  const { t } = useTranslation();

  const priorityTasks = dataModel?.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const priorityField = dataModel?.findFieldByLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const noPriorityField = priorityTasks?.find(
    priorityTask => priorityTask.logicRole === 'TASK__PRIORITY__NO_PRIORITY',
  );
  const customTaskId = dataModel?.findFieldByLogicRole(TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK)?.id;
  const taskTypeId = dataModel?.findFieldByLogicRole(TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.id;
  const {
    selectedTab,
    setQuery,
    setSubquery,
    stage,
    setHaveFiltersBeenChanged,
  } = useSubhomeContext();
  const [quickFilterSelected, setQuickFilterSelected] = useState<QuickFilter>();
  const quickFilters = tasksTabQuickFilters(dataModel);
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const { set, remove } = useLocalStorage();

  function openTaskModal() {
    openMinimizableModal({
      type: 'task',
      data: {
        location: 'leftBar',
      },
    });
  }

  const onToggleSelected = quickFilterSelected => {
    setQuickFilterSelected(quickFilterSelected);
  };

  return (
    <>
      <div className={styles.rightButtons}>
        <StartTask stage={stage} quickFilter={quickFilterSelected} />
        <Button size="small" onClick={openTaskModal}>
          +
        </Button>
      </div>
      <Filters
        bobjectType={BobjectTypes.Task}
        tabName={`filters-${selectedTab}`}
        bobjectFields={dataModel}
        defaultQuickFilters={quickFilters}
        defaultFilters={[
          {
            fieldLR: TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
            defaultValue: [
              TASK_TYPE.PROSPECT_CADENCE,
              TASK_TYPE.NEXT_STEP,
              TASK_TYPE.CONTACT_BEFORE_MEETING,
            ],
          },
          { fieldLR: TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, defaultValue: [userId] },
          {
            fieldLR: TASK_FIELDS_LOGIC_ROLE.STATUS,
            defaultValue: [TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE, TASK_STATUS_VALUE_LOGIC_ROLE.TODO],
          },
          { fieldLR: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, defaultValue: 'until_now' },
          {
            fieldLR: TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL,
            defaultValue: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_NO, '__MATCH_EMPTY_ROWS__'],
          },
        ]}
        onQueryChange={({ query }) => {
          const noPriorityQuery = {};
          let taskTypeQuery = {};
          if (query) {
            const queriedFields = Object.keys(query);
            queriedFields.forEach(key => {
              if (key === priorityField?.id) {
                const v = query[key].find(value => value === noPriorityField?.id);
                if (v) {
                  noPriorityQuery[key] = [...query[key], '__MATCH_EMPTY_ROWS__'];
                }
              }
              // TODO Refactor task type filter functionality
              if (key === customTaskId) {
                taskTypeQuery = parseTaskTypeQuery(query[key], quickFilterSelected) || {};

                query[key] = [];

                if (!quickFilterSelected) {
                  delete query[taskTypeId];
                }

                set(LocalStorageKeys.TaskTypeSubQuery, JSON.stringify(taskTypeQuery));
                setSubquery(taskTypeQuery);
              }
            });
            if (!queriedFields?.includes(customTaskId)) {
              remove(LocalStorageKeys.TaskTypeSubQuery);
              setSubquery(undefined);
            }
          }
          setQuery({ ...query, ...noPriorityQuery });
        }}
        onHaveFiltersBeenChanged={haveFiltersBeenChanged =>
          setHaveFiltersBeenChanged(!!haveFiltersBeenChanged)
        }
      >
        <div className={styles.filterRow} style={{ marginTop: 16 }}>
          <FilterGroup>
            <Filter
              fieldLR={TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME}
              placeholder={t('leftBar.filters.date')}
              values={scheduledFilterValues}
            />
            {userFilterAvailable && (
              <Filter
                fieldLR={TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO}
                placeholder={t('leftBar.filters.assignedTo')}
                values={users?.users}
                isMultiselect
                options={{ variant: 'filters' }}
              />
            )}
            <TaskTypeFilter />
            {!isNoStatusPlanAccount && <SubhomeStageFilter />}
            <Filter
              fieldLR={TASK_FIELDS_LOGIC_ROLE.PRIORITY}
              placeholder={t('leftBar.filters.priority')}
              values={priorityTasks}
              isMultiselect
              options={{
                renderDisplayValue: (value: string | string[]) => {
                  if (value?.length === priorityTasks?.length) {
                    return t('common.all');
                  }
                  if (value?.length === 1) {
                    return priorityTasks.find(priority => priority.id === value[0])?.name;
                  }
                  return '';
                },
              }}
            />
          </FilterGroup>
        </div>
        {quickFilters?.length > 0 && (
          <div className={stylesQF.quickFilter}>
            <FilterGroup>
              <QuickFilters onToggleSelected={onToggleSelected} />
              <SubhomeResetButton />
            </FilterGroup>
          </div>
        )}
      </Filters>
    </>
  );
};

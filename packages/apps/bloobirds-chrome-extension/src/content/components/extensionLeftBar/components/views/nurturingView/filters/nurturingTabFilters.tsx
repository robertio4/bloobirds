import { useTranslation } from 'react-i18next';

import { Filter, FilterGroup, Filters, QuickFilters } from '@bloobirds-it/filters';
import { useIsNoStatusPlanAccount, useUserSearch } from "@bloobirds-it/hooks";
import {
  BobjectTypes,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  UserPermission,
} from '@bloobirds-it/types';

import { useExtensionContext } from '../../../../../context';
import styles from '../../../../extensionLeftBar.module.css';
import { SubhomeResetButton } from '../../../layouts/subhomeLayout/subhomeContent/subhomeResetButton/subhomeResetButton';
import { SubhomeStageFilter } from '../../../layouts/subhomeLayout/subhomeContent/subhomeStageFilter/subhomeStageFilter';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { scheduledFilterValues } from '../../view.utils';
import { nurturingTabQuickFilters } from './nurturingTabQuickFilters';

export const NurturingTabFilters = () => {
  const isNoStatusAccount = useIsNoStatusPlanAccount();
  const { t } = useTranslation();
  const { useGetDataModel, useGetSettings } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const userFilterAvailable =
    settings?.user?.accountAdmin || settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  const users = useUserSearch();

  const { selectedTab, setQuery, setHaveFiltersBeenChanged } = useSubhomeContext();

  const priorityTasks = dataModel?.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const priorityField = dataModel?.findFieldByLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const noPriorityField = priorityTasks?.find(
    priorityTask => priorityTask.logicRole === 'TASK__PRIORITY__NO_PRIORITY',
  );

  const quickFilters = nurturingTabQuickFilters(dataModel);

  return (
    <Filters
      bobjectType={BobjectTypes.Task}
      tabName={`filters-${selectedTab}`}
      bobjectFields={dataModel}
      defaultQuickFilters={quickFilters}
      defaultFilters={[
        {
          fieldLR: TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
          defaultValue: [TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.NEXT_STEP],
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
        if (query) {
          Object.keys(query).forEach(key => {
            if (key === priorityField?.id) {
              const v = query[key].find(value => value === noPriorityField?.id);
              if (v) {
                noPriorityQuery[key] = [...query[key], '__MATCH_EMPTY_ROWS__'];
              }
            }
          });
        }
        setQuery({ ...query, ...noPriorityQuery });
      }}
      onHaveFiltersBeenChanged={haveFiltersBeenChanged =>
        setHaveFiltersBeenChanged(!!haveFiltersBeenChanged)
      }
    >
      <FilterGroup>
        <Filter
          fieldLR={TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME}
          placeholder={t('common.date')}
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
        {!isNoStatusAccount && <SubhomeStageFilter />}
        <Filter
          fieldLR={TASK_FIELDS_LOGIC_ROLE.PRIORITY}
          placeholder={t('leftBar.filters.priority')}
          values={priorityTasks}
          isMultiselect
          options={{
            renderDisplayValue: value => {
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
      {quickFilters?.length > 0 && (
        <div className={styles.quickFilter}>
          <FilterGroup>
            <QuickFilters />
            <SubhomeResetButton />
          </FilterGroup>
        </div>
      )}
    </Filters>
  );
};

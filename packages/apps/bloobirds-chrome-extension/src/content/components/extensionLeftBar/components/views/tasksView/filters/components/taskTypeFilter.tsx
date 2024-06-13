import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Filter } from '@bloobirds-it/filters';
import { useActiveAccountId, useCustomTasks, useNewCadenceTableEnabled } from '@bloobirds-it/hooks';
import {
  CustomTask,
  QuickFilter,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';

type TaskTypeFilterValues = TASK_TYPE | TASK_ACTION_VALUE | string;

interface TaskTypeFilterI {
  logicRole?: string;
  value?: string;
  id: string;
  name: string;
}

const getStandardTaskTypes = t => [
  {
    logicRole: TASK_TYPE.NEXT_STEP,
    value: TASK_TYPE.NEXT_STEP,
    id: TASK_TYPE.NEXT_STEP,
    name: t('task'),
  },
  {
    logicRole: TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL,
    value: TASK_ACTION_VALUE.CALL_YES,
    id: TASK_ACTION_VALUE.CALL_YES,
    name: t('call'),
  },
  {
    logicRole: TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL,
    value: TASK_ACTION_VALUE.EMAIL_YES,
    id: TASK_ACTION_VALUE.EMAIL_YES,
    name: t('email'),
  },
];

const baseSubQueries = {
  [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL]: [TASK_ACTION_VALUE.CALL_NO, '__MATCH_EMPTY_ROWS__'],
  [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL]: [TASK_ACTION_VALUE.EMAIL_NO, '__MATCH_EMPTY_ROWS__'],
  [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_LINKEDIN]: [
    TASK_ACTION_VALUE.LINKEDIN_MESSAGE_NO,
    '__MATCH_EMPTY_ROWS__',
  ],
  [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK]: [
    TASK_ACTION_VALUE.CUSTOM_TASK_NO,
    '__MATCH_EMPTY_ROWS__',
  ],
};

const getDefaultTaskTypeQuery = (qfApplied: QuickFilter, isNextStepSelected: boolean) => {
  const options = isNextStepSelected
    ? ['onCadence', 'meetingReminders'].includes(qfApplied?.id)
      ? ['__MATCH_EMPTY_ROWS__']
      : [TASK_TYPE.NEXT_STEP]
    : [TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.NEXT_STEP];

  return qfApplied && !isNextStepSelected ? {} : { [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: options };
};

export const parseTaskTypeQuery = (
  values: TaskTypeFilterValues[] = [],
  quickFilterApplied: QuickFilter,
) => {
  if (values.length === 0) return [];

  const parsedQuery = [];

  const addQuery = (query: Record<string, string | string[]>, isNextStepSelected = false) => {
    parsedQuery.push({
      ...baseSubQueries,
      ...query,
      ...getDefaultTaskTypeQuery(quickFilterApplied, isNextStepSelected),
    });
  };

  const customTaskIds =
    values.filter(
      (value: TaskTypeFilterValues) =>
        ![TASK_TYPE.NEXT_STEP, TASK_ACTION_VALUE.CALL_YES, TASK_ACTION_VALUE.EMAIL_YES]?.includes(
          // @ts-ignore
          value,
        ),
    ) || [];

  if (values.includes(TASK_TYPE.NEXT_STEP)) {
    addQuery({}, true);
  }

  if (values.includes(TASK_ACTION_VALUE.CALL_YES)) {
    addQuery({ [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL]: TASK_ACTION_VALUE.CALL_YES });
  }

  if (values.includes(TASK_ACTION_VALUE.EMAIL_YES)) {
    addQuery({ [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL]: TASK_ACTION_VALUE.EMAIL_YES });
  }

  if (customTaskIds.length > 0) {
    addQuery({
      [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK]: TASK_ACTION_VALUE.CUSTOM_TASK_YES,
      [TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK]: customTaskIds,
    });
  }

  return parsedQuery;
};

export const TaskTypeFilter = () => {
  const { t: tasksT } = useTranslation('translation', { keyPrefix: 'tasks.taskTypeSelector' });
  const { t } = useTranslation();
  const accountId = useActiveAccountId();
  const { customTasks } = useCustomTasks();
  const customTaskEnabled = useNewCadenceTableEnabled(accountId);
  const standardTaskTypes = getStandardTaskTypes(tasksT);
  const [taskTypesWithCustom, setTaskTypesWithCustom] = React.useState<TaskTypeFilterI[]>(
    standardTaskTypes,
  );

  useEffect(() => {
    if (customTaskEnabled) {
      setTaskTypesWithCustom([
        ...standardTaskTypes,
        ...(customTasks?.map((custom: CustomTask) => ({
          name: custom.name,
          id: custom.id,
        })) || []),
      ]);
    }
  }, [customTasks]);

  return (
    <Filter
      fieldLR={TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK}
      placeholder={t('leftBar.filters.taskType')}
      values={taskTypesWithCustom}
      isMultiselect
      options={{
        variant: 'filters',
      }}
    />
  );
};

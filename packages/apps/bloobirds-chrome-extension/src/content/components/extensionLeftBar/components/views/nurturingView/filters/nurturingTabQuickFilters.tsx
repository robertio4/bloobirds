import { useTranslation } from 'react-i18next';

import { QuickFilter, SearchType, TASK_FIELDS_LOGIC_ROLE, TASK_TYPE } from '@bloobirds-it/types';

export const nurturingTabQuickFilters = (dataModel): QuickFilter[] => {
  const { t } = useTranslation();

  const taskTypeLR = TASK_FIELDS_LOGIC_ROLE.TASK_TYPE;
  const taskTypeField = dataModel?.findFieldByLogicRole(taskTypeLR);

  const onCadenceLR = TASK_TYPE.PROSPECT_CADENCE;
  const onCadenceField = taskTypeField.values.find(a => a.logicRole === onCadenceLR);

  const nextStepLR = TASK_TYPE.NEXT_STEP;
  const nextStepField = taskTypeField.values.find(a => a.logicRole === nextStepLR);

  return [
    {
      id: 'onCadence',
      name: t('leftBar.quickFilters.onCadence'),
      color: 'peanut',
      filters: [
        {
          bobjectFieldId: taskTypeField?.id,
          values: [
            {
              bobjectPicklistValue: onCadenceField?.id,
              textValue: null,
              searchType: SearchType.EXACT,
            },
          ],
        },
      ],
    },
    {
      id: 'manualTasks',
      name: t('leftBar.quickFilters.manualTasks'),
      color: 'peanut',
      filters: [
        {
          bobjectFieldId: taskTypeField?.id,
          values: [
            {
              bobjectPicklistValue: nextStepField?.id,
              textValue: null,
              searchType: SearchType.EXACT,
            },
          ],
        },
      ],
    },
  ];
};

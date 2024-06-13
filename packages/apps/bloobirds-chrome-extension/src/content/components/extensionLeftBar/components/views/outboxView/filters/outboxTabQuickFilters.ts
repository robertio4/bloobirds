import { useTranslation } from 'react-i18next';

import {
  SearchType,
  QuickFilter,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_TYPE,
  TASK_AUTOMATED_STATUS_LOGIC_ROLE,
  TASK_ACTION_VALUE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
} from '@bloobirds-it/types';

import { EMAILING_TYPE } from '../outbox.constants';

export const OutboxTabQuickFilters = (dataModel: any): QuickFilter[] => {
  const { t } = useTranslation();

  const taskTypeLR = TASK_FIELDS_LOGIC_ROLE.TASK_TYPE;
  const taskTypeField = dataModel?.findFieldByLogicRole(taskTypeLR);

  const scheduledEmail = TASK_TYPE.SCHEDULED_EMAIL;
  const scheduledEmailField = taskTypeField.values.find(a => a.logicRole === scheduledEmail);

  const prospectCadence = TASK_TYPE.PROSPECT_CADENCE;
  const prospectCadenceField = taskTypeField.values.find(a => a.logicRole === prospectCadence);

  const isAutomatedEmailLR = TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL;
  const isAutomatedEmailField = dataModel?.findFieldByLogicRole(isAutomatedEmailLR);

  const automatedEmailYes = TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES;
  const automatedEmailYesField = isAutomatedEmailField.values.find(
    a => a.logicRole === automatedEmailYes,
  );

  const automatedStatusLR = TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS;
  const automatedStatusField = dataModel?.findFieldByLogicRole(automatedStatusLR);

  const pendingAutomated = TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING;
  const pendingAutomatedField = automatedStatusField.values.find(
    a => a.logicRole === pendingAutomated,
  );

  const statusLR = TASK_FIELDS_LOGIC_ROLE.STATUS;
  const statusField = dataModel?.findFieldByLogicRole(statusLR);

  const todo = TASK_STATUS_VALUE_LOGIC_ROLE.TODO;
  const todoField = statusField.values.find(a => a.logicRole === todo);

  const overdue = TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE;
  const overdueField = statusField.values.find(a => a.logicRole === overdue);

  return [
    {
      id: EMAILING_TYPE.AUTOMATED,
      name: t('leftBar.quickFilters.automatedEmails'),
      color: 'peanut',
      type: 'ORs',
      filters: [
        {
          bobjectFieldId: taskTypeField?.id,
          values: [
            {
              bobjectPicklistValue: prospectCadenceField?.id,
              textValue: null,
              searchType: SearchType.EXACT,
            },
          ],
        },
        {
          bobjectFieldId: isAutomatedEmailField?.id,
          values: [
            {
              bobjectPicklistValue: automatedEmailYesField?.id,
              textValue: null,
              searchType: SearchType.EXACT,
            },
          ],
        },
        {
          bobjectFieldId: statusField?.id,
          values: [
            {
              bobjectPicklistValue: [todoField?.id, overdueField?.id],
              textValue: null,
              searchType: SearchType.EXACT,
            },
          ],
        },
      ],
    },
    {
      id: EMAILING_TYPE.SCHEDULE,
      name: t('leftBar.quickFilters.scheduledEmails'),
      color: 'peanut',
      type: 'ORs',
      filters: [
        {
          bobjectFieldId: taskTypeField?.id,
          values: [
            {
              bobjectPicklistValue: scheduledEmailField?.id,
              textValue: null,
              searchType: SearchType.EXACT,
            },
          ],
        },
        {
          bobjectFieldId: automatedStatusField?.id,
          values: [
            {
              bobjectPicklistValue: pendingAutomatedField?.id,
              textValue: null,
              searchType: SearchType.EXACT,
            },
          ],
        },
        {
          bobjectFieldId: statusField?.id,
          values: [
            {
              bobjectPicklistValue: [todoField?.id, overdueField?.id],
              textValue: null,
              searchType: SearchType.EXACT,
            },
          ],
        },
      ],
    },
  ];
};

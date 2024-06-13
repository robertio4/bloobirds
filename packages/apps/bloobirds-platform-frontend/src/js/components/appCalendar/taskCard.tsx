import React from 'react';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useFullSalesEnabled, useIsOTOAccount } from '@bloobirds-it/hooks';
import {
  TASK_PRIORITY_VALUE,
  BOBJECT_TYPES,
  FIELDS_LOGIC_ROLE,
  TASK_ACTION,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,} from '@bloobirds-it/types';
import clsx from 'clsx';
import { format, isToday } from 'date-fns';

import { bobjectUrl } from '../../app/_constants/routes';
import { useBobjectDetails, useRouter } from '../../hooks';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isLead,
  isOpportunity,
} from '../../utils/bobjects.utils';
import styles from './appCalendar.module.css';

const ICONS_BY_BOBJECT = Object.freeze({
  [BOBJECT_TYPES.COMPANY]: 'company',
  [BOBJECT_TYPES.LEAD]: 'person',
  [BOBJECT_TYPES.OPPORTUNITY]: 'fileOpportunity',
});

const TaskCard = ({ task }) => {
  const { history } = useRouter();
  const hasSalesEnabled = useFullSalesEnabled(task?.id?.accountId);
  const title = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TITLE);
  const type = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
  const status = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const scheduledDatetime = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const isAutoEmail =
    getFieldByLogicRole(task, TASK_ACTION.AUTOMATED_EMAIL)?.valueLogicRole ===
    TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES;
  const taskPriority = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.PRIORITY)?.valueLogicRole;
  const isImportant = taskPriority === TASK_PRIORITY_VALUE.IMPORTANT;
  const mainBobject = opportunity || lead || company;
  const mainBobjectNameLogicRole =
    mainBobject &&
    (isLead(mainBobject)
      ? FIELDS_LOGIC_ROLE[mainBobject.id.typeName]?.FULL_NAME
      : FIELDS_LOGIC_ROLE[mainBobject.id.typeName]?.NAME);
  const mainBobjectName =
    mainBobject && getTextFromLogicRole(mainBobject, mainBobjectNameLogicRole);
  const mainBobjectUrl =
    mainBobject && bobjectUrl(mainBobject, hasSalesEnabled ? undefined : company);
  const isTaskCompleted = [
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
  ].includes(status);
  const isSalesTask = isOpportunity(mainBobject);
  const bulletClasses = clsx(styles._bullet, {
    [styles._scheduled_bullet]: type === TASK_TYPE.NEXT_STEP,
    [styles._meeting_bullet]: [TASK_TYPE.MEETING, TASK_TYPE.CONTACT_BEFORE_MEETING].includes(type),
    [styles._prospect_bullet]: type === TASK_TYPE.PROSPECT_CADENCE && !isSalesTask,
    [styles._sales_prospect_bullet]: type === TASK_TYPE.PROSPECT_CADENCE && isSalesTask,
  });
  const { openBobjectDetails } = useBobjectDetails();
  const isOTOAccount = useIsOTOAccount();
  const isManualProspecting = type === TASK_TYPE.PROSPECT_CADENCE && !isAutoEmail;

  return (
    <>
      <li className={styles._task_item} key={task?.id.objectId}>
        <span className={bulletClasses} />
        {isImportant && <Icon name="flagFilled" size={12} color="softTomato" />}
        {isToday(new Date()) && !isManualProspecting && scheduledDatetime && (
          <Text
            weight="bold"
            size="xs"
            htmlTag="span"
            decoration={isTaskCompleted ? 'line-through' : ''}
          >
            {format(new Date(scheduledDatetime), 'HH:mm')}
          </Text>
        )}
        <span className={clsx(styles._text_wrapper, styles._name_wrapper)}>
          <Text size="xs" htmlTag="span" decoration={isTaskCompleted ? 'line-through' : ''}>
            {title}
          </Text>
        </span>
        {mainBobject && (
          <>
            <Icon name={ICONS_BY_BOBJECT[mainBobject.id.typeName]} size={12} />
            <span
              className={clsx(styles._text_wrapper, styles._link)}
              onClick={
                isOTOAccount
                  ? () => openBobjectDetails({ id: mainBobject?.id.value })
                  : e => history.push(mainBobjectUrl, { event: e })
              }
            >
              <Text
                color="bloobirds"
                size="xs"
                htmlTag="span"
                decoration={isTaskCompleted ? 'line-through' : ''}
              >
                {mainBobjectName}
              </Text>
            </span>
          </>
        )}
      </li>
    </>
  );
};

export default TaskCard;

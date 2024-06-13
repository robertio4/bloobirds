import React, { Fragment, useCallback } from 'react';

import { AssigneeComponent } from '@bloobirds-it/bobjects';
import { CardBody, CardRight, Icon, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import {
  Bobject,
  BobjectField,
  BobjectType,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  CustomTask,
  FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
} from '@bloobirds-it/types';
import { getFieldByLogicRole, getTextFromLogicRole, isScheduledTask } from '@bloobirds-it/utils';
import clsx from 'clsx';

import RightClickContextMenu from '../../../../components/rightClickContextMenu';
import { StatusLabel } from '../../../../components/statusLabel/statusLabel';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import {
  formatDate,
  isBeforeToday,
  isDifferentYearThanCurrent,
} from '@bloobirds-it/utils';
import { checkIsOverdue } from '../../../outboxPages/automated/automated.utils';
import { ScheduledDatetime } from '../../prospectingPage/components/fieldTypeComponent';
import styles from '../../salesPage/companiesAndLeads/companiesAndLeads.module.css';
import { generateBobjectBasedData } from './card.utils';
import { CurrentLocalTime, NameComponent, PlainTextComponent } from './fieldTypeComponent';
import PriorityLabel from './subcomponents/priorityLabel';
import { TaskIconDisplay } from './subcomponents/taskIconDisplay';

const NAME_OR_REFERENCE_FIELDS = [
  COMPANY_FIELDS_LOGIC_ROLE.NAME,
  LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY,
  LEAD_FIELDS_LOGIC_ROLE.COMPANY,
  LEAD_FIELDS_LOGIC_ROLE.OPPORTUNITY,
  TASK_FIELDS_LOGIC_ROLE.COMPANY,
  TASK_FIELDS_LOGIC_ROLE.LEAD,
  TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
];

type BobjectTypeSelector = typeof COMPANY_FIELDS_LOGIC_ROLE | typeof LEAD_FIELDS_LOGIC_ROLE;

const getStatus = (bobject: Bobject, bobjectType: BobjectType) => {
  let logicRole;
  switch (bobjectType) {
    case BobjectTypes.Company:
      logicRole = COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS;
      break;
    case BobjectTypes.Lead:
      logicRole = LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS;
      break;
    case BobjectTypes.Opportunity:
      logicRole = OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS;
      break;
    case BobjectTypes.Task:
      bobject = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
      logicRole = OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS;
      break;
  }

  return getFieldByLogicRole(bobject, logicRole);
};

export const SalesCardBody = ({
  bobject,
  fieldsArray,
  contextMenuProps,
  customTask,
}: {
  bobject: Bobject;
  contextMenuProps: any;
  fieldsArray?: Array<string>;
  customTask?: CustomTask;
}) => {
  const bobjectType: BobjectType = bobject?.id?.typeName;

  const { xPos, isContextMenuVisible, hideContextMenu } = contextMenuProps;
  const isAccountAdmin = useIsAccountAdmin();
  const referencedBobjectData = useCallback(() => generateBobjectBasedData(bobject, fieldsArray), [
    bobject,
  ]);
  const subhomeItemFields = referencedBobjectData();
  const status = getStatus(bobject, bobjectType);
  const isHighPriority =
    subhomeItemFields?.bobjectType !== BobjectTypes.Opportunity &&
    getFieldByLogicRole(
      bobject,
      (FIELDS_LOGIC_ROLE[subhomeItemFields?.bobjectType] as BobjectTypeSelector).HIGH_PRIORITY,
    )?.text === 'Yes';
  const date = getTextFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const isOverdue = checkIsOverdue(bobject);
  const isTaskScheduled = isScheduledTask(bobject);
  const schedulingMode = getTextFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_MODE);
  const taskPriority = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.PRIORITY)
    ?.valueLogicRole;
  const isImportant = taskPriority === TASK_PRIORITY_VALUE.IMPORTANT;

  const opportunityCloseDate = getTextFromLogicRole(
    bobject,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE,
  );
  const taskHasMultipleReferences =
    subhomeItemFields?.fields?.filter(
      field =>
        field?.value &&
        [
          TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
          TASK_FIELDS_LOGIC_ROLE.COMPANY,
          TASK_FIELDS_LOGIC_ROLE.LEAD,
        ].includes(field?.logicRole),
    )?.length > 1;

  return (
    <>
      <CardBody>
        {isHighPriority && (
          <div className={styles._icon__container}>
            <Tooltip title="High priority" position="top">
              <Icon name="zap" size={18} color="banana" />
            </Tooltip>
          </div>
        )}
        {bobjectType === BobjectTypes.Task && (
          <TaskIconDisplay bobject={bobject} customTask={customTask} />
        )}
        {subhomeItemFields?.fields.map(({ value, logicRole }, index) => {
          if (value) {
            if (NAME_OR_REFERENCE_FIELDS.includes(logicRole)) {
              return (
                <Fragment key={`Namefield_${logicRole}_${index}`}>
                  {taskHasMultipleReferences && logicRole.includes('__COMPANY') && (
                    <div className={styles._separator} />
                  )}
                  <NameComponent
                    value={value as BobjectField | Bobject}
                    bobject={subhomeItemFields?.bobject}
                  />
                </Fragment>
              );
            }
            if (logicRole.includes('ASSIGNED_TO')) {
              return (
                isAccountAdmin && (
                  <AssigneeComponent
                    key={`Assignee_${logicRole}_${index}`}
                    value={value as BobjectField}
                  />
                )
              );
            }

            let ret;
            switch (logicRole) {
              case TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME:
                if (customTask && schedulingMode === 'START') {
                  ret = (
                    <ScheduledDatetime
                      key={`ScheduledTime_${logicRole}_${index}`}
                      value={value as string}
                    />
                  );
                } else {
                  ret = null;
                }
                break;
              case TASK_FIELDS_LOGIC_ROLE.TITLE:
                if (customTask) {
                  ret = (
                    <>
                      {!isTaskScheduled && (
                        <PlainTextComponent
                          key={`PlainText_${logicRole}_${index}`}
                          value={value as string}
                          logicRole={logicRole}
                        />
                      )}
                      <div className={styles._title}>
                        <Text size="s">
                          <strong>{customTask.name}</strong>
                        </Text>
                      </div>
                      {isTaskScheduled && (
                        <PlainTextComponent
                          key={`PlainText_${logicRole}_${index}`}
                          value={value as string}
                          logicRole={logicRole}
                        />
                      )}
                    </>
                  );
                } else {
                  ret = (
                    <PlainTextComponent
                      key={`PlainText_${logicRole}_${index}`}
                      value={value as string}
                      logicRole={logicRole}
                    />
                  );
                }
                break;
              case 'CUSTOM_TASK_TIMEZONE':
                ret = (
                  <CurrentLocalTime key={`CurrentLocalTime_${logicRole}_${index}`} task={bobject} />
                );
                break;
              default:
                if (customTask) {
                  ret = <></>;
                } else {
                  ret = (
                    <PlainTextComponent
                      key={`PlainText_${logicRole}_${index}`}
                      value={value as string}
                      logicRole={logicRole}
                    />
                  );
                }

                break;
            }

            return (
              <Fragment key={`Field_${logicRole}_${index}`}>
                {logicRole.includes('SOURCE') && <div className={styles._separator} />}
                {ret}
              </Fragment>
            );
          }
        })}
        {isContextMenuVisible && (
          <RightClickContextMenu
            url={subhomeItemFields?.url}
            xPos={xPos}
            hideContextMenu={hideContextMenu}
            isVirtualList={true}
          />
        )}
      </CardBody>
      <CardRight>
        {isImportant && <PriorityLabel />}
        {status && (
          <div className={clsx(styles._status, styles._s_hidden)}>
            <Tooltip
              title={`${bobjectType} ${
                bobjectType === 'Task' || bobjectType === 'Opportunity' ? 'stage' : 'status'
              }`}
              position="top"
            >
              <StatusLabel
                backgroundColor={status?.valueBackgroundColor}
                textColor={status?.valueTextColor}
                name={status?.text}
              />
            </Tooltip>
          </div>
        )}
        <div className={clsx(styles._date, styles._s_hidden, styles._m_hidden, styles._l_hidden)}>
          <Text size="s" color="softPeanut" inline align="right">
            {date &&
              `Due date ${formatDate(
                new Date(date),
                isDifferentYearThanCurrent(date) ? 'MMM dd yyyy' : 'MMM dd HH:mm',
              )}`}
          </Text>
        </div>
        {opportunityCloseDate && (
          <div className={clsx(styles._date, styles._s_hidden, styles._m_hidden, styles._l_hidden)}>
            <Text
              size="s"
              inline
              align="right"
              color={isBeforeToday(new Date(opportunityCloseDate)) ? 'tomato' : 'softPeanut'}
            >
              {opportunityCloseDate &&
                `Close date ${formatDate(new Date(opportunityCloseDate), 'do, MMM')}`}
            </Text>
          </div>
        )}
        {isOverdue && (
          <div
            className={clsx(styles._overdue, styles._s_hidden, styles._m_hidden, styles._l_hidden)}
          >
            <Text size="s" color="tomato" inline align="right">
              Overdue
            </Text>
          </div>
        )}
      </CardRight>
    </>
  );
};

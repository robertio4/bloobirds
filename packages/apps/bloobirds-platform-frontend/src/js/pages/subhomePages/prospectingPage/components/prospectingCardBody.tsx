import React, { Fragment, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { AssigneeComponent } from '@bloobirds-it/bobjects';
import {
  CardBody,
  CardRight,
  ColorType,
  Icon,
  Label,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BOBJECT_TYPES,
  BobjectField,
  BobjectType,
  BobjectTypes,
  CustomTask,
  FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  MainBobjectTypes,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { isScheduledTask } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

import RightClickContextMenu from '../../../../components/rightClickContextMenu';
import { StatusLabel } from '../../../../components/statusLabel/statusLabel';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { useMediaQuery } from '../../../../hooks';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { getFieldByLogicRole, getTextFromLogicRole } from '../../../../utils/bobjects.utils';
import { getTaskReferenceBobject } from '../../../../utils/tasks.utils';
import { checkIsOverdue } from '../../../outboxPages/automated/automated.utils';
import styles from '../../components/subhomeCards/card.module.css';
import { CurrentLocalTime } from '../../components/subhomeCards/fieldTypeComponent';
import PriorityLabel from '../../components/subhomeCards/subcomponents/priorityLabel';
import { TaskIconDisplay } from '../../components/subhomeCards/subcomponents/taskIconDisplay';
import { PROSPECTING_SLUGS } from '../../subhomes.constants';
import { generateBobjectBasedData, getDisplayedDatetime } from './card.utils';
import {
  LinkedinComponent,
  NameComponent,
  PlainTextComponent,
  RelatedActivityTime,
  ScheduledDatetime,
  TimeZoneDisplay,
} from './fieldTypeComponent';

type BobjectTypeSelector = typeof COMPANY_FIELDS_LOGIC_ROLE | typeof LEAD_FIELDS_LOGIC_ROLE;

const getStatus = (bobject: Bobject, bobjectType: BobjectType) => {
  let logicRole;
  switch (bobjectType) {
    case BobjectTypes.Company:
      logicRole = COMPANY_FIELDS_LOGIC_ROLE.STATUS;
      break;
    case BobjectTypes.Lead:
      logicRole = LEAD_FIELDS_LOGIC_ROLE.STATUS;
      break;
    case BobjectTypes.Task:
      bobject = getTaskReferenceBobject(bobject);
      bobjectType = bobject?.id?.typeName;
      logicRole =
        FIELDS_LOGIC_ROLE[(bobjectType as BobjectTypes.Company) || BobjectTypes.Lead]?.STATUS;
      break;
  }

  return getFieldByLogicRole(bobject, logicRole);
};

export const ProspectingCardBody = React.memo(
  ({
    bobject,
    contextMenuProps,
    fieldsArray,
    customTask,
  }: {
    bobject: Bobject;
    contextMenuProps: any;
    fieldsArray?: Array<string>;
    customTask?: CustomTask;
  }) => {
    const id = uuid();
    const { slug }: { slug: string } = useParams();
    const isMeetingTab = slug === PROSPECTING_SLUGS.MEETING;
    const isNurturingTab = slug === PROSPECTING_SLUGS.NURTURING;
    const isTaskScheduled = isScheduledTask(bobject);
    const bobjectType = bobject?.id?.typeName;

    const { isSmallDesktop } = useMediaQuery();
    const { xPos, isContextMenuVisible, hideContextMenu } = contextMenuProps;
    const isAccountAdmin = useIsAccountAdmin();
    const referencedBobjectData = useCallback(
      () => generateBobjectBasedData(bobject, fieldsArray),
      [bobject],
    );
    const subhomeItemFields = referencedBobjectData();
    const isCadenceTask =
      getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole ===
      TASK_TYPE.PROSPECT_CADENCE;
    const status = getStatus(bobject, bobjectType);
    const referencedBobject = getTaskReferenceBobject(bobject);
    const referencedBobjectType = referencedBobject?.id?.typeName;
    const isHighPriority =
      subhomeItemFields?.bobjectType !== BOBJECT_TYPES.OPPORTUNITY &&
      getFieldByLogicRole(
        bobject,
        (FIELDS_LOGIC_ROLE[
          subhomeItemFields?.bobjectType as MainBobjectTypes
        ] as BobjectTypeSelector)?.HIGH_PRIORITY,
      )?.text === 'Yes';

    const isReferencedBobjectHighPriority =
      getFieldByLogicRole(
        referencedBobject,
        FIELDS_LOGIC_ROLE[referencedBobjectType as BobjectTypes.Company | BobjectTypes.Lead]
          ?.HIGH_PRIORITY,
      )?.text === 'Yes';
    const isOverdue = checkIsOverdue(bobject);
    const mrRating = getFieldByLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.MR_RATING);
    const taskPriority = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.PRIORITY)
      ?.valueLogicRole;
    const isImportant = taskPriority === TASK_PRIORITY_VALUE.IMPORTANT;

    const schedulingMode = getTextFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_MODE);
    const displayedDatetime = getDisplayedDatetime(bobject);
    const taskHasLeadWithCompany =
      subhomeItemFields?.fields?.filter(
        field =>
          field?.value &&
          [TASK_FIELDS_LOGIC_ROLE.COMPANY, TASK_FIELDS_LOGIC_ROLE.LEAD].includes(field?.logicRole),
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
            <TaskIconDisplay bobject={subhomeItemFields?.bobject} customTask={customTask} />
          )}
          {subhomeItemFields?.fields.map(({ value, logicRole }, idx) => {
            if (logicRole) {
              if (value) {
                switch (logicRole) {
                  case LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL:
                  case COMPANY_FIELDS_LOGIC_ROLE.LINKEDIN_URL:
                    return (
                      isNurturingTab && <LinkedinComponent key={`${id}${idx}`} value={value} />
                    );
                  case COMPANY_FIELDS_LOGIC_ROLE.NAME:
                  case LEAD_FIELDS_LOGIC_ROLE.FULL_NAME:
                  case OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME:
                  case OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY:
                  case LEAD_FIELDS_LOGIC_ROLE.COMPANY:
                  case LEAD_FIELDS_LOGIC_ROLE.OPPORTUNITY:
                  case TASK_FIELDS_LOGIC_ROLE.TITLE:
                  case TASK_FIELDS_LOGIC_ROLE.COMPANY:
                  case TASK_FIELDS_LOGIC_ROLE.LEAD:
                  case TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY:
                    return (
                      <Fragment key={`${id}${idx}`}>
                        {logicRole.includes('__COMPANY') && taskHasLeadWithCompany && (
                          <div className={styles._separator} />
                        )}
                        {logicRole === TASK_FIELDS_LOGIC_ROLE.TITLE &&
                          customTask &&
                          isTaskScheduled && (
                            <div className={styles._title}>
                              <Text size="s">
                                <strong>{customTask.name}</strong>
                              </Text>
                            </div>
                          )}
                        <NameComponent
                          value={value as Bobject | BobjectField}
                          bobject={subhomeItemFields?.bobject}
                        />
                        {isReferencedBobjectHighPriority &&
                          logicRole === TASK_FIELDS_LOGIC_ROLE.TITLE && (
                            <div>
                              <Icon size={16} name="zap" color="banana" />
                            </div>
                          )}
                        {logicRole === TASK_FIELDS_LOGIC_ROLE.TITLE &&
                          customTask &&
                          !isTaskScheduled && (
                            <div className={styles._title}>
                              <Text size="s">
                                <strong>{customTask.name}</strong>
                              </Text>
                            </div>
                          )}
                      </Fragment>
                    );
                  case COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
                  case LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
                  case TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
                    return (
                      isAccountAdmin && (
                        <AssigneeComponent key={`${id}${idx}`} value={value as BobjectField} />
                      )
                    );
                  case TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME:
                    return (
                      (!isCadenceTask || (customTask && schedulingMode === 'START')) && (
                        <ScheduledDatetime key={`${id}${idx}`} value={value as string} />
                      )
                    );
                  case COMPANY_FIELDS_LOGIC_ROLE.COUNTRY:
                    return <TimeZoneDisplay key={`${id}${idx}`} bobject={bobject} />;
                  case COMPANY_FIELDS_LOGIC_ROLE.SOURCE:
                  case LEAD_FIELDS_LOGIC_ROLE.SOURCE:
                    return (
                      <Fragment key={`${id}${idx}`}>
                        <div className={styles._separator} />
                        <PlainTextComponent value={value as string} logicRole={logicRole} />
                      </Fragment>
                    );
                  default:
                    return (
                      <Fragment key={`${id}${idx}`}>
                        {logicRole.includes('SOURCE') && <div className={styles._separator} />}
                        <PlainTextComponent value={value as string} logicRole={logicRole} />
                      </Fragment>
                    );
                }
              } else {
                switch (logicRole) {
                  case ACTIVITY_FIELDS_LOGIC_ROLE.TIME:
                    return <RelatedActivityTime key={`${id}${idx}`} bobject={bobject} />;
                  case 'CUSTOM_TASK_TIMEZONE':
                    return <CurrentLocalTime key={`${id}${idx}`} task={bobject} />;
                }
              }
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
          {mrRating && (
            <div className={clsx(styles._mr_rating, styles._s_hidden, styles._m_hidden)}>
              {mrRating?.text && (
                <Tooltip title="MR Rating" position="top">
                  <Label
                    dataTest="mrRating"
                    overrideStyle={{
                      backgroundColor: mrRating?.valueBackgroundColor,
                      color: mrRating?.valueTextColor,
                      borderColor: mrRating?.valueOutlineColor,
                    }}
                  >
                    <Text
                      htmlTag="span"
                      color={mrRating?.valueTextColor as ColorType}
                      size="s"
                      ellipsis={isSmallDesktop ? 10 : 21}
                    >
                      {mrRating?.text}
                    </Text>
                  </Label>
                </Tooltip>
              )}
            </div>
          )}
          {isImportant && <PriorityLabel />}
          {status && !isNurturingTab && !isMeetingTab && (
            <div className={clsx(styles._status, styles._s_hidden)}>
              <Tooltip
                title={`${bobjectType} ${
                  bobjectType === BobjectTypes.Opportunity ? 'stage' : 'status'
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

          {displayedDatetime && (
            <div
              className={clsx(styles._date, styles._s_hidden, styles._m_hidden, styles._l_hidden)}
            >
              <Text size="s" inline align="right" color={'softPeanut'}>
                {displayedDatetime}
              </Text>
            </div>
          )}
          {isOverdue && (
            <div
              className={clsx(
                styles._overdue,
                styles._s_hidden,
                styles._m_hidden,
                styles._l_hidden,
              )}
            >
              <Text size="s" color="tomato" inline align="right">
                Overdue
              </Text>
            </div>
          )}
        </CardRight>
      </>
    );
  },
);

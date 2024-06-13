import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Card,
  CardBody,
  CardButton,
  CardCheckbox,
  CardHeader,
  CardHoverButtons,
  CardLeft,
  CardRight,
  Icon,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import {
  useCustomTasks,
  useIsOTOAccount,
  useSelectAll,
  QuickLogModalData,
} from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  COMPANY_FIELDS_LOGIC_ROLE,
  FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_ACTION,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import {
  formatDate,
  formatDateAsText,
  getFieldByLogicRole,
  getReferencedBobject,
  getRelatedBobjectTypeName,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isDifferentYearThanCurrent,
  isSkippableTask,
  removeHtmlTags,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import { capitalize } from 'lodash';
import mixpanel from 'mixpanel-browser';

import { companyIdUrl, leadUrl, opportunityUrl } from '../../../../app/_constants/routes';
import Name from '../../../../components/name/name';
import CardRescheduleTaskButton from '../../../../components/rescheduleTask/cardRescheduleTaskButton';
import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useRouter, useTaskDone } from '../../../../hooks';
import useCadenceStep from '../../../../hooks/useCadenceStep';
import { useCadences } from '../../../../hooks/useCadences';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { CadenceObject } from '../../../../typings/cadence';
import { getButtonMarkAsDone } from '../../../../utils/tasks.utils';
import { PriorityButton } from '../../../subhomePages/components/subhomeCards/subcomponents/priorityButton';
import PriorityLabel from '../../../subhomePages/components/subhomeCards/subcomponents/priorityLabel';
import { SkipTaskButton } from '../../../subhomePages/components/subhomeCards/subcomponents/skipTaskButton';
import styles from './taskHomeCard.module.css';

export const TaskHomeCard = ({
  task,
  logCustomActivity,
}: {
  task: any;
  logCustomActivity?: (data: QuickLogModalData) => void;
}) => {
  const { selectOneItem, selectedItems } = useSelectAll();
  const { showToast } = useTaskDone();
  const { history } = useRouter();
  const hasSalesEnabled = useFullSalesEnabled();
  const taskRelatedBobjectType = getRelatedBobjectTypeName(task);
  const { cadences: cadencesEntities } = useCadences(taskRelatedBobjectType);
  const isOTOAccount = useIsOTOAccount();
  const settings = useUserSettings();
  const hasAutoLogCustomActivity = settings?.user?.autoLogCustomActivity;

  // data needed from task
  const type = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
  const isCadenceTask = type === TASK_TYPE.PROSPECT_CADENCE;
  const isScheduledTask = type === TASK_TYPE.NEXT_STEP;
  const isContactBeforeMeeting = type === TASK_TYPE.CONTACT_BEFORE_MEETING;
  const isSkippable = isSkippableTask(task);
  const status = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const referencedBobject = getReferencedBobject(task);
  const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const opportunityName = getTextFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
  const name = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TITLE);
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const scheduledMode = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_MODE);
  const leadName =
    getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) ||
    getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
  const automated = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED)?.valueLogicRole;
  const taskStatus = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const leadLastAttemptDate = lead
    ? getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY)
    : null;
  const activityRelated = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.MEETING_ACTIVITY)
    ?.referencedBobject;
  const activityRelatedDatetime = getValueFromLogicRole(
    activityRelated,
    ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
  );
  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const companyName = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);

  const companyLastAttemptDate = getValueFromLogicRole(
    company,
    COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
  );
  const scheduledDate = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const scheduledDateTime = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const isCall =
    getFieldByLogicRole(task, TASK_ACTION.CALL)?.valueLogicRole === TASK_ACTION_VALUE.CALL_YES;
  const isEmail =
    getFieldByLogicRole(task, TASK_ACTION.EMAIL)?.valueLogicRole === TASK_ACTION_VALUE.EMAIL_YES;
  const isLinkedinMessage =
    getFieldByLogicRole(task, TASK_ACTION.LINKEDIN_MESSAGE)?.valueLogicRole ===
    TASK_ACTION_VALUE.LINKEDIN_MESSAGE_YES;
  const isAutoEmail =
    getFieldByLogicRole(task, TASK_ACTION.AUTOMATED_EMAIL)?.valueLogicRole ===
    TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES;
  const cadenceName = lead
    ? getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.CADENCE)
    : getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.CADENCE);
  const description = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION);
  const cadenceId = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CADENCE);
  const taskPriority = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.PRIORITY)?.valueLogicRole;
  const isImportant = taskPriority === TASK_PRIORITY_VALUE.IMPORTANT;

  const isCompleted = [
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
  ].includes(status);
  const isRejected = status === TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED;

  const cadenceEntity = cadencesEntities?.find(
    (cadenceElement: CadenceObject) => cadenceElement?.id === cadenceId,
  );

  const isManualProspecting = type === TASK_TYPE.PROSPECT_CADENCE && !isAutoEmail;
  // Logic when checking tasks
  const isChecked = selectedItems.some(item => item?.id.objectId === task?.id.objectId);
  const buttonData = getButtonMarkAsDone({
    taskType: type,
    taskStatus,
    bobjectLastAttemptDate: leadLastAttemptDate || companyLastAttemptDate,
    taskDateField: scheduledDate || scheduledDateTime,
    taskIsAutomated: automated,
  });
  const { step } = useCadenceStep(
    getFieldByLogicRole(task, FIELDS_LOGIC_ROLE.Task.CADENCE)?.value,
    getFieldByLogicRole(task, FIELDS_LOGIC_ROLE.Task.STEP_ID)?.value,
  );
  const { customTasks } = useCustomTasks({ disabled: true });

  const customTask = customTasks?.find(ct => ct.id === step?.customTaskId);
  const handleMarkAsDone = (event: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    if (hasAutoLogCustomActivity && customTask) {
      logCustomActivity({
        customTask,
        selectedBobject: referencedBobject,
        leads: [],
        company,
      });
    }
    showToast(true, id);
  };
  const handleOnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (lead) {
      const url = leadUrl(lead, company);
      history.push(url, { event: e });
    } else if (opportunity) {
      const url = opportunityUrl(
        hasSalesEnabled ? undefined : company?.id?.objectId,
        opportunity?.id?.objectId,
      );
      history.push(url, { event: e });
    } else if (company) {
      const url = companyIdUrl(company?.id.objectId);
      history.push(url, { event: e });
    }
  };
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Card
        size="small"
        expand
        completed={isCompleted}
        onClick={!isOTOAccount ? e => handleOnClick(e) : undefined}
      >
        <CardHeader>
          <CardLeft>
            <CardCheckbox
              checked={isChecked}
              onClick={(value, event) => {
                event.preventDefault();
                event.stopPropagation();
                selectOneItem({ ...task, disabled: buttonData?.disabled });
              }}
            />
          </CardLeft>
          <CardBody>
            {isCadenceTask ? (
              <div className={styles._icons}>
                {!customTask && (
                  <>
                    <Icon
                      size={20}
                      name={isCall ? 'phone' : 'circle'}
                      color={isCall ? 'melon' : 'lightPeanut'}
                    />
                    <Icon
                      size={20}
                      name={isEmail ? 'mail' : 'circle'}
                      color={isEmail ? 'tangerine' : 'lightPeanut'}
                    />
                    <Icon
                      size={20}
                      name={isLinkedinMessage ? 'linkedin' : 'circle'}
                      color={isLinkedinMessage ? 'darkBloobirds' : 'lightPeanut'}
                    />
                  </>
                )}
                {customTask && <Icon name={customTask.icon} color={customTask.iconColor} />}
              </div>
            ) : (
              <>
                <div
                  className={clsx(styles._icon_wrapper, {
                    [styles._icon_calendar]: !isScheduledTask,
                  })}
                >
                  {isScheduledTask ? (
                    !isCall && !isEmail && !isLinkedinMessage ? (
                      <Icon name="clock" color="melon" />
                    ) : (
                      <>
                        {isCall && <Icon size={20} name="phone" color="melon" />}
                        {isEmail && <Icon size={20} name="mail" color="tangerine" />}
                        {isLinkedinMessage && (
                          <Icon size={20} name="linkedin" color="darkBloobirds" />
                        )}
                      </>
                    )
                  ) : (
                    <Icon name="calendar" color="tomato" />
                  )}
                </div>
              </>
            )}
            {((!isManualProspecting && scheduledDateTime) ||
              (customTask && scheduledMode === 'START')) && (
              <div className={styles._datetime}>
                <Text size="s" color="darkBloobirds" weight="bold" htmlTag="span">
                  {formatDateAsText({ text: scheduledDateTime, patternFormat: '{time}', t })}
                </Text>
                {isDifferentYearThanCurrent(scheduledDateTime) && (
                  <Text size="s" color="bloobirds" htmlTag="span" className={styles._time}>
                    {formatDateAsText({
                      text: scheduledDateTime,
                      patternFormat: '{month-short} {date-ordinal}',
                      t,
                    })}
                  </Text>
                )}
              </div>
            )}
            <div className={styles._title}>
              <Tooltip
                title={
                  isScheduledTask
                    ? name
                    : removeHtmlTags(
                        `${description || ''}${
                          cadenceName ? `${capitalize(t('common.cadence'))} : ${cadenceName}` : ''
                        }`,
                      )
                }
                position="top"
              >
                <Text
                  dataTest="OnCadenceCard-TaskName"
                  size="s"
                  weight="medium"
                  color="darkBloobirds"
                  decoration={isCompleted ? 'line-through' : ''}
                  inline
                >
                  {name}
                </Text>
              </Tooltip>
            </div>
            {customTask && (
              <div className={styles._title}>
                <Text dataTest="OnCadenceCard-TaskName" size="s" weight="bold" inline>
                  {customTask.name}
                </Text>
              </div>
            )}
            {activityRelated && activityRelatedDatetime && (
              <div className={styles._title}>
                <Tooltip
                  title={`${t('home.leftContent.taskList.taskHomeCard.scheduledAt')}: ${formatDate(
                    new Date(activityRelatedDatetime),
                    'HH:mm',
                  )}`}
                  position="top"
                >
                  <Text
                    dataTest="Task-Card-ActivityRelatedDatetime"
                    size="s"
                    ellipsis={25}
                    color="bloobirds"
                    decoration={isCompleted ? 'line-through' : ''}
                    inline
                  >
                    <b>{t('home.leftContent.taskList.taskHomeCard.scheduledAt')}</b>{' '}
                    {activityRelatedDatetime &&
                      formatDate(new Date(activityRelatedDatetime), 'HH:mm')}
                  </Text>
                </Tooltip>
              </div>
            )}
            <div className={styles._title}>
              {leadName ? (
                <div className={styles._bobject_name}>
                  <Icon name="person" size={20} />
                  <Name name={leadName} bobject={lead} isCompleted={isCompleted} />
                </div>
              ) : (
                <>
                  {opportunityName ? (
                    <div className={styles._bobject_name}>
                      <Icon name="fileOpportunity" size={20} />
                      <Name
                        name={opportunityName}
                        bobject={opportunity}
                        isCompleted={isCompleted}
                      />
                    </div>
                  ) : (
                    <>
                      {companyName && (
                        <div className={styles._bobject_name}>
                          <Icon name="company" size={20} />
                          <Name name={companyName} bobject={company} isCompleted={isCompleted} />
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </CardBody>
          <CardRight>{isImportant && <PriorityLabel size="small" />}</CardRight>
          {selectedItems.length === 0 ? (
            <CardHoverButtons size="small">
              {(isScheduledTask || isCadenceTask || isContactBeforeMeeting) && (
                <PriorityButton task={task} size="s" />
              )}
              {cadenceEntity?.reschedulableMode === 'RESCHEDULABLE' && !isCompleted && !isRejected && (
                <Tooltip
                  title={t('home.leftContent.taskList.taskHomeCard.rescheduleTask')}
                  position="top"
                >
                  <CardRescheduleTaskButton task={task} size="s" />
                </Tooltip>
              )}
              <Tooltip title="Skip task" position="top">
                {isSkippable && <SkipTaskButton task={task} size="s" />}
              </Tooltip>
              <Tooltip title={buttonData?.tooltip} position="top">
                <CardButton
                  dataTest="home-MarkAsDone"
                  iconLeft="check"
                  onClick={event => {
                    mixpanel.track(MIXPANEL_EVENTS.HOME_MARK_AS_DONE_ACTION_CLICKED_ON_SINGLE_CARD);
                    handleMarkAsDone(event, task?.id.objectId);
                  }}
                  disabled={buttonData.disabled}
                />
              </Tooltip>
            </CardHoverButtons>
          ) : (
            <></>
          )}
        </CardHeader>
      </Card>
    </div>
  );
};

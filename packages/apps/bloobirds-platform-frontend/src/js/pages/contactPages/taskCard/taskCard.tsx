import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Card,
  CardBody,
  CardButton,
  CardHeader,
  CardHoverButtons,
  CardRight,
  CircularBadge,
  ColorType,
  Dropdown,
  Icon,
  IconButton,
  Item,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { QuickLogModalData, useMinimizableModals } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  CustomTask,
  Email,
  EmailMinimizableData,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  TASK_ACTION,
  TASK_ACTION_VALUE,
  TASK_AUTOMATED_ERROR_LOGIC_ROLE,
  TASK_AUTOMATED_PAUSED_REASONS_LOGIC_ROLE,
  TASK_AUTOMATED_STATUS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import {
  isSkippableTask,
  removeHtmlTags,
  formatDate,
  formatDateAsText,
  isDifferentYearThanCurrent,
  isToday,
  getUserTimeZone,
  isCustomTask,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import { formatDistance, startOfDay, subDays } from 'date-fns';
import mixpanel from 'mixpanel-browser';
import spacetime from 'spacetime';

import { bobjectUrl } from '../../../app/_constants/routes';
import Name from '../../../components/name/name';
import CardRescheduleTaskButton from '../../../components/rescheduleTask/cardRescheduleTaskButton';
import TaskIcon from '../../../components/taskIcon';
import { useUserSettings } from '../../../components/userPermissions/hooks';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../constants/activity';
import {
  AUTOMATION_ERRORS_MESSAGE,
  AUTOMATION_PAUSED_REASON_MESSAGE,
  AUTOMATION_RESCHEDULED_MESSAGE,
} from '../../../constants/automatedEmails';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_HIGH_PRIORITY_LOGIC_ROLE,
} from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_HIGH_PRIORITY_LOGIC_ROLE } from '../../../constants/lead';
import { MIXPANEL_EVENTS } from '../../../constants/mixpanel';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../constants/opportunity';
import { useContactView, useEntity, useMediaQuery, useRouter, useTaskDone } from '../../../hooks';
import { useActiveCompany } from '../../../hooks/useActiveCompany';
import { useCadences } from '../../../hooks/useCadences';
import useCancelEmail from '../../../hooks/useCancelEmail';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import useRescheduleAutomatedEmail from '../../../hooks/useRescheduleAutomatedEmail';
import { useSelectedLead } from '../../../hooks/useSelectedLead';
import useSendAutomatedEmail from '../../../hooks/useSendAutomatedEmail';
import { CadenceObject } from '../../../typings/cadence';
import {
  getFieldByLogicRole,
  getReferencedBobject,
  getRelatedBobjectTypeName,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../utils/bobjects.utils';
import { replaceVariables } from '../../../utils/strings.utils';
import {
  getButtonMarkAsDone,
  getTaskLocalTime,
  getTaskReferenceBobject,
} from '../../../utils/tasks.utils';
import { PriorityButton } from '../../subhomePages/components/subhomeCards/subcomponents/priorityButton';
import PriorityLabel from '../../subhomePages/components/subhomeCards/subcomponents/priorityLabel';
import { SkipTaskButton } from '../../subhomePages/components/subhomeCards/subcomponents/skipTaskButton';
import { useContactBobjects } from '../contactPageContext';
import styles from './taskCard.module.css';

const AUTOMATED_EMAIL_STATUS_INFO = {
  [TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED]: {
    text: 'Failed',
    textColor: 'tomato',
    cardVariant: 'error',
  },
  [TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED]: {
    text: 'Paused',
    textColor: 'tangerine',
    cardVariant: 'warning',
  },
  [TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED]: {
    text: 'Reschedule',
    textColor: 'bloobirds',
    cardVariant: 'info',
  },
};

const VARIANT_STYLES: { [key: string]: { [key: string]: string } } = {
  error: {
    backgroundColor: '#fcdfe4',
    borderColor: 'verySoftTomato',
  },
  warning: {
    backgroundColor: '#fdeade',
    borderColor: 'verySoftBanana',
  },
  info: {
    backgroundColor: 'lighterGray',
    borderColor: 'veryLightBloobirds',
  },
};

const checkIsOverdue = (item: any) => {
  const date = new Date(getValueFromLogicRole(item, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME));

  return startOfDay(new Date(date)) <= subDays(startOfDay(new Date()), 1);
};

const getTaskNameColor = (taskType: string, hasDescription: boolean) => {
  const color = hasDescription ? 'darkBloobirds' : 'softPeanut';

  return taskType !== TASK_TYPE.PROSPECT_CADENCE ? 'peanut' : color;
};

const getTaskDateFormat = (taskType: string, date: Date | string) => {
  let formatThisYear = 'MMM dd HH:mm';
  if (taskType === TASK_TYPE.PROSPECT_CADENCE) {
    formatThisYear = 'MMM dd';
  }
  if (taskType === TASK_TYPE.SCHEDULED_EMAIL && isToday(date as Date, getUserTimeZone())) {
    formatThisYear = 'HH:mm';
  }

  return isDifferentYearThanCurrent(date) ? 'MMM dd yyyy' : formatThisYear;
};

export function getCompanyLastAttemptDate(
  companyLastAttemptDate: string | Date,
  activeCompanyLastAttemptDate: string | Date,
) {
  if (!companyLastAttemptDate) {
    return activeCompanyLastAttemptDate;
  }
  if (!activeCompanyLastAttemptDate) {
    return companyLastAttemptDate;
  }
  return spacetime(companyLastAttemptDate).isBefore(spacetime(activeCompanyLastAttemptDate))
    ? activeCompanyLastAttemptDate
    : companyLastAttemptDate;
}

export function getLeadLastAttemptDate(
  leadLastAttemptDate: string | Date,
  activeLeadLastAttemptDate: string | Date,
) {
  if (!leadLastAttemptDate) {
    return activeLeadLastAttemptDate;
  }
  if (!activeLeadLastAttemptDate) {
    return leadLastAttemptDate;
  }
  return spacetime(leadLastAttemptDate).isBefore(spacetime(activeLeadLastAttemptDate))
    ? activeLeadLastAttemptDate
    : leadLastAttemptDate;
}

export function getLastAttemptDate({
  companyLastAttemptDate,
  activeCompanyLastAttemptDate,
  leadLastAttemptDate,
  activeLeadLastAttemptDate,
  hasLead: isLeadTask,
}: {
  companyLastAttemptDate: string | Date;
  activeCompanyLastAttemptDate: string | Date;
  leadLastAttemptDate: string | Date;
  activeLeadLastAttemptDate: string | Date;
  hasLead: boolean;
}) {
  const leadAttemptDate = getLeadLastAttemptDate(leadLastAttemptDate, activeLeadLastAttemptDate);
  const companyAttemptDate = getCompanyLastAttemptDate(
    companyLastAttemptDate,
    activeCompanyLastAttemptDate,
  );

  if (!companyAttemptDate) {
    return leadAttemptDate;
  }

  if (!leadAttemptDate && isLeadTask) {
    return undefined;
  }

  if (!isLeadTask && leadAttemptDate) {
    return spacetime(leadAttemptDate).isBefore(spacetime(companyAttemptDate))
      ? companyAttemptDate
      : leadAttemptDate;
  }

  return leadAttemptDate || companyAttemptDate;
}

export const TaskCard = ({
  task,
  showNextLine,
  isSmall = false,
  fromTaskBox = false,
  customTasks,
  logCustomActivity,
}: {
  task: Bobject<BobjectTypes.Task>;
  showNextLine?: boolean;
  isSmall?: boolean;
  debug?: boolean;
  fromTaskBox?: boolean;
  customTasks?: CustomTask[];
  logCustomActivity?: (data?: QuickLogModalData) => void;
}) => {
  const { t } = useTranslation();
  const { showToast } = useTaskDone();
  const { history } = useRouter();
  const { isSmallDesktop, isMediumDesktop } = useMediaQuery();
  const isAccountAdmin = useIsAccountAdmin();
  const users = useEntity('users');
  const bobjectFields = useEntity('bobjectFields');
  const { openMinimizableModal } = useMinimizableModals();
  const { openCancelEmailModal } = useCancelEmail();
  const { leads } = useContactBobjects();
  const taskRelatedBobjectType = getRelatedBobjectTypeName(task);
  const { cadences: cadencesEntities } = useCadences(taskRelatedBobjectType);
  const { openConfirmSendEmailModal } = useSendAutomatedEmail();
  const { openRescheduleAutomatedEmailModal } = useRescheduleAutomatedEmail();
  const { setActiveTabs } = useContactView();

  // TODO: This should and must be deprecated
  const { company: activeCompany } = useActiveCompany();
  const { selectedLead: activeLead } = useSelectedLead();
  const settings = useUserSettings();
  const hasAutoLogCustomActivity = settings?.user?.autoLogCustomActivity;

  const { ref, visible, setVisible } = useVisible(false);

  const assignedTo = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  const automated = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED)?.valueLogicRole;
  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const activityRelated = (getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.MEETING_ACTIVITY)
    ?.referencedBobject as unknown) as Bobject<BobjectTypes.Activity>;
  const activityRelatedDatetime = getValueFromLogicRole(
    activityRelated,
    ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
  );
  const date = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const completedDate = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPLETED_DATE);
  const rejectedDate = getTextFromLogicRole(task, 'TASK__REJECTED_DATE');
  const description = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION);
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const name = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TITLE);
  const cadenceId = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CADENCE);

  const cadenceEntity = cadencesEntities?.find(
    (cadenceElement: CadenceObject) => cadenceElement?.id === cadenceId,
  );
  const cadence = cadenceEntity?.name;
  const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const status = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)
    ?.valueLogicRole as TASK_STATUS_VALUE_LOGIC_ROLE;
  const type = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)
    ?.valueLogicRole as string;
  const scheduledDatetime = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const schedulingMode = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_MODE);
  const isCallAction = getFieldByLogicRole(task, TASK_ACTION.CALL)?.valueLogicRole;
  const isEmailAction = getFieldByLogicRole(task, TASK_ACTION.EMAIL)?.valueLogicRole;
  const isLinkedinAction = getFieldByLogicRole(task, TASK_ACTION.LINKEDIN_MESSAGE)?.valueLogicRole;
  const taskPriority = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.PRIORITY)?.valueLogicRole;
  const isImportant = taskPriority === TASK_PRIORITY_VALUE.IMPORTANT;

  const automationError = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.AUTOMATION_ERROR)
    ?.valueLogicRole as typeof TASK_AUTOMATED_ERROR_LOGIC_ROLE[keyof typeof TASK_AUTOMATED_ERROR_LOGIC_ROLE];
  const automationPausedReason = (getFieldByLogicRole(
    task,
    TASK_FIELDS_LOGIC_ROLE.AUTOMATION_PAUSE_REASON,
  )
    ?.valueLogicRole as unknown) as typeof TASK_AUTOMATED_PAUSED_REASONS_LOGIC_ROLE[keyof typeof TASK_AUTOMATED_PAUSED_REASONS_LOGIC_ROLE];
  const isAutomatedEmailAction = getFieldByLogicRole(task, TASK_ACTION.AUTOMATED_EMAIL)
    ?.valueLogicRole;
  const isCall = isCallAction === TASK_ACTION_VALUE.CALL_YES;
  const isEmail = isEmailAction === TASK_ACTION_VALUE.EMAIL_YES;
  const isLinkedin = isLinkedinAction === TASK_ACTION_VALUE.LINKEDIN_MESSAGE_YES;
  const isAutomatedEmail = isAutomatedEmailAction === TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES;
  const isScheduledEmail = type === (TASK_TYPE.SCHEDULED_EMAIL as string);
  const isScheduledTask = type === (TASK_TYPE.NEXT_STEP as string);
  const isSkippable = isSkippableTask(task);
  const automatedStatus = (getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS)
    ?.valueLogicRole as unknown) as typeof TASK_AUTOMATED_STATUS_LOGIC_ROLE[keyof typeof TASK_AUTOMATED_STATUS_LOGIC_ROLE];
  const isAutomatedStatusPending = automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING;
  const isAutomatedStatusFailed = automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED;
  const isAutomatedStatusCompleted = automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.COMPLETED;
  const referenceBobject = getTaskReferenceBobject(task);

  const automatedEmailTo = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.AUTOMATED_EMAIL_TO);

  const referenceBobjectType = referenceBobject?.id?.typeName;
  const companyName = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const companySource = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.SOURCE);
  const companyCountry = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.COUNTRY);
  const companyTimeZone = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.TIME_ZONE);
  const companyHighPriority = getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY)
    ?.valueLogicRole;
  const companyLastAttemptDate = getValueFromLogicRole(
    company,
    COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
  );
  const leadName = lead
    ? getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) ||
      getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL)
    : null;
  const leadTimeZone = lead ? getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.TIME_ZONE) : null;
  const leadSource = lead ? getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.SOURCE) : null;
  const leadHighPriority = lead
    ? getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.HIGH_PRIORITY)?.valueLogicRole
    : null;
  const leadLastAttemptDate = lead
    ? getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY)
    : null;
  const opportunityName = opportunity
    ? getTextFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME)
    : null;
  const isCompleted = [
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
  ].includes(status);
  const isRejected = status === TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED;
  const isOverdue = checkIsOverdue(task);
  const bobjectHighPriority = lead
    ? leadHighPriority === LEAD_HIGH_PRIORITY_LOGIC_ROLE.YES
    : companyHighPriority === COMPANY_HIGH_PRIORITY_LOGIC_ROLE.YES;
  const bobjectSource = lead ? leadSource : companySource;

  const activeCompanyLastAttemptDate = getValueFromLogicRole(
    activeCompany,
    COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
  );

  const activeLeadLastAttemptDate = getValueFromLogicRole(
    activeLead,
    LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
  );

  const lastAttemptDate = getLastAttemptDate({
    companyLastAttemptDate,
    activeCompanyLastAttemptDate,
    leadLastAttemptDate,
    activeLeadLastAttemptDate,
    hasLead: !!lead,
  });

  const buttonData = getButtonMarkAsDone({
    taskType: type,
    taskStatus: status,
    bobjectLastAttemptDate: lastAttemptDate,
    taskDateField: date,
    taskIsAutomated: automated,
  });

  const cardUser = users?.get(assignedTo);
  const isProspect = type === TASK_TYPE.PROSPECT_CADENCE;
  const isMeeting = type === TASK_TYPE.MEETING;
  const isContactBeforeMeeting = type === TASK_TYPE.CONTACT_BEFORE_MEETING;
  const isEditable = type === TASK_TYPE.NEXT_STEP;
  const canMarkAsDone = type !== TASK_TYPE.SCHEDULED_EMAIL;
  const taskNameColor = getTaskNameColor(type, !!description);

  //@ts-ignore more annoying to type than to ignore : )
  const automatedEmailStatusInfo = AUTOMATED_EMAIL_STATUS_INFO[automatedStatus];
  const variantStyles = VARIANT_STYLES[automatedEmailStatusInfo?.cardVariant];

  const hasCompletedStyle = isCompleted || (isRejected && !isAutomatedEmail);

  const relatedBobjectLocalTime = getTaskLocalTime(task, isContactBeforeMeeting);
  const shouldContract = isSmall && isContactBeforeMeeting;
  const shouldContractMax =
    (shouldContract &&
      isOverdue &&
      !!scheduledDatetime &&
      !!relatedBobjectLocalTime &&
      !!companyCountry) ||
    (shouldContract && relatedBobjectLocalTime?.length > 12);
  const nameIsLong =
    isSmall &&
    ((companyName && companyName.length > 20) ||
      (leadName && leadName.length > 20) ||
      (opportunityName && opportunityName.length > 20));
  const shouldShortenName =
    shouldContractMax || (shouldContract && !!relatedBobjectLocalTime && !!companyCountry);
  const shouldShowSource =
    !isSmallDesktop &&
    !isMediumDesktop &&
    (!relatedBobjectLocalTime || !companyCountry || companyCountry?.length < 9 || !isOverdue); //*/

  const referencedBobject = getReferencedBobject(task);

  const handleMarkAsDone = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    showToast(true, id);
    if (hasAutoLogCustomActivity && customTask) {
      logCustomActivity({
        customTask,
        selectedBobject: referencedBobject,
        leads,
        onSubmit: () => {
          setActiveTabs({
            tab: 'Activity',
            subtab: '',
          });
        },
      });
    }
  };

  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    const referencedBobject = getReferencedBobject(task);
    const url = bobjectUrl(referencedBobject);

    history.push(url, { event: e });
  };

  const getTaskDateToShow = () => {
    if (isCompleted && completedDate) {
      return `Completed ${formatDistance(new Date(completedDate), new Date())} ago`;
    }

    if (isRejected) {
      return rejectedDate
        ? `Skipped ${formatDistance(new Date(rejectedDate), new Date())} ago`
        : 'Skipped';
    }
    if (!date || shouldContractMax) return '';
    const formattedDate = formatDate(new Date(date), getTaskDateFormat(type, date));
    return `Due ${shouldContract ? '' : 'date'} ${formattedDate}`;
  };

  const ACTION_DATA_TESTS = {
    call: {
      is: isCall,
      dataTest: 'Call',
    },
    email: {
      is: isEmail,
      dataTest: 'Email',
    },
    linkedin: {
      is: isLinkedin,
      dataTest: 'Linkedin',
    },
    automatedEmail: {
      is: isAutomatedEmail,
      dataTest: 'AutomatedEmail',
    },
  };

  const getDataTest = () => {
    let dataTestForCard = '';
    Object.keys(ACTION_DATA_TESTS).forEach(actionKey => {
      // @ts-ignore
      const action = ACTION_DATA_TESTS[actionKey];
      if (action.is) {
        dataTestForCard += `${action.dataTest} `;
      }
    });

    return dataTestForCard?.trim();
  };

  const dataTest = `Card-Task-${getDataTest()}`;

  const getTooltipMessage = () => {
    if (automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED) {
      if (automationError === TASK_AUTOMATED_ERROR_LOGIC_ROLE.VARIABLE_NOT_RESOLVED) {
        return replaceVariables(AUTOMATION_ERRORS_MESSAGE[automationError], {
          BOBJECT: referenceBobjectType,
        });
      }
      if (automationError === TASK_AUTOMATED_ERROR_LOGIC_ROLE.MISSING_EMAIL) {
        return replaceVariables(AUTOMATION_ERRORS_MESSAGE[automationError], {
          EMAIL_FIELD: bobjectFields?.get(automatedEmailTo)?.name,
        });
      }
      return AUTOMATION_ERRORS_MESSAGE[automationError] || '';
    }
    if (automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED) {
      const text = AUTOMATION_PAUSED_REASON_MESSAGE[automationPausedReason];
      return text
        ? replaceVariables(text, {
            DATE: formatDateAsText({
              text: scheduledDatetime,
              patternFormat: '{month-short} {date-ordinal} {time}',
              t,
            }),
            OBJECT: referenceBobjectType,
          })
        : '';
    }
    if (automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED) {
      return replaceVariables(AUTOMATION_RESCHEDULED_MESSAGE, {
        DATE: formatDateAsText({
          text: scheduledDatetime,
          patternFormat: '{month-short} {date-ordinal} {time}',
          t,
        }),
      });
    }

    return '';
  };

  const customTaskId = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const customTask = customTasks?.find(ct => ct.id === customTaskId?.value);
  const customTaskDescription =
    customTask &&
    (getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION) || customTask?.description);

  const skippedReason = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SKIPPABLE_REASONS)?.text;
  function getHasTemplate(task: Bobject<BobjectTypes.Task>) {
    if (isEmail) return getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TEMPLATE);
    if (isLinkedin)
      return getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SUGGESTED_LINKEDIN_TEMPLATE);
    if (isCall) return getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SUGGESTED_PITCH);
    if (isCustomTask(task))
      return getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SUGGESTED_WHATSAPP_TEMPLATE);
  }

  const hasTemplate = !!getHasTemplate(task);

  return (
    <div data-test={dataTest} className={styles._container}>
      <Card
        expand
        completed={hasCompletedStyle}
        onClick={!fromTaskBox ? handleOnClick : () => {}}
        backgroundColor={variantStyles?.backgroundColor as ColorType}
        borderColor={variantStyles?.borderColor as ColorType}
      >
        <CardHeader>
          <CardBody>
            <div className={styles._icon_wrapper}>
              {(!isProspect ||
                isMeeting ||
                isScheduledEmail ||
                isAutomatedEmail ||
                isScheduledTask) &&
                !isCall &&
                !isEmail &&
                !isLinkedin &&
                !customTask && <TaskIcon type={!isAutomatedEmail ? type : 'AUTOMATED_EMAIL'} />}

              {(isCall || isEmail || isLinkedin) && !customTask && !isProspect && (
                <>
                  {isCall && <Icon name="phone" color="melon" />}
                  {isEmail && <Icon name="mail" color="tangerine" />}
                  {isLinkedin && <Icon name="linkedin" color="darkBloobirds" />}
                </>
              )}

              {isProspect && !isAutomatedEmail && !customTask && !isScheduledTask && (
                <>
                  <Icon
                    name={isCall ? 'phone' : 'circle'}
                    color={isCall ? 'melon' : 'lightPeanut'}
                  />
                  <Icon
                    name={isEmail ? 'mail' : 'circle'}
                    color={isEmail ? 'tangerine' : 'lightPeanut'}
                  />
                  <Icon
                    name={isLinkedin ? 'linkedin' : 'circle'}
                    color={isLinkedin ? 'darkBloobirds' : 'lightPeanut'}
                  />
                </>
              )}

              {customTask && <Icon name={customTask.icon} color={customTask.iconColor} />}
            </div>
            {!isScheduledEmail && !isAutomatedEmail && bobjectHighPriority && (
              <div className={clsx(styles._high_priority_icon, styles._s_hidden)}>
                <Icon size={16} name="zap" color="banana" />
              </div>
            )}
            {(!isProspect || isAutomatedEmail || (customTask && schedulingMode === 'START')) &&
              scheduledDatetime && (
                <div className={styles._datetime}>
                  <Text
                    size="s"
                    color="bloobirds"
                    weight="bold"
                    htmlTag="span"
                    decoration={hasCompletedStyle ? 'line-through' : ''}
                  >
                    {formatDateAsText({ text: scheduledDatetime, patternFormat: '{time}', t })}
                  </Text>
                  <Text
                    size="s"
                    color="bloobirds"
                    htmlTag="span"
                    className={styles._time}
                    decoration={hasCompletedStyle ? 'line-through' : ''}
                  >
                    {formatDateAsText({
                      text: scheduledDatetime,
                      patternFormat: '{month-short} {date-ordinal}',
                      t,
                    })}
                  </Text>
                </div>
              )}
            {isAutomatedEmail && <span className={styles._separator} />}
            {customTask && isScheduledTask && (
              <div className={styles._title}>
                <div>
                  <Text
                    dataTest="Task-Card-CustomTaskName"
                    size="s"
                    ellipsis={25}
                    weight="bold"
                    inline
                  >
                    {customTask.name}
                  </Text>
                </div>
              </div>
            )}

            <div className={styles._title}>
              <Tooltip title={removeHtmlTags((description ?? name) || '')} position="top">
                <Text
                  dataTest="Task-Card-TaskName"
                  size="s"
                  ellipsis={25}
                  color={taskNameColor}
                  decoration={hasCompletedStyle ? 'line-through' : ''}
                  inline
                >
                  {isScheduledEmail ? 'Scheduled' : name}
                </Text>
              </Tooltip>
            </div>

            {customTask && !isScheduledTask && (
              <div className={styles._title}>
                <div>
                  <Text
                    dataTest="Task-Card-CustomTaskName"
                    size="s"
                    ellipsis={25}
                    weight="bold"
                    inline
                  >
                    {customTask.name}
                  </Text>
                </div>
              </div>
            )}
            {isContactBeforeMeeting && activityRelated && activityRelatedDatetime && (
              <div className={styles._title}>
                <Tooltip title={''} position="top">
                  <Text
                    dataTest="Task-Card-ActivityRelatedDatetime"
                    size="s"
                    ellipsis={25}
                    color="bloobirds"
                    decoration={hasCompletedStyle ? 'line-through' : ''}
                    inline
                  >
                    <b>
                      {isSmallDesktop || isMediumDesktop || shouldContract
                        ? 'On: '
                        : 'Scheduled on: '}
                    </b>
                    {activityRelatedDatetime &&
                      formatDate(
                        new Date(activityRelatedDatetime),
                        getTaskDateFormat(type, activityRelatedDatetime),
                      )}
                  </Text>
                </Tooltip>
              </div>
            )}

            {isScheduledEmail && (
              <div className={styles._country}>
                <Tooltip title={name} position="top">
                  <Text size="s" color="peanut" ellipsis={35}>
                    {name}
                  </Text>
                </Tooltip>
              </div>
            )}
            {isAutomatedEmail && (
              <>
                <span className={styles._separator} />
                <div className={styles._cadence_name}>
                  <Tooltip title={cadence} position="top">
                    <Text
                      dataTest="AutomatedTaskCard-Cadence"
                      size="s"
                      color="darkBloobirds"
                      decoration={isCompleted ? 'line-through' : ''}
                      inline
                    >
                      {cadence}
                    </Text>
                  </Tooltip>
                </div>
              </>
            )}
            {(isScheduledEmail || isAutomatedEmail) && bobjectHighPriority && (
              <div className={clsx(styles._high_priority_icon, styles._s_hidden)}>
                <Icon size={16} name="zap" color="banana" />
              </div>
            )}

            {!isScheduledEmail && relatedBobjectLocalTime && (
              <>
                <div className={styles._bobject_now_time}>
                  <Icon name="clock" size={20} color="darkBloobirds" />
                  <Text size="s" color="darkBloobirds">
                    {relatedBobjectLocalTime}
                  </Text>
                </div>
              </>
            )}

            {companyName && !leadName && !opportunityName && (
              <>
                <div className={styles._bobject_name}>
                  <Icon name="company" size={20} />
                  <div
                    className={clsx({
                      [styles._bobject_name_short]: shouldShortenName,
                      [styles._bobject_name_too_long]: !shouldShortenName && nameIsLong,
                    })}
                  >
                    <Name name={companyName} bobject={company} isCompleted={hasCompletedStyle} />
                  </div>
                </div>
                {isScheduledEmail && companyTimeZone && (
                  <div className={styles._bobject_timezone}>
                    <Text size="s" color="darkBloobirds">
                      {companyTimeZone.substring(0, 11)}
                    </Text>
                  </div>
                )}
              </>
            )}
            {leadName && !opportunityName && (
              <>
                <div className={styles._bobject_name}>
                  <Icon name="person" size={20} />
                  <div
                    className={clsx({
                      [styles._bobject_name_short]: shouldShortenName,
                      [styles._bobject_name_too_long]: !shouldShortenName && nameIsLong,
                    })}
                  >
                    <Name name={leadName} bobject={lead} isCompleted={hasCompletedStyle} />
                  </div>
                </div>
                {isScheduledEmail && leadTimeZone && (
                  <div className={styles._bobject_timezone}>
                    <Text size="s" color="darkBloobirds">
                      {leadTimeZone}
                    </Text>
                  </div>
                )}
              </>
            )}
            {opportunityName && (
              <div className={styles._bobject_name}>
                <Icon name="fileOpportunity" size={20} />
                <div
                  className={clsx({
                    [styles._bobject_name_short]: shouldShortenName,
                    [styles._bobject_name_too_long]: !shouldShortenName && nameIsLong,
                  })}
                >
                  <Name
                    name={opportunityName}
                    bobject={opportunity}
                    isCompleted={hasCompletedStyle}
                  />
                </div>
              </div>
            )}
            {shouldShowSource && !isScheduledEmail && !isAutomatedEmail && (
              <div className={styles._source}>
                <Tooltip title={`${lead ? 'Lead' : 'Company'} source`} position="top">
                  <Text size="s" color="softPeanut">
                    {bobjectSource}
                  </Text>
                </Tooltip>
              </div>
            )}
            {!isScheduledEmail && companyCountry && (
              <div className={styles._country}>
                <Tooltip title="Company country" position="top">
                  <Text size="s" color="peanut">
                    {companyCountry}
                  </Text>
                </Tooltip>
              </div>
            )}
            {(isScheduledEmail || isAutomatedEmail) && isAccountAdmin && cardUser && (
              <div
                className={clsx(styles._assigned_circle, styles._s_hidden, {
                  [styles._xs_hidden]: isSmall,
                })}
              >
                <Tooltip title={cardUser?.name} position="top">
                  <CircularBadge
                    size="s"
                    color="lightPeanut"
                    style={{ color: 'var(--white)', fontSize: '9px' }}
                    backgroundColor={cardUser?.color || 'lightPeanut'}
                  >
                    {cardUser?.shortname || cardUser?.email || 'U'}
                  </CircularBadge>
                </Tooltip>
              </div>
            )}
            {hasTemplate && <div className={styles.label}>Template suggested</div>}
          </CardBody>
          <CardRight>
            {!isScheduledEmail && !isAutomatedEmail && isAccountAdmin && cardUser && (
              <div
                className={clsx(styles._assigned_circle, styles._s_hidden, {
                  [styles._xs_hidden]: isSmall,
                })}
              >
                <Tooltip title={cardUser?.name} position="top">
                  <CircularBadge
                    size="s"
                    color="lightPeanut"
                    style={{ color: 'var(--white)', fontSize: '9px' }}
                    backgroundColor={cardUser?.color || 'lightPeanut'}
                  >
                    {cardUser?.shortname || cardUser?.email || 'U'}
                  </CircularBadge>
                </Tooltip>
              </div>
            )}
            {isImportant && <PriorityLabel />}
            {!isScheduledEmail && !isAutomatedEmail && !isScheduledTask && (
              <Tooltip title={isRejected && skippedReason} position="top">
                <div className={clsx(styles._date, styles._s_hidden)}>
                  <Text size="s" color="softPeanut" inline align="right">
                    {date && getTaskDateToShow()}
                  </Text>
                </div>
              </Tooltip>
            )}
            {isScheduledEmail && isAutomatedStatusPending && (
              <div className={clsx(styles._date, styles._s_hidden)}>
                <Text size="s" color="bloobirds" inline align="right">
                  {date && formatDate(new Date(date), getTaskDateFormat(type, date))}
                </Text>
              </div>
            )}
            {(isScheduledEmail || isAutomatedEmail) && automatedEmailStatusInfo?.text && (
              <div className={clsx(styles._overdue, styles._s_hidden)}>
                <Text size="s" color={automatedEmailStatusInfo?.textColor} inline align="right">
                  {automatedEmailStatusInfo?.text}
                </Text>
              </div>
            )}
            {(isScheduledEmail || isAutomatedEmail) && isAutomatedStatusCompleted && (
              <div className={clsx(styles._overdue, styles._s_hidden)}>
                <Text size="s" color="softPeanut" inline align="right">
                  Completed
                </Text>
              </div>
            )}

            {!isScheduledEmail && !isAutomatedEmail && isOverdue && !isCompleted && !isRejected && (
              <div className={clsx(styles._overdue, styles._s_hidden)}>
                <Text size="s" color="tomato" inline align="right">
                  Overdue
                </Text>
              </div>
            )}
          </CardRight>
          {(isAutomatedEmail && !isCompleted) || (!isCompleted && !isRejected) ? (
            <CardHoverButtons>
              {!isAutomatedEmail ? (
                <>
                  {(isEditable || isProspect || isContactBeforeMeeting) && (
                    <PriorityButton task={task} />
                  )}
                  {cadenceEntity?.reschedulableMode === 'RESCHEDULABLE' &&
                    isProspect &&
                    !isCompleted &&
                    !isRejected && <CardRescheduleTaskButton task={task} />}
                  {isSkippable && <SkipTaskButton task={task} />}

                  {canMarkAsDone && (
                    <Tooltip dataTest="statusInfo" title={buttonData?.tooltip} position="top">
                      <CardButton
                        dataTest="Task-Card-MarkAsDone"
                        iconLeft="check"
                        onClick={event => {
                          handleMarkAsDone(event, task?.id.objectId);
                        }}
                        disabled={buttonData?.disabled}
                      >
                        {!isSmallDesktop && 'Mark as done'}
                      </CardButton>
                    </Tooltip>
                  )}
                  {isScheduledEmail && (
                    <>
                      <Button
                        iconLeft="edit"
                        variant="secondary"
                        size="small"
                        onClick={event => {
                          event.preventDefault();
                          event.stopPropagation();

                          const email: Email = JSON.parse(
                            getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.EMAIL_METADATA),
                          );

                          openMinimizableModal<EmailMinimizableData>({
                            type: 'email',
                            title: 'Edit Email',
                            data: {
                              company: activeCompany,
                              lead: lead,
                              mode: email.replyToMessageId ? 'REPLY' : 'SEND',
                              isBlankEmail: false,
                              leads,
                              activity: null,
                              taskId: task.id.objectId,
                              isScheduledEmail: true,
                              isFailedAutomation: isAutomatedStatusFailed,
                              scheduledDate: date,
                              savedData: {
                                body: JSON.parse(email.body),
                                subject: JSON.parse(email.subject),
                                templateId: email.templateId,
                                emailFrom: email.emailFrom,
                                to: email.to,
                                cc: email.cc,
                              },
                            },
                          });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        iconLeft={
                          automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING
                            ? 'deliver'
                            : 'repeat'
                        }
                        size="small"
                        onClick={event => {
                          event.preventDefault();
                          event.stopPropagation();
                          openConfirmSendEmailModal({
                            bobjectToSet: task,
                            emailType: 'SCHEDULED',
                            type:
                              automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING
                                ? 'SEND_NOW'
                                : 'RETRY',
                          });
                        }}
                      >
                        {automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING
                          ? 'Send'
                          : 'Retry'}
                      </Button>
                      {automatedEmailStatusInfo?.text && (
                        <Tooltip title={getTooltipMessage()} position="top">
                          <Text htmlTag="span" size="s" color={automatedEmailStatusInfo?.textColor}>
                            {automatedEmailStatusInfo?.text}
                          </Text>
                        </Tooltip>
                      )}
                    </>
                  )}
                  {isEditable && (
                    <IconButton
                      name="edit"
                      onClick={event => {
                        event.preventDefault();
                        event.stopPropagation();

                        openMinimizableModal({
                          type: 'task',
                          data: {
                            [task?.id.typeName.toLowerCase()]: task,
                            bobjectId: task?.id?.value,
                            company,
                            lead,
                            opportunity,
                          },
                        });
                      }}
                      size={20}
                    />
                  )}
                </>
              ) : (
                <>
                  <CardButton
                    iconLeft="clock"
                    dataTest="Automated-Reschedule"
                    variant="secondary"
                    onClick={event => {
                      mixpanel.track(MIXPANEL_EVENTS.RESCHEDULED_ACTION_CLICKED_ON_TASK_FEED);
                      event.preventDefault();
                      event.stopPropagation();
                      openRescheduleAutomatedEmailModal({ bobjectToSet: task });
                    }}
                  >
                    {!isSmallDesktop && 'Reschedule'}
                  </CardButton>
                  {isSkippable && <SkipTaskButton task={task} />}
                  {(automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING ||
                    automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED) && (
                    <CardButton
                      dataTest="Automated-SendNow"
                      iconLeft="deliver"
                      onClick={event => {
                        mixpanel.track(MIXPANEL_EVENTS.SEND_NOW_ACTION_CLICKED_ON_TASK_FEED);
                        event.preventDefault();
                        event.stopPropagation();
                        openConfirmSendEmailModal({ bobjectToSet: task });
                      }}
                    >
                      {!isSmallDesktop && 'Send now'}
                    </CardButton>
                  )}
                  {automatedStatus !== TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING &&
                    automatedStatus !== TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED && (
                      <CardButton
                        dataTest="Automated-Retry"
                        iconLeft="repeat"
                        onClick={event => {
                          mixpanel.track(MIXPANEL_EVENTS.RETRY_ACTION_CLICKED_ON_TASK_FEED);
                          event.preventDefault();
                          event.stopPropagation();
                          openConfirmSendEmailModal({ bobjectToSet: task, type: 'RETRY' });
                        }}
                      >
                        {!isSmallDesktop && 'Retry'}
                      </CardButton>
                    )}
                  {automatedEmailStatusInfo?.text && (
                    <div className={clsx(styles._status, styles._s_hidden)}>
                      <Tooltip title={getTooltipMessage()} position="top">
                        <Text htmlTag="span" size="s" color={automatedEmailStatusInfo?.textColor}>
                          {automatedEmailStatusInfo?.text}
                        </Text>
                      </Tooltip>
                    </div>
                  )}
                  <Dropdown
                    ref={ref}
                    visible={visible}
                    arrow={false}
                    anchor={
                      <IconButton
                        name="moreVertical"
                        onClick={event => {
                          event.stopPropagation();
                          setVisible(!visible);
                        }}
                      />
                    }
                  >
                    <Item
                      icon="cross"
                      iconColor="tomato"
                      onClick={(value, event) => {
                        mixpanel.track(MIXPANEL_EVENTS.CANCEL_EMAIL_ACTION_CLICKED_ON_TASK_FEED);
                        event.stopPropagation();
                        setVisible(false);
                        openCancelEmailModal({ bobjectToSet: task });
                      }}
                    >
                      Cancel email
                    </Item>
                  </Dropdown>
                </>
              )}
            </CardHoverButtons>
          ) : (
            <></>
          )}
        </CardHeader>
        {customTask && !isScheduledTask ? (
          <CardBody>
            <div className={styles.card_description}>
              <Text size="xs" weight="bold">
                Description:
              </Text>
              <Text size="xs">{customTaskDescription}</Text>
            </div>
          </CardBody>
        ) : (
          <></>
        )}
      </Card>
      {showNextLine && <div className={styles._dashed_line} />}
    </div>
  );
};

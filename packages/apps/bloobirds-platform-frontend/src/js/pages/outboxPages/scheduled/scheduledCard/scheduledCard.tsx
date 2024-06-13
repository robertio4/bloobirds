import React, { Fragment, MouseEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { AssigneeComponent } from '@bloobirds-it/bobjects';
import {
  CardBody,
  CardButton,
  CardHeader,
  CardHoverButtons,
  CardRight,
  Icon,
  Label,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useMinimizableModals } from '@bloobirds-it/hooks';
import {
  Bobject,
  BOBJECT_TYPES,
  BobjectField,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_HIGH_PRIORITY_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_HIGH_PRIORITY_LOGIC_ROLE,
  LogicRoleType,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_AUTOMATED_STATUS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { formatDateAsText } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

import {
  bobjectUrl,
  companyIdUrl,
  leadUrl,
  opportunityUrl,
} from '../../../../app/_constants/routes';
import { Email, EmailMinimizableData } from '../../../../components/emailModal/emailModal';
import RightClickContextMenu from '../../../../components/rightClickContextMenu';
import { AUTOMATION_ERRORS_MESSAGE } from '../../../../constants/automatedEmails';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useContextMenu, useMediaQuery, useRouter } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { fetchLeadsByCompany } from '../../../../hooks/useLeads';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import useSendAutomatedEmail from '../../../../hooks/useSendAutomatedEmail';
import SubhomeCard from '../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCard';
import {
  getFieldByLogicRole,
  getReferencedBobject,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isLead,
} from '../../../../utils/bobjects.utils';
import { replaceVariables } from '../../../../utils/strings.utils';
import { generateBobjectBasedData } from '../../../subhomePages/components/subhomeCards/card.utils';
import {
  CurrentLocalTime,
  NameComponent,
  PlainTextComponent,
} from '../../../subhomePages/components/subhomeCards/fieldTypeComponent';
import styles from './scheduledCard.module.css';

const SCHEDULED_EMAIL_STATUS_INFO = {
  [TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED]: {
    text: 'Failed',
    textColor: 'tomato',
    cardVariant: 'error',
  },
};

const BOBJECT_HIGH_PRIORITY_LOGIC_ROLE = {
  [BOBJECT_TYPES.COMPANY]: COMPANY_HIGH_PRIORITY_LOGIC_ROLE,
  [BOBJECT_TYPES.LEAD]: LEAD_HIGH_PRIORITY_LOGIC_ROLE,
};

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

export const ScheduledCard = ({
  schedule,
  showNextLine,
}: {
  schedule: Bobject<BobjectTypes.Task>;
  showNextLine?: boolean;
}) => {
  const { history } = useRouter();
  const {
    ref: refContextMenu,
    xPos,
    yPos,
    isContextMenuVisible,
    handleContextMenu,
    hideContextMenu,
  } = useContextMenu();
  const { openMinimizableModal } = useMinimizableModals();
  const { isSmallDesktop } = useMediaQuery();
  const { openConfirmSendEmailModal } = useSendAutomatedEmail();
  const hasSalesEnabled = useFullSalesEnabled();
  const referencedBobjectData = useCallback(() => generateBobjectBasedData(schedule), [schedule]);
  const { t } = useTranslation();

  const subhomeItemFields = referencedBobjectData();
  const taskHasMultipleReferences =
    subhomeItemFields?.fields?.filter(
      field =>
        field?.value &&
        [
          TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
          TASK_FIELDS_LOGIC_ROLE.COMPANY,
          TASK_FIELDS_LOGIC_ROLE.LEAD,
        ].includes(field?.logicRole as LogicRoleType<BobjectTypes.Task>),
    )?.length > 1;

  const status = getFieldByLogicRole(schedule, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const date = getValueFromLogicRole(schedule, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const company = getFieldByLogicRole(schedule, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const emailData = getValueFromLogicRole(schedule, TASK_FIELDS_LOGIC_ROLE.EMAIL_METADATA);
  const lead = getFieldByLogicRole(schedule, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(schedule, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const scheduledDatetime = getTextFromLogicRole(
    schedule,
    TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  );
  const automatedStatus = getFieldByLogicRole(schedule, TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS)
    ?.valueLogicRole;
  const automationError = getFieldByLogicRole(schedule, TASK_FIELDS_LOGIC_ROLE.AUTOMATION_ERROR)
    ?.valueLogicRole;
  const isAutomatedStatusFailed = automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED;
  const referenceBobject = getReferencedBobject(schedule);
  const referenceBobjectType = referenceBobject?.id?.typeName as
    | BobjectTypes.Company
    | BobjectTypes.Lead;

  const referenceBobjectStatus = getFieldByLogicRole(
    referenceBobject,
    FIELDS_LOGIC_ROLE[referenceBobjectType]?.STATUS,
  );
  const referenceBobjectHighPriority = getFieldByLogicRole(
    referenceBobject,
    FIELDS_LOGIC_ROLE[referenceBobjectType]?.HIGH_PRIORITY,
  )?.valueLogicRole;
  const isHightPriority =
    referenceBobjectHighPriority === BOBJECT_HIGH_PRIORITY_LOGIC_ROLE[referenceBobjectType]?.YES;

  const isCompleted = [
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
  ].includes(status);

  const isAccountAdmin = useIsAccountAdmin();
  const scheduleEmailStatusInfo = SCHEDULED_EMAIL_STATUS_INFO[automatedStatus];
  const isPending = automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING;
  const isFailed = automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED;

  const handleOnClick = (e: MouseEvent<HTMLElement>) => {
    let url;
    if (lead) {
      url = leadUrl(lead, company);
    } else if (company) {
      url = companyIdUrl(company?.id.objectId);
    } else if (opportunity) {
      url = opportunityUrl(
        hasSalesEnabled ? undefined : company?.id.objectId,
        opportunity?.id.objectId,
      );
    }
    history.push(url, { event: e });
  };
  return (
    <SubhomeCard
      isCompleted={isCompleted}
      hasNextCard={showNextLine}
      key={schedule?.id.objectId}
      onClick={(e: MouseEvent<HTMLElement>) => handleOnClick(e)}
      cardRef={refContextMenu}
      onContextMenu={handleContextMenu}
      dataTest={`scheduled-card-${schedule?.id.objectId}`}
      variant={scheduleEmailStatusInfo?.cardVariant}
    >
      <CardHeader>
        <CardBody>
          <div className={styles._icon_wrapper}>
            <Icon name="clock" color="tangerine" />
          </div>
          {scheduledDatetime && (
            <div className={styles._datetime}>
              <Text size="s" color="bloobirds" weight="bold" htmlTag="span">
                {formatDateAsText({ text: scheduledDatetime, patternFormat: '{time}', t })}
              </Text>
              <Text size="s" color="bloobirds" htmlTag="span" className={styles._time}>
                {formatDateAsText({
                  text: scheduledDatetime,
                  patternFormat: '{month-short} {date-ordinal}',
                  t,
                })}
              </Text>
            </div>
          )}
          <div className={styles._email_status}>
            <Text
              dataTest="ScheduledCard-State"
              size="s"
              weight="medium"
              color="darkBloobirds"
              inline
            >
              {isCompleted ? 'Completed' : 'Scheduled'}
            </Text>
          </div>
          {isHightPriority && (
            <div className={styles._high_priority_icon}>
              <Icon size={16} name="zap" color="banana" />
            </div>
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
              } else if (logicRole.includes('ASSIGNED_TO')) {
                return (
                  isAccountAdmin && (
                    <AssigneeComponent
                      key={`Assignee_${logicRole}_${index}`}
                      value={value as BobjectField}
                    />
                  )
                );
              } else if (value) {
                return (
                  <>
                    {logicRole.includes('SOURCE') && <div className={styles._separator} />}
                    <PlainTextComponent
                      key={`PlainText_${logicRole}_${index}`}
                      value={value as string}
                      logicRole={logicRole}
                    />
                  </>
                );
              }
            } else if (logicRole === 'CUSTOM_TASK_TIMEZONE') {
              return <CurrentLocalTime key={`Timezone_${logicRole}_${index}`} task={schedule} />;
            } else {
              return <></>;
            }
          })}
        </CardBody>
        <CardRight>
          {referenceBobjectStatus && (
            <div className={styles._status}>
              <Tooltip
                title={`${isLead(referenceBobject) ? 'Lead' : 'Company'} status`}
                position="top"
              >
                <Label
                  dataTest={`${isLead(referenceBobject) ? 'lead' : 'company'}Status`}
                  overrideStyle={{
                    backgroundColor: referenceBobjectStatus?.valueBackgroundColor,
                    color: referenceBobjectStatus?.valueTextColor,
                    borderColor: referenceBobjectStatus?.valueOutlineColor,
                  }}
                >
                  <Text htmlTag="span" color={referenceBobjectStatus?.valueTextColor} size="s">
                    {referenceBobjectStatus?.text}
                  </Text>
                </Label>
              </Tooltip>
            </div>
          )}
          {scheduleEmailStatusInfo?.text && (
            <div className={styles._status}>
              <Tooltip title="EMPTY" position="top">
                <Text htmlTag="span" size="s" color={scheduleEmailStatusInfo?.textColor}>
                  {scheduleEmailStatusInfo?.text}
                </Text>
              </Tooltip>
            </div>
          )}
          {isContextMenuVisible && (
            <RightClickContextMenu
              url={bobjectUrl(getReferencedBobject(schedule))}
              xPos={xPos}
              yPos={yPos}
              hideContextMenu={hideContextMenu}
            />
          )}
        </CardRight>
        {!isCompleted ? (
          <CardHoverButtons>
            <CardButton
              dataTest="Scheduled-Edit"
              iconLeft="edit"
              variant="secondary"
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                const email: Email = JSON.parse(emailData);
                fetchLeadsByCompany(company?.id.objectId).then(response => {
                  const leads = response?.contents;
                  openMinimizableModal<EmailMinimizableData>({
                    type: 'email',
                    title: 'Edit Email',
                    data: {
                      company: company,
                      lead: lead,
                      mode: email.replyToMessageId ? 'REPLY' : 'SEND',
                      isBlankEmail: false,
                      leads,
                      activity: null,
                      taskId: schedule?.id?.objectId,
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
                });
              }}
            >
              {!isSmallDesktop && 'Edit'}
            </CardButton>
            <CardButton
              dataTest={`Scheduled-${isPending ? 'SendNow' : 'Retry'}`}
              iconLeft={isPending ? 'deliver' : 'repeat'}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                mixpanel.track(
                  MIXPANEL_EVENTS[
                    `OUTBOX_${isPending ? 'SEND_NOW' : 'RETRY'}_ACTION_CLICKED_ON_SCHEDULED_TAB`
                  ],
                );
                openConfirmSendEmailModal({
                  bobjectToSet: schedule,
                  type: isPending ? 'SEND_NOW' : 'RETRY',
                  emailType: 'SCHEDULED',
                });
              }}
            >
              {!isSmallDesktop && isFailed && 'Retry'}
              {!isSmallDesktop && isPending && 'Send'}
            </CardButton>
            {scheduleEmailStatusInfo?.text && (
              <Tooltip
                title={
                  automationError === TASK_AUTOMATED_ERROR_LOGIC_ROLE.VARIABLE_NOT_RESOLVED
                    ? replaceVariables(AUTOMATION_ERRORS_MESSAGE[automationError], {
                        BOBJECT: referenceBobjectType,
                      })
                    : AUTOMATION_ERRORS_MESSAGE[automationError] || ''
                }
                position="top"
              >
                <Text htmlTag="span" size="s" color={scheduleEmailStatusInfo?.textColor}>
                  {scheduleEmailStatusInfo?.text}
                </Text>
              </Tooltip>
            )}
          </CardHoverButtons>
        ) : (
          <></>
        )}
      </CardHeader>
    </SubhomeCard>
  );
};

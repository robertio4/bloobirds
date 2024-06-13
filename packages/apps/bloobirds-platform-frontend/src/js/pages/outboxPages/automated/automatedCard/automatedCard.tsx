import React, { Fragment, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { AssigneeComponent } from '@bloobirds-it/bobjects';
import {
  CardBody,
  CardButton,
  CardCheckbox,
  CardHeader,
  CardHoverButtons,
  CardLeft,
  CardRight,
  ColorType,
  Dropdown,
  Icon,
  IconButton,
  Item,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import {
  Bobject,
  BobjectField,
  BobjectType,
  TASK_AUTOMATED_ERROR_LOGIC_ROLE,
  TASK_AUTOMATED_STATUS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { formatDateAsText } from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { bobjectUrl } from '../../../../app/_constants/routes';
import RightClickContextMenu from '../../../../components/rightClickContextMenu';
import {
  AUTOMATION_ERRORS_MESSAGE,
  AUTOMATION_PAUSED_REASON_MESSAGE,
  AUTOMATION_RESCHEDULED_MESSAGE,
} from '../../../../constants/automatedEmails';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_HIGH_PRIORITY_LOGIC_ROLE,
} from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_HIGH_PRIORITY_LOGIC_ROLE } from '../../../../constants/lead';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import { useContextMenu, useMediaQuery, useRouter } from '../../../../hooks';
import { useCadences } from '../../../../hooks/useCadences';
import useCancelEmail from '../../../../hooks/useCancelEmail';
import { useSetCadenceEnabled } from '../../../../hooks/useFeatureFlags';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { usePreviewEmailModal } from '../../../../hooks/usePreviewEmailModal';
import useRescheduleAutomatedEmail from '../../../../hooks/useRescheduleAutomatedEmail';
import useSendAutomatedEmail from '../../../../hooks/useSendAutomatedEmail';
import useStopCadence from '../../../../hooks/useStopCadence';
import SubhomeCard from '../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCard';
import { CadenceObject } from '../../../../typings/cadence';
import {
  getFieldByLogicRole,
  getReferencedBobject,
  getRelatedBobjectTypeName,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';
import { replaceVariables } from '../../../../utils/strings.utils';
import { generateBobjectBasedData } from '../../../subhomePages/components/subhomeCards/card.utils';
import {
  CurrentLocalTime,
  NameComponent,
  PlainTextComponent,
} from '../../../subhomePages/components/subhomeCards/fieldTypeComponent';
import { useSubhomeContext } from '../../../subhomePages/subhomeContext';
import styles from './automatedCard.module.css';

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
    text: 'Rescheduled',
    textColor: 'bloobirds',
    cardVariant: 'info',
  },
} as const;

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
] as const;

export const AutomatedCard = ({
  automated,
  showNextLine,
}: {
  automated: Bobject;
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
  const { selectOneItem, selectedItems } = useSubhomeContext();
  const { isSmallDesktop } = useMediaQuery();
  const isAccountAdmin = useIsAccountAdmin();
  const { ref, visible, setVisible } = useVisible(false);
  const { openCancelEmailModal } = useCancelEmail();
  const { openStopCadenceModal } = useStopCadence();
  const taskReferenceBobjectType = getRelatedBobjectTypeName(automated);
  const { cadences: cadencesEntities } = useCadences(taskReferenceBobjectType);
  const { openConfirmSendEmailModal } = useSendAutomatedEmail();
  const { openRescheduleAutomatedEmailModal } = useRescheduleAutomatedEmail();
  const { handleOpenModal: handleOpenPreviewModal } = usePreviewEmailModal();
  const { t } = useTranslation();

  const referencedBobjectData = useCallback(() => generateBobjectBasedData(automated), [automated]);
  const subhomeItemFields = referencedBobjectData();
  const taskHasMultipleReferences =
    subhomeItemFields?.fields?.filter(
      field =>
        field?.value &&
        (TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY === field.logicRole ||
          TASK_FIELDS_LOGIC_ROLE.COMPANY === field.logicRole ||
          TASK_FIELDS_LOGIC_ROLE.LEAD === field.logicRole),
    )?.length > 1;

  const name = getTextFromLogicRole(automated, TASK_FIELDS_LOGIC_ROLE.TITLE);
  const cadenceId = getTextFromLogicRole(automated, TASK_FIELDS_LOGIC_ROLE.CADENCE);
  const cadence = cadencesEntities?.find((cadence: CadenceObject) => cadence?.id === cadenceId)
    ?.name;
  const status = getFieldByLogicRole(automated, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const description = getValueFromLogicRole(automated, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION);
  const template = getValueFromLogicRole(automated, TASK_FIELDS_LOGIC_ROLE.TEMPLATE);
  const automationError = getFieldByLogicRole(automated, TASK_FIELDS_LOGIC_ROLE.AUTOMATION_ERROR)
    ?.valueLogicRole as keyof typeof AUTOMATION_ERRORS_MESSAGE;
  const automationPausedReason = getFieldByLogicRole(
    automated,
    TASK_FIELDS_LOGIC_ROLE.AUTOMATION_PAUSE_REASON,
  )?.valueLogicRole;
  const scheduledDatetime = getTextFromLogicRole(
    automated,
    TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  );
  const automatedStatus = getFieldByLogicRole(automated, TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS)
    ?.valueLogicRole;
  const company = getFieldByLogicRole(automated, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(automated, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const referenceBobject = getReferencedBobject(automated);
  const referenceBobjectType: BobjectType = referenceBobject?.id?.typeName;

  const companyHighPriority = getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY)
    ?.valueLogicRole;
  const leadHighPriority = lead
    ? getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.HIGH_PRIORITY)?.valueLogicRole
    : null;
  const isCompleted =
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED === status ||
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE === status;
  const bobjectHighPriority = lead
    ? leadHighPriority === LEAD_HIGH_PRIORITY_LOGIC_ROLE.YES
    : companyHighPriority === COMPANY_HIGH_PRIORITY_LOGIC_ROLE.YES;

  const automatedEmailStatusInfo =
    AUTOMATED_EMAIL_STATUS_INFO[automatedStatus as keyof typeof AUTOMATED_EMAIL_STATUS_INFO];
  const isChecked = selectedItems?.some(item => item?.id.objectId === automated?.id.objectId);
  const isSetCadenceEnabled = useSetCadenceEnabled();

  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    const url = bobjectUrl(referenceBobject, null);
    history.push(url, { event: e });
  };

  const getTooltipMessage = () => {
    if (automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED) {
      if (automationError === TASK_AUTOMATED_ERROR_LOGIC_ROLE.VARIABLE_NOT_RESOLVED) {
        return replaceVariables(AUTOMATION_ERRORS_MESSAGE[automationError], {
          BOBJECT: referenceBobjectType,
        });
      }
      return AUTOMATION_ERRORS_MESSAGE[automationError] || '';
    }
    if (automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED) {
      const text =
        AUTOMATION_PAUSED_REASON_MESSAGE[
          automationPausedReason as keyof typeof AUTOMATION_PAUSED_REASON_MESSAGE
        ];
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

  return (
    <SubhomeCard
      hasNextCard={showNextLine}
      key={automated?.id.objectId}
      isCompleted={isCompleted}
      onClick={(e: React.MouseEvent<HTMLElement>) => handleOnClick(e)}
      cardRef={refContextMenu}
      onContextMenu={handleContextMenu}
      dataTest={`automated-card-${automated?.id.objectId}`}
      variant={automatedEmailStatusInfo?.cardVariant}
      onHover={(hover: boolean) => {
        if (hover && visible) {
          setVisible(false);
        }
      }}
    >
      <CardHeader>
        <CardLeft>
          <div className={styles._check_wrapper}>
            <CardCheckbox
              size="small"
              checked={isChecked}
              onClick={(value, event) => {
                event.preventDefault();
                event.stopPropagation();
                selectOneItem(automated);
              }}
            />
          </div>
        </CardLeft>
        <CardBody>
          <div className={styles._icon_wrapper}>
            <Icon name="autoMail" color="tangerine" />
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
          <span className={styles._separator} />
          <div className={styles._title}>
            <Tooltip position="top" title={description}>
              <Text
                dataTest="AutomatedCard-TaskName"
                size="s"
                color="darkBloobirds"
                decoration={isCompleted ? 'line-through' : ''}
                inline
              >
                {name}
              </Text>
            </Tooltip>
          </div>
          <span className={clsx(styles._separator, styles._m_hidden)} />
          <div className={clsx(styles._cadence_name, styles._m_hidden)}>
            <Tooltip title={cadence} position="top">
              <Text
                dataTest="AutomatedCard-Cadence"
                size="s"
                color="darkBloobirds"
                decoration={isCompleted ? 'line-through' : ''}
                inline
              >
                {cadence}
              </Text>
            </Tooltip>
          </div>
          {bobjectHighPriority && (
            <div className={styles._high_priority_icon}>
              <Icon size={16} name="zap" color="banana" />
            </div>
          )}
          {subhomeItemFields?.fields.map(({ value, logicRole }, index) => {
            if (value) {
              //@ts-ignore
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
              } else if (value && logicRole !== TASK_FIELDS_LOGIC_ROLE.TITLE) {
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
              return <CurrentLocalTime key={`Timezone_${logicRole}_${index}`} task={automated} />;
            } else {
              return <></>;
            }
          })}
        </CardBody>
        <CardRight>
          {automatedEmailStatusInfo?.text && (
            <div className={styles._status}>
              <Text
                htmlTag="span"
                size="s"
                color={automatedEmailStatusInfo?.textColor as ColorType}
              >
                {automatedEmailStatusInfo?.text}
              </Text>
            </div>
          )}
          {isContextMenuVisible && (
            <RightClickContextMenu
              url={bobjectUrl(getReferencedBobject(automated))}
              xPos={xPos}
              yPos={yPos}
              hideContextMenu={hideContextMenu}
            />
          )}
        </CardRight>
        {selectedItems.length === 0 && !isCompleted ? (
          <CardHoverButtons>
            {template && (
              <CardButton
                iconLeft="eye"
                dataTest="Automated-Reschedule"
                variant="secondary"
                onClick={event => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleOpenPreviewModal({
                    taskId: automated?.id?.objectId,
                  });
                }}
              >
                {!isSmallDesktop && 'Preview'}
              </CardButton>
            )}
            <CardButton
              iconLeft="clock"
              dataTest="Automated-Reschedule"
              variant="secondary"
              onClick={event => {
                mixpanel.track(MIXPANEL_EVENTS.OUTBOX_RESCHEDULED_ACTION_CLICKED_ON_AUTOMATED_TAB);
                event.preventDefault();
                event.stopPropagation();
                openRescheduleAutomatedEmailModal({ bobjectToSet: automated });
              }}
            >
              {!isSmallDesktop && 'Reschedule'}
            </CardButton>
            {(TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING === automatedStatus ||
              TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED === automatedStatus) && (
              <CardButton
                dataTest="Automated-SendNow"
                iconLeft="deliver"
                onClick={event => {
                  mixpanel.track(MIXPANEL_EVENTS.OUTBOX_SEND_NOW_ACTION_CLICKED_ON_AUTOMATED_TAB);
                  event.preventDefault();
                  event.stopPropagation();
                  openConfirmSendEmailModal({ bobjectToSet: automated });
                }}
              >
                {!isSmallDesktop && 'Send now'}
              </CardButton>
            )}
            {!(
              TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING === automatedStatus ||
              TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED === automatedStatus
            ) && (
              <CardButton
                dataTest="Automated-Retry"
                iconLeft="repeat"
                onClick={event => {
                  mixpanel.track(MIXPANEL_EVENTS.OUTBOX_RETRY_ACTION_CLICKED_ON_AUTOMATED_TAB);
                  event.preventDefault();
                  event.stopPropagation();
                  openConfirmSendEmailModal({ bobjectToSet: automated, type: 'RETRY' });
                }}
              >
                {!isSmallDesktop && 'Retry'}
              </CardButton>
            )}
            {automatedEmailStatusInfo?.text && (
              <div className={styles._status}>
                <Tooltip title={getTooltipMessage()} position="top">
                  <Text
                    htmlTag="span"
                    size="s"
                    color={automatedEmailStatusInfo?.textColor as ColorType}
                  >
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
              {isSetCadenceEnabled && (
                <Item
                  icon="slash"
                  iconColor="bloobirds"
                  onClick={(value, event) => {
                    mixpanel.track(
                      MIXPANEL_EVENTS.OUTBOX_STOP_CADENCE_ACTION_CLICKED_ON_AUTOMATED_TAB,
                    );
                    event.stopPropagation();
                    setVisible(false);
                    openStopCadenceModal({ bobjectToSet: automated });
                  }}
                >
                  Stop cadence
                </Item>
              )}
              <Item
                icon="cross"
                iconColor="tomato"
                onClick={(value, event) => {
                  mixpanel.track(
                    MIXPANEL_EVENTS.OUTBOX_CANCEL_EMAIL_ACTION_CLICKED_ON_AUTOMATED_TAB,
                  );
                  event.stopPropagation();
                  setVisible(false);
                  openCancelEmailModal({ bobjectToSet: automated });
                }}
              >
                Cancel email
              </Item>
            </Dropdown>
          </CardHoverButtons>
        ) : (
          <></>
        )}
      </CardHeader>
    </SubhomeCard>
  );
};

import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Card,
  CardBody,
  CardButton,
  CardHeader,
  CardHoverButtons,
  CardRight,
  Icon,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import {
  useBaseSetEmailVariablesValues,
  useIsB2CAccount,
  useMessagingTemplates,
  useMinimizableModals,
} from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectField,
  BobjectTypes,
  Email,
  EmailMinimizableData,
  FIELDS_LOGIC_ROLE,
  MessagesEvents,
  TASK_AUTOMATED_ERROR_LOGIC_ROLE,
  TASK_AUTOMATED_STATUS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  TEMPLATE_TYPES,
} from '@bloobirds-it/types';
import {
  api,
  generateBobjectBasedData,
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
  ModalType,
  replaceVariables,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { getReferencedBobject } from '../../../../../../../utils/bobjects.utils';
import { formatDateAsText } from '../../../../../../../utils/dates';
import { MIXPANEL_EVENTS } from '../../../../../../../utils/mixpanel';
import { CurrentLocalTime, NameComponent } from '../../../../../card/fieldTypeComponent';
import { useExtensionContext } from '../../../../../context';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import {
  AUTOMATION_ERRORS_MESSAGE,
  AUTOMATION_PAUSED_REASON_MESSAGE,
  AUTOMATION_RESCHEDULED_MESSAGE,
  BOBJECT_HIGH_PRIORITY_LOGIC_ROLE,
  NAME_OR_REFERENCE_FIELDS,
  SCHEDULED_EMAIL_STATUS_INFO,
  VARIANT_STYLES,
} from '../outbox.constants';
import styles from './outboxCard.module.css';

export const OutboxCard = ({ bobject }: { bobject: Bobject }) => {
  const { t } = useTranslation();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const { openMinimizableModal } = useMinimizableModals();
  const { messagingTemplates } = useMessagingTemplates({
    type: TEMPLATE_TYPES.EMAIL,
    name: null,
    size: 200,
    page: 0,
    visibility: null,
    onlyMine: false,
    segmentationValues: {},
  });
  const { useGetSettings, setContactViewBobjectId } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const titleRef = useRef();
  const isB2CAccount = useIsB2CAccount();
  const { setOpenedModalInfo } = useSubhomeContext();

  const referencedBobjectData = useCallback(
    () => generateBobjectBasedData(bobject, null, null, isB2CAccount),
    [bobject],
  );

  const subhomeItemFields = referencedBobjectData();
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

  const status = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const template = getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TEMPLATE);
  const templateName = messagingTemplates?.find(t => t?.id === template)?.name;
  const date = getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const company = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const emailData = getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.EMAIL_METADATA);
  const taskTitle = getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TITLE);
  const isAutomatedEmail =
    getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole ===
    TASK_TYPE.PROSPECT_CADENCE;
  const automationPausedReason = getFieldByLogicRole(
    bobject,
    TASK_FIELDS_LOGIC_ROLE.AUTOMATION_PAUSE_REASON,
  )?.valueLogicRole;
  const scheduledDatetime = getTextFromLogicRole(
    bobject,
    TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  );
  const automatedStatus = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS)
    ?.valueLogicRole;
  const automationError = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.AUTOMATION_ERROR)
    ?.valueLogicRole;
  const isAutomatedStatusFailed = automatedStatus === TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED;

  const referenceBobject = getReferencedBobject(bobject);
  const referenceBobjectType = referenceBobject?.id?.typeName;

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

  const isPending = [
    TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING,
    TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED,
  ].includes(automatedStatus);

  const bobjectEmailStatusInfo = SCHEDULED_EMAIL_STATUS_INFO[automatedStatus];
  const variant = bobjectEmailStatusInfo?.cardVariant;

  const variantStyles = variant
    ? VARIANT_STYLES[variant]
    : { backgroundColor: undefined, borderColor: undefined };

  const fetchLeadsByCompany = useCallback(async () => {
    const { data } = await api.post(`/bobjects/${accountId}/Lead/search`, {
      query: { LEAD__COMPANY: [company?.id.objectId] },
      formFields: true,
      pageSize: 50,
      injectReferences: true,
    });
    return data;
  }, [company]);

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

  const onCardClick = () => {
    setContactViewBobjectId(lead?.id?.value || opportunity?.id?.value || company?.id?.value);
    //TODO Open extended context
  };
  const showTooltip =
    // @ts-ignore
    titleRef?.current?.firstChild?.firstChild?.offsetWidth <
    // @ts-ignore
    titleRef?.current?.firstChild?.firstChild?.scrollWidth;

  return (
    <div className={clsx(styles.container, styles[variant])}>
      <Card
        size="small"
        expand
        completed={isCompleted}
        key={bobject?.id.objectId}
        backgroundColor={variantStyles?.backgroundColor}
        borderColor={variantStyles?.borderColor}
        onClick={onCardClick}
      >
        <CardHeader>
          <CardBody>
            <div className={styles._icon_wrapper}>
              <Tooltip title={taskTitle} position="top">
                {isAutomatedEmail ? (
                  <Icon name="autoMail" color="tangerine" size={20} />
                ) : (
                  <Icon name="scheduleMail" color="tangerine" size={20} />
                )}
              </Tooltip>
            </div>
            {scheduledDatetime && (
              <div className={styles._datetime}>
                <Text size="xs" color="bloobirds" weight="bold" htmlTag="span">
                  {formatDateAsText({ text: scheduledDatetime, patternFormat: '{time}', t })}
                </Text>
              </div>
            )}
            {isHightPriority && (
              <div className={styles._high_priority_icon}>
                <Icon size={16} name="zap" color="banana" />
              </div>
            )}
            {subhomeItemFields?.fields.map(({ value, logicRole }, index) => {
              if (value) {
                if (NAME_OR_REFERENCE_FIELDS.includes(logicRole)) {
                  return (
                    <div key={`Namefield_${logicRole}_${index}`} className={styles.center}>
                      {taskHasMultipleReferences && logicRole?.includes('__COMPANY') && (
                        <div className={styles._separator} />
                      )}
                      <NameComponent
                        value={value as BobjectField | Bobject}
                        bobject={subhomeItemFields?.bobject}
                      />
                    </div>
                  );
                }
              } else if (logicRole === 'CUSTOM_TASK_TIMEZONE') {
                return (
                  <div className={styles.center}>
                    <CurrentLocalTime key={`Timezone_${logicRole}_${index}`} task={bobject} />
                  </div>
                );
              }
              return <></>;
            })}
            <div ref={titleRef} className={styles._cardTemplateBody}>
              <Tooltip title={showTooltip && templateName} position="top">
                <Text size="xs" className={styles._cardTemplateBody}>
                  {templateName}
                </Text>
              </Tooltip>
            </div>
          </CardBody>
          <CardRight>
            {bobjectEmailStatusInfo?.text && (
              <div className={styles._status}>
                <Tooltip title={t('extension.card.empty')} position="top">
                  <Text htmlTag="span" size="xxs" color={bobjectEmailStatusInfo?.textColor}>
                    {bobjectEmailStatusInfo?.text}
                  </Text>
                </Tooltip>
              </div>
            )}
          </CardRight>
          {!isCompleted ? (
            <CardHoverButtons size="small">
              <div className={styles.cardButtons}>
                {!isAutomatedEmail ? (
                  <Tooltip title={t('extension.card.editMail')} position="top">
                    <CardButton
                      dataTest="Scheduled-Edit"
                      iconLeft="edit"
                      variant="secondary"
                      onClick={event => {
                        event.preventDefault();
                        event.stopPropagation();
                        const email: Email = JSON.parse(emailData);

                        fetchLeadsByCompany().then(response => {
                          const leads = response?.contents;
                          openMinimizableModal<EmailMinimizableData>({
                            type: 'email',
                            title: t('extension.card.empty'),
                            data: {
                              company: company,
                              lead: lead,
                              mode: email.replyToMessageId ? 'REPLY' : 'SEND',
                              isBlankEmail: false,
                              leads,
                              activity: null,
                              taskId: bobject?.id?.objectId,
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
                            onSave: () => {
                              window.dispatchEvent(
                                new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                                  detail: { type: BobjectTypes.Task },
                                }),
                              );
                            },
                          });
                        });
                      }}
                    ></CardButton>
                  </Tooltip>
                ) : (
                  <>
                    {template && (
                      <Tooltip title="Preview" position="top">
                        <CardButton
                          iconLeft="eye"
                          dataTest="Automated-Preview"
                          variant="secondary"
                          onClick={event => {
                            event.preventDefault();
                            event.stopPropagation();
                            setEmailVariablesValue({
                              company: company,
                              lead: lead,
                              opportunity: opportunity,
                            });
                            setOpenedModalInfo({
                              openedModal: ModalType.PREVIEW_EMAIL,
                              bobject,
                              data: {
                                templateId: template,
                              },
                            });
                          }}
                        ></CardButton>
                      </Tooltip>
                    )}
                    <Tooltip title={t('extension.card.reschedule')} position="top">
                      <CardButton
                        iconLeft="clock"
                        dataTest="Automated-Reschedule"
                        variant="secondary"
                        onClick={event => {
                          mixpanel.track(
                            MIXPANEL_EVENTS.OUTBOX_RESCHEDULED_ACTION_CLICKED_ON_AUTOMATED_TAB,
                          );
                          event.preventDefault();
                          event.stopPropagation();
                          setOpenedModalInfo({
                            openedModal: ModalType.RESCHEDULE_EMAIL,
                            bobject,
                          });
                        }}
                      ></CardButton>
                    </Tooltip>
                  </>
                )}
                <Tooltip
                  title={`${isPending ? t('extension.card.sendNow') : t('extension.card.retry')}`}
                  position="top"
                >
                  <CardButton
                    dataTest={`Scheduled-${isPending ? 'SendNow' : 'Retry'}`}
                    iconLeft={isPending ? 'deliver' : 'repeat'}
                    onClick={event => {
                      event.preventDefault();
                      event.stopPropagation();
                      mixpanel.track(
                        MIXPANEL_EVENTS[
                          `EXTENSION_OUTBOX_${
                            isPending ? 'SEND_NOW' : 'RETRY'
                          }_ACTION_CLICKED_ON_SCHEDULED_TAB`
                        ],
                      );
                      setOpenedModalInfo({
                        openedModal: isPending ? ModalType.SEND_NOW_EMAIL : ModalType.RETRY_EMAIL,
                        bobject,
                      });
                    }}
                  ></CardButton>
                </Tooltip>
                <Tooltip title={t('extension.card.cancel')} position="top">
                  <CardButton
                    dataTest={`Cancel-button`}
                    iconLeft="cross"
                    color="tomato"
                    onClick={event => {
                      event.preventDefault();
                      event.stopPropagation();
                      mixpanel.track(
                        MIXPANEL_EVENTS[`EXTENSION_OUTBOX_CANCEL_ACTION_CLICKED_ON_OUTBOX_TAB`],
                      );
                      setOpenedModalInfo({
                        openedModal: ModalType.CANCEL_EMAIL,
                        bobject,
                      });
                    }}
                  ></CardButton>
                </Tooltip>
                {bobjectEmailStatusInfo?.text && (
                  <Tooltip title={getTooltipMessage()} position="top">
                    <Text htmlTag="span" size="xxs" color={bobjectEmailStatusInfo?.textColor}>
                      {bobjectEmailStatusInfo?.text}
                    </Text>
                  </Tooltip>
                )}
              </div>
            </CardHoverButtons>
          ) : (
            <></>
          )}
        </CardHeader>
      </Card>
    </div>
  );
};

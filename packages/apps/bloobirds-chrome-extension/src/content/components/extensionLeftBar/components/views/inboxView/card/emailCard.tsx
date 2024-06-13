import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AttachmentsDropdown } from '@bloobirds-it/activity-timeline-item';
import {
  Card,
  CardBody,
  CardButton,
  CardContent,
  CardHeader,
  CardLeft,
  Icon,
  IconButton,
  Spinner,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import {
  useBaseSetEmailVariablesValues,
  useCopilotEnabled,
  useMinimizableModals,
  useUserSettings,
} from '@bloobirds-it/hooks';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  BOUNCED_EMAIL_VALUES_LOGIC_ROLE,
  MessagesEvents,
  MIXPANEL_EVENTS,
  REPORTED_VALUES_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  convertHtmlToString,
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isDifferentYearThanCurrent,
  isHtml,
  parseEmailPixels,
  removeHtmlTags,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import { parseISO } from 'date-fns';
import mixpanel from 'mixpanel-browser';

import { EMAIL_MODE } from '../../../../../../../constants/email';
import { ExtendedContextTypes } from '../../../../../../../types/extendedContext';
import { api } from '../../../../../../../utils/api';
import { formatDateAsText, isToday } from '../../../../../../../utils/dates';
import { NameComponent } from '../../../../../card/fieldTypeComponent';
import CardIcon from '../../../../../cardIcon/cardIcon';
import { useExtensionContext } from '../../../../../context';
import { CopilotAnalysisIndicator } from '../../shared/CopilotAnalysisIndicator';
import styles from '../inboxPage.module.css';

interface EmailCardProps {
  email: Bobject;
}

export const EmailCard = ({ email }: EmailCardProps) => {
  const { t } = useTranslation();
  const [hasBeenRead, setHasBeenRead] = useState<boolean>(false);
  const [readClicked, setReadClicked] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageCollapsed, setMessageCollapsed] = useState<boolean>(true);
  const direction = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const subject = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT);
  const isBouncedEmail =
    getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.IS_BOUNCED_EMAIL)?.valueLogicRole ===
    BOUNCED_EMAIL_VALUES_LOGIC_ROLE.YES;
  const activityAttachedFiles = getTextFromLogicRole(
    email,
    ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHED_FILES,
  );
  const activityTime = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const isDifferentYear = isDifferentYearThanCurrent(activityTime);
  const isThisDay = isToday(activityTime);
  const emailHour = formatDateAsText({
    text: parseISO(activityTime),
    patternFormat: isDifferentYear
      ? 'dd MMM, yyyy'
      : isThisDay
      ? '{time-24}'
      : '{date} {month-short}',
    t,
  });
  const parsedAttachedFiles = activityAttachedFiles && JSON.parse(activityAttachedFiles);
  const hasAttachedFiles =
    activityAttachedFiles && parsedAttachedFiles?.filter((att: string) => !!att)?.length !== 0;
  const { setContactViewBobjectId, setExtendedContext } = useExtensionContext();
  const note = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const titleRef = useRef();
  const activityCompany = getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const activityLead = getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject;
  const activityOpportunity = getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const title = subject;
  const message = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  const cleanedHtmlString = message?.replace(/<head>[\s\S]*?<\/head>/g, '');
  const isHtmlMessage = message && isHtml(message);
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const { openMinimizableModal } = useMinimizableModals();
  const threadId = getValueFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_THREAD_ID);
  const isReported =
    getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)?.valueLogicRole ===
    REPORTED_VALUES_LOGIC_ROLE.YES;
  const leadField = getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);

  const emailMetadataString = getValueFromLogicRole(
    email,
    ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_METADATA,
  );
  const emailMetadata = emailMetadataString ? JSON.parse(emailMetadataString) : {};
  const emailToArray: string[] =
    !!emailMetadata &&
    [emailMetadata.from?.[0]?.email].concat(emailMetadata.to?.map(e => e.email)).filter(Boolean);
  const emailCcArray: string[] = !!emailMetadata && emailMetadata.cc?.map(e => e.email);

  function handleHideAndComplete() {
    setIsLoading(false);
    setTimeout(() => {
      setHasBeenRead(true);
      window.dispatchEvent(
        new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: { type: BobjectTypes.Activity },
        }),
      );
    }, 750);
  }

  const markEmailAsRead = () => {
    setIsLoading(true);
    api
      .patch(`/bobjects/${email?.id?.value}/raw`, {
        contents: {
          [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES,
        },
        params: {},
      })
      .then(handleHideAndComplete);
  };

  const handleOpenEmailModal = async (event, emailTo, emailCc) => {
    event.preventDefault();
    event.stopPropagation();
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_REPLY_FROM_INBOX_OTO);
    setEmailVariablesValue({
      company: activityCompany,
      lead: activityLead,
      opportunity: activityOpportunity,
    });
    const templateSubject = getValueFromLogicRole(
      email,
      ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT,
      true,
    );
    openMinimizableModal({
      type: 'email',
      title: removeHtmlTags(templateSubject),
      data: {
        template: {
          content: '',
          subject: templateSubject,
        },
        mode: EMAIL_MODE.REPLY,
        activity: email,
        company: activityCompany,
        lead: activityLead,
        pageBobjectType: activityLead ? BobjectTypes.Lead : BobjectTypes.Company,
        ...(emailTo ? { defaultToEmail: emailTo } : {}),
        ...(emailCc ? { defaultCcEmail: emailCc } : {}),
      },
      onSave: () => {
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Activity },
          }),
        );
      },
    });
  };

  const onCardClick = () => {
    setContactViewBobjectId(
      activityLead?.id?.value || activityOpportunity?.id?.value || activityCompany?.id?.value,
    );
    setExtendedContext({
      type: ExtendedContextTypes.EMAIL_THREAD,
      threadId: threadId,
      bobject: email,
    });
  };

  const showTooltip =
    // @ts-ignore
    titleRef?.current?.firstChild?.firstChild?.offsetWidth <
    // @ts-ignore
    titleRef?.current?.firstChild?.firstChild?.scrollWidth;

  const copilotAnalysis = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.COPILOT_ANALYSIS);
  const settings = useUserSettings();
  const isCopilotEnabled = useCopilotEnabled(settings?.account?.id);
  return (
    <div
      className={clsx(styles.container, {
        [styles.container_max_height]: messageCollapsed,
        [styles.hasBeenRead]: hasBeenRead && !(email as any)?.activityDate?.isLastOfDay,
        [styles.container_visible_buttons]: readClicked,
      })}
    >
      <Card size="small" expand onClick={onCardClick}>
        <CardHeader>
          <CardLeft>
            <CardIcon
              size="xxs"
              name="mail"
              color="tangerine"
              direction={direction as ACTIVITY_DIRECTION}
            />
          </CardLeft>
          <CardBody>
            <div className={styles.emailCard_body}>
              {leadField?.referencedBobject && (
                <NameComponent
                  value={leadField?.referencedBobject}
                  bobject={email}
                  shrinkName={false}
                  showIcon={false}
                />
              )}
              <div className={styles.emailCard_cardIcons}>
                {isCopilotEnabled && copilotAnalysis && <CopilotAnalysisIndicator size={12} />}
                {isBouncedEmail && (
                  <Icon
                    className={styles.emailCard_bouncedEmail}
                    name="statusCircle"
                    size={6}
                    color="extraMeeting"
                  />
                )}
                {hasAttachedFiles && <AttachmentsDropdown attachedFiles={parsedAttachedFiles} />}
                <Text size="xs">{emailHour}</Text>
              </div>
            </div>
          </CardBody>
        </CardHeader>
        <CardContent>
          <div className={styles.div_not_collapsed}>
            {!(message || note) ? (
              <div ref={titleRef} className={styles._emailCard_body__text}>
                <Tooltip title={showTooltip && title} position="top">
                  <Text size="xs" weight="bold" className={styles._emailCard_body__text}>
                    {title}
                  </Text>
                </Tooltip>
              </div>
            ) : (
              <div className={styles._card_content}>
                {message && (
                  <div
                    className={clsx(styles._message_wrapper, {
                      [styles._message_collapsed]: messageCollapsed,
                    })}
                  >
                    <IconButton
                      onClick={event => {
                        event.stopPropagation();
                        event.preventDefault();
                        setMessageCollapsed(!messageCollapsed);
                      }}
                      name={messageCollapsed ? 'chevronRight' : 'chevronDown'}
                      color="softPeanut"
                      size={12}
                    />
                    {isHtmlMessage ? (
                      <Text size="xs" className={styles.emailBody}>
                        <div
                          onClick={event => {
                            event.stopPropagation();
                            event.preventDefault();
                            setMessageCollapsed(!messageCollapsed);
                          }}
                        >
                          <Tooltip title={showTooltip && title} position="top">
                            <Text size="xs" weight="bold" className={styles._emailCard_body__text}>
                              {title}
                            </Text>
                          </Tooltip>
                        </div>
                        {!messageCollapsed ? (
                          <div
                            className={styles._html_message}
                            dangerouslySetInnerHTML={{
                              __html: parseEmailPixels(cleanedHtmlString),
                            }}
                          />
                        ) : (
                          convertHtmlToString(cleanedHtmlString)?.substring(0, 200)
                        )}
                      </Text>
                    ) : (
                      <Text size="xs" className={styles._emailCard_body__text}>
                        <div
                          onClick={event => {
                            event.stopPropagation();
                            event.preventDefault();
                            setMessageCollapsed(!messageCollapsed);
                          }}
                        >
                          <Tooltip title={showTooltip && title} position="top">
                            <Text size="xs" weight="bold">
                              {title}
                            </Text>
                          </Tooltip>
                        </div>
                        {message}
                      </Text>
                    )}
                  </div>
                )}
                {note && (
                  <div className={styles._note_wrapper}>
                    <Text size="xxs">
                      <b>{t('common.note')}:</b> {note}
                    </Text>
                  </div>
                )}
              </div>
            )}
            <div
              className={clsx(styles.emailCard_buttons, {
                [styles.emailCard_buttons_collapse]: messageCollapsed,
                [styles.visible_buttons]: readClicked,
              })}
            >
              {!isReported && direction === ACTIVITY_DIRECTION.INCOMING && (
                <CardButton
                  variant={readClicked ? 'primary' : 'secondary'}
                  onClick={event => {
                    event.preventDefault();
                    event.stopPropagation();
                    setReadClicked(true);
                    markEmailAsRead();
                  }}
                  className={clsx(styles.popup_button, {
                    [styles._mark_as_read_clicked]: readClicked,
                  })}
                  iconLeft={isLoading ? undefined : 'checkDouble'}
                  uppercase={false}
                  color={readClicked ? 'verySoftMelon' : 'bloobirds'}
                  size="small"
                >
                  {isLoading ? (
                    <div style={{ width: '80px' }}>
                      <Spinner name="loadingCircle" size={10} color="melon" />
                    </div>
                  ) : (
                    t('extension.card.markAsRead')
                  )}
                </CardButton>
              )}
              {isReported && (
                <CardButton
                  size="small"
                  variant="secondary"
                  iconLeft="checkDouble"
                  color="melon"
                  className={clsx(styles.popup_button, styles.emailCard_button_reported)}
                  uppercase={false}
                >
                  {t('extension.card.read')}
                </CardButton>
              )}
              <CardButton
                size="small"
                variant="secondary"
                iconLeft="replyAll"
                onClick={e => handleOpenEmailModal(e, emailToArray, emailCcArray)}
                className={styles.popup_button}
                uppercase={false}
              >
                {t('extension.card.replyAll')}
              </CardButton>
              <CardButton
                size="small"
                iconLeft="reply"
                onClick={e => handleOpenEmailModal(e, undefined, undefined)}
                className={styles.popup_button}
                uppercase={false}
              >
                {t('extension.card.reply')}
              </CardButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

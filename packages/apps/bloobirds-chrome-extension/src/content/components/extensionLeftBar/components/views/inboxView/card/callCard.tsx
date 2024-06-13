import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AssigneeComponent } from '@bloobirds-it/bobjects';
import { useDialerLauncher } from '@bloobirds-it/dialer';
import {
  Card,
  CardBody,
  CardButton,
  CardContent,
  CardHeader,
  CardLeft,
  CardRight,
  ColorType,
  Icon,
  IconType,
  Spinner,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import {
  useAircallPhoneLinkEnabled,
  useCopilotEnabled,
  useOpenCCFWithoutObject,
  useUserSettings,
} from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  ExtensionBobject,
  LEAD_FIELDS_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  api,
  getExtensionBobjectByIdFields,
  getFieldByLogicRole,
  getHoursMinutesSeconds,
  getReferencedBobject,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isHtml,
  openPhoneOrDialer,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import { isToday } from 'date-fns';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { ExtendedContextTypes } from '../../../../../../../types/extendedContext';
import { NameComponent } from '../../../../../card/fieldTypeComponent';
import CardIcon from '../../../../../cardIcon/cardIcon';
import { useExtensionContext } from '../../../../../context';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { CopilotAnalysisIndicator } from '../../shared/CopilotAnalysisIndicator';
import styles from '../inboxPage.module.css';

export interface DateExtendedBobject extends Bobject {
  activityDate: { isFirstOfDay: boolean; isLastOfDay: boolean };
}
interface CallCardProps {
  activity: DateExtendedBobject;
}

export const getLeadName = bobject => {
  const leadField = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  if (leadField && leadField.referencedBobject) {
    const lead = leadField.referencedBobject;
    const fullName = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
    const name = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.NAME);
    const email = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
    return fullName || name || email || 'Untitled lead';
  }
  return '';
};

export const IconLabel = ({
  iconName,
  label,
}: {
  iconName: IconType;
  label: string | JSX.Element;
}) => {
  return label ? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Icon name={iconName} color="verySoftBloobirds" size={16} />
      <Text size="xs" color="peanut" className={styles.iconLabel_text}>
        {label}
      </Text>
    </div>
  ) : (
    <></>
  );
};

export const CallCard = ({ activity }: CallCardProps) => {
  const { t } = useTranslation();
  const [hasBeenRead, setHasBeenRead] = useState<boolean>(false);
  const [markAsDoneClicked, setMarkAsDoneClicked] = useState(false);
  const direction = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const callSID = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.SID);
  const { setContactViewBobjectId, setExtendedContext } = useExtensionContext();
  const phone = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
  const parsedPhone = phone && parsePhoneNumberFromString(phone)?.formatInternational();
  const activityCompany = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const activityLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject;
  const activityOpportunity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const callDateTime =
    getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME) ||
    getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME);
  const activityFromToday = isToday(new Date(callDateTime));
  const format = activityFromToday ? '{time-24}' : t('dates.monthShortWithTime');
  const parsedDateTime = useGetI18nSpacetime(callDateTime).format(format);
  const callDuration = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION);
  const { hours, minutes, seconds } = getHoursMinutesSeconds(parseInt(callDuration));
  const parsedCallDuration =
    callDuration &&
    (hours > 0 ? hours + ' h ' : '') + (minutes > 0 ? minutes + ' min ' : '') + seconds + ' s';
  const note = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const isMissed = direction === ACTIVITY_DIRECTION.MISSED;
  const lead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const company = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const threadId = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_THREAD_ID);
  const noteToShow = isHtml(note) ? <div dangerouslySetInnerHTML={{ __html: note }} /> : note;
  const assignee = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const onCardClick = () => {
    if (activityLead?.id?.value || activityOpportunity?.id?.value || activityCompany?.id?.value) {
      setContactViewBobjectId(
        activityLead?.id?.value || activityOpportunity?.id?.value || activityCompany?.id?.value,
      );
      setExtendedContext({
        type: ExtendedContextTypes.CALL_DETAILS,
        threadId: threadId,
        bobject: activity,
      });
    }
  };

  const copilotAnalysis = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.COPILOT_ANALYSIS,
  );

  const settings = useUserSettings();
  const isCopilotEnabled = useCopilotEnabled(settings?.account?.id);
  return (
    <div
      className={clsx(styles.container, {
        [styles.hasBeenRead]: hasBeenRead && !activity?.activityDate?.isLastOfDay,
      })}
      style={{ height: '100%' }}
    >
      <Card key={callSID} expand size="small" onClick={onCardClick}>
        <CardHeader forceButtonVisibility={markAsDoneClicked}>
          <CardLeft>
            <CardIcon
              name="phone"
              color={isMissed ? 'tomato' : 'melon'}
              direction={direction as ACTIVITY_DIRECTION}
              size="xxs"
            />
          </CardLeft>
          <CardBody>
            <div className={styles._callCard_body__wrap}>
              <Text size="xs" weight="bold" className={styles._callCard_body__text}>
                {direction ? t('leftBar.card.call.' + direction + 'Call') : t('common.call')}
              </Text>
              {(lead || company) && (
                <>
                  <Text size="xs">
                    {direction === ACTIVITY_DIRECTION.OUTGOING
                      ? t('leftBar.card.call.with')
                      : t('leftBar.card.call.with')}
                  </Text>
                  <NameComponent
                    value={lead ?? company}
                    bobject={activity}
                    shrinkName={false}
                    showIcon={false}
                  />
                </>
              )}
            </div>
          </CardBody>
          <CardRight>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              {isCopilotEnabled && copilotAnalysis && <CopilotAnalysisIndicator />}
              <AssigneeComponent value={assignee} />
            </div>
          </CardRight>
        </CardHeader>
        <CardContent>
          <div className={styles.div_not_collapsed}>
            {(parsedPhone || callDateTime || parsedCallDuration) && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <IconLabel iconName="agendaPerson" label={parsedPhone} />
                <IconLabel
                  iconName="clock"
                  label={parsedDateTime + (callDuration ? ', ' + parsedCallDuration : '')}
                />
              </div>
            )}
            {noteToShow && note !== 'null' && (
              <Text className={styles.note_text} size="xs">
                <b>{t('leftBar.card.call.note')}</b> {noteToShow}
              </Text>
            )}
            <CallCardHoverActions
              activity={activity}
              setHasBeenRead={setHasBeenRead}
              markAsDoneClicked={markAsDoneClicked}
              setMarkAsDoneClicked={setMarkAsDoneClicked}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CallCardHoverActions = ({
  activity,
  setHasBeenRead,
  markAsDoneClicked,
  setMarkAsDoneClicked,
}) => {
  const { t } = useTranslation();
  const { useGetSettings, setContactViewBobjectId, closeExtendedScreen } = useExtensionContext();
  const settings = useGetSettings();
  const { openDialer } = useDialerLauncher();
  const { setOpenedModalInfo } = useSubhomeContext();
  const leadName = getLeadName(activity);
  const leadField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const lead = leadField?.referencedBobject;
  const phone = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
  const leadPhone = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.PHONE);
  const direction = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [referencedBobjectState, setReferencedBobjectState] = useState<ExtensionBobject>();
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const hasOpenCCFWithoutObjectAccount = useOpenCCFWithoutObject();

  const openModalAddPerson = (activity: Bobject) => {
    setOpenedModalInfo({
      openedModal: 'addPerson',
      bobject: activity,
    });
  };

  const openDialerAndRedirect = (
    event: React.MouseEvent<HTMLElement>,
    phoneNumber: string,
    activity: Bobject,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    openPhoneOrDialer(phoneNumber, settings, openDialer);
    const referencedBobject = getReferencedBobject(activity);
    setContactViewBobjectId(referencedBobject?.id?.value);
    closeExtendedScreen();
  };

  const openCallResultModal = (event: React.MouseEvent<HTMLElement>, activity: Bobject) => {
    event.preventDefault();
    event.stopPropagation();
    const referencedBobject = getReferencedBobject(activity);
    if (!referencedBobject) {
      getExtensionBobjectByIdFields(referencedBobject?.id).then(({ data }) =>
        setReferencedBobjectState(data),
      );
    }

    setOpenedModalInfo({
      openedModal: 'callReportResult',
      bobject: activity,
      referencedBobject:
        referencedBobject?.id?.typeName !== BobjectTypes.Activity
          ? referencedBobject
          : referencedBobjectState,
    });
  };

  const handleHideAndComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: { type: BobjectTypes.Activity },
        }),
      );
      setHasBeenRead(true);
    }, 750);
  };

  const markCallAsRead = event => {
    event.stopPropagation();
    event.preventDefault();
    setMarkAsDoneClicked(true);
    setIsLoading(true);
    api
      .patch(`/bobjects/${activity?.id?.value}/raw`, {
        contents: {
          [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES,
        },
        params: {},
      })
      .then(handleHideAndComplete);
  };

  const commonCallButtonProps = {
    size: 'small' as 'small' | 'medium',
    uppercase: false,
    color: markAsDoneClicked ? 'verySoftMelon' : ('extraCall' as ColorType),
    className: clsx(styles.popup_button, {
      [styles._mark_as_read_clicked]: markAsDoneClicked,
    }),
  };

  return (
    <div
      className={clsx(styles.popup_buttons_wrapper, {
        [styles.visible_buttons]: markAsDoneClicked,
      })}
    >
      {!(leadName || hasOpenCCFWithoutObjectAccount) && (
        <Tooltip title={t('extension.card.assignToLead')} position="top">
          <CardButton
            size="small"
            uppercase={false}
            variant="secondary"
            iconLeft={isLoading ? null : 'personAdd'}
            className={styles.popup_button}
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
              openModalAddPerson(activity);
            }}
          >
            {isLoading ? (
              <div>
                <Spinner name="loadingCircle" size={10} color="melon" />
              </div>
            ) : (
              t('extension.card.assignTo')
            )}
          </CardButton>
        </Tooltip>
      )}
      {(phone || leadPhone) && (
        <Tooltip
          title={
            direction === ACTIVITY_DIRECTION.OUTGOING
              ? t('extension.card.callAgain')
              : t('extension.card.callBack')
          }
          position="top"
        >
          {hasAircallPhoneLinkEnabled ? (
            <CardButton {...commonCallButtonProps} onClick={undefined}>
              <a href={`callto:${phone ?? leadPhone}`} className={styles._call_link}>
                {isLoading ? (
                  <div>
                    <Spinner name="loadingCircle" size={10} color="melon" />
                  </div>
                ) : direction === ACTIVITY_DIRECTION.MISSED ? (
                  t('extension.card.callBack')
                ) : (
                  t('extension.card.callAgain')
                )}
              </a>
            </CardButton>
          ) : (
            <CardButton
              iconLeft={isLoading ? null : ('phone' as IconType)}
              {...commonCallButtonProps}
              onClick={event => {
                if (direction === ACTIVITY_DIRECTION.MISSED) {
                  markCallAsRead(event);
                }
                openDialerAndRedirect(event, phone ?? leadPhone, lead);
              }}
            >
              {isLoading ? (
                <div>
                  <Spinner name="loadingCircle" size={10} color="melon" />
                </div>
              ) : direction === ACTIVITY_DIRECTION.MISSED ? (
                t('extension.card.callBack')
              ) : (
                t('extension.card.call')
              )}
            </CardButton>
          )}
        </Tooltip>
      )}
      <Tooltip
        title={
          (leadName || hasOpenCCFWithoutObjectAccount) && direction !== ACTIVITY_DIRECTION.MISSED
            ? t('extension.card.markAsReported')
            : undefined
        }
        position="top"
      >
        <CardButton
          uppercase={false}
          size="small"
          color={markAsDoneClicked ? 'verySoftMelon' : 'bloobirds'}
          className={clsx(styles.popup_button, {
            [styles._mark_as_read_clicked]: markAsDoneClicked,
          })}
          iconLeft={
            isLoading
              ? null
              : leadName || hasOpenCCFWithoutObjectAccount
              ? 'thumbsUp'
              : 'checkDouble'
          }
          onClick={event => {
            (leadName || hasOpenCCFWithoutObjectAccount) && direction !== ACTIVITY_DIRECTION.MISSED
              ? openCallResultModal(event, activity)
              : markCallAsRead(event);
          }}
        >
          {isLoading ? (
            <div>
              <Spinner name="loadingCircle" size={10} color="melon" />
            </div>
          ) : leadName || hasOpenCCFWithoutObjectAccount ? (
            t('common.reportResult')
          ) : (
            t('extension.card.markAsDone')
          )}
        </CardButton>
      </Tooltip>
    </div>
  );
};
